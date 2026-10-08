"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
const SupremePrivacyPolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sections = [
    { id: 'about', title: '1. About This Privacy Policy' },
    { id: 'information-collected', title: '2. Information We Collect' },
    { id: 'what-not-collected', title: '3. What We Do Not Collect' },
    { id: 'how-we-use', title: '4. How We Use Your Information' },
    { id: 'legal-basis', title: '5. Legal Basis for Processing' },
    { id: 'data-storage', title: '6. Data Storage and Retention' },
    { id: 'data-sharing', title: '7. Data Sharing and Third Parties' },
    { id: 'international-transfers', title: '8. International Data Transfers' },
    { id: 'security', title: '9. Security Measures' },
    { id: 'user-responsibilities', title: '10. User Responsibilities' },
    { id: 'cookies-tracking', title: '11. Cookies and Tracking' },
    { id: 'data-breach', title: '12. Data Breach Notification' },
    { id: 'changes', title: '13. Changes to This Privacy Policy' },
    { id: 'contact', title: '14. Contact Information' },
    { id: 'governing-law', title: '15. Governing Law' },
  ];

  return (
    <div className="bg-black text-white">
      <Header onOpenModal={openModal} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col md:flex-row gap-8">
        <div className="md:w-80">
          <PolicySidebar sections={sections} />
        </div>
        <main className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">Supreme Extension for VSCode</h1>
          <h2 className="text-2xl text-gray-400 mb-8">Privacy Policy</h2>

          <div className="space-y-8">
            <section id="about">
              <h2 className="text-2xl font-semibold mb-4">1. About This Privacy Policy</h2>
              <p className="mb-4"><strong>1.1 Scope:</strong> These Privacy Policy ("Terms") govern your access to and use of the Silence AI platform and services provided by Silence AI LLC ("Silence AI," "we," "us," or "our"). These Terms apply to you, the individual or entity accessing our services ("you" or "your"), and your employer or principal if you are acting on their behalf.</p>
              <p className="mb-4"><strong>1.2 Relationship to Other Terms:</strong> This Privacy Policy forms part of, and is incorporated by reference into, our Terms of Use and Terms of Service for Silence AI. By installing or using Supreme, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>
              <p className="mb-4"><strong>1.3 Controller Information:</strong> Silence AI LLC serves as the data controller for personal data processed through our services. Our business registration location is Media City Free Zone, Al Messaned, Sharjah, UAE.</p>
              <p className="mb-4"><strong>1.4 Component-Specific Processing:</strong> This Privacy Policy applies specifically to the Supreme extension for Visual Studio Code and its related licensing and Database update services. You will only be subject to the processing activities described in this document when you install and use Supreme.</p>
            </section>

            <section id="information-collected">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="mb-4">We design Supreme with a local-first, privacy-by-design architecture: source code is analyzed locally on your machine and is not uploaded to our servers.</p>
              <p className="mb-4"><strong>2.1 Installation and Licensing Information:</strong> When you install and activate Supreme, we may collect: License key or subscription identifier. Extension version and build information. Approximate language and locale settings of your environment. Basic product configuration flags related to licensing and updates.</p>
              <p className="mb-4"><strong>2.2 Service Usage and Technical Data:</strong> When Supreme contacts our servers for license verification or Database updates, we may process: Request timestamps. Extension version and platform metadata. License status (active, expired, invalid). Technical logs related to update/download success or failure. This data does not include your source code or project contents.</p>
              <p className="mb-4"><strong>2.3 Billing and Account Data:</strong> If you purchase a paid subscription, we may process billing address, subscription plan, payment status and transaction identifiers needed to administer the service. For UAE agreements, Paddle.com handles online payments as merchant of record. For Kazakhstan agreements, payments are handled by ТОО &quot;ФинCeрвисы&quot;. The payment handler collects payment details according to the terms and privacy notice shown at checkout.</p>
              <p className="mb-4"><strong>2.4 Support and Communication Data:</strong> If you contact us for support or inquiries, we may process: Your name and email address. Content of your message and attachments (if any). Technical context you choose to share (for example, error messages, logs you manually provide).</p>
            </section>

            <section id="what-not-collected">
              <h2 className="text-2xl font-semibold mb-4">3. What We Do Not Collect</h2>
              <p className="mb-4"><strong>3.1 Source Code and Project Files:</strong> Supreme performs all code analysis locally within your Visual Studio Code environment. Your source code, project files, secrets, and repository contents are not transmitted to, stored by, or processed on our servers.</p>
              <p className="mb-4"><strong>3.2 IDE Content and Editing Activity:</strong> We do not monitor or collect: The text you type into the editor. File contents opened in VSCode. Your terminal output, Git history, or commands.</p>
              <p className="mb-4"><strong>3.3 Sensitive Categories of Data:</strong> We do not intentionally collect sensitive categories of personal data (such as health information, financial records, or government identifiers). If such information is present in your codebase, it remains local on your machine and is never sent to us.</p>
            </section>

            <section id="how-we-use">
              <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Information</h2>
              <p className="mb-4"><strong>4.1 Service Delivery:</strong> We use the information described in Section 2 to: Verify your subscription status. Enable or restrict access to updated vulnerability Databases. Deliver Database files and extension updates where applicable. Maintain basic compatibility and performance of licensing and update services.</p>
              <p className="mb-4"><strong>4.2 Service Operations and Security:</strong> We may use technical and usage data to: Monitor service health and detect outages or errors. Protect our services against abuse, fraud, and license key sharing. Troubleshoot technical issues and improve reliability.</p>
              <p className="mb-4"><strong>4.3 Billing and Administration:</strong> Where you have a paid subscription, we use relevant data to: Process subscription fees and manage renewals. Issue invoices or payment confirmations. Respond to billing-related inquiries.</p>
              <p className="mb-4"><strong>4.4 Analytics and Product Improvement:</strong> We may use de-identified, aggregated usage data to: Understand adoption and usage patterns of Supreme. Prioritize features, fixes, and performance improvements. Evaluate the effectiveness of our vulnerability Database updates. We do not use your source code for analytics or model training.</p>
            </section>

            <section id="legal-basis">
              <h2 className="text-2xl font-semibold mb-4">5. Legal Basis for Processing</h2>
              <p className="mb-4">Depending on your jurisdiction, we rely on several legal bases for processing personal data:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Contract performance</strong> – To provide and maintain Supreme and related services you requested (e.g., licensing, updates, support).</li>
                <li><strong>Legitimate interests</strong> – To prevent abuse, ensure security, and improve our services in a way that does not override your rights and freedoms.</li>
                <li><strong>Legal obligations</strong> – To comply with tax, accounting, and regulatory requirements where applicable.</li>
                <li><strong>Consent</strong> – Where explicitly required by law for specific processing (for example, certain forms of marketing communications, where used).</li>
              </ul>
            </section>

            <section id="data-storage">
              <h2 className="text-2xl font-semibold mb-4">6. Data Storage and Retention</h2>
              <p className="mb-4"><strong>6.1 Retention Periods:</strong> We retain personal data only for as long as necessary to fulfill the purposes described in this Policy, including: Licensing and subscription data: stored for the duration of your subscription and a reasonable period thereafter as required for accounting, dispute resolution, or legal compliance. Technical logs related to license verification and Database downloads: retained for a limited period for security, troubleshooting, and audit purposes. Support communications: retained for the duration needed to manage your request and maintain an audit trail of communications.</p>
              <p className="mb-4"><strong>6.2 Data Deletion:</strong> You may request deletion of your personal data where applicable law grants you this right. Subject to legal obligations and legitimate interests (such as preventing fraud or resolving disputes), we will delete or de-identify personal data within a commercially reasonable timeframe.</p>
            </section>

            <section id="data-sharing">
              <h2 className="text-2xl font-semibold mb-4">7. Data Sharing and Third Parties</h2>
              <p className="mb-4"><strong>7.1 Payment Handling:</strong> For subscriptions under an agreement with Silence AI LLC in the UAE, Paddle.com handles online payments as merchant of record. For subscriptions under an agreement with ТОО &quot;Silence AI&quot; in Kazakhstan, ТОО &quot;ФинCeрвисы&quot; handles payments. The checkout or invoice identifies the payment recipient and applicable terms.</p>
              <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
                <li><strong>Payment information:</strong> The payment handler processes the payment and billing details required for the transaction. Silence AI receives limited subscription, invoice and transaction information for administration and support.</li>
                <li><strong>UAE purchases:</strong> Paddle&apos;s <a href="https://www.paddle.com/legal/buyer-terms">Buyer Terms</a> and <a href="https://www.paddle.com/legal/privacy">Privacy Notice</a> explain its separate purchase and data-processing terms.</li>
                <li><strong>Privacy requests:</strong> For data processed by a payment handler, use the contact and rights information in the notice presented at checkout.</li>
              </ul>
              <p className="mb-4"><strong>7.2 Right to Change Payment Gateway:</strong> We reserve the right to change our payment processor at our sole discretion. If we change our payment gateway, we will:</p>
              <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
                <li>Provide you with at least thirty (30) calendar days' advance written notice via email to the email address associated with your Supreme account;</li>
                <li>Inform you of the name and identity of the new payment processor;</li>
                <li>Provide links to the new payment processor's privacy policy and terms of service;</li>
                <li>Explain any material changes to data processing practices, data retention periods, international data transfers, or cookie usage;</li>
                <li>Provide instructions for updating your payment information, if necessary.</li>
              </ul>
              <p className="mb-4">Your continued maintenance of an active subscription after the thirty (30) day notice period constitutes your consent to the new payment processor's data processing practices. If you do not consent to the new payment processor, you may cancel your subscription before the effective date of the change by emailing info@silenceai.net at least three (3) business days before the effective date.</p>
              <p className="mb-4"><strong>7.3 Infrastructure and Service Providers:</strong> We may use reputable third-party service providers for: Hosting licensing and update servers. Error monitoring and logging. Email delivery and support ticket management. These providers act as processors and are contractually required to protect your data and process it only on our instructions.</p>
              <p className="mb-4"><strong>7.4 Legal and Compliance:</strong> We may disclose information where required to: Comply with applicable laws, regulations, or legal processes. Respond to valid requests from law enforcement or regulatory authorities. Protect our rights, property, or safety, or those of our users or the public. We do not sell your personal data.</p>
            </section>

            <section id="international-transfers">
              <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
              <p className="mb-4"><strong>8.1 Global Operations:</strong> We operate data centers worldwide. When personal data is transferred across borders, we: Rely on legally permitted transfer mechanisms. Implement appropriate safeguards as required by law. Use TLS encryption for all data transfers. Ensure compliance with applicable data protection regulations.</p>
              <p className="mb-4"><strong>8.2 User Responsibilities:</strong> You remain responsible for any local authorizations or restrictions required for data transfers you initiate through our services.</p>
            </section>

            <section id="security">
              <h2 className="text-2xl font-semibold mb-4">9. Security Measures</h2>
              <p className="mb-4">We implement technical and organizational measures designed to protect personal data against unauthorized access, alteration, disclosure, or destruction, including:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Encryption in transit between your extension and our servers where applicable</li>
                <li>Access controls and authentication on administrative systems</li>
                <li>Audit logging of administrative access and key actions</li>
                <li>Restricting production access to authorized personnel only</li>
              </ul>
              <p className="mb-4">You remain responsible for securing your own development environment, device, and source code.</p>
            </section>

            <section id="user-responsibilities">
              <h2 className="text-2xl font-semibold mb-4">10. User Responsibilities</h2>
              <p className="mb-4">You are solely responsible for:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Ensuring you have the necessary rights to analyze any code with Supreme</li>
                <li>Avoiding inclusion of third-party personal data or confidential information in communications you send to our support channels (for example, in logs or screenshots)</li>
                <li>Maintaining the security of your devices, IDE environment, and license key</li>
                <li>Complying with applicable laws and third-party obligations when using Supreme</li>
              </ul>
            </section>

            <section id="cookies-tracking">
              <h2 className="text-2xl font-semibold mb-4">11. Cookies and Tracking</h2>
              <p className="mb-4"><strong>11.1 Supreme Extension:</strong> The Supreme extension itself does not use browser cookies or similar tracking technologies within the Visual Studio Code environment.</p>
              <p className="mb-4"><strong>11.2 Payment Checkout Cookies:</strong> The payment checkout may use cookies or similar technologies needed for the payment session, authentication, fraud prevention and security. For UAE purchases, Paddle.com describes its practices in its <a href="https://www.paddle.com/legal/privacy">Privacy Notice</a>. For Kazakhstan purchases, consult the notice displayed by ТОО &quot;ФинCeрвисы&quot; at checkout.</p>
              <p className="mb-4"><strong>11.3 Cookie Categories:</strong> Depending on the checkout, payment technologies may support session continuity, security and fraud prevention. Any optional analytics or preferences depend on the payment handler&apos;s actual checkout and notice.</p>
              <p className="mb-4"><strong>11.4 Managing Payment Cookies:</strong> Browser settings can control cookies, although blocking those needed for a payment session may prevent checkout from working. Review the payment handler&apos;s notice for further choices and privacy requests.</p>
              <p className="mb-4"><strong>11.5 Third-Party Payment Processor Changes:</strong> If we change our payment processor in the future, the new payment processor may use different cookies and tracking technologies. We will provide thirty (30) days' advance notice of any payment processor change, including information about the new processor's cookie usage. See Section 7.2 for details on payment gateway changes.</p>
              <p className="mb-4"><strong>11.6 Website Cookies:</strong> If you visit our website (for example, to manage subscriptions or view documentation), additional cookie usage on the website will be governed by the separate cookie notice or website privacy policy available there.</p>
            </section>

            <section id="data-breach">
              <h2 className="text-2xl font-semibold mb-4">12. Data Breach Notification</h2>
              <p className="mb-4">In the unlikely event of a personal data breach affecting information we control, we will:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Assess the impact and scope of the incident</li>
                <li>Notify affected users where required by law</li>
                <li>Notify relevant supervisory authorities where required</li>
                <li>Take reasonable steps to mitigate and prevent similar incidents in future</li>
              </ul>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
              <p className="mb-4">We may update this Privacy Policy from time to time. Material changes will be communicated through: Notifications in the extension or on our website, and/or. Email notice to the address associated with your subscription, where available. Your continued use of Supreme after changes become effective constitutes acceptance of the updated Privacy Policy. If you do not agree with updates, you should uninstall the extension and stop using Supreme.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p className="mb-4">For questions about this Privacy Policy, data processing, or to exercise your rights, contact us at:</p>
              <p className="mb-2">Silence AI</p>
              <p className="mb-2">Email: info@silenceai.net</p>
              <p className="mb-2">Website: https://silenceai.net/</p>
              <p className="mb-4">Address: Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE</p>
            </section>

            <section id="governing-law">
              <h2 className="text-2xl font-semibold mb-4">15. Governing Law</h2>
              <p className="mb-4">This Privacy Policy is governed by the laws applicable to the jurisdiction where Silence AI LLC's primary operations are located, without regard to conflict of law principles. Where applicable law grants you mandatory rights or protections, those rights remain unaffected.</p>
            </section>
          </div>
          <p className="mt-8 text-sm text-gray-400">Last Updated: January 2026</p>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SupremePrivacyPolicy;
