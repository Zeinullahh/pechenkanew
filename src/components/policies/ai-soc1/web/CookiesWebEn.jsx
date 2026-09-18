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
  { id: "payment-services", title: "11. Payment Processing Services" },
];

export default function CookiesWebEn() {
  return (
    <PolicyLayout
      title="AI-CSD 1 Web Policy"
      subtitle="Cookie Policy"
      sections={sections}
    >
      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">1. About This Cookie Policy</h2>
        <p className="mb-4">
          <strong>1.1 Introduction:</strong> This Cookie Policy explains how Silence AI LLC (&quot;Silence AI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies on the AI-CSD 1 Web Security &amp; Traffic Management platform and services, including the Centralized Management Console (CMC) at <strong>web-soc.silenceai.net</strong> and the Agent/reverse proxy infrastructure.
        </p>
        <p>
          <strong>1.2 What Are Cookies:</strong> Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.
        </p>
      </section>

      <section id="types-of-cookies">
        <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
        <p className="mb-4">
          <strong>2.1 Technical Cookies (Essential):</strong> We use technical cookies that are strictly necessary for the operation of the AI-CSD 1 Web Security &amp; Traffic Management component and its CMC. These cookies support: Session Management — maintaining your login session and authentication state on the CMC; Security — protecting the CMC and Agent against unauthorized access and supporting web attack mitigation; Functionality — enabling core CMC features, traffic visualization, and Agent configuration; Load Balancing — distributing CMC traffic across our servers for optimal performance; Platform Stability — ensuring proper functioning of the Agent reverse proxy and DDoS mitigation services.
        </p>
        <p>
          <strong>2.2 Cookie Categories:</strong> All cookies used by Silence AI for the Web Security component fall under the &quot;Strictly Necessary&quot; category. These cookies are essential for: User authentication and account access to the web CMC; Maintaining user sessions across the CMC and Agent management pages; Ensuring security of the web traffic management and reverse proxy subsystem; Preserving user preferences and configuration settings; Platform functionality and service delivery.
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
          <strong>4.1 Session Management:</strong> Authenticate users accessing the CMC at web-soc.silenceai.net; Maintain login state across different pages and services of the Web Security component; Prevent unauthorized access to user accounts; Enable seamless navigation between traffic dashboards, Agent configuration, and security settings.
        </p>
        <p className="mb-4">
          <strong>4.2 Security Functions:</strong> Implement security measures to protect user accounts and the CMC; Detect and prevent fraudulent access attempts; Maintain secure connections during traffic management and DDoS mitigation; Protect against cross-site request forgery (CSRF) attacks.
        </p>
        <p>
          <strong>4.3 Platform Functionality:</strong> Remember user preferences and security rule settings in the CMC; Maintain configuration for the Agent reverse proxy and traffic filtering policies; Store temporary data necessary for web security service delivery; Enable proper functioning of the CMC and Agent management interfaces.
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
          <strong>6.2 Impact of Disabling Technical Cookies:</strong> Important Notice: Since we only use technical cookies essential for Web Security operation, disabling these cookies will: Prevent you from logging into the CMC at web-soc.silenceai.net; Disable access to traffic management, Agent configuration, and DDoS mitigation; Impair security features and web protection capabilities; Make the web security services non-functional.
        </p>
      </section>

      <section id="third-party-services">
        <h2 className="text-2xl font-semibold mb-4">7. Third-Party Services</h2>
        <p className="mb-4">
          <strong>7.1 Limited Third-Party Cookie Usage:</strong> While we minimize third-party services, some essential integrations may set their own cookies: Payment processors (for billing functionality), Cloud infrastructure providers (for service delivery), Essential security services supporting the Agent and CMC.
        </p>
        <p>
          <strong>7.2 Third-Party Cookie Control:</strong> Any third-party cookies are limited to: Technical functionality required for our services, Payment processing and billing operations, Essential security and infrastructure needs. We do not permit third parties to set non-essential tracking or marketing cookies through our platform.
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
          This Cookie Policy supplements our AI-CSD 1 Web Privacy Policy, available at{" "}
          <a
            href="/policies/ai-soc1/web/privacy/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-soc1/web/privacy/
          </a>
          .
        </p>
        <p>
          For the Email component Cookie Policy, see{" "}
          <a
            href="/policies/ai-soc1/email/cookies/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-soc1/email/cookies/
          </a>
          .
        </p>
      </section>

      <section id="payment-services">
        <h2 className="text-2xl font-semibold mb-4">11. Payment Processing Services</h2>
        <p className="mb-4">
          <strong>11.1 Stripe Payment Integration:</strong> We utilize Stripe, Inc. (&quot;Stripe&quot;) as our third-party payment processor to facilitate secure transactions on our platform. Stripe is a globally recognized and PCI DSS Level 1 certified payment service provider, ensuring the highest standards of payment security and regulatory compliance.
        </p>
        <p className="mb-4">
          <strong>11.2 Stripe Cookies and Data Collection:</strong> When you engage with our payment services, Stripe may utilize cookies and similar tracking technologies to collect certain information from your device. This data collection is essential for: (a) Fraud prevention and detection; (b) Geolocation verification; (c) Device fingerprinting; (d) Session management.
        </p>
        <p className="mb-4">
          <strong>11.3 Categories of Data Processed:</strong> Stripe may collect and process IP address and derived geolocation data, browser type and version, device identifiers, transaction metadata, and behavioral data related to payment interactions. This information is processed in accordance with Stripe&apos;s Privacy Policy (available at https://stripe.com/privacy) and applicable data protection legislation.
        </p>
        <p className="mb-4">
          <strong>11.4 Legal Basis for Processing:</strong> The processing of data by Stripe through cookies is conducted pursuant to contractual necessity, legitimate interests for fraud prevention and security, and legal obligations.
        </p>
        <p className="mb-4">
          <strong>11.5 Data Retention and Transfers:</strong> Stripe may retain payment-related data for the period necessary to fulfill the purposes outlined above, comply with legal obligations, resolve disputes, and enforce agreements. Such data may be transferred to and processed in jurisdictions outside your country of residence.
        </p>
        <p>
          <strong>11.6 Your Rights:</strong> You retain all rights afforded to you under applicable data protection legislation with respect to the personal data processed by Stripe.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 10.08.2026</p>
    </PolicyLayout>
  );
}
