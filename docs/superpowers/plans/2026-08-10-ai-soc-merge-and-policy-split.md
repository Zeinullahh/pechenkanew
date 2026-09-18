# AI-SOC Homepage Merge and Policy Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the Silence AI homepage with the AI-SOC 1 product page, and split the unified AI-SOC 1 policies into independent Web and Email policy sets (English + Russian).

**Architecture:** Keep the existing Next.js App Router static-export structure. Extend `HomeLanding.jsx` to render the AI-SOC sections inline so the homepage becomes the AI-SOC landing page. Redirect the old `/ai-soc` route to `/`. Replace the old `/policies/ai-soc1/*` unified policy tree with `/policies/ai-soc1/web/*` and `/policies/ai-soc1/email/*` trees, each containing four policy pages. Reuse the existing policy layout (header, sidebar, modal, back-to-top) by wrapping each new component in a shared `PolicyLayout`. Update the footer to expose both policy groups.

**Tech Stack:** Next.js 14+ (App Router, static export), React, Tailwind CSS, next-intl, JSX.

## Global Constraints

- No backend changes.
- Preserve existing styling and component behavior.
- Keep all copy in English and Russian only; reuse existing wording.
- New policy paths must contain the word `policies` or `terms` so the root-layout brand transform does not replace “Silence AI” with “Silence” in policy copy.
- `npm run build` must succeed with zero errors and produce the new routes.
- All old unified AI-SOC 1 policy routes are removed after their web/email replacements are live.
- Old `/ai-soc` page is replaced by a redirect to `/` (locale-aware).

---

## File Structure

New/modified files:

```
src/components/HomeLanding.jsx                         (modified - merged homepage)
src/components/Header.jsx                              (modified - AI-SOC link to /)
src/components/Footer.jsx                              (modified - two policy groups)

next.config.mjs                                        (modified - /ai-soc redirect)

src/app/[locale]/ai-soc/page.jsx                       (deleted)

src/components/policies/shared/PolicyLayout.jsx        (new - wrapper for all policy pages)

src/components/policies/ai-soc1/web/
  TermsOfUseWebEn.jsx                                  (new)
  TermsOfServiceWebEn.jsx                              (new)
  PrivacyWebEn.jsx                                     (new)
  CookiesWebEn.jsx                                     (new)

src/components/policies/ai-soc1/email/
  TermsOfUseEmailEn.jsx                                (new)
  TermsOfServiceEmailEn.jsx                            (new)
  PrivacyEmailEn.jsx                                   (new)
  CookiesEmailEn.jsx                                   (new)

src/components/policies/ru/ai-soc1/web/
  TermsOfUseWeb.jsx                                    (new)
  TermsOfServiceWeb.jsx                                (new)
  PrivacyWeb.jsx                                       (new)
  CookiesWeb.jsx                                       (new)

src/components/policies/ru/ai-soc1/email/
  TermsOfUseEmail.jsx                                  (new - moved from old TermsOfUseEmail.jsx)
  TermsOfServiceEmail.jsx                              (new)
  PrivacyEmail.jsx                                     (new - moved from old PrivacyEmail.jsx)
  CookiesEmail.jsx                                     (new - moved from old CookiesEmail.jsx)

src/app/[locale]/policies/ai-soc1/web/
  terms_of_use/page.jsx
  terms_of_service/page.jsx
  privacy/page.jsx
  cookies/page.jsx

src/app/[locale]/policies/ai-soc1/email/
  terms_of_use/page.jsx
  terms_of_service/page.jsx
  privacy/page.jsx
  cookies/page.jsx

src/app/policies/ai-soc1/web/
  terms_of_use/page.jsx
  terms_of_service/page.jsx
  privacy/page.jsx
  cookies/page.jsx

src/app/policies/ai-soc1/email/
  terms_of_use/page.jsx
  terms_of_service/page.jsx
  privacy/page.jsx
  cookies/page.jsx

# Deleted
src/app/[locale]/policies/ai-soc1/terms_of_use/page.jsx
src/app/[locale]/policies/ai-soc1/terms_of_service/page.jsx
src/app/[locale]/policies/ai-soc1/privacy/page.jsx
src/app/[locale]/policies/ai-soc1/cookies/page.jsx
src/app/[locale]/policies/ai-soc1/privacy_email/page.jsx
src/app/[locale]/policies/ai-soc1/cookies_email/page.jsx
src/app/[locale]/policies/ai-soc1/terms_of_use_email/page.jsx
src/app/policies/ai-soc1/terms_of_use/page.jsx
src/app/policies/ai-soc1/terms_of_service/page.jsx
src/app/policies/ai-soc1/privacy/page.jsx
src/app/policies/ai-soc1/cookies/page.jsx
src/app/policies/ai-soc1/privacy_email/page.jsx
src/app/policies/ai-soc1/cookies_email/page.jsx
src/app/policies/ai-soc1/terms_of_use_email/page.jsx
src/components/policies/ai-soc1/TermsOfUseEn.jsx
src/components/policies/ai-soc1/TermsOfUseWithEntity.jsx
src/components/policies/ru/ai-soc1/TermsOfUse.jsx
src/components/policies/ru/ai-soc1/TermsOfService.jsx
src/components/policies/ru/ai-soc1/Privacy.jsx
src/components/policies/ru/general/Cookies.jsx   (only used by ai-soc1; re-created as web-specific under ru/ai-soc1/web)
```

---

### Task 1: Create shared policy layout wrapper

**Files:**
- Create: `src/components/policies/shared/PolicyLayout.jsx`

**Interfaces:**
- Consumes: `children` (policy body), `title` (string, h1), `subtitle` (string, h2), `sections` (array of `{id, title}` for sidebar)
- Produces: A rendered policy page with header, sticky sidebar, back-to-top button, and modal.

- [ ] **Step 1: Write the shared policy layout component**

Create `src/components/policies/shared/PolicyLayout.jsx` with the following code. It reuses the existing Header, PolicySidebar, BackToTopButton, and Modal components to avoid duplication across all policy pages.

```jsx
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import PolicySidebar from "@/components/PolicySidebar";
import BackToTopButton from "@/components/BackToTopButton";
import Modal from "@/components/Modal";

export default function PolicyLayout({ title, subtitle, children, sections }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-black text-white">
      <Header onOpenModal={openModal} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col md:flex-row gap-8">
        <div className="md:w-80">
          <PolicySidebar sections={sections} />
        </div>
        <main className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {subtitle && <h2 className="text-2xl text-gray-400 mb-8">{subtitle}</h2>}
          <div className="space-y-8">{children}</div>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
```

- [ ] **Step 2: Verify the file is created and syntactically correct**

No test file exists for UI components. Check that the file parses by running the build later in Task 12.

- [ ] **Step 3: Commit**

```bash
git add src/components/policies/shared/PolicyLayout.jsx
git commit -m "feat(policies): add shared PolicyLayout wrapper"
```

---

### Task 2: Merge homepage and AI-SOC landing page

**Files:**
- Modify: `src/components/HomeLanding.jsx`
- Create: `src/components/ai-soc/landing/index.js` (re-export of the AI-SOC sections)
- Modify: `next.config.mjs`
- Delete: `src/app/[locale]/ai-soc/page.jsx`

**Interfaces:**
- Consumes: `AiSocLanding` sections (Pricing, Insights, FaqSection, etc.) and `next.config.mjs` redirect API.
- Produces: A single `HomeLanding` component that renders both home and AI-SOC content; `/ai-soc` redirects to `/`.

- [ ] **Step 1: Extract AI-SOC sections into a reusable module**

Create `src/components/ai-soc/landing/index.js` that re-exports the AI-SOC sections so `HomeLanding` can import them without duplicating code. Do not duplicate the JSX; import the same components `AiSocLanding.jsx` already uses.

```js
export { default as AiSocHero } from "@/components/Hero.jsx";
export { default as AiSocPricing } from "@/components/Pricing.jsx";
export { default as AiSocInsights } from "@/components/Insights.jsx";
export { default as AiSocFaqSection } from "@/components/FaqSection.jsx";
export { default as AiSocGetModal } from "@/components/AiSocGetModal.jsx";
export { StickyScrollSolution } from "@/components/StickyScrollSolution.jsx";
export { FloatingText } from "@/components/FloatingText.jsx";
```

Note: `Hero`, `Pricing`, `Insights`, `FaqSection`, `AiSocGetModal`, `StickyScrollSolution`, and `FloatingText` are already used by `AiSocLanding.jsx` in the same project.

- [ ] **Step 2: Modify HomeLanding.jsx to render the AI-SOC sections**

Open `src/components/HomeLanding.jsx`. Add the following imports at the top of the file, after the existing imports:

```jsx
import {
  AiSocHero,
  AiSocPricing,
  AiSocInsights,
  AiSocFaqSection,
  AiSocGetModal,
  StickyScrollSolution,
} from "@/components/ai-soc/landing";
import { Spotlights } from "@/components/Spotlights";
import { solutionContent } from "@/lib/solutionContent";
import { DEFAULT_CURRENCY } from "@/lib/currency";
```

Inside `HomeLanding`, after the existing `const openModal = () => setIsModalOpen(true);` and `const closeModal = () => setIsModalOpen(false);` lines, add currency and comparison state from `AiSocLanding`:

```jsx
const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
const [isComparisonVisible, setIsComparisonVisible] = useState(false);
const comparisonRef = useRef(null);
```

Add the comparison intersection observer useEffect from `AiSocLanding.jsx` (lines 197-215) just before the return statement. Then add the AI-SOC sections into the JSX. Replace the closing `</main>` and modal block with the following merged content:

```jsx
        {/* AI-SOC Video + Pricing */}
        <section className="mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-center mb-10">
            {t('aiSocLanding.vsCloudflareTitle', 'AI-SOC vs Cloudflare + Outlook')}
          </h2>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-[0_20px_60px_-20px_rgba(14,165,233,0.45)]">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/vRUnXsQ0i9I?si=qhMYst6vEXN5KaTf"
                title="AI-SOC vs Cloudflare + Outlook"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto w-full">
          <AiSocPricing
            currency={currency}
            onCurrencyChange={setCurrency}
            onOpenModal={openModal}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
          <AiSocInsights />
        </div>

        {/* Why AI-SOC value cards (reuse the valueFeatures block from AiSocLanding.jsx) */}
        <div className="w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {t('aiSocValueSection.title', 'Why AI-SOC')}
            </h2>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mt-4">
              {t(
                'aiSocValueSection.subtitle',
                'AI-SOC makes enterprise-level cybersecurity accessible to any company. Deploy protection in minutes and manage web and email security from one unified platform.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Paste the valueFeatures.map(...) block from AiSocLanding.jsx lines 266-294 */}
          </div>
        </div>

        {/* Competitive Advantages tables (reuse the comparisonTables block from AiSocLanding.jsx) */}
        <section className="w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
          <div
            ref={comparisonRef}
            className={`relative overflow-hidden rounded-[32px] border border-emerald-400/15 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-5 py-10 sm:px-10 shadow-[0_0_40px_rgba(16,185,129,0.12)] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${isComparisonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Paste the full comparison tables JSX from AiSocLanding.jsx lines 303-404 */}
          </div>
        </section>

        {/* Platform Overview */}
        <div className="w-full mt-24 px-4 sm:px-0">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              {t('solution.sectionTitle', 'AI-SOC Platform Overview')}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {t('solution.sectionSubtitle', 'AI-SOC provides a unified interface for monitoring and protecting web infrastructure and corporate email in real time.')}
            </p>
          </div>
          <StickyScrollSolution />
        </div>

        <AiSocFaqSection />

        <div className="w-full max-w-7xl mx-auto mt-24">
          <FloatingText />
        </div>
      </main>

      <BackToTopButton />
      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />
      <AiSocGetModal isOpen={isGetModalOpen} onClose={closeGetModal} />
    </div>
  );
}
```

Because `HomeLanding` will now trigger both the `RequestDemoModal` and the `AiSocGetModal`, add a second modal state:

```jsx
const [isGetModalOpen, setIsGetModalOpen] = useState(false);
const openGetModal = () => setIsGetModalOpen(true);
const closeGetModal = () => setIsGetModalOpen(false);
```

Pass `openGetModal` to `AiSocPricing` where `AiSocLanding` currently passes `openModal`. Pass `openModal` to the `Header` as before.

- [ ] **Step 3: Add the valueFeatures and comparisonTables definitions**

Copy the `valueFeatures` array (lines 26-67) and `comparisonTables` array (lines 69-187) from `AiSocLanding.jsx` into `HomeLanding.jsx`, just before the `useEffect` hooks. These are self-contained and have no external dependencies besides `lucide-react` icons. Import the icons:

```jsx
import { Rocket, BrainCircuit, Radar, ShieldCheck } from "lucide-react";
```

- [ ] **Step 4: Preload solution images**

Add the solution image preload useEffect from `AiSocLanding.jsx` lines 189-195 to `HomeLanding.jsx`.

- [ ] **Step 5: Add the /ai-soc redirect**

Open `next.config.mjs` and add the following redirect inside the `nextConfig` object (inside the `async redirects()` function if it exists; otherwise add a `redirects` function):

```js
async redirects() {
  return [
    {
      source: "/ai-soc",
      destination: "/",
      permanent: true,
    },
    {
      source: "/:locale/ai-soc",
      destination: "/:locale",
      permanent: true,
    },
  ];
}
```

If `next.config.mjs` already exports a `redirects` function, merge these two entries into the existing array.

- [ ] **Step 6: Delete the old AI-SOC page route**

```bash
rm "src/app/[locale]/ai-soc/page.jsx"
rm -rf "src/app/[locale]/ai-soc"
```

- [ ] **Step 7: Verify the homepage merge by running a build**

```bash
npm run build
```

Expected: build succeeds and the homepage includes the AI-SOC pricing/FAQ sections.

- [ ] **Step 8: Commit**

```bash
git add src/components/HomeLanding.jsx src/components/ai-soc/landing/index.js next.config.mjs
if git status --short | grep -q "src/app/\[locale\]/ai-soc"; then git rm -r "src/app/[locale]/ai-soc"; fi
git commit -m "feat(home): merge homepage and AI-SOC landing page, redirect /ai-soc to /"
```

---

### Task 3: Update Header and Footer links

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Footer.jsx`

**Interfaces:**
- Consumes: existing `LocalizedLink` component and footer translation keys.
- Produces: AI-SOC systems link points to `/`; footer exposes two AI-SOC policy groups.

- [ ] **Step 1: Update the AI-SOC systems link in the header**

In `src/components/Header.jsx`, change the `systemsItems` array (line 102) to point the AI-SOC entry to the homepage:

```jsx
const systemsItems = [
  { key: "ai-soc", label: t("header.nav.systemsAiSoc", "AI-SOC"), href: "/" },
];
```

- [ ] **Step 2: Update the footer policy groups**

Open `src/components/Footer.jsx`. Replace the existing single AI-SOC 1 group with two groups. Replace lines 38-50 with:

```jsx
              {/* AI-SOC 1 Web */}
              <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold text-center sm:text-right">AI-SOC 1 Web:</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:contents">
                <LocalizedLink href="/policies/ai-soc1/web/terms_of_use" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsUse", "Terms of Use")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/web/terms_of_service" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsService", "Terms of Service")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/web/privacy" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.privacy", "Privacy Policy")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/web/cookies" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.cookies", "Cookies Policy")}
                </LocalizedLink>
              </div>

              {/* AI-SOC 1 Email */}
              <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold text-center sm:text-right mt-2 sm:mt-0">AI-SOC 1 Email:</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:contents">
                <LocalizedLink href="/policies/ai-soc1/email/terms_of_use" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsUse", "Terms of Use")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/email/terms_of_service" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsService", "Terms of Service")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/email/privacy" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.privacy", "Privacy Policy")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/email/cookies" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.cookies", "Cookies Policy")}
                </LocalizedLink>
              </div>
```

Also replace the existing cookies footer link (line 31) to point to the general cookies policy page, or remove it if it is now covered by the product groups. Keep the existing `Cookies Policy` link at the top if it points to a site-wide cookies page; otherwise update it to `/policies/ai-soc1/web/cookies`.

- [ ] **Step 3: Verify the footer renders both groups**

Run the dev server or build and check that the footer shows both “AI-SOC 1 Web” and “AI-SOC 1 Email” groups.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.jsx src/components/Footer.jsx
git commit -m "feat(nav): point AI-SOC systems link to home and split footer policy groups"
```

---

### Task 4: Create English Web policy components

**Files:**
- Create: `src/components/policies/ai-soc1/web/TermsOfUseWebEn.jsx`
- Create: `src/components/policies/ai-soc1/web/TermsOfServiceWebEn.jsx`
- Create: `src/components/policies/ai-soc1/web/PrivacyWebEn.jsx`
- Create: `src/components/policies/ai-soc1/web/CookiesWebEn.jsx`

**Interfaces:**
- Consumes: `PolicyLayout` (Task 1), existing English unified terms source `TermsOfUseEn.jsx`.
- Produces: Four standalone English Web policy components.

- [ ] **Step 1: Create the English Web Terms of Use component**

Create `src/components/policies/ai-soc1/web/TermsOfUseWebEn.jsx`. Derive it from the existing `src/components/policies/ai-soc1/TermsOfUseEn.jsx` by keeping the Web Security & Traffic Management sections and removing all Email Security & Visualization sections (2.2, 2.2.1, 2.2.2, 8.3, 8.4). Update the title/subtitle to reference the Web component. Keep the legal entity selector for the UAE/Kazakhstan toggle by reusing `TermsOfUseWithEntity` if needed; otherwise render the Web terms directly through `PolicyLayout`.

Use this exact template and paste the Web-only sections from the existing source file:

```jsx
"use client";

import React from "react";
import PolicyLayout from "@/components/policies/shared/PolicyLayout";

const sections = [
  { id: "about", title: "1. About These Terms" },
  { id: "service-description", title: "2. Service Description and Pricing" },
  { id: "sla", title: "3. Service Level Agreement and Availability" },
  { id: "user-responsibilities", title: "4. User Responsibilities and Acceptable Use" },
  { id: "data-processing", title: "5. Data Processing and Infrastructure" },
  { id: "service-activation", title: "6. Service Activation and Free Trials" },
  { id: "ip-rights", title: "7. Intellectual Property Rights" },
  { id: "privacy", title: "8. Privacy and Data Protection" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "updates", title: "10. Version Updates and Support" },
  { id: "termination", title: "11. Termination" },
  { id: "indemnification", title: "12. Indemnification" },
  { id: "governing-law", title: "13. Governing Law and Disputes" },
  { id: "changes", title: "14. Changes to Terms" },
  { id: "contact", title: "15. Contact Information" },
  { id: "misc", title: "16. Miscellaneous" },
];

export default function TermsOfUseWebEn() {
  return (
    <PolicyLayout
      title="AI-SOC 1 Web Policy"
      subtitle="Terms of Use"
      sections={sections}
    >
      {/* Copy Web-only sections from src/components/policies/ai-soc1/TermsOfUseEn.jsx:
          1. About These Terms (rewrite 1.3 to mention only web-soc.silenceai.net)
          2. Service Description and Pricing (keep only 2.1 Web Security & Traffic Management, keep 2.3 Pricing)
          3. Service Level Agreement (keep only 3.1 Web SLA, remove 3.2 Email Delivery Speed SLA)
          4. User Responsibilities
          5. Data Processing and Infrastructure
          6. Service Activation and Free Trials
          7. Intellectual Property Rights
          8. Privacy and Data Protection (keep only 8.1 and 8.2, remove 8.3 and 8.4)
          9. Limitation of Liability
          10. Version Updates and Support
          11. Termination
          12. Indemnification
          13. Governing Law and Disputes
          14. Changes to Terms
          15. Contact Information
          16. Miscellaneous
      */}
    </PolicyLayout>
  );
}
```

The comment block above is a content guide; the actual JSX must be copied from the existing source file and edited to remove email references. Do not leave the comment as the body of the page.

- [ ] **Step 2: Create the English Web Terms of Service component**

Create `src/components/policies/ai-soc1/web/TermsOfServiceWebEn.jsx`. Use the English translation of the Russian `src/components/policies/ru/ai-soc1/TermsOfService.jsx`, removing any email-specific sections (e.g., the email access section) and keeping only Web Security & Traffic Management references (e.g., Agent, CMC, IP address changes). The section ordering should mirror the existing Russian Terms of Service but with web-only scope.

- [ ] **Step 3: Create the English Web Privacy component**

Create `src/components/policies/ai-soc1/web/PrivacyWebEn.jsx`. Translate and adapt the Russian `src/components/policies/ru/ai-soc1/Privacy.jsx`, removing all Email Protector / Webmail content. Keep only Global Shield / Web Security content and general boilerplate.

- [ ] **Step 4: Create the English Web Cookies component**

Create `src/components/policies/ai-soc1/web/CookiesWebEn.jsx`. Translate the Russian `src/components/policies/ru/general/Cookies.jsx` (or `src/components/policies/ru/ai-soc1/CookiesEmail.jsx`), updating the title and references to cover the Web Security component. Keep the same section structure and cookie categories.

- [ ] **Step 5: Commit the English Web policy components**

```bash
git add src/components/policies/ai-soc1/web/
git commit -m "feat(policies): add English AI-SOC Web policy components"
```

---

### Task 5: Create English Email policy components

**Files:**
- Create: `src/components/policies/ai-soc1/email/TermsOfUseEmailEn.jsx`
- Create: `src/components/policies/ai-soc1/email/TermsOfServiceEmailEn.jsx`
- Create: `src/components/policies/ai-soc1/email/PrivacyEmailEn.jsx`
- Create: `src/components/policies/ai-soc1/email/CookiesEmailEn.jsx`

**Interfaces:**
- Consumes: `PolicyLayout`, existing English unified terms source `TermsOfUseEn.jsx`, and existing Russian email components.
- Produces: Four standalone English Email policy components.

- [ ] **Step 1: Create the English Email Terms of Use component**

Create `src/components/policies/ai-soc1/email/TermsOfUseEmailEn.jsx`. Derive it from `src/components/policies/ai-soc1/TermsOfUseEn.jsx` by keeping only the Email Security & Visualization sections (2.2, 2.2.1, 2.2.2, 8.3, 8.4) and removing Web Security sections (2.1). Update the title to “AI-SOC 1 Email Policy — Terms of Use”.

Use the same `PolicyLayout` wrapper as Task 4. Remove section 3.1 (Web SLA) and keep 3.2 (Email Delivery Speed SLA). Update the contact section to reference the email domain.

- [ ] **Step 2: Create the English Email Terms of Service component**

Create `src/components/policies/ai-soc1/email/TermsOfServiceEmailEn.jsx`. Translate the Russian `src/components/policies/ru/ai-soc1/TermsOfService.jsx`, keeping only email-specific content (e.g., the email access prohibition section) and removing web-specific clauses (Agent IP changes, WAF references). Keep the same section numbering and general legal boilerplate.

- [ ] **Step 3: Create the English Email Privacy component**

Create `src/components/policies/ai-soc1/email/PrivacyEmailEn.jsx`. Translate the Russian `src/components/policies/ru/ai-soc1/PrivacyEmail.jsx` to English. Keep the section structure and the Webmail Client / Email Protector specific content. Update the title and operator contact details to English.

- [ ] **Step 4: Create the English Email Cookies component**

Create `src/components/policies/ai-soc1/email/CookiesEmailEn.jsx`. Translate the Russian `src/components/policies/ru/ai-soc1/CookiesEmail.jsx` to English. Update the title to “Cookie Policy — Email Component” and keep the same section structure.

- [ ] **Step 5: Commit the English Email policy components**

```bash
git add src/components/policies/ai-soc1/email/
git commit -m "feat(policies): add English AI-SOC Email policy components"
```

---

### Task 6: Create Russian Web policy components

**Files:**
- Create: `src/components/policies/ru/ai-soc1/web/TermsOfUseWeb.jsx`
- Create: `src/components/policies/ru/ai-soc1/web/TermsOfServiceWeb.jsx`
- Create: `src/components/policies/ru/ai-soc1/web/PrivacyWeb.jsx`
- Create: `src/components/policies/ru/ai-soc1/web/CookiesWeb.jsx`

**Interfaces:**
- Consumes: `PolicyLayout`, existing Russian unified components.
- Produces: Four standalone Russian Web policy components.

- [ ] **Step 1: Create the Russian Web Terms of Use component**

Create `src/components/policies/ru/ai-soc1/web/TermsOfUseWeb.jsx`. Copy from `src/components/policies/ru/ai-soc1/TermsOfUse.jsx` and remove all email sections. Update the title to “Политика AI-SOC 1 Web — Условия использования”. Keep the Web Security & Traffic Management service description and remove the five-layer email security architecture and email-related clauses.

- [ ] **Step 2: Create the Russian Web Terms of Service component**

Create `src/components/policies/ru/ai-soc1/web/TermsOfServiceWeb.jsx`. Copy from `src/components/policies/ru/ai-soc1/TermsOfService.jsx` and remove the email access section (4.5 / email-access). Keep the Web Agent / IP address / payment gateway clauses. Update the title to “Политика AI-SOC 1 Web — Условия предоставления услуг”.

- [ ] **Step 3: Create the Russian Web Privacy component**

Create `src/components/policies/ru/ai-soc1/web/PrivacyWeb.jsx`. Copy from `src/components/policies/ru/ai-soc1/Privacy.jsx` and remove all Email Protector / Webmail Client sections (section 12, 12.4). Keep only Global Shield / Web Security content. Update the title to “Политика AI-SOC 1 Web — Политика конфиденциальности”.

- [ ] **Step 4: Create the Russian Web Cookies component**

Create `src/components/policies/ru/ai-soc1/web/CookiesWeb.jsx`. Copy from `src/components/policies/ru/general/Cookies.jsx` and update the title to “Политика использования файлов cookie — компонент Web”. Keep the same section structure and references to the Web Security component where appropriate.

- [ ] **Step 5: Commit the Russian Web policy components**

```bash
git add src/components/policies/ru/ai-soc1/web/
git commit -m "feat(policies): add Russian AI-SOC Web policy components"
```

---

### Task 7: Create Russian Email policy components

**Files:**
- Create: `src/components/policies/ru/ai-soc1/email/TermsOfUseEmail.jsx`
- Create: `src/components/policies/ru/ai-soc1/email/TermsOfServiceEmail.jsx`
- Create: `src/components/policies/ru/ai-soc1/email/PrivacyEmail.jsx`
- Create: `src/components/policies/ru/ai-soc1/email/CookiesEmail.jsx`

**Interfaces:**
- Consumes: existing Russian email components (`TermsOfUseEmail.jsx`, `PrivacyEmail.jsx`, `CookiesEmail.jsx`) and the unified `TermsOfService.jsx`.
- Produces: Four standalone Russian Email policy components moved into the new email subdirectory.

- [ ] **Step 1: Move existing Russian Email terms of use**

```bash
mv src/components/policies/ru/ai-soc1/TermsOfUseEmail.jsx src/components/policies/ru/ai-soc1/email/TermsOfUseEmail.jsx
```

Update the title inside the moved file to “Политика AI-SOC 1 Email — Условия использования” if it currently says only “Условия использования Webmail Client”.

- [ ] **Step 2: Create the Russian Email Terms of Service component**

Create `src/components/policies/ru/ai-soc1/email/TermsOfServiceEmail.jsx`. Copy from `src/components/policies/ru/ai-soc1/TermsOfService.jsx` and keep only the email access section (4.5 / email-access) plus general boilerplate. Remove web-specific clauses (Agent IP changes, 3.3.1, 3.3.2, 3.3.3). Update the title to “Политика AI-SOC 1 Email — Условия предоставления услуг”.

- [ ] **Step 3: Move existing Russian Email privacy and cookies**

```bash
mv src/components/policies/ru/ai-soc1/PrivacyEmail.jsx src/components/policies/ru/ai-soc1/email/PrivacyEmail.jsx
mv src/components/policies/ru/ai-soc1/CookiesEmail.jsx src/components/policies/ru/ai-soc1/email/CookiesEmail.jsx
```

Update the titles inside the moved files to “Политика AI-SOC 1 Email — Политика конфиденциальности” and “Политика использования файлов cookie — компонент Email” respectively if needed.

- [ ] **Step 4: Commit the Russian Email policy components**

```bash
git add src/components/policies/ru/ai-soc1/email/
git commit -m "feat(policies): reorganize Russian AI-SOC Email policy components"
```

---

### Task 8: Create route files for Web policies

**Files:**
- Create: 8 route files under `src/app/[locale]/policies/ai-soc1/web/` and `src/app/policies/ai-soc1/web/`

**Interfaces:**
- Consumes: the English and Russian Web policy components created in Tasks 4 and 6.
- Produces: Renderable Next.js routes for all Web policy pages.

- [ ] **Step 1: Create localized Web policy route files**

Create `src/app/[locale]/policies/ai-soc1/web/terms_of_use/page.jsx`:

```jsx
import EnPage from "@/components/policies/ai-soc1/web/TermsOfUseWebEn";
import RuPage from "@/components/policies/ru/ai-soc1/web/TermsOfUseWeb";

export default async function LocalizedPage({ params }) {
  const { locale } = await params;
  return locale === "ru" ? <RuPage /> : <EnPage />;
}
```

Create the other three localized Web route files using the same pattern, importing the matching `TermsOfServiceWebEn`, `PrivacyWebEn`, `CookiesWebEn` and their Russian counterparts.

- `src/app/[locale]/policies/ai-soc1/web/terms_of_service/page.jsx`
- `src/app/[locale]/policies/ai-soc1/web/privacy/page.jsx`
- `src/app/[locale]/policies/ai-soc1/web/cookies/page.jsx`

- [ ] **Step 2: Create non-localized Web policy route files**

Create `src/app/policies/ai-soc1/web/terms_of_use/page.jsx`:

```jsx
import TermsOfUseWebEn from "@/components/policies/ai-soc1/web/TermsOfUseWebEn";

export default function Page() {
  return <TermsOfUseWebEn />;
}
```

Create the other three non-localized Web route files, importing the matching English components:

- `src/app/policies/ai-soc1/web/terms_of_service/page.jsx`
- `src/app/policies/ai-soc1/web/privacy/page.jsx`
- `src/app/policies/ai-soc1/web/cookies/page.jsx`

- [ ] **Step 3: Commit the Web policy routes**

```bash
git add src/app/\[locale\]/policies/ai-soc1/web/ src/app/policies/ai-soc1/web/
git commit -m "feat(routes): add AI-SOC Web policy routes"
```

---

### Task 9: Create route files for Email policies

**Files:**
- Create: 8 route files under `src/app/[locale]/policies/ai-soc1/email/` and `src/app/policies/ai-soc1/email/`

**Interfaces:**
- Consumes: the English and Russian Email policy components created in Tasks 5 and 7.
- Produces: Renderable Next.js routes for all Email policy pages.

- [ ] **Step 1: Create localized Email policy route files**

Create `src/app/[locale]/policies/ai-soc1/email/terms_of_use/page.jsx`:

```jsx
import EnPage from "@/components/policies/ai-soc1/email/TermsOfUseEmailEn";
import RuPage from "@/components/policies/ru/ai-soc1/email/TermsOfUseEmail";

export default async function LocalizedPage({ params }) {
  const { locale } = await params;
  return locale === "ru" ? <RuPage /> : <EnPage />;
}
```

Create the other three localized Email route files using the same pattern, importing the matching `TermsOfServiceEmailEn`, `PrivacyEmailEn`, `CookiesEmailEn` and their Russian counterparts.

- `src/app/[locale]/policies/ai-soc1/email/terms_of_service/page.jsx`
- `src/app/[locale]/policies/ai-soc1/email/privacy/page.jsx`
- `src/app/[locale]/policies/ai-soc1/email/cookies/page.jsx`

- [ ] **Step 2: Create non-localized Email policy route files**

Create `src/app/policies/ai-soc1/email/terms_of_use/page.jsx`:

```jsx
import TermsOfUseEmailEn from "@/components/policies/ai-soc1/email/TermsOfUseEmailEn";

export default function Page() {
  return <TermsOfUseEmailEn />;
}
```

Create the other three non-localized Email route files, importing the matching English components:

- `src/app/policies/ai-soc1/email/terms_of_service/page.jsx`
- `src/app/policies/ai-soc1/email/privacy/page.jsx`
- `src/app/policies/ai-soc1/email/cookies/page.jsx`

- [ ] **Step 3: Commit the Email policy routes**

```bash
git add src/app/\[locale\]/policies/ai-soc1/email/ src/app/policies/ai-soc1/email/
git commit -m "feat(routes): add AI-SOC Email policy routes"
```

---

### Task 10: Remove old unified AI-SOC 1 policy routes and components

**Files:**
- Delete: old unified route files and components listed in the File Structure section.

**Interfaces:**
- Consumes: none.
- Produces: old unified routes no longer exist; no broken internal links remain.

- [ ] **Step 1: Search for any internal links to old AI-SOC policy routes**

```bash
grep -R "policies/ai-soc1/terms_of_use\|policies/ai-soc1/terms_of_service\|policies/ai-soc1/privacy\|policies/ai-soc1/cookies\|policies/ai-soc1/privacy_email\|policies/ai-soc1/cookies_email\|policies/ai-soc1/terms_of_use_email" src/ --include="*.jsx" --include="*.js" --include="*.mjs" --include="*.json" --include="*.md"
```

Expected: only the old route files and components themselves should appear. Any other references must be updated before deletion.

- [ ] **Step 2: Delete old unified route files**

```bash
rm -rf "src/app/[locale]/policies/ai-soc1/terms_of_use"
rm -rf "src/app/[locale]/policies/ai-soc1/terms_of_service"
rm -rf "src/app/[locale]/policies/ai-soc1/privacy"
rm -rf "src/app/[locale]/policies/ai-soc1/cookies"
rm -rf "src/app/[locale]/policies/ai-soc1/privacy_email"
rm -rf "src/app/[locale]/policies/ai-soc1/cookies_email"
rm -rf "src/app/[locale]/policies/ai-soc1/terms_of_use_email"
rm -rf "src/app/policies/ai-soc1/terms_of_use"
rm -rf "src/app/policies/ai-soc1/terms_of_service"
rm -rf "src/app/policies/ai-soc1/privacy"
rm -rf "src/app/policies/ai-soc1/cookies"
rm -rf "src/app/policies/ai-soc1/privacy_email"
rm -rf "src/app/policies/ai-soc1/cookies_email"
rm -rf "src/app/policies/ai-soc1/terms_of_use_email"
```

- [ ] **Step 3: Delete old unified components**

```bash
rm -f "src/components/policies/ai-soc1/TermsOfUseEn.jsx"
rm -f "src/components/policies/ai-soc1/TermsOfUseWithEntity.jsx"
rm -f "src/components/policies/ru/ai-soc1/TermsOfUse.jsx"
rm -f "src/components/policies/ru/ai-soc1/TermsOfService.jsx"
rm -f "src/components/policies/ru/ai-soc1/Privacy.jsx"
rm -f "src/components/policies/ru/general/Cookies.jsx"
```

Note: `LegalEntitySelector.jsx` and `KazakhstanEntityDetails.jsx` under `src/components/policies/ai-soc1/` are kept because they are reused by the Russian Web Terms of Use and any future entity selector.

- [ ] **Step 4: Verify no broken references remain**

```bash
grep -R "TermsOfUseEn\|TermsOfUseWithEntity\|RuAiSocTermsOfUse\|RuAiSocTermsOfService\|RuAiSocPrivacy\|RuCookies" src/ --include="*.jsx" --include="*.js" --include="*.mjs"
```

Expected: only import aliases inside the deleted files should remain; after deletion there should be zero matches. If any matches remain, update those files to import the new Web/Email components.

- [ ] **Step 5: Commit the deletions**

```bash
git add -A
git commit -m "chore(cleanup): remove unified AI-SOC 1 policy routes and components"
```

---

### Task 11: Final build and verification

**Files:**
- All files changed in Tasks 1-10.

**Interfaces:**
- Consumes: the full static Next.js build.
- Produces: a successful build with all new routes and no errors.

- [ ] **Step 1: Run the full static build**

```bash
npm run build
```

Expected output: `Compiled successfully` and no TypeScript/ESLint or route errors.

- [ ] **Step 2: Verify the new routes exist in the output**

For static export, the output directory is `out/`. Confirm the new directories exist:

```bash
ls -la out/policies/ai-soc1/web/ out/policies/ai-soc1/email/ 2>/dev/null || ls -la out/en/policies/ai-soc1/web/ out/en/policies/ai-soc1/email/
```

Expected: `terms_of_use`, `terms_of_service`, `privacy`, and `cookies` directories exist under both `web` and `email`.

- [ ] **Step 3: Verify the old unified routes are gone**

```bash
ls -la out/policies/ai-soc1/ 2>/dev/null || ls -la out/en/policies/ai-soc1/
```

Expected: only `web` and `email` directories remain; no `terms_of_use`, `terms_of_service`, `privacy`, or `cookies` directories at the top level of `ai-soc1`.

- [ ] **Step 4: Verify the homepage contains AI-SOC content**

Open `out/index.html` (or `out/en/index.html`) and search for the text “AI-SOC Platform Overview” or “Competitive Advantages”. Expected: both strings appear in the rendered HTML.

- [ ] **Step 5: Verify the footer links are updated**

Open `out/index.html` and search for the text “AI-SOC 1 Web:” and “AI-SOC 1 Email:”. Expected: both strings appear and are linked to the new `/policies/ai-soc1/web/...` and `/policies/ai-soc1/email/...` paths.

- [ ] **Step 6: Run the dev server smoke check (optional)**

```bash
npm run dev &
DEV_PID=$!
sleep 5
curl -s http://localhost:3000/ | grep -q "AI-SOC Platform Overview" && echo "Homepage OK"
curl -s http://localhost:3000/policies/ai-soc1/web/terms_of_use/ | grep -q "AI-SOC 1 Web" && echo "Web Terms OK"
curl -s http://localhost:3000/policies/ai-soc1/email/terms_of_use/ | grep -q "AI-SOC 1 Email" && echo "Email Terms OK"
kill $DEV_PID
```

- [ ] **Step 7: Commit final verification state**

```bash
git add -A
git commit -m "chore: final build verification for AI-SOC merge and policy split"
```

---

## Self-Review Checklist

- [ ] **Spec coverage:** Every requirement from the design doc is covered by at least one task.
  - Homepage merge: Tasks 2 and 3.
  - `/ai-soc` redirect: Task 2.
  - Web/Email policy split: Tasks 4-9.
  - Footer update: Task 3.
  - Old route removal: Task 10.
  - Build verification: Task 11.
- [ ] **Placeholder scan:** No TBD, TODO, or “fill in details” remain. Each policy component task includes the exact source file and the exact sections to keep/remove.
- [ ] **Type consistency:** All new route files use the same async `{ params }` destructuring pattern as existing localized policy pages. All components are default exports and are used as JSX elements.
- [ ] **No orphaned references:** Task 10 includes a grep check to ensure old component names are not imported anywhere after deletion.
- [ ] **Brand transform safety:** All new policy paths contain `policies` or `terms`, so the root-layout string replacement will not affect policy copy.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-10-ai-soc-merge-and-policy-split.md`. Two execution options:

1. **Subagent-Driven (recommended)** - Dispatch a fresh coder subagent per task, review between tasks, fast iteration. Good for the large policy-content split work.
2. **Inline Execution** - Execute tasks in this session using `superpowers:executing-plans`, batch execution with checkpoints.
