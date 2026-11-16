import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { TAG_KEYS, OLR_KEYS } from './consts';

const tag = z.enum(TAG_KEYS);

// Files starting with "_" (like _template.md) are ignored.
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      tags: z.array(tag).min(1),
      // School learning outcomes this post shows evidence for, e.g. [OLR01-I-1].
      olr: z.array(z.enum(OLR_KEYS)).default([]),
      // Who worked on this, as ids from src/data/team.json. Leave out when we all did.
      authors: z.array(z.string()).optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // How AI was used for this post's work, and how we judged its output.
      ai: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const team = defineCollection({
  loader: file('./src/data/team.json'),
  schema: z.object({
    name: z.string(),
    roles: z.array(z.string()),
    tasks: z.array(z.string()),
  }),
});

const hours = defineCollection({
  loader: file('./src/data/hours.json'),
  schema: z.object({
    date: z.coerce.date(),
    hours: z.number().positive(),
    tag: tag.optional(),
    task: z.string().default(''),
    person: z.string().optional(), // team.json id, or the Toggl name if it didn't match
  }),
});

export const collections = { posts, team, hours };
