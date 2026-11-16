// Fetches our Toggl Track time entries for projects with "BAP" in their name
// and merges them into src/data/hours.json.
// TOGGL_TOKENS holds one API token per team member, separated by commas.
// Entries added by hand (ids not starting with "toggl-") are kept as they are.
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/hours.json', import.meta.url);
const TEAM_FILE = new URL('../src/data/team.json', import.meta.url);
const PROJECT_START = '2026-10-26';
const TIME_ZONE = 'Europe/Brussels';

// Toggl project or tag names (lowercase words) → blog topic.
const TOPICS = {
  ux: 'ux',
  research: 'ux',
  design: 'design',
  development: 'development',
  dev: 'development',
  feedback: 'feedback',
  meeting: 'feedback',
  meetings: 'feedback',
};

const tokens = (process.env.TOGGL_TOKENS ?? '').split(',').map((t) => t.trim()).filter(Boolean);
if (tokens.length === 0) {
  console.log('TOGGL_TOKENS is not set, skipping Toggl import.');
  process.exit(0);
}

const localDate = (iso) => new Date(iso).toLocaleDateString('en-CA', { timeZone: TIME_ZONE });

function topicFor(entry) {
  const names = [entry.project_name, ...(entry.tags ?? [])].filter(Boolean);
  for (const word of names.flatMap((n) => n.toLowerCase().split(/[^a-z]+/))) {
    if (TOPICS[word]) return TOPICS[word];
  }
}

const auth = (token) => ({ Authorization: `Basic ${Buffer.from(`${token}:api_token`).toString('base64')}` });

// Which teammate owns this token: match the first name from team.json
// against the Toggl name or e-mail. Falls back to the Toggl name.
async function personFor(token, team) {
  const res = await fetch('https://api.track.toggl.com/api/v9/me', { headers: auth(token) });
  if (!res.ok) throw new Error(`Toggl answered ${res.status}: ${await res.text()}`);
  const me = await res.json();
  const haystack = `${me.fullname ?? ''} ${me.email ?? ''}`.toLowerCase();
  const member = team.find((m) => haystack.includes(m.name.split(' ')[0].toLowerCase()));
  return member?.id ?? me.fullname ?? 'unknown';
}

async function fetchEntries(token) {
  const end = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
  const res = await fetch(
    `https://api.track.toggl.com/api/v9/me/time_entries?start_date=${PROJECT_START}&end_date=${end}&meta=true`,
    { headers: auth(token) },
  );
  if (!res.ok) throw new Error(`Toggl answered ${res.status}: ${await res.text()}`);
  return res.json();
}

try {
  const team = JSON.parse(await readFile(TEAM_FILE, 'utf8'));
  const perAccount = await Promise.all(
    tokens.map(async (token) => {
      const person = await personFor(token, team);
      return (await fetchEntries(token)).map((e) => ({ ...e, person }));
    }),
  );
  const fromToggl = perAccount
    .flat()
    .filter((e) => /\bbap\b/i.test(e.project_name ?? '')) // only projects like "BAP UX", "BAP Design"
    .filter((e) => e.duration > 0) // a running timer has a negative duration
    .map((e) => ({
      id: `toggl-${e.id}`,
      date: localDate(e.start),
      hours: Math.round((e.duration / 3600) * 100) / 100,
      tag: topicFor(e),
      task: e.description ?? '',
      person: e.person,
    }));

  const manual = JSON.parse(await readFile(FILE, 'utf8')).filter((e) => !String(e.id).startsWith('toggl-'));
  const all = [...manual, ...fromToggl].sort((a, b) => a.date.localeCompare(b.date));
  await writeFile(FILE, JSON.stringify(all, null, 2) + '\n');
  const people = [...new Set(fromToggl.map((e) => e.person))].join(', ');
  console.log(`Imported ${fromToggl.length} Toggl entries from ${tokens.length} account(s): ${people}.`);
} catch (error) {
  // Don't block the deploy: the blog still builds with the hours we already have.
  console.warn(`::warning::Toggl import failed, hours page not updated. ${error.message}`);
}
