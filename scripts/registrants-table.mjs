// Renders registrants for one college as a styled HTML table, ready to be
// screenshotted or opened in a browser. Read-only.
//
//   node scripts/registrants-table.mjs --only IITBH26_SE --out /tmp/se-shots/registrants-IITBH26_SE.html
//
// --only matches the college name or the access code.
import { MongoClient } from 'mongodb';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';

config();

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i === -1 ? null : argv[i + 1];
};

const only = (flag('--only') || '').toLowerCase();
const outFile = flag('--out') || '/tmp/se-shots/registrants.html';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'gitaunlocked';
const collName = process.env.MONGODB_SE_2026_COLLECTION || 'successEngineering2026';

if (!uri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();

const all = await client.db(dbName).collection(collName).find({}).sort({ createdAt: 1 }).toArray();

const keysOf = (r) =>
  [r.college, r.institute, r.couponCode, r.code].filter(Boolean).map((v) => String(v).toLowerCase());
const rows = only ? all.filter((r) => keysOf(r).includes(only)) : all;

const title = rows[0]?.college || only.toUpperCase() || 'All colleges';
const esc = (v) =>
  String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ist = (d) =>
  d ? new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) : '';

const body = rows
  .map(
    (r, i) => `<tr>
      <td class="num">${i + 1}</td>
      <td><span class="name">${esc(r.name)}</span></td>
      <td>${esc(r.course)}${r.branch ? ` <span class="dim">· ${esc(r.branch)}</span>` : ''}</td>
      <td>${esc(r.year)}</td>
      <td class="mono">${esc(r.email)}</td>
      <td class="mono">${esc(r.phone)}</td>
      <td class="dim">${esc(ist(r.createdAt))}</td>
    </tr>`
  )
  .join('');

writeFileSync(
  outFile,
  `<!doctype html><meta charset="utf-8">
<style>
  body { margin:0; padding:32px; background:#eef1f8;
         font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif; color:#1f2937; }
  .card { background:#fff; border-radius:16px; padding:28px 30px; box-shadow:0 1px 3px rgba(16,24,40,.08); }
  h1 { margin:0; font-size:22px; color:#0b1f4d; }
  .sub { margin:6px 0 22px; font-size:14px; color:#6B7280; }
  .sub b { color:#D61C75; }
  table { border-collapse:collapse; width:100%; font-size:14px; }
  th { text-align:left; font-size:11px; letter-spacing:1.1px; text-transform:uppercase;
       color:#9CA3AF; padding:0 12px 10px 0; border-bottom:1px solid #E5E7EB; white-space:nowrap; }
  td { padding:12px 12px 12px 0; border-bottom:1px solid #F1F3F7; vertical-align:top; }
  tr:last-child td { border-bottom:none; }
  .num { color:#9CA3AF; width:26px; }
  .name { font-weight:600; color:#111827; }
  .mono { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:13px; color:#374151; }
  .dim { color:#6B7280; }
</style>
<div class="card">
  <h1>${esc(title)} — Success Engineering registrants</h1>
  <p class="sub"><b>${rows.length}</b> registered · as of ${esc(ist(new Date()))} IST</p>
  <table>
    <thead><tr>
      <th></th><th>Name</th><th>Course</th><th>Year</th><th>Email</th><th>Phone</th><th>Registered</th>
    </tr></thead>
    <tbody>${body}</tbody>
  </table>
</div>`,
  'utf-8'
);

console.log(`${rows.length} registrants -> ${outFile}`);

await client.close();
