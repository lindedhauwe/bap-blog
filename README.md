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
| `src/data/hours.json` | /hours | One entry per person per task: `id` (unique), `date`, `person`, `hours`, optional `tag`, `task` |
| `src/data/planning.json` | /planning | Phases with `start`, `end`, `goal` and `tasks` (`status`: `todo`, `doing`, `done`) |
| `src/data/team.json` | /team | Each member's `roles` and `tasks` |

Every entry needs a unique `id`. Mistakes (missing fields, unknown tags) show up as errors in `npm run dev`.

## Deploying to GitHub Pages

1. Create a GitHub repo and push this project to `main`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys. The URL is `https://<username>.github.io/<repo>/`.

The base path is derived from the repo name automatically (see `astro.config.mjs`).
