# Interactive Sandbox — implementation and verification

Reference: `unified-email-platform-v2/cmc/Screenshot_20260214_143049.png`, CMC components/hooks/styles, and `webmail-v2/frontend/app` components/styles. The screenshot takes precedence where the current CMC source has changed.

- [x] Inspect the existing sandbox, screenshot, and reference components/styles.
- [x] Reconstruct the CMC geometry and implement navigation, filters, time ranges, zoom/pan, and threat inspection.
- [x] Port scoped Webmail styles and implement mailbox actions, attachments, composer, responder, and local incident chat.
- [x] Connect both products to one state model with campaign-wide purge, derived counts, attack injection, audit, and full reset.
- [x] Verify interactions, responsive containment, offline operation, and screenshots in a browser.
- [x] Pass targeted checks and production static export; verify `/en/` returns HTTP 200 on port 3000.

The existing `tasks/todo.md` records an earlier iteration; this checklist tracks the current request.

Verification completed against the static export: 7 state tests, 15 browser scenarios, targeted ESLint, and `npm run build` passed. `/en/` responds with HTTP 200 on port 3000. Screenshots and details: `artifacts/sandbox/verification.md`.
