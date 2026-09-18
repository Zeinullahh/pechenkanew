"use client";
import React from "react";
import PolicyLayout from "@/components/policies/shared/PolicyLayout";

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
      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">1. About These Terms</h2>
        <p className="mb-4">
          <strong>1.1 Agreement Scope:</strong> These Terms of Use (&quot;Terms&quot;) govern your access to and use of the AI-CSD 1 Email Security &amp; Visualization component provided by Silence AI LLC (&quot;Silence AI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms apply to you, the individual or entity accessing our services (&quot;you&quot; or &quot;your&quot;), and your employer or principal if you are acting on their behalf.
        </p>
        <p className="mb-4">
          <strong>1.2 Authority and Acceptance:</strong> If you are entering into these Terms on behalf of a company, organization, or other entity, you represent that you have the authority to bind such entity to these Terms. By accessing or using our services, you agree to be bound by these Terms. If you do not agree with these Terms, you must discontinue use of our services immediately.
        </p>
        <p className="mb-4">
          <strong>1.3 Service Domain and Scope:</strong> The AI-CSD 1 Email Policy system operates across two dedicated domains: (i) <strong>email-soc.silenceai.net</strong> — the Centralized Management Console (CMC) for the Email Security &amp; Visualization subsystem, accessible to administrators; and (ii) <strong>mail.silenceai.net</strong> — the Webmail Client through which end users send and receive emails, accessible to users without administrative privileges. These Terms of Use apply exclusively to services accessible through the aforementioned domains. Any services provided on different domains are subject to separate terms and policies.
        </p>
        <p className="mb-4">
          <strong>1.4 Age Requirement:</strong> Our services are intended for users who are at least 13 years old. By accessing or using the services, you represent and warrant that you are 13 years of age or older. If you are under 13, you must not access or use the services.
        </p>
      </section>

      <section id="service-description">
        <h2 className="text-2xl font-semibold mb-4">2. Service Description and Pricing</h2>
        <p className="mb-4">
          <strong>2.2 Email Security &amp; Visualization:</strong> Email Security &amp; Visualization offers AI-powered email protection with advanced email-flow visualization, phishing and spoofing defense, and spam filtering. This component includes the <strong>CMC</strong> and a secure <strong>Webmail Client</strong>. The Webmail Client currently supports Outlook- and Gmail-based accounts and is designed for your company&apos;s corporate email addresses. The CMC lets administrators add and manage corporate email accounts and provides a visual view of all incoming and outgoing emails across the organization.
        </p>
        <p className="mb-4">
          During mailbox migration from existing Gmail or Outlook accounts, Silence AI does not scan, analyze, or classify the content of migrated emails. Only after migration, when the Webmail Client is in active use, are all incoming emails automatically scanned and classified for security purposes. This refusal to process migrated email content is a deliberate privacy and compliance measure.
        </p>
        <p className="mb-4">
          <strong>2.2.1 Five-Layer Email Security Architecture:</strong> The Email Security &amp; Visualization component integrates a comprehensive five-layer sequential validation process for all incoming emails. Each email undergoes the following security assessment sequence:
        </p>
        <div className="pl-6 space-y-2 mb-4">
          <p><strong>Layer 1 — Sender Authentication Verification:</strong> Validation of email authenticity through analysis of SPF, DKIM, and DMARC authentication protocols to detect spoofed or forged sender addresses.</p>
          <p><strong>Layer 2 — Spam Detection:</strong> Identification of unsolicited bulk email, messages from senders with improper DNS configurations, and patterns consistent with spam distribution networks.</p>
          <p><strong>Layer 3 — Dangerous Link Analysis:</strong> Automated scanning and evaluation of all hyperlinks embedded within email content and attachments to identify malicious URLs, exploit distribution sites, and compromised domains.</p>
          <p><strong>Layer 4 — Domain-Based Phishing Detection:</strong> Analysis of sender domain characteristics to detect typosquatting, lookalike domains, and other domain-based phishing techniques (e.g., detection of &quot;rncrosoft.com&quot; impersonating legitimate domains).</p>
          <p><strong>Layer 5 — AI-Powered Content Analysis:</strong> Utilization of artificial intelligence to analyze email body content for phishing context, social engineering indicators, and fraudulent communication patterns.</p>
        </div>
        <p className="mb-4">
          <strong>2.2.2 Automated Folder Classification:</strong> Based on the results of the five-layer validation process, emails are automatically classified and routed to designated security folders: <strong>Possibly Spoofed</strong> (failed authentication), <strong>Spam</strong> (spam characteristics detected), <strong>Dangerous Link</strong> (malicious URLs identified), <strong>Possibly Phishing</strong> (phishing indicators detected), or <strong>Secure</strong> (passed all validation layers). This classification system enables users to efficiently identify and manage security threats while maintaining access to verified secure communications.
        </p>
        <p className="mb-4">
          <strong>2.3 Pricing Information:</strong> Current pricing for AI-CSD 1 services is available on our website at{" "}
          <a
            href="https://silenceai.net/en/ai-soc/"
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            silenceai.net/en/ai-soc/
          </a>
          . We reserve the right to modify our pricing at any time. Price changes will be communicated through our platform and will take effect for new billing cycles after the notification period.
        </p>
      </section>

      <section id="sla">
        <h2 className="text-2xl font-semibold mb-4">3. Service Level Agreement and Availability</h2>
        <p className="mb-4">
          <strong>3.1 100% Uptime SLA Guarantee:</strong> We provide a 100% Service Level Agreement (SLA) for service availability. In the event of any downtime that affects your use of our services, you are entitled to a full money-back guarantee for all pay-as-you-go fees charged by the system during the affected period. Downtime is measured in whole minutes from the moment service becomes unavailable to the moment full service is restored. The refundable amount is calculated as the total pay-as-you-go usage fees accrued by the system during each confirmed minute of downtime, as recorded in our billing logs.
        </p>
        <p className="mb-4">
          <strong>3.2 Email Delivery Speed SLA:</strong> We provide a 100% SLA for email delivery speed within the Email Security &amp; Visualization component. All incoming emails processed by the system are guaranteed to be delivered to the recipient&apos;s designated security folder within ten (10) minutes of receipt by our platform. In the event that any email delivery exceeds this ten-minute threshold due to a fault attributable to our platform, the affected pay-as-you-go fees charged during the period of delay shall be subject to the money-back guarantee set out in Section 3.1. This SLA applies solely to delays caused by our platform and does not cover delays attributable to third-party mail providers, network transit, or sender-side infrastructure.
        </p>
        <p>
          <strong>3.3 Service Availability:</strong> While we strive to maintain continuous service availability, we may suspend or terminate access to our services for maintenance, updates, or other operational requirements with advance notice when possible. Planned maintenance windows communicated in advance are excluded from SLA downtime calculations under Sections 3.1 and 3.2.
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
            href="/policies/ai-soc1/email/privacy/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-soc1/email/privacy/
          </a>
          .
        </p>
      </section>

      <section id="service-activation">
        <h2 className="text-2xl font-semibold mb-4">6. Service Activation and Free Trials</h2>
        <p className="mb-4">
          <strong>6.1 Component Activation:</strong> Each service component requires individual activation. Before activation, you will have access to system demonstrations, pricing videos, and informational content. The activation process is free, and you only pay for actual usage, which you must explicitly initiate.
        </p>
        <p className="mb-4">
          <strong>6.2 Consent Process:</strong> When you click &quot;Activate&quot; for any service component, a popup window will appear containing the relevant privacy policy and terms specific to that component. You must provide consent before the service becomes fully accessible.
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
            href="/policies/ai-soc1/email/privacy/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-soc1/email/privacy/
          </a>
          .
        </p>
        <p className="mb-4">
          <strong>8.2 Data Security:</strong> We implement industry-standard security measures to protect your data and maintain the confidentiality of your information.
        </p>
        <p id="email-access" className="mb-4">
          <strong>8.3 Prohibition on Unauthorized Staff Access to Client Email Data:</strong> Silence AI personnel — including employees, contractors, officers, directors, and any other human agents acting on behalf of Silence AI LLC — are strictly prohibited from reading, accessing, copying, or otherwise reviewing the content of any email messages, email attachments, or email metadata belonging to or associated with a client&apos;s mailboxes, without the <strong>prior, explicit, and documented written consent</strong> of the relevant client organization. This prohibition applies regardless of whether such email data is technically accessible via internal systems, administrative tooling, or third-party API integrations used to provide the Email Security &amp; Visualization component of the Service. Client email data is processed exclusively by automated systems for the sole purpose of delivering the contracted security-scanning and visualization services. Any deviation from this rule, including access for debugging, support, or audit purposes, must be preceded by a written authorization request submitted to, and approved in writing by, an authorized representative of the client. Unauthorized access to client email data by any Silence AI personnel constitutes a material breach of this Agreement and may result in disciplinary action, termination of employment or engagement, and civil or criminal liability under applicable law. Silence AI maintains internal access-control policies and audit logs to enforce and evidence compliance with this provision.
        </p>
        <div id="email-security-domain" className="mb-4">
          <p className="mb-4">
            <strong>8.4 Email Security and Domain Protection Mechanisms:</strong> As part of the Email Security &amp; Visualization component of the Service, Silence AI enforces industry-standard email authentication mechanisms — including Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM), and Domain-based Message Authentication, Reporting, and Conformance (DMARC) — designed to prevent unauthorized use of a customer&apos;s registered domain for the purposes of email spoofing, impersonation, or fraudulent message delivery.
          </p>
          <p className="mb-4">
            <strong>8.4.1 DMARC Policy Configuration During Setup:</strong> As part of the mandatory domain configuration process, customers are required to complete a guided setup flow during which they must explicitly select a DMARC enforcement policy for their domain. The platform provides exactly two enforcement options: <strong>&quot;reject&quot;</strong> (instructing receiving mail servers to discard unauthenticated messages outright) or <strong>&quot;quarantine&quot;</strong> (instructing receiving mail servers to treat unauthenticated messages as suspicious and route them to a separate folder or hold queue). No alternative enforcement levels are available within the platform. Domain activation is contingent upon the customer completing this configuration step and selecting one of the two aforementioned enforcement policies. The customer retains full responsibility for publishing and maintaining the appropriate DNS records necessary to activate and enforce their selected DMARC policy on their domain.
          </p>
          <p className="mb-4">
            <strong>8.4.2 SPF and DKIM Alignment Enforcement:</strong> The platform enforces alignment checks using SPF and DKIM in accordance with DMARC alignment requirements, as defined by RFC 7489. These alignment checks are designed to ensure that only authorized sending sources — those whose infrastructure is explicitly permitted by the customer&apos;s published DNS records — may send email on behalf of the customer&apos;s domain within supported email flows. Alignment verification is performed where technically supported by the platform&apos;s infrastructure and the receiving mail server&apos;s configuration. Silence AI does not warrant that alignment enforcement will prevent all forms of domain misuse in environments where the customer has not fully published the requisite DNS records or where third-party sending infrastructure bypasses authenticated email flows.
          </p>
          <p className="mb-4">
            <strong>8.4.3 Default Secure Baseline Configuration:</strong> In the event that a customer registers with the Service and does not modify the default DNS or email security settings provided upon account creation, the platform will apply a recommended secure baseline configuration to that customer&apos;s email security profile. This baseline configuration is intended to minimize spoofing risk and is consistent with widely accepted email authentication best practices. Customers are strongly encouraged to review and customize their DNS and email authentication settings to reflect their specific operational requirements. The application of the default baseline configuration does not constitute a guarantee of absolute protection against email spoofing or domain abuse.
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
            href="/policies/ai-soc1/email/cookies/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-soc1/email/cookies/
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
          <strong>12.1 Termination by You:</strong> You may terminate your use of our services at any time by discontinuing use and closing your account.
        </p>
        <p className="mb-4">
          <strong>12.2 Termination by Us:</strong> We may suspend or terminate your access to our services if you violate these Terms or engage in activities that harm our services or other users.
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
          <strong>14.1 Applicable Law:</strong> These Terms are governed by the laws of the United Arab Emirates, without regard to conflict of law principles.
        </p>
        <p>
          <strong>14.2 Dispute Resolution:</strong> If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting us. If informal resolution is unsuccessful, disputes shall be resolved through binding arbitration or in courts of competent jurisdiction as determined by applicable law of the United Arab Emirates.
        </p>
      </section>

      <section id="changes">
        <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify you of material changes through our platform or via email. Your continued use of our services after such modifications constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
        <p>For questions about these Terms or our services, please contact us at:</p>
        <p>Silence AI LLC</p>
        <p>Email: info@silenceai.net</p>
        <p>Website: silenceai.net</p>
        <p>Business registration location: Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE</p>
      </section>

      <section id="misc">
        <h2 className="text-2xl font-semibold mb-4">17. Miscellaneous</h2>
        <p className="mb-4">
          <strong>17.1 Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
        </p>
        <p className="mb-4">
          <strong>17.2 Entire Agreement:</strong> These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and Silence AI regarding your use of our services.
        </p>
        <p>
          <strong>17.3 Assignment:</strong> We may assign these Terms or our rights hereunder without your consent. You may not assign these Terms without our prior written consent.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 14.05.2026</p>
    </PolicyLayout>
  );
}
