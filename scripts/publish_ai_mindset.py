#!/usr/bin/env python3
"""Generate TaoThinks public pages from reviewed AI MindSet Book posts."""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import subprocess
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "ai-mindset-posts.json"
BASE_URL = "https://taothinks.live"
PUBLIC_DATE = "2026-07-11"
GENERATED_ROOTS = ["daily", "prints"]

CONFIDENTIAL_PATTERNS = [
    r"\bFixerUp\b",
    r"\bfixerup\b",
    r"\bHome AI\b",
    r"\bListing Ready\b",
    r"\blisting agent\b",
    r"\bcontractor\b",
    r"\bhomeowner\b",
    r"\binspection report\b",
    r"\brepair\b",
    r"\bCAC\b",
    r"\bpipeline\b",
    r"\bunit economics\b",
    r"\brevenue\b",
    r"\bpricing\b",
    r"\broadmap\b",
]

TAG_LABELS = {
    "ai": {"zh": "AI", "en": "AI"},
    "big-tech": {"zh": "大厂与 AI", "en": "Big Tech"},
    "entry-point": {"zh": "入口控制", "en": "Entry Point"},
    "mental-models": {"zh": "Mental Models", "en": "Mental Models"},
    "product-strategy": {"zh": "产品策略", "en": "Product Strategy"},
    "trainability": {"zh": "可训练性", "en": "Trainability"},
    "judgment": {"zh": "判断力", "en": "Judgment"},
    "founder-os": {"zh": "Founder OS", "en": "Founder OS"},
}


def e(value: str) -> str:
    return html.escape(value, quote=True)


def lang_pair(tag: str, zh: str, en: str, class_name: str = "") -> str:
    cls = f' class="{class_name} lang-zh"' if class_name else ' class="lang-zh"'
    cls_en = f' class="{class_name} lang-en"' if class_name else ' class="lang-en"'
    return f"<{tag}{cls}>{e(zh)}</{tag}><{tag}{cls_en}>{e(en)}</{tag}>"


def lang_span(zh: str, en: str) -> str:
    return f'<span class="lang-zh">{e(zh)}</span><span class="lang-en">{e(en)}</span>'


def load_data() -> dict[str, Any]:
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def post_url(post: dict[str, Any]) -> str:
    return f"/daily/{post['slug']}/"


def print_url(post: dict[str, Any]) -> str:
    return f"/daily/{post['slug']}/print.html"


def validate_public_content(data: dict[str, Any], source_dir: Path) -> None:
    missing = []
    for post in data["posts"]:
        source = source_dir / post["source_file"]
        if not source.exists():
            missing.append(str(source))
    if missing:
        raise SystemExit("Missing source daily files:\n" + "\n".join(missing))

    public_text = json.dumps(data["posts"], ensure_ascii=False)
    leaks = []
    for pattern in CONFIDENTIAL_PATTERNS:
        if re.search(pattern, public_text, flags=re.IGNORECASE):
            leaks.append(pattern)
    if leaks:
        raise SystemExit("Confidential public-content check failed: " + ", ".join(leaks))


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(normalize_output(content), encoding="utf-8")


def normalize_output(content: str) -> str:
    return "\n".join(line.rstrip() for line in content.rstrip().splitlines()) + "\n"


def nav() -> str:
    return """
    <header class="site-header">
      <div class="shell nav">
        <a class="brand" href="/" aria-label="TaoThinks home">
          <span class="mark">T</span>
          <span>TaoThinks</span>
        </a>
        <div class="nav-actions">
          <nav class="main-nav" aria-label="Main navigation">
            <a href="/"><span class="lang-zh">首页</span><span class="lang-en">Home</span></a>
            <a href="/daily/"><span class="lang-zh">每日思考</span><span class="lang-en">Daily</span></a>
            <a href="/tags/"><span class="lang-zh">标签</span><span class="lang-en">Tags</span></a>
            <a href="/about/"><span class="lang-zh">关于</span><span class="lang-en">About</span></a>
          </nav>
          <div class="language-toggle" aria-label="Language switcher">
            <button type="button" data-lang-switch="zh">中文</button>
            <button type="button" data-lang-switch="en">EN</button>
          </div>
        </div>
      </div>
    </header>
    """


def footer() -> str:
    return """
    <footer class="site-footer">
      <div class="shell footer-inner">
        <span>© 2026 TaoThinks</span>
        <div class="footer-links">
          <a href="/daily/"><span class="lang-zh">每日思考</span><span class="lang-en">Daily Posts</span></a>
          <a href="/tags/"><span class="lang-zh">标签</span><span class="lang-en">Tags</span></a>
          <a href="/legacy/"><span class="lang-zh">旧文归档</span><span class="lang-en">Legacy Archive</span></a>
        </div>
      </div>
    </footer>
    """


def shell(
    title_zh: str,
    title_en: str,
    description_zh: str,
    description_en: str,
    canonical_path: str,
    body: str,
    *,
    noindex: bool = False,
    body_class: str = "",
    bare: bool = False,
) -> str:
    robots = '  <meta name="robots" content="noindex, nofollow">\n' if noindex else ""
    class_attr = f' class="{body_class}"' if body_class else ""
    header = "" if bare else nav()
    page_footer = "" if bare else footer()
    return f"""<!doctype html>
<html lang="zh-CN" data-lang="zh">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
{robots}  <title>{e(title_zh)} | TaoThinks</title>
  <meta name="description" content="{e(description_en)}">
  <meta property="og:title" content="{e(title_en)} | TaoThinks">
  <meta property="og:description" content="{e(description_en)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{BASE_URL}{canonical_path}">
  <meta property="og:site_name" content="TaoThinks">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{e(title_en)} | TaoThinks">
  <meta name="twitter:description" content="{e(description_en)}">
  <link rel="canonical" href="{BASE_URL}{canonical_path}">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="/assets_taothinks/site.css">
</head>
<body{class_attr}>
{header}
{body}
{page_footer}
  <script src="/assets_taothinks/site.js"></script>
</body>
</html>"""


def post_card(post: dict[str, Any]) -> str:
    tags = " ".join(
        f'<a class="tag-pill" href="/tags/{e(tag)}/">{lang_span(TAG_LABELS[tag]["zh"], TAG_LABELS[tag]["en"])}</a>'
        for tag in post["tags"]
    )
    return f"""
    <article class="post-card">
      <span class="meta">{e(post["date"])}</span>
      <h2><a href="{post_url(post)}">{lang_span(post["title"]["zh"], post["title"]["en"])}</a></h2>
      {lang_pair("p", post["summary"]["zh"], post["summary"]["en"])}
      <div class="tag-list">{tags}</div>
    </article>
    """


def render_home(posts: list[dict[str, Any]]) -> str:
    cards = "\n".join(post_card(post) for post in posts)
    body = f"""
  <main>
    <section class="shell hero">
      <div>
        <p class="eyebrow">2026 / AI MindSet Book</p>
        <h1>TaoThinks</h1>
        {lang_pair("p", "每日问题、AI-native founder 思考，以及可复习、可打印的 mental model cards。", "Daily questions, AI-native founder thinking, and printable mental model cards for review.", "lead")}
        <div class="actions">
          <a class="button" href="/daily/">{lang_span("阅读每日思考", "Read Daily Posts")}</a>
          <a class="button secondary" href="/tags/">{lang_span("按标签浏览", "Browse Tags")}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        {lang_pair("h2", "最新每日思考", "Latest Daily Questions")}
        <div class="post-grid">{cards}</div>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        {lang_pair("h2", "Publishing System", "Publishing System")}
        <div class="grid">
          <article class="panel">
            <strong>{lang_span("问题优先", "Question First")}</strong>
            {lang_pair("h3", "每日一个真实问题", "One Real Question A Day")}
            {lang_pair("p", "从当天真正困扰的问题开始，再沉淀成可以长期复习的公开文章。", "Start with the question that is alive today, then turn it into a public note that can be reviewed later.")}
          </article>
          <article class="panel">
            <strong>{lang_span("双语阅读", "Bilingual")}</strong>
            {lang_pair("h3", "中文和英文一键切换", "Chinese And English Toggle")}
            {lang_pair("p", "站点会记住你的语言选择，文章、标签和打印页都支持切换。", "The site remembers your language choice across posts, tags, and print pages.")}
          </article>
          <article class="panel">
            <strong>{lang_span("公开过滤", "Public Filter")}</strong>
            {lang_pair("h3", "只发布可公开的思考", "Only Publish Public-Safe Thinking")}
            {lang_pair("p", "公司、客户和战略细节会被删除或抽象化，只保留可公开复习的 mental model。", "Company, customer, and strategy details are removed or generalized, leaving public-safe mental models.")}
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell archive-note">
        {lang_pair("p", "旧技术博客已保留在低可见度归档中，不进入当前搜索、标签和 sitemap。", "The old technical blog remains in a low-visibility archive and is not part of current search, tags, or sitemap.")}
        <a href="/legacy/">{lang_span("查看归档", "View Archive")}</a>
      </div>
    </section>
  </main>
    """
    return shell("TaoThinks", "TaoThinks", "每日问题和 AI MindSet Book。", "Daily questions and AI MindSet Book.", "/", body)


def render_about() -> str:
    body = f"""
  <main class="shell narrow">
    <section class="page-title">
      <p class="eyebrow">2026 / About</p>
      {lang_pair("h1", "把每日问题变成可复习的判断力。", "Turn daily questions into reusable judgment.")}
      {lang_pair("p", "TaoThinks 是 Tao Zhang 的个人发布空间，用来沉淀 AI、产品和 founder operating system 相关的每日思考。", "TaoThinks is Tao Zhang's personal publishing space for daily thinking around AI, products, and founder operating systems.", "lead")}
    </section>

    <section class="article-body">
      <article class="content-block">
        {lang_pair("h2", "发布原则", "Publishing Principle")}
        {lang_pair("p", "个人博客是 source of truth。社交平台拿到的是更短的中文和英文版本，长版本留在这里。", "The blog is the source of truth. Social platforms get shorter Chinese and English versions; the long version lives here.")}
      </article>
      <article class="content-block">
        {lang_pair("h2", "公开过滤", "Public Filter")}
        {lang_pair("p", "公开文章只保留可复习的 mental model。公司、客户、财务、计划细节和非公开执行信息不会进入发布内容。", "Public posts keep the reusable mental model. Company, customer, financial, planning, and non-public operating details are kept out of published content.")}
      </article>
      <article class="content-block">
        {lang_pair("h2", "打印", "Print")}
        {lang_pair("p", "每篇每日思考都有独立打印页，也有一个合并打印包，方便直接从浏览器打印成纸质复习卡。", "Each daily post has its own print page, plus a combined print pack that can be printed directly from the browser.")}
      </article>
    </section>
  </main>
    """
    return shell("关于", "About", "TaoThinks 的双语发布和打印系统。", "The bilingual publishing and print system behind TaoThinks.", "/about/", body)


def render_daily_index(posts: list[dict[str, Any]]) -> str:
    cards = "\n".join(post_card(post) for post in posts)
    body = f"""
  <main class="shell">
    <section class="page-title">
      <p class="eyebrow">AI MindSet Book / Daily</p>
      {lang_pair("h1", "每日思考", "Daily Questions")}
      {lang_pair("p", "每篇都是从 FounderOS daily card 过滤出来的公开版：双语、可打印、带标签。", "Each post is a public-safe version of a FounderOS daily card: bilingual, printable, and tagged.", "lead")}
      <div class="actions">
        <a class="button" href="/prints/ai-mindset-book.html">{lang_span("打印全部", "Print All")}</a>
        <a class="button secondary" href="/tags/">{lang_span("浏览标签", "Browse Tags")}</a>
      </div>
    </section>
    <section class="section">
      <div class="post-grid">{cards}</div>
    </section>
  </main>
    """
    return shell("每日思考", "Daily Questions", "TaoThinks 每日 AI 思考。", "TaoThinks daily AI thinking.", "/daily/", body)


def render_essay(post: dict[str, Any]) -> str:
    essay = post.get("essay")
    if not essay:
        return ""

    zh_paragraphs = essay.get("zh", [])
    en_paragraphs = essay.get("en", [])
    paragraph_count = max(len(zh_paragraphs), len(en_paragraphs))
    paragraphs = "\n".join(
        lang_pair(
            "p",
            zh_paragraphs[index] if index < len(zh_paragraphs) else "",
            en_paragraphs[index] if index < len(en_paragraphs) else "",
        )
        for index in range(paragraph_count)
    )
    return f"""
        <section class="content-block essay-block">
          {lang_pair("h2", "正文", "Essay")}
          <div class="essay-copy">{paragraphs}</div>
        </section>
    """


def render_discussion_prompt(post: dict[str, Any]) -> str:
    prompt = post.get("discussion_prompt")
    if not prompt:
        return ""

    return f"""
        <section class="content-block discussion-callout" id="discussion">
          {lang_pair("h2", "一起讨论", "Join The Discussion")}
          {lang_pair("p", prompt["zh"], prompt["en"])}
        </section>
    """


def render_article(post: dict[str, Any]) -> str:
    directions = "\n".join(
        f"""
        <article class="content-block">
          {lang_pair("h3", item["title"]["zh"], item["title"]["en"])}
          {lang_pair("p", item["body"]["zh"], item["body"]["en"])}
        </article>
        """
        for item in post["directions"]
    )
    tags = " ".join(
        f'<a class="tag-pill" href="/tags/{e(tag)}/">{lang_span(TAG_LABELS[tag]["zh"], TAG_LABELS[tag]["en"])}</a>'
        for tag in post["tags"]
    )
    examples = "\n".join(f"<li>{lang_span(item['zh'], item['en'])}</li>" for item in post["model"]["examples"])
    applications = "\n".join(f"<li>{lang_span(item['zh'], item['en'])}</li>" for item in post["model"]["applications"])
    recall = "\n".join(f"<li>{lang_span(item['zh'], item['en'])}</li>" for item in post["recall"])
    body = f"""
  <main class="article-shell">
    <article>
      <header class="article-header">
        <p class="eyebrow">{e(post["date"])} / AI MindSet Book</p>
        {lang_pair("h1", post["title"]["zh"], post["title"]["en"])}
        <div class="article-meta">
          <span>{lang_span("公开版", "Public Version")}</span>
          <span>{lang_span("双语", "Bilingual")}</span>
          <a href="{print_url(post)}">{lang_span("打印此文", "Print This")}</a>
        </div>
        <div class="tag-list">{tags}</div>
        <div class="public-note">{lang_span("这是一份公开版：公司、客户和非公开执行细节已删除或抽象化。", "This is a public version: company, customer, and non-public operating details have been removed or generalized.")}</div>
      </header>

      <div class="article-body">
        <section class="content-block">
          {lang_pair("h2", "今日问题", "Daily Question")}
          {lang_pair("p", post["question"]["zh"], post["question"]["en"])}
        </section>
        <section class="content-block">
          {lang_pair("h2", "30 秒答案", "30-Second Answer")}
          {lang_pair("p", post["summary"]["zh"], post["summary"]["en"])}
        </section>{render_essay(post)}
        <section>
          {lang_pair("h2", "关键方向", "Key Directions")}
          <div class="direction-list">{directions}</div>
        </section>
        <section class="content-block model-card">
          {lang_pair("h2", "Mental Model Card", "Mental Model Card")}
          {lang_pair("h3", post["model"]["title"]["zh"], post["model"]["title"]["en"])}
          {lang_pair("p", post["model"]["one_sentence"]["zh"], post["model"]["one_sentence"]["en"])}
          <div class="flow">{lang_span(post["model"]["pattern"]["zh"], post["model"]["pattern"]["en"])}</div>
        </section>
        <section class="content-block">
          {lang_pair("h2", "Core Idea", "Core Idea")}
          {lang_pair("p", post["model"]["core_idea"]["zh"], post["model"]["core_idea"]["en"])}
        </section>
        <section class="content-block">
          {lang_pair("h2", "Examples", "Examples")}
          <ul>{examples}</ul>
        </section>
        <section class="content-block">
          {lang_pair("h2", "Applications", "Applications")}
          <ul>{applications}</ul>
        </section>
        <section class="content-block">
          {lang_pair("h2", "一句值得记住的话", "Quote")}
          <p class="quote">{lang_span(post["model"]["quote"]["zh"], post["model"]["quote"]["en"])}</p>
        </section>{render_discussion_prompt(post)}
        <section class="content-block">
          {lang_pair("h2", "Active Recall", "Active Recall")}
          <ol>{recall}</ol>
        </section>
      </div>
    </article>
  </main>
    """
    return shell(post["title"]["zh"], post["title"]["en"], post["summary"]["zh"], post["summary"]["en"], post_url(post), body)


def render_print_page(post: dict[str, Any]) -> str:
    return render_print_pack([post], canonical_path=print_url(post), title=f"{post['title']['zh']} Print")


def print_sheet(post: dict[str, Any]) -> str:
    directions = "\n".join(
        f"<li>{lang_span(item['title']['zh'], item['title']['en'])}: {lang_span(item['body']['zh'], item['body']['en'])}</li>"
        for item in post["directions"][:4]
    )
    recall = "\n".join(f"<li>{lang_span(item['zh'], item['en'])}</li>" for item in post["recall"])
    return f"""
    <section class="print-sheet">
      <p class="eyebrow">{e(post["date"])} / AI MindSet Book</p>
      {lang_pair("h1", post["title"]["zh"], post["title"]["en"])}
      <div class="print-grid">
        <article class="print-card">
          {lang_pair("h2", "今日问题", "Daily Question")}
          {lang_pair("p", post["question"]["zh"], post["question"]["en"])}
        </article>
        <article class="print-card">
          {lang_pair("h2", "30 秒答案", "30-Second Answer")}
          {lang_pair("p", post["summary"]["zh"], post["summary"]["en"])}
        </article>
        <article class="print-card">
          {lang_pair("h2", "关键方向", "Key Directions")}
          <ul>{directions}</ul>
        </article>
        <article class="print-card">
          {lang_pair("h2", "Mental Model", "Mental Model")}
          {lang_pair("p", post["model"]["one_sentence"]["zh"], post["model"]["one_sentence"]["en"])}
          <p class="flow">{lang_span(post["model"]["pattern"]["zh"], post["model"]["pattern"]["en"])}</p>
        </article>
        <article class="print-card">
          {lang_pair("h2", "一句话记住", "Memorable Quote")}
          <p class="quote">{lang_span(post["model"]["quote"]["zh"], post["model"]["quote"]["en"])}</p>
        </article>
        <article class="print-card">
          {lang_pair("h2", "Active Recall", "Active Recall")}
          <ol>{recall}</ol>
        </article>
      </div>
    </section>
    """


def render_print_pack(posts: list[dict[str, Any]], *, canonical_path: str = "/prints/ai-mindset-book.html", title: str = "AI MindSet Book Print Pack") -> str:
    sheets = "\n".join(print_sheet(post) for post in posts)
    body = f"""
  <div class="print-toolbar no-print">
    <div class="shell">
      <a class="brand" href="/daily/"><span class="mark">T</span><span>TaoThinks</span></a>
      <div class="nav-actions">
        <div class="language-toggle" aria-label="Language switcher">
          <button type="button" data-lang-switch="zh">中文</button>
          <button type="button" data-lang-switch="en">EN</button>
        </div>
        <button class="button" type="button" onclick="window.print()">{lang_span("打印", "Print")}</button>
      </div>
    </div>
  </div>
  <main>{sheets}</main>
    """
    return shell(title, title, "AI MindSet Book 可打印版本。", "Printable AI MindSet Book pages.", canonical_path, body, noindex=True, body_class="print-body", bare=True)


def render_tags_index(posts: list[dict[str, Any]]) -> str:
    counts = tag_counts(posts)
    cards = "\n".join(
        f"""
        <article class="tag-card">
          <span class="meta">{counts[tag]} posts</span>
          <h2><a href="/tags/{e(tag)}/">{lang_span(TAG_LABELS[tag]["zh"], TAG_LABELS[tag]["en"])}</a></h2>
          {lang_pair("p", f"浏览 {TAG_LABELS[tag]['zh']} 相关的每日思考。", f"Browse daily questions tagged {TAG_LABELS[tag]['en']}.")}
        </article>
        """
        for tag in sorted(counts)
    )
    body = f"""
  <main class="shell">
    <section class="page-title">
      <p class="eyebrow">TaoThinks / Tags</p>
      {lang_pair("h1", "标签", "Tags")}
      {lang_pair("p", "用标签快速找到同一类 mental model 和每日问题。", "Use tags to quickly find related mental models and daily questions.", "lead")}
    </section>
    <section class="section">
      <div class="tag-grid">{cards}</div>
    </section>
  </main>
    """
    return shell("标签", "Tags", "TaoThinks 标签索引。", "TaoThinks tag index.", "/tags/", body)


def render_tag_page(tag: str, posts: list[dict[str, Any]]) -> str:
    label = TAG_LABELS[tag]
    cards = "\n".join(post_card(post) for post in posts if tag in post["tags"])
    body = f"""
  <main class="shell">
    <section class="page-title">
      <p class="eyebrow">Tag</p>
      {lang_pair("h1", label["zh"], label["en"])}
      {lang_pair("p", f"{label['zh']} 相关的每日思考。", f"Daily questions related to {label['en']}.", "lead")}
    </section>
    <section class="section">
      <div class="post-grid">{cards}</div>
    </section>
  </main>
    """
    return shell(label["zh"], label["en"], f"{label['zh']} 标签文章。", f"Posts tagged {label['en']}.", f"/tags/{tag}/", body)


def tag_counts(posts: list[dict[str, Any]]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for post in posts:
        for tag in post["tags"]:
            counts[tag] = counts.get(tag, 0) + 1
    return counts


def post_search_content(post: dict[str, Any]) -> str:
    parts = [post["summary"]["en"]]
    parts.extend(post.get("essay", {}).get("en", []))
    return " ".join(parts)


def render_search(posts: list[dict[str, Any]]) -> str:
    entries = [
        ("TaoThinks", "/", "Daily questions, AI-native founder thinking, and printable mental model cards."),
        ("Daily Questions", "/daily/", "Bilingual daily AI thinking posts."),
        ("Tags", "/tags/", "Browse TaoThinks posts by tag."),
        ("About TaoThinks", "/about/", "The TaoThinks publishing and print system."),
    ]
    for post in posts:
        entries.append((post["title"]["en"], post_url(post), post_search_content(post)))
    xml_entries = "\n".join(
        f"""  <entry>
    <title><![CDATA[{title}]]></title>
    <url><![CDATA[{BASE_URL}{path}]]></url>
    <content><![CDATA[{content}]]></content>
  </entry>"""
        for title, path, content in entries
    )
    return f"""<?xml version="1.0" encoding="utf-8"?>
<search>
{xml_entries}
</search>"""


def render_content_json(posts: list[dict[str, Any]]) -> str:
    pages: list[dict[str, str]] = [
        {
            "title": "TaoThinks",
            "url": f"{BASE_URL}/",
            "date": f"{PUBLIC_DATE}T00:00:00.000Z",
            "content": "Daily questions, AI-native founder thinking, and printable mental model cards.",
        },
        {
            "title": "Daily Questions",
            "url": f"{BASE_URL}/daily/",
            "date": f"{PUBLIC_DATE}T00:00:00.000Z",
            "content": "Bilingual daily AI thinking posts.",
        },
        {
            "title": "Tags",
            "url": f"{BASE_URL}/tags/",
            "date": f"{PUBLIC_DATE}T00:00:00.000Z",
            "content": "Browse TaoThinks posts by tag.",
        },
    ]
    post_entries = [
        {
            "title": post["title"]["en"],
            "url": f"{BASE_URL}{post_url(post)}",
            "date": f"{post['date']}T00:00:00.000Z",
            "content": post_search_content(post),
            "tags": post["tags"],
        }
        for post in posts
    ]
    payload = {
        "meta": {
            "title": "TaoThinks",
            "subtitle": "Daily questions for an AI-native founder",
            "description": "Tao Zhang's bilingual 2026 publishing home for AI, product, and founder operating-system thinking.",
            "author": "Tao Zhang",
            "url": BASE_URL,
            "root": "/",
        },
        "pages": pages,
        "posts": post_entries,
    }
    return json.dumps(payload, ensure_ascii=False, indent=2)


def render_sitemap(posts: list[dict[str, Any]]) -> str:
    paths = ["/", "/about/", "/daily/", "/tags/"]
    paths.extend(post_url(post) for post in posts)
    paths.extend(f"/tags/{tag}/" for tag in sorted(tag_counts(posts)))
    urls = "\n".join(
        f"""  <url>
    <loc>{BASE_URL}{path}</loc>
    <lastmod>{PUBLIC_DATE}T00:00:00.000Z</lastmod>
  </url>"""
        for path in paths
    )
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls}
</urlset>"""


def render_robots() -> str:
    return f"""User-agent: *
Disallow: /2015/
Disallow: /2017/
Disallow: /archives/
Disallow: /categories/
Disallow: /page/
Disallow: /legacy/
Disallow: /blog/
Disallow: /playground/
Disallow: /quote_test/
Disallow: /quote_demo_test/
Disallow: /assets_fixerup/
Disallow: /media/
Disallow: /privacy.html
Disallow: /terms.html
Disallow: /ai-safety.html
Disallow: /buildforyou.html

Sitemap: {BASE_URL}/sitemap.xml"""


def generate() -> list[Path]:
    data = load_data()
    source_dir = Path(data.get("source_dir", ""))
    validate_public_content(data, source_dir)
    posts = sorted(data["posts"], key=lambda item: item["date"], reverse=True)
    changed: list[Path] = []

    outputs: dict[Path, str] = {
        ROOT / "index.html": render_home(posts),
        ROOT / "about" / "index.html": render_about(),
        ROOT / "daily" / "index.html": render_daily_index(posts),
        ROOT / "tags" / "index.html": render_tags_index(posts),
        ROOT / "prints" / "ai-mindset-book.html": render_print_pack(posts),
        ROOT / "search.xml": render_search(posts),
        ROOT / "content.json": render_content_json(posts),
        ROOT / "sitemap.xml": render_sitemap(posts),
        ROOT / "robots.txt": render_robots(),
    }

    for post in posts:
        outputs[ROOT / "daily" / post["slug"] / "index.html"] = render_article(post)
        outputs[ROOT / "daily" / post["slug"] / "print.html"] = render_print_page(post)

    for tag in tag_counts(posts):
        outputs[ROOT / "tags" / tag / "index.html"] = render_tag_page(tag, posts)

    for path, content in outputs.items():
        old = path.read_text(encoding="utf-8") if path.exists() else None
        if old != normalize_output(content):
            write(path, content)
            changed.append(path)

    return changed


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def publish(message: str) -> None:
    run(["git", "add", "-A"])
    status = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=ROOT)
    if status.returncode == 0:
        print("No staged changes to publish.")
        return
    run(["git", "commit", "-m", message])
    branch = subprocess.check_output(["git", "branch", "--show-current"], cwd=ROOT, text=True).strip()
    run(["git", "push", "origin", branch])


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--publish", action="store_true", help="Commit and push generated changes.")
    parser.add_argument("--message", default="Publish AI MindSet Book posts", help="Commit message used with --publish.")
    args = parser.parse_args()

    changed = generate()
    print(f"Generated {len(changed)} changed files.")
    for path in changed:
        print(path.relative_to(ROOT))
    if args.publish:
        publish(args.message)


if __name__ == "__main__":
    main()
