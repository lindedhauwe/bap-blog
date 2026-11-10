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

// Learning outcomes (OLRs) and their assessment moments, exactly as given by school.
export const MOMENTS = {
  pitchdeck: { label: 'Pitchdeck', date: '1 nov' },
  testmoment: { label: 'Testmoment', date: '4 dec' },
  jury: { label: 'Jury', date: '17 dec' },
} as const;

type Moment = keyof typeof MOMENTS;

export const OLRS: Record<string, { text: string; assessed: Partial<Record<Moment, string[]>> }> = {
  'OLR01-I-1': {
    text: 'The student synthesises insights about a complex challenge into a compelling digital interactive concept.',
    assessed: { pitchdeck: ['Client'], testmoment: ['Expert desk'], jury: ['Client', 'Other clients', 'Expert desk'] },
  },
  'OLR02-I-1': {
    text: 'The student justifies process-related choices in relation to the briefing, strategy and intended end result.',
    assessed: { testmoment: ['Expert desk'], jury: ['Client', 'Other clients', 'Expert desk'] },
  },
  'OLR03-T-4': {
    text: 'The student tests the choices made or the prototypes with the target audience during the various phases of a project.',
    assessed: { pitchdeck: ['Client'], testmoment: ['Expert desk'] },
  },
  'OLR03-I-1': {
    text: 'The student creates a consistent, fitting and creative visual identity for the entire project.',
    assessed: { testmoment: ['Expert desk'], jury: ['Expert desk'] },
  },
  'OLR03-I-2': {
    text: 'The student adopts a holistic perspective when designing applications and experiences.',
    assessed: { jury: ['Client', 'Expert desk'] },
  },
  'OLR04-I-2': {
    text: 'The student experiments critically with innovative technology to create groundbreaking interactions.',
    assessed: { testmoment: ['Expert desk'], jury: ['Expert desk'] },
  },
  'OLR05-I-3': {
    text: 'The student creates from an inclusive and empathetic mindset in all phases of a project.',
    assessed: { testmoment: ['Expert desk'], jury: ['Client', 'Expert desk'] },
  },
  'OLR06-I-1': {
    text: 'The student masters the flow of professional communication in an (international) context.',
    assessed: { pitchdeck: ['Client'], jury: ['Client', 'Other clients', 'Expert desk', 'Devine coach'] },
  },
  'OLR08-I-1': {
    text: 'The student justifies the choices made on the basis of their positive and sustainable impact on people and the world.',
    assessed: { jury: ['Client', 'Other clients', 'Expert desk', 'Devine coach'] },
  },
  'OLR09-I-1': {
    text: 'The student collaborates constructively with colleagues and stakeholders from different disciplinary and cultural backgrounds.',
    assessed: { pitchdeck: ['Client'], jury: ['Client', 'Devine coach'] },
  },
};

export const OLR_KEYS = Object.keys(OLRS) as [string, ...string[]];
export const olrAnchor = (code: string) => code.toLowerCase();
