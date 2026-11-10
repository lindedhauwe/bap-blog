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
    text: 'De student synthetiseert inzichten omtrent een complexe uitdaging tot een overtuigend digitaal interactief concept.',
    assessed: { pitchdeck: ['Klant'], testmoment: ['Expert desk'], jury: ['Klant', 'Andere klanten', 'Expert desk'] },
  },
  'OLR02-I-1': {
    text: 'De student verantwoordt procesmatige keuzes in relatie tot briefing, strategie en beoogd eindresultaat.',
    assessed: { testmoment: ['Expert desk'], jury: ['Klant', 'Andere klanten', 'Expert desk'] },
  },
  'OLR03-T-4': {
    text: 'De student toetst tijdens verschillende fases van een project de gemaakte keuzes of prototypes bij de doelgroep.',
    assessed: { pitchdeck: ['Klant'], testmoment: ['Expert desk'] },
  },
  'OLR03-I-1': {
    text: 'De student creëert een consistente, passende en creatieve visuele identiteit voor het gehele project.',
    assessed: { testmoment: ['Expert desk'], jury: ['Expert desk'] },
  },
  'OLR03-I-2': {
    text: 'De student hanteert een holistisch perspectief tijdens het ontwerpen van toepassingen en ervaringen.',
    assessed: { jury: ['Klant', 'Expert desk'] },
  },
  'OLR04-I-2': {
    text: 'De student experimenteert op kritische wijze met innovatieve tech om grensverleggende interacties te creëren.',
    assessed: { testmoment: ['Expert desk'], jury: ['Expert desk'] },
  },
  'OLR05-I-3': {
    text: 'De student creëert vanuit een inclusieve en empathische mindset in alle fases van een project.',
    assessed: { testmoment: ['Expert desk'], jury: ['Klant', 'Expert desk'] },
  },
  'OLR06-I-1': {
    text: 'De student beheerst de professionele communicatiestroom in een (internationale) context.',
    assessed: { pitchdeck: ['Klant'], jury: ['Klant', 'Andere klanten', 'Expert desk', 'Devine coach'] },
  },
  'OLR08-I-1': {
    text: 'De student verantwoordt gemaakte keuzes op basis van hun positieve en duurzame impact op mens en de wereld.',
    assessed: { jury: ['Klant', 'Andere klanten', 'Expert desk', 'Devine coach'] },
  },
  'OLR09-I-1': {
    text: 'De student werkt op constructieve wijze samen met collega’s en stakeholders met verschillende disciplinaire en culturele achtergronden.',
    assessed: { pitchdeck: ['Klant'], jury: ['Klant', 'Devine coach'] },
  },
};

export const OLR_KEYS = Object.keys(OLRS) as [string, ...string[]];
export const olrAnchor = (code: string) => code.toLowerCase();
