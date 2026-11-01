// Fetches our planning from the Notion page "BaP - Boektopia" and writes it to
// src/data/planning.json. Databases named "Tasks week N" become weeks, databases
// named "Deadlines & milestones" become deadlines.
import { writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/planning.json', import.meta.url);
const PAGE_ID = '40763ad3-1f80-8027-a6be-d492260bc9a6';
const WEEK_1_START = '2026-10-26'; // Monday of week 1
const TIME_ZONE = 'Europe/Brussels';

const token = process.env.NOTION_TOKEN;
if (!token) {
  console.log('NOTION_TOKEN is not set, skipping Notion import.');
  process.exit(0);
}

const headers = { Authorization: `Bearer ${token}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' };

async function notion(path, body) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, body ? { method: 'POST', headers, body: JSON.stringify(body) } : { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(`Notion answered ${res.status}: ${data.message}`);
  return data;
}

// Both endpoints are paginated with next_cursor.
async function all(path, body) {
  const results = [];
  let cursor;
  do {
    const data = body
      ? await notion(path, { ...body, start_cursor: cursor })
      : await notion(`${path}${cursor ? `&start_cursor=${cursor}` : ''}`);
    results.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return results;
}

// Databases can sit inside tabs and columns, so we walk the whole page.
async function findDatabases(blockId, depth = 0) {
  const found = [];
  for (const block of await all(`blocks/${blockId}/children?page_size=100`)) {
    if (block.type === 'child_database') found.push({ id: block.id, title: block.child_database.title });
    else if (block.has_children && block.type !== 'child_page' && depth < 6) found.push(...(await findDatabases(block.id, depth + 1)));
  }
  return found;
}

const text = (rich) => (rich ?? []).map((t) => t.plain_text).join('').trim();
const localDate = (iso) => (iso.length === 10 ? iso : new Date(iso).toLocaleDateString('en-CA', { timeZone: TIME_ZONE }));
const addDays = (date, days) => new Date(Date.parse(date) + days * 86_400_000).toISOString().slice(0, 10);

function readRow(row) {
  const props = Object.values(row.properties);
  const status = props.find((p) => p.type === 'status')?.status ?? props.find((p) => p.type === 'select')?.select;
  const date = props.find((p) => p.type === 'date')?.date;
  return {
    title: text(props.find((p) => p.type === 'title')?.title),
    status: { 'In progress': 'doing', Done: 'done' }[status?.name] ?? 'todo',
    people: props.filter((p) => p.type === 'people').flatMap((p) => p.people.map((u) => u.name).filter(Boolean)),
    date: date?.start ? localDate(date.start) : undefined,
  };
}

try {
  const databases = await findDatabases(PAGE_ID);
  const weeks = [];
  const deadlines = [];

  for (const db of databases) {
    const rows = (await all(`databases/${db.id}/query`, { page_size: 100 })).map(readRow).filter((r) => r.title);
    const week = db.title.match(/week\s*(\d+)/i)?.[1];
    if (week) {
      const start = addDays(WEEK_1_START, (week - 1) * 7);
      weeks.push({ week: Number(week), start, end: addDays(start, 6), tasks: rows.map(({ date, ...task }) => task) });
    } else if (/deadline|milestone/i.test(db.title)) {
      deadlines.push(...rows.map(({ people, ...deadline }) => deadline));
    }
  }

  weeks.sort((a, b) => a.week - b.week);
  deadlines.sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'));
  await writeFile(FILE, JSON.stringify({ weeks, deadlines }, null, 2) + '\n');
  console.log(`Imported ${weeks.length} weeks and ${deadlines.length} deadlines from Notion.`);
} catch (error) {
  // Don't block the deploy: the blog still builds with the planning we already have.
  console.warn(`::warning::Notion import failed, planning page not updated. ${error.message}`);
}
