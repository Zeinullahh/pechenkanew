# Sandbox verification — 2026-09-20

- `npm run build`: passed. Next.js 16.1.6 generated all 275 static pages in `out/`.
- Targeted ESLint for sandbox components, scripts, and tests: passed.
- `node --test tests/sandbox-state.test.mjs`: 7 passed, 0 failed.
- `scripts/check-sandbox.mjs` against the static export on port 3001: 15 passed.
- Browser page errors: 0. API requests during the scenarios: 0.
- Local development URL `http://localhost:3000/en/`: HTTP 200.
- Exported `/en/` served by a plain static server: HTTP 200.

The browser suite switches offline after initial loading. It exercises topology
zoom/pan, sender and domain selection, filters and time ranges, both attacks,
purge from each product, audit, counters, attachment inspection, arbitrary chat
input, mailbox actions, replies, drafts, scheduling, folders, reset, expanded
mode, mobile containment, and mobile dialog placement. Exact scenario names are
in `browser-checks.json`.

Visual review used the supplied CMC screenshot and the reference Webmail source.
Screenshots below were inspected. This is a manual reference review, not an
automated claim that every pixel of every original product screen is identical.
The seventh topology row is partially below the canvas edge, as in the supplied
CMC screenshot, and remains reachable by panning or zooming out.

- [CMC topology](cmc-initial.png)
- [CMC Threat Grid](cmc-threat-grid.png)
- [Webmail](webmail-initial.png)
- [Malware inspection](webmail-malware.png)
- [Local incident chat](webmail-chat.png)
- [Mobile frame](mobile.png)

Security findings and AI responses are local demonstration data. The sandbox
makes no live threat-intelligence, VirusTotal, mail delivery, or LLM requests.
The surrounding landing page retains its existing external media; the offline
checks cover sandbox interactions after the page has loaded.
