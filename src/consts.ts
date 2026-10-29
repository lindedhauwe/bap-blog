export const SITE_TITLE = 'Bachelor Thesis — Process Blog';
export const SITE_DESCRIPTION =
  'Our process and progress during the DEVINE bachelor thesis: research, design, development, feedback and the choices we make along the way.';

// Filters shown on the blog. Add a new one here and it becomes
// available in post frontmatter, on the homepage and as /tags/<key>/.
export const TAGS = {
  ux: { label: 'UX', color: 'var(--tag-ux)' },
  design: { label: 'Design', color: 'var(--tag-design)' },
  development: { label: 'Development', color: 'var(--tag-dev)' },
  feedback: { label: 'Feedback & meetings', color: 'var(--tag-feedback)' },
} as const;

export type Tag = keyof typeof TAGS;
export const TAG_KEYS = Object.keys(TAGS) as [Tag, ...Tag[]];

// Prefix internal links with the base path (needed on GitHub Pages).
export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
