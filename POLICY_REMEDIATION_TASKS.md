# Revision brief for `policy.md` — decisions 1–15

**Recipient:** Chief Legal Officer / policy drafting agent  
**Deliverable:** Revised Email Security terms in `policy.md` and `terms-of-use.md`, with a consistency review of `privacy-policy.md`.  
**Scope of this brief:** Decisions 1–15 below. Items 1–6, 10, 13, and 14 direct Email Security policy or terms edits; item 7 permits a qualified clarification; items 8–9, 11–12, and 15 record owner decisions or handoffs. This task list concerns Email Security only. Remove WebSOC or WebSock functionality from the email-service clauses; those systems have their own code and service terms.

The product owner has supplied the service and domain facts below. The code observations are included because the recipient may not have repository access. Preserve the owner's confirmed SLA and other unrelated commercial terms. Do not infer hosting locations from the contracting company's country; the current policy does not promise US or EU servers for UAE customers.

## 1. Correct the domains and regional service scope

**Current text to change:** Section 1.2 says that the CMC is at `email-soc.silenceai.net` and the Webmail Client is at `mail.silenceai.net`. That description omits the Kazakhstan service pair and gives the wrong CMC address for the UAE service.

**Required domain mapping:**

| Customer contracting with | CMC administrator panel | End-user email workspace |
|---|---|---|
| ТОО "Silence AI" (Kazakhstan) | `kz.mail.csd.silenceai.net` | `kz.mail.silenceai.net` |
| Silence AI LLC (UAE) | `mail.csd.silenceai.net` | `mail.silenceai.net` |

**Drafting instructions:**

- Replace the two-domain wording in Section 1.2 with a clear four-domain, two-region description. Tie each pair to the applicable contracting company without suggesting that the contracting country determines the physical server location.
- State what each domain does: CMC is the administrator panel for company configuration, domains, accounts, and security settings; the workspace is the interface employees use to read, compose, send, and manage email.
- Make the domain-scope sentence work for both regional pairs. Do not leave `email-soc.silenceai.net` as the sole stated CMC address. Avoid accidentally extending this policy to other Silence AI products or domains.
- Review any other references in `policy.md` that assert where the covered email service is accessed, and make them consistent with this mapping. Keep legal notices and hosting statements separate from service-domain names.

**Evidence supplied to the drafter:** The Kazakhstan CMC address appears in `k8s/overlays/cluster-8601/active/sso-env.yaml:19-33`; the Kazakhstan workspace address appears in `proxy/Caddyfile:11`. The UAE pair is the product owner's confirmed intended pair; this brief does not certify live UAE routing.

**Completion check:** Section 1.2 accurately covers all four addresses and distinguishes the administrator panel from the employee workspace in each region.

## 2. State that the email service operates SMTP in hosted mode

**Current text to change:** Section 12.2 says, “Processor does not operate an SMTP service.” That statement is false for the hosted email mode.

**Product facts to reflect:** The platform operates its own mail stack for hosted/custom email accounts. It accepts inbound mail through SMTP and provides SMTP submission for sending. In provider-connected mode, the external provider remains the mail server; the platform uses the authorized provider connection for mail access and sending. The existence of hosted SMTP must not make the provider-connected mode sound as though its MX records are redirected to our mail server.

**Drafting instructions:**

- Remove the absolute no-SMTP sentence from Section 12.2.
- Explain SMTP by service mode: hosted/custom accounts use the platform mail stack; connected Outlook/Gmail accounts continue to use their provider infrastructure. Say that the platform may receive, process, store, and send email through the relevant mode's transport and authorization path.
- Review adjoining statements in Sections 12.2–12.4 so that they do not claim all email data originates exclusively from Gmail/Outlook APIs. Coordinate the final wording with task 3 below.
- Describe the service at a customer-facing level. Do not insert internal port numbers, container names, or deployment details into the policy unless needed for a customer decision.

**Evidence supplied to the drafter:** `webmail-client/docker-compose.yml:133-151` exposes hosted SMTP ingress and submission; `k8s/overlays/cluster-8601/mail-edge/final-edge.yaml:56-84` contains the Kazakhstan mail-stack service; `webmail-client/cmd/server/main.go:121-132,239` starts local SMTP submission and registers inbound SMTP handling.

**Completion check:** The policy no longer says the processor does not operate SMTP, and it does not attribute hosted SMTP operation to the provider-connected mode.

## 3. Describe the two supported ways to use the email platform

**Current text to change:** Sections 1.1–1.2 and 12.2–12.4 describe the service mainly as an email security layer that receives data only through third-party APIs. They do not explain the hosted all-in-one email option or the fact that employees use this platform's own email workspace in either mode.

### A. Provider-connected security layer

- A customer can keep Microsoft Outlook/Microsoft 365 or Gmail as its underlying mailbox provider. Microsoft is a principal example, not the only permitted provider.
- A company administrator authorizes or adds the relevant existing employee email addresses in the CMC. The product can associate approved addresses and aliases with the proper users and tenant.
- Employees sign in to this service through the connected provider's OAuth flow and use **this platform's email workspace** for normal email work: reading, composing, sending, and managing messages. The platform obtains an authenticated identity from the provider and checks that the account is authorized by the company. An email address or alias match alone is **not** an authentication mechanism.
- The connected mode does not require the customer to move its mail hosting or change MX/SPF/DKIM/DMARC records merely to use the security layer. Mail remains with the provider. Distinguish this from optional domain verification or other setup steps if they are disclosed elsewhere.
- Describe the actual mail-access methods accurately: Microsoft incoming mail is fetched through Microsoft Graph; Gmail incoming synchronization currently uses OAuth-authorized IMAP; sending for Microsoft and Gmail uses their respective authorized APIs. Do not describe Gmail incoming synchronization as exclusively a Gmail REST API call.
- Connected users normally do not create a separate local email password or enroll in separate platform 2FA merely to connect their existing provider account. Do **not** promise that no password or MFA is ever needed: Microsoft/Google may require them during provider sign-in, and an existing platform 2FA setting may still require a challenge.

### B. Hosted all-in-one email security and workspace

- A customer can use the platform as its own hosted mail system with the security functions already integrated. The administrator manages the customer domain and creates custom employee email accounts and, where supported, aliases in the CMC. Employees then use this platform's workspace for their email activity.
- This mode uses the platform's inbound mail and sending infrastructure. The administrator follows the DNS setup supplied by the platform for the hosted domain, including the applicable **MX, SPF, DKIM, and DMARC** records. SMTP submission host/port settings are connection settings; do not call them an “SMTP DNS record.”
- Do not imply that hosted/local accounts have the same authentication steps as OAuth-connected accounts. The policy may describe authentication at a high level without making an unsupported promise that local accounts need no password or 2FA.

**Required section edits:**

- In Sections 1.1–1.2, introduce the two delivery modes while keeping the same covered email service and regional domain pairs.
- In Section 12.2, describe the corresponding processing sources and purposes for each mode: authorized provider connection in connected mode; platform mail transport and storage in hosted mode; the workspace and security processing in both.
- In Section 12.3, ensure the categories of data cover messages, metadata, and attachments received through either supported mode, rather than only data enabled through third-party APIs.
- In Section 12.4, remove or qualify the assertion that the processor **only** collects data supplied through authorized email APIs. Keep any data-minimization commitment tied to the data actually needed to deliver the selected mode.
- Keep statements about historical mailbox migration separate from ongoing provider synchronization and hosted mail delivery. This brief does not decide the later audit item about scanning attachments during migration.

**Evidence supplied to the drafter:** `webmail-client/internal/auth/outh.go:285-403` validates provider identity and checks company authorization; `webmail-client/cmd/server/main.go:285-291` shows different 2FA setup handling for OAuth and non-OAuth accounts; `webmail-client/internal/mail/mail_service.go:269-284` distinguishes Microsoft Graph from Gmail IMAP fetching; `webmail-client/internal/mail/email_sender.go:15-45` selects Gmail API, Microsoft Graph, or SMTP for sending; `cmc/backend/handlers/employees.go:249-365` handles approved addresses and aliases; `cmc/backend/handlers/domain_security.go:73-151` handles hosted-domain DNS checks.

**Completion check:** A reader can understand both modes, who hosts the mailbox, how employees authenticate and use the workspace, whether DNS changes are required, how mail is accessed and sent, and which data the service processes in each mode.

## 4. Prepare the six-stage security description for production AI activation

**Current text to change:** Section 12.2.1 calls the system a five-layer sequential validation process, lists no attachment antivirus stage, and says AI content analysis already runs for incoming mail.

**Product owner's intended customer-facing description:** Once the AI phishing layer is active in production, describe **six security functions**:

1. Sender authentication and spoof checks, including SPF, DKIM, and DMARC as applicable.
2. Spam detection.
3. Dangerous-link analysis.
4. Domain-based phishing and fraud-risk checks, including known malicious domains, homograph indicators, and domain-reputation signals where available.
5. Attachment antivirus/malware analysis.
6. AI-assisted analysis of email content for phishing and social-engineering context.

**Important implementation distinction for the legal drafter:** The code currently starts six *internal* components without the AI phishing layer: known phishing domains, spoof checks, domain fraud-risk checks, spam checks, link scanning, and attachment antivirus. AI phishing code exists separately but is **not wired into the running pipeline in this checkout**. The product owner plans to activate it on the production server and does not intend to enable it in the current local environment. Do not treat the presence of an AI source file as proof that production AI scanning is already active.

The intended six customer-facing functions group the current known-domain and domain fraud-risk components under item 4. They are separate internal components and currently run at different points. Adding the AI component to the existing runtime would yield seven internal components unless the implementation is reorganized; do not present the six customer-facing categories as a verified six-step execution sequence.

**Drafting instructions:**

- Revise Section 12.2.1 to enumerate the six customer-facing security functions above, including antivirus and AI. If the legal text calls them “stages” or “sequential,” ensure the order claimed matches the actual production processing order when AI is enabled. The six functional categories are not currently a verified six-step runtime sequence.
- Keep the AI item as a **release-dependent claim**. The final present-tense statement that incoming mail receives AI phishing analysis should become effective only after the owner has evidence that the production service executes the AI layer. Before activation, use wording that truthfully describes the currently deployed service or hold the revised clause from publication.
- Avoid implying that the optional webmail AI assistant or AI reply drafting is the same as automated AI phishing classification. This task concerns the incoming-email security pipeline.
- Apply item 5 below when describing coverage and exceptions. The six functions are available or intended functions, not a guarantee that each message receives all six checks.

**Evidence supplied to the drafter:** `webmail-client/cmd/server/main.go:91-111` constructs the current pipeline without AI; `webmail-client/internal/pipeline/pipeline.go:158-174` names current internal components; `webmail-client/internal/pipeline/layer5_phishing.go:79-87` defines the available AI phishing layer.

**Completion check:** The policy draft reflects the intended six security functions, explicitly includes attachment antivirus, and makes no current AI-operation promise that outruns actual production activation.

## 5. Explain the actual check flow and the AI phishing choice

**Current text to change:** Section 12.2.1 says each email undergoes every listed stage and that all newly incoming email is automatically scanned and classified. It does not explain conditional checks or the administrator's ability to turn off the combined phishing detector. Revise this section together with item 4 rather than adding a contradictory second process description.

**Describe the flow in customer terms:**

1. For newly received mail eligible for security processing, the current runtime first checks the sender domain against known phishing domains, then checks sender authenticity and spoofing indicators. Spoof checks use SPF, DKIM, DMARC and related signals where applicable to the delivery path.
2. It evaluates domain fraud risk, including lookalike or suspicious domains, and then checks spam. Spam analysis uses Rspamd when applicable. It can bypass that engine for an authorized tenant domain and matching source IP, or for a trusted provider whose sender checks passed, to avoid false positives; a spoof finding does not qualify for the trusted-provider bypass.
3. It checks links for dangerous destinations, then scans eligible attachments for malware when the malware scanner is enabled, configured, and able to access the file. Messages without attachments have no attachment content to scan.
4. AI phishing analysis is the sixth **customer-facing function planned for production**, subject to item 4's activation gate. If enabled and actually wired into the production pipeline, the phishing layer may examine the sender, subject and processed message body; it can use a local heuristic/cache or send an uncertain case to its configured AI provider. Do not imply that every message body is sent to an external AI service.
5. The process can stop after a content threat is classified, so later checks may not run. Sent messages, delivery-error messages and historical mailbox imports have separate handling. Folder assignment follows the applicable results; it is not proof that every possible check ran.

### What disabling the phishing detector actually changes

**Add an explicit, customer-readable explanation to Section 12.2.1:** The CMC administrator's current phishing-detector switch is a **combined control**, not a separate switch for each security layer. If the detector is effectively off for a mailbox, the current inbound pipeline skips these three dedicated checks:

| Dedicated check skipped | What the customer loses from this check |
|---|---|
| Known phishing-domain lookup | The pipeline does not compare the sender domain with its known phishing-domain repository. |
| Domain fraud-risk check (DFRC) | The pipeline does not calculate its domain fraud-risk score or reasons, including the signals that this layer uses for suspicious or lookalike domains. |
| Dangerous-link scanner | The pipeline does not run its dedicated embedded-link scan to classify dangerous links. Other enabled services may still inspect message content or URLs; do not claim that no link can ever be examined. |

The same effective setting is checked by the separate **AI phishing-content layer**. Once that layer is actually deployed in the production pipeline, turning the combined detector off should also prevent that layer from analyzing the mailbox's message content. The current checkout does **not** register the AI layer in the running pipeline, so do not describe this as proof that production AI analysis is presently active.

The combined phishing-detector switch does **not** turn off the separate sender-authentication/spoof check, spam check, or attachment antivirus layer. Those checks remain subject to their own prerequisites and exceptions: for example, the spam engine can be bypassed for verified trusted providers, and antivirus requires an enabled, configured scanner and an accessible attachment. The independent AI assistant, AI draft, and AI auto-response features can still process email content when separately enabled; a statement that “AI will not read any email” would be too broad.

**Drafting instructions for the legal agent:**

- Say that an authorized administrator can disable the **combined phishing detector**, and identify the affected checks above in plain language. Do not say the administrator can independently disable each of these three checks: the current control switches them together. If separate controls are added later, update the description to match the deployed controls.
- State the consequence plainly: when the detector is off, the service does not provide the dedicated phishing-domain, domain fraud-risk, or dangerous-link check for affected incoming messages; those messages may still be caught by other enabled checks, but there is no guarantee that another check will catch the same threat. Do not continue to promise that every incoming message passes all six listed security functions.
- Explain that spoof, spam, and eligible attachment antivirus checks are separate from this detector. Do not describe a disabled phishing detector as disabling the entire email-security service.
- Describe any AI-content privacy choice with its **actual scope**. If the CTO later implements an administrator-controlled **AI-only** opt-out, describe it separately from the combined detector. Until then, do not tell customers that they can disable only AI while leaving the dedicated domain and link checks running.
- Make this administrator-only language effective only after the CTO's access-control change is deployed. The current employee workspace still exposes a per-user switch, and an enabled employee flag can override an administrator's global-off setting. The current shared `system_settings` key is not shown to be customer-specific; do not promise a per-customer control until that scope is verified or implemented.

**Suggested substance, for the legal drafter to adapt rather than paste unchanged:** An authorized administrator may disable the phishing detector for the covered service. While it is disabled, the service does not perform its dedicated known-phishing-domain, domain fraud-risk, or dangerous-link checks on affected incoming mail; the AI phishing-content check is also disabled if that feature is deployed. Sender-authentication/spoof checks, spam analysis, and eligible attachment antivirus are separate functions and may continue to operate under their own rules. The exact service scope and effective date of this choice must match the deployed administrator control.

**Important current-code limitation; do not paper over it:** Today the visible setting is named “phishing detector,” not an AI-only switch. The employee workspace exposes a checkbox for it, and the authenticated user-settings API accepts that field without an administrator-role check. Separately, the CMC exposes an administrator-only global switch. The effective state is `(per-user enabled OR administrator global enabled) AND active plan/add-on entitlement`. Thus an employee's enabled setting can keep the detector on after the administrator turns the global switch off, and an employee's disabled setting cannot turn it off while the global switch is on. The current global setting is stored in `system_settings`; this brief does not establish that it is scoped per customer organization. The pipeline uses the effective setting to skip known-phishing-domain, domain fraud-risk and link scanning when disabled; spoof, spam and antivirus are separate. The AI phishing layer checks the same effective setting, but it is not yet registered in the current pipeline. Do not promise administrator-only control, a reliable customer-wide AI opt-out, or unchanged non-AI phishing checks until the deployed behavior supports those statements. Use narrowly accurate interim wording or hold the control claim for publication.

**Evidence supplied to the drafter:** `webmail-client/cmd/server/main.go:91-111` fixes the current internal order and omits the AI layer; `webmail-client/internal/pipeline/pipeline.go:68-111,159-185` shows conditional skipping and early stopping; `webmail-client/internal/pipeline/layer2_spam.go:39-59` shows spam bypasses; `webmail-client/internal/pipeline/layer4_antivirus.go:39-67` shows antivirus conditions; `webmail-v2/frontend/app/settings/page.js:969-979` and `webmail-client/cmd/server/main.go:1373-1422,1566-1571` show the employee control and its authenticated settings API; `cmc-v2/frontend/src/components/SettingsMenu.js:210-225` and `webmail-client/internal/features/phishingpaidaddon/handlers.go:12-35` show the administrator global control; `webmail-client/internal/db/phishing_detector.go:22-41` defines the effective setting; `webmail-client/internal/pipeline/layer5_phishing.go:87-160` shows AI gating and content use; `webmail-client/internal/features/aiautorespond/aiautorespond.go:38-57` shows the independent assistant feature.

**Completion check:** Section 12.2.1 describes the checks, their order and material exceptions without saying every message receives every check. It states exactly which dedicated checks the combined administrator phishing-detector switch skips, which separate checks can continue, and what AI-content claim is supported by the deployed control.

## 6. Remove the nonexistent Possibly Spoofed folder

**Current text to change:** Section 12.2.1 lists “Possibly Spoofed” as a designated folder. The platform no longer uses a separate folder by that name for the current classification flow.

**Drafting instructions:** Remove “Possibly Spoofed” from the folder list and any other folder description in this policy. Keep sender authentication/spoof detection as a security check. Explain that a message identified only as spoofed is classified into **Spam**; a message with another detected content threat may also be assigned the corresponding threat folder. Keep the other actual user-visible destinations aligned with the final production interface, including Spam, Dangerous Links, Malware in attached files, Possibly Phishing, Secure and Unfiltered where relevant. Do not claim the folder name “Possibly Spoofed” merely because a database field or log still uses a similarly named detection flag.

**Evidence supplied to the drafter:** `webmail-client/internal/pipeline/pipeline.go:295-306` normalizes spoof-only messages into spam; `webmail-client/internal/db/db.go:136-166` maps spoof-only classification to the Spam folder.

**Completion check:** No dedicated spoof folder is promised, while spoof detection and its Spam routing remain understandable.

## 7. Keep the migration exception; qualify the Unfiltered location

**Owner decision:** The CTO has already been asked to remove attachment-content scanning from mailbox migration. No separate engineering task belongs in this legal brief.

**Drafting instructions:** Keep the Section 12.2 and 12.2.1 distinction between historical mailbox migration and newly received mail. The intended final statement is that historical Gmail/Outlook imports are stored and displayed without the normal security classification, including attachment-content scanning. Publish that complete no-scanning statement only after the CTO's migration change is in the deployed service: the current IMAP migration path still calls `ComputeAttachmentScan` on imported attachment bytes. Do not describe migrated messages as security-verified or “Secure” merely because the import records a default class value.

It is accurate to explain that **imported incoming messages appear in the end user's Unfiltered folder**. They may also retain an Inbox or source-folder association. Do not claim that *all* imported messages go to Unfiltered: sent and trash imports follow their own folder rules. Keep folder-location detail brief if it helps customers distinguish imported history from newly classified incoming mail.

**Evidence supplied to the drafter:** `webmail-client/internal/mail/migration_worker.go:350-371,398,439-455,691-715` shows both migration paths, the current IMAP attachment scan and source-folder assignment; `webmail-client/internal/db/db.go:189-231,1093-1100` adds persistent Unfiltered membership to saved incoming mail but excludes Sent and Trash.

**Completion check:** Migration wording remains accurate for the deployed release; any Unfiltered statement is limited to imported incoming mail and does not imply those imports were checked.

## 8. Retain deletion wording pending the CTO's existing work

**Owner decision:** The CTO has already received the data-deletion issue. Do not add a new policy correction or engineering work item here. Retain Section 12.7's retention/deletion language for now, and do not strengthen it with an unverified claim that deleting a database record immediately erases every stored attachment object. Reassess the clause against the deployed deletion behavior before final publication.

## 9. Retain administrator self-deletion wording pending the CTO's existing work

**Owner decision:** The CTO has already been asked to add administrator self-deletion in the CMC. Do not add a new policy correction or engineering work item here. Section 10.3(b) already offers a delete function or support-assisted deletion; retain that structure and verify that the CMC delete function is available in the deployed service before final publication.

## 10. Add the three Email Security plans and their per-user prices

**Owner correction:** The prior version of this task contained the wrong product's prices. Replace that material completely with the **Email Security** schedule below. The [main AI-SOC pricing page](https://www.silenceai.net/en/ai-soc/) shows the Email Security plan names, annual USD display rates, and plan limits; the owner has additionally confirmed the monthly USD and KZT display rates here.

| Email Security plan | Team size | Annual commitment: displayed USD rate per user/month | Monthly plan: USD rate per user/month | Displayed KZT rate per user/month under either choice | Administrator limit | Mailbox storage per user |
|---|---|---:|---:|---:|---:|---:|
| Business Standard | Up to 15 people | $7.30 | $8.60 | ₸3,400 | Up to 1 | 8 GB |
| Business Premium 100 | 15–300 people | $12.00 | $13.45 | ₸5,500 | Up to 5 | 50 GB |
| Business MAX | Unlimited users | $25.00 | $25.00 | ₸11,500 | Up to 10 | 200 GB |

**Features included in all three plans:** Company email on the customer's own domain, an administrator console, mailbox migration, DNS security setup, an office suite, AI-powered threat protection, and email-flow monitoring. The plans differ by team-size range, administrator seats, and mailbox storage. Describe AI threat protection consistently with items 4–5: the AI phishing layer is planned for production activation, may be disabled under the applicable control, and must not be promised as active before deployment is confirmed.

**Annual commitment wording:** The annual USD prices are **monthly per-user display rates tied to an annual commitment**. The website does not establish that the full year's amount is charged upfront. Do not call them annual lump-sum prices or promise an upfront annual charge. State the actual invoicing or payment schedule only if the order or checkout confirms it. The KZT display price for each plan is the same under both billing choices; do not calculate a new KZT discount or describe those KZT prices as a conversion from the USD figures.

**Required document edits:**

1. Replace the website-only price reference in `terms-of-use.md` Section 2.3 with an Email Security pricing schedule or a clearly incorporated plan table containing the amounts, per-user/per-month units, annual-commitment distinction, team sizes, administrator limits, and storage allowances above. Reconcile any nearby billing and subscription clauses with the final order/checkout wording.
2. Review `policy.md` Section 6 so its fee and subscription-allocation language does not conflict with the three plans; include the same schedule there if it is intended to be the operative customer Terms of Service, or clearly identify which document contains the governing Email Security price schedule. Do not leave two inconsistent contractual price tables.
3. Review `privacy-policy.md` only for billing-data or product-scope consistency. A privacy notice does not need the commercial price table unless the legal drafter identifies a specific reason.
4. The public pricing page still uses “five-layer” and a “Spoofed” folder in its feature bullets. Do **not** copy those stale descriptions into the policies. Follow items 4–6 for the intended six customer-facing security functions and the actual Spam routing of spoof-only messages.

**Completion check:** The terms clearly state each plan's user range, per-user monthly USD and KZT amounts, administrator and storage limits, common features, and the meaning of the annual commitment. No unrelated product charges or capabilities remain, and no unsupported upfront annual-payment claim is made.

## 11. Hold the original point for the CTO

**Owner decision:** The owner will ask the CTO about the technical behavior behind audit point 11. Do not change the related email-policy promise on an assumption; revisit it after the CTO supplies the specific implementation answer. This brief does not reconstruct the original point from memory.

## 12. Record the owner's Kazakhstan storage confirmation

**Owner-confirmed fact:** The owner states that Kazakhstan customer data is stored in Kazakhstan and can provide evidence. Treat this as a supplied operational fact, not as a defect requiring a CTO task. Coordinate any location wording with item 13. Do not infer from this fact alone that all processing, backups, subprocessors, or transfers are necessarily confined to Kazakhstan; the legal drafter should use only the scope the owner's evidence actually establishes.

## 13. Replace vague hosting language with the confirmed service locations

**Current text to review:** Section 12.8 says that the processor operates data centers “worldwide” and describes international transfers generally. It does not tell UAE-contract customers that their email service runs on a server in the USA **or** the EU. Section 1.1 and Section 12.1 identify the UAE and Kazakhstan contracting companies; those clauses do not specify server locations.

**Owner-confirmed facts for the email service:**

| Customer agreement | Location statement to reflect |
|---|---|
| Kazakhstan company agreement | Kazakhstan customer data is stored in Kazakhstan, according to the owner. |
| UAE company agreement | The service runs on a server located either in the United States or in the European Union. The owner has not designated one fixed country or promised customer choice between the two. |

**Drafting instructions:**

- Revise the service-location and international-transfer wording in Section 12.8, and any directly related clause, so the two confirmed deployment arrangements are understandable. Use “USA or EU” as an alternative, not a claim that each UAE customer is hosted in both places.
- Keep the contracting company, service access domains, primary server location, data storage location, backups, and cross-border transfers conceptually separate. A UAE contract does not mean a UAE server. Do not turn the owner's US/EU service-server statement into an unsupported promise that every copy, log, backup, support operation, or subprocessor stays in the same location.
- If a fixed data-residency commitment, customer-selected region, transfer safeguard, or list of subprocessors is needed, obtain the owner's evidence and legal determination before asserting it. This is a drafting precision point; the technical location facts above are supplied by the owner and are not independently verified in this repository.
- Align the final Section 12.8 wording with item 1's regional service domains without treating domain names as proof of physical hosting. Preserve the confirmed SLA and unrelated commercial clauses.

**Completion check:** An email-service customer can distinguish the Kazakhstan data-storage statement from the UAE contract's USA-or-EU service-server statement, and the policy does not imply a UAE-located server or a fixed USA/EU country without evidence.

## 14. Disclose optional AI drafting and automatic-response processing

**Owner clarification:** The AI reply-drafting and automatic-response functions exist. The concern is **not** that the code lacks them. The concern is that the current DPA describes processing for email security scanning and the webmail interface, while optional AI assistance can process email content for a different purpose and may send it to an AI provider. The owner wants these functions retained.

**Exact text creating the gap:** Section 12.2 describes processing only to provide Email Protector features and the secure webmail UI; Section 12.2.1 describes AI use only as phishing analysis. Section 4.5 says client email data is processed “exclusively” by automated systems for contracted security-scanning and visualization. Neither description clearly tells a customer that email contents can also be used for AI-generated reply drafts or automatic responses. The separate `docs/PRIVACY_POLICY.md` lists security analysis and webmail as purposes and mentions third-party **security intelligence** services, but does not clearly describe optional AI drafting/response provider disclosures. A generic third-party-features or subprocessor clause does not, by itself, explain this actual data flow.

**Implementation facts for the legal drafter without repository access:**

- A user-requested reply draft can send the selected email's sender, subject, and up to approximately 2,000 characters of its body to the configured AI provider. The generated reply is returned for the user to review. The code also has a template fallback in another reply-generation path when AI is unavailable; do not say every reply draft necessarily invokes an external provider. Evidence: `webmail-client/internal/features/aiassistant/handlers.go:1493-1538,1550-1638,1641-1651`.
- When a user's AI auto-response or standalone draft mode is enabled, an incoming message can be passed to the company-configured AI provider. That flow may use the raw incoming message when available, or a prompt containing message metadata and body; it can also attach separately configured company/user AI context files. Depending on the enabled mode and resulting actions, the system may save a draft, send a reply, forward a message, or perform another supported mailbox action. Evidence: `webmail-client/internal/features/aiautorespond/aiautorespond.go:38-57,89-154,391-432,438-452`.
- If no company AI provider is configured, the automatic-response fallback can still call a DeepSeek endpoint when its API key is configured; otherwise it generates an offline response. Therefore, do not equate “company provider not configured” with “no external AI processing.” Evidence: `webmail-client/internal/features/aiautorespond/aiautorespond.go:89-109,454-492`.
- These AI assistance settings are separate from the phishing-detector switch. Disabling the phishing detector does not itself disable requested AI reply drafts, AI auto-response, or AI draft mode. The assistant/draft/response processing must not be described as one of the six incoming-email security checks in items 4–5.

**Drafting instructions:**

1. In Section 12.2, add **optional AI-assisted email drafting and automatic-response actions** to the purposes and scope of processing when those features are enabled or requested. Distinguish user-requested drafting from background processing of eligible incoming mail under auto-response/draft settings. Explain that generated content may be returned as a draft or sent automatically according to the applicable feature setting.
2. Reconcile Section 4.5's “exclusively” security-scanning/visualization wording with these additional automated email-processing purposes. Preserve the restriction on **human Silence AI personnel** reading customer mail; clarify the automated processing purposes instead of deleting the human-access protection.
3. Check Sections 12.3–12.5 and the customer-facing privacy notice for the data categories and third-party disclosure: sender, subject, message body or raw message where used, AI context files if configured, generated reply content, and the configured or fallback AI provider where applicable. Do not imply that all AI processing is local or that only third-party security-intelligence services receive content.
4. Describe the feature's actual controls and scope. An administrator may configure an AI provider, while user-level auto-response/draft settings can trigger processing. Do not claim the phishing-detector opt-out blocks these separate AI functions. Do not promise that a company AI-provider setting alone prevents the DeepSeek fallback until the deployed behavior supports that claim.
5. Keep the final legal characterization of provider roles, notices, and authorization with the legal drafter. Verify the production provider configuration and enabled modes before naming a specific provider or promising that data remains in a particular region.

**Completion check:** A customer can understand that optional AI drafting/response is a distinct purpose, when email content may go to an AI provider, which controls trigger it, and how it differs from AI phishing classification. Sections 4.5 and 12.2 no longer conflict with those features, and the privacy notice does not describe provider sharing solely as security intelligence.

## 15. Retain the existing policy point following CTO confirmation

The owner reports that the CTO confirmed the technical behavior underlying audit point 15 is handled. No new policy redline follows from that confirmation alone. The legal drafter should keep the existing claim unless the exact deployed behavior or the owner's instruction later shows a mismatch; this brief does not reconstruct the original audit point from memory.
