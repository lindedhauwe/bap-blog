// @ts-check
import { defineConfig } from 'astro/config';

// On GitHub Actions, GITHUB_REPOSITORY is "owner/repo".
// We derive the GitHub Pages URL from it, so no manual config is needed.
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = repo && repo === `${owner}.github.io`;

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : 'http://localhost:4321',
  base: repo && !isUserSite ? `/${repo}` : '/',
});
