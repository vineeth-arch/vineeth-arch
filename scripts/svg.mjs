import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fonts = JSON.parse(fs.readFileSync(`${root}/content/glyphs.json`));
export const themes = JSON.parse(fs.readFileSync(`${root}/content/theme.json`));

export function escapeXML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
  })[char]);
}

export function textWidth(value, size, role = 'body', tracking = 0) {
  const font = fonts[role === 'display' ? 'bricolagegrotesque800' : 'hankengrotesk600'];
  return [...value].reduce((width, char) => {
    if (!font.glyphs[char]) throw new Error(`Missing ${role} glyph: ${char}`);
    return width + font.glyphs[char].w * size / font.units + tracking;
  }, 0) - tracking;
}

export function text(value, x, y, size, color, role = 'body', tracking = 0) {
  const font = fonts[role === 'display' ? 'bricolagegrotesque800' : 'hankengrotesk600'];
  let position = x;
  const paths = [...value].map(char => {
    const glyph = font.glyphs[char];
    if (!glyph) throw new Error(`Missing ${role} glyph: ${char}`);
    const result = `<path d="${glyph.d}" transform="translate(${position} ${y}) scale(${size / font.units} ${-size / font.units})"/>`;
    position += glyph.w * size / font.units + tracking;
    return result;
  });
  return `<g fill="${color}" aria-label="${escapeXML(value)}">${paths.join('')}</g>`;
}

export function display(value, x, y, size, color, maxWidth = Infinity) {
  const tracking = -size * 0.025;
  const width = textWidth(value, size, 'display', tracking);
  const fittedSize = width > maxWidth ? size * maxWidth / width : size;
  return text(value, x, y, fittedSize, color, 'display', -fittedSize * 0.025);
}

export const rect = (x, y, width, height, fill, radius = 0) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}"/>`;
export const circle = (x, y, radius, fill, stroke = 'none', strokeWidth = 1) =>
  `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
export const line = (x, y, x2, y2, stroke, width = 1) =>
  `<path d="M${x} ${y}L${x2} ${y2}" stroke="${stroke}" stroke-width="${width}" fill="none"/>`;

export function arrow(x, y, theme, filled = false, radius = 22) {
  return circle(x, y, radius, filled ? theme.accent : 'none', filled ? 'none' : theme.border) +
    `<path d="M${x - 8} ${y + 8}l16 -16m-15 0h15v15" fill="none" stroke="${filled ? theme.onAccent : theme.ink}" stroke-width="2.5"/>`;
}

export function monogram(x, y, scale, color) {
  return `<path d="M0 0H70L145 205L220 0H290L178 300H112ZM325 0H370L260 300H215Z" fill="${color}" transform="translate(${x} ${y}) scale(${scale})"/>`;
}

export function svg(title, body, width, height, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img"><title>${escapeXML(title)}</title>${rect(0, 0, width, height, theme.bg)}${body}</svg>\n`;
}

export function ruler(x, y, width, theme, step = 18) {
  let result = line(x, y, x + width, y, theme.border);
  for (let n = 0; n <= width / step; n++) {
    result += line(x + n * step, y, x + n * step, y + (n % 5 ? 7 : 15), theme.border);
  }
  return result;
}
