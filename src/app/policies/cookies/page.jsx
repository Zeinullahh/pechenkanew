"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
const CookiesPolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const sections = [
    { id: 'about', title: '1. About This Cookie Policy' },
    { id: 'types-of-cookies', title: '2. Types of Cookies We Use' },
    { id: 'what-we-dont-use', title: '3. What We Don\'t Use' },
    { id: 'how-we-use-cookies', title: '4. How We Use Technical Cookies' },
    { id: 'cookie-duration', title: '5. Cookie Duration and Storage' },
    { id: 'managing-cookies', title: '6. Managing Your Cookie Preferences' },
    { id: 'third-party-services', title: '7. Third-Party Services' },
    { id: 'updates', title: '8. Updates to This Cookie Policy' },
    { id: 'contact', title: '9. Contact Information' },
    { id: 'payment-services', title: '10. Payment Processing Services' },
  ];

  return (
    <div className="bg-black text-white">
      <Header onOpenModal={openModal} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col md:flex-row gap-8">
        <div className="md:w-80">
          <PolicySidebar sections={sections} />
        </div>
        <main className="flex-grow">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          <div className="space-y-8">
            <section id="about">
              <h2 className="text-2xl font-semibold mb-4">1. About This Cookie Policy</h2>
            <p className="mb-4"><strong>1.1 Introduction:</strong> This Cookie Policy explains how Silence AI LLC ("Silence AI," "we," "us," or "our") uses cookies and similar technologies on our website and platform at silenceai.net and related services.</p>
            <p><strong>1.2 What Are Cookies:</strong> Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.</p>
          </section>
            <section id="types-of-cookies">
              <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
            <p className="mb-4"><strong>2.1 Technical Cookies (Essential):</strong> We use technical cookies that are strictly necessary for the operation of our platform and services. These cookies: Session Management: Maintain your login session and authentication state. Security: Protect against unauthorized access and maintain platform security. Functionality: Enable core platform features and user interface functionality. Load Balancing: Distribute traffic across our servers for optimal performance. Platform Stability: Ensure proper functioning of our cybersecurity tools and services.</p>
            <p><strong>2.2 Cookie Categories:</strong> All cookies used by Silence AI fall under the "Strictly Necessary" category. These cookies are essential for: User authentication and account access, Maintaining user sessions across our platform, Ensuring security of Global Shield, Email Protector, and Security Tester components, Preserving user preferences and configuration settings, Platform functionality and service delivery.</p>
          </section>
            <section id="what-we-dont-use">
              <h2 className="text-2xl font-semibold mb-4">3. What We Don't Use</h2>
            <p className="mb-4"><strong>3.1 No Marketing or Tracking Cookies:</strong> We do not use: Marketing or advertising cookies, Social media tracking cookies, Third-party analytics cookies (beyond what is strictly necessary), Cross-site tracking technologies, Behavioral profiling cookies, Non-essential third-party cookies.</p>
            <p><strong>3.2 No Cookie-Based Data Sharing:</strong> We do not: Share cookie data with third parties for marketing purposes, Use cookies for advertising targeting, Create detailed user profiles for commercial exploitation, Participate in cookie-based data trading or selling.</p>
          </section>
            <section id="how-we-use-cookies">
              <h2 className="text-2xl font-semibold mb-4">4. How We Use Technical Cookies</h2>
            <p className="mb-4"><strong>4.1 Session Management:</strong> Authenticate users accessing our platform, Maintain login state across different pages and services, Prevent unauthorized access to user accounts, Enable seamless navigation between Global Shield, Email Protector, and Security Tester.</p>
            <p className="mb-4"><strong>4.2 Security Functions:</strong> Implement security measures to protect user accounts, Detect and prevent fraudulent access attempts, Maintain secure connections during vulnerability testing, Protect against cross-site request forgery (CSRF) attacks.</p>
            <p><strong>4.3 Platform Functionality:</strong> Remember user preferences and settings, Maintain configuration for cybersecurity tools, Store temporary data necessary for service delivery, Enable proper functioning of browser extensions (Security Tester component).</p>
          </section>
            <section id="cookie-duration">
              <h2 className="text-2xl font-semibold mb-4">5. Cookie Duration and Storage</h2>
            <p className="mb-4"><strong>5.1 Session Cookies:</strong> Most of our cookies are session cookies that: Expire when you close your browser, Are automatically deleted after session termination, Do not persist on your device long-term.</p>
            <p><strong>5.2 Persistent Cookies:</strong> Some technical cookies may persist for: Authentication purposes (typically 30 days maximum), User preference storage (until manually cleared), Security settings maintenance (as configured by user).</p>
          </section>
            <section id="managing-cookies">
              <h2 className="text-2xl font-semibold mb-4">6. Managing Your Cookie Preferences</h2>
            <p className="mb-4"><strong>6.1 Browser Controls:</strong> You can control cookies through your browser settings: Chrome: {'Settings > Privacy and Security > Cookies and other site data'}. Firefox: {'Options > Privacy & Security > Cookies and Site Data'}. Safari: {'Preferences > Privacy > Manage Website Data'}. Edge: {'Settings > Cookies and site permissions > Cookies and site data'}.</p>
            <p><strong>6.2 Impact of Disabling Technical Cookies:</strong> Important Notice: Since we only use technical cookies essential for platform operation, disabling these cookies will: Prevent you from logging into our platform, Disable access to Global Shield, Email Protector, and Security Tester, Impair security features and vulnerability testing capabilities, Make our services non-functional.</p>
          </section>
            <section id="third-party-services">
              <h2 className="text-2xl font-semibold mb-4">7. Third-Party Services</h2>
            <p className="mb-4"><strong>7.1 Limited Third-Party Cookie Usage:</strong> While we minimize third-party services, some essential integrations may set their own cookies: Payment processors (for billing functionality), Cloud infrastructure providers (for service delivery), Essential security services.</p>
            <p><strong>7.2 Third-Party Cookie Control:</strong> Any third-party cookies are to: Technical functionality required for our services, Payment processing and billing operations, Essential security and infrastructure needs. We do not permit third parties to set non-essential tracking or marketing cookies through our platform.</p>
          </section>
            <section id="updates">
              <h2 className="text-2xl font-semibold mb-4">8. Updates to This Cookie Policy</h2>
            <p className="mb-4"><strong>8.1 Policy Changes:</strong> We may update this Cookie Policy to: Reflect changes in our cookie usage, Comply with updated legal requirements, Improve transparency about our practices.</p>
            <p><strong>8.2 Notification of Changes:</strong> Material changes will be communicated through: Email notifications to registered users, Platform notifications, Updated posting date on this policy.</p>
          </section>
            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p>For questions about our Cookie Policy or cookie practices, contact us at: Silence AI LLC, Email: info@silenceai.net, Website: https://silenceai.net, Address: Media City Free Zone, Al Messaned, Sharjah, UAE.</p>
          </section>
            <section id="payment-services">
              <h2 className="text-2xl font-semibold mb-4">10. Payment Processing Services</h2>
              <p className="mb-4"><strong>10.1 Stripe Payment Integration:</strong> We utilize Stripe, Inc. ("Stripe") as our third-party payment processor to facilitate secure transactions on our platform. Stripe is a globally recognized and PCI DSS Level 1 certified payment service provider, ensuring the highest standards of payment security and regulatory compliance.</p>
              <p className="mb-4"><strong>10.2 Stripe Cookies and Data Collection:</strong> When you engage with our payment services, Stripe may utilize cookies and similar tracking technologies to collect certain information from your device. This data collection is essential for: (a) Fraud prevention and detection – identifying potentially fraudulent transactions and protecting both you and Silence AI from unauthorized payment activity; (b) Geolocation verification – determining your approximate geographic location based on your IP address to comply with regional payment regulations, applicable tax requirements, and currency localization; (c) Device fingerprinting – creating a unique identifier for your device to enhance security measures and prevent payment fraud; (d) Session management – maintaining the integrity of your payment session throughout the transaction process.</p>
              <p className="mb-4"><strong>10.3 Categories of Data Processed:</strong> Stripe may collect and process the following categories of data through cookies: IP address and derived geolocation data, browser type and version, device identifiers, transaction metadata, and behavioral data related to payment interactions. This information is processed in accordance with Stripe's Privacy Policy (available at https://stripe.com/privacy) and applicable data protection legislation, including but not limited to the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other relevant jurisdictional requirements.</p>
              <p className="mb-4"><strong>10.4 Legal Basis for Processing:</strong> The processing of data by Stripe through cookies is conducted pursuant to the following legal bases: (a) Contractual necessity – the data processing is necessary for the performance of the payment contract between you and Silence AI; (b) Legitimate interests – fraud prevention and security measures constitute legitimate interests of both Silence AI and Stripe; (c) Legal obligations – compliance with applicable financial regulations, anti-money laundering requirements, and tax laws.</p>
              <p className="mb-4"><strong>10.5 Data Retention and Transfers:</strong> Stripe may retain payment-related data, including cookie-derived information, for the period necessary to fulfill the purposes outlined above, comply with legal obligations, resolve disputes, and enforce agreements. Such data may be transferred to and processed in jurisdictions outside your country of residence, including the United States, where Stripe maintains its primary operations. All international data transfers are conducted with appropriate safeguards in accordance with applicable data protection laws.</p>
              <p><strong>10.6 Your Rights:</strong> You retain all rights afforded to you under applicable data protection legislation with respect to the personal data processed by Stripe. For inquiries regarding Stripe's data practices or to exercise your data subject rights in relation to Stripe's processing activities, please refer to Stripe's Privacy Policy or contact Stripe directly through the mechanisms provided therein.</p>
          </section>
          </div>
          <p className="mt-8 text-sm text-gray-400">Last Updated: 05.02.2026</p>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CookiesPolicy;
