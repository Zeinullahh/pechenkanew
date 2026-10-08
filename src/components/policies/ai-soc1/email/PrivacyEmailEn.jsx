"use client";

import React from "react";
import PolicyLayout from "@/components/policies/shared/PolicyLayout";
import EmailJurisdictionSelector from "@/components/policies/shared/EmailJurisdictionSelector";

const sections = [
  { id: "about", title: "1. About This Privacy Policy" },
  { id: "info-we-collect", title: "2. Information We Collect" },
  { id: "how-we-use-info", title: "3. How We Use Your Information" },
  { id: "third-party", title: "4. Third-Party Services and Data Sharing" },
  { id: "data-storage", title: "5. Data Storage and Retention" },
  { id: "user-rights", title: "6. User Rights and Control" },
  { id: "security", title: "7. Security Measures" },
  { id: "international-transfers", title: "8. International Data Transfers" },
  { id: "cookies", title: "9. Cookies and Tracking Technologies" },
  { id: "legal-basis", title: "10. Legal Basis for Processing" },
  { id: "data-breach", title: "11. Data Breach Notification" },
  { id: "webmail-notice", title: "12. Webmail Client / Email Protector Additional Notice" },
  { id: "human-access-prohibition", title: "13. Prohibition on Human Access to User Email Content" },
  { id: "changes", title: "14. Changes to This Privacy Policy" },
  { id: "contact", title: "15. Contact Information" },
  { id: "governing-law", title: "16. Governing Law" },
];

export default function PrivacyEmailEn() {
  return (
    <PolicyLayout
      title="AI-CSD 1 Email Policy"
      subtitle="Privacy Policy"
      sections={sections}
    >
      <EmailJurisdictionSelector policy="privacy" active="ae" locale="en" />
      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">1. About This Privacy Policy</h2>
        <p className="mb-4">
          <strong>1.1 Purpose and Scope:</strong> This Privacy Policy is a privacy notice describing how the applicable Silence AI contracting company handles personal data in connection with Email Security. For UAE customers, the contracting company is Silence AI LLC; for Kazakhstan customers, it is ТОО &quot;Silence AI&quot;. The company identified in your order, account registration, or other agreement is responsible for the relevant account data it processes as controller. This notice also describes the company&apos;s separate role as processor of customer email data on the customer&apos;s documented instructions.
        </p>
        <p className="mb-4">
          <strong>1.2 Introduction:</strong> This Privacy Policy describes how Silence AI collects, uses, processes, and protects your personal information when you use the AI-CSD 1 Email Protector subsystem, including the secure webmail client. It does not apply to the Web Security &amp; Traffic Management component or any other Silence AI service operated on a separate domain.
        </p>
        <p className="mb-4">
          <strong>1.3 Controller Information:</strong> The applicable contracting company acts as controller for personal data relating to the customer account and administration of the service. UAE: Silence AI LLC, licence number 2539365.01, Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. Kazakhstan: ТОО &quot;Silence AI&quot;, БИН 250840004804, КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж.
        </p>
        <p className="mb-4">
          <strong>1.4 Service Domain and Scope:</strong> For customers contracting with ТОО &quot;Silence AI&quot; in Kazakhstan, the CMC administrator panel is at <strong>kz.mail.csd.silenceai.net</strong> and the employee email workspace is at <strong>kz.mail.silenceai.net</strong>. For customers contracting with Silence AI LLC in the UAE, those interfaces are at <strong>mail.csd.silenceai.net</strong> and <strong>mail.silenceai.net</strong>, respectively. Administrators use the CMC for company configuration, domains, accounts and security settings; employees use the workspace to read, compose, send and manage mail. This notice covers the Email Security service in provider-connected and hosted modes through the applicable domain pair. The domain names do not establish physical server location.
        </p>
        <p>
          <strong>1.5 Component-Specific Processing:</strong> The Email Security service processes email data and metadata for the selected mail mode, workspace and security functions, and for optional AI drafting or automatic responses when requested or enabled.
        </p>
      </section>

      <section id="info-we-collect">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="mb-4">
          <strong>2.1 Account and Registration Information:</strong> Email address and account credentials, Company or organization information (if applicable), Billing and payment information, User profile and configuration settings.
        </p>
        <p className="mb-4">
          <strong>2.2 Service Usage Data:</strong> Sender, recipient, subject, timestamps and other email metadata; message content and attachments received through authorized provider access or hosted mail transport; security classification results; mailbox configuration data; and, where optional AI assistance is used, configured AI context files and generated drafts or responses.
        </p>
        <p>
          <strong>2.3 Analytics and Performance Data:</strong> Platform usage statistics, User activity patterns (for demonstrating service traction to customers), System performance metrics, Error logs and diagnostic information.
        </p>
      </section>

      <section id="how-we-use-info">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="mb-4">
          <strong>3.1 Service Delivery:</strong> We use this information to provide the selected provider-connected or hosted mail mode and workspace, receive or synchronize mail, store and send messages, perform applicable security checks and classification, and provide optional AI-assisted drafting or automatic-response actions when requested or enabled.
        </p>
        <p className="mb-4">
          <strong>3.2 AI-Based Processing:</strong> AI phishing-content analysis is planned for production activation; it should not be treated as a currently active incoming-mail check until deployment is confirmed. Separately, a user-requested reply draft may use the selected sender, subject and up to approximately 2,000 characters of the body to generate text for review. Enabled auto-response or draft settings may process eligible incoming mail, including a raw message or metadata and body plus configured AI context files, and may save a draft, send a reply, forward mail or perform another supported mailbox action. Security results and generated content may be stored for the relevant service function.
        </p>
        <p className="mb-4">
          <strong>3.3 Platform Operations:</strong> Maintain and improve our services, Provide customer support, Process billing and payments, Monitor service performance and availability.
        </p>
        <p>
          <strong>3.4 Analytics and Business Intelligence:</strong> Track user growth and platform adoption, Generate anonymized usage statistics, Improve service functionality and user experience.
        </p>
      </section>

      <section id="third-party">
        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services and Data Sharing</h2>
        <p className="mb-4">
          <strong>4.1 Email Provider Integration:</strong> In provider-connected mode, Microsoft incoming mail is fetched through Microsoft Graph and Gmail incoming mail is synchronized using OAuth-authorized IMAP; sending uses the respective authorized provider APIs. The provider remains the mail server. In hosted mode, the platform receives inbound mail and provides SMTP submission through its own mail infrastructure.
        </p>
        <p className="mb-4">
          <strong>4.2 Security Scanning Services:</strong> Microsoft Defender: We use Microsoft Defender antivirus to scan email attachments for malware. URLScan.io: We submit email links to URLScan.io for security analysis.
        </p>
        <p className="mb-4">
          <strong>4.3 URLScan.io Data Storage:</strong> When we submit links to URLScan.io: Scan results are stored in URLScan.io&apos;s database, No email account information, sender details, recipient information, email content, or attachments are shared, Only the URL itself is submitted for analysis.
        </p>
        <p className="mb-4">
          <strong>4.4 Payment Processing:</strong> For services contracted with Silence AI LLC in the UAE, online purchases are handled by <a href="https://www.paddle.com" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Paddle.com</a> as merchant of record. Paddle handles checkout and payment data under its <a href="https://www.paddle.com/legal/buyer-terms" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Buyer Terms</a> and <a href="https://www.paddle.com/legal/privacy" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Privacy Notice</a>. For services contracted with ТОО &quot;Silence AI&quot; in Kazakhstan, payments are handled by ТОО &quot;ФинCeрвисы&quot;. The applicable checkout or invoice identifies the payment recipient and terms. Silence AI may receive transaction status and limited billing details needed to administer the service. Users will be notified at least 6 months before any change of payment gateway provider under these terms.
        </p>
        <p>
          <strong>4.5 Cloud Infrastructure:</strong> We may use cloud service providers for data storage and processing. All third-party processors are contractually bound to protect your data in accordance with this Privacy Policy.
        </p>
        <p className="mb-4"><strong>4.6 Optional AI Assistance Providers:</strong> Requested reply drafts and enabled automatic-response or draft settings may send a selected sender, subject, message body or raw message, configured company/user AI context files and generated content to a configured AI provider. An automatic-response fallback may use an external AI provider if a fallback API key is configured; otherwise it may generate an offline response. Not every draft uses an external provider. These functions have separate settings from the phishing detector, so turning that detector off does not turn them off. No specific AI provider or processing region is promised by this notice.</p>
      </section>

      <section id="data-storage">
        <h2 className="text-2xl font-semibold mb-4">5. Data Storage and Retention</h2>
        <p className="mb-4">
          <strong>5.1 Email Data:</strong> Email data is retained until you delete the mailbox from our service or as required by law. Security classification results and scan metadata are stored to support mailbox protection and reporting.
        </p>
        <p className="mb-4">
          <strong>5.2 Default Retention Periods:</strong> Email data: Retained until you delete the mailbox from our service or as required by law, User activity logs: Stored for analytics and service improvement purposes, Account information: Retained while your account is active.
        </p>
        <p>
          <strong>5.3 Data Deletion:</strong> You can request deletion of your data at any time. Upon account termination, we will delete your personal data within a commercially reasonable period. Legal retention requirements may apply in certain circumstances.
        </p>
      </section>

      <section id="user-rights">
        <h2 className="text-2xl font-semibold mb-4">6. User Rights and Control</h2>
        <p className="mb-4">
          <strong>6.1 Your Data Rights:</strong> You have the right to: Access your personal data, Rectify inaccurate information, Request deletion of your data, Restrict processing activities, Data portability where applicable, Object to certain processing activities.
        </p>
        <p>
          <strong>6.2 User Responsibilities:</strong> You are solely responsible for: Maintaining the security of your account credentials, Ensuring that you have authorization to connect any third-party mailbox to our service, Compliance with applicable laws when using our services.
        </p>
      </section>

      <section id="security">
        <h2 className="text-2xl font-semibold mb-4">7. Security Measures</h2>
        <p className="mb-4">
          <strong>7.1 Technical Safeguards:</strong> TLS encryption for data in transit, Encryption of stored data where feasible, Role-based access control (RBAC), Multi-factor authentication (MFA) for administrative access, Centralized secrets management, Comprehensive logging for security purposes.
        </p>
        <p>
          <strong>7.2 Organizational Measures:</strong> Regular security assessments, Employee training and access controls, Incident response procedures, Backup and recovery systems, Vulnerability management processes.
        </p>
      </section>

      <section id="international-transfers">
        <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
        <p className="mb-4">
          <strong>8.1 Service Locations:</strong> Kazakhstan customer data under a Kazakhstan company agreement is stored in Kazakhstan. The Email Security service under a UAE company agreement runs on a server in either the United States or the European Union; a fixed country or customer-selected region is not promised. Access domains and contracting company do not establish every backup, log, support or subprocessor location. When personal data is transferred across borders, we: Rely on legally permitted transfer mechanisms, Implement appropriate safeguards as required by law, Use TLS encryption for all data transfers, Ensure compliance with applicable data protection regulations.
        </p>
        <p>
          <strong>8.2 User Responsibilities:</strong> You remain responsible for any local authorizations or restrictions required for data transfers you initiate through our services.
        </p>
      </section>

      <section id="cookies">
        <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking Technologies</h2>
        <p>
          Our use of cookies is governed by our separate Cookie Policy, available at{" "}
          <a href="/policies/ai-csd/email/cookies/" className="text-blue-400 hover:text-blue-300 underline">
            /policies/ai-csd/email/cookies/
          </a>. We primarily use technical cookies necessary for platform functionality.
        </p>
      </section>

      <section id="legal-basis">
        <h2 className="text-2xl font-semibold mb-4">10. Legal Basis for Processing</h2>
        <p>
          We process your personal data based on: Contract performance: To provide the services you have requested, Legitimate interests: For service improvement, security, and analytics, Consent: Where explicitly provided for specific processing activities, Legal obligations: To comply with applicable laws and regulations.
        </p>
      </section>

      <section id="data-breach">
        <h2 className="text-2xl font-semibold mb-4">11. Data Breach Notification</h2>
        <p>
          In the event of a confirmed personal data breach affecting your information, we will: Notify you without undue delay, Provide available technical details, Offer reasonable assistance to help you assess and comply with your obligations, Report to relevant authorities as required by law.
        </p>
      </section>

      <section id="webmail-notice">
        <h2 className="text-2xl font-semibold mb-4">12. Webmail Client / Email Protector Additional Notice</h2>
        <p className="mb-4">
          The Email Security service includes an employee email workspace in both provider-connected and hosted modes. Eligible newly received mail may receive security checks and classification. Optional AI drafting and automatic-response processing serves a separate purpose and is triggered by a user request or the applicable enabled setting.
        </p>
        <p className="mb-4">
          Historical Gmail/Outlook mailbox imports do not receive the normal security classification. Imported incoming mail may appear in Unfiltered and retain an Inbox or source-folder association; sent and trash imports follow their own folder rules. Attachment content may still be scanned during migration until the planned change is deployed. Newly received mail follows the applicable settings and check conditions.
        </p>
        <p className="mb-4">
          <strong>12.1 Email Security Functions:</strong> The customer-facing functions below are conditional and are not a guaranteed sequence. A content-threat result may stop later checks.
        </p>
        <div className="pl-6 space-y-2 mb-4">
          <p>
            <strong>Sender authentication and spoof checks:</strong> SPF, DKIM, DMARC and related indicators are used where applicable to the delivery path.
          </p>
          <p>
            <strong>Spam detection:</strong> Spam analysis may bypass its engine for an authorized tenant domain with matching source IP or a trusted provider whose sender checks passed; a spoof finding does not qualify for that trusted-provider bypass.
          </p>
          <p>
            <strong>Dangerous-link analysis:</strong> The dedicated scanner checks eligible embedded links for dangerous destinations when the combined phishing detector is effectively on.
          </p>
          <p>
            <strong>Domain-based phishing and fraud-risk checks:</strong> Known malicious domains, lookalike or homograph indicators and available reputation signals are checked when the combined detector is effectively on.
          </p>
          <p>
            <strong>Attachment antivirus:</strong> Accessible attachments may be scanned for malware when the scanner is enabled and configured. Messages without attachments have no attachment content to scan.
          </p>
          <p>
            <strong>AI phishing-content analysis:</strong> This sixth customer-facing function is planned for production activation and is not represented as live until deployment is confirmed. If active, it may use sender, subject and processed body, local heuristics/cache and a configured AI provider for uncertain cases; not every message is sent externally.
          </p>
        </div>
        <p className="mb-4">
          <strong>12.2 Folder Classification:</strong> Applicable results may place newly processed messages in the following user-visible folders:
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Spam:</strong> Spam findings and messages identified only as spoofed.</li>
          <li><strong>Dangerous Links:</strong> Messages classified by the dedicated link check.</li>
          <li><strong>Malware in attached files:</strong> Messages classified by attachment malware analysis.</li>
          <li><strong>Possibly Phishing:</strong> Messages classified by applicable phishing checks.</li>
          <li><strong>Secure:</strong> Messages with no detected threat from applicable checks.</li>
          <li><strong>Unfiltered:</strong> Imported incoming mail, subject to its source-folder association.</li>
        </ul>
        <p className="mb-4">
          When the combined phishing detector is effectively off for a mailbox, dedicated known-phishing-domain, domain fraud-risk and dangerous-link checks are skipped. Spoof, spam and eligible antivirus checks are separate and may continue, but no other check is guaranteed to catch the same threat. The employee workspace currently exposes a setting that can override an administrator&apos;s global-off setting; the switch is not currently administrator-only, and no per-customer control is promised. If the AI phishing-content function is activated, its use also follows the effective detector setting. This setting does not stop separately enabled AI assistant, reply-draft or automatic-response features. A folder label does not prove that every check ran.
        </p>
        <p>
          <strong>12.3 Administrator Access and Data Privacy:</strong> Email content may be accessible to the organization administrator that created or manages the user account within the CMC. Automated systems process it for the selected mail mode, workspace, applicable security checks and separately enabled optional AI assistance. The restriction on human Silence AI personnel access is stated in Section 13.
        </p>
      </section>

      <section id="human-access-prohibition">
        <h2 className="text-2xl font-semibold mb-4">13. Prohibition on Human Access to User Email Content</h2>
        <p className="mb-4">
          Silence AI LLC strictly prohibits any and all human personnel — including, without limitation, employees, contractors, founders, engineers, support staff, security analysts, and any other human team members of Silence AI — from reading, accessing, reviewing, copying, or otherwise inspecting the content of any user email, whether in transit or at rest, for any purpose whatsoever.
        </p>
        <p className="mb-4">
          Email scanning, classification, threat detection and optional AI drafting or automatic-response processing are carried out by automated systems and programmatic pipelines, with no human Silence AI personnel involved in processing or reviewing email content except under the stated exceptions.
        </p>
        <p>
          The only exceptions to this prohibition are: (a) where Silence AI is compelled by a valid and binding legal order, court order, or mandatory regulatory requirement under applicable law, in which case Silence AI will, to the extent permitted by law, notify the affected user prior to disclosure; or (b) where the user has given explicit, specific, and informed written consent for a defined and limited purpose. Any access under these exceptions will be strictly minimized to what is legally required, logged, and subject to internal audit. This prohibition is a binding, contractual commitment to all users of the AI-CSD 1 platform.
        </p>
      </section>

      <section id="changes">
        <h2 className="text-2xl font-semibold mb-4">14. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes will be communicated through: Email notification to registered users, Platform notifications, Updates posted on our website. Continued use of our services after changes become effective constitutes acceptance of the updated Privacy Policy.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
        <p className="mb-4">
          <strong>15.1 Data Protection Inquiries:</strong> For questions about this Privacy Policy, data processing, or to exercise your rights, contact the applicable contracting company at info@silenceai.net. UAE: Silence AI LLC, licence number 2539365.01, Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. Kazakhstan: ТОО &quot;Silence AI&quot;, БИН 250840004804, КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж.
        </p>
        <p>
          <strong>15.2 Data Subject Requests:</strong> To make a data subject request (access, rectification, deletion, etc.), please contact us using the information above. We will respond to your request within the timeframes required by applicable law.
        </p>
      </section>

      <section id="governing-law">
        <h2 className="text-2xl font-semibold mb-4">16. Governing Law</h2>
        <p>
          The parties will first try to resolve disputes relating to this Privacy Policy through mutual negotiation. If negotiation fails, disputes under agreements with Silence AI LLC shall be submitted to the competent courts in Sharjah, UAE, and disputes under agreements with ТОО &quot;Silence AI&quot; shall be submitted to the competent courts of Kazakhstan. Nothing in this notice excludes mandatory rights or court jurisdiction that the parties cannot exclude by contract.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 10.08.2026</p>
    </PolicyLayout>
  );
}
