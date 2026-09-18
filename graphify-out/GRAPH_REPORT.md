# Graph Report - pechenka  (2026-09-09)

## Corpus Check
- 259 files · ~6,035,996 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 868 nodes · 1082 edges · 111 communities (87 shown, 24 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a9889e45`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]
- [[_COMMUNITY_Community 94|Community 94]]
- [[_COMMUNITY_Community 95|Community 95]]
- [[_COMMUNITY_Community 96|Community 96]]
- [[_COMMUNITY_Community 97|Community 97]]
- [[_COMMUNITY_Community 100|Community 100]]
- [[_COMMUNITY_Community 101|Community 101]]
- [[_COMMUNITY_Community 102|Community 102]]
- [[_COMMUNITY_Community 103|Community 103]]

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 43 edges
2. `EdgeGlowCard()` - 14 edges
3. `GitHub Deployment Guide for Silence AI Website` - 12 edges
4. `File Structure` - 12 edges
5. `AI-SOC Currency Selector Design` - 12 edges
6. `Design System Inspired by Lamborghini` - 11 edges
7. `AI-SOC Terms of Use — Legal Entity Selector Design` - 11 edges
8. `Frontend Redesign — Black Canvas + ColorBends Background` - 11 edges
9. `cn()` - 10 edges
10. `Deploying to Production (Nginx + PM2 + Next.js)` - 10 edges

## Surprising Connections (you probably didn't know these)
- `BackgroundBeams()` --calls--> `cn()`  [INFERRED]
  public/components/ui/background/background-beams.jsx → src/lib/utils.js
- `BadRequestPage()` --calls--> `useLanguage()`  [INFERRED]
  src/app/[locale]/400/page.jsx → src/contexts/LanguageContext.jsx
- `NotFound()` --calls--> `useLanguage()`  [INFERRED]
  src/app/[locale]/not-found.jsx → src/contexts/LanguageContext.jsx
- `AiSocGetModal()` --calls--> `useLanguage()`  [INFERRED]
  src/components/AiSocGetModal.jsx → src/contexts/LanguageContext.jsx
- `AiSocLanding()` --calls--> `useLanguage()`  [INFERRED]
  src/components/AiSocLanding.jsx → src/contexts/LanguageContext.jsx

## Import Cycles
- 1-file cycle: `src/i18n/navigation.js -> src/i18n/navigation.js`

## Communities (111 total, 24 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (5): BackToTopButton(), Modal(), RuAiSocCookiesEmail(), RuAiSocPrivacyEmail(), PolicySidebar()

### Community 1 - "Community 1"
Cohesion: 0.04
Nodes (4): CERT_HEIGHT, CertificateLayout(), pending, useCertificateDownload()

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (24): CurrencySelector(), CybersecurityLamp(), BUSINESS_PLAN_CONFIG, COMMON_FEATURE_KEYS, FEATURE_FALLBACKS, PENTEST_COMPARISON, PENTEST_FEATURES, PLAN_SPECIFIC_FEATURE_KEYS (+16 more)

### Community 3 - "Community 3"
Cohesion: 0.17
Nodes (9): ContactForm(), CookieConsent(), GlowButton(), Hero(), FLAG_COMPONENTS, LANGUAGE_OPTIONS, LanguageSelector(), SlncEnvHeader() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (11): BRAND_REPLACEMENTS, EXCLUDED_BRAND_KEYWORDS, LocaleLayout(), shouldSkipBrandTransform(), transformBranding(), geistMono, geistSans, metadata (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (7): EdgeGlowCard(), HeroSection(), HowWeWork(), ServicesBlock(), TechnologyStack(), WhyChooseUs(), WorldMapKazakhstan()

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (42): 10. Addendum — 2026-08 Glass Update, 1. Visual Theme & Atmosphere, 2026-08-24 — Blue Accent & Rounded Glass Update, 2. Color Palette & Roles, 3. Typography Rules, 4. Component Stylings, 5. Layout Principles, 6. Depth & Elevation (+34 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (11): ConsultingQuestionnaire(), Insights(), SupremeInstructions(), SupremeVideoPlaceholder(), FRAME_RANGES, ReducedMotionStory(), sceneTextStyle, ScrollytellingSequence() (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (9): BadRequestPage(), NotFound(), AiSocLanding(), FaqSection(), FloatingText(), RequestSystemModal(), SecureDevelopmentPage(), FloatingDock() (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (8): AiSocGetModal(), HomeLanding(), valueFeatures, StickyScrollSolution(), articles, articleUrls, featuredResourcesConfig, solutionContent

### Community 12 - "Community 12"
Cohesion: 0.20
Nodes (10): BRAND_REPLACEMENTS, EXCLUDED_BRAND_KEYWORDS, geistMono, geistSans, metadata, organizationStructuredData, RootLayout(), shouldSkipBrandTransform() (+2 more)

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (3): ScrollArea, ScrollBar, Separator

### Community 14 - "Community 14"
Cohesion: 0.22
Nodes (4): calloutClassMap, EmailSecurityDocumentation(), themeStyles, transition

### Community 15 - "Community 15"
Cohesion: 0.18
Nodes (9): BackgroundBeams(), List(), Paragraph(), renderBodyBlock(), BackgroundBeams(), FloatingDockDesktop(), FloatingDockMobile(), StickyScroll() (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.25
Nodes (4): PrivacyWebEn(), sections, sections, TermsOfUseEmail()

### Community 18 - "Community 18"
Cohesion: 0.05
Nodes (40): dependencies, class-variance-authority, clsx, country-flag-icons, framer-motion, gsap, html-to-image, lucide-react (+32 more)

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 21 - "Community 21"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 22 - "Community 22"
Cohesion: 0.40
Nodes (3): CaseStudies(), CaseStudyCard(), useTilt()

### Community 25 - "Community 25"
Cohesion: 0.12
Nodes (16): Deployment URLs, GitHub Deployment Guide for Silence AI Website, If you get authentication errors:, If you get merge conflicts:, Important Files to Check Before Deployment, Next Steps, Option A: Deploy to GitHub Pages (Static Site), Option B: Deploy to Vercel (Recommended for Next.js) (+8 more)

### Community 27 - "Community 27"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 73 - "Community 73"
Cohesion: 0.12
Nodes (16): AI-SOC Homepage Merge and Policy Split Implementation Plan, Execution Handoff, File Structure, Global Constraints, Self-Review Checklist, Task 10: Remove old unified AI-SOC 1 policy routes and components, Task 11: Final build and verification, Task 1: Create shared policy layout wrapper (+8 more)

### Community 74 - "Community 74"
Cohesion: 0.12
Nodes (15): Background, Buttons, Cards & Containers, Color Palette, Components, Excluded Scope, Frontend Redesign — Black Canvas + ColorBends Background, Goals (+7 more)

### Community 75 - "Community 75"
Cohesion: 0.13
Nodes (14): 1. Goals, 2. Non-goals, 3. Current state, 4.1 Homepage merge, 4.2 Policy split, 4. Proposed approaches and recommendation, 5.1 Homepage merge, 5.2 Policy split (+6 more)

### Community 76 - "Community 76"
Cohesion: 0.17
Nodes (7): metadata, countries, CountrySelectModal(), EmailSecurityModal(), GlassSurface(), Header(), PricingSection()

### Community 77 - "Community 77"
Cohesion: 0.15
Nodes (12): 10. Verification, 11. Notes, 1. Goal, 2. Scope, 3. User-facing behavior, 4. Architecture, 5. Files changed, 6. Data flow (+4 more)

### Community 78 - "Community 78"
Cohesion: 0.17
Nodes (11): 10. Verification, 1. Goal, 2. Scope, 3. User-facing behavior, 4. Architecture, 5. Files changed, 6. Data, 7. UI placement (+3 more)

### Community 79 - "Community 79"
Cohesion: 0.23
Nodes (8): BorderGlow(), buildGlowVars(), buildGradientVars(), COLOR_MAP, GRADIENT_KEYS, GRADIENT_POSITIONS, isLightColor(), parseHSL()

### Community 80 - "Community 80"
Cohesion: 0.18
Nodes (10): 1) Nginx server block (proxy to Next.js), 2) Build and restart the app with PM2, 3) Verify refresh and logs, 4) Optional: silence Turbopack root warning, Deploying to Production (Nginx + PM2 + Next.js), Health checklist, Prerequisites, Rollback (+2 more)

### Community 81 - "Community 81"
Cohesion: 0.18
Nodes (10): Execution Handoff, Frontend Shell Redesign Implementation Plan, Global Constraints, Spec Coverage Self-Review, Task 1: Create ColorBends Component, Task 2: Wire ColorBends into LayoutWrapper, Task 3: Remove "Systems" from Header, Task 4: Establish Global Black/White Tokens (+2 more)

### Community 82 - "Community 82"
Cohesion: 0.18
Nodes (10): 1. Readable glass recipe — `src/app/globals.css`, 2. BorderGlow hover effect — `src/components/EdgeGlowCard.jsx`, 3. Header pill — `src/components/Header.jsx`, 4. Out of scope, 5. Documentation, 6. Verification, Decisions (from brainstorming), Design (+2 more)

### Community 83 - "Community 83"
Cohesion: 0.27
Nodes (10): fix_content(), fix_file(), fix_line(), is_cjk(), last_unescaped_quote(), Line-by-line JSON string value fixer.  For each line we:   1. Find the LAST n, Try to decode the last 1-3 chars in result_list as cp1252 mojibake ending     i, Fix every bare '"' inside raw value content. (+2 more)

### Community 84 - "Community 84"
Cohesion: 0.20
Nodes (9): AI-SOC Currency Selector Implementation Plan, Global Constraints, Plan self-review, Task 1: Create the shared currency module, Task 2: Make `CurrencySelector` use the shared currency list, Task 3: Add currency state to the AI-SOC landing page, Task 4: Update `Pricing.jsx` to render prices in the selected currency, Task 5: Deprecate `src/lib/kzt.js` without breaking `PricingSection.jsx` (+1 more)

### Community 85 - "Community 85"
Cohesion: 0.20
Nodes (9): AI-SOC Legal Entity Selector Implementation Plan, Global Constraints, Plan self-review, Task 1: Create the Kazakhstan legal entity details component, Task 2: Create the legal entity selector component, Task 3: Extract English terms into a reusable component and add selector slot to both terms components, Task 4: Create the client wrapper that wires selector and entity switching, Task 5: Update the localized route to use the wrapper (+1 more)

### Community 86 - "Community 86"
Cohesion: 0.20
Nodes (9): Glass Readability + BorderGlow Hover + iOS-Style Header Pill — Implementation Plan, Global Constraints, Self-Review Notes, Task 1: Glass recipe tokens + global card class upgrades, Task 2: BorderGlow hover effect inside EdgeGlowCard, Task 3: Header frosted pill on scroll, Task 4: Targeted readability swaps in non-wrapper card content, Task 5: DESIGN.md addendum (+1 more)

### Community 87 - "Community 87"
Cohesion: 0.29
Nodes (6): description, icons, manifest_version, name, update_url, version

### Community 88 - "Community 88"
Cohesion: 0.38
Nodes (5): createPreview(), createVignette(), framesDirectory, processFrame(), projectRoot

### Community 89 - "Community 89"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 90 - "Community 90"
Cohesion: 0.40
Nodes (4): __dirname, __filename, nextConfig, withNextIntl

### Community 91 - "Community 91"
Cohesion: 0.40
Nodes (4): is_preloaded, manifest_version, name, version

### Community 92 - "Community 92"
Cohesion: 0.40
Nodes (4): manifest_version, name, pre_installed, version

### Community 93 - "Community 93"
Cohesion: 0.40
Nodes (4): manifest_version, name, pre_installed, version

### Community 94 - "Community 94"
Cohesion: 0.40
Nodes (4): dependencies, playwright, name, version

### Community 95 - "Community 95"
Cohesion: 0.40
Nodes (4): files, fs, localesDir, path

### Community 96 - "Community 96"
Cohesion: 0.50
Nodes (3): compilerOptions, paths, @/*

### Community 97 - "Community 97"
Cohesion: 0.50
Nodes (3): manifest_version, name, version

## Knowledge Gaps
- **330 isolated node(s):** `manifest_version`, `name`, `version`, `is_preloaded`, `name` (+325 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLanguage()` connect `Community 8` to `Community 0`, `Community 2`, `Community 3`, `Community 5`, `Community 9`, `Community 10`, `Community 11`, `Community 76`, `Community 14`, `Community 20`, `Community 22`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 15` to `Community 2`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Are the 42 inferred relationships involving `useLanguage()` (e.g. with `BadRequestPage()` and `NotFound()`) actually correct?**
  _`useLanguage()` has 42 INFERRED edges - model-reasoned connections that need verification._
- **What connects `manifest_version`, `name`, `version` to the rest of the system?**
  _334 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0953058321479374 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06282051282051282 - nodes in this community are weakly interconnected._