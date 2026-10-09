# Server Security guide coverage

Updated: 2026-10-09.

The website serves `Silence_AI_Server_Security_User_Guide(1).md` and eight translated variants: `.ru`, `.de`, `.fr`, `.tr`, `.ja`, `.zh`, `.ko`, and `.ar`. Each now has 13 numbered customer-facing chapters. Chapter 10 gives a short Network access workflow; the former NET-01?NET-11 implementation specification, internal checklist, and current-limitations chapter have been removed from the served guides.

The former implementation and product gaps are tracked in the root `SERVER_SECURITY_CTO_FIX_TASKS.md`. That file is an internal engineering handoff, not a source for the customer-facing instruction route. The repository contains the presentation website and demonstration components; it does not establish live backend or agent enforcement on its own.

The guide validator at `scripts/validate-instruction-guides.mjs` checks all eight translations against the customer-facing chapter structure and prevents internal implementation markers from returning to the Server Security guides.
