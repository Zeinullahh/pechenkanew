# Frontend Redesign — Black Canvas + ColorBends Background

## Overview

Redesign the public-facing frontend of the Next.js site (all routes except policies) using a Lamborghini-inspired dark luxury system, with the following key deviations from `DESIGN.md`:

- **No gold/yellow accent**: replace Lamborghini Gold with white as the primary accent.
- **Animated colorful background**: replace the static `moonrise.webp` with the provided `ColorBends` WebGL shader.
- **Header exception**: the header keeps rounded corners; all other UI elements use sharp corners.

## Goals

1. Make the background animated and fixed for the whole public site.
2. Remove "Systems" from the main header.
3. Apply a consistent black/white design language to all non-policy pages.
4. Establish reusable tokens so remaining pages can be updated incrementally.

## Color Palette

| Role | Value | Usage |
|------|-------|-------|
| Background | `#000000` | Page background, hero sections, footer, deepest layer |
| Surface | `#202020` | Cards, panels, elevated content blocks |
| Deep Surface | `#181818` | Footer variants, deep sections |
| Primary Text | `#FFFFFF` | Headlines, body, nav labels, button labels |
| Secondary Text | `#F5F5F5` / `#7D7D7D` | Muted body, metadata |
| Primary Accent | `#FFFFFF` | Primary CTA fills, key highlights |
| CTA Text on Accent | `#000000` | Text on white-filled buttons |
| Border/Divider | `#FFFFFF` at 50% opacity | Ghost buttons, section dividers |
| Hover Surface | `#1EAEDB` → replaced by `#FFFFFF33` (white 20%) | Ghost/transparent button hover |
| Link Hover | `#3860BE` | Keep from original design |

> Note: no `#FFC000`, `#917300`, `#FFCE3E`, or `#29ABE2` accents in UI. Cyan/teal appear only inside the animated background shader.

## Background

- **Component**: `ColorBends` (provided Three.js shader component).
- **Placement**: fixed full-viewport layer behind all content, mounted once in `LayoutWrapper`.
- **Behavior**: `position: fixed; inset: 0; z-index: -1; pointer-events: none` so it stays static while content scrolls.
- **Colors passed to shader** (sampled from `image.png`):
  - `#000000` — deep black
  - `#00FFC8` — cyan/teal
  - `#FFFFFF` — white
  - `#FF6BFF` — subtle magenta/pink accent
- **Props**: `speed={0.2}`, `frequency={1.0}`, `warpStrength={1.0}`, `mouseInfluence={1.0}`, `parallax={0.5}`, `noise={0.15}`, `intensity={1.5}`, `bandWidth={6}`, `transparent={true}`.

## Typography

- **Font stack**: use existing project fonts; fall back to Roboto, Helvetica Neue, Arial, sans-serif.
- **Display headings**: uppercase, tight line-height (`0.92–1.19`), weight 400.
- **Hierarchy targets**:
  - Hero Display: `clamp(54px, 8vw, 120px)`, uppercase, line-height 0.92
  - Display 2: `clamp(40px, 5vw, 80px)`, uppercase, line-height 1.13
  - Section Title: `clamp(32px, 4vw, 54px)`, uppercase
  - Body: 16–18px, line-height 1.5
- **No italic, no decorative variants**.

## Components

### Header
- **Rounded corners** (e.g., `border-radius: 9999px` or a large fixed value like `32px`) — the only rounded element.
- Transparent/blurred dark background floating near the top center, white text and icons.
- Remove the "Systems" dropdown entirely.
- Keep language/currency selectors if present; style them in white/black.

### Buttons
- **Primary CTA**: white background (`#FFFFFF`), black text (`#000000`), zero border-radius, padding 24px, font-size 16px, weight 400.
- **Secondary / Ghost**: transparent background, white text, 1px solid white border at 50% opacity, padding 16px, zero border-radius.
- **Hover**: shift background to white at ~20% opacity for ghost; shift primary to `#F5F5F5`.
- **No scale/translate animations on hover** — only color/opacity changes.

### Cards & Containers
- Background: `#202020`.
- Border-radius: `0px` (sharp).
- Dividers: 1px solid `#202020` or white at 10% opacity.
- No drop shadows; use surface color layering for depth.

### Inputs / Forms
- White text on black, `#7D7D7D` borders.
- Rounded only for switches if any (existing pattern).

## Layout

- **Canvas**: black (`#000000`) everywhere.
- **Spacing base**: 8px.
- **Section padding**: `clamp(24px, 5vw, 56px)` vertical, `clamp(16px, 4vw, 40px)` horizontal.
- **Max content width**: 1440px, centered.
- **Full-bleed heroes** where appropriate.

## Phased Rollout

1. **Phase 1 — Global shell**
   - Replace `moonrise.webp` background in `LayoutWrapper` with fixed `ColorBends`.
   - Update `Header`: remove Systems, apply rounded floating style.
   - Update `Footer`: black/white palette.
   - Inject global CSS tokens (CSS variables or Tailwind config).

2. **Phase 2 — Homepage**
   - Redesign `HomeLanding` sections (hero, systems/compliance, partners, resources, pricing, FAQ).

3. **Phase 3 — Product & affiliate pages**
   - Redesign `AiSocLanding` and `AffiliateLanding`.

4. **Phase 4 — Instructions & certificates**
   - Lighter styling pass on `AiSocDocumentationTabs`, `SupremeInstructions`, and certificate pages.

## Excluded Scope

- Policy pages (`/policies/*` and localized policy routes) keep their existing layout unless explicitly requested later.

## Success Criteria

- Background is animated, fixed, and visible behind all non-policy pages.
- "Systems" no longer appears in the main header.
- No yellow/gold accents remain in the public UI.
- Header is rounded; all other cards/buttons are sharp.
- Homepage renders correctly in the new style.
