"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
const SupremeTermsOfUse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const sections = [
    { id: 'about', title: '1. About These Terms' },
    { id: 'service-description', title: '2. Service Description' },
    { id: 'user-responsibilities', title: '3. User Responsibilities and Acceptable Use' },
    { id: 'pricing', title: '4. Pricing and Subscriptions' },
    { id: 'data-processing', title: '5. Data Processing and Privacy' },
    { id: 'ip-rights', title: '6. Intellectual Property Rights' },
    { id: 'liability', title: '7. Limitation of Liability and Disclaimers' },
    { id: 'updates', title: '8. Service Availability and Updates' },
    { id: 'termination', title: '9. Termination' },
    { id: 'indemnification', title: '10. Indemnification' },
    { id: 'governing-law', title: '11. Governing Law and Dispute Resolution' },
    { id: 'changes', title: '12. Changes to These Terms' },
    { id: 'misc', title: '13. Severability and Entire Agreement' },
    { id: 'contact', title: '14. Contact Information' },
    { id: 'miscellaneous', title: '15. Miscellaneous' },
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
          <h2 className="text-2xl text-gray-400 mb-8">Terms of Use</h2>
          <div className="space-y-8">
            <section id="about">
              <h2 className="text-2xl font-semibold mb-4">1. About These Terms</h2>
              <p className="mb-4"><strong>1.1 Agreement Scope:</strong> These Terms of Use ("Terms") govern your access to and use of the Supreme extension for Visual Studio Code and related services provided by Silence AI LLC ("we," "us," "our," or "Company"). These Terms apply to you, the individual or entity accessing our services ("you" or "your"), and your employer or principal if you are acting on their behalf.</p>
              <p className="mb-4"><strong>1.2 Authority and Acceptance:</strong> If you are entering into these Terms on behalf of a company, organization, or other entity, you represent that you have the authority to bind such entity to these Terms. By installing, accessing, or using Supreme, you agree to be bound by these Terms. If you do not agree with these Terms, you must uninstall the extension and discontinue use immediately.</p>
              <p className="mb-4"><strong>1.3 Age Requirement:</strong> Supreme is intended for users who are at least 13 years old. By installing or using Supreme, you represent and warrant that you are 13 years of age or older. If you are under 13, you must not install or use Supreme.</p>
            </section>

            <section id="service-description">
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="mb-4"><strong>2.1 Core Functionality:</strong> Supreme is a lightweight code vulnerability scanner extension for Visual Studio Code that analyzes source code locally on your machine for security vulnerabilities, misconfigurations, and exposed secrets. The extension performs all code analysis on your local development environment without transmitting your code to external servers.</p>
              <p className="mb-4"><strong>2.2 Local Code Analysis:</strong> All code scanning and analysis is performed on your computer within the VSCode environment. Your source code remains solely under your control and is never uploaded to, processed by, or stored on Supreme's servers or any third-party infrastructure. This is the core architecture of Supreme and represents a fundamental guarantee to our users.</p>
              <p className="mb-4"><strong>2.3 Vulnerability Database:</strong> Supreme operates using a vulnerability and misconfiguration database (the "Database"). The Database is stored locally on your machine after download. You may use Supreme with a default Database, or activate a paid subscription to access updated Databases containing the latest vulnerability signatures and security patterns.</p>
              <p className="mb-4"><strong>2.4 Server Interaction:</strong> Supreme connects to our servers in exactly two scenarios: To download updated Databases when you request a refresh and to verify your license status before permitting Database updates. No other communication between the extension and our servers occurs. Your source code is never transmitted during these interactions.</p>
              <p className="mb-4"><strong>2.5 Functionality Without Subscription:</strong> Supreme functions without a paid subscription using a default Database. However, users without an active subscription will not receive the latest vulnerability updates and security patterns, which may result in missed detections during code analysis.</p>
            </section>

            <section id="user-responsibilities">
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities and Acceptable Use</h2>
              <p className="mb-4"><strong>3.1 License Credentials:</strong> If you activate a paid subscription, you are responsible for maintaining the confidentiality of your license key and subscription credentials. All usage associated with your license key is your responsibility.</p>
              <p className="mb-4"><strong>3.2 Lawful Use:</strong> You agree to use Supreme only for lawful purposes and in compliance with all applicable laws and regulations in your jurisdiction.</p>
              <p className="mb-4"><strong>3.3 Authorized Code Analysis:</strong> You agree to analyze only source code for which you have ownership or explicit authorization from the code owner. You may not use Supreme to analyze code belonging to third parties without their written consent.</p>
              <p className="mb-4"><strong>3.4 Prohibited Activities:</strong> You agree not to: Use Supreme to analyze code you do not own or have explicit permission to analyze. Attempt to interfere with the proper functioning of the extension or its license verification mechanisms. Share, distribute, or resell your license key to unauthorized third parties. Use automated tools to bypass license verification or Database download restrictions. Reverse engineer, decompile, or attempt to derive the source code or proprietary algorithms of Supreme. Use Supreme for competitive analysis or to develop competing products. Engage in any activity that could harm Supreme's infrastructure, servers, or other users.</p>
            </section>

            <section id="pricing">
              <h2 className="text-2xl font-semibold mb-4">4. Pricing and Subscriptions</h2>
              <p className="mb-4"><strong>4.1 Pricing Information:</strong> Pricing for Supreme subscriptions and Database updates is available on our official website. All current pricing, subscription tiers, billing cycles, and terms are listed at https://silenceai.net/supreme</p>
              <p className="mb-4"><strong>4.2 Pricing Changes:</strong> We reserve the right to modify pricing at any time. Price changes will be communicated on our website with reasonable notice and will take effect for new billing cycles after the notification period. Continued use of Supreme after a price change constitutes acceptance of the new pricing.</p>
              <p className="mb-4"><strong>4.3 License Verification:</strong> When you attempt to download an updated Database, your license status will be verified against our servers. If your subscription is active, the Database download will proceed. If your subscription is inactive or expired, Database download will be restricted.</p>
              <p className="mb-4"><strong>4.4 No Refunds for Updates:</strong> Updates and refreshes to the Database are included as part of your subscription. We do not provide refunds for Database refreshes or updates that are part of your active subscription period.</p>
              <p className="mb-4"><strong>4.5 Payment Gateway:</strong> We currently process all payments through Stripe, Inc. ("Stripe") as our third-party payment processor. By subscribing to Supreme, you acknowledge and agree that: (a) Your payment information will be processed by Stripe in accordance with Stripe's Services Agreement (available at https://stripe.com/legal/ssa) and Stripe's Privacy Policy (available at https://stripe.com/privacy); (b) Stripe may use cookies and similar tracking technologies to process your payment and prevent fraud; (c) You are responsible for reviewing and accepting Stripe's terms and privacy practices; and (d) We are not responsible for Stripe's processing of your payment information.</p>
              <p className="mb-4"><strong>4.6 Changes to Payment Gateway:</strong> We reserve the right to change, replace, or add alternative payment gateways at our sole discretion. If we change our primary payment gateway, we will provide you with at least thirty (30) days' advance written notice via email to the email address associated with your account before implementing such change. Your continued use of Supreme and maintenance of an active subscription after the notice period constitutes acceptance of the new payment gateway and its associated terms and conditions. If you do not agree with the new payment gateway, you may cancel your subscription before the effective date of the change.</p>
            </section>

            <section id="data-processing">
              <h2 className="text-2xl font-semibold mb-4">5. Data Processing and Privacy</h2>
              <p className="mb-4"><strong>5.1 Privacy Policy:</strong> Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
              <p className="mb-4"><strong>5.2 Your Code is Your Responsibility:</strong> You acknowledge that Supreme performs code analysis entirely on your local machine. You are solely responsible for the security of your code and development environment. We do not store, process, or retain your source code on our servers.</p>
              <p className="mb-4"><strong>5.3 Minimal Server Communication:</strong> When Supreme connects to our servers to verify your license or download a Database update, we may receive technical information such as your extension version, license key, and timestamp of the request. This information is used solely for license verification and Database management. Your source code is never transmitted during these communications.</p>
            </section>

            <section id="ip-rights">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
              <p className="mb-4"><strong>6.1 Our Rights:</strong> We retain all intellectual property rights in Supreme, its code, algorithms, databases, and related services. Nothing in these Terms grants you any rights to our intellectual property except the limited right to use Supreme as intended for analyzing code on your local machine.</p>
              <p className="mb-4"><strong>6.2 Your Code:</strong> You retain full ownership of all source code and content you analyze using Supreme. By using Supreme, you grant us the limited right to process your code locally within the extension for the sole purpose of performing vulnerability analysis on your machine.</p>
              <p className="mb-4"><strong>6.3 Feedback:</strong> Any feedback, suggestions, or reports you provide to us regarding Supreme may be used by us without restriction or compensation to you.</p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability and Disclaimers</h2>
              <p className="mb-4"><strong>7.1 Service Limitations:</strong> Supreme is provided "as is" without any warranties of any kind, express or implied. We do not guarantee that Supreme will: Detect all existing vulnerabilities in your code. Prevent security breaches or unauthorized access. Identify all misconfigurations or security issues. Comply with any specific security standard or requirement. Function without interruption or error.</p>
              <p className="mb-4"><strong>7.2 No Guarantee of Completeness:</strong> Vulnerability detection by any security analysis tool, including Supreme, is not exhaustive. Absence of a detected vulnerability does not mean your code is secure. You remain responsible for conducting additional security testing and code review.</p>
              <p className="mb-4"><strong>7.3 Liability Cap:</strong> Our total liability to you for any claims arising from these Terms or your use of Supreme shall not exceed the amount you paid to us in the twelve months preceding the claim, or $100 USD, whichever is greater.</p>
              <p className="mb-4"><strong>7.4 Excluded Damages:</strong> To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or revenue, even if we have been advised of the possibility of such damages.</p>
            </section>

            <section id="updates">
              <h2 className="text-2xl font-semibold mb-4">8. Service Availability and Updates</h2>
              <p className="mb-4"><strong>8.1 Service Availability:</strong> While we strive to maintain continuous operation of our services, we may temporarily suspend or interrupt Supreme services for maintenance, security updates, or operational reasons. We will provide advance notice when reasonably possible.</p>
              <p className="mb-4"><strong>8.2 Extension Updates:</strong> We may release new versions of Supreme at any time. You are responsible for updating to current versions. We reserve the right to discontinue support for outdated versions with reasonable notice.</p>
              <p className="mb-4"><strong>8.3 Database Updates:</strong> Database updates are released periodically and are available to users with active subscriptions. The frequency and timing of updates are at our discretion.</p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
              <p className="mb-4"><strong>9.1 Termination by You:</strong> You may terminate your use of Supreme at any time by uninstalling the extension and ceasing to use it.</p>
              <p className="mb-4"><strong>9.2 Termination by Us:</strong> We may suspend or terminate your access to Supreme services, including Database downloads and license verification, if you: Violate these Terms. Engage in unauthorized or fraudulent activity. Attempt to circumvent license verification or security mechanisms. Use Supreme for purposes that harm our infrastructure or other users.</p>
              <p className="mb-4"><strong>9.3 Effect of Termination:</strong> Upon termination, your license to use Supreme terminates, and your ability to access Database updates and services ceases. However, any extension version you have already installed may continue to function with its locally stored Database.</p>
            </section>

            <section id="indemnification">
              <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
              <p className="mb-4">You agree to indemnify, defend, and hold harmless Silence AI LLC and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising from: Your use of Supreme in violation of these Terms. Your analysis of code without proper authorization. Your violation of applicable laws or third-party rights. Any claim that your use of Supreme infringes upon or violates third-party rights.</p>
            </section>

            <section id="governing-law">
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law and Dispute Resolution</h2>
              <p className="mb-4"><strong>11.1 Applicable Law:</strong> These Terms are governed by and construed in accordance with the laws applicable to the jurisdiction where Silence AI LLC's primary operations are located, without regard to its conflict of law principles.</p>
              <p className="mb-4"><strong>11.2 Informal Dispute Resolution:</strong> If you have any concern or dispute regarding these Terms or Supreme, you agree to first attempt to resolve the matter informally by contacting us directly.</p>
              <p className="mb-4"><strong>11.3 Formal Disputes:</strong> If informal resolution is unsuccessful, disputes shall be resolved through binding arbitration or in courts of competent jurisdiction, as determined by law of the United Arab Emirates.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">12. Changes to These Terms</h2>
              <p className="mb-4">We reserve the right to modify these Terms at any time. Material changes will be communicated through the extension or via email to the account associated with your subscription. Your continued use of Supreme after such modifications constitutes acceptance of the updated Terms. If you do not agree with the changes, you must uninstall and discontinue use of Supreme.</p>
            </section>

            <section id="misc">
              <h2 className="text-2xl font-semibold mb-4">13. Severability and Entire Agreement</h2>
              <p className="mb-4"><strong>13.1 Severability:</strong> If any provision of these Terms is found to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary to make it enforceable, or if not possible, shall be severed. The remaining provisions shall continue in full force and effect.</p>
              <p className="mb-4"><strong>13.2 Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and the Company regarding your use of the extension and supersede all prior agreements, understandings, and negotiations.</p>
              <p className="mb-4"><strong>13.3 Assignment:</strong> We may assign these Terms or our rights hereunder to any third party without your consent. You may not assign these Terms without our prior written consent.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p className="mb-4">For questions about these Terms or Supreme, please contact us at:</p>
              <p className="mb-2">Silence AI LLC</p>
              <p className="mb-2">Email: info@silenceai.net</p>
              <p className="mb-2">Website: silenceai.net</p>
              <p className="mb-4">Business registration location: Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE</p>
            </section>

            <section id="miscellaneous">
              <h2 className="text-2xl font-semibold mb-4">15. Miscellaneous</h2>
              <p className="mb-4"><strong>15.1 No Waiver:</strong> Our failure to enforce any provision of these Terms shall not constitute a waiver of such provision or the right to enforce it.</p>
              <p className="mb-4"><strong>15.2 Notices:</strong> Any notices regarding these Terms may be provided by email or through the Silence AI LLC website and shall be deemed received upon sending.</p>
              <p className="mb-4"><strong>15.3 Survival:</strong> Provisions regarding intellectual property rights, limitation of liability, indemnification, and governing law shall survive termination of these Terms.</p>
            </section>
          </div>
          <p className="mt-8 text-sm text-gray-400">Last Updated: January 2026</p>
          <p className="text-sm text-gray-400">Version: 1.0</p>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SupremeTermsOfUse;
