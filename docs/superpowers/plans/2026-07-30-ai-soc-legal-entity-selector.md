# AI-SOC Legal Entity Selector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a UAE/Kazakhstan legal entity selector to the AI-SOC Terms of Use page that switches the rendered terms content and shows Kazakhstan legal entity details when Kazakhstan is selected.

**Architecture:** A new client wrapper (`TermsOfUseWithEntity`) manages the selected entity state and renders either the new English Terms of Use component (`TermsOfUseEn`) or the existing Russian Terms of Use component (`RuAiSocTermsOfUse`). A small `LegalEntitySelector` is passed into each terms component and rendered after the title. A `KazakhstanEntityDetails` block is rendered only for the Kazakhstan entity.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, existing client Terms of Use components.

## Global Constraints

- Scope is limited to the AI-SOC Terms of Use page (`/policies/ai-soc1/terms_of_use` and localized variants).
- No backend or API calls.
- No external state persistence (localStorage/cookies); choice resets on reload.
- Kazakhstan entity renders the existing Russian terms component and the provided Kazakhstan legal entity details in Russian.
- UAE entity renders the English Terms of Use component.
- Default entity: UAE for non-Russian locales; Kazakhstan for the `/ru/` locale.
- Unknown entity code defaults to UAE.

---

## Task 1: Create the Kazakhstan legal entity details component

**Files:**
- Create: `src/components/policies/ai-soc1/KazakhstanEntityDetails.jsx`
- Test: `npm run build` (only fails if component is broken)

**Interfaces:**
- Produces: `KazakhstanEntityDetails` (no props required) — renders the Kazakhstan legal entity details block.

- [ ] **Step 1: Write the component**

Create `src/components/policies/ai-soc1/KazakhstanEntityDetails.jsx` with the exact content below:

```jsx
"use client";

import React from "react";

const KazakhstanEntityDetails = () => {
  const details = [
    { label: "ИИК (номер счета)", value: "KZ8996503F0015440498KZT" },
    { label: "БИК Банка", value: "IRTYKZKA" },
    { label: "Наименование филиала", value: 'Филиал АО "ForteBank" в г. Астана' },
    { label: "КБе", value: "17" },
    { label: "БИН", value: "250840004804" },
    {
      label: "Адрес компании",
      value: "КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, ЖИЛОЙ МАССИВ АҚ-БҰЛАҚ-3 ПЕРЕУЛОК ТАСШОҚЫ ул, дом 3, кв 26",
    },
  ];

  return (
    <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Реквизиты юридического лица (Казахстан)
      </h3>
      <dl className="space-y-3">
        {details.map(({ label, value }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-sm font-medium text-gray-400 sm:w-48 sm:shrink-0">
              {label}
            </dt>
            <dd className="text-sm text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default KazakhstanEntityDetails;
```

- [ ] **Step 2: Build to verify no syntax errors**

Run:

```bash
npm run build
```

Expected: build succeeds (component is not yet used, so it will only catch syntax/import errors).

- [ ] **Step 3: Commit**

```bash
git add src/components/policies/ai-soc1/KazakhstanEntityDetails.jsx
git commit -m "feat(legal-entity): add Kazakhstan entity details component"
```

---

## Task 2: Create the legal entity selector component

**Files:**
- Create: `src/components/policies/ai-soc1/LegalEntitySelector.jsx`
- Test: `npm run build`

**Interfaces:**
- Consumes: `entity` (string, either `"UAE"` or `"KZ"`) and `onEntityChange` (function `(code) => void`).
- Produces: `LegalEntitySelector` — a two-button toggle for UAE/Kazakhstan.

- [ ] **Step 1: Write the component**

Create `src/components/policies/ai-soc1/LegalEntitySelector.jsx` with the exact content below:

```jsx
"use client";

import React from "react";

const ENTITIES = [
  { code: "UAE", label: "UAE" },
  { code: "KZ", label: "Kazakhstan" },
];

const LegalEntitySelector = ({ entity, onEntityChange }) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <span className="text-sm text-gray-400">Contracting entity:</span>
      <div className="inline-flex rounded-full border border-white/15 bg-black/40 p-1">
        {ENTITIES.map((e) => (
          <button
            key={e.code}
            type="button"
            onClick={() => onEntityChange(e.code)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              entity === e.code
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LegalEntitySelector;
```

- [ ] **Step 2: Build to verify**

Run:

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/policies/ai-soc1/LegalEntitySelector.jsx
git commit -m "feat(legal-entity): add UAE/Kazakhstan selector component"
```

---

## Task 3: Extract English terms into a reusable component and add selector slot to both terms components

**Files:**
- Create: `src/components/policies/ai-soc1/TermsOfUseEn.jsx`
- Modify: `src/app/policies/ai-soc1/terms_of_use/page.jsx`
- Modify: `src/components/policies/ru/ai-soc1/TermsOfUse.jsx`
- Test: `npm run build`

**Interfaces:**
- Consumes: `selector` (React node) — rendered after the page title and before the terms sections.
- Produces: `TermsOfUseEn` and `RuAiSocTermsOfUse` both accept a `selector` prop.

- [ ] **Step 1: Create the English terms component**

Create `src/components/policies/ai-soc1/TermsOfUseEn.jsx` by copying the entire content of `src/app/policies/ai-soc1/terms_of_use/page.jsx` into it, then make two changes:

1. Rename the component from `TermsOfUse` to `TermsOfUseEn` and accept a `selector` prop:

Old:

```jsx
const TermsOfUse = () => {
```

New:

```jsx
const TermsOfUseEn = ({ selector }) => {
```

Also update the export at the bottom of the file:

Old:

```jsx
export default TermsOfUse;
```

New:

```jsx
export default TermsOfUseEn;
```

2. Render `{selector}` after the subtitle and before the first section. Find this block:

```jsx
        <main className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">AI-SOC 1 Policy</h1>
          <h2 className="text-2xl text-gray-400 mb-8">Terms of Use</h2>
          <div className="space-y-8">
```

Replace it with:

```jsx
        <main className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">AI-SOC 1 Policy</h1>
          <h2 className="text-2xl text-gray-400 mb-8">Terms of Use</h2>
          {selector}
          <div className="space-y-8">
```

- [ ] **Step 2: Update the original English page to use the new component**

Replace the entire contents of `src/app/policies/ai-soc1/terms_of_use/page.jsx` with:

```jsx
"use client";

import TermsOfUseEn from "@/components/policies/ai-soc1/TermsOfUseEn";

export default function TermsOfUse() {
  return <TermsOfUseEn />;
}
```

- [ ] **Step 3: Update the Russian Terms of Use component**

In `src/components/policies/ru/ai-soc1/TermsOfUse.jsx`:

1. Change the component signature to accept `selector`:

Old:

```jsx
const RuAiSocTermsOfUse = () => {
```

New:

```jsx
const RuAiSocTermsOfUse = ({ selector }) => {
```

2. Render `{selector}` after the subtitle and before the first section. Find this block:

```jsx
          <main className="flex-grow">
            <h1 className="text-4xl font-bold mb-2">Политика AI-SOC 1</h1>
            <h2 className="text-2xl text-gray-400 mb-8">Условия использования</h2>
            <div className="space-y-8">
```

Replace it with:

```jsx
          <main className="flex-grow">
            <h1 className="text-4xl font-bold mb-2">Политика AI-SOC 1</h1>
            <h2 className="text-2xl text-gray-400 mb-8">Условия использования</h2>
            {selector}
            <div className="space-y-8">
```

- [ ] **Step 4: Build to verify**

Run:

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/policies/ai-soc1/TermsOfUseEn.jsx src/app/policies/ai-soc1/terms_of_use/page.jsx src/components/policies/ru/ai-soc1/TermsOfUse.jsx
git commit -m "feat(legal-entity): extract English terms and accept selector slot"
```

---

## Task 4: Create the client wrapper that wires selector and entity switching

**Files:**
- Create: `src/components/policies/ai-soc1/TermsOfUseWithEntity.jsx`
- Test: `npm run build`

**Interfaces:**
- Consumes: `locale` (string) from the server page; `TermsOfUseEn` from `src/components/policies/ai-soc1/TermsOfUseEn.jsx`; `RuPage` (default export from `src/components/policies/ru/ai-soc1/TermsOfUse.jsx`); `LegalEntitySelector`; `KazakhstanEntityDetails`.
- Produces: `TermsOfUseWithEntity` — client component that renders the entity selector and the appropriate terms page.

- [ ] **Step 1: Write the wrapper**

Create `src/components/policies/ai-soc1/TermsOfUseWithEntity.jsx` with the exact content below:

```jsx
"use client";

import React, { useState } from "react";
import TermsOfUseEn from "./TermsOfUseEn";
import RuPage from "@/components/policies/ru/ai-soc1/TermsOfUse.jsx";
import LegalEntitySelector from "./LegalEntitySelector";
import KazakhstanEntityDetails from "./KazakhstanEntityDetails";

const DEFAULT_ENTITY = "UAE";

const TermsOfUseWithEntity = ({ locale }) => {
  const [entity, setEntity] = useState(locale === "ru" ? "KZ" : DEFAULT_ENTITY);

  const selector = (
    <LegalEntitySelector entity={entity} onEntityChange={setEntity} />
  );

  if (entity === "KZ") {
    return (
      <RuPage
        selector={
          <>
            {selector}
            <KazakhstanEntityDetails />
          </>
        }
      />
    );
  }

  return <TermsOfUseEn selector={selector} />;
};

export default TermsOfUseWithEntity;
```

- [ ] **Step 2: Build to verify**

Run:

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/policies/ai-soc1/TermsOfUseWithEntity.jsx
git commit -m "feat(legal-entity): add client wrapper for AI-SOC entity switching"
```

---

## Task 5: Update the localized route to use the wrapper

**Files:**
- Modify: `src/app/[locale]/policies/ai-soc1/terms_of_use/page.jsx`
- Test: `npm run build` + manual page check

**Interfaces:**
- Consumes: `TermsOfUseWithEntity` from `src/components/policies/ai-soc1/TermsOfUseWithEntity.jsx`.
- Produces: The localized route now renders the entity-aware wrapper instead of directly choosing between EnPage and RuPage.

- [ ] **Step 1: Replace the route page content**

Replace the entire contents of `src/app/[locale]/policies/ai-soc1/terms_of_use/page.jsx` with:

```jsx
import TermsOfUseWithEntity from "@/components/policies/ai-soc1/TermsOfUseWithEntity";

export default async function LocalizedPage({ params }) {
  const { locale } = await params;
  return <TermsOfUseWithEntity locale={locale} />;
}
```

- [ ] **Step 2: Build to verify**

Run:

```bash
npm run build
```

Expected: build succeeds and all static pages are generated.

- [ ] **Step 3: Manual check**

Start the dev server and open the AI-SOC Terms of Use page:

```bash
npm run dev
```

Verify:
1. Default entity is UAE and English terms are shown.
2. Switching to Kazakhstan shows Russian terms and the Kazakhstan legal entity details block.
3. Switching back to UAE shows English terms again.
4. For `/ru/.../terms_of_use`, the default entity is Kazakhstan and Russian terms are shown.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/policies/ai-soc1/terms_of_use/page.jsx
git commit -m "feat(legal-entity): wire AI-SOC Terms of Use route to entity wrapper"
```

---

## Task 6: Final verification

**Files:**
- N/A (whole page).
- Test: `npm run build`.

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build succeeds and all static pages are generated.

- [ ] **Step 2: Commit any final fixes**

If any fixes were made during manual verification, commit them.

```bash
git add -A
git commit -m "chore(legal-entity): final verification for AI-SOC entity selector"
```

---

## Plan self-review

- **Spec coverage:**
  - Selector UI → Tasks 2 and 4.
  - Kazakhstan details → Tasks 1 and 4.
  - Entity switching (UAE/English, Kazakhstan/Russian) → Tasks 3, 4, 5.
  - Default by locale → Task 4.
  - Scope limited to AI-SOC Terms of Use → all tasks touch only the relevant files.
- **Placeholder scan:** no TBD/TODO/fuzzy language; all code blocks are complete.
- **Type consistency:** `entity` is always `"UAE"` or `"KZ"`; `selector` is always a React node; `locale` is a string passed from the server page.

Plan saved to `docs/superpowers/plans/2026-07-30-ai-soc-legal-entity-selector.md`.
