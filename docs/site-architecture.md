# TaoThinks Site Architecture

Updated: 2026-07-11

## Current Setup

This repo is the static GitHub Pages output repo for `taothinks.live`.

- GitHub repo: the existing GitHub Pages user-site repo
- Production domain: `https://taothinks.live`
- Custom domain file: `/CNAME`
- Public homepage: `/index.html`
- Public about page: `/about/index.html`
- Search feed: `/search.xml`
- Public sitemap: `/sitemap.xml`
- Search crawler policy: `/robots.txt`

The repo currently contains generated static HTML rather than a clean source/content system. That means quick deployment is easy, but editing many posts manually is fragile.

## Public Surface

New visitors should primarily see:

- `/`
- `/about/`
- `sitemap.xml`, which only lists the public TaoThinks pages
- `search.xml`, which only indexes TaoThinks public pages

All public copy has been updated to `TaoThinks` and 2026.

## Legacy Archive

Older posts are preserved but removed from normal discovery.

- Entry point: `/legacy/`
- Old post years: `/2015/`, `/2017/`
- Old archive index: `/archives/`
- Old tags/categories: `/tags/`, `/categories/`

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
