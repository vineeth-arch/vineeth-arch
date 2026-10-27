"""Convert the committed, licensed font instances into portable SVG outlines."""
from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

root = Path(__file__).resolve().parent.parent
roles = {}
characters = ''.join(chr(code) for code in range(32, 127)) + 'æé–—·'
for path in sorted((root / 'assets/studio/fonts').glob('*.ttf')):
    font = TTFont(path)
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    glyphs = {}
    for char in characters:
        if ord(char) not in cmap:
            continue
        glyph = glyph_set[cmap[ord(char)]]
        pen = SVGPathPen(glyph_set)
        glyph.draw(pen)
        glyphs[char] = {'d': pen.getCommands(), 'w': glyph.width}
    role = path.stem.replace('-', '')
    roles[role] = {'units': font['head'].unitsPerEm, 'glyphs': glyphs}
(root / 'content/glyphs.json').write_text(json.dumps(roles, separators=(',', ':')) + '\n')
