// Fetches our Toggl Track time entries for projects with "BAP" in their name
// and merges them into src/data/hours.json.
// TOGGL_TOKENS holds one API token per team member, separated by commas.
// Entries added by hand (ids not starting with "toggl-") are kept as they are.
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/hours.json', import.meta.url);
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

async function fetchEntries(token) {
  const end = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
  const res = await fetch(
    `https://api.track.toggl.com/api/v9/me/time_entries?start_date=${PROJECT_START}&end_date=${end}&meta=true`,
    { headers: { Authorization: `Basic ${Buffer.from(`${token}:api_token`).toString('base64')}` } },
  );
  if (!res.ok) throw new Error(`Toggl answered ${res.status}: ${await res.text()}`);
  return res.json();
}

try {
  const fromToggl = (await Promise.all(tokens.map(fetchEntries)))
    .flat()
    .filter((e) => /\bbap\b/i.test(e.project_name ?? '')) // only projects like "BAP UX", "BAP Design"
    .filter((e) => e.duration > 0) // a running timer has a negative duration
    .map((e) => ({
      id: `toggl-${e.id}`,
      date: localDate(e.start),
      hours: Math.round((e.duration / 3600) * 100) / 100,
      tag: topicFor(e),
      task: e.description ?? '',
    }));

  const manual = JSON.parse(await readFile(FILE, 'utf8')).filter((e) => !String(e.id).startsWith('toggl-'));
  const all = [...manual, ...fromToggl].sort((a, b) => a.date.localeCompare(b.date));
  await writeFile(FILE, JSON.stringify(all, null, 2) + '\n');
  console.log(`Imported ${fromToggl.length} Toggl entries from ${tokens.length} account(s).`);
} catch (error) {
  // Don't block the deploy: the blog still builds with the hours we already have.
  console.warn(`::warning::Toggl import failed, hours page not updated. ${error.message}`);
}
