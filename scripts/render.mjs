import fs from 'node:fs';
import {
  root, themes, text, display, rect, circle, line, arrow, monogram, svg, ruler
} from './svg.mjs';

const studio = JSON.parse(fs.readFileSync(`${root}/content/studio.json`));
const assetPath = `${root}/assets/studio`;

function write(name, content, themeName) {
  const suffix = themeName === 'dark' ? '-dark' : '';
  fs.writeFileSync(`${assetPath}/${name}${suffix}.svg`, content);
}

function hero(t) {
  let body = display('V /', 56, 68, 36, t.ink);
  body += text('VINEETH NAIR', 158, 62, 22, t.ink, 'body', 2);
  body += text('DESIGN INNSAEIT / MUMBAI', 1110, 62, 18, t.muted, 'body', 1.5);
  body += ruler(56, 93, 1488, t, 24);
  body += display('Design.', 49, 253, 165, t.ink, 1000);
  body += display('Systems.', 49, 390, 165, t.ink, 1000);
  body += display('Intelligence.', 49, 527, 165, t.accent, 1030);
  body += line(1110, 156, 1110, 549, t.border);
  body += circle(1330, 319, 162, t.emphasis);
  body += monogram(1219, 229, 0.6, t.ink);
  body += text('THOUGHT', 1164, 526, 18, t.text, 'body', 2);
  body += line(1260, 520, 1318, 520, t.border);
  body += text('FORM', 1338, 526, 18, t.text, 'body', 2);
  body += arrow(1500, 520, t);
  body += line(56, 585, 1544, 585, t.border);
  const capabilities = ['Brand strategy', 'Design', 'Consulting', 'Software products'];
  for (const [i, label] of capabilities.entries()) {
    const x = 56 + i * 376;
    body += display(`0${i + 1}`, x, 646, 31, t.muted);
    body += text(label, x + 55, 645, 24, t.ink);
  }
  body += text('INDEPENDENT PRACTICE. CONNECTED THINKING.', 56, 700, 16, t.muted, 'body', 2);
  return svg('Vineeth Nair. Design. Systems. Intelligence.', body, 1600, 732, t);
}

function research(t) {
  let body = '';
  const records = [
    [440, 145, '01', 'SOURCE'], [565, 205, '02', 'OBSERVE'], [690, 265, '03', 'CONNECT']
  ];
  for (const [x, y, n, label] of records) {
    body += rect(x, y, 330, 170, t.stamp);
    body += text(n, x + 22, y + 37, 19, t.muted);
    body += text(label, x + 65, y + 37, 20, t.ink, 'body', 1.5);
    for (let row = 0; row < 3; row++) body += line(x + 22, y + 67 + row * 24, x + 270, y + 67 + row * 24, t.border);
  }
  body += circle(1040, 343, 48, t.accent);
  body += `<path d="M1022 343l12 12 24 -27" stroke="${t.onAccent}" stroke-width="5" fill="none"/>`;
  return body;
}

function invoice(t) {
  let body = rect(590, 143, 310, 269, t.stamp);
  body += text('INVOICE', 618, 185, 19, t.ink, 'body', 2);
  body += text('001', 815, 185, 19, t.muted);
  for (let row = 0; row < 5; row++) body += line(618, 218 + row * 28, 872, 218 + row * 28, t.border);
  body += display('GST', 937, 306, 57, t.ink);
  body += circle(960, 368, 25, t.accent);
  body += line(455, 280, 565, 280, t.ink, 2);
  body += circle(437, 280, 9, t.ink);
  body += text('REUSE', 405, 250, 18, t.muted, 'body', 2);
  body += line(455, 290, 455, 352, t.border);
  body += text('CLIENT / SERVICE / DOCUMENT', 468, 384, 15, t.muted, 'body', 1);
  return body;
}

function brain(t) {
  const nodes = [
    [455, 186, 'NOTE'], [734, 154, 'VOICE'], [1010, 246, 'LINK'],
    [873, 395, 'REVIEW'], [515, 381, 'PHOTO']
  ];
  let body = '';
  for (const [x, y] of nodes) body += line(725, 273, x, y, t.border, 2);
  for (const [x, y, label] of nodes) {
    body += rect(x - 65, y - 26, 130, 52, t.stamp, 26);
    body += text(label, x - 43, y + 6, 18, t.ink, 'body', 1);
  }
  body += circle(725, 273, 72, t.accent);
  body += display('B /', 680, 292, 59, t.onAccent);
  return body;
}

function television(t) {
  let body = rect(402, 146, 655, 274, t.emphasis, 12);
  body += rect(417, 161, 625, 244, t.subtle, 4);
  body += text('V / HOME', 440, 196, 19, t.ink, 'body', 2);
  const fills = [t.accent, t.emphasis, t.stamp, t.stamp, t.emphasis, t.stamp];
  for (let n = 0; n < 6; n++) {
    body += rect(440 + (n % 3) * 190, 217 + Math.floor(n / 3) * 77, 170, 59, fills[n], 7);
    if (n === 0) body += circle(525, 246, 9, t.onAccent);
  }
  body += line(729, 420, 729, 445, t.ink, 2);
  body += line(654, 445, 804, 445, t.ink, 2);
  return body;
}

function chapter(t) {
  let body = rect(400, 141, 655, 286, t.subtle);
  for (let row = 0; row < 6; row++) {
    body += text(['MEMBERS', 'MEETINGS', 'ATTENDANCE', 'DUES', 'TREASURY', 'CHAPTER'][row], 425, 181 + row * 42, 17, t.ink, 'body', 1);
    for (let col = 0; col < 8; col++) {
      const selected = row === 2 && col === 4;
      body += circle(655 + col * 46, 175 + row * 42, 9, selected ? t.accent : ((row + col) % 3 ? t.emphasis : 'none'), selected ? 'none' : t.border);
    }
  }
  return body;
}

function identity(t) {
  let body = monogram(433, 158, 0.74, t.ink);
  body += monogram(806, 218, 0.44, t.muted);
  body += ruler(402, 413, 653, t, 19);
  body += rect(1028, 155, 27, 27, t.accent);
  body += text('ONE PRACTICE / MANY EXPRESSIONS', 402, 453, 17, t.text, 'body', 1.8);
  return body;
}

const illustrations = [research, invoice, brain, television, chapter, identity];
function cover(project, index, t) {
  let body = text(`${project.number} / ${project.tag}`, 48, 55, 18, t.text, 'body', 1.5);
  body += arrow(1128, 47, t);
  body += line(48, 82, 1152, 82, t.border);
  body += display(project.number, 40, 353, 187, t.emphasis, 310);
  body += illustrations[index](t);
  body += display(project.title, 44, 536, 74, t.ink, 1105);
  body += text(project.headline, 48, 585, 29, t.text);
  return svg(`${project.title}. ${project.headline}`, body, 1200, 630, t);
}

function activity(data, t) {
  let body = display('A working practice.', 44, 77, 52, t.ink);
  body += text(`UPDATED ${data.updated}`, 930, 70, 17, t.muted, 'body', 1);
  body += line(48, 103, 1152, 103, t.border);
  body += text('S', 48, 157, 16, t.muted) + text('M', 48, 185, 16, t.muted);
  for (const [i, label] of ['T', 'W', 'T', 'F', 'S'].entries()) body += text(label, 48, 213 + i * 28, 16, t.muted);
  // Sunday-first columns preserve the actual weekday when GitHub changes its date range.
  const firstWeekday = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
  for (const [i, day] of data.days.entries()) {
    const offset = i + firstWeekday;
    const fill = [t.subtle, t.emphasis, t.muted, t.ink, t.accent][day.level];
    body += circle(98 + Math.floor(offset / 7) * 19.8, 151 + (offset % 7) * 28, 6, fill);
  }
  body += text(`${data.days[0].date} / ${data.days.at(-1).date}`, 48, 379, 18, t.text);
  body += text(`${data.total.toLocaleString('en-US')} contributions on public profile`, 48, 425, 25, t.ink);
  body += text(`${data.repos.length} public repositories, including this profile`, 635, 425, 22, t.text);
  return svg('Public GitHub contribution calendar. Snapshot date and counts shown below.', body, 1200, 466, t);
}

for (const [name, theme] of Object.entries(themes)) {
  write('hero', hero(theme), name);
  for (const [index, project] of studio.projects.entries()) write(project.slug, cover(project, index, theme), name);
  if (fs.existsSync(`${root}/content/activity.json`)) {
    const data = JSON.parse(fs.readFileSync(`${root}/content/activity.json`));
    write('activity', activity(data, theme), name);
  }
}
