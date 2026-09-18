# Pricing Comparison Tables + Web Security Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the pricing section's AI-CSD Email / AI-CSD Web comparison tables with new content, switch boolean marks to ✓/✗, and add AI manager + behavioral CAPTCHA features to the Web Security plan in all 9 locales.

**Architecture:** Comparison table content lives in `src/lib/competitiveComparison.js` (hardcoded English by design) and is rendered by `ProductComparison` in `src/components/Pricing.jsx`. Web plan features are i18n keys under `pricing.plans.globalShield.features.*` with English fallbacks inline in `Pricing.jsx` and translations in `src/locales/*.json`.

**Tech Stack:** Next.js (App Router, static export), React, Tailwind, custom `useLanguage().t(key, fallback)` i18n. No test suite — verification is lint + JSON validation + `npm run build` + visual check.

**Spec:** `docs/superpowers/specs/2026-09-17-pricing-comparison-tables-design.md`

## Global Constraints

- Do NOT restyle the tables — keep the existing glass/blue design. Only content changes, plus `+`/`−` → `✓`/`✗` marks.
- Do NOT add comparison-table rows for AI manager/CAPTCHA — they go in the Web plan features list only.
- Comparison tables stay hardcoded English (existing pattern); only the two new Web plan feature keys get translations.
- The project has NO test runner — do not create test files. Verify with `npx eslint`, `node -e` JSON parsing, and `npm run build`.
- `src/components/Pricing.jsx` has mixed line endings (some lines end with a lone `\r`). Preserve whatever endings surround an edit; match the Read output exactly.
- JSON locale edits must keep the `pricing.plans.globalShield.features` object shape; each file has exactly ONE `"port":` line, which is the anchor.

---

### Task 1: Rewrite comparison table data

**Files:**
- Modify: `src/lib/competitiveComparison.js` (full replacement, 25 lines → 27 lines)

**Interfaces:**
- Consumes: nothing (leaf data module)
- Produces: `competitiveComparisons = { web: { title, columns, rows }, email: { title, columns, rows } }` — `columns: string[]`, `rows: [string, (boolean|string)[]][]`. Consumed by `ProductComparison` in `src/components/Pricing.jsx:397`.

- [ ] **Step 1: Replace the file content**

Write `src/lib/competitiveComparison.js` with exactly:

```js
export const competitiveComparisons = {
  web: {
    title: "AI-CSD Web vs. alternatives",
    columns: ["Feature", "AI-CSD Web", "Cloudflare 200/mo", "AWS WAF"],
    rows: [
      ["AI-powered behavioral analysis for web attack protection", [true, false, "Not included"]],
      ["Protection against DDoS attacks", [true, "weak", false]],
      ["Cybersecurity reports on blacklisted subnets & IPs", [true, false, false]],
      ["Country blocking", [true, "Requires cybersecurity knowledge", "Requires cybersecurity knowledge"]],
      ["Setup time (no cybersec knowledge needed)", ["5 min", "5 min", "1 day"]],
    ],
  },
  email: {
    title: "AI-CSD Email vs. alternatives",
    columns: ["Feature", "AI-CSD Email", "Outlook / Gmail", "FortiMail"],
    rows: [
      ["View all emails across the domain from an Admin Console", [true, false, true]],
      ["Admin can delete employees' emails", [true, false, false]],
      ["Active protection against all types of email attacks", [true, false, true]],
      ["AI that manually checks the emails for phishing", [true, false, true]],
      ["AI forwards emails, sends them to specific folder, replies/makes response-draft to emails", [true, false, false]],
      ["Secure setup completion time", ["5 min", "5 min", "1–3 days"]],
    ],
  },
};
```

Note: `1–3 days` uses an en dash (–), matching the slide.

- [ ] **Step 2: Verify syntax**

Run: `node --check src/lib/competitiveComparison.js`
Expected: no output, exit 0 (file uses ESM `export` — if `node --check` rejects it, run `npx eslint src/lib/competitiveComparison.js` instead; expected: no errors).

- [ ] **Step 3: Commit**

```bash
git add src/lib/competitiveComparison.js
git commit -m "feat(pricing): update AI-CSD comparison tables content"
```

---

### Task 2: Switch boolean marks to ✓/✗ in ProductComparison

**Files:**
- Modify: `src/components/Pricing.jsx:438`

**Interfaces:**
- Consumes: `competitiveComparisons` from Task 1 (boolean cells)
- Produces: unchanged component signature `ProductComparison({ productType })`

- [ ] **Step 1: Edit the boolean cell render**

In `src/components/Pricing.jsx`, find (inside `ProductComparison`):

```jsx
{typeof value === "boolean" ? <span className={`text-2xl font-semibold ${value ? "text-emerald-400" : "text-rose-400"}`}>{value ? "+" : "−"}</span> : value}
```

Replace with:

```jsx
{typeof value === "boolean" ? <span className={`text-2xl font-semibold ${value ? "text-emerald-400" : "text-rose-400"}`}>{value ? "✓" : "✗"}</span> : value}
```

- [ ] **Step 2: Lint**

Run: `npx eslint src/components/Pricing.jsx`
Expected: no errors (pre-existing warnings acceptable)

- [ ] **Step 3: Commit**

```bash
git add src/components/Pricing.jsx
git commit -m "feat(pricing): use check/cross marks in comparison tables"
```

---

### Task 3: Add AI manager + CAPTCHA to Web plan features

**Files:**
- Modify: `src/components/Pricing.jsx:696-710` (`webPlans` memo)

**Interfaces:**
- Consumes: `t()` from `useLanguage()`, `calendlyFeature`
- Produces: two new i18n keys consumed by locale files in Task 4:
  - `pricing.plans.globalShield.features.aiManager`
  - `pricing.plans.globalShield.features.captcha`

- [ ] **Step 1: Add the two feature entries**

In `src/components/Pricing.jsx`, in the `webPlans` memo, find:

```jsx
        t("pricing.plans.globalShield.features.port", "Port closing:"),
      ],
```

Replace with:

```jsx
        t("pricing.plans.globalShield.features.port", "Port closing:"),
        t("pricing.plans.globalShield.features.aiManager", "AI manager: shows security reports and executes your orders — tell it to blacklist a range of IP addresses and it adds them by itself"),
        t("pricing.plans.globalShield.features.captcha", "Behavioral CAPTCHA 200× more optimized than reCAPTCHA — AI tracks user behavior and shows a Cloudflare Turnstile-style check only when a bot is detected"),
      ],
```

(The feature card renderer strips a trailing `:` via `.replace(/:$/, "")`, so colons are cosmetic here.)

- [ ] **Step 2: Lint**

Run: `npx eslint src/components/Pricing.jsx`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Pricing.jsx
git commit -m "feat(pricing): add AI manager and behavioral CAPTCHA to web plan features"
```

---

### Task 4: Translate the two new keys into all 9 locales

**Files:**
- Modify: `src/locales/en.json` (line ~1668, anchor `"port": "Port closing:"`)
- Modify: `src/locales/de.json` (line ~409, anchor `"port": "Port-Schließfunktion"`)
- Modify: `src/locales/fr.json` (line ~409, anchor `"port": "Fonctionnalité de fermeture de ports"`)
- Modify: `src/locales/ru.json` (line ~394, anchor `"port": "Закрытие портов:"`)
- Modify: `src/locales/ja.json` (line ~401, anchor `"port": "ポート遮断機能"`)
- Modify: `src/locales/ko.json` (line ~416, anchor `"port": "포트 차단 기능"`)
- Modify: `src/locales/tr.json` (line ~406, anchor `"port": "Port kapatma özelliği"`)
- Modify: `src/locales/zh.json` (line ~386, anchor `"port": "关闭端口功能"`)
- Modify: `src/locales/ar.json` (line ~339, anchor `"port": "ميزة إغلاق المنافذ"`)

**Interfaces:**
- Consumes: keys `pricing.plans.globalShield.features.aiManager` / `.captcha` from Task 3
- Produces: those keys present in every locale under `pricing.plans.globalShield.features`

Each edit appends two lines after the `"port"` line (each `"port":` string occurs exactly once per file). Indentation is 10 spaces, matching the surrounding keys.

- [ ] **Step 1: en.json**

```json
          "port": "Port closing:",
          "aiManager": "AI manager: shows security reports and executes your orders — tell it to blacklist a range of IP addresses and it adds them by itself",
          "captcha": "Behavioral CAPTCHA 200× more optimized than reCAPTCHA — AI tracks user behavior and shows a Cloudflare Turnstile-style check only when a bot is detected"
```

- [ ] **Step 2: de.json**

```json
          "port": "Port-Schließfunktion",
          "aiManager": "KI-Manager: zeigt Sicherheitsberichte und führt Ihre Anweisungen aus — sagen Sie ihm, einen IP-Adressbereich zu sperren, und er fügt ihn selbst zur Blacklist hinzu",
          "captcha": "Behaviorales CAPTCHA, 200× optimierter als reCAPTCHA — die KI verfolgt das Nutzerverhalten und zeigt eine Prüfung im Stil von Cloudflare Turnstile nur, wenn ein Bot erkannt wird"
```

- [ ] **Step 3: fr.json**

```json
          "port": "Fonctionnalité de fermeture de ports",
          "aiManager": "Gestionnaire IA : affiche les rapports de sécurité et exécute vos ordres — demandez-lui de blacklister une plage d'adresses IP et il les ajoute lui-même",
          "captcha": "CAPTCHA comportemental 200× plus optimisé que reCAPTCHA — l'IA suit le comportement de l'utilisateur et n'affiche une vérification de type Cloudflare Turnstile que lorsqu'un bot est détecté"
```

- [ ] **Step 4: ru.json**

```json
          "port": "Закрытие портов:",
          "aiManager": "ИИ-менеджер: показывает отчёты по безопасности и выполняет ваши поручения — скажите ему внести диапазон IP-адресов в чёрный список, и он добавит их сам",
          "captcha": "Поведенческая CAPTCHA, в 200 раз более оптимизированная, чем reCAPTCHA — ИИ отслеживает поведение пользователя и показывает проверку в стиле Cloudflare Turnstile только при обнаружении бота"
```

- [ ] **Step 5: ja.json**

```json
          "port": "ポート遮断機能",
          "aiManager": "AIマネージャー:セキュリティレポートを表示し、指示を実行します — IPアドレス範囲のブラックリスト登録を指示すれば、自動で追加します",
          "captcha": "reCAPTCHAより200倍最適化された行動CAPTCHA — AIがユーザーの行動を追跡し、ボットを検出した場合のみCloudflare Turnstile風のチェックを表示します"
```

- [ ] **Step 6: ko.json**

```json
          "port": "포트 차단 기능",
          "aiManager": "AI 매니저: 보안 보고서를 표시하고 명령을 실행합니다 — 특정 IP 주소 범위를 블랙리스트에 추가하라고 하면 스스로 추가합니다",
          "captcha": "reCAPTCHA보다 200배 더 최적화된 행동 기반 CAPTCHA — AI가 사용자 행동을 추적하고 봇이 감지될 때만 Cloudflare Turnstile 스타일의 확인을 표시합니다"
```

- [ ] **Step 7: tr.json**

```json
          "port": "Port kapatma özelliği",
          "aiManager": "AI yöneticisi: güvenlik raporlarını gösterir ve talimatlarınızı yerine getirir — bir IP adresi aralığını kara listeye almasını söyleyin, kendisi ekler",
          "captcha": "reCAPTCHA'dan 200 kat daha optimize davranışsal CAPTCHA — AI kullanıcı davranışını izler ve yalnızca bot algılandığında Cloudflare Turnstile benzeri bir doğrulama gösterir"
```

- [ ] **Step 8: zh.json**

```json
          "port": "关闭端口功能",
          "aiManager": "AI管理器:显示安全报告并执行您的指令——告诉它将某个IP地址段加入黑名单,它会自行完成添加",
          "captcha": "行为验证码,比reCAPTCHA优化200倍以上——AI跟踪用户行为,仅在检测到机器人时显示类似Cloudflare Turnstile的验证"
```

- [ ] **Step 9: ar.json**

```json
          "port": "ميزة إغلاق المنافذ",
          "aiManager": "مدير الذكاء الاصطناعي: يعرض تقارير الأمان وينفذ أوامرك — اطلب منه إدراج نطاق من عناوين IP في القائمة السوداء وسيضيفها بنفسه",
          "captcha": "CAPTCHA سلوكية أكثر تحسينًا بـ200 مرة من reCAPTCHA — يتتبع الذكاء الاصطناعي سلوك المستخدم ويعرض تحققًا بأسلوب Cloudflare Turnstile فقط عند اكتشاف روبوت"
```

- [ ] **Step 10: Validate all locale JSON files parse**

Run:

```bash
for f in src/locales/en.json src/locales/de.json src/locales/fr.json src/locales/ru.json src/locales/ja.json src/locales/ko.json src/locales/tr.json src/locales/zh.json src/locales/ar.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" && echo "OK $f"; done
```

Expected: `OK` printed for all 9 files.

- [ ] **Step 11: Verify keys landed**

Run:

```bash
grep -c '"aiManager"' src/locales/*.json
```

Expected: `1` for each of the 9 files.

- [ ] **Step 12: Commit**

```bash
git add src/locales/
git commit -m "feat(i18n): translate AI manager and CAPTCHA web features into 9 locales"
```

---

### Task 5: Full build verification

**Files:** none modified

- [ ] **Step 1: Lint the touched sources**

Run: `npx eslint src/components/Pricing.jsx src/lib/competitiveComparison.js`
Expected: no errors

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build completes successfully (exit 0), static export generated in `out/`

- [ ] **Step 3: Visual check (manual, reported back)**

Run `npm run dev`, open the pricing section, switch between Email Security / Web Security tabs, and confirm:
- Email table: 6 rows, columns "Feature / AI-CSD Email / Outlook / Gmail / FortiMail", ✓/✗ marks, last row "5 min / 5 min / 1–3 days"
- Web table: 5 rows, columns "Feature / AI-CSD Web / Cloudflare 200/mo / AWS WAF", "Not included", "weak", "Requires cybersecurity knowledge" cells, last row "5 min / 5 min / 1 day"
- Web plan features list shows the AI manager and CAPTCHA cards
- Switching language (e.g. RU) shows translated AI manager/CAPTCHA cards

---

## Self-Review Notes

- Spec coverage: §1 → Task 1; §2 → Task 2; §3 → Task 3; §4 → Task 4; verification → Task 5. No gaps.
- Placeholders: none — all code and translations are written out in full.
- Type consistency: `competitiveComparisons` shape `{ title, columns, rows }` matches the existing consumer at `Pricing.jsx:397-445`; cell values remain `boolean | string`; i18n key names `aiManager`/`captcha` identical in Task 3 and Task 4.
- TDD note: the project has no test runner, so per project convention no tests are added; verification is lint + JSON parse + build + visual check.
