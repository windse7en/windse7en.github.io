# TaoThinks Site Architecture

Updated: 2026-07-11

## Current Setup

This repo is the static GitHub Pages output repo for `taothinks.live`.

- GitHub repo: the existing GitHub Pages user-site repo
- Production domain: `https://taothinks.live`
- Custom domain file: `/CNAME`
- Public homepage: `/index.html`
- Public about page: `/about/index.html`
- Public daily index: `/daily/index.html`
- Public tag index: `/tags/index.html`
- Public print pack: `/prints/ai-mindset-book.html`
- Public AI MindSet source data: `/data/ai-mindset-posts.json`
- Publishing script: `/scripts/publish_ai_mindset.py`
- Frontend behavior: `/assets_taothinks/site.js`
- Public integrations: configured in `/data/ai-mindset-posts.json`
- Search feed: `/search.xml`
- Public sitemap: `/sitemap.xml`
- Search crawler policy: `/robots.txt`

The repo currently contains generated static HTML, plus a small TaoThinks generator for AI MindSet posts. Quick deployment is easy, but old generated pages and legacy vendor folders still make the repo heavier than it should be.

## Public Surface

New visitors should primarily see:

- `/`
- `/about/`
- `/daily/`
- `/daily/YYYY-MM-DD-slug/`
- `/tags/`
- `/tags/tag-name/`
- `/prints/ai-mindset-book.html`, which is noindexed and meant for direct printing
- `sitemap.xml`, which only lists the public TaoThinks pages
- `search.xml`, which only indexes TaoThinks public pages

All public copy uses `TaoThinks`, 2026, and the bilingual language switcher.

## Analytics And Discussion

TaoThinks keeps the site static and uses external services for dynamic behavior.

- Analytics provider: GoatCounter
- Analytics endpoint: configured under `integrations.analytics.endpoint`
- Language split: pageviews are sent as `canonical-path::zh` or `canonical-path::en`
- Discussion provider: Giscus
- Discussion repo: configured under `integrations.giscus.repo`

Giscus requires three GitHub-side prerequisites before it can be fully enabled:

- the repository must be public
- GitHub Discussions must be enabled
- the Giscus GitHub app must be installed on the repository

Once those are done, fill `integrations.giscus.category` and `integrations.giscus.categoryId` in `/data/ai-mindset-posts.json`, set `integrations.giscus.enabled` to `true`, and rerun the publish script.

## AI MindSet Publishing

FounderOS daily cards are not published directly.

The public flow is:

```text
FounderOS daily markdown
↓
reviewed public bilingual JSON
↓
scripts/publish_ai_mindset.py
↓
TaoThinks static pages
```

The reviewed JSON removes or generalizes company, customer, and non-public operating details before generation.

## Legacy Archive

Older posts are preserved but removed from normal discovery.

- Entry point: `/legacy/`
- Old post years: `/2015/`, `/2017/`
- Old archive index: `/archives/`
- Old category index: `/categories/`
- Old tag subpages under `/tags/...` remain noindexed, while `/tags/` is now the current public tag index

Archive pages are protected in three ways:

- `robots.txt` disallows crawler paths
- legacy HTML pages receive `noindex, nofollow`
- old posts are removed from `search.xml`, `content.json`, and `sitemap.xml`

The old post dates are kept as historical archive dates. The public TaoThinks shell and metadata use 2026.

## Business-Content Filter

Public TaoThinks posts should avoid exposing:

- FixerUp commercial strategy
- customer names, quotes, or sensitive customer context
- revenue, pricing, margin, CAC, pipeline, or conversion assumptions
- non-public roadmap details
- internal hiring, fundraising, or partnership plans
- competitive positioning that would help a competitor

Use the blog for durable public learning. Keep company strategy in private founder notes.

## Recommended Upgrades

1. Rebuild the site from source instead of editing generated HTML directly.
   A small static-site setup such as Astro, Eleventy, or Hugo would make bilingual posts, archives, tags, and SEO safer to maintain.

2. Create a real content model.
   Suggested fields: `title`, `slug`, `date`, `language`, `canonicalLanguage`, `visibility`, `platformDrafts`, `publicRisk`, `tags`, and `summary`.

3. Add a publish checklist.
   Each post should pass a confidentiality scan before going public.

4. Separate legacy content physically later.
   The cleanest long-term path is moving old generated posts to a separate `legacy/` folder or separate archive repo, then adding redirects for only the links you care about.

5. Add build-time tests.
   Check that the sitemap has only public URLs, search does not include archived posts, and every legacy page has a `noindex` tag.

6. Remove vendored legacy dependencies.
   GitHub currently reports dependency vulnerabilities on the default branch. The likely cause is old generated/vendor folders such as playground dependency assets. The safest fix is to remove unused vendor trees from the published repo or move them to a private archive.
