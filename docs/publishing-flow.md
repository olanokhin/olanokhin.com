# Publishing Flow

## Roles

- Obsidian: personal drafting vault and candidate inbox.
- n8n: automation, summarization, dedupe, Telegram review, and GitHub publishing.
- Telegram: approval cockpit.
- GitHub: source of truth for published content.
- Vercel: static deployment from GitHub.

## Recommended Flow

```text
n8n cron
  -> source collection
  -> dedupe and relevance scoring
  -> draft in Obsidian-compatible Markdown
  -> Telegram review
  -> approve / rewrite / reject
  -> GitHub API creates MDX file in src/content/news
  -> Vercel deploys Astro site
```

## Obsidian Vault Shape

Keep drafts outside the website repository unless you intentionally want all private notes in Git.

```text
AI-News-Vault/
  Inbox/
  Candidates/
  Drafts/
  Approved/
  Rejected/
  Published/
```

Only the final approved article should be copied into this website repo.

## News Frontmatter Contract

```yaml
---
title: ""
slug: ""
date: "2026-06-15"
status: "published"
topics: []
source_urls: []
importance: 3
summary: ""
take: ""
linkedin_hook: ""
---
```

## Publication Rule

Telegram approval should publish to GitHub, not directly to Vercel. Vercel should remain a pure build target.
