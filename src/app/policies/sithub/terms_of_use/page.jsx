"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
const SithubTermsOfUse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sections = [
    { id: 'general-provisions', title: '1. General Provisions' },
    { id: 'access-license', title: '2. Access and License' },
    { id: 'confidentiality', title: '3. Confidentiality and Data Processing' },
    { id: 'acceptable-use', title: '4. Acceptable Use' },
    { id: 'liability', title: '5. Limitation of Liability' },
    { id: 'termination', title: '6. Termination' },
    { id: 'ip-rights', title: '7. Intellectual Property' },
    { id: 'governing-law', title: '8. Governing Law and Disputes' },
    { id: 'contact', title: '9. Contact Information' },
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
          <h2 className="text-2xl text-gray-400 mb-8">Terms of Use</h2>

          <div className="space-y-8">
            <section id="general-provisions">
              <h2 className="text-2xl font-semibold mb-4">GENERAL PROVISIONS</h2>

              <h3 className="text-xl font-semibold mb-3">1. Subject Matter and Scope</h3>
              <p className="mb-4">These <strong>Terms of Use</strong> (hereinafter referred to as the <strong>Terms</strong>) govern the procedure for accessing and using the <strong>Sithub</strong> self-hosted development platform (hereinafter referred to as the <strong>Platform</strong>). The Terms constitute a public offer document and are supplemented by the Privacy Policy and technical documentation on security architecture.</p>

              <h3 className="text-xl font-semibold mb-3">2. Parties</h3>
              <p className="mb-4"><strong>Provider</strong> - Silence AI, a legal entity registered in the Republic of Kazakhstan.</p>
              <p className="mb-4"><strong>User</strong> - an individual or legal entity using the Platform.</p>

              <h3 className="text-xl font-semibold mb-3">3. Acceptance of Terms</h3>
              <p className="mb-4">Use, installation, or activation of a subscription constitutes full and unconditional acceptance of the Terms. If you do not agree with the Terms, you do not have the right to use the Platform.</p>
            </section>

            <section id="access-license">
              <h2 className="text-2xl font-semibold mb-4">ACCESS AND LICENSE</h2>

              <h3 className="text-xl font-semibold mb-3">1. License Granted</h3>
              <p className="mb-4">The Provider grants the User a limited, non-exclusive, non-transferable license to use Sithub within the framework of a paid subscription (monthly or annual). The license is valid only on the User's local infrastructure and does not grant the Provider any rights to the User's source code.</p>

              <h3 className="text-xl font-semibold mb-3">2. Usage Restrictions</h3>
              <p className="mb-4">The User undertakes to use Sithub in accordance with its intended purpose, not to violate the rights of third parties, and not to take actions aimed at extracting, transferring, or publishing source code and scan results beyond the local infrastructure.</p>

              <h3 className="text-xl font-semibold mb-3">3. License Verification</h3>
              <p className="mb-4">Sithub periodically verifies the validity of the license by sending to the Provider's servers the <strong>license key hash</strong>, temporary session token, Sithub version, and installation metadata. Verifications do not occur more than once every 24 hours.</p>
            </section>

            <section id="confidentiality">
              <h2 className="text-2xl font-semibold mb-4">CONFIDENTIALITY AND DATA PROCESSING</h2>

              <h3 className="text-xl font-semibold mb-3">1. Processing Principles</h3>
              <p className="mb-4">Sithub is designed according to the <strong>Privacy by Design</strong> principle: source code and scan results are processed and stored exclusively on the User's infrastructure. The Provider does not collect or store source code, scan results, repository metadata, or developer credentials.</p>

              <h3 className="text-xl font-semibold mb-3">2. Data Collected by the Provider</h3>
              <p className="mb-4">The Provider stores and processes only data necessary for subscription management and update delivery: <strong>subscription information</strong>, <strong>license key hash</strong>, <strong>request logs</strong>, and Sithub technical metadata (including IP address, timestamps, Sithub version). Payment data is processed by third-party payment providers; the Provider stores only the payment method type and the last four digits of the card.</p>

              <h3 className="text-xl font-semibold mb-3">3. User Responsibility for Infrastructure</h3>
              <p className="mb-4">The User is responsible for ensuring the security of local infrastructure where Sithub is deployed, including firewalls, access control, and physical equipment security.</p>
            </section>

            <section id="acceptable-use">
              <h2 className="text-2xl font-semibold mb-4">ACCEPTABLE USE</h2>

              <h3 className="text-xl font-semibold mb-3">Permitted Use</h3>
              <p className="mb-4">The User has the right to use Sithub for:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Software development</li>
                <li>Code analysis for security vulnerabilities</li>
                <li>Corporate repository management</li>
                <li>Training and educational purposes (within User's organization)</li>
                <li>Any lawful purposes related to software development</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Prohibited Use</h3>
              <p className="mb-4">The User does <strong>NOT</strong> have the right to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Reverse engineer proprietary Platform components</li>
                <li>Attempt to extract source code of proprietary components</li>
                <li>Bypass licensing or authentication mechanisms</li>
                <li>Distribute Sithub or its components to third parties without Provider's written consent</li>
                <li>Provide access to Sithub to persons without license</li>
                <li>Distribute vulnerability databases provided by Provider</li>
                <li>Create competing products based on Sithub</li>
                <li>Use Sithub for developing malware, exploits, or hacking tools</li>
                <li>Use Sithub for any illegal purposes in accordance with applicable law</li>
              </ul>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-semibold mb-4">LIMITATION OF LIABILITY</h2>

              <h3 className="text-xl font-semibold mb-3">"As Is" Provision</h3>
              <p className="mb-4">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW: Sithub is provided "AS IS" and "AS AVAILABLE", without any warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement of third-party rights, or accuracy, reliability, or completeness of functions.</p>

              <h3 className="text-xl font-semibold mb-3">Provider is NOT Responsible For</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Security breaches caused by incorrect configuration of User's infrastructure</li>
                <li>Data leaks resulting from actions of User's employees or contractors</li>
                <li>System compromise as a result of attacks on User's infrastructure</li>
                <li>Data loss due to lack of backup on User's side</li>
                <li>False positives or false negatives in security scanning</li>
                <li>Incompleteness of vulnerability databases</li>
                <li>Lost profits, loss of business reputation, or business interruption</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Maximum Liability</h3>
              <p className="mb-4">The Provider's maximum aggregate liability for all claims related to Sithub is limited to: <strong>The amount paid by User for subscription during the 12 months preceding the claim</strong></p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-semibold mb-4">TERMINATION</h2>

              <h3 className="text-xl font-semibold mb-3">Termination by User</h3>
              <p className="mb-4">The User can stop using Sithub at any time. After subscription termination, all downloaded Components remain on User's infrastructure and continue to function with the last received security database. The Platform stops receiving updates but continues to scan code locally.</p>

              <h3 className="text-xl font-semibold mb-3">Termination by Provider</h3>
              <p className="mb-4">The Provider may immediately terminate service provision in case of:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Violation of acceptable use conditions</li>
                <li>Bypass of licensing mechanisms</li>
                <li>Illegal use of Platform</li>
                <li>Distribution of Sithub or databases to third parties</li>
              </ul>
              <p className="mb-4">When a breach is identified, the User has <strong>14 days</strong> to remedy the breach. If breach is not remedied, subscription is terminated without refund and license key is deactivated.</p>
            </section>

            <section id="ip-rights">
              <h2 className="text-2xl font-semibold mb-4">INTELLECTUAL PROPERTY</h2>

              <h3 className="text-xl font-semibold mb-3">User's Rights to Their Code</h3>
              <p className="mb-4">The User retains full and exclusive rights to all source code created using Sithub, all derivative works and modifications, and all related copyrights, patents, and trade secrets. The Provider does not claim ownership of User's code, does not claim license to use the code, and <strong>NEVER uses User's code for AI model training or other purposes</strong>.</p>

              <h3 className="text-xl font-semibold mb-3">Provider's Rights to Platform</h3>
              <p className="mb-4">The Provider retains all rights to source code of all Platform Components, algorithms and methodologies implemented in Sithub, vulnerability databases and security updates, trademarks, logos, and corporate symbolism, and technical documentation and user guides.</p>

              <h3 className="text-xl font-semibold mb-3">Usage Restrictions</h3>
              <p className="mb-4">The User does NOT have the right to reverse engineer proprietary Platform components, distribute or resell Sithub to third parties, remove or modify copyright notices, create competing products based on Sithub, or distribute vulnerability databases provided by Provider. Exception: Network traffic analysis and security verification for audit purposes are permitted.</p>
            </section>

            <section id="governing-law">
              <h2 className="text-2xl font-semibold mb-4">GOVERNING LAW AND DISPUTES</h2>

              <h3 className="text-xl font-semibold mb-3">Applicable Law</h3>
              <p className="mb-4">These Terms are governed by and construed in accordance with the laws of the <strong>Republic of Kazakhstan</strong>, without regard to conflict of law provisions. The choice of Kazakhstan law does not override mandatory consumer protection provisions in User's jurisdiction, mandatory GDPR requirements for users from EU, or other mandatory provisions from which it is impossible to deviate by agreement.</p>

              <h3 className="text-xl font-semibold mb-3">Pre-litigation Settlement</h3>
              <p className="mb-4">Before applying to court or arbitration, Parties undertake to send written claim to the other Party, provide 30 days for response and settlement, and make good faith attempt to resolve dispute through negotiations.</p>

              <h3 className="text-xl font-semibold mb-3">Arbitration</h3>
              <p className="mb-4">If pre-litigation settlement does not lead to result, disputes are subject to resolution in arbitration in accordance with the Regulations of the International Arbitration Court at the National Chamber of Entrepreneurs of the Republic of Kazakhstan "Atameken". Place of arbitration: Astana (Nur-Sultan), Republic of Kazakhstan. Language of arbitration: Russian or English (by agreement of parties).</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">CONTACT INFORMATION</h2>
              <p className="mb-4">Questions about terms of use, about your subscription, about how the platform works?</p>
              <p className="mb-4">Contact us:</p>
              <p className="mb-2"><strong>Email:</strong> info@silenceai.net</p>
              <p className="mb-2"><strong>Postal address:</strong> Astana city, Almaty district, Ak-Bulak-3 residential area, Tasshoki lane, house 3, apartment 26</p>
              <p className="mb-4"><strong>Response time:</strong> up to 5 business days</p>
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

export default SithubTermsOfUse;
