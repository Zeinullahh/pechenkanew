# AI-SOC Terms of Use — Legal Entity Selector Design

Date: 2026-07-30
Status: Approved (Approach A)

## 1. Goal

Add a legal entity selector to the AI-SOC Terms of Use page so visitors can choose the contracting entity (UAE or Kazakhstan). The selected entity determines which terms content and legal entity details are displayed.

## 2. Scope

- In scope: the AI-SOC Terms of Use page (`/policies/ai-soc1/terms_of_use` and its localized variants).
- Out of scope: AI-SOC Terms of Service, Privacy, Cookies, Supreme/Sithub policies, and other pages.

## 3. User-facing behavior

- A selector appears at the top of the AI-SOC Terms of Use page, near the title.
- Two choices: **UAE** and **Kazakhstan**.
- Default selection: **UAE**.
- Selecting **UAE** shows the existing English/localized Terms of Use content.
- Selecting **Kazakhstan** shows the existing Russian Terms of Use content and a dedicated Kazakhstan legal entity details section.
- The choice is a client-side state (no URL routing or backend).

## 4. Architecture

```text
src/app/[locale]/policies/ai-soc1/terms_of_use/page.jsx
        │
        ├──▶ LegalEntitySelector (controlled component)
        │         └─ switches entity state
        └──▶ renders one of:
                  - UAE → existing English/localized Terms of Use
                  - KZ  → RuAiSocTermsOfUse + KazakhstanEntityDetails
```

## 5. Files changed

| File | Change |
| --- | --- |
| `src/app/[locale]/policies/ai-soc1/terms_of_use/page.jsx` | Add entity state, render selector, and conditionally render UAE or Kazakhstan content. |
| `src/components/policies/ai-soc1/LegalEntitySelector.jsx` | New controlled selector component for UAE/Kazakhstan. |
| `src/components/policies/ai-soc1/KazakhstanEntityDetails.jsx` | New component displaying the Kazakhstan legal entity details. |
| `src/components/policies/ru/ai-soc1/TermsOfUse.jsx` | Optionally accept a `beforeContent` slot so the entity details can be inserted before the terms sections. |

## 6. Data

Kazakhstan legal entity details (Russian):

- ИИК (номер счета): `KZ8996503F0015440498KZT`
- БИК Банка: `IRTYKZKA`
- Наименование филиала: `Филиал АО "ForteBank" в г. Астана`
- КБе: `17`
- БИН: `250840004804`
- Адрес компании: `КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, ЖИЛОЙ МАССИВ АҚ-БҰЛАҚ-3 ПЕРЕУЛОК ТАСШОҚЫ ул, дом 3, кв 26`

## 7. UI placement

- The selector is placed between the page title/subtitle and the first section.
- The Kazakhstan legal entity details are rendered in a highlighted block immediately after the selector, before the Russian terms sections.
- No sidebar changes are required.

## 8. Language handling

- UAE entity: use the existing English/localized Terms of Use component. The page already follows the current locale routing.
- Kazakhstan entity: always render the Russian Terms of Use component regardless of the URL locale. The Kazakhstan legal entity details are shown in Russian.

## 9. Fallbacks and edge cases

- Unknown entity code defaults to UAE.
- Selector state resets to default on full page reload (no persistence required).
- No external data or API calls.

## 10. Verification

- Run `npm run build` without errors.
- Open the AI-SOC Terms of Use page and confirm:
  - Default is UAE and shows English terms.
  - Switching to Kazakhstan shows Russian terms and the legal entity details block.
  - Switching back to UAE shows English terms again.
