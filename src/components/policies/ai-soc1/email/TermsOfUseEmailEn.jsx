"use client";
import React from "react";
import PolicyLayout from "@/components/policies/shared/PolicyLayout";
import EmailJurisdictionSelector from "@/components/policies/shared/EmailJurisdictionSelector";

const sections = [
  { id: "about", title: "1. About These Terms" },
  { id: "service-description", title: "2. Service Description and Pricing" },
  { id: "sla", title: "3. Service Level Agreement and Availability" },
  { id: "user-responsibilities", title: "4. User Responsibilities and Acceptable Use" },
  { id: "data-processing", title: "5. Data Processing and Infrastructure" },
  { id: "service-activation", title: "6. Service Activation and Free Trials" },
  { id: "ip-rights", title: "7. Intellectual Property Rights" },
  { id: "privacy", title: "8. Privacy and Data Protection" },
  { id: "email-access", title: "8.3 Staff Access to Client Emails" },
  { id: "email-security-domain", title: "8.4 Email Security & Domain Protection" },
  { id: "cookies", title: "9. Cookies" },
  { id: "liability", title: "10. Limitation of Liability" },
  { id: "updates", title: "11. Version Updates and Support" },
  { id: "termination", title: "12. Termination" },
  { id: "indemnification", title: "13. Indemnification" },
  { id: "governing-law", title: "14. Governing Law and Disputes" },
  { id: "changes", title: "15. Changes to Terms" },
  { id: "contact", title: "16. Contact Information" },
  { id: "misc", title: "17. Miscellaneous" },
];

export default function TermsOfUseEmailEn() {
  return (
    <PolicyLayout
      title="AI-CSD 1 Email Policy"
      subtitle="Terms of Use"
      sections={sections}
    >
      <EmailJurisdictionSelector policy="terms_of_use" active="ae" locale="en" />
      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">1. About These Terms</h2>
        <p className="mb-4">
          <strong>1.1 Agreement Scope:</strong> These Terms of Use (&quot;Terms&quot;) govern your access to and use of the AI-CSD 1 Email Security &amp; Visualization component provided under the applicable regional agreement by Silence AI LLC, for UAE customers, or ТОО &quot;Silence AI&quot;, for Kazakhstan customers (the applicable company, &quot;Silence AI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms apply to you, the individual or entity accessing our services (&quot;you&quot; or &quot;your&quot;), and your employer or principal if you are acting on their behalf. The contracting company is the company identified in the order, account registration, or other agreement with you.
        </p>
        <p className="mb-4">
          <strong>1.2 Authority and Acceptance:</strong> If you are entering into these Terms on behalf of a company, organization, or other entity, you represent that you have the authority to bind such entity to these Terms. By accessing or using our services, you agree to be bound by these Terms. If you do not agree with these Terms, you must discontinue use of our services immediately.
        </p>
        <p className="mb-4">
          <strong>1.3 Service Domain and Scope:</strong> For customers contracting with ТОО &quot;Silence AI&quot; in Kazakhstan, the Centralized Management Console (CMC) is at <strong>kz.mail.csd.silenceai.net</strong> and the employee email workspace is at <strong>kz.mail.silenceai.net</strong>. For customers contracting with Silence AI LLC in the UAE, the CMC is at <strong>mail.csd.silenceai.net</strong> and the employee workspace is at <strong>mail.silenceai.net</strong>. Administrators use the CMC for company configuration, domains, accounts and security settings; employees use the workspace to read, compose, send and manage mail. These Terms of Use cover the Email Security service through the applicable domain pair, whether provider-connected or hosted. The domains do not state physical server location; other Silence AI products have separate terms.
        </p>
        <p className="mb-4">
          <strong>1.4 Age Requirement:</strong> Our services are intended for users who are at least 13 years old. By accessing or using the services, you represent and warrant that you are 13 years of age or older. If you are under 13, you must not access or use the services.
        </p>
      </section>

      <section id="service-description">
        <h2 className="text-2xl font-semibold mb-4">2. Service Description and Pricing</h2>
        <p className="mb-4">
          <strong>2.2 Email Security &amp; Visualization:</strong> Email Security &amp; Visualization provides an email workspace, email-flow monitoring and conditional security checks. In provider-connected mode, Microsoft 365/Outlook or Gmail remains the mailbox provider; employees sign in through provider OAuth, and company authorization is checked before they use our workspace. The administrator adds approved addresses and supported aliases in the CMC. Connecting an existing mailbox alone does not require moving hosting or changing MX, SPF, DKIM or DMARC records. Microsoft incoming mail uses Microsoft Graph; Gmail incoming synchronization uses OAuth-authorized IMAP; sending uses the respective authorized provider APIs. In hosted mode, customers connect a domain they already own; Silence AI does not supply a domain name or access the customer&apos;s DNS provider to change records. The CMC manages mailboxes and supported aliases, and the platform receives and sends mail through its own SMTP mail stack. During setup the platform displays recommended MX, SPF, DKIM and DMARC records and helps verify them; the customer publishes and maintains those records with its DNS provider. Hosted accounts use applicable local authentication settings. Optional AI drafting and response features are separate from phishing scanning.
        </p>
        <p className="mb-4">
          Historical Gmail/Outlook mailbox imports do not receive the normal security classification. Imported incoming mail may appear in Unfiltered and retain an Inbox or source-folder association; sent and trash imports follow different folder rules. Newly received mail is checked when eligible, subject to the settings and exceptions described below. Attachment content may still be scanned during migration.
        </p>
        <p className="mb-4">
          <strong>2.2.1 Email Security Functions:</strong> Eligible newly received mail may undergo the following checks. These are functions, not a guaranteed sequence or a promise that each message receives every check:
        </p>
        <div className="pl-6 space-y-2 mb-4">
          <p><strong>Sender authentication and spoof checks:</strong> SPF, DKIM and DMARC signals where applicable.</p>
          <p><strong>Spam detection:</strong> Unsolicited and suspicious mail, subject to trusted-sender bypass conditions.</p>
          <p><strong>Dangerous-link analysis:</strong> Dedicated checks of eligible embedded links.</p>
          <p><strong>Domain-based phishing and fraud-risk checks:</strong> Known malicious domains, lookalike or homograph indicators and available reputation signals.</p>
          <p><strong>Attachment antivirus:</strong> ClamAV may analyze accessible attachments when the scanner is enabled and configured; not every attachment is necessarily scanned.</p>
        </div>
        <p className="mb-4">
          <strong>2.2.2 Folder Classification and Detector Setting:</strong> Applicable results may route mail to <strong>Spam</strong>, <strong>Dangerous Links</strong>, <strong>Malware in attached files</strong>, <strong>Possibly Phishing</strong> or <strong>Secure</strong>. A spoof-only finding routes to Spam. If the combined phishing detector is effectively off for a mailbox, the dedicated known-phishing-domain, domain fraud-risk and dangerous-link checks are skipped; separate spoof, spam and eligible antivirus checks remain subject to their own conditions. Only CMC administrators can change the phishing-detector setting; employees cannot disable it. Separate AI drafting and auto-response settings are unaffected by this detector setting.
        </p>
        <p className="mb-4">
          <strong>2.3 Email Security Pricing:</strong> The annual subscription prices below are monthly equivalents per user. The full 12-month amount is charged upfront at online checkout and at annual renewal: $87.60 or ₸43,800 per user for Business Standard, $144.00 or ₸72,000 for Business Premium 100, and $300.00 or ₸150,000 for Business MAX. Monthly subscriptions are charged in advance for each 30-calendar-day paid period at the monthly-plan rate. Any separately agreed Order Form controls its invoicing and payment terms. Online payments for UAE agreements are handled by Paddle.com as merchant of record; payments for Kazakhstan agreements are handled by ТОО &quot;ФинCeрвисы&quot;.
        </p>
        <div className="overflow-x-auto mb-4"><table className="w-full text-sm"><thead><tr><th>Plan</th><th>Team size</th><th>Annual subscription USD/user/month equivalent</th><th>Monthly subscription USD/user/month</th><th>Annual subscription KZT/user/month equivalent</th><th>Monthly subscription KZT/user/month</th><th>Administrators</th><th>Mailbox storage/user</th></tr></thead><tbody>
          <tr><td>Business Standard</td><td>Up to 15 people</td><td>$7.30</td><td>$8.60</td><td>₸3,650</td><td>₸3,400</td><td>Up to 1</td><td>8 GB</td></tr>
          <tr><td>Business Premium 100</td><td>15–300 people</td><td>$12.00</td><td>$13.45</td><td>₸6,000</td><td>₸5,500</td><td>Up to 5</td><td>50 GB</td></tr>
          <tr><td>Business MAX</td><td>Unlimited users</td><td>$25.00</td><td>$25.00</td><td>₸12,500</td><td>₸11,500</td><td>Up to 10</td><td>200 GB</td></tr>
        </tbody></table></div>
        <p className="mb-4">All three plans allow company email on a domain the customer already owns, an administrator console, mailbox migration, guided DNS security setup, an office suite, email-flow monitoring and the conditional security checks described above. Silence AI does not provide a domain name or change DNS records at the customer&apos;s DNS provider. The customer publishes and maintains the recommended records shown and checked during hosted-domain setup. Connecting an existing Gmail or Microsoft mailbox alone does not require changing its MX or other DNS records. Prices may change for future billing periods after the policy notice period in Section 15; the applicable checkout or invoice shows the USD or KZT amount before payment.</p>
      </section>

      <section id="sla">
        <h2 className="text-2xl font-semibold mb-4">3. Service Level Agreement and Availability</h2>
        <p className="mb-4">
          <strong>3.1 100% Uptime SLA Guarantee:</strong> On the customer&apos;s request under Section 6.7 of the Terms of Service, at least one continuous confirmed minute during an active paid subscription when the entire platform is unavailable because of Silence AI infrastructure entitles the customer to a monetary refund. A service domain returning a server-unavailable error while the customer cannot use the system is an example. For a monthly subscription, the refund is the full fee paid for the affected 30-calendar-day paid period, with no more than one refund for that period even if it crosses a calendar-month boundary or includes multiple incidents. For an annual subscription, the refund is one twelfth of the paid annual fee for the affected services for each affected calendar month of the annual paid period, with no more than one refund per such month. The exclusions and claim procedure in Section 6.7 of the Terms of Service apply.
        </p>
        <p className="mb-4">
          <strong>3.2 Email Delivery Timing:</strong> The platform aims to place eligible incoming email in a designated security folder within ten (10) minutes after receipt by the platform. A delay in accepting or delivering an individual message, including delay at a receiving server or other mail provider, is not full platform downtime and does not qualify for the refund in Section 3.1.
        </p>
        <p>
          <strong>3.3 Service Availability:</strong> We may suspend access for maintenance, updates or other permitted operational requirements, with advance notice when possible. Maintenance notified in advance is excluded from platform downtime under Section 3.1 and Section 6.7 of the Terms of Service.
        </p>
      </section>

      <section id="user-responsibilities">
        <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities and Acceptable Use</h2>
        <p className="mb-4">
          <strong>4.1 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </p>
        <p className="mb-4">
          <strong>4.2 Lawful Use:</strong> You agree to use our services only for lawful purposes and in compliance with all applicable laws and regulations.
        </p>
        <p>
          <strong>4.3 Prohibited Activities:</strong> You agree not to: Use our services to conduct unauthorized security testing on systems you do not own or have explicit permission to test. Attempt to interfere with the proper functioning of our services. Use automated tools to access our services except as explicitly permitted. Engage in any activity that could harm our infrastructure or other users.
        </p>
      </section>

      <section id="data-processing">
        <h2 className="text-2xl font-semibold mb-4">5. Data Processing and Infrastructure</h2>
        <p>
          <strong>5.1 Privacy Policy:</strong> Our collection, use, and protection of your information is governed by our Privacy Policy, which is incorporated into these Terms by reference and available at{" "}
          <a
            href="https://www.silenceai.net/en/policies/ai-csd/email/privacy/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            https://www.silenceai.net/en/policies/ai-csd/email/privacy/
          </a>
          .
        </p>
      </section>

      <section id="service-activation">
        <h2 className="text-2xl font-semibold mb-4">6. Service Activation and Free Trials</h2>
        <p className="mb-4">
          <strong>6.1 Account Registration and Paid Activation:</strong> Registering an administrator account starts the agreement but does not itself start paid charges. To obtain paid Email Security access, the client selects a monthly or annual plan, pays or funds the subscription through the applicable checkout or invoice, and receives paid access once payment is confirmed. The selected paid period starts on confirmation. The customer can change plans in the system: after full successful payment for the new monthly or annual plan, the prior plan ends and the new plan and paid period start immediately, with the next renewal 30 calendar days later for the monthly variant, or on the corresponding calendar day one year later for the annual variant (the last day of that month if the date does not exist). Unused time on the prior plan is neither refunded nor credited toward the new plan or an internal balance. If payment fails, the change does not take effect and the existing paid plan continues. Cancellation of future renewal is separate from a plan change and is available in the system without notice to Silence AI.
        </p>
        <p className="mb-4">
          <strong>6.2 Policy Acceptance:</strong> The applicable Terms of Use, Terms of Service and Privacy Policy are presented during registration or paid-plan selection. Paid access begins only after the applicable plan is selected and payment is confirmed; registration alone does not activate a paid subscription.
        </p>
      </section>

      <section id="ip-rights">
        <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property Rights</h2>
        <p className="mb-4">
          <strong>7.1 Our Rights:</strong> We retain all intellectual property rights in our platform, services, technologies, and content. Nothing in these Terms grants you any rights to our intellectual property except as necessary to use our services as intended.
        </p>
        <p className="mb-4">
          <strong>7.2 Your Content:</strong> You retain ownership of any content you provide to our services. By using our services, you grant us a limited license to process, analyze, and store your content solely for the purpose of delivering our services to you.
        </p>
      </section>

      <section id="privacy">
        <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data Protection</h2>
        <p className="mb-4">
          <strong>8.1 Privacy Policy:</strong> Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference and available at{" "}
          <a
            href="https://www.silenceai.net/en/policies/ai-csd/email/privacy/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            https://www.silenceai.net/en/policies/ai-csd/email/privacy/
          </a>
          .
        </p>
        <p className="mb-4">
          <strong>8.2 Data Security:</strong> We implement industry-standard security measures to protect your data and maintain the confidentiality of your information.
        </p>
        <p id="email-access" className="mb-4">
          <strong>8.3 Personnel Access to Client Email Data:</strong> Personnel of Silence AI LLC and ТОО &quot;Silence AI&quot;, including employees and contractors, may access client organization email content, attachments or metadata only after prior explicit permission by email from an authorized representative of that client organization. The email must specify the purpose and scope; access is limited to that scope, logged and ended when the authorized purpose is complete. A separate exception permits access or disclosure compelled by a binding lawful demand, limited to what the law requires, with notice to the client organization where legally permitted. Automated processing for the contracted workspace, security checks and optional enabled AI functions is governed by the Privacy Policy and DPA.
        </p>
        <div id="email-security-domain" className="mb-4">
          <p className="mb-4">
            <strong>8.4 Email Security and Domain Protection Mechanisms:</strong> A hosted customer connects a domain it already owns. Silence AI displays recommended SPF, DKIM, DMARC and MX records and helps verify them, but does not supply a domain name or enter the customer&apos;s DNS-provider account to publish or change records. The customer publishes and maintains them. In provider-connected mode, the existing mailbox provider remains responsible for its mail infrastructure; merely connecting that mailbox does not require redirecting MX or replacing existing SPF, DKIM or DMARC records.
          </p>
          <p className="mb-4">
            <strong>8.4.1 DMARC Policy Configuration During Hosted-Domain Setup:</strong> As part of hosted-domain configuration, customers complete a guided setup flow during which they select a DMARC enforcement policy for that hosted domain. The platform provides exactly two enforcement options: <strong>&quot;reject&quot;</strong> (instructing receiving mail servers to discard unauthenticated messages outright) or <strong>&quot;quarantine&quot;</strong> (instructing receiving mail servers to treat unauthenticated messages as suspicious and route them to a separate folder or hold queue). No alternative enforcement levels are available within that hosted-domain setup. Hosted-domain activation is contingent upon completing this configuration step and selecting one of those policies. The customer retains full responsibility for publishing and maintaining the appropriate DNS records necessary to activate and enforce the selected DMARC policy on that domain.
          </p>
          <p className="mb-4">
            <strong>8.4.2 SPF and DKIM Alignment Enforcement:</strong> The platform enforces alignment checks using SPF and DKIM in accordance with DMARC alignment requirements, as defined by RFC 7489. These alignment checks are designed to ensure that only authorized sending sources — those whose infrastructure is explicitly permitted by the customer&apos;s published DNS records — may send email on behalf of the customer&apos;s domain within supported email flows. Alignment verification is performed where technically supported by the platform&apos;s infrastructure and the receiving mail server&apos;s configuration. Silence AI does not warrant that alignment enforcement will prevent all forms of domain misuse in environments where the customer has not fully published the requisite DNS records or where third-party sending infrastructure bypasses authenticated email flows.
          </p>
          <p className="mb-4">
            <strong>8.4.3 Default Secure Baseline Configuration:</strong> The platform may apply a recommended baseline to settings within the customer&apos;s Email Security profile. It displays recommended DNS records during hosted-domain setup but cannot apply those records at the customer&apos;s DNS provider. The customer must review, publish and maintain them. The baseline does not guarantee protection against all spoofing or domain abuse.
          </p>
          <p className="mb-4">
            <strong>8.4.4 Scope and Limitations of Domain Protection:</strong> The email authentication mechanisms described in this section are designed to prevent unauthorized third-party email sending using the customer&apos;s domain within supported infrastructure and properly configured email flows. These mechanisms are enforced where technically supported and are subject to the following limitations: (i) enforcement efficacy is contingent upon the customer&apos;s correct and timely publication of SPF, DKIM, and DMARC DNS records; (ii) protection is limited to email flows that pass through or are evaluated by Silence AI&apos;s platform infrastructure; and (iii) the platform does not control, and therefore cannot enforce authentication policies against, email sent through third-party infrastructure that has not been authorized or connected to the Service. Nothing in this section shall be construed as an absolute guarantee that unauthorized use of the customer&apos;s domain for email spoofing will be fully prevented in all circumstances.
          </p>
          <p className="mb-4">
            <strong>8.4.5 Compatibility with Major Email Receiving Platforms:</strong> The email authentication standards enforced by the platform — SPF, DKIM, and DMARC — are designed to be compatible with, and are recognized by, the email receiving infrastructure of major commercial and enterprise email providers, including but not limited to:
          </p>
          <div className="pl-6 space-y-2 mb-4">
            <p><strong>Gmail (Google LLC):</strong> Emails authenticated through the platform are designed to be compatible with Gmail&apos;s inbound authentication evaluation systems, operating on the google.com and gmail.com mail infrastructure.</p>
            <p><strong>Microsoft Outlook / Office 365 (Microsoft Corporation):</strong> The platform&apos;s authentication mechanisms are intended to align with the email security enforcement policies applied by Microsoft Exchange Online and the broader Outlook and Office 365 ecosystem, operating on the outlook.com and microsoft.com mail infrastructure.</p>
            <p><strong>Yahoo Mail (Yahoo Inc.):</strong> Properly authenticated emails processed through the platform are designed to meet the inbound DMARC and authentication enforcement standards applied by Yahoo Mail&apos;s receiving infrastructure, operating on the yahoo.com mail domain.</p>
            <p><strong>Apple iCloud Mail (Apple Inc.):</strong> The platform&apos;s email authentication configuration is intended to be compatible with iCloud Mail&apos;s inbound security policy enforcement, operating on the icloud.com mail infrastructure.</p>
            <p><strong>Zoho Mail (Zoho Corporation):</strong> Emails authenticated through the platform are designed to align with the SPF, DKIM, and DMARC evaluation policies enforced by Zoho Mail&apos;s receiving systems, operating on the zoho.com mail infrastructure.</p>
          </div>
          <p className="mb-4">
            Silence AI does not control the email security policies, filtering behavior, or DMARC enforcement configurations of any third-party email receiving provider. Deliverability outcomes and the enforcement of DMARC policies are ultimately evaluated and determined by the recipient mail server infrastructure. Accordingly, actual deliverability and authentication enforcement behavior may vary depending on each receiving provider&apos;s own security configurations, policy updates, and operational practices. Silence AI makes no representations or warranties regarding the specific deliverability outcomes of any email transmitted through or authenticated by the platform when evaluated by third-party mail servers.
          </p>
        </div>
      </section>

      <section id="cookies">
        <h2 className="text-2xl font-semibold mb-4">9. Cookies</h2>
        <p>
          Our use of cookies and similar technologies is governed by our Cookie Policy, which is incorporated into these Terms by reference and available at{" "}
          <a
            href="/en/policies/cookies/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /en/policies/cookies/
          </a>
          .
        </p>
      </section>

      <section id="liability">
        <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
        <p className="mb-4">
          <strong>10.1 Service Limitations:</strong> Except for our SLA guarantee regarding service availability, our services are provided &quot;as is&quot; without warranties of any kind. We do not guarantee that our services will meet all your security requirements or detect all possible vulnerabilities.
        </p>
        <p className="mb-4">
          <strong>10.2 Liability Cap:</strong> Our total liability to you for any claims arising from these Terms or your use of our services shall not exceed the amount you paid to us in the twelve months preceding the claim.
        </p>
        <p>
          <strong>10.3 Excluded Damages:</strong> We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
        </p>
      </section>

      <section id="updates">
        <h2 className="text-2xl font-semibold mb-4">11. Version Updates and Support</h2>
        <p className="mb-4">
          <strong>11.1 Service Updates:</strong> We may release new versions of our services from time to time. When a new version is released, we reserve the right to discontinue support for previous versions with reasonable notice.
        </p>
        <p>
          <strong>11.2 Compatibility:</strong> You are responsible for ensuring compatibility with supported versions of our services and updating to current versions as needed.
        </p>
      </section>

      <section id="termination">
        <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
        <p className="mb-4">
          <strong>12.1 Cancellation and Account Deletion by You:</strong> The agreement starts when the administrator registers or creates the account. You may cancel future subscription renewal yourself in the system at any time, without contacting Silence AI, a written request or 30 days&apos; notice. Cancellation stops future renewals and charges; paid access continues through the end of the already paid period and then ends, while the account and agreement remain in place. You may separately delete the account yourself; deletion ends the agreement and access immediately. Voluntary deletion before the end of a paid monthly or annual period does not return the unused portion to your bank account, including the remaining nine months if an annual account is deleted after three months. This does not limit the SLA refund in Section 3.1 or any other expressly required refund.
        </p>
        <p className="mb-4">
          <strong>12.2 Suspension or Termination by Us:</strong> We may suspend paid access or close an account for a breach of these Terms or abuse of the service. Closure by Silence AI ends the agreement and access. An expired or cancelled subscription ends paid access at the end of its paid period without deleting the account or ending the agreement. No removal of locally installed tools or separate request to delete an already closed account is required.
        </p>
      </section>

      <section id="indemnification">
        <h2 className="text-2xl font-semibold mb-4">13. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Silence AI from any claims, damages, or expenses arising from your use of our services, including any unauthorized security testing or violation of these Terms.
        </p>
      </section>

      <section id="governing-law">
        <h2 className="text-2xl font-semibold mb-4">14. Governing Law and Disputes</h2>
        <p className="mb-4">
          <strong>14.1 Applicable Law:</strong> Any applicable law is determined by the regional agreement with the contracting company, subject to mandatory law and rights that cannot be excluded by contract.
        </p>
        <p>
          <strong>14.2 Dispute Resolution:</strong> The parties will first try to resolve any dispute arising out of or in connection with these Terms through mutual negotiation. If negotiation fails, disputes under agreements with Silence AI LLC shall be submitted to the competent courts in Sharjah, UAE, and disputes under agreements with ТОО &quot;Silence AI&quot; shall be submitted to the competent courts of Kazakhstan. Nothing in these Terms excludes any mandatory rights or court jurisdiction that the parties cannot exclude by contract.
        </p>
      </section>

      <section id="changes">
        <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
        <p>
          Silence AI may amend these Terms without prior client approval. We notify clients by email to the registered administrator address or by an in-service notification at least seven calendar days before the stated effective date. A payment gateway provider change instead requires the initial email to the customer&apos;s Email Security sign-in address no later than three calendar months before the planned change date under Section 3.3.3 of the Email Security Terms of Service; any additional administrative-panel notice does not replace that email or alter the advance notice period. An email is sent when transmitted; an in-service notice is sent when made available in the account. The updated text is published with its effective date. A client may cancel future renewals in the system or delete the account under Section 12; disagreement alone does not require account deletion or delay an amendment.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
        <p>For questions about these Terms or our services, please contact us at:</p>
        <p>UAE contracting company: Silence AI LLC, licence number 2539365.01</p>
        <p>Kazakhstan contracting company: ТОО &quot;Silence AI&quot;, BIN 250840004804</p>
        <p>Legal and privacy inquiries: info@silenceai.net</p>
        <p>Website: silenceai.net</p>
        <p>UAE registered address: Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE</p>
        <p>Kazakhstan registered address: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж</p>
      </section>

      <section id="misc">
        <h2 className="text-2xl font-semibold mb-4">17. Miscellaneous</h2>
        <p className="mb-4">
          <strong>17.1 Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
        </p>
        <p className="mb-4">
          <strong>17.2 Contract Documents and Priority:</strong> These Terms, the <a href="https://www.silenceai.net/en/policies/ai-csd/email/terms_of_service/">Email Security Terms of Service</a>, the incorporated <a href="https://www.silenceai.net/en/policies/ai-csd/email/privacy/">Privacy Policy</a>, the applicable order or plan, and the DPA in Section 12 of the Terms of Service form the agreement for Email Security. The DPA prevails for customer-data processing conflicts; the Terms of Service govern subscription, SLA and termination conflicts. The Cookie Policy applies to cookie use under its stated terms.
        </p>
        <p>
          <strong>17.3 Assignment:</strong> Silence AI may transfer these Terms and its rights and obligations without separate client consent only to another legal entity in the same Silence AI group that controls, is controlled by or is under common control with the contracting company: an entity linked to Silence AI LLC for a UAE agreement or to ТОО &quot;Silence AI&quot; for a Kazakhstan agreement. We will notify the client of the transferee and remain responsible for obligations accrued before transfer. Any transfer to an unrelated purchaser or partner, and any client assignment, requires the other party&apos;s prior written consent. Section 11.9 of the Terms of Service applies on the same basis.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 08.10.2026</p>
    </PolicyLayout>
  );
}
