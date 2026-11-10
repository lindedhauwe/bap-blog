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

// Assessment moments for the learning outcomes (OLRs).
export const MOMENTS = {
  pitchdeck: { label: 'Pitch deck', date: '2026-11-01' },
  testmoment: { label: 'Test moment', date: '2026-12-04' },
  jury: { label: 'Jury', date: '2026-12-17' },
} as const;

type Moment = keyof typeof MOMENTS;
type Assessor = 'Client' | 'Other clients' | 'Expert desk' | 'DEVINE coach';

// Learning outcomes from school. `nl` is the official wording.
export const OLRS: Record<string, { name: string; text: string; nl: string; assessed: Partial<Record<Moment, Assessor[]>> }> = {
  'OLR01-I-1': {
    name: 'Interactive concept',
    text: 'Synthesises insights about a complex challenge into a convincing digital interactive concept.',
    nl: 'De student synthetiseert inzichten omtrent een complexe uitdaging tot een overtuigend digitaal interactief concept.',
    assessed: { pitchdeck: ['Client'], testmoment: ['Expert desk'], jury: ['Client', 'Other clients', 'Expert desk'] },
  },
  'OLR02-I-1': {
    name: 'Process choices',
    text: 'Justifies process choices in relation to the briefing, strategy and intended result.',
    nl: 'De student verantwoordt procesmatige keuzes in relatie tot briefing, strategie en beoogd eindresultaat.',
    assessed: { testmoment: ['Expert desk'], jury: ['Client', 'Other clients', 'Expert desk'] },
  },
  'OLR03-T-4': {
    name: 'Testing with the target group',
    text: 'Tests choices and prototypes with the target group during the different phases of a project.',
    nl: 'De student toetst tijdens verschillende fases van een project de gemaakte keuzes of prototypes bij de doelgroep.',
    assessed: { pitchdeck: ['Client'], testmoment: ['Expert desk'] },
  },
  'OLR03-I-1': {
    name: 'Visual identity',
    text: 'Creates a consistent, fitting and creative visual identity for the whole project.',
    nl: 'De student creëert een consistente, passende en creatieve visuele identiteit voor het gehele project.',
    assessed: { testmoment: ['Expert desk'], jury: ['Expert desk'] },
  },
  'OLR03-I-2': {
    name: 'Holistic design',
    text: 'Takes a holistic perspective when designing applications and experiences.',
    nl: 'De student hanteert een holistisch perspectief tijdens het ontwerpen van toepassingen en ervaringen.',
    assessed: { jury: ['Client', 'Expert desk'] },
  },
  'OLR04-I-2': {
    name: 'Innovative tech',
    text: 'Experiments critically with innovative technology to create groundbreaking interactions.',
    nl: 'De student experimenteert op kritische wijze met innovatieve tech om grensverleggende interacties te creëren.',
    assessed: { testmoment: ['Expert desk'], jury: ['Expert desk'] },
  },
  'OLR05-I-3': {
    name: 'Inclusive & empathic design',
    text: 'Creates from an inclusive and empathic mindset in every phase of a project.',
    nl: 'De student creëert vanuit een inclusieve en empathische mindset in alle fases van een project.',
    assessed: { testmoment: ['Expert desk'], jury: ['Client', 'Expert desk'] },
  },
  'OLR06-I-1': {
    name: 'Professional communication',
    text: 'Manages the professional flow of communication in an (international) context.',
    nl: 'De student beheerst de professionele communicatiestroom in een (internationale) context.',
    assessed: { pitchdeck: ['Client'], jury: ['Client', 'Other clients', 'Expert desk', 'DEVINE coach'] },
  },
  'OLR08-I-1': {
    name: 'Positive impact',
    text: 'Justifies choices based on their positive and lasting impact on people and the world.',
    nl: 'De student verantwoordt gemaakte keuzes op basis van hun positieve en duurzame impact op mens en de wereld.',
    assessed: { jury: ['Client', 'Other clients', 'Expert desk', 'DEVINE coach'] },
  },
  'OLR09-I-1': {
    name: 'Collaboration',
    text: 'Works constructively with colleagues and stakeholders from different disciplinary and cultural backgrounds.',
    nl: 'De student werkt op constructieve wijze samen met collega’s en stakeholders met verschillende disciplinaire en culturele achtergronden.',
    assessed: { pitchdeck: ['Client'], jury: ['Client', 'DEVINE coach'] },
  },
};

export const OLR_KEYS = Object.keys(OLRS) as [string, ...string[]];
export const olrAnchor = (code: string) => code.toLowerCase();
