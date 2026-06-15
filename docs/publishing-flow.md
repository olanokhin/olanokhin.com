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

## MVP Automation

Start with a deliberately small loop:

```text
Obsidian note or saved URL
  -> AI agent creates draft Markdown with status: draft
  -> Alex reviews in Obsidian
  -> Telegram approve command
  -> n8n commits the file to GitHub with status: published
  -> Vercel builds production
```

Keep ideation and private notes outside this repository. The website repo should only receive reviewable draft files or approved published files that match the content schema.

## Obsidian Draft Template

```yaml
---
title: ""
slug: ""
date: ""
status: "draft"
topics: []
source_urls: []
importance: 3
summary: ""
take: ""
linkedin_hook: ""
image: ""
image_alt: ""
thumbnail: ""
thumbnail_alt: ""
---
```

Recommended note sections:

```md
## Raw source

## Why this may matter

## Draft

## Review notes
```

## Agent Contract

The agent should output only a Markdown file compatible with `src/content/news`. It should never set `status: published` unless the approval step explicitly asks it to publish.

Validation checklist before commit:

- `slug` is lowercase kebab-case.
- `source_urls` contains original sources, not reposts.
- `summary` is one sentence.
- `take` is a personal technical interpretation, not a generic conclusion.
- Body has no H1 and does not invent facts.
- Images use public paths like `/img/news/example.png`.

## n8n Implementation Notes

Minimum nodes:

```text
Manual trigger / Cron
  -> Source fetch
  -> OpenAI draft generation
  -> GitHub create/update file as draft
  -> Telegram message with approve/reject buttons
  -> GitHub update file to published on approve
```

Use GitHub as the publishing boundary. Do not call Vercel directly for content publication; the GitHub commit should trigger Vercel.

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
