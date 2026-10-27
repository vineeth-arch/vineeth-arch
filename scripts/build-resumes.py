"""Build the three print profiles with the supplied Design Innsaeit type system."""
from pathlib import Path
from xml.sax.saxutils import escape
import json

from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / 'assets/studio/fonts'
for family, weights in [('bricolagegrotesque', [700, 800]), ('hankengrotesk', [400, 600, 700])]:
    for weight in weights:
        pdfmetrics.registerFont(TTFont(f'{family}{weight}', str(FONT_DIR / f'{family}-{weight}.ttf')))

projects = json.loads((ROOT / 'content/studio.json').read_text())['projects']
professional = json.loads((ROOT / 'content/professional.json').read_text())
views = json.loads((ROOT / 'content/resume-views.json').read_text())
theme = json.loads((ROOT / 'content/theme.json').read_text())['light']

for view in views:
    target = ROOT / f"resume/{view['slug']}.pdf"
    doc = canvas.Canvas(str(target), pagesize=(595.28, 841.89))
    doc.setTitle(f"Vineeth Nair / {view['lens']}")
    doc.setAuthor('Vineeth Nair')
    doc.setFillColor(HexColor(theme['bg']))
    doc.rect(0, 0, 596, 842, fill=1, stroke=0)

    def label(value, x, y, size=9, color=None, font='hankengrotesk600'):
        doc.setFillColor(HexColor(color or theme['ink']))
        doc.setFont(font, size)
        doc.drawString(x, y, value)

    def heading(value, x, y, size, color=None, max_width=507):
        font = 'bricolagegrotesque800'
        width = pdfmetrics.stringWidth(value, font, size) - (len(value) - 1) * size * .02
        if width > max_width:
            size *= max_width / width
        doc.saveState()
        obj = doc.beginText(x, y)
        obj.setFont(font, size)
        obj.setCharSpace(-size * .02)
        obj.setFillColor(HexColor(color or theme['ink']))
        obj.textOut(value)
        doc.drawText(obj)
        doc.restoreState()

    def paragraph(value, x, y, width, size=10.5):
        paragraph = Paragraph(escape(value), ParagraphStyle(
            'body', fontName='hankengrotesk400', fontSize=size,
            leading=size * 1.4, textColor=HexColor(theme['text'])))
        _, height = paragraph.wrap(width, 400)
        paragraph.drawOn(doc, x, y - height)
        return y - height

    def rule(x, y, x2):
        doc.setStrokeColor(HexColor(theme['border']))
        doc.setLineWidth(.6)
        doc.line(x, y, x2, y)

    label('DESIGN INNSAEIT / MUMBAI', 44, 810, 9, theme['muted'])
    heading('Vineeth Nair', 42, 770, 37)
    doc.setStrokeColor(HexColor(theme['border']))
    doc.circle(529, 791, 22, fill=0, stroke=1)
    heading('V /', 513, 782, 22)
    rule(44, 748, 551)
    for tick in range(58):
        doc.line(44 + tick * 8.9, 748, 44 + tick * 8.9, 743 if tick % 5 else 738)
    label(view['lens'].upper(), 44, 715, 9.5)
    headlines = {
        'brand-design': ['Clarity,', 'made visible.'],
        'creative-technology': ['Useful ideas,', 'working systems.'],
        'integrated-profile': ['Design. Systems.', 'Intelligence.'],
    }[view['slug']]
    heading(headlines[0], 41, 665, 46)
    heading(headlines[1], 41, 621, 46, theme['accent'])
    bottom = paragraph(view['summary'], 44, 593, 507, 11.5)
    assert bottom > 539, 'Summary exceeds its space'
    rule(44, 527, 551)

    label('CAPABILITIES', 44, 501, 9, theme['muted'])
    y = 479
    for skill in view['skills']:
        y = paragraph(skill, 44, y, 155, 10.5) - 13
    assert y > 303, 'Capabilities exceed their space'
    label('EDUCATION', 44, 300, 9, theme['muted'])
    paragraph(professional['education']['institution'], 44, 279, 155, 10.5)
    label(professional['education']['years'], 44, 235, 10, theme['text'])
    label('LEARNING', 44, 206, 9, theme['muted'])
    paragraph('Strategic Thinking / LinkedIn certification', 44, 185, 155, 10.5)
    label(professional['certification']['issued'], 44, 140, 10, theme['text'])

    label('SELECTED WORK', 239, 501, 9, theme['muted'])
    y = 478
    for index, project_index in enumerate(view['projects']):
        project = projects[project_index]
        heading(f'0{index + 1}', 211, y, 15, theme['muted'])
        heading(project['title'], 239, y, 18, max_width=312)
        y = paragraph(project['intro'] + ' ' + project['value'], 239, y - 17, 312, 10.5) - 13
        label('READ PROJECT STUDY', 239, y, 8.5)
        rule(239, y - 4, 331)
        url = f"https://github.com/vineeth-arch/vineeth-arch/blob/feat/recruiter-profile/case-studies/{project['slug']}.md"
        doc.linkURL(url, (239, y - 5, 350, y + 10), relative=0)
        y -= 37
    assert y > 99, f'Selected work overlaps footer: {y}'

    rule(44, 108, 551)
    label('LET’S BUILD SOMETHING MEANINGFUL.', 44, 88, 9, font='hankengrotesk700')
    label('vineeth@designinnsaeit.com', 44, 68, 10)
    doc.linkURL('mailto:vineeth@designinnsaeit.com', (44, 64, 245, 79), relative=0)
    label('github.com/vineeth-arch', 365, 68, 9.5)
    doc.linkURL('https://github.com/vineeth-arch', (365, 64, 551, 79), relative=0)
    label('LinkedIn / vineeth-nair-product-designer', 44, 48, 9)
    doc.linkURL(professional['linkedin'], (44, 44, 320, 59), relative=0)
    label('Project-led professional profile / 28 October 2026', 44, 27, 8, theme['muted'])
    doc.save()
    print(f"Built {target.name}")
