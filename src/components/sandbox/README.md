# Silence AI interactive sandbox

Mounted by `Pricing.jsx` immediately after the email comparison, only for
`productType === "email"`. Open `/en/` and scroll to **Live Interactive Sandbox**.

## Reference and visual implementation

- CMC geometry follows `cmc/Screenshot_20260214_143049.png`: a 1384 × 950 product
  canvas, six columns of seven domains, 49.5px satellite boundaries, a 124px
  company boundary, and the six original employee colors. The seventh row is
  partially below the viewport in the reference; zooming or panning reveals it.
- Reference CMC `Header`, `Navbar`, `TopBar`, `Visualization`, `useD3Visualization`,
  `ThreatGrid`, and `globals.css` informed the component structure. Where newer
  source and the screenshot differ, the requested screenshot takes precedence.
- `webmail-reference.css` preserves the applicable declarations and their order
  from `webmail-v2/frontend/app/globals.css`. Selectors and animation names are
  scoped; unrelated routes and viewport breakpoints are omitted. Embed-specific
  layout rules live in `sandbox.css`.
- `EmailDashboard`, `EmailHeader`, `AttachmentHandler`, and `FloatingAIChat` from
  Webmail informed the local components. The supplied logo is embedded byte for
  byte in `brandAsset.js`, so resetting an offline demo needs no image request.
- The browser scales the product canvas uniformly. Narrow screens scroll inside
  the frame; dialogs fit the visible portion. This preserves the three-pane
  layout without introducing page-wide overflow.

To regenerate the scoped reference CSS and embedded original logo:

```sh
node scripts/generate-sandbox-reference.mjs /path/to/unified-email-platform-v2/webmail-v2/frontend/app/globals.css
```

## Local state and behavior

`mockData.js` contains 100 initial messages, per-sender topology data, security
findings, and attack fixtures. `sandboxState.js` is the shared reducer and query
layer. Neither product uses a backend, storage, external AI, or network scans.
The date/time filter is anchored to the displayed demonstration clock.

- Domain and sender drilldowns select their actual messages, including the
  recipient. Switching products preserves mailbox state.
- Purge removes every delivery with the same campaign identity, including copies
  in other mailboxes, then adds one CMC audit event. Folder and threat counts are
  derived from the remaining messages. Ordinary Trash and Restore are separate.
- Simulate Attack alternates CEO Fraud and Macro Malware; both receive two local
  deliveries and appear immediately in quarantine and the CMC categories.
  Macro download threats are included in the reference's Dangerous link category.
- Search includes body, authentication headers, attachment names, and hashes.
  Stars, read status, custom folders, drafts, sent mail, scheduling, editable
  responder drafts, theme, language, and the local incident assistant work.
- Scheduled messages use the demo clock and can be dispatched with Send now.
  The assistant answers from the selected message and current state. Findings
  are fixtures; no real VirusTotal scan or live LLM is implied.
- Malicious attachment downloads are blocked. The safe PDF is generated locally.
  Reset restores the initial data, audit, filters, selection, drafts, and UI.

## Verification

```sh
node --test tests/sandbox-state.test.mjs
npx eslint src/components/sandbox scripts/check-sandbox.mjs scripts/generate-sandbox-reference.mjs tests/sandbox-state.test.mjs
npm run build
```

Browser checks require an available Playwright installation and Chromium:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs \
PLAYWRIGHT_CHROMIUM=/path/to/chrome \
SANDBOX_URL=http://localhost:3000/en/ \
node scripts/check-sandbox.mjs
```

The browser script exercises actual controls, switches offline after loading,
records runtime errors and API requests, and writes screenshots plus its report
under `artifacts/sandbox/`. It can also target the exported `out/` directory served
by a static HTTP server. Test-only screenshot styling hides the site's floating
navigation and fast-forwards finite animations; application behavior is unchanged.
