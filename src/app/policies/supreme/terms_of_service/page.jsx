"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
const SupremeTermsOfService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sections = [
    { id: 'right-to-use', title: '1. Right to Use' },
    { id: 'restrictions-on-use', title: '2. Restrictions on Use' },
    { id: 'service-description', title: '3. Service Description and Performance' },
    { id: 'subscription', title: '4. Subscription and Licensing' },
    { id: 'user-responsibilities', title: '5. User Responsibilities and Obligations' },
    { id: 'data-processing', title: '6. Data Processing and Privacy' },
    { id: 'ip-rights', title: '7. Intellectual Property Rights' },
    { id: 'availability-updates', title: '8. Service Availability and Updates' },
    { id: 'limitation-liability', title: '9. Limitation of Liability and Disclaimers' },
    { id: 'indemnification', title: '10. Indemnification' },
    { id: 'term-termination', title: '11. Term and Termination' },
    { id: 'confidentiality', title: '12. Confidentiality' },
    { id: 'general-provisions', title: '13. General Provisions' },
    { id: 'contact', title: '14. Contact Information' },
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
          <h2 className="text-2xl text-gray-400 mb-8">Terms of Service</h2>

          <div className="space-y-8">
            <section id="right-to-use">
              <h2 className="text-2xl font-semibold mb-4">1. Right to Use</h2>
              <p className="mb-4"><strong>1.1 Agreement Scope:</strong> These Terms of Service ("Terms") govern your access to and use of the Supreme extension for Visual Studio Code and related services provided by Silence AI LLC ("we," "us," "our," or "Company"). These Terms apply to you, the individual or entity accessing our services ("you" or "your"), and your employer or principal if you are acting on their behalf.</p>
              <p className="mb-4"><strong>1.2 Grant of Rights:</strong> Subject to your subscription status and compliance with these Terms, we grant you a non-exclusive, non-transferable, non-sublicensable right to: (a) install and use the Supreme extension on your personal computer solely for analyzing source code that you own or have explicit authorization to analyze; and (b) download and use the Vulnerability Database for the purpose of performing local code analysis on your machine. All rights not expressly granted herein are reserved by Supreme.</p>
            </section>

            <section id="restrictions-on-use">
              <h2 className="text-2xl font-semibold mb-4">2. Restrictions on Use</h2>
              <p className="mb-4">You shall not:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Use Supreme to analyze code that you do not own or have explicit permission to analyze</li>
                <li>Upload, transmit, or cause to be transmitted your source code to Supreme's servers (note: all code analysis occurs locally on your machine)</li>
                <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code, algorithms, or proprietary methods of Supreme</li>
                <li>Circumvent, disable, or attempt to bypass the license verification mechanism or Database download restrictions</li>
                <li>Share, distribute, resell, or sublicense your license key or subscription credentials to unauthorized third parties</li>
                <li>Use automated tools, scripts, or mechanisms to bypass security or licensing controls</li>
                <li>Modify, create derivative works from, or attempt to alter the Supreme extension or its components</li>
                <li>Use Supreme for competitive analysis, benchmarking, or to develop competing products or services</li>
                <li>Upload or transmit viruses, malware, or any malicious code through Supreme</li>
                <li>Use Supreme in any manner that violates applicable law or the intellectual property rights of third parties</li>
                <li>Perform any action that interferes with the proper functioning of the extension or Supreme's license verification systems</li>
                <li>Use Supreme to process code in breach of contractual obligations to third parties</li>
              </ul>
              <p className="mb-4">A breach of any of the foregoing restrictions is deemed a material breach of these Terms and may result in immediate termination of your access to Supreme.</p>
            </section>

            <section id="service-description">
              <h2 className="text-2xl font-semibold mb-4">3. Service Description and Performance</h2>
              <p className="mb-4"><strong>3.1 Core Service:</strong> Supreme is a lightweight code vulnerability scanner extension for Visual Studio Code that performs local analysis of source code on your machine for security vulnerabilities, misconfigurations, and exposed secrets. All code analysis is performed locally within the VSCode environment on your personal computer.</p>
              <p className="mb-4"><strong>3.2 Local Analysis Guarantee:</strong> All code scanning, analysis, and detection occurs entirely on your local machine. Your source code is never uploaded to, transmitted to, stored on, or processed by Supreme's servers or any third-party infrastructure. This is the fundamental architecture of Supreme and a core guarantee to our users.</p>
              <p className="mb-4"><strong>3.3 Vulnerability Database:</strong> Supreme utilizes a vulnerability and misconfiguration database (the "Database") containing known security patterns, vulnerability signatures, and configuration issues. The Database is downloaded to and stored locally on your machine. The Database is updated periodically at our discretion. Access to updated Databases requires an active paid subscription.</p>
              <p className="mb-4"><strong>3.4 Server Communication:</strong> Supreme communicates with our servers only in the following two scenarios: To download updated Databases when you explicitly request a Database refresh and to verify your subscription license status before permitting Database updates. No other communication between the extension and our servers occurs. Your source code is never transmitted during these interactions. Only technical metadata (extension version, license key, request timestamp) is transmitted for license verification and Database management purposes.</p>
              <p className="mb-4"><strong>3.5 Free vs. Paid Functionality:</strong> Supreme functions without a paid subscription using a default Database. However, users without an active subscription will not receive updated Databases containing the latest vulnerability signatures and security patterns, which may result in missed detections during code analysis.</p>
              <p className="mb-4"><strong>3.6 Performance Warranty:</strong> We will make reasonable efforts to ensure that Supreme functions substantially in accordance with its documented behavior. If Supreme fails to perform its core local analysis function, we will, at our expense, use reasonable efforts to correct the issue. If we fail to correct a material non-conformity, your sole remedy shall be to terminate your subscription and receive a refund of any prepaid subscription fees for the unused portion of your subscription term.</p>
              <p className="mb-4"><strong>3.7 Service Disclaimers:</strong> You acknowledge and agree that: Supreme is provided "as is" without warranties of any kind, express or implied. Vulnerability detection by any tool, including Supreme, is not exhaustive or guaranteed. Absence of a detected vulnerability does not mean your code is secure. Supreme may not identify all vulnerabilities, misconfigurations, or secrets in your code. False positives and false negatives may occur. You remain solely responsible for conducting additional security testing and code review. Supreme is not a substitute for professional security audits or penetration testing.</p>
            </section>

            <section id="subscription">
              <h2 className="text-2xl font-semibold mb-4">4. Subscription and Licensing</h2>
              <p className="mb-4"><strong>4.1 Subscription Terms:</strong> Your subscription to Supreme grants you a non-exclusive, non-transferable right to use the extension and access updated Databases during the subscription term. Subscriptions are offered on a monthly or annual basis as specified on our pricing page.</p>
              <p className="mb-4"><strong>4.2 License Key Confidentiality:</strong> If you activate a paid subscription, you receive a license key. You are responsible for maintaining the confidentiality of your license key. All usage and actions associated with your license key are your responsibility. You may not share, distribute, or sublicense your license key to other parties.</p>
              <p className="mb-4"><strong>4.3 Subscription Fees:</strong> You agree to pay the subscription fees according to the billing frequency you selected. Subscription fees are: Non-refundable and non-cancellable. Exclusive of applicable taxes and duties. Subject to change with 30 days' notice via email or our website. Price changes apply to new billing cycles after the notification period.</p>
              <p className="mb-4"><strong>4.4 License Verification and Database Access:</strong> When you attempt to download an updated Database, your license status will be verified against our servers. If your subscription is active, the Database download will proceed. If your subscription is inactive, expired, or you fail to pay subscription fees, Database downloads will be restricted.</p>
              <p className="mb-4"><strong>4.5 Late Payment:</strong> If subscription fees remain unpaid after notification of default, we may disable your access to Database downloads and updated Databases until payment is received. Late payment does not eliminate your obligation to pay all amounts due.</p>
              <p className="mb-4"><strong>4.6 Billing and Payment:</strong> We will bill your payment card on a monthly or annual basis as agreed. You authorize us and our payment processor to bill your card automatically. If payment fails, you remain responsible for all amounts due. We reserve the right to pursue payment through legal means if necessary.</p>
              <p className="mb-4"><strong>4.7 Payment Processing and Third-Party Payment Gateway:</strong> All payments for Supreme subscriptions are processed through Stripe, Inc. ("Stripe"), a third-party payment gateway and processor. By subscribing to Supreme and providing payment information, you acknowledge and expressly agree to the following:</p>
              <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
                <li><strong>Third-Party Terms:</strong> Your payment information is processed directly by Stripe and is subject to Stripe's Services Agreement (available at https://stripe.com/legal/ssa) and Stripe's Privacy Policy (available at https://stripe.com/privacy). You are responsible for reviewing, understanding, and accepting Stripe's terms and conditions and privacy practices.</li>
                <li><strong>Payment Data Processing:</strong> Stripe processes your payment card details, billing address, transaction history, and related payment information independently as a data controller. We do not store or have access to your complete payment card details.</li>
                <li><strong>Cookies and Tracking:</strong> Stripe uses cookies, web beacons, and similar tracking technologies to facilitate payment processing, prevent fraud, ensure security, and comply with applicable regulations. By using our payment services, you consent to Stripe's use of such technologies in accordance with Stripe's Privacy Policy and cookie practices.</li>
                <li><strong>Payment Security:</strong> Stripe is PCI-DSS compliant and employs industry-standard security measures to protect your payment information. However, we are not responsible for Stripe's data security practices or any breach of payment data held by Stripe.</li>
                <li><strong>Payment Disputes:</strong> Any disputes regarding payment processing, failed transactions, or unauthorized charges must be resolved in accordance with Stripe's dispute resolution procedures and your payment card issuer's policies.</li>
              </ul>
              <p className="mb-4"><strong>4.8 Right to Change Payment Gateway:</strong> We reserve the right, at our sole discretion, to change, replace, add, or remove payment gateways or payment processors at any time. If we change our primary payment gateway from Stripe to another payment processor, or add alternative payment options, we will provide you with at least thirty (30) calendar days' advance written notice via email to the email address associated with your Supreme account before implementing such change. The notice will include:</p>
              <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
                <li>The name and details of the new payment gateway or processor;</li>
                <li>The effective date of the change;</li>
                <li>Links to the new payment gateway's terms of service and privacy policy;</li>
                <li>Information regarding any changes to payment methods, billing procedures, or data processing practices;</li>
                <li>Instructions for updating your payment information, if necessary.</li>
              </ul>
              <p className="mb-4"><strong>4.9 Acceptance of New Payment Gateway:</strong> Your continued maintenance of an active Supreme subscription and use of our payment services after the thirty (30) day notice period constitutes your acceptance of the new payment gateway and your agreement to be bound by the new payment gateway's terms and conditions, privacy policy, and data processing practices. If you do not agree to the new payment gateway's terms or do not wish to use the new payment gateway, you must cancel your subscription before the effective date of the change. Cancellation must be submitted in writing via email to info@silenceai.net at least three (3) business days before the effective date of the payment gateway change.</p>
              <p className="mb-4"><strong>4.10 No Liability for Payment Gateway Changes:</strong> We shall not be liable for any disruption, inconvenience, or issues arising from the change of payment gateway, provided that we have given the required thirty (30) days' advance notice. You acknowledge that different payment gateways may have different terms, fees, supported payment methods, and data processing practices, and you agree to review and accept such terms before the effective date of any change.</p>
            </section>

            <section id="user-responsibilities">
              <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities and Obligations</h2>
              <p className="mb-4"><strong>5.1 Authorized Code Analysis:</strong> You are solely responsible for ensuring that you have the right to analyze any code with Supreme. You may only analyze code that you own or have explicit written authorization to analyze from the code owner. You agree not to use Supreme to analyze code belonging to third parties without their written consent.</p>
              <p className="mb-4"><strong>5.2 Lawful Use:</strong> You agree to use Supreme only for lawful purposes and in compliance with all applicable laws, regulations, and third-party contractual obligations. You assume all responsibility for ensuring that your use of Supreme complies with all legal requirements in your jurisdiction.</p>
              <p className="mb-4"><strong>5.3 Code Security and Data Protection:</strong> You are solely responsible for the security of your code and development environment. You acknowledge that by using Supreme, you are responsible for: Maintaining secure access to your development machine. Protecting your license key and subscription credentials. Ensuring your environment meets your security requirements. Implementing appropriate backup and recovery procedures. Assessing each Supreme output and validating results based on your circumstances. We do not store, retain, or backup your source code. You are solely responsible for maintaining copies of your code.</p>
              <p className="mb-4"><strong>5.4 Compliance:</strong> You agree to comply with all applicable laws, regulations, industry standards, and third-party agreements in connection with your use of Supreme and analysis of code.</p>
            </section>

            <section id="data-processing">
              <h2 className="text-2xl font-semibold mb-4">6. Data Processing and Privacy</h2>
              <p className="mb-4"><strong>6.1 Privacy Policy:</strong> Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference and available at our website.</p>
              <p className="mb-4"><strong>6.2 Code Analysis Data:</strong> Supreme performs all code analysis locally on your machine. Your source code is never transmitted to or processed by our servers. We do not collect, store, or process your source code in any manner.</p>
              <p className="mb-4"><strong>6.3 License Verification Data:</strong> When verifying your subscription license, we receive technical information including your extension version, license key, and request timestamp. This information is used solely for license verification and Database management. Your source code is never transmitted during license verification.</p>
              <p className="mb-4"><strong>6.4 Usage Data:</strong> We may collect aggregate, de-identified usage data regarding Supreme's functionality and performance for internal improvement purposes. This data does not identify you or contain your source code.</p>
            </section>

            <section id="ip-rights">
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property Rights</h2>
              <p className="mb-4"><strong>7.1 Supreme Intellectual Property:</strong> We retain all intellectual property rights in Supreme, including its code, algorithms, Database, user interface, documentation, and all related services. Nothing in these Terms grants you any rights to our intellectual property except the limited, non-exclusive right to use Supreme as intended for local code analysis on your personal machine.</p>
              <p className="mb-4"><strong>7.2 Your Code Ownership:</strong> You retain full ownership of all source code and content you analyze using Supreme, subject to the rights granted herein.</p>
              <p className="mb-4"><strong>7.3 Feedback:</strong> Any feedback, suggestions, reports, or other communications you provide regarding Supreme may be freely used by us without restriction, attribution, or compensation to you. You hereby assign all intellectual property rights in such feedback to Supreme.</p>
            </section>

            <section id="availability-updates">
              <h2 className="text-2xl font-semibold mb-4">8. Service Availability and Updates</h2>
              <p className="mb-4"><strong>8.1 Service Availability:</strong> While we strive to maintain reliable operation of our license verification systems and Database download services, we may temporarily suspend or interrupt these services for maintenance, security updates, or operational reasons. We will provide advance notice when reasonably possible.</p>
              <p className="mb-4"><strong>8.2 Extension Updates:</strong> We may release new versions of the Supreme extension at any time. You are responsible for maintaining updated versions of the extension. We reserve the right to discontinue support for outdated versions with reasonable notice.</p>
              <p className="mb-4"><strong>8.3 Database Updates:</strong> Database updates are released periodically and made available to users with active subscriptions. The frequency, timing, and content of Database updates are at our sole discretion. We make no commitment regarding the schedule or frequency of Database updates.</p>
              <p className="mb-4"><strong>8.4 Changes and Discontinuation:</strong> We reserve the right to add, remove, modify, or discontinue any functionality or component of Supreme at any time in our sole discretion. We will provide reasonable notice when discontinuing critical functionality.</p>
            </section>

            <section id="limitation-liability">
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability and Disclaimers</h2>
              <p className="mb-4"><strong>9.1 AS-IS Service:</strong> EXCEPT AS EXPRESSLY PROVIDED IN SECTION 3.6, SUPREME IS PROVIDED "AS IS" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. WE MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING: MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. THAT SUPREME WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS. THAT SUPREME WILL DETECT ALL VULNERABILITIES OR SECURITY ISSUES. THAT SUPREME WILL FUNCTION WITHOUT INTERRUPTION OR ERROR. THAT SUPREME RESULTS ARE ACCURATE, COMPLETE, OR RELIABLE. CONTINUED AVAILABILITY OF SUPREME OR ANY COMPONENT.</p>
              <p className="mb-4"><strong>9.2 Exclusion of Damages:</strong> TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SUPREME BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, REVENUE, OR GOODWILL, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
              <p className="mb-4"><strong>9.3 Liability Cap:</strong> OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS, YOUR USE OF SUPREME, OR ANY BREACH OF THESE TERMS SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL SUBSCRIPTION FEES PAID BY YOU TO SUPREME IN THE 12 MONTHS PRECEDING THE CLAIM; OR (B) $100 USD. This limitation applies to all claims regardless of the legal theory (contract, tort, negligence, strict liability, etc.).</p>
              <p className="mb-4"><strong>9.4 Essential Element:</strong> You acknowledge that the limitations in this Section 9 are an essential element of these Terms and that Supreme would not provide the Services without these limitations. These limitations allocate the risk between the parties and are reflected in the pricing of Supreme.</p>
              <p className="mb-4"><strong>9.5 No Liability for Third-Party Content:</strong> Supreme shall have no liability for any claims arising from: Your use of Supreme in violation of these Terms. Your analysis of code without proper authorization. Your modification or misuse of Supreme. Your reliance on or misinterpretation of Supreme's output. Third-party code, tools, or services used in conjunction with Supreme. Your violation of applicable law or third-party rights.</p>
            </section>

            <section id="indemnification">
              <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
              <p className="mb-4">You agree to indemnify, defend, and hold harmless Silence AI LLC and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, or expenses (including reasonable attorneys' fees) arising from or related to: Your violation of these Terms. Your use of Supreme to analyze code without proper authorization. Your violation of applicable law. Your violation of third-party intellectual property rights or contractual obligations. Claims arising from your code, data, or actions.</p>
            </section>

            <section id="term-termination">
              <h2 className="text-2xl font-semibold mb-4">11. Term and Termination</h2>
              <p className="mb-4"><strong>11.1 Agreement Term:</strong> These Terms commence on the date you install Supreme and continue until terminated by either party.</p>
              <p className="mb-4"><strong>11.2 Termination by You:</strong> You may terminate these Terms at any time by uninstalling the Supreme extension and discontinuing use. You may also cancel your subscription through our website.</p>
              <p className="mb-4"><strong>11.3 Termination by Us:</strong> We may immediately terminate or suspend your access to Supreme, Database downloads, and license verification if: You materially breach these Terms and fail to cure within 30 days of written notice. You engage in unauthorized, fraudulent, or illegal activity. You attempt to circumvent license verification or security mechanisms. You share or distribute your license key to unauthorized parties. You use Supreme in violation of applicable law. Your payment fails and remains unpaid after notice.</p>
              <p className="mb-4"><strong>11.4 Effect of Termination:</strong> Upon termination: Your right to use Supreme and access Database updates immediately ceases. Your subscription fees are non-refundable. You must uninstall the extension from all devices. Any extension version already installed may continue to function with its locally stored Database, but no new Database updates will be available. Provisions regarding intellectual property, limitation of liability, indemnification, and governing law survive termination.</p>
            </section>

            <section id="confidentiality">
              <h2 className="text-2xl font-semibold mb-4">12. Confidentiality</h2>
              <p className="mb-4"><strong>12.1 Mutual Confidentiality:</strong> Each party will maintain the confidentiality of the other party's Confidential Information. Confidential Information excludes information that is publicly available, was rightfully possessed before disclosure, or is independently developed.</p>
              <p className="mb-4"><strong>12.2 Supreme Confidentiality:</strong> Our Confidential Information includes the Supreme extension, Database, algorithms, pricing, and product roadmap.</p>
              <p className="mb-4"><strong>12.3 Your Confidentiality:</strong> Your Confidential Information includes your license key, subscription status, and usage information. We will protect your information in accordance with our Privacy Policy.</p>
            </section>

            <section id="general-provisions">
              <h2 className="text-2xl font-semibold mb-4">13. General Provisions</h2>
              <p className="mb-4"><strong>13.1 Governing Law:</strong> These Terms are governed by the laws applicable to the jurisdiction where Silence AI LLC's primary operations are located, without regard to conflict of law principles.</p>
              <p className="mb-4"><strong>13.2 Dispute Resolution:</strong> If you have any concern or dispute regarding these Terms or our services, you agree to first attempt to resolve the matter informally by contacting us. If informal resolution is unsuccessful, disputes shall be resolved through binding arbitration or in courts of competent jurisdiction as determined by law of the United Arab Emirates.</p>
              <p className="mb-4"><strong>13.3 Amendments:</strong> We reserve the right to modify these Terms at any time. We will notify you of material changes via email or through the extension. Changes become effective 30 days after notification. Your continued use of Supreme after the 30-day period constitutes acceptance of the updated Terms. If you do not agree with changes, you must uninstall and discontinue use.</p>
              <p className="mb-4"><strong>13.4 Severability:</strong> If any provision of these Terms is found invalid or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, or if not possible, shall be severed. The remaining provisions continue in full force.</p>
              <p className="mb-4"><strong>13.5 Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement regarding your use of Supreme and supersede all prior agreements, understandings, and negotiations.</p>
              <p className="mb-4"><strong>13.6 No Waiver:</strong> Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or any other right or remedy.</p>
              <p className="mb-4"><strong>13.7 Notices:</strong> Any notices required under these Terms may be provided by email to the address you provided or through the extension. Email notices are deemed received upon sending.</p>
              <p className="mb-4"><strong>13.8 Survival:</strong> Provisions regarding intellectual property rights, limitation of liability, indemnification, governing law, and confidentiality survive termination of these Terms.</p>
              <p className="mb-4"><strong>13.9 No Assignment:</strong> You may not assign or transfer these Terms without our prior written consent. We may assign these Terms to successors or Affiliates. Any attempted assignment in violation of this provision is void.</p>
              <p className="mb-4"><strong>13.10 No Third-Party Beneficiaries:</strong> These Terms are solely for the benefit of you and the Company. No third party has any rights or claims under these Terms.</p>
              <p className="mb-4"><strong>13.11 Interpretation:</strong> Headings are for reference only and do not affect interpretation. Capitalized terms have the meanings specified in these Terms. "Including" means "including without limitation."</p>
              <p className="mb-4"><strong>13.12 Force Majeure:</strong> We shall have no liability for any failure to perform our obligations due to events beyond our reasonable control, including strikes, epidemics, war, natural disasters, or infrastructure failures, provided you are notified of such events.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p className="mb-4">For questions, concerns, or disputes regarding these Terms or Supreme, please contact us at:</p>
              <p className="mb-2">Silence AI</p>
              <p className="mb-2">Email: info@silenceai.net</p>
              <p className="mb-2">Website: https://silenceai.net/</p>
              <p className="mb-4">Address: Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE</p>
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

export default SupremeTermsOfService;
