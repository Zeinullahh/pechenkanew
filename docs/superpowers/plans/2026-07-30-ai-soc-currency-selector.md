# AI-SOC Currency Selector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a USD/KZT/EUR currency selector to the AI-SOC pricing page so the selected currency is the only one displayed.

**Architecture:** State lives in `AiSocLanding.jsx` and is passed to `Pricing.jsx`. A new `src/lib/currency.js` module holds exchange rates, the currency list, and conversion/formatting helpers. `CurrencySelector.jsx` becomes a controlled dropdown driven by the currency list. `Pricing.jsx` converts all base USD prices and formats them for the active currency.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, `country-flag-icons/react/3x2`.

## Global Constraints

- Static Next.js export; no backend or API calls for exchange rates.
- Exchange rates are hardcoded constants and updated by editing `src/lib/currency.js`.
- USD is the base currency; KZT and EUR prices are derived from USD amounts.
- Default currency is USD.
- Unknown/missing currency code must fallback to USD.
- Keep changes scoped to the AI-SOC page; do not break the custom-project pricing section (`PricingSection.jsx`).

---

## Task 1: Create the shared currency module

**Files:**
- Create: `src/lib/currency.js`
- Test: run a small Node script to verify conversion/formatting.

**Interfaces:**
- Produces: `EXCHANGE_RATES`, `CURRENCIES`, `DEFAULT_CURRENCY`, `convertPrice(priceInUSD, currencyCode)`, `formatPrice(price, currencyCode)`.

- [ ] **Step 1: Write `src/lib/currency.js`**

```js
export const EXCHANGE_RATES = {
  USD: 1,
  KZT: 500,
  EUR: 0.92,
};

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD", flagCode: "US" },
  { code: "KZT", symbol: "₸", label: "KZT", flagCode: "KZ" },
  { code: "EUR", symbol: "€", label: "EUR", flagCode: "EU" },
];

export const DEFAULT_CURRENCY = "USD";

export const convertPrice = (priceInUSD, currencyCode) => {
  const rate = EXCHANGE_RATES[currencyCode];
  if (!rate) return priceInUSD;
  return priceInUSD * rate;
};

export const formatPrice = (price, currencyCode) => {
  const curr = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  if (curr.code === "KZT") {
    const rounded = Math.round(price);
    return `${rounded.toLocaleString("ru-RU")} ${curr.symbol}`;
  }
  return `${curr.symbol}${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
```

- [ ] **Step 2: Test the module with Node**

Run:

```bash
node --input-type=module -e "import { convertPrice, formatPrice } from './src/lib/currency.js'; console.log('USD:', formatPrice(convertPrice(7.30, 'USD'), 'USD')); console.log('KZT:', formatPrice(convertPrice(7.30, 'KZT'), 'KZT')); console.log('EUR:', formatPrice(convertPrice(7.30, 'EUR'), 'EUR'));"
```

Expected output (values may vary by locale, but all three lines must print and look correct):

```
USD: $7.30
KZT: 3 650 ₸
EUR: €6.72
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/currency.js
git commit -m "feat(currency): add central currency module with USD/KZT/EUR rates"
```

---

## Task 2: Make `CurrencySelector` use the shared currency list

**Files:**
- Modify: `src/components/CurrencySelector.jsx`
- Test: `npm run build`

**Interfaces:**
- Consumes: `CURRENCIES` from `src/lib/currency.js`.
- Produces: `CurrencySelector` now renders USD, KZT, and EUR options.

- [ ] **Step 1: Replace the local currency list and helpers**

In `src/components/CurrencySelector.jsx`, remove the local `CURRENCIES`, `convertPrice`, and `formatPrice` definitions, and import from the new module.

Old top of file:

```jsx
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import * as Flags from "country-flag-icons/react/3x2";

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD", flagCode: "US" },
];

export const convertPrice = (priceInUSD, currency) => {
  return priceInUSD;
};

export const formatPrice = (price, currency) => {
  const curr = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  if (currency === "KZT") {
    return `${price.toLocaleString()} ${curr.symbol}`;
  }
  return `${curr.symbol}${price.toLocaleString()}`;
};
```

New top of file:

```jsx
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import * as Flags from "country-flag-icons/react/3x2";
import { CURRENCIES } from "@/lib/currency";
```

- [ ] **Step 2: Build to verify no imports are broken**

Run:

```bash
npm run build
```

Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/CurrencySelector.jsx
git commit -m "feat(currency-selector): wire selector to shared currency list"
```

---

## Task 3: Add currency state to the AI-SOC landing page

**Files:**
- Modify: `src/components/AiSocLanding.jsx`
- Test: `npm run build`

**Interfaces:**
- Consumes: `CurrencySelector` (already accepts `currency` and `onCurrencyChange` props).
- Produces: `currency` state and `setCurrency` passed to `<Pricing />`.

- [ ] **Step 1: Add `useState` and currency state**

In `src/components/AiSocLanding.jsx`, import `useState` and add the currency state near the existing modal state.

Old import:

```jsx
import React, { useEffect, useRef, useState } from 'react';
```

Add the `DEFAULT_CURRENCY` import:

```jsx
import { DEFAULT_CURRENCY } from '@/lib/currency';
```

Add state after modal state:

```jsx
const [isModalOpen, setIsModalOpen] = useState(false);
const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
```

- [ ] **Step 2: Pass the state into `Pricing`**

Find the existing `<Pricing onOpenModal={openModal} />` call and add the currency props:

```jsx
<Pricing
  currency={currency}
  onCurrencyChange={setCurrency}
  onOpenModal={openModal}
/>
```

- [ ] **Step 3: Build to verify no errors**

Run:

```bash
npm run build
```

Expected: build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/AiSocLanding.jsx
git commit -m "feat(ai-soc): lift currency state into AiSocLanding"
```

---

## Task 4: Update `Pricing.jsx` to render prices in the selected currency

**Files:**
- Modify: `src/components/Pricing.jsx`
- Test: `npm run build` and manual visual check on `/ai-soc` page.

**Interfaces:**
- Consumes: `currency` and `onCurrencyChange` props; `convertPrice`, `formatPrice`, `CURRENCIES`, `DEFAULT_CURRENCY` from `src/lib/currency`; `CurrencySelector` from `src/components/CurrencySelector.jsx`.
- Produces: All AI-SOC pricing displayed in the selected currency only; the currency selector appears next to the billing toggle.

- [ ] **Step 1: Update imports**

Replace the old KZT import and add the new currency helpers and selector:

Old:

```jsx
import { formatKzt } from "@/lib/kzt";
```

New:

```jsx
import { convertPrice, formatPrice } from "@/lib/currency";
import CurrencySelector from "./CurrencySelector";
```

- [ ] **Step 2: Accept the new props in `Pricing`**

Old:

```jsx
const Pricing = ({ onOpenModal }) => {
```

New:

```jsx
const Pricing = ({ currency, onCurrencyChange, onOpenModal }) => {
```

- [ ] **Step 3: Replace `getPriceDisplay` to use the selected currency**

Old function:

```jsx
const getPriceDisplay = (planId) => {
  const priceData = PRICING_DATA.business[planId];

  if (!priceData) return contactSupportLabel;

  const price = billing === "yearly" ? priceData.yearly : priceData.monthly;

  return (
    <span className="flex flex-col">
      <span>{`$${price.toFixed(2)}${priceData.unit}`}</span>
      <span className="text-sm text-gray-400 font-normal">
        {formatKzt(price)}{priceData.unit}
      </span>
    </span>
  );
};
```

New function:

```jsx
const getPriceDisplay = (planId) => {
  const priceData = PRICING_DATA.business[planId];

  if (!priceData) return contactSupportLabel;

  const price = billing === "yearly" ? priceData.yearly : priceData.monthly;
  const converted = convertPrice(price, currency);

  return (
    <span>
      {formatPrice(converted, currency)}{priceData.unit}
    </span>
  );
};
```

- [ ] **Step 4: Add the currency selector to the billing toggle row**

Old controls wrapper:

```jsx
<div className="flex justify-center items-center mb-12 relative z-20">
    <div className="flex items-center gap-12">
```

New controls wrapper:

```jsx
<div className="flex justify-center items-center gap-4 sm:gap-6 mb-12 relative z-20">
    <div className="flex items-center gap-12">
```

Close the billing toggle `</div>` and add the selector right after it, before the outer `</div>`:

```jsx
    <CurrencySelector
      currency={currency}
      onCurrencyChange={onCurrencyChange}
      align="right"
    />
  </div>
```

Resulting block should look like:

```jsx
<div className="flex justify-center items-center gap-4 sm:gap-6 mb-12 relative z-20">
  <div className="flex items-center gap-12">
    <button onClick={() => setBilling("yearly")} ...>
      ...
    </button>
    <button onClick={() => setBilling("monthly")} ...>
      ...
    </button>
  </div>
  <CurrencySelector
    currency={currency}
    onCurrencyChange={onCurrencyChange}
    align="right"
  />
</div>
```

- [ ] **Step 5: Replace web-security pay-as-you-go prices with the selected currency**

In the `productType === "web"` branch, replace the hardcoded USD/KZT blocks.

Old main price block:

```jsx
<div className="flex items-baseline gap-2 mb-2">
  <span className="text-3xl sm:text-4xl font-bold text-white">${billing === "yearly" ? "220" : "20"}</span>
  <span className="text-lg text-gray-400 font-normal">/{billing === "yearly" ? "year" : "month"}</span>
</div>
<span className="text-sm text-gray-400 -mt-1 mb-2">
  {formatKzt(billing === "yearly" ? 220 : 20)}/{billing === "yearly" ? "year" : "month"}
</span>
```

New main price block (compute the value once for readability):

```jsx
{(() => {
  const webBasePrice = billing === "yearly" ? 220 : 20;
  return (
    <>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl sm:text-4xl font-bold text-white">
          {formatPrice(convertPrice(webBasePrice, currency), currency)}
        </span>
        <span className="text-lg text-gray-400 font-normal">/{billing === "yearly" ? "year" : "month"}</span>
      </div>
    </>
  );
})()}
```

Old pay-as-you-go rows:

```jsx
<div className="flex flex-col">
  <span className="text-lg text-white font-semibold">$0.18</span>
  <span className="text-[10px] text-gray-400 uppercase tracking-tight">per GB · {formatKzt(0.18)}</span>
</div>
<div className="flex flex-col">
  <span className="text-lg text-white font-semibold">$1.20</span>
  <span className="text-[10px] text-gray-400 uppercase tracking-tight">per 1M requests · {formatKzt(1.2)}</span>
</div>
```

New pay-as-you-go rows:

```jsx
<div className="flex flex-col">
  <span className="text-lg text-white font-semibold">{formatPrice(convertPrice(0.18, currency), currency)}</span>
  <span className="text-[10px] text-gray-400 uppercase tracking-tight">per GB</span>
</div>
<div className="flex flex-col">
  <span className="text-lg text-white font-semibold">{formatPrice(convertPrice(1.2, currency), currency)}</span>
  <span className="text-[10px] text-gray-400 uppercase tracking-tight">per 1M requests</span>
</div>
```

- [ ] **Step 6: Build and verify**

Run:

```bash
npm run build
```

Expected: build completes without errors.

Then start the dev server and open the AI-SOC page to manually switch between USD, KZT, and EUR and confirm prices update.

```bash
npm run dev
```

- [ ] **Step 7: Commit**

```bash
git add src/components/Pricing.jsx
git commit -m "feat(ai-soc): render pricing in selected currency and add selector"
```

---

## Task 5: Deprecate `src/lib/kzt.js` without breaking `PricingSection.jsx`

**Files:**
- Modify: `src/lib/kzt.js`
- Test: `npm run build`

**Interfaces:**
- Consumes: `convertPrice` and `formatPrice` from `src/lib/currency.js`.
- Produces: `formatKzt` still works for `PricingSection.jsx` (out of scope, but must not break).

- [ ] **Step 1: Replace the body of `src/lib/kzt.js` with a re-export wrapper**

Replace the entire file contents with:

```js
// Deprecated: prefer `src/lib/currency.js`.
// Kept as a thin shim so existing PricingSection imports keep working.
import { convertPrice, formatPrice } from "./currency";

export const KZT_RATE = 500;

export const formatKzt = (usdAmount) => {
  const kzt = convertPrice(usdAmount, "KZT");
  return formatPrice(kzt, "KZT");
};
```

- [ ] **Step 2: Build to verify no breakages**

Run:

```bash
npm run build
```

Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/kzt.js
git commit -m "refactor(currency): make kzt.js a thin shim over currency module"
```

---

## Task 6: Final verification

**Files:**
- N/A (whole page).
- Test: manual browser verification + `npm run build`.

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build succeeds and `out/` directory is generated.

- [ ] **Step 2: Manual browser check**

1. Start the dev server: `npm run dev`.
2. Navigate to the AI-SOC page.
3. Confirm the default price is USD.
4. Switch to KZT and verify prices increase roughly 500x.
5. Switch to EUR and verify prices change.
6. Confirm the selector UI matches the existing billing toggle styling.

- [ ] **Step 3: Final commit if any changes were made during verification**

```bash
git add -A
git commit -m "chore(ai-soc): verify currency selector build and UI"
```

---

## Plan self-review

- **Spec coverage:** every section maps to a task:
  - currency module & rates → Task 1
  - selector UI → Task 2 + Task 4
  - state lifting → Task 3
  - single-currency display → Task 4
  - kzt.js deprecation → Task 5
  - verification → Task 6
- **Placeholder scan:** no TBD/TODO/fuzzy language; all code blocks contain exact code.
- **Type consistency:** `currency` is a string code (`"USD"`, `"KZT"`, `"EUR"`), used consistently across props and helper functions.

Plan saved to `docs/superpowers/plans/2026-07-30-ai-soc-currency-selector.md`.
