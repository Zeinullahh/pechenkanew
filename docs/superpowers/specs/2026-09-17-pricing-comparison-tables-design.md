# Pricing Comparison Tables + Web Security Features Update — Design

Date: 2026-09-17
Status: Approved by user

## Goal

Update the pricing section of the Next.js site:

1. Replace the content of both competitive comparison tables (AI-CSD Email, AI-CSD Web) with the new content from the user's attached slides.
2. Add two new capability descriptions to the AI-CSD Web Security plan: the AI manager and the optimized behavioral CAPTCHA.

## Decisions (confirmed with user)

- Keep the site's current glass/blue table styling; update content only. Switch boolean cell marks from `+`/`−` to `✓`/`✗`.
- AI manager + CAPTCHA go in the Web Security plan's "Everything included in one plan" feature list only — NOT as extra comparison-table rows. The comparison tables match the slides exactly.
- New feature strings are translated into all 9 locales (en, de, fr, ja, ko, ru, tr, zh, ar). Comparison tables remain hardcoded English, matching the existing pattern in `competitiveComparison.js`.

## Changes

### 1. `src/lib/competitiveComparison.js` — full data rewrite

**Email table**
- Title: `AI-CSD Email vs. alternatives`
- Columns: `Feature`, `AI-CSD Email`, `Outlook / Gmail`, `FortiMail`
- Rows:
  | Feature | AI-CSD Email | Outlook / Gmail | FortiMail |
  |---|---|---|---|
  | View all emails across the domain from an Admin Console | ✓ | ✗ | ✓ |
  | Admin can delete employees' emails | ✓ | ✗ | ✗ |
  | Active protection against all types of email attacks | ✓ | ✗ | ✓ |
  | AI that manually checks the emails for phishing | ✓ | ✗ | ✓ |
  | AI forwards emails, sends them to specific folder, replies/makes response-draft to emails | ✓ | ✗ | ✗ |
  | Secure setup completion time | 5 min | 5 min | 1–3 days |

**Web table**
- Title: `AI-CSD Web vs. alternatives`
- Columns: `Feature`, `AI-CSD Web`, `Cloudflare 200/mo`, `AWS WAF`
- Rows:
  | Feature | AI-CSD Web | Cloudflare 200/mo | AWS WAF |
  |---|---|---|---|
  | AI-powered behavioral analysis for web attack protection | ✓ | ✗ | Not included |
  | Protection against DDoS attacks | ✓ | weak | ✗ |
  | Cybersecurity reports on blacklisted subnets & IPs | ✓ | ✗ | ✗ |
  | Country blocking | ✓ | Requires cybersecurity knowledge | Requires cybersecurity knowledge |
  | Setup time (no cybersec knowledge needed) | 5 min | 5 min | 1 day |

Booleans keep the existing `[true, false, ...]` cell representation; strings stay strings.

### 2. `src/components/Pricing.jsx` — `ProductComparison` boolean marks (line ~438)

Render `true` as `✓` (emerald) and `false` as `✗` (rose) instead of `+`/`−`. No other styling changes.

### 3. `src/components/Pricing.jsx` — `webPlans` features (lines ~700-707)

Add two entries after `port`:

- `t("pricing.plans.globalShield.features.aiManager", "AI manager: shows security reports and executes your orders — tell it to blacklist a range of IP addresses and it adds them by itself")`
- `t("pricing.plans.globalShield.features.captcha", "Behavioral CAPTCHA 200× more optimized than reCAPTCHA — AI tracks user behavior and shows a Cloudflare Turnstile-style check only when a bot is detected")`

### 4. Locale files — add the two keys under `pricing.plans.globalShield.features`

Files: `src/locales/{en,de,fr,ja,ko,ru,tr,zh,ar}.json`. Keys: `aiManager`, `captcha`, translated per locale.

## Error handling / edge cases

- None beyond existing behavior: `ProductComparison` returns null for unknown product types; missing locale keys fall back to the English fallback string in `t()`.
- Long cell strings (`Requires cybersecurity knowledge`) already render as text in the existing layout; table keeps `min-w-[860px]` horizontal scroll on small screens.

## Testing

- No test suite exists in the project; verification is `npm run build` (or lint) + manual visual check of the pricing section for both Email and Web tabs.
