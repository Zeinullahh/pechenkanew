# Plan: Full Landing Page Analysis & Server Security Sandbox Prompt

## 1. Project Analysis
- [x] Inspect project dependencies, frameworks (Next.js 16, React 19, Tailwind v4, Framer Motion)
- [x] Analyze landing page routing (`src/app/[locale]/page.jsx`, `HomeLanding.jsx`, `Pricing.jsx`)
- [x] Analyze existing interactive sandboxes (`InteractiveSandbox.jsx`, `CmcView.jsx`, `WebmailView.jsx`, `WebSocView.jsx`)
- [x] Analyze source repository `/home/wrld/Documents/ai-csd-server/` (`ServersPage`, `ServerSecurityConsole.jsx`, `NativeServerSetupDialog.jsx`, data models)

## 2. Architecture & Design Specification for Server Security Sandbox
- [x] Define component hierarchy (`ServerSecurityView.jsx`, `ServerConsoleView`, `ServerSetupDialog`, etc.)
- [x] Define pure frontend mock data engine (`serverMockData.js` covering sensors, incidents, responses, packages, posture, policy)
- [x] Define state reducer extensions (`createInitialServerState`, `serverSandboxReducer`, attack simulations, reset)
- [x] Address viewport scaling (`1384x950`), dialog containment (no `document.body` breakout), dark cyber theme
- [x] Integration point in `Pricing.jsx` for `productType === "server"`

## 3. Comprehensive Implementation Prompt for Subagent/Another Agent
- [x] Draft exhaustive, turnkey prompt covering:
  - Exact source files from `/home/wrld/Documents/ai-csd-server/` to adapt
  - Target files to create/modify in `/home/wrld/Documents/pechenkanew/`
  - Pixel-to-pixel fidelity and CSS isolation rules
  - Mock data & interactive behaviors (Attack / Reset / Tab switching)
  - Unit tests in `tests/sandbox-state.test.mjs` and build verification (`npm run build`)
