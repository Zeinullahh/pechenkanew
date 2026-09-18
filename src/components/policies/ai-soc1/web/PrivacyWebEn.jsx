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
  { id: "changes", title: "12. Changes to This Privacy Policy" },
  { id: "contact", title: "13. Contact Information" },
  { id: "governing-law", title: "14. Governing Law" },
];

export default function PrivacyWebEn() {
  return (
    <PolicyLayout
      title="AI-CSD 1 Web Policy"
      subtitle="Privacy Policy"
      sections={sections}
    >
      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">1. About This Privacy Policy</h2>
        <p className="mb-4">
          <strong>1.1 Agreement Scope:</strong> These Privacy Policy (&quot;Terms&quot;) govern your access to and use of the AI-CSD 1 Web Security &amp; Traffic Management component provided by Silence AI LLC (&quot;Silence AI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms apply to you, the individual or entity accessing our services (&quot;you&quot; or &quot;your&quot;), and your employer or principal if you are acting on their behalf.
        </p>
        <p className="mb-4">
          <strong>1.2 Introduction:</strong> This Privacy Policy describes how Silence AI collects, uses, processes, and protects your personal information when you use the AI-CSD 1 Web Security &amp; Traffic Management subsystem. It does not apply to the Email Protector or any other Silence AI component operated on a separate domain.
        </p>
        <p className="mb-4">
          <strong>1.3 Controller Information:</strong> Silence AI LLC serves as the data controller for personal data processed through our services. Our business registration location is Media City Free Zone, Al Messaned, Sharjah, UAE.
        </p>
        <p className="mb-4">
          <strong>1.4 Service Domain and Scope:</strong> The AI-CSD 1 Web Policy system operates on the dedicated domain <strong>web-soc.silenceai.net</strong> — the Centralized Management Console (CMC) for the Web Security &amp; Traffic Management subsystem, accessible to administrators, and the <strong>Agent</strong> that runs as a reverse proxy to filter all incoming web traffic. All references to &quot;Services&quot; or &quot;Platform&quot; in this Privacy Policy refer specifically to the systems and applications accessible through this domain.
        </p>
        <p>
          <strong>1.5 Component-Specific Processing:</strong> The Web Security &amp; Traffic Management component processes web traffic and security data only. You will only be subject to the data processing activities described here when this component is activated and in use.
        </p>
      </section>

      <section id="info-we-collect">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="mb-4">
          <strong>2.1 Account and Registration Information:</strong> Email address and account credentials, Company or organization information (if applicable), Billing and payment information, User profile and configuration settings.
        </p>
        <p className="mb-4">
          <strong>2.2 Service Usage Data:</strong> Web server logs, IP addresses, request URIs, timestamps, HTTP headers, user-agent strings, country codes, traffic patterns, DDoS and attack metadata, and Agent/CMC configuration data.
        </p>
        <p>
          <strong>2.3 Analytics and Performance Data:</strong> Platform usage statistics, User activity patterns (for demonstrating service traction to customers), System performance metrics, Error logs and diagnostic information.
        </p>
      </section>

      <section id="how-we-use-info">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="mb-4">
          <strong>3.1 Service Delivery:</strong> We use the information we collect to monitor and protect web applications, detect and prevent attacks (including DDoS, SQL injection, and other common web vulnerabilities), provide real-time traffic analysis, enforce country-level access control and port restrictions, and operate the Agent as a reverse proxy that filters all incoming traffic and forwards only legitimate requests to your website.
        </p>
        <p className="mb-4">
          <strong>3.2 AI-Based Processing:</strong> We analyze web traffic and security events using artificial intelligence, generate comprehensive security reports, and store security information in our database for your exclusive access.
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
          <strong>4.1 Payment Processing:</strong> Partial payment details and transaction identifiers are handled by our payment gateway Stripe, see more in their{" "}
          <a href="https://stripe.com/legal/ssa" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Services Agreement</a>{" "}
          and{" "}
          <a href="https://stripe.com/privacy" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. We reserve the right to change our payment gateway provider in new versions of our system. Users will be notified at least 6 months prior to any such change.
        </p>
        <p>
          <strong>4.2 Cloud Infrastructure:</strong> We may use cloud service providers for data storage and processing. All third-party processors are contractually bound to protect your data in accordance with this Privacy Policy.
        </p>
      </section>

      <section id="data-storage">
        <h2 className="text-2xl font-semibold mb-4">5. Data Storage and Retention</h2>
        <p className="mb-4">
          <strong>5.1 Web Traffic Logs:</strong> Web server logs and traffic metadata are retained for 90 days by default (modifiable by you through the CMC). Logs are used for security analysis, attack investigation, and service improvement.
        </p>
        <p className="mb-4">
          <strong>5.2 Default Retention Periods:</strong> Web server logs: 90 days (modifiable by user), User activity logs: Stored for analytics and service improvement purposes, Account information: Retained while your account is active.
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
          <strong>6.2 User Responsibilities:</strong> You are solely responsible for: Maintaining the security of your account credentials, Ensuring that websites you connect to the Agent are owned or authorized by you, Compliance with applicable laws when using our services.
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
          <a href="/policies/ai-soc1/web/cookies/" className="text-blue-400 hover:text-blue-300 underline">
            /policies/ai-soc1/web/cookies/
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

      <section id="changes">
        <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes will be communicated through: Email notification to registered users, Platform notifications, Updates posted on our website. Continued use of our services after changes become effective constitutes acceptance of the updated Privacy Policy.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
        <p className="mb-4">
          <strong>13.1 Data Protection Inquiries:</strong> For questions about this Privacy Policy, data processing, or to exercise your rights, contact us at: Silence AI LLC, Email: info@silenceai.net, Website: https://silenceai.net, Address: Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE.
        </p>
        <p>
          <strong>13.2 Data Subject Requests:</strong> To make a data subject request (access, rectification, deletion, etc.), please contact us using the information above. We will respond to your request within the timeframes required by applicable law.
        </p>
      </section>

      <section id="governing-law">
        <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
        <p>
          This Privacy Policy is governed by the laws of the United Arab Emirates. Any disputes relating to privacy matters will be subject to the jurisdiction of the courts located in Sharjah, United Arab Emirates.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 10.08.2026</p>
    </PolicyLayout>
  );
}
