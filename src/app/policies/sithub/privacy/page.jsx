"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
const SithubPrivacyPolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sections = [
    { id: 'introduction', title: '1. Introduction and Principles' },
    { id: 'architectural-guarantees', title: '2. Architectural Privacy Guarantees' },
    { id: 'information-collected', title: '3. Information We Collect' },
    { id: 'purposes-legal-bases', title: '4. Purposes and Legal Bases for Processing' },
    { id: 'data-storage-security', title: '5. Data Storage and Security' },
    { id: 'data-transfer', title: '6. Data Transfer and Disclosure' },
    { id: 'international-transfers', title: '7. International Data Transfers' },
    { id: 'data-subject-rights', title: '8. Data Subject Rights' },
    { id: 'cookies-tracking', title: '9. Cookies and Tracking Technologies' },
    { id: 'data-retention', title: '10. Data Retention' },
    { id: 'childrens-privacy', title: "11. Children's Privacy" },
    { id: 'user-responsibilities', title: '12. Your Data Protection Responsibilities' },
    { id: 'transparency-report', title: '13. Transparency Report' },
    { id: 'dpa', title: '14. Data Processing Agreement (DPA)' },
    { id: 'changes', title: '15. Changes to the Privacy Policy' },
    { id: 'contact', title: '16. Contact Information' },
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
          <h2 className="text-2xl text-gray-400 mb-8">Privacy Policy</h2>

          <div className="space-y-8">
            <section id="introduction">
              <h2 className="text-2xl font-semibold mb-4">1. INTRODUCTION AND PRINCIPLES</h2>

              <h3 className="text-xl font-semibold mb-3">1.1 Purpose of this Policy</h3>
              <p className="mb-4">This Privacy Policy (hereinafter referred to as the "Policy") describes the principles and practices of data processing when using the Sithub platform. The Policy is an integral part of the Terms of Service and should be read in conjunction with them.</p>

              <h3 className="text-xl font-semibold mb-3">1.2 Privacy by Design Principle</h3>
              <p className="mb-4">Sithub is built on the architectural principle of data collection minimization. Privacy is not an additional feature—it is a fundamental characteristic of the system architecture.</p>

              <h3 className="text-xl font-semibold mb-3">1.3 Applicable Legislation</h3>
              <p className="mb-4">This Policy has been developed taking into account:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>The Law of the Republic of Kazakhstan "On Personal Data and Their Protection"</li>
                <li>The EU General Data Protection Regulation (GDPR)—for users from the European Union</li>
                <li>Other applicable data protection regulations in the User's jurisdiction</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">1.4 Data Controller and Processor</h3>
              <p className="mb-4"><strong>For personal data processed in connection with subscriptions:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Data Controller:</strong> Silence AI</li>
                <li>We determine the purposes and means of processing subscription information</li>
              </ul>
              <p className="mb-4"><strong>For data processed on the Platform:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Data Controller:</strong> User (you control your code and development data)</li>
                <li><strong>Data Processor:</strong> Not applicable—we do not process your development data</li>
              </ul>
            </section>

            <section id="architectural-guarantees">
              <h2 className="text-2xl font-semibold mb-4">2. ARCHITECTURAL PRIVACY GUARANTEES</h2>

              <h3 className="text-xl font-semibold mb-3">2.1 Core Principle of Data Isolation</h3>
              <p className="mb-4">User source code is processed exclusively on the User's local infrastructure. The Sithub architecture is designed to prevent the transmission of source code to the Provider's servers.</p>

              <h3 className="text-xl font-semibold mb-3">2.2 Technical Implementation of Isolation</h3>

              <h4 className="text-lg font-semibold mb-2">Repository Management:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Operates completely on your infrastructure</li>
                <li>Contains no network data transmission functions for code</li>
                <li>All repositories stored locally</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Security Scanning:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Operates completely on your infrastructure</li>
                <li>Vulnerability detection runs locally</li>
                <li>Scan results remain on your servers</li>
                <li>No code fragments transmitted externally</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Update Service:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>The only component that communicates with the Provider's servers</li>
                <li>Transmits only the data specified in section 3.2</li>
                <li>Downloads vulnerability databases to your infrastructure</li>
                <li>The scanning module is isolated from network functions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.3 What This Means in Practice</h3>
              <p className="mb-4">The Provider has no technical ability to access:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Source code stored on the Platform</li>
                <li>Security scan results</li>
                <li>Commit history and code changes</li>
                <li>File names and project structure</li>
                <li>Repository metadata</li>
              </ul>
              <p className="mb-4"><strong>Important Clarification:</strong> This guarantee is valid provided Sithub is operated correctly in accordance with the technical documentation and in the absence of User actions to manually transmit data to external services.</p>
            </section>

            <section id="information-collected">
              <h2 className="text-2xl font-semibold mb-4">3. INFORMATION WE COLLECT</h2>

              <h3 className="text-xl font-semibold mb-3">3.1 Subscription Information (Required)</h3>
              <p className="mb-4">To provide services, we collect the following information:</p>

              <h4 className="text-lg font-semibold mb-2">Corporate Information:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Organization name (for corporate subscriptions)</li>
                <li>Contact email for communication</li>
                <li>Country of registration (for compliance with applicable laws)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">License Information:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>License key hash (irreversible cryptographic transformation)</li>
                <li>Subscription activation date</li>
                <li>Subscription expiration date</li>
                <li>Subscription status (active/inactive/suspended)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Payment Information:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Payment details are processed by third-party payment processors</li>
                <li>The Provider does not store complete bank card data</li>
                <li>We store only information about the payment method type and the last four digits of the card</li>
              </ul>
              <p className="mb-4"><strong>Legal Basis (for users from the EU):</strong> Performance of contract (GDPR, Article 6(1)(b))</p>

              <h3 className="text-xl font-semibold mb-3">3.2 Technical Data from Sithub (Automatic)</h3>
              <p className="mb-4">When verifying the license and requesting updates, Sithub transmits:</p>

              <h4 className="text-lg font-semibold mb-2">Authentication Data:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>License key hash</li>
                <li>Cryptographic session token (temporary)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Technical Metadata:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Request timestamp (date and time in UTC format)</li>
                <li>Installed Sithub version (e.g., "2.1.3")</li>
                <li>Installation identifier hash (irreversible transformation of unique ID)</li>
                <li>IP address (automatically recorded by the server, used to prevent abuse)</li>
              </ul>
              <p className="mb-4"><strong>Legal Basis:</strong> Legitimate interests of the Provider in preventing fraud and ensuring security (GDPR, Article 6(1)(f))</p>
              <p className="mb-4"><strong>Retention Period:</strong> 90 days</p>

              <h3 className="text-xl font-semibold mb-3">3.3 Technical Telemetry (Optional)</h3>
              <p className="mb-4">If you explicitly consent, we may collect additional technical information to improve service quality:</p>

              <h4 className="text-lg font-semibold mb-2">Usage Information:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Frequency of update requests</li>
                <li>Security update download statistics</li>
                <li>Time of last successful update</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Error Reports:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Stack traces without source code</li>
                <li>Error messages</li>
                <li>System environment information (OS, version, architecture)</li>
                <li>System call logs (without user data)</li>
              </ul>
              <p className="mb-4"><strong>Important:</strong> Error reports undergo automatic filtering to remove any code fragments or confidential data before transmission.</p>
              <p className="mb-4"><strong>Legal Basis:</strong> Consent (GDPR, Article 6(1)(a)) - You can withdraw consent at any time in Sithub settings</p>

              <h3 className="text-xl font-semibold mb-3">3.4 Information We DO NOT Collect</h3>
              <p className="mb-4">We explicitly <strong>do not collect, process, or store</strong>:</p>

              <h4 className="text-lg font-semibold mb-2">Source Code:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Code in repositories</li>
                <li>File contents</li>
                <li>Code fragments</li>
                <li>Comments in code</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Analysis Results:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Security scan results</li>
                <li>Discovered vulnerabilities in your code</li>
                <li>Code quality reports</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Development Metadata:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>File and directory names</li>
                <li>Project structure</li>
                <li>Commit history</li>
                <li>Commit messages</li>
                <li>Branch information</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">User Information:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Developer names</li>
                <li>Developer email addresses</li>
                <li>Team structure</li>
                <li>Access rights within the organization</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Credentials:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Passwords</li>
                <li>API keys</li>
                <li>Access tokens</li>
                <li>SSH keys</li>
                <li>Certificates</li>
              </ul>
            </section>

            <section id="purposes-legal-bases">
              <h2 className="text-2xl font-semibold mb-4">4. PURPOSES AND LEGAL BASES FOR PROCESSING</h2>

              <h3 className="text-xl font-semibold mb-3">4.1 Subscription Management</h3>
              <p className="mb-4"><strong>Purpose:</strong> Providing access to Sithub and updates</p>
              <p className="mb-4"><strong>Processed Data:</strong> Subscription information, License status</p>
              <p className="mb-4"><strong>Legal Basis:</strong> Performance of contract (GDPR, Article 6(1)(b)); For Kazakhstan: consent to personal data processing upon entering into a contract</p>
              <p className="mb-4"><strong>Actions:</strong> Verification of license activity, Processing subscription renewals, Sending subscription status notifications, Providing access to security updates</p>

              <h3 className="text-xl font-semibold mb-3">4.2 Delivery of Security Updates</h3>
              <p className="mb-4"><strong>Purpose:</strong> Ensuring vulnerability databases are up-to-date</p>
              <p className="mb-4"><strong>Processed Data:</strong> License key hash, Sithub version, Request timestamps</p>
              <p className="mb-4"><strong>Legal Basis:</strong> Performance of contract (GDPR, Article 6(1)(b))</p>
              <p className="mb-4"><strong>Actions:</strong> Authentication of update requests, Transmission of vulnerability databases, Transmission of security patches, Monitoring update service functionality</p>

              <h3 className="text-xl font-semibold mb-3">4.3 Service Quality Improvement</h3>
              <p className="mb-4"><strong>Purpose:</strong> Development and improvement of security databases</p>
              <p className="mb-4"><strong>Processed Data:</strong> Technical telemetry (only if you have consented), Anonymous error reports</p>
              <p className="mb-4"><strong>Legal Basis:</strong> Consent (GDPR, Article 6(1)(a))</p>
              <p className="mb-4"><strong>Actions:</strong> Research of new threats and vulnerabilities, Improving vulnerability detection accuracy, Development of new security signatures, Fixing bugs in Sithub components</p>
              <p className="mb-4"><strong>Information Sources:</strong> Results of threat analysis conducted by the Threat Hunters division of Silence AI. <strong>NOT</strong> your code.</p>

              <h3 className="text-xl font-semibold mb-3">4.4 Legal Compliance</h3>
              <p className="mb-4"><strong>Purpose:</strong> Fulfilling legal obligations</p>
              <p className="mb-4"><strong>Processed Data:</strong> Subscription information, Payment records</p>
              <p className="mb-4"><strong>Legal Basis:</strong> Legal obligation (GDPR, Article 6(1)(c)); For Kazakhstan: requirements of tax and accounting legislation</p>
              <p className="mb-4"><strong>Actions:</strong> Storage of payment records (7 years—tax legislation requirement), Responses to court orders, Providing information to regulatory authorities (only with lawful basis), Fraud prevention</p>

              <h3 className="text-xl font-semibold mb-3">4.5 Abuse Prevention</h3>
              <p className="mb-4"><strong>Purpose:</strong> Protection against fraud and violations of Terms</p>
              <p className="mb-4"><strong>Processed Data:</strong> Request IP addresses, Frequency of update requests, Usage patterns</p>
              <p className="mb-4"><strong>Legal Basis:</strong> Legitimate interests (GDPR, Article 6(1)(f)) - Our legitimate interests: fraud prevention, protection against license abuse</p>
              <p className="mb-4"><strong>Actions:</strong> Detection of suspicious activity, Blocking compromised licenses, Prevention of unauthorized distribution</p>
            </section>

            <section id="data-storage-security">
              <h2 className="text-2xl font-semibold mb-4">5. DATA STORAGE AND SECURITY</h2>

              <h3 className="text-xl font-semibold mb-3">5.1 Data Stored by the Provider</h3>
              <p className="mb-4"><strong>Only the following is stored on the Provider's servers:</strong></p>
              <div className="mb-4">
                <table className="w-full border-collapse border border-gray-700">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-700 px-4 py-2 text-left">Data Type</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Location</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Encryption</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Subscription information</td>
                      <td className="border border-gray-700 px-4 py-2">Republic of Kazakhstan</td>
                      <td className="border border-gray-700 px-4 py-2">AES-256</td>
                      <td className="border border-gray-700 px-4 py-2">Duration + 1 year</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Payment records</td>
                      <td className="border border-gray-700 px-4 py-2">Payment processor</td>
                      <td className="border border-gray-700 px-4 py-2">PCI DSS compliant</td>
                      <td className="border border-gray-700 px-4 py-2">7 years (legal requirement)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">License key hashes</td>
                      <td className="border border-gray-700 px-4 py-2">Republic of Kazakhstan</td>
                      <td className="border border-gray-700 px-4 py-2">Bcrypt</td>
                      <td className="border border-gray-700 px-4 py-2">Duration + 1 year</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Request logs</td>
                      <td className="border border-gray-700 px-4 py-2">Republic of Kazakhstan</td>
                      <td className="border border-gray-700 px-4 py-2">TLS 1.3 in transit</td>
                      <td className="border border-gray-700 px-4 py-2">90 days</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Security databases</td>
                      <td className="border border-gray-700 px-4 py-2">Republic of Kazakhstan (mirrors in EU)</td>
                      <td className="border border-gray-700 px-4 py-2">Not required (public information)</td>
                      <td className="border border-gray-700 px-4 py-2">Permanently (product)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mb-3">5.2 Data Stored on User Infrastructure</h3>
              <p className="mb-4"><strong>Exclusively on your infrastructure:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>All source code</li>
                <li>Security scan results</li>
                <li>Commit history</li>
                <li>Repository metadata</li>
                <li>User information and access rights</li>
                <li>Downloaded vulnerability databases</li>
              </ul>
              <p className="mb-4"><strong>Responsibility:</strong> The User independently ensures the storage, backup, and security of this data.</p>

              <h3 className="text-xl font-semibold mb-3">5.3 Technical Security Measures</h3>
              <p className="mb-4">The Provider applies the following measures to protect data stored on our servers:</p>

              <h4 className="text-lg font-semibold mb-2">Encryption:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>At rest:</strong> AES-256 for databases with confidential information</li>
                <li><strong>In transit:</strong> TLS 1.3 (minimum TLS 1.2 not accepted)</li>
                <li><strong>Hashing:</strong> Bcrypt for license keys (irreversible transformation)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Access Control:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Multi-factor authentication for administrative access</li>
                <li>Principle of least privilege for employees</li>
                <li>Logging of all administrative actions</li>
                <li>Regular access rights audit</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Network Security:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Perimeter firewalls</li>
                <li>Intrusion detection systems (IDS/IPS)</li>
                <li>DDoS protection</li>
                <li>Regular vulnerability scanning</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Monitoring and Response:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>24/7 security monitoring</li>
                <li>Automatic alerts for suspicious activity</li>
                <li>Incident response plan</li>
                <li>Regular security drills</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">5.4 Security Audit</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Annual independent security audit by a third-party firm</li>
                <li>Regular penetration testing</li>
                <li>Publication of summary reports (without disclosing vulnerabilities)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">5.5 Incident Notification</h3>
              <p className="mb-4">In case of a security incident affecting your data:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>User Notification:</strong> within 72 hours of discovery</li>
                <li><strong>Regulator Notification (for users from the EU):</strong> within 72 hours (GDPR requirement)</li>
                <li><strong>Kazakhstan Regulator Notification:</strong> in accordance with personal data legislation</li>
              </ul>
            </section>

            <section id="data-transfer">
              <h2 className="text-2xl font-semibold mb-4">6. DATA TRANSFER AND DISCLOSURE</h2>

              <h3 className="text-xl font-semibold mb-3">6.1 Internal Use</h3>
              <p className="mb-4">Only Provider employees who need it to perform their duties have access to User data:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>System administrators (for infrastructure maintenance)</li>
                <li>Support service (for solving technical problems)</li>
                <li>Accounting (for payment processing)</li>
              </ul>
              <p className="mb-4">All employees sign confidentiality agreements.</p>

              <h3 className="text-xl font-semibold mb-3">6.2 Third-Party Data Processors</h3>
              <p className="mb-4">We use the following categories of third-party processors:</p>

              <h4 className="text-lg font-semibold mb-2">Payment Processors:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>For processing subscription payments</li>
                <li>PCI DSS compliant</li>
                <li>Examples: Stripe, PayPal, Kaspi.kz (for clients from Kazakhstan)</li>
                <li>Have their own privacy policies</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Hosting Providers:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>For hosting update servers</li>
                <li>Location: Republic of Kazakhstan (main servers), EU (mirrors for EU clients)</li>
                <li>Operate in accordance with Data Processing Agreements (DPA)</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Monitoring and Security Services:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>For ensuring infrastructure operability and security</li>
                <li>Access limited to technical metadata (logs, metrics)</li>
                <li>No access to subscription information</li>
              </ul>

              <p className="mb-4"><strong>Important:</strong> All third-party processors:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Sign Data Processing Agreements (DPA)</li>
                <li>Comply with the principle of access minimization</li>
                <li>Do not use data for their own purposes</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">6.3 Transfers to Law Enforcement</h3>
              <p className="mb-4">We may disclose information to law enforcement or regulatory authorities:</p>

              <h4 className="text-lg font-semibold mb-2">When Required:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>By court order</li>
                <li>By subpoena</li>
                <li>When there is a legal obligation under applicable law</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Procedure:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Verification of request legality by legal department</li>
                <li>Provision of only minimally necessary information</li>
                <li>User notification (unless prohibited by court order)</li>
                <li>Documentation of all requests for transparency report</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">What CANNOT Be Provided:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Source code (as we do not store it)</li>
                <li>Scan results (as they are stored locally by the User)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">6.5 What We NEVER Do</h3>
              <p className="mb-4">The Provider will <strong>never</strong>:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Sell User data to third parties</li>
                <li>Rent data for marketing purposes</li>
                <li>Monetize data beyond subscription payment</li>
                <li>Transfer data to data brokers</li>
                <li>Use data for targeted advertising</li>
              </ul>
            </section>

            <section id="international-transfers">
              <h2 className="text-2xl font-semibold mb-4">7. INTERNATIONAL DATA TRANSFERS</h2>

              <h3 className="text-xl font-semibold mb-3">7.1 Server Location</h3>
              <p className="mb-4"><strong>Main Servers:</strong> Republic of Kazakhstan</p>

              <h3 className="text-xl font-semibold mb-3">7.2 Transfers from EU to Kazakhstan (for users from the EU)</h3>
              <p className="mb-4"><strong>Legal Basis for Transfer:</strong> The Provider uses <strong>Standard Contractual Clauses (SCC)</strong> approved by European Commission Decision 2021/914.</p>

              <h4 className="text-lg font-semibold mb-2">Additional Safeguards:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Data encryption in transit (TLS 1.3)</li>
                <li>Data encryption at rest (AES-256)</li>
                <li>Limited data access</li>
                <li>Regular security audit</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">SCC Access:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Standard Contractual Clauses are available for review upon request</li>
                <li>Send request to: info@silenceai.net</li>
                <li>SCC are automatically included in the Data Processing Agreement (DPA) for corporate clients from the EU</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">7.3 What Is Transferred Internationally</h3>
              <p className="mb-4"><strong>When used from outside Kazakhstan, the following is transferred:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Subscription information (for license management)</li>
                <li>Requests to download security updates</li>
                <li>Security databases (downloaded to you)</li>
              </ul>

              <p className="mb-4"><strong>What Is NOT Transferred:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Source code (remains on your local infrastructure)</li>
                <li>Scan results (processed locally)</li>
                <li>Developer information (managed locally)</li>
              </ul>
            </section>

            <section id="data-subject-rights">
              <h2 className="text-2xl font-semibold mb-4">8. DATA SUBJECT RIGHTS</h2>

              <h3 className="text-xl font-semibold mb-3">8.1 Applicability of Rights</h3>
              <p className="mb-4">The rights described in this section apply:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>For all Users:</strong> basic rights in accordance with Kazakhstan legislation</li>
                <li><strong>For Users from the EU:</strong> extended rights in accordance with GDPR</li>
                <li><strong>For Users from other jurisdictions:</strong> rights in accordance with applicable legislation</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">8.2 Right of Access (GDPR, Article 15)</h3>
              <p className="mb-4">You have the right to obtain:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Confirmation of whether we process your personal data</li>
                <li>A copy of your personal data</li>
                <li>Information about processing purposes, data categories, recipients</li>
                <li>Data retention period</li>
                <li>Information about your rights</li>
              </ul>
              <p className="mb-4"><strong>How to Exercise:</strong> Send a request to info@silenceai.net. We will respond within 30 days (GDPR) or 15 days (Kazakhstan legislation). We will provide data in a structured, commonly used format (JSON or PDF).</p>

              <h3 className="text-xl font-semibold mb-3">8.3 Right to Rectification (GDPR, Article 16)</h3>
              <p className="mb-4">You have the right to correct inaccurate personal data: correction of contact information, update of organization name, correction of payment details.</p>

              <h3 className="text-xl font-semibold mb-3">8.4 Right to Erasure / "Right to be Forgotten" (GDPR, Article 17)</h3>
              <p className="mb-4">You have the right to request deletion of your personal data. Limitations: We cannot delete data if its storage is required by law (e.g., payment records—7 years) or necessary for contract performance (while subscription is active).</p>

              <h3 className="text-xl font-semibold mb-3">8.5 Right to Restriction of Processing (GDPR, Article 18)</h3>
              <p className="mb-4">You can request restriction of processing of your data while data accuracy is being verified, if processing is unlawful but you do not want deletion, or if data is needed by you for legal purposes.</p>

              <h3 className="text-xl font-semibold mb-3">8.6 Right to Data Portability (GDPR, Article 20)</h3>
              <p className="mb-4">You have the right to receive your data in a structured, machine-readable format (JSON, CSV, XML). Send a request to info@silenceai.net specifying preferred format.</p>

              <h3 className="text-xl font-semibold mb-3">8.7 Right to Object (GDPR, Article 21)</h3>
              <p className="mb-4">You have the right to object to processing based on legitimate interests. We will cease processing unless we can demonstrate overriding legitimate grounds.</p>

              <h3 className="text-xl font-semibold mb-3">8.8 Right to Withdraw Consent (GDPR, Article 7(3))</h3>
              <p className="mb-4">If processing is based on consent, you can withdraw consent at any time. In Sithub settings: disable "Send telemetry" option or send a request to info@silenceai.net.</p>

              <h3 className="text-xl font-semibold mb-3">8.9 Right to Lodge a Complaint with Supervisory Authority</h3>
              <p className="mb-4"><strong>For users from the EU:</strong> You have the right to lodge a complaint with the data protection supervisory authority of your country.</p>
              <p className="mb-4"><strong>For users from Kazakhstan:</strong> You can contact the authorized body for the protection of personal data subjects' rights of the Republic of Kazakhstan.</p>
            </section>

            <section id="cookies-tracking">
              <h2 className="text-2xl font-semibold mb-4">9. COOKIES AND TRACKING TECHNOLOGIES</h2>

              <h3 className="text-xl font-semibold mb-3">9.1 Cookie Usage</h3>
              <p className="mb-4">The Provider uses a minimum number of cookies:</p>

              <h4 className="text-lg font-semibold mb-2">Strictly Necessary Cookies (do not require consent):</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Session cookie for authentication in personal account</li>
                <li>Cookie for saving language preferences</li>
                <li>Security cookie (CSRF tokens)</li>
              </ul>
              <p className="mb-4">Validity period: until end of session or 30 days</p>

              <h4 className="text-lg font-semibold mb-2">Analytics Cookies (require consent):</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>If enabled: basic website usage analytics (not Sithub platform)</li>
                <li>We use our own solution (not Google Analytics)</li>
                <li>Data is anonymized</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">9.3 No Tracking</h3>
              <p className="mb-4">We <strong>DO NOT use:</strong></p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Social media trackers</li>
                <li>Advertising trackers</li>
                <li>Third-party trackers for profiling</li>
                <li>Cross-site tracking systems</li>
              </ul>
            </section>

            <section id="data-retention">
              <h2 className="text-2xl font-semibold mb-4">10. DATA RETENTION</h2>

              <h3 className="text-xl font-semibold mb-3">10.1 Retention Periods</h3>
              <div className="mb-4">
                <table className="w-full border-collapse border border-gray-700">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-700 px-4 py-2 text-left">Data Type</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Retention Period</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Subscription information</td>
                      <td className="border border-gray-700 px-4 py-2">Duration + 1 year</td>
                      <td className="border border-gray-700 px-4 py-2">Possible disputes, refunds</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Payment records</td>
                      <td className="border border-gray-700 px-4 py-2">7 years after transaction</td>
                      <td className="border border-gray-700 px-4 py-2">Tax legislation of Kazakhstan, EU</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">License key hashes</td>
                      <td className="border border-gray-700 px-4 py-2">Duration + 1 year</td>
                      <td className="border border-gray-700 px-4 py-2">Abuse prevention</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Update request logs</td>
                      <td className="border border-gray-700 px-4 py-2">90 days</td>
                      <td className="border border-gray-700 px-4 py-2">Technical support, security</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Technical telemetry</td>
                      <td className="border border-gray-700 px-4 py-2">1 year</td>
                      <td className="border border-gray-700 px-4 py-2">Service improvement</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">Error reports</td>
                      <td className="border border-gray-700 px-4 py-2">2 years</td>
                      <td className="border border-gray-700 px-4 py-2">Bug fixing</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mb-3">10.2 Deletion After Expiration</h3>
              <p className="mb-4">Upon expiration of the retention period:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Data is automatically marked for deletion</li>
                <li>Permanent deletion occurs within 30 days</li>
                <li>Backup copies are overwritten within 90 days</li>
                <li>Deletion logs are retained for audit</li>
              </ul>
            </section>

            <section id="childrens-privacy">
              <h2 className="text-2xl font-semibold mb-4">11. CHILDREN'S PRIVACY</h2>

              <h3 className="text-xl font-semibold mb-3">11.1 Age Restrictions</h3>
              <p className="mb-4">Sithub is not intended for use by persons under 18 years of age. This is a professional development tool and corporate software. We do not knowingly collect data from persons under 18.</p>

              <h3 className="text-xl font-semibold mb-3">11.2 Exception: Use with Parental Consent</h3>
              <p className="mb-4">Persons aged 16-18 may use Sithub with written parental or legal guardian consent.</p>
            </section>

            <section id="user-responsibilities">
              <h2 className="text-2xl font-semibold mb-4">12. YOUR DATA PROTECTION RESPONSIBILITIES</h2>

              <h3 className="text-xl font-semibold mb-3">12.1 User Responsibilities</h3>
              <p className="mb-4">The Provider ensures confidentiality at the architecture level. You are responsible for:</p>

              <h4 className="text-lg font-semibold mb-2">Infrastructure Security:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Proper firewall configuration</li>
                <li>Access control to servers where Sithub is deployed</li>
                <li>Regular operating system updates</li>
                <li>Physical equipment security</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">Prevention of Manual Data Transmission:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Do not manually upload code to external cloud services</li>
                <li>Do not copy repositories to publicly accessible services (GitHub, GitLab, etc.)</li>
                <li>Train developers in secure work principles</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">User Management:</h4>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Control who has access to Sithub</li>
                <li>Use strong passwords and multi-factor authentication</li>
                <li>Promptly revoke access for terminated employees</li>
                <li>Apply principle of least privilege</li>
              </ul>
            </section>

            <section id="transparency-report">
              <h2 className="text-2xl font-semibold mb-4">13. TRANSPARENCY REPORT</h2>

              <h3 className="text-xl font-semibold mb-3">13.1 Commitment to Transparency</h3>
              <p className="mb-4">The Provider is committed to transparency regarding law enforcement requests, security incidents, and changes in data processing practices.</p>

              <h3 className="text-xl font-semibold mb-3">13.2 Security Incident Notification</h3>
              <p className="mb-4">In case of a data security breach:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>User Notification:</strong> within 72 hours of discovery</li>
                <li><strong>Notification Content:</strong> Nature of incident, Affected data categories, Recommendations for Users</li>
                <li><strong>Notification Method:</strong> email + notification in Sithub interface</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">13.3 Disclosure of Law Enforcement Requests</h3>
              <p className="mb-4">The Provider will notify Users about law enforcement requests except when notification is prohibited by court order, with indication of request nature, and with provision of request copy (if permitted).</p>
            </section>

            <section id="dpa">
              <h2 className="text-2xl font-semibold mb-4">14. DATA PROCESSING AGREEMENT (DPA) FOR CORPORATE CLIENTS FROM THE EU</h2>

              <h3 className="text-xl font-semibold mb-3">14.1 DPA Applicability</h3>
              <p className="mb-4">For corporate clients from the European Union who use Sithub to process personal data of their employees, the Provider provides a Data Processing Agreement (DPA).</p>

              <h3 className="text-xl font-semibold mb-3">14.2 DPA Content</h3>
              <p className="mb-4">The DPA includes:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>EU Standard Contractual Clauses (SCC)</li>
                <li>Description of subject matter and duration of processing</li>
                <li>Nature and purposes of processing</li>
                <li>Types of personal data</li>
                <li>Categories of data subjects</li>
                <li>Obligations and rights of controller and processor</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">14.3 DPA Request</h3>
              <p className="mb-4">To request a DPA: Send a request to info@silenceai.net, specify your organization name and contact information. DPA will be provided within 5 business days.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">15. CHANGES TO THE PRIVACY POLICY</h2>

              <h3 className="text-xl font-semibold mb-3">15.1 Right to Change</h3>
              <p className="mb-4">The Provider reserves the right to change this Policy for changes in applicable legislation, development of Sithub functionality, improvement of User rights protection, or changes in data processing practices.</p>

              <h3 className="text-xl font-semibold mb-3">15.2 Change Notification</h3>
              <p className="mb-4">Material changes (affecting rights or changing processing practices) are notified via email 30 days before effective date, notification in Sithub interface, and publication on website with highlighted changes.</p>

              <h3 className="text-xl font-semibold mb-3">15.3 Consent to Changes</h3>
              <p className="mb-4">By continuing to use Sithub after changes take effect, you confirm agreement with the updated Policy. If you do not agree with the changes, you have the right to cease using Sithub with proportional refund upon cancellation within 14 days after notification of material changes.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">16. CONTACT INFORMATION</h2>
              <p className="mb-4">Questions about privacy? Questions about this policy? Questions about what data we store?</p>
              <p className="mb-4">Contact us:</p>
              <p className="mb-2"><strong>Email:</strong> info@silenceai.net</p>
              <p className="mb-4">This Privacy Policy is designed to ensure transparency of our data processing practices and protection of your rights. Sithub is built on the principle of data collection minimization: we collect only information necessary to provide services and never access your source code.</p>
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

export default SithubPrivacyPolicy;
