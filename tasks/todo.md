# Interactive Sandbox Enhancement Plan

## Objective
Implement 4 specific enhancements requested by the user:
1. Redesign product switcher between CMC and Web Mail Client to match the pill toggle in the instructions block (`AiSocDocumentationTabs.jsx`).
2. Add "Department flow" and Department clusters in CMC sandbox, matching `cmc-v2` (`AnalyticsCards.js` and `useD3Visualization.js`).
3. Add automated AI Assistant animation in Webmail workspace where the AI tab opens, demonstrates the prompt "Переведи все письма в папку Finance & Audit", executes folder creation & moving emails, and allows interactive typing.
4. Reduce the overall size/scale of the sandbox for a cleaner, more proportional fit on the page.

---

## Phases & Checklist

### Phase 1: Pill Switcher (Instructions Block Style)
- [x] 1.1 Remove fake browser topbar and address row from `InteractiveSandbox.jsx`
- [x] 1.2 Implement the floating pill toggle using Framer Motion (`motion.span layoutId="sandbox-tab-indicator"`, `rounded-full border border-purple-400/25 bg-[#050b1a]/85 p-1`, active text gradient)
- [x] 1.3 Maintain clean placement for header action buttons (`Simulate Attack`, `Reset Demo`, `Expand/Collapse`)
- [x] 1.4 Verify smooth tab transitions and keyboard accessibility

### Phase 2: CMC Company & Department Flow (from `cmc-v2`)
- [x] 2.1 Add `AnalyticsCards` component to CMC view showing "Department flow" (departments, emails, in/out, threats) and "Domain volume"
- [x] 2.2 Add Department clusters (e.g. Finance & Audit, Security Ops) above the company circle in SVG topology matching `cmc-v2`
- [x] 2.3 Connect department nodes and analytics cards to selection modal so clicking any department filters its emails
- [x] 2.4 Add company branding badge in CMC subbar (`silenceai.net` + logo) matching `TopBar.js` from `cmc-v2`

### Phase 3: Webmail AI Tab Animation & Interactive Folder Routing
- [x] 3.1 Enhance `FloatingAIChat.jsx` to support auto-open animation upon switching to Webmail
- [x] 3.2 Add simulated automated typing / demonstration prompt: *"Переведи все письма в папку Finance & Audit"*
- [x] 3.3 Add AI response: *"Фолдер «Finance & Audit» был создан, и туда письма были перенаправлены."*
- [x] 3.4 Wire up state mutation: create custom folder, assign target emails, and update folder list live in `sandboxState.js`
- [x] 3.5 Allow user to also interactively type and trigger custom folder moves (supporting Russian & English prompts)

### Phase 4: Reduce Sandbox Dimensions & Proportions
- [x] 4.1 Reduce container max-width and vertical scale in `sandbox.css` and `InteractiveSandbox.jsx` (max-width: 1240px, scaled space base height 830px, 0.88 default scale)
- [x] 4.2 Adjust padding and margins so the sandbox sits naturally without overwhelming the screen
- [x] 4.3 Ensure responsive containment on desktop, tablet, and mobile

### Phase 5: Verification & Testing
- [x] 5.1 Run tests (`node --test tests/sandbox-state.test.mjs` - 7/7 passing)
- [x] 5.2 Verify Next.js build: `npm run build` (Turbopack, 275/275 static routes compiled successfully)
- [x] 5.3 Test live interactions (pill switching, department flow, AI chat typewriter animation, sandbox sizing)
- [x] 5.4 Document results and review in `tasks/todo.md`

---

- **Product Switcher (Updated)**: Styled identically to the Pricing block architecture selector with blue laser rays (`#3B82F6`), clean typography with drop shadows, and active spring underline (`layoutId="sandbox-pricing-type-underline"`). Tabs renamed to **Email CMC** and **Email Web Security**.
- **CMC Zoom / Wheel Removal**: Completely removed wheel event listener, pointer drag-to-pan, zoom hint text, and reset-view button. The SVG topology canvas is now completely stable, does not hijack mouse wheel scrolling on the page, and has `cursor: default`.
- **CMC Company & Department Flow**: Added `AnalyticsCards.jsx` with collapsible "Department flow" and "Domain volume" cards matching `cmc-v2`. Added SVG department clusters for *Finance & Audit* and *Security Ops* with green/purple glowing perimeter, member nodes, and click-to-filter drilldown. Added company branding badge (`silenceai.net` + EV logo) to the CMC subbar.
- **Webmail AI Animation**: Automated typewriter demonstration automatically opens the AI panel when switching to Webmail, types *"Переведи все письма в папку Finance & Audit"*, receives AI response, creates the custom folder, and moves matching emails into it. Replay demo button and full interactive chat support custom prompts (e.g. creating "Executive Board" folder or threat inquiries).
- **Scale & Proportions**: Reduced sandbox container max-width to 1240px with 40px margin and 0.88 canvas scale for a balanced, sleek desktop presence.
- **Test Results**: All 7 state unit tests pass; `next build` static export succeeded with 0 errors across 275 pages; local dev server running at `http://localhost:3000`.
