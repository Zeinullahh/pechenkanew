# AI-SOC Currency Selector Design

Date: 2026-07-30
Status: Approved

## 1. Goal

Add a currency selector to the AI-SOC pricing page so visitors can view prices in USD, KZT, or EUR. The selected currency is the only currency shown — removing the current fixed USD-main + KZT-secondary layout.

## 2. Scope

- In scope: AI-SOC pricing block (`Pricing.jsx`) on the AI-SOC landing page.
- Out of scope: custom-project pricing (`PricingSection.jsx`), other landing pages, and any backend work.

## 3. User-facing behavior

- A dropdown selector appears next to the existing Yearly / Monthly billing toggle.
- Choices: USD ($), KZT (₸), EUR (€).
- Selecting a currency instantly updates every price on the AI-SOC page, including plan prices and pay-as-you-go rates.
- Default currency: USD.

## 4. Architecture

```text
AiSocLanding (currency state)
        │
        └──▶ Pricing.jsx (props: currency, onCurrencyChange)
                 │
                 ├──▶ CurrencySelector (controlled dropdown)
                 └──▶ formatPrice(convertPrice(priceUSD, currency), currency)
```

## 5. Files changed

| File | Change |
| --- | --- |
| `src/lib/currency.js` | New module: currency list, hardcoded USD exchange rates, `convertPrice`, `formatPrice`. |
| `src/components/CurrencySelector.jsx` | Extend `CURRENCIES` to include KZT and EUR; keep the existing dropdown UI. |
| `src/components/AiSocLanding.jsx` | Add `currency` state and `onCurrencyChange`; pass both to `<Pricing />`. |
| `src/components/Pricing.jsx` | Accept currency props, render `CurrencySelector`, convert/format all prices. |
| `src/lib/kzt.js` | Delete or deprecate; logic moved to `src/lib/currency.js`. |

## 6. Data flow

1. `AiSocLanding` initializes `currency` to `"USD"`.
2. `Pricing` receives `currency` and `onCurrencyChange` props and renders `CurrencySelector`.
3. User picks a currency in `CurrencySelector` → calls `onCurrencyChange(code)`.
4. `AiSocLanding` updates state → re-renders `Pricing` with the new currency.
5. `Pricing` converts base USD prices with `convertPrice(priceUSD, currency)` and formats with `formatPrice(..., currency)`.

## 7. Currency module API

```js
export const EXCHANGE_RATES = {
  USD: 1,
  KZT: 500,      // 1 USD = 500 KZT
  EUR: 0.92,     // 1 USD = 0.92 EUR (update as market changes)
};

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD", flagCode: "US" },
  { code: "KZT", symbol: "₸", label: "KZT", flagCode: "KZ" },
  { code: "EUR", symbol: "€", label: "EUR", flagCode: "EU" },
];

export function convertPrice(priceUSD, currencyCode);
export function formatPrice(price, currencyCode);
```

## 8. UI placement

The selector is placed in the same control row as the Yearly / Monthly toggle, aligned to the right or center depending on responsive layout. Flags are rendered with the existing `country-flag-icons/react/3x2` package; if the EU flag icon is not available, the dropdown falls back to showing the `EUR` label badge.

## 9. Fallbacks and edge cases

- Unknown currency code → fallback to USD.
- Missing rate for a currency → fallback to USD.
- No external API calls; no network failure state to handle.

## 10. Verification

- Run `npm run build` without errors.
- Open the AI-SOC page and switch between USD, KZT, and EUR; confirm all prices update correctly and formatting is consistent.
- Verify the default state is USD and no console errors appear.

## 11. Notes

- Exchange rates are intentionally hardcoded per user decision. They should be updated in `src/lib/currency.js` whenever the site is rebuilt or market rates change significantly.
- No new i18n keys are required because currency labels are universal codes (USD, KZT, EUR).
