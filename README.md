# Bachelor thesis — process blog

Astro blog to document our process and progress. Deployed to GitHub Pages on every push to `main`.

## Run locally

```sh
npm install
npm run dev     # http://localhost:4321
```

## Writing a post

1. Copy `src/content/posts/_template.md` to a new folder: `src/content/posts/YYYY-MM-DD-short-title/index.md`
2. Put images in that same folder and use `![alt text](./image.jpg)`.
3. Fill in the frontmatter (`title`, `date`, `description`, `tags`, optional `ai`).
4. Remove `draft: true` to publish. Drafts are visible in `npm run dev` only.

Tags: `ux`, `design`, `development`, `feedback`. A post can have several. New tags: add them to `TAGS` in `src/consts.ts`.

Embedding Figma/FigJam/YouTube: paste the `<iframe>` embed code straight into the markdown.

## Data files

| File | Page | What |
| --- | --- | --- |
| `src/data/hours.json` | /hours | Filled from Toggl on every deploy (see below). Manual entries: `id`, `date`, `hours`, optional `tag`, `task` |
| `src/data/planning.json` | /planning | Generated from Notion on every deploy (see below), don't edit by hand |
| `src/data/team.json` | /team | Each member's `roles` and `tasks` |

Every entry needs a unique `id`. Mistakes (missing fields, unknown tags) show up as errors in `npm run dev`.

## Hours from Toggl

Every deploy (and every morning at 06:00) the workflow imports our Toggl Track entries with `scripts/fetch-toggl.mjs`.

- Only entries in a project with **BAP** in its name count (e.g. "BAP UX", "BAP Design"). Other projects stay private.
- The GitHub secret `TOGGL_TOKENS` holds the API token of each team member, separated by commas.
- A Toggl project or tag with *UX*, *Research*, *Design*, *Development*, *Dev*, *Feedback* or *Meeting* in its name sets the topic. Anything else shows up as "Other".
- Running timers are skipped until they're stopped.
- Toggl descriptions are shown on the public hours page.
- To try it locally: put `TOGGL_TOKENS=...` in a `.env` file (never commit it) and run `npm run toggl`.

## Planning from Notion

Every deploy (and every morning) the workflow imports our planning from the Notion page **BaP - Boektopia** with `scripts/fetch-notion.mjs`.

- Databases named **Tasks week N** become the weeks on /planning (week 1 starts on Monday 26 October). Add a "Tasks week 7" database in Notion and it shows up automatically.
- Databases named **Deadlines & milestones** become the deadlines.
- The GitHub secret `NOTION_TOKEN` holds the token of the "BAP blog" connection in Notion. The page must be shared with that connection.
- To try it locally: put `NOTION_TOKEN=...` in `.env` and run `npm run notion`.

## Deploying to GitHub Pages

1. Create a GitHub repo and push this project to `main`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys. The URL is `https://<username>.github.io/<repo>/`.

The base path is derived from the repo name automatically (see `astro.config.mjs`).
