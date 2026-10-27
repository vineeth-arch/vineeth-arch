# Design Innsaeit / Public profile design system

## Reference and scene

This profile applies the Design Innsaeit design system supplied by Vineeth on 28 October 2026. Clients and recruiters browse a GitHub profile in their preferred browser appearance; the artwork carries the full identity, while native text follows GitHub's theme and remains selectable.

The visual voice is typographic, tactile and systematic. Light mode references bone paper and Braun instrument details. Dark mode uses the Design Innsaeit electric identity. The supplied design system takes precedence over previous Archivo, violet and mint artwork.

## Fonts

- Display: Bricolage Grotesque, 800, optical size 96, width 100. Large headings use tight tracking.
- Supporting text: Hanken Grotesk, 400, 600 and 700. Native GitHub Markdown retains GitHub's font because profile CSS is restricted.
- The licensed static TrueType instances and SIL Open Font Licenses are committed in assets/studio/fonts/. They were instantiated from the official Google Fonts variable files.
- SVG lettering is outlined for consistent rendering without external font requests. Main information also appears in native Markdown and meaningful image alternatives.
- PDFs embed the fonts and preserve selectable, searchable text.

## Exact tokens

content/theme.json is the rendering source of truth.

| Role | Light | Dark |
| :--- | :--- | :--- |
| Canvas | #EDEAE2 | #1F006E |
| Subtle surface | #E4E0D6 | #1A0552 |
| Emphasis surface | #D6D1C5 | #3A14BE |
| Stamp surface | #FBF9F3 | #280A86 |
| Heading | #161310 | #FFFFFF |
| Body | #524E47 | #E2D8F5 |
| Secondary text | #6E6A61 | #9B8FC9 |
| Border | #D2CCBE | #523399 |
| Accent | #FF006C | #00FFCF |

One accent per mode. Small labels use ink or secondary text; accent type is reserved for large display lettering. Illustrations use tonal surfaces and a single focal accent. Arrow icons use a high-contrast ink stroke on the accent.

## Composition

A flush-left Bricolage masthead introduces the practice. A fine systems ruler, numbered disciplines and a V/slash monogram connect it with the supplied visual language. The project gallery alternates full-width lead studies with paired studies. Original diagrams communicate each system; the actual V/HOME browser preview is labeled separately.

Circular arrows indicate linked studies. Oversized study numbers create hierarchy without adding unrelated colors. A Sunday-first dot-grid activity calendar uses single-letter weekday labels and real public data. Static assets preserve clarity without motion.

Each graphic has light and dark variants. The public README and case studies always use the indigo/teal (-dark.svg) assets, regardless of browser or GitHub appearance. This is the selected public identity. Light artwork remains available as an alternate, and PDFs use the bone/pink palette for printing.

## Editorial content and privacy

Six case studies explain problems, systems and intended value. Three PDF and Markdown professional profiles offer different lenses. 44 six-line project summaries remain in native disclosure sections.

Stories describe repository documentation, not new runtime tests. No career dates, degrees, client outcomes or device integrations are invented. Private source and client records remain private. The V/HOME browser screenshot comes from public commit b29c08dc71725f60f10095e12ca1d9d46120e721 at docs/screenshots/after-launcher-curated.png.

Professional background and LinkedIn contact live in content/professional.json. The exact supplied LinkedIn profile was accessible through public search indexing on 28 October 2026; direct access was blocked. Only visible education years and certification were used. Activity marked as liked was not treated as the owner's achievement.

## Regeneration

- Editorial stories: content/studio.json, case-studies/*.md and README.md.
- Original project collection: content/catalogue.json and README.md.
- PDF lenses: content/resume-views.json. Matching accessible Markdown lives in resume/.
- Fonts to SVG outlines: `python scripts/build-glyphs.py` with fontTools installed.
- SVG creatives: `node scripts/render.mjs`, Node 20 or later, no npm packages.
- PDF profiles: `python scripts/build-resumes.py` with ReportLab installed.
- Data tests: `node --test scripts/profile.test.mjs`.
- Public snapshot: `node scripts/refresh.mjs`.

The weekly Action fetches anonymous public repository metadata and the public contribution calendar. Counts may include anonymized private activity exposed by the account. Incomplete responses fail before replacing the valid snapshot. A pinned checkout action and repository-scoped GITHUB_TOKEN commit only content/activity.json, assets/studio/activity.svg and assets/studio/activity-dark.svg. It runs Mondays at 06:17 UTC or manually. The visible update date makes delayed or stale runs apparent.

Old masthead files and Archivo license remain as historical assets; they are not used in the current profile.
