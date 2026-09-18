# Frontend Shell Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static moonrise background with the animated `ColorBends` shader, remove "Systems" from the header, and establish the black/white design system shell that later page redesigns will build on.

**Architecture:** A fixed full-viewport `ColorBends` canvas lives inside `LayoutWrapper` as the global background. `Header` drops the "Systems" dropdown while keeping its rounded floating style. `Footer` and `globals.css` adopt the black/white palette tokens. This shell is verified by building the site and confirming the background animates, "Systems" is gone, and the header/footer render correctly.

**Tech Stack:** Next.js 16 + React 19, Tailwind CSS v4 (`@theme`/`globals.css`), three.js (already installed), next-intl.

## Global Constraints

- Background must be `#000000` on all public (non-policy) pages.
- Accent colors are strictly white (`#FFFFFF`) and black (`#000000`); no gold/yellow in the UI.
- Header is the only rounded component; everything else is sharp (`border-radius: 0`).
- No scale/translate hover animations — only color/opacity changes.
- Three.js is already in `dependencies` (`"three": "^0.180.0"`).
- Policy pages (`/policies/*`) must keep existing behavior and not show the animated background.

---

## Task 1: Create ColorBends Component

**Files:**
- Create: `src/components/ColorBends.jsx`
- Create: `src/components/ColorBends.css`
- Test: `npm run build` (must pass)

**Interfaces:**
- Produces: `ColorBends` React component exported as default from `src/components/ColorBends.jsx`.
- Props consumed: `className`, `style`, `colors` (array of hex strings). Default colors are set by the caller (`LayoutWrapper`).

- [ ] **Step 1: Create `src/components/ColorBends.css`**

```css
.color-bends-container {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.color-bends-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}
```

- [ ] **Step 2: Create `src/components/ColorBends.jsx`**

Create the file with the exact component the user provided, placed in the project. It must import `THREE` from `three` and use the `frag` and `vert` shaders as given. Keep all default prop values identical to the snippet.

```jsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ColorBends.css';

const MAX_COLORS = 8;

const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q += (rr - q) * 0.15;
  }

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  col *= uIntensity;

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export default function ColorBends({
  className = '',
  style,
  rotation = 90,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.15,
  iterations = 1,
  intensity = 1.5,
  bandWidth = 6
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const rafRef = useRef(null);
  const materialRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const rotationRef = useRef(rotation);
  const autoRotateRef = useRef(autoRotate);
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));
  const pointerSmoothRef = useRef(8);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));
    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 0 },
        uColors: { value: uColorsArray },
        uTransparent: { value: transparent ? 1 : 0 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise },
        uIterations: { value: iterations },
        uIntensity: { value: intensity },
        uBandWidth: { value: bandWidth }
      },
      premultipliedAlpha: true,
      transparent: true
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, transparent ? 0 : 1);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const handleResize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      material.uniforms.uCanvas.value.set(w, h);
    };

    handleResize();

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);
      resizeObserverRef.current = ro;
    } else {
      window.addEventListener('resize', handleResize);
    }

    const loop = () => {
      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;
      material.uniforms.uTime.value = elapsed;

      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;
      const rad = (deg * Math.PI) / 180;
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      material.uniforms.uRot.value.set(c, s);

      const cur = pointerCurrentRef.current;
      const tgt = pointerTargetRef.current;
      const amt = Math.min(1, dt * pointerSmoothRef.current);
      cur.lerp(tgt, amt);
      material.uniforms.uPointer.value.copy(cur);
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      else window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [bandWidth, frequency, intensity, iterations, mouseInfluence, noise, parallax, scale, speed, transparent, warpStrength]);

  useEffect(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;
    if (!material) return;

    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;
    material.uniforms.uIterations.value = iterations;
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uBandWidth.value = bandWidth;

    const toVec3 = hex => {
      const h = hex.replace('#', '').trim();
      const v =
        h.length === 3
          ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
          : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
      return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);
    };

    const arr = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);
    for (let i = 0; i < MAX_COLORS; i++) {
      const vec = material.uniforms.uColors.value[i];
      if (i < arr.length) vec.copy(arr[i]);
      else vec.set(0, 0, 0);
    }
    material.uniforms.uColorCount.value = arr.length;

    material.uniforms.uTransparent.value = transparent ? 1 : 0;
    if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);
  }, [
    rotation,
    autoRotate,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    iterations,
    intensity,
    bandWidth,
    colors,
    transparent
  ]);

  useEffect(() => {
    const material = materialRef.current;
    const container = containerRef.current;
    if (!material || !container) return;

    const handlePointerMove = e => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };

    container.addEventListener('pointermove', handlePointerMove);
    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return <div ref={containerRef} className={`color-bends-container ${className}`} style={style} />;
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: build completes without errors. If Three.js module resolution warnings appear, ensure import path is `import * as THREE from 'three'`.

- [ ] **Step 4: Commit**

```bash
git add src/components/ColorBends.jsx src/components/ColorBends.css
git commit -m "feat: add ColorBends WebGL background component"
```

---

## Task 2: Wire ColorBends into LayoutWrapper

**Files:**
- Modify: `src/components/LayoutWrapper.jsx:1-44`
- Test: `npm run build`, visual check that background animates on `/`

**Interfaces:**
- Consumes: `ColorBends` from `src/components/ColorBends`.
- Produces: fixed animated background on non-policy pages; no visible change for policy pages.

- [ ] **Step 1: Replace moonrise background with ColorBends**

Edit `src/components/LayoutWrapper.jsx` so the file reads:

```jsx
'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/Footer";
import ParallaxGlobe from "@/components/ParallaxGlobe";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import BackToTopButton from "@/components/BackToTopButton";
import ColorBends from "@/components/ColorBends";

const BACKGROUND_COLORS = [
  '#000000',
  '#00FFC8',
  '#FFFFFF',
  '#FF6BFF'
];

export default function LayoutWrapper({ children, initialLanguage }) {
  const pathname = usePathname();
  const routePath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  const isPolicyPage = routePath.startsWith('/policies');
  const isProductPage = pathname === '/ai-soc';

  const showParallaxGlobe = isProductPage;

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      {!isPolicyPage && (
        <ColorBends
          className="layout-background"
          colors={BACKGROUND_COLORS}
          speed={0.2}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.15}
          intensity={1.5}
          bandWidth={6}
          transparent
        />
      )}
      {showParallaxGlobe && <ParallaxGlobe />}
      <div className={!isPolicyPage ? "default-content-wrapper pt-20" : "default-content-wrapper"}>
        {children}
      </div>
      <div className={isPolicyPage ? "bg-black" : "relative w-full"}>
        <Footer />
      </div>
      <CookieConsent />
      <BackToTopButton />
    </LanguageProvider>
  );
}
```

- [ ] **Step 2: Remove old background styles**

If any CSS in `globals.css` references `.layout-background-image` or the moonrise image specifically, remove or neutralize those rules. The `ColorBends.css` rules now own the background positioning.

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/LayoutWrapper.jsx src/app/globals.css
git commit -m "feat: replace moonrise background with fixed ColorBends shader"
```

---

## Task 3: Remove "Systems" from Header

**Files:**
- Modify: `src/components/Header.jsx:101-115`
- Test: `npm run build`, verify "Systems" is absent from desktop and mobile menus

**Interfaces:**
- Consumes: nothing new.
- Produces: `navItems` array without the `systems` entry.

- [ ] **Step 1: Remove Systems entry and its children**

In `src/components/Header.jsx`, delete the `systemsItems` array and the `systems` object from `navItems`. The relevant section should become:

```jsx
const instructionsItems = [
  { key: "instructions-ai-soc", label: t("header.nav.instructionsAiSoc", "AI-CSD"), href: "/instructions/ai-soc" },
  { key: "instructions-supreme", label: t("header.nav.instructionsSupreme", "Supreme"), href: "/instructions/supreme" },
];

const navItems = [
  { key: "affiliate", label: t("header.nav.affiliate", "Affiliate Program"), href: "/affiliate" },
  { key: "mail", label: t("header.nav.mail", "Mail"), onClick: () => setEmailSecurityOpen(true) },
  { key: "instructions", label: t("header.nav.instructions", "Instructions"), children: instructionsItems },
];
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.jsx
git commit -m "feat: remove Systems dropdown from header"
```

---

## Task 4: Establish Global Black/White Tokens

**Files:**
- Modify: `src/app/globals.css:70-104` and `@theme inline` block
- Test: `npm run build`

**Interfaces:**
- Produces: CSS custom properties/Tailwind theme tokens used by later page tasks.

- [ ] **Step 1: Add design tokens to `:root` and `@theme inline`**

Append these tokens to `:root` in `src/app/globals.css` after the existing variables (around line 104):

```css
  --canvas: #000000;
  --surface: #202020;
  --surface-deep: #181818;
  --text-primary: #FFFFFF;
  --text-secondary: #F5F5F5;
  --text-muted: #7D7D7D;
  --accent-white: #FFFFFF;
  --accent-black: #000000;
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-ghost: rgba(255, 255, 255, 0.5);
  --hover-ghost: rgba(255, 255, 255, 0.2);
```

Then add these to the `@theme inline` block so Tailwind v4 exposes them as utility classes:

```css
  --color-canvas: var(--canvas);
  --color-surface: var(--surface);
  --color-surface-deep: var(--surface-deep);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-accent-white: var(--accent-white);
  --color-accent-black: var(--accent-black);
  --color-border-subtle: var(--border-subtle);
  --color-border-ghost: var(--border-ghost);
  --color-hover-ghost: var(--hover-ghost);
```

- [ ] **Step 2: Set base body background to absolute black**

In `src/app/globals.css`, ensure the `body` rule uses `bg-black` or `bg-[#000000]`. If it already uses `bg-background`, update `--background` in `:root` to `#000000`:

```css
:root {
  ...existing tokens...
  --background: #000000;
  --foreground: #FFFFFF;
  ...
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: build completes without errors and tokens resolve.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add black/white design tokens and absolute black canvas"
```

---

## Task 5: Update Footer to Black/White Palette

**Files:**
- Modify: `src/components/Footer.jsx:1-104`
- Test: `npm run build`, visual check footer renders in black/white

**Interfaces:**
- Consumes: `--surface` and `--text-muted` tokens.
- Produces: footer with no gray text, using white/gray scale.

- [ ] **Step 1: Recolor footer**

Edit `src/components/Footer.jsx` to use the new palette:

```jsx
import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link as LocalizedLink } from '@/i18n/navigation';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const copyright = t("footer.copyright", `© ${year} Silence AI. All rights reserved.`, { year });

  return (
    <footer className="bg-transparent text-white pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="mb-0">
            <Image src="/logo.svg" alt="Silence AI Logo" width={140} height={40} />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-white/70">
            <span className="font-semibold text-white">{t("footer.contactLabel", "Contact:")}</span>
            <span>{t("footer.contactValue", "info@silenceai.net")}</span>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <p className="text-white/50 text-sm text-center lg:text-left w-full lg:w-auto order-2 lg:order-1">{copyright}</p>

          <div className="w-full lg:w-auto order-1 lg:order-2">
            <div className="flex justify-center lg:justify-end mb-4">
              <LocalizedLink href="/policies/cookies" className="text-white/70 hover:text-white transition-colors duration-300 text-sm">
                {t("footer.links.cookies", "Cookies Policy")}
              </LocalizedLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[100px_repeat(3,auto)] gap-y-3 gap-x-2 sm:gap-x-6 items-center text-sm md:text-right">
              <div className="text-white/50 text-xs uppercase tracking-wider font-semibold text-center sm:text-right">AI-CSD 1 Web:</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:contents">
                <LocalizedLink href="/policies/ai-soc1/web/terms_of_use" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsUse", "Terms of Use")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/web/terms_of_service" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsService", "Terms of Service")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/web/privacy" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.privacy", "Privacy Policy")}
                </LocalizedLink>
              </div>

              <div className="text-white/50 text-xs uppercase tracking-wider font-semibold text-center sm:text-right mt-2 sm:mt-0">AI-CSD 1 Email:</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:contents">
                <LocalizedLink href="/policies/ai-soc1/email/terms_of_use" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsUse", "Terms of Use")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/email/terms_of_service" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsService", "Terms of Service")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/email/privacy" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.privacy", "Privacy Policy")}
                </LocalizedLink>
              </div>

              <div className="text-white/50 text-xs uppercase tracking-wider font-semibold text-center sm:text-right mt-2 sm:mt-0">Supreme:</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:contents">
                <LocalizedLink href="/policies/supreme/terms_of_use" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsUse", "Terms of Use")}
                </LocalizedLink>
                <LocalizedLink href="/policies/supreme/terms_of_service" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsService", "Terms of Service")}
                </LocalizedLink>
                <LocalizedLink href="/policies/supreme/privacy" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.privacy", "Privacy Policy")}
                </LocalizedLink>
              </div>

              <div className="text-white/50 text-xs uppercase tracking-wider font-semibold text-center sm:text-right mt-2 sm:mt-0">Affiliate:</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:contents">
                <LocalizedLink href="/affiliate/terms-of-service-affiliate" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsService", "Terms of Service")}
                </LocalizedLink>
                <LocalizedLink href="/affiliate/terms-of-use" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsUse", "Terms of Use")}
                </LocalizedLink>
                <LocalizedLink href="/affiliate/privacy-policy" className="text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.privacy", "Privacy Policy")}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: restyle footer with black/white palette"
```

---

## Task 6: Final Build & Smoke Test

**Files:**
- Test: whole project build

**Interfaces:**
- Consumes: all previous tasks.
- Produces: a passing production build.

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: lint passes or only pre-existing warnings remain.

- [ ] **Step 3: Smoke test checklist**

1. Open the dev server (`npm run dev`) and visit `/`.
2. Confirm the background is animated (fluid motion) and stays fixed while scrolling.
3. Confirm the header is rounded and floating at the top.
4. Confirm "Systems" does not appear in the desktop or mobile menu.
5. Confirm the footer uses white/gray text and no gold/yellow.
6. Visit a policy page (`/policies/privacy` or localized equivalent) and confirm the animated background is not present.

- [ ] **Step 4: Commit final state**

```bash
git add .
git commit -m "chore: verify shell redesign build and smoke tests"
```

---

## Spec Coverage Self-Review

| Spec Requirement | Task(s) |
|---|---|
| Animated background | Task 1, Task 2 |
| Fixed background position | Task 1 (CSS), Task 2 (LayoutWrapper) |
| No gold/yellow UI accents | Task 4 (tokens), Task 5 (footer), enforced in later page plans |
| Header rounded | Already rounded in Header.jsx; preserved in Task 3 |
| Remove "Systems" | Task 3 |
| Black/white palette | Task 4, Task 5 |
| Policy pages excluded | Task 2 (`isPolicyPage` guard) |

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-10-frontend-shell-redesign.md`.

Two execution options:

1. **Subagent-Driven (recommended)** - dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
