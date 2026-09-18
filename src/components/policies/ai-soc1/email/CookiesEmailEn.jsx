"use client";
import React from "react";
import PolicyLayout from "@/components/policies/shared/PolicyLayout";

const sections = [
  { id: "about", title: "1. About This Cookie Policy" },
  { id: "types-of-cookies", title: "2. Types of Cookies We Use" },
  { id: "what-we-dont-use", title: "3. What We Don't Use" },
  { id: "how-we-use-cookies", title: "4. How We Use Technical Cookies" },
  { id: "cookie-duration", title: "5. Cookie Duration and Storage" },
  { id: "managing-cookies", title: "6. Managing Your Cookie Preferences" },
  { id: "third-party-services", title: "7. Third-Party Services" },
  { id: "updates", title: "8. Updates to This Cookie Policy" },
  { id: "contact", title: "9. Contact Information" },
  { id: "related-policies", title: "10. Relationship to Other Policies" },
];

export default function CookiesEmailEn() {
  return (
    <PolicyLayout
      title="AI-CSD 1 Email Policy"
      subtitle="Cookie Policy"
      sections={sections}
    >
      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">1. About This Cookie Policy</h2>
        <p className="mb-4">
          <strong>1.1 Introduction:</strong> This Cookie Policy explains how Silence AI LLC (&quot;Silence AI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies on the AI-CSD 1 Email Security &amp; Visualization platform and services, including the Centralized Management Console (CMC) at <strong>email-soc.silenceai.net</strong> and the Webmail Client at <strong>mail.silenceai.net</strong>.
        </p>
        <p>
          <strong>1.2 What Are Cookies:</strong> Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.
        </p>
      </section>

      <section id="types-of-cookies">
        <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
        <p className="mb-4">
          <strong>2.1 Technical Cookies (Essential):</strong> We use technical cookies that are strictly necessary for the operation of the AI-CSD 1 Email Security &amp; Visualization component and its CMC. These cookies support: Session Management — maintaining your login session and authentication state on the CMC and Webmail Client; Security — protecting the email CMC and Webmail Client against unauthorized access and supporting email authentication validation; Functionality — enabling core email CMC features, email-flow visualization, and security-folder management; Load Balancing — distributing email CMC and Webmail traffic across our servers for optimal performance; Platform Stability — ensuring proper functioning of the five-layer email security validation and automated folder classification.
        </p>
        <p>
          <strong>2.2 Cookie Categories:</strong> All cookies used by Silence AI for the Email Security component fall under the &quot;Strictly Necessary&quot; category. These cookies are essential for: User authentication and account access to the email CMC and Webmail Client; Maintaining user sessions across email-soc.silenceai.net and mail.silenceai.net; Ensuring security of the email security visualization and webmail subsystem; Preserving user preferences and configuration settings; Platform functionality and service delivery.
        </p>
      </section>

      <section id="what-we-dont-use">
        <h2 className="text-2xl font-semibold mb-4">3. What We Don&apos;t Use</h2>
        <p className="mb-4">
          <strong>3.1 No Marketing or Tracking Cookies:</strong> We do not use: Marketing or advertising cookies, Social media tracking cookies, Third-party analytics cookies beyond what is strictly necessary, Cross-site tracking technologies, Behavioral profiling cookies, Non-essential third-party cookies.
        </p>
        <p>
          <strong>3.2 No Cookie-Based Data Sharing:</strong> We do not: Share cookie data with third parties for marketing purposes, Use cookies for advertising targeting, Create detailed user profiles for commercial exploitation, Participate in cookie-based data trading or selling.
        </p>
      </section>

      <section id="how-we-use-cookies">
        <h2 className="text-2xl font-semibold mb-4">4. How We Use Technical Cookies</h2>
        <p className="mb-4">
          <strong>4.1 Session Management:</strong> Authenticate users accessing the email CMC at email-soc.silenceai.net and the Webmail Client at mail.silenceai.net; Maintain login state across different pages and services of the Email Security component; Prevent unauthorized access to user accounts; Enable seamless navigation between email security visualization, mailbox management, and security-folder views.
        </p>
        <p className="mb-4">
          <strong>4.2 Security Functions:</strong> Implement security measures to protect user accounts and the email CMC; Detect and prevent fraudulent access attempts; Support email authentication mechanisms including SPF, DKIM, and DMARC; Protect against cross-site request forgery (CSRF) attacks.
        </p>
        <p className="mb-4">
          <strong>4.3 Email Security Validation:</strong> Cookies enable the operation of the five-layer email security validation process: Layer 1 — Sender Authentication Verification (SPF, DKIM, DMARC); Layer 2 — Spam Detection; Layer 3 — Dangerous Link Analysis; Layer 4 — Domain-Based Phishing Detection; Layer 5 — AI-Powered Content Analysis. Based on these results, emails are classified into folders such as Possibly Spoofed, Spam, Dangerous Link, Possibly Phishing, and Secure.
        </p>
        <p>
          <strong>4.4 Platform Functionality:</strong> Remember user preferences and email security settings; Maintain configuration for mailbox accounts and security rules; Store temporary data necessary for webmail and email visualization service delivery; Enable proper functioning of the Webmail Client and CMC.
        </p>
      </section>

      <section id="cookie-duration">
        <h2 className="text-2xl font-semibold mb-4">5. Cookie Duration and Storage</h2>
        <p className="mb-4">
          <strong>5.1 Session Cookies:</strong> Most of our cookies are session cookies that: Expire when you close your browser, Are automatically deleted after session termination, Do not persist on your device long-term.
        </p>
        <p>
          <strong>5.2 Persistent Cookies:</strong> Some technical cookies may persist for: Authentication purposes (typically 30 days maximum), User preference storage (until manually cleared), Security settings maintenance (as configured by user).
        </p>
      </section>

      <section id="managing-cookies">
        <h2 className="text-2xl font-semibold mb-4">6. Managing Your Cookie Preferences</h2>
        <p className="mb-4">
          <strong>6.1 Browser Controls:</strong> You can control cookies through your browser settings: Chrome: {`Settings > Privacy and Security > Cookies and other site data`}. Firefox: {`Options > Privacy & Security > Cookies and Site Data`}. Safari: {`Preferences > Privacy > Manage Website Data`}. Edge: {`Settings > Cookies and site permissions > Cookies and site data`}.
        </p>
        <p>
          <strong>6.2 Impact of Disabling Technical Cookies:</strong> Important Notice: Since we only use technical cookies essential for Email Security operation, disabling these cookies will: Prevent you from logging into the email CMC at email-soc.silenceai.net and the Webmail Client at mail.silenceai.net; Disable access to email security visualization, five-layer validation, and automated folder classification; Impair security features and anti-phishing/anti-spam capabilities; Make the email security services non-functional.
        </p>
      </section>

      <section id="third-party-services">
        <h2 className="text-2xl font-semibold mb-4">7. Third-Party Services</h2>
        <p className="mb-4">
          <strong>7.1 Limited Third-Party Cookie Usage:</strong> While we minimize third-party services, some essential email integrations may set their own cookies: Email service providers such as Google/Gmail API and Microsoft/Outlook API (for authorized mailbox access), Cloud infrastructure providers (for service delivery), Essential security services supporting email scanning and link analysis.
        </p>
        <p>
          <strong>7.2 Third-Party Cookie Control:</strong> Any third-party cookies are limited to: Technical functionality required for our services, Authorized email API connectivity, Essential security and infrastructure needs. We do not permit third parties to set non-essential tracking or marketing cookies through our platform.
        </p>
      </section>

      <section id="updates">
        <h2 className="text-2xl font-semibold mb-4">8. Updates to This Cookie Policy</h2>
        <p className="mb-4">
          <strong>8.1 Policy Changes:</strong> We may update this Cookie Policy to: Reflect changes in our cookie usage, Comply with updated legal requirements, Improve transparency about our practices.
        </p>
        <p>
          <strong>8.2 Notification of Changes:</strong> Material changes will be communicated through: Email notifications to registered users, Platform notifications, Updated posting date on this policy.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
        <p>
          For questions about our Cookie Policy or cookie practices, contact us at: Silence AI LLC, Email: info@silenceai.net, Website: https://silenceai.net, Address: Media City Free Zone, Al Messaned, Sharjah, UAE.
        </p>
      </section>

      <section id="related-policies">
        <h2 className="text-2xl font-semibold mb-4">10. Relationship to Other Policies</h2>
        <p className="mb-4">
          This Cookie Policy supplements our AI-CSD 1 Email Privacy Policy, available at{" "}
          <a
            href="/policies/ai-soc1/email/privacy/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-soc1/email/privacy/
          </a>
          .
        </p>
        <p>
          For the Web component Cookie Policy, see{" "}
          <a
            href="/policies/ai-soc1/web/cookies/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-soc1/web/cookies/
          </a>
          .
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 10.08.2026</p>
    </PolicyLayout>
  );
}
