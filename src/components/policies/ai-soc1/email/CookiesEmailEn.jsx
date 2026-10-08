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
          <strong>1.1 Introduction:</strong> This Cookie Policy explains how Silence AI LLC uses cookies and similar technologies for the UAE Email Security service. Its Centralized Management Console (CMC) is at <strong>mail.csd.silenceai.net</strong>, and its employee email workspace is at <strong>mail.silenceai.net</strong>. The corresponding Kazakhstan service is provided under the agreement with ТОО &quot;Silence AI&quot; at <strong>kz.mail.csd.silenceai.net</strong> and <strong>kz.mail.silenceai.net</strong>. The CMC is the administrator panel; employees use the workspace to read, compose, send and manage email. These domain names do not state the physical server location.
        </p>
        <p>
          <strong>1.2 What Are Cookies:</strong> Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.
        </p>
      </section>

      <section id="types-of-cookies">
        <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
        <p className="mb-4">
          <strong>2.1 Technical Cookies (Essential):</strong> Technical cookies may support sign-in sessions, security, preferences and navigation in the CMC and employee workspace. Email security checks run under the service settings described in the Terms of Service; a browser cookie does not itself perform or guarantee those checks.
        </p>
        <p>
          <strong>2.2 Cookie Categories:</strong> Necessary cookies support authentication and account access at the applicable CMC and employee workspace domains. Any optional analytics or preference technology, if used, must be described and offered with the choices required by applicable law.
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
          <strong>4.1 Session Management:</strong> Necessary cookies may maintain login state and protect access to the CMC at mail.csd.silenceai.net and the employee workspace at mail.silenceai.net for UAE agreements. The Kazakhstan domains are kz.mail.csd.silenceai.net and kz.mail.silenceai.net. Each domain may have its own session scope.
        </p>
        <p className="mb-4">
          <strong>4.2 Security Functions:</strong> Implement security measures to protect user accounts and the email CMC; Detect and prevent fraudulent access attempts; Support email authentication mechanisms including SPF, DKIM, and DMARC; Protect against cross-site request forgery (CSRF) attacks.
        </p>
        <p className="mb-4">
          <strong>4.3 Security Views:</strong> Cookies may preserve the authenticated session needed to view security results and folders. The applicable checks are conditional; the Terms of Service describes sender authentication, spam, dangerous-link, domain-risk and eligible attachment checks. AI phishing-content analysis is planned for production activation and is not represented as active until deployment is confirmed. A spoof-only result routes to Spam; other results may appear in Dangerous Links, Malware in attached files, Possibly Phishing or Secure. Folder placement does not prove that every check ran.
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
          <strong>6.2 Impact of Disabling Technical Cookies:</strong> Blocking cookies needed for authentication may prevent sign-in to the applicable CMC or employee workspace and access to account views. Browser cookie settings do not determine which server-side email security checks run for a mailbox; those checks follow the service configuration and eligibility rules.
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
            href="/policies/ai-csd/email/privacy/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-csd/email/privacy/
          </a>
          .
        </p>
        <p>
          For the Web component Cookie Policy, see{" "}
          <a
            href="/policies/ai-csd/web/cookies/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-csd/web/cookies/
          </a>
          .
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 10.08.2026</p>
    </PolicyLayout>
  );
}
