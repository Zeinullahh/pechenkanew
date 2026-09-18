# Design: Merge Home + AI-SOC Pages and Split AI-SOC Policies into Web/Email

**Project:** Silence AI marketing website (Next.js, static export, no backend)
**Date:** 2026-08-10

## 1. Goals

1. **Merge the homepage (`/`) and the AI-SOC 1 product page (`/en/ai-soc/`)** so the main landing page contains the AI-SOC content and the separate `/ai-soc` route becomes unnecessary.
2. **Split the unified AI-SOC 1 legal policies** into two independent sets: one for the **Web Security** component and one for the **Email Security** component.

## 2. Non-goals

- No backend or API changes.
- No changes to Supreme, Affiliate, Sithub, or general site-wide policies, except updating footer links where they reference AI-SOC 1 policies.
- No new design language; reuse existing components, styles, and i18n keys.
- No new translations; keep existing copy and split it between the two policy sets.

## 3. Current state

- Homepage: `src/app/[locale]/page.jsx` renders `HomeLanding.jsx` (hero + systems card + compliance + partners + resources + FloatingText).
- AI-SOC page: `src/app/[locale]/ai-soc/page.jsx` renders `AiSocLanding.jsx` (hero + video + pricing + Why AI-SOC + comparison tables + platform overview + FAQ + FloatingText).
- AI-SOC 1 policies currently live at `/policies/ai-soc1/*` and are unified (Terms of Use, Terms of Service, Privacy, Cookies). Email-specific variants already exist in Russian only (`privacy_email`, `cookies_email`, `terms_of_use_email`).
- Footer links to AI-SOC 1 policies under `/policies/terms_of_use`, `/policies/terms_of_service`, `/policies/privacy`.

## 4. Proposed approaches and recommendation

### 4.1 Homepage merge

| Option | Description | Trade-offs |
|--------|-------------|------------|
| A | Render `AiSocLanding` content inside `HomeLanding` below the existing home sections. Keep both URLs alive. | Duplicate content, SEO dilution, but zero breakage. |
| B | Replace the homepage with `AiSocLanding` entirely and redirect `/ai-soc` to `/`. | Fastest, but loses the homepage hero wording and the compliance/partners/resources block. |
| **C (recommended)** | Build a combined homepage in `HomeLanding.jsx` that keeps the home hero, systems card, compliance, partners, and resources, then appends the AI-SOC video, pricing, Why AI-SOC, comparison tables, platform overview, and FAQ. Redirect `/ai-soc` to `/`. | Preserves all existing home content while making the homepage the single AI-SOC destination. |

### 4.2 Policy split

| Option | Description | Trade-offs |
|--------|-------------|------------|
| A | Add `/policies/ai-soc1/web/*` and `/policies/ai-soc1/email/*` routes and leave the old unified routes unchanged. | Old unified policies remain, contradicting the request to “divide” them. |
| **B (recommended)** | Create new `/policies/ai-soc1/web/*` and `/policies/ai-soc1/email/*` routes for all four policy types (terms_of_use, terms_of_service, privacy, cookies) in both English and Russian, and remove the old unified `/policies/ai-soc1/*` routes and `_email` routes. Update the footer to link to the new web/email sets. | Clean separation, no ambiguous unified policies, matches the request exactly. |

## 5. Detailed design

### 5.1 Homepage merge

- Modify `src/components/HomeLanding.jsx` to import the AI-SOC sections from `AiSocLanding.jsx` (or move them into shared components) and render them after the existing home sections and before the final `FloatingText`.
- Add an explicit `id` to the pricing section so the header CTA can scroll to it if needed.
- Remove `src/app/[locale]/ai-soc/page.jsx` and add a redirect in `next.config.mjs` (or keep a thin page that calls `redirect('/')`) so `/ai-soc` and `/[locale]/ai-soc` go to `/[locale]/`.
- Update `Header.jsx` systems dropdown: the AI-SOC link now points to `/` (or keep `/ai-soc` which redirects to `/`).
- Update `Footer.jsx` if it references `/ai-soc`.

### 5.2 Policy split

New route tree (also mirrored under `src/app/policies/ai-soc1/...` for non-localized URLs):

```
src/app/[locale]/policies/ai-soc1/
  web/
    terms_of_use/page.jsx
    terms_of_service/page.jsx
    privacy/page.jsx
    cookies/page.jsx
  email/
    terms_of_use/page.jsx
    terms_of_service/page.jsx
    privacy/page.jsx
    cookies/page.jsx
```

Component tree:

```
src/components/policies/ai-soc1/
  web/
    TermsOfUseEn.jsx
    TermsOfServiceEn.jsx
    PrivacyEn.jsx
    CookiesEn.jsx
  email/
    TermsOfUseEn.jsx
    TermsOfServiceEn.jsx
    PrivacyEn.jsx
    CookiesEn.jsx
  shared/
    LegalEntitySelector.jsx (existing, reused)
    KazakhstanEntityDetails.jsx (existing, reused)
    PolicyLayout.jsx (wrapper for header/sidebar/footer/modal)

src/components/policies/ru/ai-soc1/
  web/
    TermsOfUse.jsx
    TermsOfService.jsx
    Privacy.jsx
    Cookies.jsx
  email/
    TermsOfUse.jsx (move from current TermsOfUseEmail.jsx)
    TermsOfService.jsx (derive from current TermsOfService.jsx, email-only)
    Privacy.jsx (move from current PrivacyEmail.jsx)
    Cookies.jsx (move from current CookiesEmail.jsx)
```

Content split rules:
- **Web policies** contain only the Web Security & Traffic Management terms (WAF, DDoS, Agent, CMC, IP management, web logs, web-only SLAs, etc.).
- **Email policies** contain only the Email Security & Visualization terms (Webmail Client, SPF/DKIM/DMARC, five-layer email analysis, folder classification, email SLAs, human-access prohibition, etc.).
- Common boilerplate (acceptance, age, IP rights, liability, termination, governing law, contact) is duplicated into each standalone document.
- The old unified `TermsOfUseEn.jsx`, `TermsOfService.jsx`, `Privacy.jsx`, `Cookies.jsx` (Russian general) under `ai-soc1/` are removed or replaced by web/email versions.

### 5.3 Footer update

- Replace the single AI-SOC 1 policy group in the footer with two groups:
  - **AI-SOC 1 Web:** Terms of Use, Terms of Service, Privacy, Cookies
  - **AI-SOC 1 Email:** Terms of Use, Terms of Service, Privacy, Cookies
- Link them to `/policies/ai-soc1/web/...` and `/policies/ai-soc1/email/...`.

## 6. Assumptions

- The English email policies do not exist yet; they will be derived from the existing unified English `TermsOfUseEn.jsx` and the Russian email components.
- The existing Russian email components (`TermsOfUseEmail`, `PrivacyEmail`, `CookiesEmail`) are the source for the new email policy set.
- The old unified `/policies/ai-soc1/*` routes can be removed because the site is a static marketing site and internal links are fully controlled.
- `next.config.mjs` supports Next.js redirects for static export; if not, a thin redirect page will be used instead.

## 7. Risks

- **Content length:** splitting the documents will create four long policy pages per language. This is acceptable because the existing pages are already long and static.
- **Internal links:** any hard-coded links to old `/policies/ai-soc1/terms_of_use` etc. in copy or components need to be updated. A search will be performed before removing routes.
- **Brand transform:** The root layout replaces “Silence AI” with “Silence” in locale strings except on policy/term paths. New policy paths must continue to contain a policy keyword so the transform is skipped.

## 8. Success criteria

- `npm run build` succeeds and produces no 404s for the new routes.
- The homepage renders all home + AI-SOC sections without layout errors.
- `/ai-soc` redirects to `/` (or the locale-specific homepage).
- Footer links to both AI-SOC 1 Web and AI-SOC 1 Email policy sets.
- No route still serves a unified AI-SOC 1 policy.
