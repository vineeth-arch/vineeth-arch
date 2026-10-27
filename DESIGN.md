# V / Studio design system

## Direction

A multidisciplinary independent practice: brand strategy, design, consulting and software products. Editorial typography gives structure; violet and mint retain the creative lab character. The public profile is a portfolio with evidence, not a wall of badges.

## Visual system

- Archivo, weights 400, 600 and 800; licensed under SIL Open Font License, included in assets/studio/Archivo-OFL.txt.
- Ivory #F3F0E7, ink #202120, violet #4826C6, mint #C1F579.
- An original V/slash monogram, numbered project studies, generous spacing and original vector illustrations.
- Self-contained SVGs use outlined lettering for consistent rendering. All important information is repeated in native Markdown; image alternatives describe their purpose.
- Static artwork avoids distracting motion. No external widgets, tracking pixels or font requests.

## Content and interaction

The hero positions the practice. Six linked case studies explain problems, systems and intended benefits. Three PDF and Markdown professional profiles offer different editorial lenses. Native disclosures preserve six-line summaries for all 45 original projects.

GitHub supports navigation, disclosure sections and downloads here. A separate interactive website is outside this version. No JavaScript is embedded in the profile.

## Evidence and privacy

Stories are based on repository documentation, not new runtime tests. No employment dates, degrees, client outcomes or device integrations are invented. Private repository code and client data remain private. The V/HOME browser-simulation screenshot is from public source commit b29c08dc71725f60f10095e12ca1d9d46120e721; its source path is docs/screenshots/after-launcher-curated.png.

## Maintenance

Edit content/studio.json and case-studies/*.md together when updating stories. content/catalogue.json preserves the original project summaries. README contains their public presentation. PDFs and matching Markdown live in resume/ and should be reviewed together when biography changes.

Run `node scripts/render.mjs` to regenerate artwork from the editorial configuration and committed glyph outlines. New characters require glyphs to be added from Archivo under its included license. Existing old masthead is retained as historical artwork, but not displayed.

Run `node --test scripts/profile.test.mjs` before changing data ingestion. Run `node scripts/refresh.mjs` to refresh public activity and graphics. Node 20 or newer is required; no npm packages or personal token are needed.

The weekly GitHub Action reads anonymous public GitHub endpoints. It never fetches private repositories or private contribution details. Public-profile counts may include anonymized private contributions if the account exposes them. A failed request or incomplete calendar fails the run before replacing the previous snapshot. The contribution grid follows date order; counts describe activity, not design or engineering skill.

The workflow uses a commit-pinned checkout action and a repository-scoped GITHUB_TOKEN only for committing generated assets. It runs Mondays at 06:17 UTC or manually, and commits only content/activity.json and assets/studio/activity.svg. GitHub schedules can be delayed or disabled after repository inactivity; the visible update date makes stale data apparent.

Professional background and LinkedIn contact are maintained in content/professional.json. On 28 October 2026, the exact supplied profile was available through public search indexing; direct LinkedIn access was blocked. Education institution, listed years and certification were visible. Missing degree title, job roles and employment dates are omitted. Activity items marked as liked are not treated as the account owner's achievements.
