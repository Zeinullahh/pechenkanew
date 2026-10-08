# Web Security Privacy Policy change request

Handoff for the agent editing the **live AI-CSD 1 Web Security & Traffic Management Privacy Policy**. This is a task list for the web version only. Do not publish this Markdown file or edit the repository's `privacy.md`, `policy.md`, `terms-of-use.md`, or application code as part of this handoff. Do not apply it to Email Security. Read the separate Web Security Terms of Service and Terms of Use change requests so company identity, scope, payments, retention, and customer rights agree across all three policies.

The provider has confirmed the regional company, console, hosting, and intended payment arrangements below. The notice must describe **real processing**; label an integration or control as planned until the deployed service has been verified.

## Task 1 — Make this a privacy notice for two regional services

- Replace Section 1.1's copied contract wording (“These Privacy Policy (‘Terms’) govern your access…”) with a plain-language explanation of what data this notice covers and who is responsible for it. A Privacy Policy describes processing; it should not purport to grant access rights or replace the Terms of Service/DPA.
- Provide a **Kazakhstan** and a **UAE** Web Security notice through the same two-option jurisdiction selector used for the other Web Security policies. Select the notice corresponding to the actual contracting/deployment arrangement; a visitor's IP or chosen UI language alone is not decisive. Publish the Kazakhstan version in **Russian only**, subject to a check for any legally required Kazakh-language customer information, and the UAE version in **English only**.
- Kazakhstan entity details supplied by the provider:
  - Наименование организации: ТОО "Silence AI"
  - БИН: 250840004804
  - Адрес: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, ​Проспект Ракымжан Кошкарбаев, 10/1, ​G-3 блок; D6 этаж
  - ФИО руководителя: ЗЕЙНУЛЛА РШЫМАН
- UAE entity details supplied by the provider:
  - Company name: "Silence AI" LLC
  - Licence Number: 2539365.01
  - Registered Address: Shams Business Center, Shorjoh Media City Free Zone, Al Messaned, Sharjah, UAE.
- Check registration documents before publication, including whether **Shorjoh** or **Sharjah Media City** is the registered spelling. Retain `info@silenceai.net` as the stated privacy/DPA contact if it serves both entities; otherwise give the correct regional contact.
- Replace Section 1.4's `web-soc.silenceai.net` limitation with the Kazakhstan console `https://kz.web.csd.silenceai.net` and UAE console `https://web.csd.silenceai.net`. Cover data flowing through the console, related APIs, supplied agent, active proxy/WAF, protected customer domains/IPs, and incident/log views even when those components are reached at other endpoints. The console supplies the customer with its agent/active-protection connection IP; do not treat that IP as identical in all deployments or hard-code it into the notice. Identify the separately deployed SSO/sign-in service and its actual operator, domain, and linked privacy notice after verification.

## Task 2 — Separate the controller and processor roles

Replace Section 1.3's statement that Silence AI is the controller for **all** data processed through the service. The notice should identify the actual role **for each activity**:

| Data/activity | Privacy role to describe |
| --- | --- |
| Customer website visitors' request/traffic logs and security events processed to provide protection | Customer determines the purposes and normally acts as controller; the applicable Silence AI entity acts as processor under the Web Security DPA, subject to the actual arrangement. |
| Console accounts, contact/support communications, subscription administration, invoicing, fraud/security of Silence AI's own service, and provider-operated analytics | Identify where the relevant Silence AI entity determines purposes and acts as controller. |
| Authentication through the separate SSO deployment | Verify the portal operator, data it collects, and whether it acts for the same entity or is a separate controller/processor; link its notice. Do not imply the CMC itself collects passwords unless it does. |
| Payment transaction data | Describe the role of the relevant bank or Paddle separately from WebSOC log processing; Paddle identifies its own entities as controllers for their payment activities. |

Explain that website visitors normally exercise rights about a customer's site traffic with the customer/controller, while Silence AI assists that customer under the DPA. Account users may contact Silence AI directly regarding data it controls. Do not promise a direct website-visitor dashboard or universal direct deletion right that the service cannot provide.

## Task 3 — Inventory data and map each purpose to a lawful basis

- Rework Sections 1.5, 2, 3, and 10. The current statement that the component processes **only** web traffic/security data **only after activation** conflicts with account registration, SSO, billing, support, and analytics processing that can occur before activation.
- Distinguish at least these categories and sources, if actually collected: console user identifiers/contact and organization details; SSO account/session identifiers; payment and wallet transaction records (without suggesting Silence AI stores full card details unless verified); protected-site visitor IPs, URIs, headers, timestamps, user agents, traffic/attack metadata, and incidents; agent/edge configuration and telemetry; support messages; AI chat prompts, responses, tool results, model/provider settings and any security data sent to an AI provider; audit, diagnostic, and cookie data. Name the categories of people concerned (customer staff, website visitors, support contacts, etc.).
- Separate uses required to deliver/secure the purchased service from optional analytics or marketing. Remove or explain Section 2.3's “user activity patterns (for demonstrating service traction to customers)” and say whether any information shown to others is genuinely aggregated/de-identified. Do not use customer visitors' identifiable logs for a new independent purpose merely because the notice says “service improvement”; follow controller instructions and the DPA.
- For **Silence AI's own controller processing**, map each purpose to the applicable legal basis in the relevant jurisdiction and state any legitimate interest or consent choice with the required detail. Under GDPR, [Articles 13–14](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX%3A02016R0679-20160504) call for specific purposes, bases, recipients, transfer information, and retention periods/criteria. Do not present a generic list of contract, legitimate interests, consent, and legal obligation as if all bases cover every purpose. For customer-controlled website logs, explain processor activity and refer to the customer's own visitor notice/DPA rather than claiming Silence AI selects the visitor's lawful basis.

## Task 4 — Describe actual recipients and regional payment providers

- Replace Section 4.1's single-Stripe description and the unconfirmed **six-month notice promise** for gateway changes with an accurate regional payment-data disclosure. The intended Kazakhstan payment-services provider is **АО «Банк ЦентрКредит»** for customers of **ТОО "Silence AI"**. The intended UAE-company sales channel is **Paddle**, an authorized reseller and merchant of record, not merely a card processor. Link each provider's applicable privacy information where available. Distinguish the purchaser's payment data from protected-site visitor logs.
- Paddle's [Buyer Terms](https://www.paddle.com/legal/buyer-terms) identify the buyer-facing entity by buyer location: Paddle.com Inc. (US), Paddle.com (Canada) Ltd. (Canada), or Paddle.com Market Limited (England and Wales, number 8172165; 30 Old Bailey, London, EC4M 7AU, UK) elsewhere. Its [Privacy Notice](https://www.paddle.com/legal/privacy) identifies relevant Paddle companies as controllers. Do not automatically list Paddle as a WebSOC log-processing subprocessor, or claim every UAE-company customer deals with a UK Paddle entity.
- The current repository still uses **Stripe** and has no Paddle or Bank CenterCredit integration. Confirm live checkout, invoice issuer, payment-data sharing, card-network/fraud services, and any wallet/automatic top-up processing before using present-tense provider language. The commercial model is a required subscription with overages debited from a prepaid WebSOC balance; customers may top up manually or opt into threshold-triggered top-ups (intended minimum USD 10). State what account, payment authorization, transaction, and card-reference data each party actually receives and keeps.
- Expand Section 4.2's generic cloud-provider statement to identify meaningful **recipient categories** and the actual subprocessor disclosure route: hosting/storage, backups, support, SSO, AI model providers, payment providers, and other relevant services. The code supports external AI providers including OpenAI, Anthropic, Google, and others; review the actual configured destinations and whether security-tool results or customer content go to them. Name or link a current subprocessor list where required; describe each party's privacy role accurately.

## Task 5 — Give accurate hosting locations and transfer safeguards

- Kazakhstan customer deployments' **servers are intended to be territorially in Kazakhstan**. Identify what that covers: production databases, raw and structured logs, backups, object storage, and the edge/proxy. Check authentication, payments, AI inference, support access, monitoring, and subprocessors separately before saying **all** personal data stays in Kazakhstan. Kazakhstan's [personal-data law, Articles 12 and 16](https://old.adilet.zan.kz/rus/docs/Z1300000094), addresses local storage and cross-border transfers.
- UAE customer deployments use servers in the **United States or Europe**. Disclose the actual country/region per deployment or link an accurate location schedule. Do not imply every UAE customer uses both locations, or that payment/SSO/AI data necessarily stays in the service-hosting region. Assess applicable [UAE transfer provisions, Articles 22–23](https://www.uaelegislation.gov.ae/en/legislations/1972/download), and any GDPR transfer obligations where relevant.
- Replace Section 8.1's “data centers worldwide / legally permitted mechanisms / ensure compliance” boilerplate with actual recipient categories, transfer destinations, and the appropriate transfer basis or safeguards for each flow. TLS protects data in transit but is **not by itself** a legal transfer mechanism. Contract governing law does not determine which mandatory privacy rules apply.
- `DEPLOYMENT_REGION=kz` and the Kazakhstan compose override do not, by themselves, prove every SSO, payment, AI, support, and backup path is local. The live data-flow inventory is a publication prerequisite.

## Task 6 — Reconcile retention, deletion, and the customer's choices

- Sections 5.1–5.2 promise **90-day default web-log retention, modifiable by the customer**. Preserve that as the intended promise only if implemented and verified. The provider plans this separately. The reviewed repository's security-event `LogEntry` defaults to **30 days**, and a customer-controlled 90-day web-log setting was not established. Identify which data are raw web logs, structured security events, incidents, SIEM storage, AI chat, audit records, account data, invoices, and backups; do not imply one retention period covers all.
- The supplied pricing screen presents SIEM log-retention options of **7, 30, and 90 days**. Reconcile those options with the intended **90-day default** and disclose the real available choices, their scope, and when a change takes effect. Keep retention duration distinct from the separate **25 GB included SIEM storage** and USD 0.50/extra GB/month overage.
- Give a period or clear criterion for each material data category, including user-activity data currently described only as “stored for analytics.” Explain backup deletion lag and legal retention exceptions. On termination, explain the customer's DPA options for returning or deleting processor-held data, plus deletion of controller-held account data subject to specific legal obligations; avoid the vague claim that all personal data is deleted within a “commercially reasonable period.”

## Task 7 — Clarify rights, incidents, security, and cookies

- In Sections 6 and 13, explain how account users exercise applicable rights directly with the regional Silence AI entity at `info@silenceai.net`; how protected-site visitors can identify/contact the customer controller; and how Silence AI routes or assists with requests concerning customer-controlled logs. State applicable response periods and complaint routes where required by the jurisdiction, rather than implying identical rights or processes everywhere.
- In Section 11, separate (a) a processor's notice and assistance to the customer/controller from (b) Silence AI's own controller obligations to affected users or authorities. Keep the triggers and timeframes consistent with the DPA and applicable law. Do not promise that every confirmed incident automatically produces a direct notice to every website visitor.
- Verify Sections 7.1–7.2's operational claims (MFA through separate SSO, encryption at rest, secrets management, training, backups, assessments, incident response) against actual practices. Describe measures at a useful level without exposing sensitive details or guaranteeing perfect security.
- Inventory cookies and similar technologies across the console, SSO portal, marketing site, analytics, and payment checkout. Revise Section 9's “primarily technical cookies” claim based on that inventory and link the correct live regional Cookie Policy. Describe nonessential tracking/consent choices where applicable.

## Task 8 — Publish a clear notice that matches the other policies

- Remove Section 14's implication that UAE contract law/Sharjah courts govern **all** privacy matters or exclude mandatory Kazakhstan, UAE, GDPR, or other applicable data-protection rules. Put contract forum rules in the applicable Terms of Service; use this document for notice and rights information.
- Remove Section 12's suggestion that continued use alone is consent to any new privacy purpose. Give an effective date and explain notice or renewed consent when actually required. Fix copy/paste errors, duplicated/open-ended statements, and the unqualified “exclusive access” and “forwards only legitimate requests” claims in Sections 3.1–3.2.
- Verify all live Privacy Policy, Cookie Policy, Terms of Use, Terms of Service, DPA, payment-provider, and contact links; check the selector and both languages. Confirm the actual service, regional deployment, payment providers, retention control, AI/SSO flows, and notice delivery before publication. Do not modify the repository Markdown or code in this handoff.

## Primary references

- [GDPR Articles 13, 14, and 28](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX%3A02016R0679-20160504)
- [Kazakhstan personal-data law, Articles 12 and 16](https://old.adilet.zan.kz/rus/docs/Z1300000094)
- [Kazakhstan consumer-protection law](https://old.adilet.zan.kz/eng/docs/Z100000274_)
- [UAE Federal Personal Data Protection Law, Articles 22 and 23](https://www.uaelegislation.gov.ae/en/legislations/1972/download)
- [Paddle Buyer Terms](https://www.paddle.com/legal/buyer-terms) and [Privacy Notice](https://www.paddle.com/legal/privacy)
