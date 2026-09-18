# Glassmorphism Readability + BorderGlow Hover + iOS-Style Header Pill — Design

Date: 2026-08-11
Status: Approved by user (2026-08-11)
Approach: **A — Shared wrapper + global CSS tokens**

## Problem

Cards across the site use glassmorphism with transparent backgrounds and little/no backdrop blur. Over the bright aurora background (see `image.png` in project root), text on cards is hardly readable. Additionally:

- Cards need a specific hover effect: the reactbits **BorderGlow** cursor-following glow (component already exists, unused, at `src/components/BorderGlow.jsx` + `src/components/BorderGlow.css`).
- The header has harsh sharp corners, no blur, and becomes unreadable when scrolling over bright sections. It should become a floating, rounded, light frosted-glass pill (like a modern iOS search bar).

## Decisions (from brainstorming)

| Question | Decision |
|---|---|
| Hover effect | BorderGlow component (cursor-following border glow + inner fill + outer halo) |
| Header look | Light frosted pill: `rgba(255,255,255,0.10)` + strong blur, white text stays |
| Card scope | All content cards site-wide via the shared `EdgeGlowCard` wrapper (20 consumers) + global card CSS classes |
| Header behavior | Transparent at top; pill fades/slides in once user scrolls |

## Design

### 1. Readable glass recipe — `src/app/globals.css`

New tokens:

```css
--glass-bg: rgba(8, 8, 14, 0.55);
--glass-blur: blur(22px) saturate(150%);
--glass-border: rgba(255, 255, 255, 0.14);
```

- New utility class `.glass-readable` applying the tokens, plus `-webkit-backdrop-filter` for Safari.
- Upgrade existing card classes to the same recipe: `.pricing-card`, `.glass-card-glow`, `.glass-card-spot`, `.affiliate-card`, `.affiliate-subcard` (raise background opacity, strengthen blur; keep existing `@supports` fallback patterns).
- Border-radius of each card stays as-is — only background/blur/border change.
- ~15 components with inline `bg-white/5 backdrop-blur-sm`-style strings get swapped to the shared class (main ones: `AiSocLanding.jsx`, `SecureDevelopment.jsx`, `CaseStudies.jsx`, `Testimonials.jsx`, `WhyChooseUs.jsx`, `Pricing.jsx`).

### 2. BorderGlow hover effect — `src/components/EdgeGlowCard.jsx`

- `EdgeGlowCard` mounts `src/components/BorderGlow.jsx` around its content, enabled by default with a `glow={false}` opt-out prop for cards where the effect would break layout (tiny pills, map overlays).
- Palette-matched colors: `#c084fc` (purple), `#f472b6` (pink), `#38bdf8` (blue) — same hues as the site aurora.
- Correctness requirements (the "careful way"):
  - Wrapper keeps `overflow: visible` — the glow halo extends 40px beyond the card and must not be clipped.
  - Effect layers (`::before`, `::after`, `.edge-light`) get `pointer-events: none`; card content stays interactive.
  - Glow layer sits under card content via z-index; card text never covered.
  - BorderGlow's `backgroundColor` is transparent so the glass recipe (§1) provides the card fill.
  - BorderGlow `borderRadius` prop receives each card's actual radius (passed through from EdgeGlowCard's outerClassName convention / new prop).
  - Disabled on touch-only devices and under `prefers-reduced-motion`.
- `src/components/BorderGlow.jsx`/`.css` are reviewed before integration; root-level `BorderGlow.jsx`/`.css` are stale duplicates and are deleted to avoid confusion.

### 3. Header pill — `src/components/Header.jsx`

- **At top (scrollY ≤ 10):** unchanged — transparent, full-width, floats over hero.
- **On scroll (`isCondensed`):** framer-motion animates:
  - `borderRadius: 0 → 24px` (iOS search-bar pill)
  - width shrink: full → inset with side margins (stays within `max-w-7xl`)
  - `backgroundColor: rgba(0,0,0,0) → rgba(255,255,255,0.10)`
  - `backdropFilter: blur(0px) → blur(24px) saturate(180%)` (plus `-webkit-backdrop-filter`)
  - `borderColor → rgba(255,255,255,0.18)`
  - soft shadow `0 8px 32px rgba(0,0,0,0.35)`
- Text and icons stay white — "light glance" frosted glass, not a light-mode bar.
- Dropdown menus get matching rounded frosted styling (`rounded-2xl`, same bg/blur tokens) for consistency.
- Applies on all pages (currently the condensed state only styles non-main pages — this becomes uniform).
- `AffiliateHeader.jsx` and `SlncEnvHeader.jsx` are NOT redesigned (separate sub-brands); only `Header.jsx` changes.

### 4. Out of scope

- Modals/dialogs and other overlays (already have their own blur styles).
- Page structure, content, color palette, typography.
- `.edge-glow` / `.edge-glow-static` legacy classes remain disabled.

### 5. Documentation

- `DESIGN.md` gets a short addendum ("2026-08 glass update") documenting the glass recipe, BorderGlow hover, and header pill so the design doc doesn't contradict the code.

### 6. Verification

1. `npm run build` passes.
2. Dev server + Playwright screenshots (pattern from `.playwright-check/`): services cards, pricing, testimonials, case studies; header at top vs scrolled; desktop 1440px + mobile 390px.
3. Screenshots read back to confirm: text readable over aurora, hover glow appears and is not clipped, header pill rounds on scroll.
4. Hover state verified via Playwright `hover()` on a card.
