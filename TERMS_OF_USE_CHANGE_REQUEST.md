# Web Security Terms of Use change request

Handoff for the agent editing the **live AI-CSD 1 Web Security & Traffic Management Terms of Use**. Apply this to the Web Security page, not the separate Email Security policies. This file is a task list; do not publish this Markdown file or edit the repository's `terms-of-use.md`, `policy.md`, or application code as part of this handoff. Read the separate `TERMS_OF_SERVICE_CHANGE_REQUEST.md` because the Terms of Use and Terms of Service must agree.

The provider has confirmed the company, domain, intended hosting, payment, and commercial arrangements below. A claim about an *operating* checkout, automatic charge, allowance, retention control, or deployment must be checked against the live service before publication.

## Task 1 — Create the Kazakhstan and UAE policy versions

Replace the single UAE-wide identity in Sections 1.1, 14, and 16 with a jurisdiction selector for the applicable **Web Security** agreement. The selector must route to distinct policy versions based on the customer's actual contracting entity and deployment, not merely the visitor's IP address or chosen language.

- **Kazakhstan version: Russian only**, subject to the language-law check below. Use the provider-supplied entity details:
  - Наименование организации: ТОО "Silence AI"
  - БИН: 250840004804
  - Адрес: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, ​Проспект Ракымжан Кошкарбаев, 10/1, ​G-3 блок; D6 этаж
  - ФИО руководителя: ЗЕЙНУЛЛА РШЫМАН
- **UAE version: English only.** Use the provider-supplied entity details:
  - Company name: "Silence AI" LLC
  - Licence Number: 2539365.01
  - Registered Address: Shams Business Center, Shorjoh Media City Free Zone, Al Messaned, Sharjah, UAE.
- Verify the legal names, licence/BIN, director, and addresses against registration documents. In particular, confirm whether the UAE registered address says **Shorjoh** or **Sharjah Media City** before publication.
- Replace the blanket UAE-law and UAE-forum clauses in Sections 14.1–14.2 with provisions appropriate to the contracting entity and consistent with the corresponding Terms of Service. Do not claim that choosing UAE contract law displaces mandatory privacy or consumer law that otherwise applies. If Kazakhstan customers include consumers, assess whether Russian-only publication meets the [Kazakhstan consumer-information language requirements](https://old.adilet.zan.kz/eng/docs/Z100000274_); supply any legally required Kazakh information.

## Task 2 — Define the covered service and regional console domains

Replace Section 1.3's old `web-soc.silenceai.net` domain and its rule that services on other domains are outside these Terms.

- Kazakhstan Web Security console: `https://kz.web.csd.silenceai.net`.
- UAE Web Security console: `https://web.csd.silenceai.net`.
- In each deployment the console provides the customer with the IP address used to connect or configure the agent/active protection mechanism for the customer's protected sites. The applicable IP may vary by deployment or customer; do not hard-code a single protection IP into the policy.
- Define the covered Web Security service by **function**: the CMC console and incident/log views, supplied agent and active reverse-proxy/WAF protection, related APIs, configuration, telemetry, and support included under the applicable order or subscription. A covered proxy, API, customer site, or agent endpoint does not fall outside these Terms merely because it uses another hostname or IP.
- Identify the separately deployed authentication/SSO portal and its actual operator and domain. Explain which terms/privacy notice govern that portal and how those documents relate to access to Web Security. Do not assert that the portal has separate customer terms until verified. Keep Email Security outside this Web Security policy.
- Review Section 2.1's absolute claim that the agent forwards **only legitimate requests** and all traffic. Describe the protection offered accurately without implying that every malicious request is stopped. Verify specific DDoS, country-control, and port-restriction claims against the deployed product.

## Task 3 — Correct the mandatory subscription, included usage, and overage model

Replace Section 6.1's statement that users activate the product for free and pay **only** for actual usage, and update Section 2.3 and every other pricing reference. A customer must purchase a subscription; pay-as-you-go is **only an overage mechanism**, not a standalone plan. Use the provider's supplied pricing screen and align the Terms of Use with the order/service plan, Terms of Service, pricing page, and billing implementation:

- Monthly subscription: **USD 420 per month**. This is the amount implied by the supplied screen's annual USD 4,200 price and its “2 months free / save USD 840 per year” comparison; confirm the intended monthly checkout price before publishing.
- Annual subscription: **USD 4,200 billed annually**, displayed as **USD 350 per month equivalent**.
- Included each month: **10 million legitimate requests** and **25 GB of SIEM log storage**. WAF, IPS, DDoS protection, and SIEM are included in the base subscription.
- After the relevant included monthly amount is exhausted: **USD 1.00 per additional 1 million legitimate requests** and **USD 0.50 per additional GB of SIEM log storage per month**. **Blocked malicious traffic carries no request fee.** Specify the measurement, billing-period reset, rounding, and overage display consistently with the final pricing schedule; do not invent additional rates or limits.
- Charge actual overages against the customer's prepaid internal WebSOC balance. The customer can add funds manually. Automatic top-up is optional: the customer selects a balance trigger and a top-up amount, currently with a **USD 10.00 minimum top-up**. A top-up is an unscheduled, threshold-triggered payment, not a recurring subscription-card charge. Explain the customer's authorization, ability to disable or change it, and the handling of failed payments or required authentication in the controlling billing terms.
- Distinguish the possible renewal of a subscription term from authorization to charge a card. Do not promise periodic card charges for subscription fees or automatic wallet top-ups unless the relevant provider and live checkout actually support them.
- Replace Section 2.3's generic AI-SOC pricing link with the correct live **Web Security** pricing or plan schedule and make price-change notice consistent with the Terms of Service. The currently published [AI-SOC page](https://www.silenceai.net/en/ai-soc/) has described Web Security as pay-as-you-go; reconcile it before pointing customers to it as the authoritative schedule.

**Publication gate:** The current repository contains manual Stripe wallet top-ups and direct wallet debits for usage. The reviewed code does not yet show a subscription allowance before overage debits or a completed automatic saved-card top-up. Do not describe those planned capabilities as already working until the separate implementation and live payment flow are verified. This handoff does not authorize code changes.

## Task 4 — Name the correct payment parties for each version

- Kazakhstan customers contracting with **ТОО "Silence AI"**: payments are intended to be handled by **АО «Банк ЦентрКредит»**. Describe the bank's actual payment role and link its applicable buyer/privacy information where available. Do not call it the Web Security seller or automatically call it a data processor.
- Customers contracting with **"Silence AI" LLC**: checkout and payment collection are intended to use **Paddle**. Paddle describes itself as an authorized reseller and **merchant of record**, not merely a card gateway. Distinguish Paddle's purchase transaction and [Buyer Terms](https://www.paddle.com/legal/buyer-terms) from Silence AI's Web Security service agreement; link Paddle's [privacy notice](https://www.paddle.com/legal/privacy) at the payment step.
- Paddle's buyer-facing entity depends on **buyer location**: Paddle.com Inc. for US buyers, Paddle.com (Canada) Ltd. for Canadian buyers, and Paddle.com Market Limited (England and Wales, company number 8172165; 30 Old Bailey, London, EC4M 7AU, UK) for other buyers under its current Buyer Terms. Do not say every UAE-company customer purchases from the UK entity. Paddle's transaction terms do not replace the Silence AI–customer service-law clause.
- The repository currently uses **Stripe** and contains no Paddle or Bank CenterCredit integration. Confirm the live regional checkout and invoice issuer before describing either intended provider in present-tense customer terms. Align refunds, taxes, wallet funding, and payment-support references with the actual seller/payment arrangement.

## Task 5 — Keep the confirmed SLA in one place

Replace Section 3.1's separate promise to refund pay-as-you-go charges during downtime with a clear reference to the **confirmed SLA in Terms of Service Section 6.7**. Do not change that SLA in this task. Section 3.3's maintenance exception must match the defined exclusions and claim process in Section 6.7. Do not create a second, inconsistent remedy or calculation in the Terms of Use.

## Task 6 — Align activation, acceptable use, and document hierarchy

- Rewrite Sections 6.1–6.2 around the actual subscription purchase/onboarding flow. The current promise of an “Activate” popup showing every policy was not verified in this repository. State when each policy is presented and accepted only after checking the live web and SSO flows. Remove a free-trial promise unless a free trial actually exists.
- Keep concrete acceptable-use restrictions in Section 4, including authorization to protect or test a site. Do not forbid the service's own documented APIs or approved automation through an unqualified automated-tools ban.
- Remove the duplicate Privacy Policy references in Sections 5.1 and 8.1. Link the applicable regional Privacy Policy and Cookie Policy, and refer to the data-processing terms in the applicable Terms of Service rather than attempting to replace the DPA here.
- Rewrite Section 17.2 so “entire agreement” does not exclude the applicable Terms of Service, order/service plan, and DPA. State a clear priority rule if documents conflict. A Privacy Policy is a notice about processing; do not use the Terms of Use to silently override mandatory data-subject rights.
- Align Section 10's liability cap/exclusions, Section 12's termination wording, Section 13's indemnity, Section 14's dispute forum, and Section 15's change procedure with the corresponding regional Terms of Service. Closing an account must not be described as cancelling already incurred fees or bypassing an agreed subscription term. Remove the indeterminate “binding arbitration or courts” alternative unless a complete, agreed arbitration process is actually intended.

## Task 7 — Check publication

- Apply changes only to the live **Web Security Terms of Use**, in the Kazakhstan/Russian and UAE/English versions. Verify the actual URLs, the selector, the correct contracting entity, all policy/pricing links, cross-references, headings, and numbering (the current draft skips Sections 2.2 and 3.2).
- Confirm `info@silenceai.net` is the correct legal notice/support address for both entities, or provide the actual regional contacts.
- Verify the live service, checkout, storage, and onboarding facts before changing a planned statement into a present-tense promise. Keep the Terms of Use consistent with the separate Terms of Service and Privacy Policy handoffs.

## Primary references

- [Kazakhstan consumer-protection law](https://old.adilet.zan.kz/eng/docs/Z100000274_)
- [Kazakhstan personal-data law](https://old.adilet.zan.kz/rus/docs/Z1300000094)
- [UAE Federal Personal Data Protection Law](https://www.uaelegislation.gov.ae/en/legislations/1972/download)
- [Paddle Buyer Terms](https://www.paddle.com/legal/buyer-terms) and [Privacy Notice](https://www.paddle.com/legal/privacy)
