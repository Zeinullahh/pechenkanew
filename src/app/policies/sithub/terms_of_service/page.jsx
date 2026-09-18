"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
const SithubTermsOfService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sections = [
    { id: 'consent', title: '1. Consent and Legal Force' },
    { id: 'platform-description', title: '2. Platform Description and Operating Principles' },
    { id: 'security-guarantees', title: '3. Data Security Guarantees and Liability Limitations' },
    { id: 'subscription', title: '4. Subscription and Payment' },
    { id: 'sla', title: '5. Service Level Agreement (SLA)' },
    { id: 'intellectual-property', title: '6. Intellectual Property' },
    { id: 'limitation-liability', title: '7. Limitation of Liability' },
    { id: 'termination', title: '8. Termination of Terms' },
    { id: 'acceptable-use', title: '9. Acceptable Use' },
    { id: 'compliance', title: '10. Compliance with Legislation' },
    { id: 'governing-law', title: '11. Applicable Law and Dispute Resolution' },
    { id: 'changes', title: '12. Changes to Terms' },
    { id: 'miscellaneous', title: '13. Miscellaneous Provisions' },
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
          <h1 className="text-4xl font-bold mb-2">Sithub Platform</h1>
          <h2 className="text-2xl text-gray-400 mb-8">Terms of Service</h2>

          <div className="space-y-8">
            <section id="consent">
              <h2 className="text-2xl font-semibold mb-4">1. CONSENT AND LEGAL FORCE</h2>

              <h3 className="text-xl font-semibold mb-3">1.1 Acceptance of Terms</h3>
              <p className="mb-4">By subscribing to services, downloading, installing, or using Sithub or any of its Components, you confirm that you:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Have read and understood these Terms</li>
                <li>Agree to comply with these Terms in full</li>
                <li>Have the legal authority to enter into this agreement</li>
              </ul>
              <p className="mb-4">If you do not agree with these Terms, you do not have the right to use the Platform.</p>

              <h3 className="text-xl font-semibold mb-3">1.2 Age Restrictions</h3>
              <p className="mb-4">To use Sithub:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>You must be at least 18 years old for independent use</li>
                <li>If you are between 16 and 18 years old, you must obtain written consent from a parent or legal guardian</li>
                <li>Use of the Platform is prohibited for persons under 16 years of age</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">1.3 Corporate Use</h3>
              <p className="mb-4">When using on behalf of an organization, you confirm that you have the authority to enter into this agreement on behalf of such organization.</p>

              <h3 className="text-xl font-semibold mb-3">1.4 Related Documents</h3>
              <p className="mb-4">These Terms are supplemented by the following documents, which are an integral part of them:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Privacy Policy</strong></li>
                <li><strong>Technical Documentation on Security Architecture</strong></li>
              </ul>
            </section>

            <section id="platform-description">
              <h2 className="text-2xl font-semibold mb-4">2. PLATFORM DESCRIPTION AND OPERATING PRINCIPLES</h2>

              <h3 className="text-xl font-semibold mb-3">2.1 Architectural Principle: Local Processing</h3>
              <p className="mb-4">Sithub is designed based on the principle of <strong>"Privacy by Design"</strong> (privacy by design). All Components operate exclusively on the User's local infrastructure without transferring source code to external servers.</p>

              <h3 className="text-xl font-semibold mb-3">2.2 Platform Components</h3>

              <h4 className="text-lg font-semibold mb-2">2.2.1 Repository Management System</h4>
              <p className="mb-4">Self-hosted Git version control:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Operates entirely on the User's equipment</li>
                <li>Does not require internet connection for core functionality</li>
                <li>Does not transmit repository data to Provider's servers</li>
                <li>Is a fully autonomous component for code management</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">2.2.2 Security Scanning Engine</h4>
              <p className="mb-4">AI-powered code analysis operating locally:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Performs security scanning on local infrastructure</li>
                <li>Runs entirely within your network</li>
                <li>Integrates with locally stored vulnerability databases</li>
                <li>Does not transmit code or scan results externally</li>
                <li>Provides real-time vulnerability detection</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">2.2.3 Vulnerability Database Service</h4>
              <p className="mb-4">Security intelligence updates:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Downloads threat data from Provider's servers</li>
                <li>Stores databases locally on your infrastructure</li>
                <li><strong>The only component</strong> that communicates with Provider's servers</li>
                <li>Receives regular security updates</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.3 Security Update Service</h3>

              <h4 className="text-lg font-semibold mb-2">2.3.1 Purpose of Service</h4>
              <p className="mb-4">Sithub uses vulnerability databases to scan User's code for known security threats. To ensure these databases are up-to-date, the Platform downloads updates from Provider's servers.</p>

              <h4 className="text-lg font-semibold mb-2">2.3.2 What is Transmitted FROM Provider's Servers TO User</h4>
              <p className="mb-4"><strong>Incoming data flow</strong> (from Provider's servers to User's infrastructure):</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Vulnerability databases (CVE, information about malicious packages)</li>
                <li>Security patches and vulnerability remediation instructions</li>
                <li>Package security metadata (npm, PyPI, Maven, etc.)</li>
                <li>Malicious code signatures</li>
                <li>Security scanning engine updates</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">2.3.3 What is Transmitted FROM User TO Provider's Servers</h4>
              <p className="mb-4"><strong>Outgoing data flow</strong> (from User's infrastructure to Provider's servers):</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>License verification tokens</strong> - cryptographic tokens to confirm subscription validity</li>
                <li><strong>License key hash</strong> - for authenticating update requests</li>
                <li><strong>Update request metadata</strong> - timestamp, Sithub version, installation ID hash</li>
              </ul>

              <p className="mb-4 font-bold">CRITICALLY IMPORTANT:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>User's Source Code is NEVER transmitted to Provider's servers</strong></li>
                <li><strong>Security scan results are NEVER transmitted to Provider's servers</strong></li>
                <li><strong>File names, project structure, repository metadata are NEVER transmitted</strong></li>
                <li><strong>Information about developers and users is NEVER transmitted</strong></li>
              </ul>
            </section>

            <section id="security-guarantees">
              <h2 className="text-2xl font-semibold mb-4">3. DATA SECURITY GUARANTEES AND LIABILITY LIMITATIONS</h2>

              <h3 className="text-xl font-semibold mb-3">3.1 Provider's Guarantees</h3>

              <h4 className="text-lg font-semibold mb-2">3.1.1 Architectural Guarantee</h4>
              <p className="mb-4">The Provider guarantees that Sithub is designed in such a way that:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>User's source code is processed exclusively on local infrastructure</li>
                <li>Platform components do not contain functions for data transmission to external servers</li>
                <li>Only vulnerability database updates are downloaded from Provider's servers</li>
                <li>No code, scan results, or repository metadata is transmitted externally</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">3.1.2 Guarantee Limitations</h4>
              <p className="mb-4">The Provider does <strong>NOT guarantee</strong> protection from:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>User's own actions to transfer code to external services</li>
                <li>Compromise of User's infrastructure by third parties</li>
                <li>Network security configuration errors on User's side</li>
                <li>Actions of User's employees or contractors</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">3.2 User's Obligations</h3>

              <h4 className="text-lg font-semibold mb-2">3.2.1 Infrastructure Security</h4>
              <p className="mb-4">The User undertakes to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Maintain proper firewall configuration</li>
                <li>Implement access control to local systems</li>
                <li>Ensure physical and network security of servers</li>
                <li>Regularly update operating systems and protection means</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">3.2.2 Preventing Manual Data Transfer</h4>
              <p className="mb-4">The User undertakes to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Not manually upload source code to external cloud services</li>
                <li>Train developers in principles of safe work with Sithub</li>
                <li>Control actions of users with privileged access</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">3.4 Right to Audit</h3>
              <p className="mb-4">The User has the right to conduct analysis of Sithub network traffic, request technical documentation on security architecture, and conduct analysis of open-source components of the Platform.</p>
            </section>

            <section id="subscription">
              <h2 className="text-2xl font-semibold mb-4">4. SUBSCRIPTION AND PAYMENT</h2>

              <h3 className="text-xl font-semibold mb-3">4.1 Subscription Model</h3>

              <h4 className="text-lg font-semibold mb-2">4.1.1 Subscription Options</h4>
              <p className="mb-4">Sithub is provided on the basis of subscription, including:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Full access to all Platform features</li>
                <li>All capabilities without restrictions</li>
                <li>Regular security database updates</li>
                <li>Technical support in accordance with SLA</li>
              </ul>

              <p className="mb-4"><strong>Available Plans:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Monthly Plan:</strong> $480/month (USD)</li>
                <li><strong>Annual Plan:</strong> $336/month billed annually at $4,032/year (USD)</li>
              </ul>
              <p className="mb-4">The monthly plan provides flexibility; the annual plan offers 30% savings.</p>

              <h4 className="text-lg font-semibold mb-2">4.1.2 Cost and Payment</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Current subscription cost is indicated on the website www.silenceai.net or https://sithub.silenceai.net</li>
                <li>Payment is made in advance (monthly or annually)</li>
                <li>Non-cash payments are accepted in accordance with the legislation of the Republic of Kazakhstan</li>
                <li>International payment methods are available for international clients</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">4.2 Renewal and Cancellation</h3>
              <p className="mb-4">If the User does not cancel the subscription before the end of the validity period, the subscription is automatically renewed for the next period. The User can cancel the subscription at any time; the subscription remains active until the end of the paid period.</p>

              <h3 className="text-xl font-semibold mb-3">4.3 Refund Policy</h3>
              <p className="mb-4">Paid funds for subscription <strong>are not refunded</strong>, except in cases of critical system failure, breach of privacy guarantees, or regulatory requirements. For Users located in the European Union, a <strong>14-day right of withdrawal</strong> applies.</p>
            </section>

            <section id="sla">
              <h2 className="text-2xl font-semibold mb-4">5. SERVICE LEVEL AGREEMENT (SLA)</h2>

              <h3 className="text-xl font-semibold mb-3">5.1 Update Server Availability</h3>
              <p className="mb-4">The Provider strives to ensure <strong>99.5% uptime</strong> of update servers per year. This is equivalent to no more than 43.8 hours of downtime per year.</p>

              <h3 className="text-xl font-semibold mb-3">5.2 Local Component Operation</h3>
              <p className="mb-4">All Platform components continue to operate regardless of Provider's server availability:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Repository Management</strong> - fully autonomous</li>
                <li><strong>Security Scanning</strong> - continues using last downloaded vulnerability database</li>
                <li><strong>Code Analysis</strong> - operates completely offline</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">5.3 Security Updates</h3>
              <p className="mb-4">The Provider provides vulnerability database updates <strong>at least once per week</strong>. When critical vulnerabilities are discovered (CVSS 9.0+), update is released within <strong>48 hours</strong> from public disclosure.</p>

              <h3 className="text-xl font-semibold mb-3">5.4 Technical Support</h3>
              <div className="mb-4">
                <table className="w-full border-collapse border border-gray-700">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-700 px-4 py-2 text-left">Priority</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Description</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">First Response Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Critical</td>
                      <td className="border border-gray-700 px-4 py-2">Complete Platform failure</td>
                      <td className="border border-gray-700 px-4 py-2">4 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">High</td>
                      <td className="border border-gray-700 px-4 py-2">Significant functionality reduction</td>
                      <td className="border border-gray-700 px-4 py-2">12 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Medium</td>
                      <td className="border border-gray-700 px-4 py-2">Limited impact on operation</td>
                      <td className="border border-gray-700 px-4 py-2">48 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Low</td>
                      <td className="border border-gray-700 px-4 py-2">General questions, feature requests</td>
                      <td className="border border-gray-700 px-4 py-2">5 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-4">Support is available Monday to Friday, 09:00-17:00 (GMT+6, Nur-Sultan). Critical incidents are handled 24/7.</p>
            </section>

            <section id="intellectual-property">
              <h2 className="text-2xl font-semibold mb-4">6. INTELLECTUAL PROPERTY</h2>

              <h3 className="text-xl font-semibold mb-3">6.1 User's Rights to Their Code</h3>
              <p className="mb-4">The User retains full and exclusive rights to all source code created using Sithub. The Provider does not claim ownership of User's code and <strong>NEVER uses User's code for AI model training or other purposes</strong>.</p>

              <h3 className="text-xl font-semibold mb-3">6.2 Provider's Rights to Platform</h3>
              <p className="mb-4">The Provider retains all rights to source code of all Platform Components, algorithms and methodologies, vulnerability databases, trademarks, and technical documentation.</p>

              <h3 className="text-xl font-semibold mb-3">6.3 Usage Restrictions</h3>
              <p className="mb-4">The User does NOT have the right to reverse engineer proprietary Platform components, distribute or resell Sithub to third parties, remove or modify copyright notices, create competing products based on Sithub, or distribute vulnerability databases provided by Provider.</p>
            </section>

            <section id="limitation-liability">
              <h2 className="text-2xl font-semibold mb-4">7. LIMITATION OF LIABILITY</h2>

              <h3 className="text-xl font-semibold mb-3">7.1 "As Is" Provision</h3>
              <p className="mb-4">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW: Sithub is provided "AS IS" and "AS AVAILABLE", without any warranties, express or implied.</p>

              <h3 className="text-xl font-semibold mb-3">7.2 Liability Boundaries</h3>
              <p className="mb-4">Provider is NOT responsible for problems on User's side, accuracy of security scanning (false positives/negatives), or indirect damages (lost profits, loss of business reputation, data loss, business interruption).</p>
              <p className="mb-4">The Provider's maximum aggregate liability for all claims related to Sithub is limited to: <strong>The amount paid by User for subscription during the 12 months preceding the claim</strong></p>

              <h3 className="text-xl font-semibold mb-3">7.4 Force Majeure</h3>
              <p className="mb-4">The Provider is not responsible for non-fulfillment of obligations caused by force majeure circumstances, including natural disasters, wars, terrorist attacks, epidemics, actions of government authorities, power outages, internet failures, or cyberattacks on Provider's infrastructure.</p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-semibold mb-4">8. TERMINATION OF TERMS</h2>

              <h3 className="text-xl font-semibold mb-3">8.1 Termination by User</h3>
              <p className="mb-4">The User can stop using Sithub at any time. After subscription termination, all downloaded Components remain on User's infrastructure and continue to function with the last received security database.</p>

              <h3 className="text-xl font-semibold mb-3">8.2 Termination by Provider</h3>
              <p className="mb-4">The Provider may immediately terminate service provision in case of violation of acceptable use conditions, bypass of licensing mechanisms, illegal use of Platform, or distribution of Sithub or databases to third parties. When a breach is identified, Provider sends written notification and User has <strong>14 days</strong> to remedy the breach.</p>

              <h3 className="text-xl font-semibold mb-3">8.3 Consequences of Termination</h3>
              <p className="mb-4">After subscription termination: license key is deactivated, access to security updates ceases, access to technical support ceases. User data (code, scan results) remains on User's infrastructure.</p>
            </section>

            <section id="acceptable-use">
              <h2 className="text-2xl font-semibold mb-4">9. ACCEPTABLE USE</h2>

              <h3 className="text-xl font-semibold mb-3">9.1 Permitted Use</h3>
              <p className="mb-4">The User has the right to use Sithub for software development, code analysis for security vulnerabilities, corporate repository management, training and educational purposes (within User's organization), and any lawful purposes related to software development.</p>

              <h3 className="text-xl font-semibold mb-3">9.2 Prohibited Use</h3>
              <p className="mb-4">The User does NOT have the right to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Reverse engineer proprietary Platform components</li>
                <li>Bypass licensing or authentication mechanisms</li>
                <li>Distribute Sithub or its components to third parties</li>
                <li>Distribute vulnerability databases</li>
                <li>Use Sithub for developing malware or hacking tools</li>
                <li>Use Sithub for any illegal purposes</li>
              </ul>
            </section>

            <section id="compliance">
              <h2 className="text-2xl font-semibold mb-4">10. COMPLIANCE WITH LEGISLATION</h2>

              <h3 className="text-xl font-semibold mb-3">10.1 Export Control</h3>
              <p className="mb-4">The User is responsible for compliance with all applicable export control laws. Sithub cannot be used in territories subject to international sanctions.</p>

              <h3 className="text-xl font-semibold mb-3">10.2 Data Protection</h3>
              <p className="mb-4">For Users located in the European Union, provisions of the General Data Protection Regulation (GDPR) apply. Provider acts as data processor, User is the data controller. Provider uses Standard Contractual Clauses approved by the European Commission for data transfers from EU to Kazakhstan.</p>

              <h3 className="text-xl font-semibold mb-3">10.3 Data Retention</h3>
              <div className="mb-4">
                <table className="w-full border-collapse border border-gray-700">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-700 px-4 py-2 text-left">Data Type</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Retention Period</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Subscription information</td>
                      <td className="border border-gray-700 px-4 py-2">Validity period + 1 year</td>
                      <td className="border border-gray-700 px-4 py-2">Operational necessity</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Payment records</td>
                      <td className="border border-gray-700 px-4 py-2">7 years</td>
                      <td className="border border-gray-700 px-4 py-2">Tax legislation of RK</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">License keys (hashes)</td>
                      <td className="border border-gray-700 px-4 py-2">Validity period + 1 year</td>
                      <td className="border border-gray-700 px-4 py-2">Abuse prevention</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Update request logs</td>
                      <td className="border border-gray-700 px-4 py-2">90 days</td>
                      <td className="border border-gray-700 px-4 py-2">Technical support</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="governing-law">
              <h2 className="text-2xl font-semibold mb-4">11. APPLICABLE LAW AND DISPUTE RESOLUTION</h2>

              <h3 className="text-xl font-semibold mb-3">11.1 Applicable Law</h3>
              <p className="mb-4">These Terms are governed by and construed in accordance with the laws of the <strong>Republic of Kazakhstan</strong>, without regard to conflict of law provisions.</p>

              <h3 className="text-xl font-semibold mb-3">11.2 Dispute Resolution</h3>
              <p className="mb-4">Before applying to court or arbitration, Parties undertake to send written claim to the other Party, provide 30 days for response and settlement, and make good faith attempt to resolve dispute through negotiations. Claims are sent to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>To Provider:</strong> info@silenceai.net</li>
                <li><strong>To User:</strong> to contact email specified during registration</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">11.2.2 Arbitration</h3>
              <p className="mb-4">If pre-litigation settlement does not lead to result, disputes are subject to resolution in arbitration in accordance with the Regulations of the International Arbitration Court at the National Chamber of Entrepreneurs of the Republic of Kazakhstan "Atameken". Place of arbitration: Astana (Nur-Sultan), Republic of Kazakhstan.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">12. CHANGES TO TERMS</h2>

              <h3 className="text-xl font-semibold mb-3">12.1 Right to Change</h3>
              <p className="mb-4">The Provider reserves the right to change these Terms at any time for changes in applicable legislation, development of Sithub functionality, changes in business model, or improvement of User interests protection.</p>

              <h3 className="text-xl font-semibold mb-3">12.2 Change Notification</h3>
              <p className="mb-4">Material changes are notified via email <strong>30 days</strong> before changes take effect, notification in Sithub interface, and publication on website with highlighted changes.</p>

              <h3 className="text-xl font-semibold mb-3">12.3 Consent to Changes</h3>
              <p className="mb-4">By continuing to use Sithub after changes take effect, you confirm consent to updated Terms. If you do not agree with changes, you have the right to stop using Sithub and cancel subscription before changes take effect.</p>
            </section>

            <section id="miscellaneous">
              <h2 className="text-2xl font-semibold mb-4">13. MISCELLANEOUS PROVISIONS</h2>

              <h3 className="text-xl font-semibold mb-3">13.1 Severability</h3>
              <p className="mb-4">If any provision of these Terms is found to be invalid or unenforceable, remaining provisions remain in full force, invalid provision is replaced by valid provision closest in meaning.</p>

              <h3 className="text-xl font-semibold mb-3">13.2 Waiver of Rights</h3>
              <p className="mb-4">Non-exercise or delay in exercising any right does not mean waiver of such right. Provider may exercise its rights at any time in the future.</p>

              <h3 className="text-xl font-semibold mb-3">13.4 Entire Agreement</h3>
              <p className="mb-4">These Terms together with Privacy Policy constitute the entire agreement between Parties and replace all previous oral agreements, written agreements, and representations and statements.</p>

              <h3 className="text-xl font-semibold mb-3">13.6 Notices</h3>
              <p className="mb-4"><strong>Official Notices are Sent to:</strong></p>
              <p className="mb-2"><strong>To Provider:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Email: info@silenceai.net</li>
                <li>Postal address: Astana city, Almaty district, Ak-Bulak-3 residential area, Tasshoki lane, house 3, apartment 26</li>
              </ul>
              <p className="mb-2"><strong>To User:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>To email specified during registration</li>
                <li>Through notifications in Sithub interface</li>
              </ul>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">14. CONTACT INFORMATION</h2>
              <p className="mb-4">Questions about terms of service, about your subscription, about how the platform works?</p>
              <p className="mb-4">Contact us:</p>
              <p className="mb-2"><strong>Email:</strong> info@silenceai.net</p>
              <p className="mb-2"><strong>Response time:</strong> up to 5 business days</p>
              <p className="mb-4">We created Sithub to ensure secure development with privacy compliance. These Terms are designed to protect the interests of both Parties and ensure transparency of our relationship.</p>
            </section>
          </div>

          <p className="mt-8 text-sm text-gray-400">Effective Date: January 13, 2026</p>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SithubTermsOfService;
