# Glass Readability + BorderGlow Hover + iOS-Style Header Pill — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all glassmorphism cards readable via a shared backdrop-blur glass recipe, add the reactbits BorderGlow cursor-following hover effect to every `EdgeGlowCard`, and turn the header into a floating frosted-glass rounded pill on scroll.

**Architecture:** Approach A from the spec — one glass recipe in `globals.css`, BorderGlow absorbed into the existing `EdgeGlowCard` wrapper (20 consumers get it automatically), header pill animated via the existing framer-motion block in `Header.jsx`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4 (CSS-first config in `src/app/globals.css`, no tailwind.config), framer-motion, Playwright (in `.playwright-check/`) for visual verification.

**Spec:** `docs/superpowers/specs/2026-08-11-glass-readability-borderglow-header-design.md`

## Global Constraints

- This project has **no unit-test framework**. Verification = `npm run build` must pass after every task + Playwright screenshots in the final task. Do not invent a test runner.
- **Git commits require explicit user confirmation before each commit** (project rule). Ask, then commit.
- Tailwind v4: custom classes in `globals.css` are unlayered and therefore **beat** `@layer utilities` classes like `bg-white/5`. Use this deliberately — do not fight it with `!important`.
- Glass tokens (verbatim): `--glass-bg: rgba(8, 8, 14, 0.55)`, `--glass-blur: blur(22px) saturate(150%)`, `--glass-border: rgba(255, 255, 255, 0.14)`.
- BorderGlow palette (verbatim): `#c084fc` (purple), `#f472b6` (pink), `#38bdf8` (blue); glow color `hsl(290deg 85% 72%)`.
- Header pill (verbatim): radius `24px`, bg `rgba(255,255,255,0.10)`, blur `blur(24px) saturate(180%)`, border `rgba(255,255,255,0.18)`, shadow `0 8px 32px rgba(0,0,0,0.35)`. White text/icons unchanged.
- Do NOT touch: modals, `AffiliateHeader.jsx`, `SlncEnvHeader.jsx`, `.edge-glow` follow-mode legacy vars, page content/structure, locale files.
- Do NOT run `npm run dev` in foreground — use a background task (it never exits).

---

### Task 1: Glass recipe tokens + global card class upgrades

**Files:**
- Modify: `src/app/globals.css` (`:root` at lines 70–104; `.pricing-card` at 282–287; `.glass-card-glow` at 661–669; `.glass-card-spot` at 890–895; `.affiliate-card` at 327–333)

**Interfaces:**
- Produces: CSS vars `--glass-bg`, `--glass-blur`, `--glass-border`; class `.glass-readable` (block: background + backdrop-filter + -webkit-backdrop-filter + 1px border). Later tasks rely on `.glass-readable` existing.

- [ ] **Step 1: Add tokens to `:root`**

In `src/app/globals.css`, inside `:root` (after the `--header-offset: 96px;` line), add:

```css
  --glass-bg: rgba(8, 8, 14, 0.55);
  --glass-blur: blur(22px) saturate(150%);
  --glass-border: rgba(255, 255, 255, 0.14);
```

- [ ] **Step 2: Add `.glass-readable` utility**

Directly after the `.glass-card { ... }` block (line ~265), add:

```css
.glass-readable {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass-readable {
    background: rgba(8, 8, 14, 0.92);
  }
}
```

- [ ] **Step 3: Upgrade `.pricing-card` (lines 282–287)**

Replace the whole block with:

```css
.pricing-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
}
```

Keep the existing `@supports not ...` fallback block below it unchanged.

- [ ] **Step 4: Upgrade `.glass-card-glow` (lines 661–669)**

Replace with:

```css
.glass-card-glow {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: 1rem;
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  overflow: hidden;
}
```

Keep its `::before`/`:hover::before` blocks unchanged.

- [ ] **Step 5: Upgrade `.glass-card-spot` (lines 890–895)**

Replace with:

```css
.glass-card-spot {
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: inherit;
}
```

- [ ] **Step 6: Upgrade `.affiliate-card` background/blur (lines 330–333)**

Change only these two declarations inside `.affiliate-card`:

```css
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
```

(Keep `background: rgba(0, 0, 0, 0.72);`, border, box-shadow as-is.)

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: compiles with no CSS errors; exit code 0.

- [ ] **Step 8: Commit (after user confirmation)**

```bash
git add src/app/globals.css
git commit -m "feat: add readable glass recipe tokens and upgrade global card classes"
```

---

### Task 2: BorderGlow hover effect inside EdgeGlowCard

**Files:**
- Modify: `src/app/globals.css` (delete old disabled `.edge-glow-static` glow rules at lines 813–888; append new `.border-glow` rules at end of file)
- Modify: `src/components/EdgeGlowCard.jsx` (whole file, 140 lines)
- Delete: `BorderGlow.jsx`, `BorderGlow.css` (project root — stale duplicates)
- Delete: `src/components/BorderGlow.jsx`, `src/components/BorderGlow.css` (absorbed into EdgeGlowCard/globals.css)

**Interfaces:**
- Consumes: nothing from Task 1 at runtime, but visual result depends on `.glass-readable` existing (Task 5 uses it).
- Produces: `EdgeGlowCard` new props — `glow` (boolean, default `true`), `glass` (boolean, default `true`). Consumers opt out with `glow={false}` / `glass={false}`. CSS class `.border-glow` applied to the card root when glow is active; child `<span className="edge-light" aria-hidden="true" />` rendered when glow is active. CSS vars `--edge-proximity` (0–100) and `--cursor-angle` (deg) set on the card root during pointer move.

**Background:** All ~31 consumers use `mode="static"`; the follow mode is default for the rest. The old `.edge-glow-static` per-edge line glows are already force-disabled (`opacity: 0`, lines 860–888) and are replaced by this task.

- [ ] **Step 1: Delete the dead `.edge-glow-static` glow CSS**

In `src/app/globals.css`, delete lines 813–888, i.e. everything from `.edge-glow-static::before,` / `.edge-glow-static::after {` through the block ending with:

```css
.group:hover .edge-glow-card--default.edge-glow-static-spotlight::after,
.group:hover .edge-glow-card--hero.edge-glow-static-spotlight::after {
  opacity: 0;
}
```

Keep `.edge-glow-static { position: relative; isolation: isolate; }` (lines 808–811) and keep the `.edge-glow` / `.edge-glow::before` rules (lines 789–806) untouched.

- [ ] **Step 2: Append the BorderGlow CSS to the end of `src/app/globals.css`**

```css
/* === BorderGlow cursor-following hover glow (adapted from reactbits BorderGlow) === */
.edge-glow.border-glow,
.edge-glow-static.border-glow {
  --edge-proximity: 0;
  --cursor-angle: 45deg;
  --edge-sensitivity: 30;
  --color-sensitivity: calc(var(--edge-sensitivity) + 20);
  --cone-spread: 25;
  --glow-padding: 40px;
  --fill-opacity: 0.5;
  --card-bg: transparent;
  --gradient-one: radial-gradient(at 80% 55%, #c084fc 0px, transparent 50%);
  --gradient-two: radial-gradient(at 69% 34%, #f472b6 0px, transparent 50%);
  --gradient-three: radial-gradient(at 8% 6%, #38bdf8 0px, transparent 50%);
  --gradient-four: radial-gradient(at 41% 38%, #c084fc 0px, transparent 50%);
  --gradient-five: radial-gradient(at 86% 85%, #f472b6 0px, transparent 50%);
  --gradient-six: radial-gradient(at 82% 18%, #38bdf8 0px, transparent 50%);
  --gradient-seven: radial-gradient(at 51% 4%, #f472b6 0px, transparent 50%);
  --gradient-base: linear-gradient(#c084fc 0 100%);
  --glow-color: hsl(290deg 85% 72% / 100%);
  --glow-color-60: hsl(290deg 85% 72% / 60%);
  --glow-color-50: hsl(290deg 85% 72% / 50%);
  --glow-color-40: hsl(290deg 85% 72% / 40%);
  --glow-color-30: hsl(290deg 85% 72% / 30%);
  --glow-color-20: hsl(290deg 85% 72% / 20%);
  --glow-color-10: hsl(290deg 85% 72% / 10%);
  overflow: visible;
}

.edge-glow.border-glow::before,
.edge-glow.border-glow::after,
.edge-glow.border-glow > .edge-light,
.edge-glow-static.border-glow::before,
.edge-glow-static.border-glow::after,
.edge-glow-static.border-glow > .edge-light {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transition: opacity 0.25s ease-out;
  pointer-events: none;
  z-index: 2;
}

.edge-glow.border-glow:not(:hover)::before,
.edge-glow.border-glow:not(:hover)::after,
.edge-glow.border-glow:not(:hover) > .edge-light,
.edge-glow-static.border-glow:not(:hover)::before,
.edge-glow-static.border-glow:not(:hover)::after,
.edge-glow-static.border-glow:not(:hover) > .edge-light {
  opacity: 0;
  transition: opacity 0.75s ease-in-out;
}

/* colored mesh-gradient border */
.edge-glow.border-glow::before,
.edge-glow-static.border-glow::before {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--card-bg) 0 100%) padding-box,
    linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box,
    var(--gradient-one) border-box,
    var(--gradient-two) border-box,
    var(--gradient-three) border-box,
    var(--gradient-four) border-box,
    var(--gradient-five) border-box,
    var(--gradient-six) border-box,
    var(--gradient-seven) border-box,
    var(--gradient-base) border-box;
  opacity: calc((var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));
  mask-image:
    conic-gradient(
      from var(--cursor-angle) at center,
      black calc(var(--cone-spread) * 1%),
      transparent calc((var(--cone-spread) + 15) * 1%),
      transparent calc((100 - var(--cone-spread) - 15) * 1%),
      black calc((100 - var(--cone-spread)) * 1%)
    );
}

/* colored mesh-gradient fill near edges */
.edge-glow.border-glow::after,
.edge-glow-static.border-glow::after {
  border: 1px solid transparent;
  background:
    var(--gradient-one) padding-box,
    var(--gradient-two) padding-box,
    var(--gradient-three) padding-box,
    var(--gradient-four) padding-box,
    var(--gradient-five) padding-box,
    var(--gradient-six) padding-box,
    var(--gradient-seven) padding-box,
    var(--gradient-base) padding-box;
  mask-image:
    linear-gradient(to bottom, black, black),
    radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
    radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
    conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%);
  mask-composite: subtract, add, add, add, add, add;
  opacity: calc(var(--fill-opacity) * (var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));
  mix-blend-mode: soft-light;
}

/* outer glow halo (extends --glow-padding beyond the card; needs overflow: visible on ancestors) */
.edge-glow.border-glow > .edge-light,
.edge-glow-static.border-glow > .edge-light {
  inset: calc(var(--glow-padding) * -1);
  mask-image:
    conic-gradient(
      from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%
    );
  opacity: calc((var(--edge-proximity) - var(--edge-sensitivity)) / (100 - var(--edge-sensitivity)));
  mix-blend-mode: plus-lighter;
}

.edge-glow.border-glow > .edge-light::before,
.edge-glow-static.border-glow > .edge-light::before {
  content: "";
  position: absolute;
  inset: var(--glow-padding);
  border-radius: inherit;
  box-shadow:
    inset 0 0 0 1px var(--glow-color),
    inset 0 0 1px 0 var(--glow-color-60),
    inset 0 0 3px 0 var(--glow-color-50),
    inset 0 0 6px 0 var(--glow-color-40),
    inset 0 0 15px 0 var(--glow-color-30),
    inset 0 0 25px 2px var(--glow-color-20),
    inset 0 0 50px 2px var(--glow-color-10),
    0 0 1px 0 var(--glow-color-60),
    0 0 3px 0 var(--glow-color-50),
    0 0 6px 0 var(--glow-color-40),
    0 0 15px 0 var(--glow-color-30),
    0 0 25px 2px var(--glow-color-20),
    0 0 50px 2px var(--glow-color-10);
}
```

- [ ] **Step 3: Rewrite `src/components/EdgeGlowCard.jsx`**

Full new content:

```jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const EdgeGlowCard = ({
  children,
  outerClassName = "",
  innerClassName = "",
  innerStyle = {},
  glowColor = "rgba(255,0,183,0.85)",
  secondaryGlowColor,
  mode = "follow",
  spotlight = false,
  topColor,
  rightColor,
  bottomColor,
  leftColor,
  style,
  animateOnView = true,
  glow = true,
  glass = true,
  ...rest
}) => {
  const resolvedSecondary = secondaryGlowColor ?? glowColor;
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!animateOnView);
  const [canGlow, setCanGlow] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanGlow(finePointer && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!animateOnView) {
      return undefined;
    }

    const node = wrapperRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10%",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [animateOnView]);

  const appearClasses = animateOnView ? clsx("card-appear", isVisible && "card-appear--visible") : "";
  const glowEnabled = glow && canGlow;

  // BorderGlow: set --edge-proximity (0-100) and --cursor-angle (deg) from pointer position
  const handleGlowMove = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let angle = 0;
    if (dx !== 0 || dy !== 0) {
      angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
    }
    target.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
    target.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  };

  const glowHandlers = glowEnabled
    ? { onPointerMove: handleGlowMove }
    : {};

  if (mode === "static") {
    return (
      <div
        {...rest}
        {...glowHandlers}
        ref={wrapperRef}
        className={clsx(
          "edge-glow-static",
          glowEnabled && "border-glow",
          spotlight && "edge-glow-static-spotlight",
          appearClasses,
          outerClassName
        )}
        style={{
          "--edge-glow-color": glowColor,
          "--edge-glow-secondary": resolvedSecondary,
          "--edge-glow-top": topColor,
          "--edge-glow-right": rightColor,
          "--edge-glow-bottom": bottomColor,
          "--edge-glow-left": leftColor,
          ...style,
        }}
      >
        {glowEnabled && <span className="edge-light" aria-hidden="true" />}
        <div
          className={clsx("relative z-10 h-full w-full rounded-[inherit]", glass && "glass-readable", innerClassName)}
          style={innerStyle}
        >
          {children}
        </div>
      </div>
    );
  }

  const handleMouseMove = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty("--cursor-x", `${x}px`);
    target.style.setProperty("--cursor-y", `${y}px`);
    target.style.setProperty("--glow-opacity", "1");
    if (glowEnabled) {
      handleGlowMove(event);
    }
  };

  const handleMouseLeave = (event) => {
    const target = event.currentTarget;
    target.style.setProperty("--glow-opacity", "0");
  };

  return (
    <div
      {...rest}
      onMouseEnter={handleMouseMove}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={wrapperRef}
      className={clsx(
        "edge-glow",
        glowEnabled && "border-glow",
        spotlight && "edge-glow-static-spotlight",
        appearClasses,
        outerClassName
      )}
      style={{
        "--edge-glow-color": glowColor,
        "--glow-opacity": 0,
        "--edge-glow-top": topColor,
        "--edge-glow-right": rightColor,
        "--edge-glow-bottom": bottomColor,
        "--edge-glow-left": leftColor,
        ...style,
      }}
    >
      {glowEnabled && <span className="edge-light" aria-hidden="true" />}
      <div
        className={clsx("relative z-10 h-full w-full rounded-[inherit]", glass && "glass-readable", innerClassName)}
        style={innerStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default EdgeGlowCard;
```

Notes for the implementer:
- The `.glass-readable` class on the inner div wins over consumers' inline Tailwind `bg-*` utilities (unlayered beats layered) — that is intentional.
- The `glass` prop is added in both branches now even though `.glass-readable` is defined in Task 1; if Task 1 is skipped the class is simply inert.

- [ ] **Step 4: Delete stale BorderGlow files**

```bash
rm BorderGlow.jsx BorderGlow.css src/components/BorderGlow.jsx src/components/BorderGlow.css
```

Verify nothing imports them: `Grep` for `BorderGlow` in `src/` — expected: zero matches.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: compiles, exit code 0, no references to deleted files.

- [ ] **Step 6: Commit (after user confirmation)**

```bash
git add src/app/globals.css src/components/EdgeGlowCard.jsx
git rm BorderGlow.jsx BorderGlow.css src/components/BorderGlow.jsx src/components/BorderGlow.css 2>/dev/null || true
git commit -m "feat: integrate BorderGlow cursor-following hover effect into EdgeGlowCard"
```

---

### Task 3: Header frosted pill on scroll

**Files:**
- Modify: `src/components/Header.jsx` (animate block at lines 274–295; dropdown at line 361; link radius at 369, 379; mobile links at 177, 192)

**Interfaces:**
- Consumes: nothing. Produces: no API changes (Header props unchanged).

- [ ] **Step 1: Rewrite the pill animate block (lines 274–295)**

Replace the `<motion.div className="mx-auto w-full max-w-7xl rounded-none border border-transparent transition-colors" ...>` block's `className`, `animate`, and `transition` props with:

```jsx
        <motion.div
          className="mx-auto w-full max-w-7xl border border-transparent"
          animate={{
            width: widthTarget,
            borderRadius: isCondensed ? 24 : 0,
            backgroundColor: isCondensed ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0)",
            borderColor: isCondensed ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0)",
            backdropFilter: isCondensed ? "blur(24px) saturate(180%)" : "blur(0px)",
            WebkitBackdropFilter: isCondensed ? "blur(24px) saturate(180%)" : "blur(0px)",
            boxShadow: isCondensed ? "0 8px 32px rgba(0,0,0,0.35)" : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{
            width: { duration: 0.3, ease: "easeOut" },
            borderRadius: { duration: 0.3, ease: "easeOut" },
            backgroundColor: { duration: 0.3, ease: "easeOut" },
            borderColor: { duration: 0.3, ease: "easeOut" },
            backdropFilter: { duration: 0.3, ease: "easeOut" },
            WebkitBackdropFilter: { duration: 0.3, ease: "easeOut" },
            boxShadow: { duration: 0.3, ease: "easeOut" },
          }}
          style={{ minWidth: isDesktop || isCondensed ? undefined : "100%" }}
        >
```

Behavior change vs. before: the condensed (scrolled) style now applies on **all** pages including the main page — at the top the header is transparent everywhere, on scroll it becomes the frosted pill everywhere.

- [ ] **Step 2: Frost the desktop dropdown (line 361)**

Replace:

```jsx
className="absolute left-0 mt-2 w-max min-w-[8rem] overflow-hidden rounded-none border border-white/10 bg-black/85 p-2"
```

with:

```jsx
className="absolute left-0 mt-2 w-max min-w-[8rem] overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-2 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
```

- [ ] **Step 3: Round the dropdown items (lines 369 and 379)**

Line 369 — replace `className="block rounded-none px-3 py-2 text-sm text-white hover:bg-white/10 whitespace-nowrap"` with:

```jsx
className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10 whitespace-nowrap"
```

Line 379 — replace `className="block rounded-none px-3 py-2 text-sm text-white/60 whitespace-nowrap"` with:

```jsx
className="block rounded-lg px-3 py-2 text-sm text-white/60 whitespace-nowrap"
```

- [ ] **Step 4: Round the mobile menu items (lines 177 and 192)**

Line 177 — replace `className="block rounded-none px-3 py-2 text-white/90 hover:bg-white/10"` with:

```jsx
className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10"
```

Line 192 — replace `className="block w-full rounded-none px-3 py-2 text-left text-white/60 cursor-default"` with:

```jsx
className="block w-full rounded-lg px-3 py-2 text-left text-white/60 cursor-default"
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: compiles, exit code 0.

- [ ] **Step 6: Commit (after user confirmation)**

```bash
git add src/components/Header.jsx
git commit -m "feat: frosted glass rounded header pill on scroll"
```

---

### Task 4: Targeted readability swaps in non-wrapper card content

**Files:**
- Modify: `src/components/SecureDevelopment.jsx:266` and `src/components/SecureDevelopment.jsx:327`
- Modify: `src/components/CaseStudies.jsx:139`

**Interfaces:**
- Consumes: `.glass-readable` from Task 1.

Cards whose glass comes through `EdgeGlowCard`'s inner div are already fixed by Task 2 (`glass` prop). This task fixes child-level divs with their own weak backgrounds that sit *inside* card content.

- [ ] **Step 1: SecureDevelopment cards (two identical spots, lines 266 and 327)**

Replace (both occurrences):

```jsx
className="relative overflow-hidden rounded-[16px] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm h-full"
```

with:

```jsx
className="relative overflow-hidden rounded-[16px] glass-readable p-6 h-full"
```

- [ ] **Step 2: CaseStudies floating badge (line 139)**

Replace:

```jsx
className="absolute top-6 left-6 rounded-2xl px-3 py-2 border border-white/12 bg-black/35 backdrop-blur-md"
```

with:

```jsx
className="absolute top-6 left-6 rounded-2xl px-3 py-2 glass-readable"
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: compiles, exit code 0.

- [ ] **Step 4: Commit (after user confirmation)**

```bash
git add src/components/SecureDevelopment.jsx src/components/CaseStudies.jsx
git commit -m "feat: use readable glass on secure-dev cards and case-study badge"
```

---

### Task 5: DESIGN.md addendum

**Files:**
- Modify: `DESIGN.md` (append at end)

- [ ] **Step 1: Append the addendum**

```markdown
---

## 10. Addendum — 2026-08 Glass Update (supersedes "no glows/blur on UI elements")

The Lamborghini-inspired system above remains the base, but the following site-wide updates now apply:

- **Readable glass**: content cards use the shared recipe `--glass-bg: rgba(8,8,14,0.55)`, `--glass-blur: blur(22px) saturate(150%)`, `--glass-border: rgba(255,255,255,0.14)` via the `.glass-readable` class in `globals.css`. Card border-radius is per-component and no longer restricted to 0px.
- **BorderGlow hover**: cards rendered through `EdgeGlowCard` show a cursor-following purple/pink/blue (`#c084fc`/`#f472b6`/`#38bdf8`) border glow + edge fill + outer halo on hover (fine-pointer devices, honors `prefers-reduced-motion`). Opt out per card with `glow={false}`; opt out of the glass fill with `glass={false}`.
- **Header pill**: the site header is transparent at the top of the page and animates on scroll into a floating frosted-glass pill — `border-radius: 24px`, `rgba(255,255,255,0.10)` background, `blur(24px) saturate(180%)`, `rgba(255,255,255,0.18)` border, white text/icons.
```

- [ ] **Step 2: Commit (after user confirmation)**

```bash
git add DESIGN.md
git commit -m "docs: addendum for glass recipe, BorderGlow hover, header pill"
```

---

### Task 6: Visual verification with Playwright

**Files:**
- Create: `.playwright-check/check-glass.js`
- Reference pattern: `.playwright-check/check-design2.js` (read it first for browser launch conventions — browsers live in `.playwright-check/browsers`)

- [ ] **Step 1: Start the dev server in the background**

Run (background task): `npm run dev`
Expected: `Ready` on `http://localhost:3000` within ~30s.

- [ ] **Step 2: Write `.playwright-check/check-glass.js`**

Read `.playwright-check/check-design2.js` first and reuse its browser-launch boilerplate (PLAYWRIGHT_BROWSERS_PATH etc.). The script must:

```js
// 1. Desktop 1440x900: goto http://localhost:3000/en, wait for network idle + 3s
// 2. Screenshot header at top -> glass-header-top.png
// 3. Scroll window.scrollTo(0, 600), wait 800ms -> glass-header-scrolled.png (pill must be visible)
// 4. Find a services card (an .edge-glow-static element), hover its center, wait 500ms,
//    screenshot the element's bounding box padded by 60px -> glass-card-hover.png (glow must be visible)
// 5. Screenshot full page -> glass-full.png
// 6. Mobile 390x844: repeat steps 2-3 -> glass-mobile-top.png / glass-mobile-scrolled.png
```

Run: `cd .playwright-check && node check-glass.js`
Expected: 6 PNG files written, no errors.

- [ ] **Step 3: Read the screenshots and judge**

Read each PNG with ReadMediaFile. Acceptance criteria:
- `glass-card-hover.png`: card text is readable over the aurora; a colored glow ring/fill is visible near the cursor edge; the halo is NOT clipped at the card boundary.
- `glass-header-scrolled.png`: header is a rounded (24px radius) frosted pill; nav text crisp and readable; no sharp corners.
- `glass-header-top.png`: header transparent, floats over hero.
- `glass-full.png`: no obviously broken cards (layout shifts, missing backgrounds, glow covering text at rest — at rest there must be NO glow).
- Mobile shots: pill renders, no horizontal overflow.

- [ ] **Step 4: Fix loop**

For any criterion that fails, make the minimal fix (usual suspects: an ancestor with `overflow: hidden` or `clip-path` clipping the halo → pass `glow={false}` on that specific card; a card where `.glass-readable` hurts an image-heavy tile → pass `glass={false}`). Re-run Step 2 and re-check. Common opt-out candidates if clipping appears: cards using `.card-chopped` (clip-path), `HomeLanding` CardSwap tiles, `WorldMapKazakhstan` overlays.

- [ ] **Step 5: Stop the dev server, final build, commit (after user confirmation)**

Run: `npm run build` — must pass.

```bash
git add -A
git commit -m "chore: visual verification fixes for glass/BorderGlow/header pill"
```

---

## Self-Review Notes

- **Spec coverage:** §1 glass recipe → Tasks 1, 4. §2 BorderGlow (palette, overflow-visible, pointer-events, z-index, transparent card bg, radius inherit, touch/reduced-motion gating, root duplicate deletion) → Task 2. §3 header pill (all animate values, dropdown frosting, all-pages behavior, Affiliate/SlncEnv headers untouched) → Task 3. §5 DESIGN.md addendum → Task 5. §6 verification → Task 6. §4 out-of-scope respected (no modal/AffiliateHeader/SlncEnvHeader edits).
- **Type consistency:** props `glow`/`glass` (boolean) used identically in Task 2's code and Task 6's fix loop; CSS vars `--edge-proximity`/`--cursor-angle` produced by `handleGlowMove` match the consumers in Task 2's CSS.
- **Key correctness detail:** new `.border-glow` rules are appended at the END of `globals.css` and use two-class selectors so they beat the legacy `.edge-glow`/`edge-glow-static` single-class rules at equal-or-higher specificity; legacy static-mode glow rules are deleted outright.
