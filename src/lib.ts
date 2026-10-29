import { getCollection } from 'astro:content';
import { TAG_KEYS } from './consts';

// Published posts, newest first. Drafts only show up in `npm run dev`.
export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function countTags(posts: Awaited<ReturnType<typeof getPosts>>) {
  return Object.fromEntries(
    TAG_KEYS.map((key) => [key, posts.filter((p) => p.data.tags.includes(key)).length]),
  );
}
