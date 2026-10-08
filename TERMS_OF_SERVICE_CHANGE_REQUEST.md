# WebSOC Terms of Service change request

Apply these changes to the **live AI-CSD 1 Web Security & Traffic Management Terms of Service**, including its Data Processing Addendum (DPA). This file is a handoff for the agent that can edit the web version. Do not publish or edit the repository's `policy.md` as part of this handoff. Do not apply these instructions to the separate Email Security terms.

The provider has confirmed that customers can request relevant documentation and written answers at `info@silenceai.net`, and that the provider can arrange a confidential call or review redacted evidence. Customer-accessible Incidents logs are useful evidence, but they do not replace a legally required processor audit right.

## Task 1 — Replace DPA Section 12.11

Replace the current blanket refusal of on-site inspections with the following clause. Retain the protection against unrestricted access to source code, credentials, and other customers' information.

> **12.11 Compliance Information and Audits; No Certification Obligation:** Upon Controller's written request to info@silenceai.net, Processor will make available the information necessary to demonstrate compliance with Processor's obligations under this DPA. Processor may provide relevant documentation, written responses, redacted evidence, or a confidential call as appropriate to the request. Where the GDPR or another applicable data protection law requires an audit right, Processor will allow for and contribute to audits, including inspections, of the processing covered by this DPA conducted by Controller or an independent auditor mandated by Controller. The parties will cooperate in good faith to select an appropriate audit method, taking into account the information already supplied and relevant security concerns. Reasonable arrangements may address advance notice, scope, timing, confidentiality, auditor qualifications, and protection of other customers' data and system security, but will not prevent the effective exercise of a mandatory audit right. This DPA does not require Processor to obtain or maintain a particular external certification (such as SOC or ISO), and it grants no general right to source code, internal credentials, or unrestricted access to systems or information concerning other customers.

## Task 2 — Update the last sentence of DPA Section 12.12

Keep the existing first two sentences on liability and order of precedence. Replace only its final sentence, `Nothing in this DPA expands Processor obligations beyond the Agreement.`, with:

> Nothing in this DPA limits an obligation that cannot be excluded or restricted under applicable data protection law.

This avoids reading Section 12.12 as overriding the audit right in revised Section 12.11 or other mandatory privacy-law obligations.

## Task 3 — Separate the Kazakhstan and UAE policy tracks

Add an explicit **jurisdiction selector** for the Web Security policies with exactly two options: **Kazakhstan** and **UAE**. The selector must lead to distinct policy versions and identify the relevant contracting company and data-hosting region. Do not treat the language choice alone, a visitor's IP address, or the URL locale as proof of which company contracted with the customer. The selected version must match the customer's actual order or service agreement and deployment region.

### Kazakhstan option

- Publish the Kazakhstan policy version in **Russian only**, subject to the language-law check below. Identify the contracting entity with the following details supplied by the provider:
  - Наименование организации: ТОО "Silence AI"
  - БИН: 250840004804
  - Адрес: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, ​Проспект Ракымжан Кошкарбаев, 10/1, ​G-3 блок; D6 этаж
  - ФИО руководителя: ЗЕЙНУЛЛА РШЫМАН
- State that the **Kazakhstan customer deployment's servers are located in Kazakhstan**. Identify the actual scope of that statement: production databases, raw and structured logs, backups, object storage, support access, authentication, payment processing, AI integrations, and subprocessors must be checked separately before saying that *all* customer personal data remains in Kazakhstan.
- Adapt the contracting-party, address, notices, governing-law/forum, DPA parties, data-location, and international-transfer clauses throughout the Kazakhstan version so they refer consistently to the Kazakhstan entity and the actual deployment. Do not leave the UAE entity or Sharjah courts as the Kazakhstan default. Obtain Kazakhstan legal review of the final governing-law/forum wording and cross-border-transfer disclosures.
- **Language-law check:** the provider requests a Russian-only Kazakhstan policy. Before publishing it as the sole customer-facing version, determine whether Kazakhstan law requires any Kazakh-language service or purchase information for the customers actually served. If the service is offered to consumers and bilingual information is required, meet that requirement; do not represent Russian-only publication as automatically compliant.

### UAE option

- Publish the UAE policy version in **English only**. Identify the contracting entity with the following details supplied by the provider:
  - Company name: "Silence AI" LLC
  - Licence Number: 2539365.01
  - Registered Address: Shams Business Center, Shorjoh Media City Free Zone, Al Messaned, Sharjah, UAE.
- Disclose that **UAE customer deployments use servers in the United States or Europe**, with the actual hosting country/region stated in the order, service plan, or a linked data-location schedule. Do not imply that every UAE customer uses both regions or that the customer can choose a region unless that choice is actually offered. Distinguish server hosting from any other locations where personal data is stored, backed up, accessed, or sent to subprocessors.
- Keep the UAE contracting-party, address, notices, governing-law/forum, DPA parties, hosting-location, and international-transfer wording consistent throughout this version. Review the applicable UAE cross-border-transfer requirements for any personal data leaving the UAE.

### Shared publication checks

- Confirm the supplied legal-entity details against official registration documents before publication. In particular, the supplied UAE address says **"Shorjoh Media City"** while the current draft says **"Sharjah Media City"**; use the registered spelling.
- A contractual jurisdiction selector does **not** exclude mandatory privacy laws applicable to a processing activity. Keep privacy-law applicability, processor duties, and transfer mechanisms separate from the contract's governing-law/forum clause.
- Do not use a blanket claim that Kazakhstan data never leaves Kazakhstan or that UAE data always stays in the United States/Europe until the actual authentication, Stripe, AI, support, backup, and subprocessor flows have been confirmed. Where there are transfers, disclose them accurately and use the applicable legal mechanism.

## Task 4 — Disclose the payment provider for each policy track

Update the billing, checkout, payment-data, refund, and third-party-service wording in the **two separate Web Security policy versions**. These are provider-supplied intended payment arrangements; confirm that each is active for the relevant customer group before describing it as the current checkout method.

### Kazakhstan customers

- State in the Russian-language Kazakhstan version that payments for customers contracting with **ТОО "Silence AI"** are handled through **АО «Банк ЦентрКредит»**. Identify the bank as the payment-services provider; do not automatically call it a GDPR-style *data processor* or the seller of the WebSOC service.
- Describe accurately which billing or payment information the Kazakhstan company and the bank each receive, with links to the bank's applicable payment and privacy terms if available. Check any card-network, fraud-service, or other transfers before claiming that payment information remains entirely in Kazakhstan.

### Customers contracting with the UAE company

- State in the English-language UAE version that **Paddle** handles checkout, billing, and payment collection for sales made through Paddle. Paddle describes itself as an **authorized reseller and merchant of record** for those transactions; the WebSOC service itself remains provided under the applicable Silence AI service agreement. Reflect the actual checkout and invoicing arrangement in the billing, tax, refund, and cancellation clauses instead of describing Paddle solely as a card processor.
- Paddle's current buyer terms identify the buyer-facing Paddle entity by the **buyer's location**: **Paddle.com Inc.** for US buyers; **Paddle.com (Canada) Ltd.** for Canadian buyers; and **Paddle.com Market Limited** (England and Wales, company number **8172165**, registered office **30 Old Bailey, London, EC4M 7AU, UK**) for buyers elsewhere. Do not say that all UAE-company customers contract with a UK Paddle entity. Link to Paddle's current [Buyer Terms](https://www.paddle.com/legal/buyer-terms) and [Privacy Notice](https://www.paddle.com/legal/privacy) where the customer is directed to pay.
- Paddle's buyer terms apply to the **purchase transaction** separately from Silence AI's service terms. They state English law and, for business buyers, English courts by default, with country-specific exceptions (including US and Quebec provisions). Do not replace the Silence AI–customer governing-law clause with Paddle's transaction terms; explain the separate roles where necessary.
- Paddle's privacy notice identifies relevant Paddle companies as personal-data **controllers** for their own payment activities. Do not list Paddle automatically as a mere subprocessor under the WebSOC log-processing DPA; assess and describe the correct privacy roles and data sharing in the privacy notice or payment-data section.
- Paddle's involvement does not prove that WebSOC service data is hosted in the UK, US, or EU, nor that Paddle payment data stays in the WebSOC server region. Keep payment-data transfers distinct from the WebSOC hosting disclosure in Task 3.

### Consistency check

- The repository previously contained Stripe checkout code. This handoff changes **web legal content only**. The publisher must check the live payment flow before replacing any statement about the provider currently used; do not present a planned Paddle or Bank CenterCredit integration as already operating.

## Task 5 — Define the covered Web Security service and its regional domains

Replace the current Section 1.2 statement that the Terms apply exclusively to services accessible through `web-soc.silenceai.net`. Update Section 1.1 and any service definitions or cross-references as needed. A console hostname is an access point, not the boundary of the Web Security agreement.

- In the **Kazakhstan/Russian** version, identify `https://kz.web.csd.silenceai.net` as the Kazakhstan customer's Web Security console domain. State that the service provides customers with the IP address needed to connect or configure the agent/active protection mechanism for their protected sites. The agent, proxy, or protected customer sites may be reached through other IP addresses or domains without falling outside these Terms.
- In the **UAE/English** version, identify `https://web.csd.silenceai.net` as the UAE customer's Web Security console domain. Describe the same provision of the IP address for the agent/active protection mechanism. Do not assume the two deployments use the same IP address; the applicable IP is the one supplied for that customer's deployment.
- In both versions, define the covered **Web Security service** by function: the console and its incident/log views; the supplied agent and active edge/proxy or WAF protection; related service APIs, configuration, telemetry, and support supplied under the customer's subscription or order. State that coverage continues when a covered component or protected site uses another hostname, IP address, or endpoint. Align the DPA's processing description with this scope.
- Identify the separately deployed sign-in/SSO service and its actual portal domain in the published terms or a clear linked document. Explain how its applicable terms and privacy notice relate to Web Security access; do not imply that redirecting a user to the sign-in portal removes the Web Security provider's obligations for the subscribed service. Confirm the portal's legal operator and whether it truly has separate customer terms before linking to or claiming them.
- Describe the regional console domains and the supplied protection IP as **provider-supplied intended arrangements** until the live deployment and customer onboarding flow have been checked. Do not hard-code a particular protection IP in the Terms if it can change or vary by customer.

## Task 6 — Rewrite Section 6.3 for subscription allowances and wallet top-ups

Replace Section 6.3's description of automatic monthly/annual subscription card charges with the provider's intended billing model in **both regional policy versions**. Coordinate this task with Task 4's regional payment-provider wording, and review Sections 6.5, 6.6, 10.1, and any defined terms for inconsistent renewal, credit, payment, or cancellation language.

- A customer must obtain a **subscription** under the applicable order or service plan; standalone pay-as-you-go access is not an alternative plan. State the subscription fee, term, included usage allowance, how usage is measured, and applicable overage rates in the order, plan, or linked pricing schedule. Do not invent figures in the Terms.
- Once usage exceeds the subscription's included allowance, additional usage is charged on a **pay-as-you-go basis against the customer's prepaid WebSOC account balance**. Explain when the balance is debited, how charges are shown, and what happens if it is insufficient. Distinguish a subscription's possible renewal from an authorization to charge a card automatically; remove the current blanket promise of periodic subscription card billing if that is not how the subscription is collected.
- Customers may **manually add funds** to their internal balance. If they enable **automatic top-up**, they choose (i) a balance threshold and (ii) a top-up amount, with the currently intended minimum top-up amount of **USD 10.00**. When the balance reaches or falls below the chosen threshold, the authorized payment provider may charge the selected payment method for the chosen amount and credit the balance **only after successful payment**. Explain that the customer can change or disable automatic top-up, and state what happens if payment fails or extra authentication is required. Do not describe automatic top-up as a fixed recurring subscription payment.
- Ensure the checkout obtains clear consent for unscheduled threshold-triggered charges and accurately states the amount, trigger, payment method, and cancellation method. Apply the Kazakhstan bank and UAE Paddle arrangements from Task 4 according to what the live checkout actually supports.
- **Publication gate:** treat this as the provider's intended commercial model, not as a verified description of the current software. The code review found wallet settings, manual Stripe top-up, usage debiting, and a low-balance monitor, but **not** a working subscription allowance/overage boundary or completed automatic card charging. The policy publisher must confirm that the actual deployment and payment-provider integrations deliver the described behavior before presenting it as live; otherwise use accurate interim wording and flag the remaining implementation work to the separate developer.

### Code evidence for Task 6 (read-only review)

- `CMC/src/app/api/billing/settings/route.js` accepts an automatic top-up amount of at least USD 10 and a user-selected nonnegative threshold; `CMC/src/components/custom/billing_settings.jsx` exposes those settings. `CMC/prisma/schema.prisma` stores them and the wallet balance.
- `CMC/src/app/api/payment/route.js` creates one-time Stripe Checkout sessions for manual wallet additions; `CMC/src/lib/payment-topup.js` credits the wallet when a payment is finalized.
- `CMC/src/app/api/save-metrics/route.js` debits the wallet for measured traffic/requests directly. No subscription plan, included allowance, or switch to wallet billing only after allowance exhaustion was found in the reviewed code.
- `CMC/scripts/balance-monitor.mjs` polls low balances and calls `CMC/src/app/api/billing/auto-topup/route.js`, which creates an **embedded Stripe Checkout session** with `wallet_auto_topup` metadata. It does not charge a saved payment method without customer interaction. `CMC/src/app/api/webhooks/stripe/route.js` handles `wallet_topup` but not `wallet_auto_topup`, so that session type is not credited by the existing webhook. The monitor can initiate another session on later polls while the balance stays low, and it skips the top-up attempt when balance reaches zero.

## Task 7 — Check the live publication

- Make these changes on the **Web Security** Terms page, preserving section numbering and cross-references. The URL previously supplied ending in `/email/terms_of_service/` appears to identify a different product; confirm the correct Web Security page before editing.
- Confirm that `info@silenceai.net` is the same DPA contact used in Section 12.13.
- Leave the SLA in Section 6.7 unchanged.
- Leave the 90-day, customer-modifiable log-retention wording in Section 12.7 unchanged in this handoff. Its implementation is planned separately; it remains a publication risk until the system actually supports it.
- Compare the rendered live page with the two replacement clauses after publication.

## Legal basis for the audit wording

GDPR Article 28(3)(h) requires a processor to provide information needed to demonstrate compliance and to allow and contribute to audits, including inspections. The European Data Protection Board says the parties should assess the appropriate method, including remote or on-site review and security concerns; the controller's legally required audit right must remain effective.

- [GDPR Article 28](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?qid=1788745760655&uri=CELEX%3A02016R0679-20160504)
- [EDPB Guidelines 07/2020, final version](https://www.edpb.europa.eu/documents/guideline/guidelines-072020-on-the-concepts-of-controller-and-processor-in-the-gdpr_en)

## Legal sources for Task 3

- [Kazakhstan personal-data law, Articles 12 and 16](https://old.adilet.zan.kz/rus/docs/Z1300000094)
- [Kazakhstan consumer-protection law, Article 25](https://old.adilet.zan.kz/rus/docs/Z100000274_)
- [UAE Federal Personal Data Protection Law, Articles 22 and 23](https://www.uaelegislation.gov.ae/en/legislations/1972/download)
- [EDPB guidance on international transfers](https://www.edpb.europa.eu/sme/be-compliant/international-data-transfers_en)

## Sources for Task 4

- [Paddle Buyer Terms — buyer entity, reseller role, and transaction law](https://www.paddle.com/legal/buyer-terms)
- [Paddle Master Services Agreement — merchant-of-record role](https://www.paddle.com/legal/terms)
- [Paddle Privacy Notice — payment data and Paddle controller entities](https://www.paddle.com/legal/privacy)
- [Bank CenterCredit official site](https://www.bcc.kz/)

## Payment-flow reference for Task 6

- [Stripe Checkout Session modes and saved payment-method options](https://docs.stripe.com/api/checkout/sessions/create)
- [Stripe guidance on consent and charging saved payment methods later](https://docs.stripe.com/payments/save-during-payment)
