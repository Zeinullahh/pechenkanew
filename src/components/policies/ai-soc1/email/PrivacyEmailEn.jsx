"use client";

import React from "react";
import PolicyLayout from "@/components/policies/shared/PolicyLayout";

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
      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">1. About This Privacy Policy</h2>
        <p className="mb-4">
          <strong>1.1 Agreement Scope:</strong> These Privacy Policy (&quot;Terms&quot;) govern your access to and use of the AI-CSD 1 Email Protector component provided by Silence AI LLC (&quot;Silence AI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms apply to you, the individual or entity accessing our services (&quot;you&quot; or &quot;your&quot;), and your employer or principal if you are acting on their behalf.
        </p>
        <p className="mb-4">
          <strong>1.2 Introduction:</strong> This Privacy Policy describes how Silence AI collects, uses, processes, and protects your personal information when you use the AI-CSD 1 Email Protector subsystem, including the secure webmail client. It does not apply to the Web Security &amp; Traffic Management component or any other Silence AI service operated on a separate domain.
        </p>
        <p className="mb-4">
          <strong>1.3 Controller Information:</strong> Silence AI LLC serves as the data controller for personal data processed through our services. Our business registration location is Media City Free Zone, Al Messaned, Sharjah, UAE.
        </p>
        <p className="mb-4">
          <strong>1.4 Service Domain and Scope:</strong> The AI-CSD 1 Email Policy system operates on the dedicated domains <strong>email-soc.silenceai.net</strong> and <strong>mail.silenceai.net</strong>, which provide the Email Security &amp; Visualization subsystem and secure webmail access. All references to &quot;Services&quot; or &quot;Platform&quot; in this Privacy Policy refer specifically to the systems and applications accessible through these domains.
        </p>
        <p>
          <strong>1.5 Component-Specific Processing:</strong> The Email Protector component processes email data and metadata solely for security purposes. You will only be subject to the data processing activities described here when this component is activated and in use.
        </p>
      </section>

      <section id="info-we-collect">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="mb-4">
          <strong>2.1 Account and Registration Information:</strong> Email address and account credentials, Company or organization information (if applicable), Billing and payment information, User profile and configuration settings.
        </p>
        <p className="mb-4">
          <strong>2.2 Service Usage Data:</strong> Email metadata (sender, recipient, subject, timestamps), email content and attachments (only when authorized via third-party APIs such as Gmail API or Outlook API), security classification results, and mailbox configuration data.
        </p>
        <p>
          <strong>2.3 Analytics and Performance Data:</strong> Platform usage statistics, User activity patterns (for demonstrating service traction to customers), System performance metrics, Error logs and diagnostic information.
        </p>
      </section>

      <section id="how-we-use-info">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="mb-4">
          <strong>3.1 Service Delivery:</strong> We use the information we collect to scan emails for threats, provide secure webmail access, detect phishing, malware, spam, spoofing, and suspicious links, classify messages by security risk category, and protect your mailbox and organization.
        </p>
        <p className="mb-4">
          <strong>3.2 AI-Based Processing:</strong> We process email metadata and content using artificial intelligence and natural language processing for threat detection, generate comprehensive security reports, and store classification information in our database for your exclusive access.
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
          <strong>4.1 Email API Integration:</strong> With your explicit authorization, we access email data through: Google/Gmail API for Gmail-based accounts, Microsoft/Outlook API for Outlook-based accounts.
        </p>
        <p className="mb-4">
          <strong>4.2 Security Scanning Services:</strong> Microsoft Defender: We use Microsoft Defender antivirus to scan email attachments for malware. URLScan.io: We submit email links to URLScan.io for security analysis.
        </p>
        <p className="mb-4">
          <strong>4.3 URLScan.io Data Storage:</strong> When we submit links to URLScan.io: Scan results are stored in URLScan.io&apos;s database, No email account information, sender details, recipient information, email content, or attachments are shared, Only the URL itself is submitted for analysis.
        </p>
        <p className="mb-4">
          <strong>4.4 Payment Processing:</strong> Partial payment details and transaction identifiers are handled by our payment gateway Stripe, see more in their{" "}
          <a href="https://stripe.com/legal/ssa" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Services Agreement</a>{" "}
          and{" "}
          <a href="https://stripe.com/privacy" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. We reserve the right to change our payment gateway provider in new versions of our system. Users will be notified at least 6 months prior to any such change.
        </p>
        <p>
          <strong>4.5 Cloud Infrastructure:</strong> We may use cloud service providers for data storage and processing. All third-party processors are contractually bound to protect your data in accordance with this Privacy Policy.
        </p>
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
          <strong>8.1 Global Operations:</strong> We operate data centers worldwide. When personal data is transferred across borders, we: Rely on legally permitted transfer mechanisms, Implement appropriate safeguards as required by law, Use TLS encryption for all data transfers, Ensure compliance with applicable data protection regulations.
        </p>
        <p>
          <strong>8.2 User Responsibilities:</strong> You remain responsible for any local authorizations or restrictions required for data transfers you initiate through our services.
        </p>
      </section>

      <section id="cookies">
        <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking Technologies</h2>
        <p>
          Our use of cookies is governed by our separate Cookie Policy, available at{" "}
          <a href="/policies/ai-soc1/email/cookies/" className="text-blue-400 hover:text-blue-300 underline">
            /policies/ai-soc1/email/cookies/
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
          The Email Protector service includes a secure webmail client that classifies messages by security risk category. Emails are scanned and analyzed solely for security purposes, including anti-phishing, malware and threat detection.
        </p>
        <p className="mb-4">
          During mailbox migration from existing Gmail or Outlook accounts, Silence AI does not scan, analyze, or classify the content of migrated emails. Only after migration, when the Webmail Client is in active use, are all incoming emails automatically scanned and classified for security purposes. This refusal to process migrated email content is a deliberate privacy and compliance measure.
        </p>
        <p className="mb-4">
          <strong>12.1 Five-Layer Email Security Validation Process:</strong> Each incoming email is subjected to a sequential five-layer security validation process designed to identify and classify potential security threats. The validation sequence operates as follows:
        </p>
        <div className="pl-6 space-y-2 mb-4">
          <p>
            <strong>Layer 1 — Sender Authentication Verification:</strong> The system verifies the authenticity of the email sender by analyzing email headers, SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain-based Message Authentication, Reporting, and Conformance) records to detect potential email spoofing.
          </p>
          <p>
            <strong>Layer 2 — Spam Detection:</strong> The system evaluates incoming messages for spam characteristics, including but not limited to repetitive or unsolicited content from a single sender, improper or misconfigured DNS settings of the sending domain, and patterns consistent with bulk email distribution. Messages meeting spam criteria are flagged accordingly.
          </p>
          <p>
            <strong>Layer 3 — Dangerous Link Analysis:</strong> All hyperlinks embedded within the email body and attachments are extracted and analyzed for malicious intent, including links to known malware distribution sites, exploit kits, or domains with malicious reputation scores.
          </p>
          <p>
            <strong>Layer 4 — Domain-Based Phishing Detection:</strong> The system performs domain validation to identify phishing attempts through analysis of sender domain characteristics, including detection of typosquatting domains (e.g., &quot;rncrosoft.com&quot; impersonating &quot;microsoft.com&quot;), lookalike domains, and domains recently registered for malicious purposes.
          </p>
          <p>
            <strong>Layer 5 — AI-Powered Content Analysis:</strong> Utilizing artificial intelligence and natural language processing, the system analyzes the email body content to detect phishing context, social engineering patterns, urgency-based manipulation tactics, and other indicators of fraudulent communication.
          </p>
        </div>
        <p className="mb-4">
          <strong>12.2 Automated Folder Classification:</strong> Based on the results of the five-layer validation process, each email is automatically classified and directed to one of the following designated folders:
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>Possibly Spoofed:</strong> Emails that fail sender authentication verification (Layer 1).</li>
          <li><strong>Spam:</strong> Emails identified as spam or originating from improperly configured mail servers (Layer 2).</li>
          <li><strong>Dangerous Link:</strong> Emails containing one or more hyperlinks identified as malicious or suspicious (Layer 3).</li>
          <li><strong>Possibly Phishing:</strong> Emails identified through domain analysis or AI-powered content analysis as potentially fraudulent (Layers 4 and 5).</li>
          <li><strong>Secure:</strong> Emails that successfully pass all five layers of security validation without triggering any security classifications.</li>
        </ul>
        <p className="mb-4">
          The classification process is automated and sequential. If an email matches the criteria for any security risk category during the validation sequence, it is immediately routed to the corresponding folder. Only emails that successfully pass all five validation layers are classified as &quot;Secure.&quot;
        </p>
        <p>
          <strong>12.3 Administrator Access and Data Privacy:</strong> Email content may be accessible to the organization administrator that created or manages the user account within the Centralized Management Console (CMC). Silence AI does not access or view email content except as required to provide the security-scanning functionality or where legally required.
        </p>
      </section>

      <section id="human-access-prohibition">
        <h2 className="text-2xl font-semibold mb-4">13. Prohibition on Human Access to User Email Content</h2>
        <p className="mb-4">
          Silence AI LLC strictly prohibits any and all human personnel — including, without limitation, employees, contractors, founders, engineers, support staff, security analysts, and any other human team members of Silence AI — from reading, accessing, reviewing, copying, or otherwise inspecting the content of any user email, whether in transit or at rest, for any purpose whatsoever.
        </p>
        <p className="mb-4">
          All email scanning, classification, and threat-detection operations performed by the Email Protector service are carried out exclusively by automated, AI-powered systems and programmatic pipelines, with no human involvement in the processing or review of email content.
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
          <strong>15.1 Data Protection Inquiries:</strong> For questions about this Privacy Policy, data processing, or to exercise your rights, contact us at: Silence AI LLC, Email: info@silenceai.net, Website: https://silenceai.net, Address: Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE.
        </p>
        <p>
          <strong>15.2 Data Subject Requests:</strong> To make a data subject request (access, rectification, deletion, etc.), please contact us using the information above. We will respond to your request within the timeframes required by applicable law.
        </p>
      </section>

      <section id="governing-law">
        <h2 className="text-2xl font-semibold mb-4">16. Governing Law</h2>
        <p>
          This Privacy Policy is governed by the laws of the United Arab Emirates. Any disputes relating to privacy matters will be subject to the jurisdiction of the courts located in Sharjah, United Arab Emirates.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 10.08.2026</p>
    </PolicyLayout>
  );
}
