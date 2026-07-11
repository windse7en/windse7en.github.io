# AI MindSet Publishing Workflow

Updated: 2026-07-11

## Goal

Publish FounderOS AI MindSet Book daily cards into TaoThinks as public-safe bilingual posts.

## Source

- Daily source cards: `/Users/zhangtao/src/FounderOS/ai-mindset-book/daily/`
- Local print export reference: `/Users/zhangtao/src/FounderOS/exports/ai-mindset-book.html`
- Public publishing data: `/Users/zhangtao/src/windse7en.github.io/data/ai-mindset-posts.json`

## Public Safety Rule

Do not publish raw FounderOS daily markdown directly.

Before publishing, convert each daily card into a public-safe bilingual record in `data/ai-mindset-posts.json`.

Remove or generalize:

- company-specific strategy
- customer details
- pricing, revenue, pipeline, margin, CAC, roadmap, or private operating assumptions
- internal source links
- examples that reveal non-public positioning

The generator also has a denylist check and will fail if reviewed public content contains known confidential terms.

## Generate Locally

```bash
cd /Users/zhangtao/src/windse7en.github.io
./scripts/publish_ai_mindset.sh
```

This regenerates:

- `/daily/`
- `/daily/YYYY-MM-DD-slug/`
- `/daily/YYYY-MM-DD-slug/print.html`
- `/prints/ai-mindset-book.html`
- `/tags/`
- `/search.xml`
- `/sitemap.xml`
- `/content.json`
- `/robots.txt`

## Publish

```bash
cd /Users/zhangtao/src/windse7en.github.io
./scripts/publish_ai_mindset.sh --publish --message "Publish AI MindSet Book posts"
```

This stages generated changes, commits them, and pushes the current branch.

## Verification Checklist

Run before publishing:

```bash
rg -n "FixerUp|fixerup|Home AI|Listing Ready|contractor|homeowner|inspection report" \
  index.html about daily tags prints search.xml content.json sitemap.xml
python3 -m http.server 4177
```

Open:

- `http://127.0.0.1:4177/`
- `http://127.0.0.1:4177/daily/`
- `http://127.0.0.1:4177/tags/`
- `http://127.0.0.1:4177/prints/ai-mindset-book.html`

Check language toggle, post links, tag links, and print layout.
