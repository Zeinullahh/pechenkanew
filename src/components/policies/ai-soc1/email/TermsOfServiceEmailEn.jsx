"use client";

import React from "react";
import PolicyLayout from "@/components/policies/shared/PolicyLayout";
import EmailJurisdictionSelector from "@/components/policies/shared/EmailJurisdictionSelector";

const sections = [
  { id: "right-to-use", title: "1. Right to Use" },
  { id: "restrictions", title: "2. Restrictions on Use" },
  { id: "obligations", title: "3. Obligations, Warranties, and Disclaimers" },
  { id: "data-processing", title: "4. Data Processing and Privacy" },
  { id: "email-access", title: "4.5 Staff Access to Client Emails" },
  { id: "ip-rights", title: "5. Intellectual Property Rights" },
  { id: "subscription-fees", title: "6. Subscription Fees" },
  { id: "sla", title: "6.7 Service Level Agreement (SLA)" },
  { id: "confidentiality", title: "7. Confidentiality" },
  { id: "indemnity", title: "8. Indemnity" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "term-termination", title: "10. Term and Termination" },
  { id: "general", title: "11. General" },
  { id: "dpa", title: "12. Data Processing Addendum (DPA)" },
];

export default function TermsOfServiceEmailEn() {
  return (
    <PolicyLayout
      title="AI-CSD 1 Email Policy"
      subtitle="Terms of Service"
      sections={sections}
    >
      <EmailJurisdictionSelector policy="terms_of_service" active="ae" locale="en" />
      <section id="right-to-use">
        <h2 className="text-2xl font-semibold mb-4">1. Right to Use</h2>
        <p className="mb-4">
          <strong>1.1 Agreement Scope:</strong> These Terms of Service (&quot;Terms&quot;) govern your access to and use of the AI-CSD 1 Email Security &amp; Visualization component provided under the applicable regional agreement by Silence AI LLC, for UAE customers, or ТОО &quot;Silence AI&quot;, for Kazakhstan customers (the applicable company, &quot;Silence AI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms apply to you, the individual or entity accessing our services (&quot;you&quot; or &quot;your&quot;), and your employer or principal if you are acting on their behalf. The contracting company is the company identified in the order, account registration, or other agreement with you.
        </p>
        <p className="mb-4"><strong>Contracting company details:</strong> UAE: Silence AI LLC, licence number 2539365.01, registered address: Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. Kazakhstan: ТОО &quot;Silence AI&quot;, BIN 250840004804, registered address: КАЗАХСТАН, АСТАНА обл, АСТАНА г, АЛМАТЫ мкр, Проспект Ракымжан Кошкарбаев, 10/1, G-3 блок; D6 этаж.</p>
        <p className="mb-4">
          <strong>1.2 Service Domain and Jurisdiction:</strong> The covered Email Security service is available in two modes: a provider-connected mode, in which Microsoft 365/Outlook or Gmail remains the mailbox provider, and a hosted mode, in which the platform hosts customer-domain mailboxes. In both modes employees read, compose, send, and manage mail in our email workspace. For customers contracting with ТОО &quot;Silence AI&quot; in Kazakhstan, the Centralized Management Console (CMC) is at <strong>kz.mail.csd.silenceai.net</strong> and the employee workspace is at <strong>kz.mail.silenceai.net</strong>. For customers contracting with Silence AI LLC in the UAE, the CMC is at <strong>mail.csd.silenceai.net</strong> and the employee workspace is at <strong>mail.silenceai.net</strong>. The CMC is the administrator panel for company configuration, domains, accounts, and security settings. These Terms apply to this Email Security service through the applicable domain pair; the contracting company and access domains do not determine physical server location. Other Silence AI products are governed separately.
        </p>
        <p className="mb-4">
          <strong>1.3 Grant of Rights:</strong> Subject to the selected paid plan and Section 11.9, we grant you a non-exclusive, non-transferable right to permit your authorized users to access the Email Security Services and Documentation during the paid subscription period for your business purposes. Access ends as described in Section 10. You may continue to use Service Data already supplied to you, subject to applicable law and the DPA.
        </p>
      </section>

      <section id="restrictions">
        <h2 className="text-2xl font-semibold mb-4">2. Restrictions on Use</h2>
        <p className="mb-4">You shall not:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>use the Services in connection with any systems, data, or assets that are not owned by you or your Affiliates, or that you do not have a right to access or use;</li>
          <li>
            upload or input to the Services:
            <ul className="list-circle pl-6 mt-1 space-y-1">
              <li>any Virus; or,</li>
              <li>any material that is illegal or infringes any third-party Intellectual Property Right;</li>
            </ul>
          </li>
          <li>upload to the Services, or otherwise make accessible to us, any sensitive data or regulated data (except pursuant to the DPA with respect to non-sensitive Personal Data), such as health or financial information;</li>
          <li>license, sell, rent, lease, distribute, display, commercially exploit, or otherwise make the Services available to any third party;</li>
          <li>copy, modify, duplicate, create derivative works from, frame, mirror, republish, download, display, transmit, or distribute all or any portion of the Services;</li>
          <li>reverse compile, disassemble, reverse engineer, or otherwise reduce to human-perceivable form, all or any part of the Services;</li>
          <li>circumvent or disable any security or other technological features of the Services;</li>
          <li>perform any actions that would interfere with the proper working of the Services or prevent access to or use of the Services by our other customers;</li>
          <li>use the Services to perform any benchmarking activities on the Applications or any third-party applications;</li>
          <li>use the Services to provide business process outsourcing services to third parties;</li>
          <li>remove any proprietary notices or labels from the Services;</li>
          <li>use the Services and/or Documentation other than in accordance with this Agreement;</li>
          <li>
            use or input any data into the Services in breach of:
            <ul className="list-circle pl-6 mt-1 space-y-1">
              <li>applicable law; or,</li>
              <li>license terms or other contractual obligations owing to a third party;</li>
            </ul>
          </li>
          <li>access or use the Services if you are a competitor, or to develop or sell a competing product or service, or for purposes that are competitive with us; or,</li>
          <li>access or use the Services from any country or region subject to a comprehensive U.S. embargo.</li>
        </ul>
        <p>A breach of any of the foregoing restrictions is deemed to be a material breach of this Agreement.</p>
      </section>

      <section id="obligations">
        <h2 className="text-2xl font-semibold mb-4">3. Obligations, Warranties, and Disclaimers</h2>
        <p className="mb-4">
          <strong>3.1 General:</strong> We shall, subject to the terms of this Agreement: (a) grant you access to the Services; and (b) provide support solely by email to info@silenceai.net on a best-efforts basis. Support is provided only via the email address specified above; we do not provide support through any Service Plan portal or other ticketing system.
        </p>
        <p className="mb-4">
          <strong>3.2 Performance Warranty:</strong> We will make commercially reasonable efforts to provide the Services substantially as described in the Documentation and to provide email support at info@silenceai.net with reasonable skill and care. If we fail to correct a material non-conformity after reasonable notice and opportunity to cure, the customer may end the affected paid service and receive a refund of prepaid fees for that service not delivered after termination. This remedy is separate from the platform-Downtime refund in Section 6.7 and does not change the customer&apos;s ability to cancel future renewal under Section 10.1.
        </p>
        <p className="mb-4">
          <strong>3.3 Disclaimers:</strong> You acknowledge and agree that: (a) the Performance Warranty does not apply to the extent of any non-conformance which is caused by use of the Services by you that is not in accordance with the Documentation; (b) the Services will evolve over time and that functionality may be added and removed from time to time in our sole discretion; and (c) your use of the Services may not be uninterrupted or error-free. We specifically do not represent or warrant that: (a) the Services will meet your requirements or will be fit for your particular purpose; (b) the Services will be able to achieve all intended outcomes or deliver all expected results; or (c) we will be able to provide solutions for all issues you may encounter. We will not be liable to you for any false positive or false negative results incorrectly identified by the Services or for any damage or loss arising from your reliance on Service outputs.
        </p>
        <p className="mb-4">
          <strong>3.3.3 Payment Gateway Changes:</strong> Silence AI may change the payment gateway provider. Silence AI will send the initial notice of a planned change to every affected customer by email to the address the customer uses to sign in to Silence AI Email Security no later than three calendar months before the planned change date. If the customer provides no response within seven calendar days after that email is sent, Silence AI may additionally display a notice to the customer organization&apos;s administrators in the Email Security administrative panel. This panel notice supplements and does not replace the initial email. A lack of response or a panel notice does not shorten, restart, or otherwise change the three-calendar-month advance notice period.
        </p>
        <p className="mb-4">
          <strong>3.4 Customer Obligations:</strong> You are solely responsible for: (a) maintaining the confidentiality of your account credentials and for any breach of this Agreement by any person accessing and using the Services using your account credentials; (b) managing access rights for your Users (where applicable) and removing such access rights from Users who should no longer have access to the Services; (c) any Users&apos; access and use of the Services not in accordance with this Agreement; (d) ensuring that your network, environment and systems comply with the relevant specifications set out in the Documentation and are secure; (e) ensuring the legality, integrity, and accuracy of Customer Data provided to us; (f) assessing each Service output based on your own circumstances, environment, and requirements; (g) setting your own controls, configurations, or permissions within the Services; and (h) where you subscribe to the Services for an Evaluation: (i) the consequences of your use of (or inability to use) the Services, and for any liability of any kind whatsoever arising out of or in relation to your use of (or inability to use) the Services; and (ii) taking appropriate measures to back up and make any required copies of Customer Data and to comply with Section 10 (Termination), and we shall not be obliged to provide to you any assistance in extracting, transferring or recovering any data whether during or after the Evaluation Period. You also agree to comply with all laws, rules, and regulations applicable to your business and performance under this Agreement.
        </p>
        <p className="mb-4">
          <strong>3.5 Third Party Features:</strong> The Services may contain features designed to interoperate with applications or services separately provided to you by third parties. Any operation or transaction completed via any third-party website, system, platform, or application is between you and the relevant third party, and is at your own risk. We cannot guarantee the continued availability of such features; accordingly, we may cease providing interoperability with them at any time, including if the relevant third-party ceases to make its application or service available for interoperation with the Services or changes the way it does so in a way that is not reasonably acceptable to us.
        </p>
        <p className="mb-4">
          <strong>3.6 Beta Services:</strong> From time to time, we may make Beta Services available to you at no charge. Beta Services are made available &quot;AS IS&quot;; we make no representations or warranties of any kind, whether express, implied, statutory, or otherwise regarding Beta Services, and we shall have no liability of any kind arising out of or in connection with Beta Services. You may choose to try such Beta Services in your sole discretion. We may discontinue Beta Services at any time in our sole discretion and may never make them generally available.
        </p>
        <p>
          <strong>3.7 Consulting Services:</strong> You may opt to purchase consulting services to be provided on a time and materials basis as mutually agreed upon in a statement of work signed by both parties (&quot;Consulting Services&quot;). The statement of work will describe the scope of the Consulting Services as well as the fees to be paid. The statement of work may include terms that amend or supplement the terms in this Agreement as those terms specifically apply to our delivery of the Consulting Services.
        </p>
      </section>

      <section id="data-processing">
        <h2 className="text-2xl font-semibold mb-4">4. Data Processing and Privacy</h2>
        <p className="mb-4"><strong>4.1 Privacy Policy:</strong> The <a href="https://www.silenceai.net/en/policies/ai-csd/email/privacy/">Email Security Privacy Policy</a> forms part of this Agreement by reference and applies to our relevant personal-data processing. The DPA in Section 12 prevails for conflicts concerning customer data processed on the client organization&apos;s behalf.</p>
        <p className="mb-4">
          <strong>4.2 Data Processing Addendum:</strong> The Data Processing Addendum set out below (Section 12 — &quot;Data Processing Addendum&quot;) is incorporated into these Terms and governs the processing of Personal Data that the applicable Silence AI contracting company processes on behalf of the Customer in connection with the Email Security &amp; Visualization Services (including Email Protector). By accepting these Terms, Customer accepts the DPA.
        </p>
        <p className="mb-4">
          <strong>4.3 Information Security:</strong> We will employ security measures designed to protect Customer Data in accordance with industry standards and our Information Security practices.
        </p>
        <p className="mb-4">
          <strong>4.4 Usage Data:</strong> We may (i) collect, analyze and otherwise process Usage Data internally for our business purposes, including for the purposes of security and analytics, to improve and enhance the Services, or for other development, diagnostic and corrective purposes in connection with the Services or other products or services, and (ii) publicly disclose Usage Data only in an aggregated and/or de-identified form in connection with our business in a manner that does not identify you or any of your Users.
        </p>
        <p className="mb-4">
          <strong>4.5 Cookies:</strong> Our use of cookies and similar technologies is governed by our Cookie Policy, available at{" "}
          <a
            href="/en/policies/cookies/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /en/policies/cookies/
          </a>
          .
        </p>
      </section>

      <section id="email-access">
        <h2 className="text-2xl font-semibold mb-4">4.5 Restriction on Personnel Access to Client Email Data</h2>
        <p>Personnel of Silence AI LLC and ТОО &quot;Silence AI&quot;, including employees and contractors, must not access client organization email content, attachments or metadata without prior explicit permission by email from an authorized representative of that organization. The email must specify the purpose and scope; access is limited to that scope, logged and ended when the authorized purpose is complete. Separately, access or disclosure compelled by a binding lawful demand is limited to what the law requires, with notice to the client organization where legally permitted. Automated processing for the service and enabled features is governed by the DPA and Privacy Policy.</p>
      </section>

      <section id="ip-rights">
        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property Rights</h2>
        <p className="mb-4">
          <strong>5.1 Our Intellectual Property Rights:</strong> As between the parties, all right, title, and interest in and to the Services, Documentation, and Usage Data, including all Intellectual Property Rights therein, are and will remain, with us and/or our licensors. You have no right, license, or authorization with respect to any of the Services except as expressly set out in this Agreement.
        </p>
        <p className="mb-4">
          <strong>5.2 Your Intellectual Property Rights:</strong> As between the parties, you are and will remain the sole and exclusive owner of all right, title, and interest in and to all Customer Data, including all Intellectual Property Rights relating thereto, subject to the rights and permissions granted in Section 5.3 (Grant of Rights).
        </p>
        <p>
          <strong>5.3 Grant of Rights:</strong> You hereby grant all such rights and permissions in or relating to Customer Data as are necessary to enable us to perform the Services and otherwise exercise our rights and obligations hereunder. All written or oral comments, ideas and suggestions made by you (or your Users) regarding the Services, Support, or Beta Services (including regarding product experience, functionality, performance, accuracy, consistency, and ease of use of the same) (&quot;Feedback&quot;) may be freely utilized by us without attribution or compensation of any kind to you. You hereby irrevocably transfer and assign to us all Intellectual Property Rights embodied in, or arising in connection with, such Feedback.
        </p>
      </section>

      <section id="subscription-fees">
        <h2 className="text-2xl font-semibold mb-4">6. Subscription Fees</h2>
        <p className="mb-4"><strong>6.1 Subscription Fees:</strong> Administrator account registration starts this Agreement but does not start paid charges. The customer selects a monthly or annual Email Security plan and pays or funds the full applicable subscription. Paid access and its period begin only when payment is confirmed. Fees depend on the selected plan and authorized users, not actual message volume, Credits or consumption. The customer must keep its user allocation within its selected plan and pay for any higher plan under Section 6.2 before using it. Plan rates, user ranges and allowances are in Section 2.3 of the <a href="https://www.silenceai.net/en/policies/ai-csd/email/terms_of_use/">Email Security Terms of Use</a>. The annual per-user monthly rate is a displayed equivalent; the full 12-month amount is charged upfront and at renewal. A monthly plan is charged for each consecutive 30-calendar-day paid period. The applicable checkout, Service Plan or invoice states the USD or KZT amount. A separately agreed Order Form controls its invoicing and payment terms.</p>
        <p className="mb-4"><strong>6.2 Change of Plan:</strong> The customer may select another monthly or annual plan in the system. The full price of the new plan is charged immediately. Only after successful full payment does the old plan end and the new plan become active; a new paid period begins then, with the next renewal 30 calendar days later for the monthly variant, or on the corresponding calendar day one year later for the annual variant (the last day of that month if the date does not exist). The unused part of the old period is neither refunded nor credited to the new plan or an internal balance. If payment fails, the change does not complete and the old paid plan continues. Cancelling future renewal is governed separately by Section 10.1.</p>
        <p className="mb-4"><strong>6.3 Billing and Activation:</strong> A monthly subscription is paid in advance for each 30-calendar-day paid period; an annual subscription is paid in advance for each full 12-month period. Registration alone does not trigger billing. Paid access begins when payment for the selected plan is confirmed. Unless the customer cancels renewal in the system, the monthly period renews every 30 calendar days or the annual period on its yearly anniversary, subject to the price communicated under Section 11.6. An Order Form may state its own invoicing and payment method but does not create a consumption-based Email Security price. If it omits billing frequency and payment terms, invoicing is annual and payment is due 30 days after invoice; paid access still begins only after payment confirmation. For UAE agreements, online purchases are handled by Paddle.com as merchant of record; for Kazakhstan agreements, payments are handled by ТОО &quot;ФинCeрвисы&quot;. The checkout or invoice identifies the applicable payment recipient and USD or KZT amount. The customer can cancel future renewal in the system without deleting the account or notifying Silence AI.</p>
        <p className="mb-4"><strong>6.4 Late Payments:</strong> If an amount due under an invoice remains unpaid, we may give notice of default and suspend paid access if payment is not received within 10 Business Days after that notice. A failed payment for a requested plan change leaves the existing paid plan in place under Section 6.2. Expiry or suspension of paid access does not itself delete the account.</p>
        <p className="mb-4"><strong>6.5 Subscription Fees and Taxes:</strong> Subscription Fees are payable in USD or KZT as stated in the applicable checkout, Service Plan or Order Form and are exclusive of applicable taxes. Paid fees are generally non-refundable for voluntary cancellation or account deletion, subject to the monetary SLA refund in Section 6.7, the express remedy in Section 3.2 and non-excludable legal rights. Unused time on a prior plan is not refunded or credited after a successfully paid plan change. Applicable taxes and legally required withholding remain payable as stated in the invoice or Order Form.</p>
        <p><strong>6.6 Renewal Pricing:</strong> A changed renewal price applies only after notice under Section 11.6 and is shown before the next charge. The customer may cancel future renewal in the system before that charge, without deleting the account. Unless the Service Plan or Order Form states otherwise, an annual renewal price increase will not exceed 10% over the prior annual rate for the affected services. Any separate written price commitment in an Order Form continues for its stated period.</p>
      </section>

      <section id="sla">
        <h2 className="text-2xl font-semibold mb-4">6.7 Service Level Agreement (SLA)</h2>
        <p className="mb-4"><strong>6.7.1 Platform Downtime:</strong> For an active paid subscription, Downtime means at least one continuous confirmed minute when the entire Email Security platform is unavailable to the customer because of Silence AI infrastructure, such as a service domain returning a server-unavailable error while the customer cannot use the system. Maintenance notified in advance, force majeure under Section 11.2, the customer&apos;s acts, network or equipment, third-party integrations, and suspension permitted by this Agreement are excluded. Delay in accepting or delivering an individual message, including at a receiving server or another mail provider, is not platform Downtime.</p>
        <p className="mb-4"><strong>6.7.2 Refund for the Affected Period:</strong> Upon a timely customer request and confirmation of Downtime, Silence AI refunds the applicable subscription fee for the affected services, even if Downtime lasted only one minute. For a monthly plan, the refund is the full fee paid for the 30-calendar-day paid period in which Downtime occurred. No more than one refund is available for that paid period, even if it crosses a calendar-month boundary or includes multiple incidents. For an annual plan, the refund is one twelfth of the paid annual fee for each calendar month of the annual paid period in which Downtime occurred, with no more than one refund per affected calendar month. No refund is calculated by minute or message.</p>
        <p className="mb-4"><strong>6.7.3 Example and Scope:</strong> If the affected monthly subscription costs USD $100 for a paid 30-calendar-day period, one confirmed minute of platform Downtime during that period results in a USD $100 refund on request. If the affected annual subscription costs USD $1,200, one confirmed minute in a calendar month results in a USD $100 refund on request for that month. This refund concerns subscription fees for platform availability and does not compensate consequential losses.</p>
        <p className="mb-4"><strong>6.7.4 Claim and Verification:</strong> The customer must email info@silenceai.net within 30 calendar days after the relevant Downtime incident, giving the incident date and time, the observed unavailability and reasonably available evidence. Silence AI reviews the request in good faith against platform monitoring and customer evidence and responds within 30 calendar days after receiving a complete request. The refund is not automatic; a disputed finding may be reconsidered on additional evidence.</p>
        <p className="mb-4"><strong>6.7.5 Payment of Refund:</strong> An approved refund is paid in money to the original payment method where practicable, or by another agreed payment method if the original route is unavailable. It is not a credit against a future invoice or internal balance and remains payable after subscription cancellation or account deletion.</p>
        <p><strong>6.7.6 Relationship to Other Terms:</strong> This Section 6.7 is an express exception to the general non-refundable rule in Section 6.5 and to any conflicting limitation in Section 9. The monetary refund is the sole contractual remedy for failure to meet the platform availability commitment, without limiting other remedies expressly required by applicable law.</p>
      </section>

      <section id="confidentiality">
        <h2 className="text-2xl font-semibold mb-4">7. Confidentiality</h2>
        <p className="mb-4">
          <strong>7.1 Mutual Confidentiality:</strong> Each party (&quot;Recipient&quot;) will be given access to Confidential Information from the other party (&quot;Discloser&quot;) to perform its obligations under this Agreement. A party&apos;s Confidential Information shall not be deemed to include information that: (a) is or becomes publicly known other than through any act or omission of the Recipient; (b) was in the Recipient&apos;s lawful possession before the disclosure; (c) is lawfully disclosed to the Recipient by a third party without restriction on disclosure; or, (d) is independently developed by the Recipient without reference to, or reliance on, the Confidential Information of the Discloser, which independent development can be shown by written evidence. Your Confidential Information includes Customer Data. Our Confidential Information includes the Services, Service Data, product roadmaps, pricing, and the results of any performance tests of the Services. The terms of this Agreement are confidential to both parties.
        </p>
        <p className="mb-4">
          <strong>7.2 Legal Disclosure:</strong> Each Recipient may disclose Confidential Information to the extent necessary to comply with applicable law or a court order, provided that prior to any such disclosure, the Recipient will, to the extent legally permissible, provide to the Discloser notice of such request and use reasonable efforts to ensure that all Confidential Information so disclosed is treated confidentially.
        </p>
        <p className="mb-4">
          <strong>7.3 Confidentiality Obligations:</strong> Each Recipient will hold the Discloser&apos;s Confidential Information in confidence and, unless required by law and disclosed pursuant to Section 7.2, not make the Discloser&apos;s Confidential Information available to any third party or use the Discloser&apos;s Confidential Information for any purpose other than as set out in this Agreement. The foregoing will not apply with respect to any Confidential Information three (3) years after the termination or expiration of this Agreement (or, with respect to trade secrets, once such Confidential Information no longer constitutes a trade secret under applicable law).
        </p>
        <p>
          <strong>7.4 Personnel Disclosure:</strong> Notwithstanding any provision of this Agreement, Recipient may disclose Discloser&apos;s Confidential Information, in whole or in part, to its employees, officers, directors, consultants and professional advisors who have a need to know and are legally bound to keep such Confidential Information confidential by confidentiality obligations, or, in the case of professional advisors, are bound by ethical duties, to keep such Confidential Information confidential consistent with the terms of this Agreement. Recipient is responsible and liable for its personnel&apos;s compliance with this Section 7, as if their actions or inactions were an action or inaction of Recipient.
        </p>
      </section>

      <section id="indemnity">
        <h2 className="text-2xl font-semibold mb-4">8. Indemnity</h2>
        <p className="mb-4">
          <strong>8.1 Your Indemnity:</strong> You shall defend, indemnify, and hold harmless Silence AI, its Affiliates, and each of their respective officers, directors, employees, consultants, agents, successors, and assigns from and against all losses, liabilities, damages, costs, and expenses (including reasonable attorneys&apos; fees) incurred in connection with any third-party claim, demand, or action arising out of or related to: (a) your fraud, gross negligence, or willful misconduct; or (b) your breach of Section 2 (Restrictions on Use); or (c) Customer Data, Customer&apos;s use of the Services, or Customer&apos;s violation of applicable law.
        </p>
        <p className="mb-4">
          <strong>8.2 No Indemnity by Silence AI:</strong> To the maximum extent permitted by applicable law, Silence AI, its Affiliates, and their respective employees, agents, and subcontractors shall have no obligation to indemnify, defend, or hold you harmless from any third-party claims, including but not limited to claims alleging infringement, misappropriation, or other violation of intellectual property rights. You acknowledge and agree that you are solely responsible for your own legal compliance and any third-party claims arising from your use of the Services.
        </p>
        <p className="mb-4">
          <strong>8.3 Claims Process:</strong> If either party becomes aware of a claim or legal action related to this Agreement, that party will notify the other party promptly. Silence AI has no obligation to assume control of, participate in, or fund the defense of any claim brought against you. The party seeking indemnification shall cooperate with the other party at the indemnitor&apos;s expense to the extent reasonably requested.
        </p>
        <p className="mb-4">
          <strong>8.4 Service Changes:</strong> If any portion of the Services is, or in Silence AI&apos;s opinion is likely to be, claimed to infringe or otherwise violate a third-party right, Silence AI may, at its sole discretion and without obligation: (a) make commercially reasonable changes to the Services to avoid infringement; or (b) terminate the Agreement upon written notice and refund any prepaid fees for Services not yet provided. Silence AI shall have no further liability or obligation in connection with such claims.
        </p>
        <p className="mb-4">
          <strong>8.5 Disclaimer of Responsibility:</strong> Without limiting the foregoing, Silence AI shall have no responsibility or liability for claims arising from: (a) your modification of the Services; (b) your breach of this Agreement; (c) your use of the Services in combination with any third-party product or service not provided or recommended by Silence AI; (d) your use of the Services after receiving notice of alleged infringement; or (e) any Customer Data.
        </p>
        <p>
          <strong>8.6 No Exclusive Remedies / Additional Limitations:</strong> You acknowledge and agree that the limitations set forth in this Section 8 are in addition to, and not in lieu of, any other disclaimers or limitations of liability set forth elsewhere in this Agreement. In no event will Silence AI be liable for any damages, costs, or expenses arising from third-party claims relating to the Services, except to the extent liability cannot be excluded by applicable law.
        </p>
      </section>

      <section id="liability">
        <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
        <p className="mb-4">
          <strong>9.1 Exclusions from Liability:</strong> EXCEPT AS EXPRESSLY PROVIDED IN THIS AGREEMENT: (A) WE SHALL HAVE NO LIABILITY FOR ANY LOSS OR DAMAGE CAUSED BY ERRORS OR OMISSIONS IN ANY INFORMATION, INSTRUCTIONS OR SCRIPTS PROVIDED TO US BY YOU IN CONNECTION WITH THE SERVICES, OR ANY ACTIONS TAKEN BY US AT YOUR DIRECTION; (B) ALL WARRANTIES, REPRESENTATIONS, CONDITIONS AND ALL OTHER TERMS OF ANY KIND WHATSOEVER, EXPRESS OR IMPLIED BY STATUTE OR COMMON LAW ARE, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, EXCLUDED FROM THIS AGREEMENT; AND, (C) THE SERVICES ARE PROVIDED TO YOU ON AN &quot;AS IS&quot; BASIS.
        </p>
        <p className="mb-4">
          <strong>9.2 Exclusion of Damages:</strong> TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL EITHER PARTY BE LIABLE UNDER THIS AGREEMENT UNDER ANY LEGAL OR EQUITABLE THEORY, INCLUDING BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, AND OTHERWISE, FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL, ENHANCED, OR PUNITIVE DAMAGES REGARDLESS OF WHETHER SUCH DAMAGE WAS FORESEEABLE AND WHETHER EITHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p className="mb-4">
          <strong>9.3 Limitation on Monetary Liability:</strong> EXCEPT AS OTHERWISE PROVIDED IN SECTION 9.4, IN NO EVENT WILL THE AGGREGATE LIABILITY OF EITHER PARTY ARISING OUT OF OR RELATED TO THIS AGREEMENT, WHETHER ARISING UNDER OR RELATED TO BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL OR EQUITABLE THEORY, EXCEED THE GREATER OF: (A) $100 USD; OR (B) THE TOTAL SUBSCRIPTION FEES PAID OR PAYABLE BY YOU UNDER THIS AGREEMENT FOR THE 12 MONTH PERIOD PRECEDING THE EVENT GIVING RISE TO THE CLAIM. THE FOREGOING LIMITATIONS APPLY EVEN IF ANY REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
        </p>
        <p>
          <strong>9.4 Exceptions:</strong> THE LIMITATION ON MONETARY LIABILITY SET FORTH ABOVE SHALL NOT APPLY TO: (A) A PARTY&apos;S INDEMNIFICATION OBLIGATIONS UNDER SECTION 8; (B) LOSSES FOR DEATH OR BODILY INJURY; OR (C) LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED BY APPLICABLE LAW. EACH PROVISION OF THIS AGREEMENT THAT PROVIDES FOR A LIMITATION OF LIABILITY, DISCLAIMER OF WARRANTIES, OR EXCLUSION OF DAMAGES IS TO ALLOCATE THE RISKS OF THIS AGREEMENT BETWEEN THE PARTIES. THIS ALLOCATION IS REFLECTED IN THE PRICING OFFERED BY US TO YOU AND IS AN ESSENTIAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN THE PARTIES. THE LIMITATIONS IN THIS SECTION 9 (LIMITATION OF LIABILITY) WILL APPLY NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED REMEDY IN THIS AGREEMENT.
        </p>
      </section>

      <section id="term-termination">
        <h2 className="text-2xl font-semibold mb-4">10. Term and Termination</h2>
        <p className="mb-4"><strong>10.1 Agreement and Subscription Term:</strong> This Agreement begins when the customer administrator registers or creates the account. It ends when the customer deletes that account in the system or Silence AI closes or disables the account because of a breach of the rules or abuse of the Service. A paid monthly or annual subscription is a separate period beginning on payment confirmation. The customer may cancel future renewal in the system at any time without a letter, notice to Silence AI or a 30-day waiting period. Cancellation stops future renewals and charges; paid access continues to the end of the already paid period, then ends. The account and Agreement continue unless the account is separately deleted or closed.</p>
        <p className="mb-4"><strong>10.2 Suspension and Closure:</strong> The customer may delete its account in the system at any time, which ends the Agreement and access immediately. Silence AI may suspend paid access or close or disable an account for breach of this Agreement, prohibited conduct or abuse of the Service, with notice where practicable. Non-payment may lead to suspension under Section 6.4. Suspension or expiry of paid access alone does not require account deletion. No customer letter, separate termination request, uninstall action or proof of uninstall is required to stop access.</p>
        <p><strong>10.3 Financial and Data Effects:</strong> Voluntary deletion of an account before the end of an already paid monthly or annual subscription does not return the unused part to the customer&apos;s bank account; deletion after three months of an annual plan, for example, does not refund the remaining nine months. This rule does not limit an approved platform-Downtime refund under Section 6.7, the express remedy in Section 3.2 or mandatory legal rights. On account closure, access ends and customer-data return or deletion follows Section 12.7 of the DPA. Accrued rights and obligations survive as applicable.</p>
      </section>

      <section id="general">
        <h2 className="text-2xl font-semibold mb-4">11. General</h2>
        <p className="mb-4">
          <strong>11.1 Interpretation:</strong> Headings are for reference only and do not affect the interpretation of this Agreement. Capitalized terms have the meanings indicated in this Agreement unless the context otherwise requires, which meaning will be equally applicable to both the singular and plural forms of such terms. The words &quot;include,&quot; &quot;includes,&quot; and &quot;including&quot; are deemed to be followed by the words &quot;without limitation&quot;.
        </p>
        <p className="mb-4">
          <strong>11.2 Force Majeure:</strong> We shall have no liability to you under this Agreement if we are prevented from or delayed in performing our obligations under this Agreement, or from carrying on our business, by acts, events, omissions or accidents beyond our reasonable control, including, without limitation, strikes, lock-outs or other industrial disputes (whether involving our workforce or any other party), epidemic, pandemic, failure of a utility service or transport or telecommunications network, act of God, war, riot, civil commotion, malicious damage, compliance with any law or governmental order, rule, regulation or direction, accident, breakdown of plant or machinery, fire, flood, storm or default of suppliers or sub-contractors, provided that you are notified of such an event and its expected duration.
        </p>
        <p className="mb-4">
          <strong>11.3 Survival:</strong> Any provision of this Agreement that expressly or by implication is intended to come into or continue in force on or after termination or expiry of this Agreement shall remain in full force and effect.
        </p>
        <p className="mb-4">
          <strong>11.4 Severance:</strong> If any provision (or part of a provision) of this Agreement is found by any court or administrative body of competent jurisdiction to be invalid, unenforceable, or illegal, the other provisions shall remain in force. If any invalid, unenforceable or illegal provision would be valid, enforceable, or legal if some part of it were deleted, the provision shall apply with whatever modification is necessary to give effect to the commercial intention of the parties.
        </p>
        <p className="mb-4">
          <strong>11.5 Waiver:</strong> No failure or delay by a party to exercise any right or remedy provided under this Agreement or by law shall constitute a waiver of that or any other right or remedy, nor shall it prevent or restrict the further exercise of that or any other right or remedy. No single or partial exercise of such right or remedy shall prevent or restrict the further exercise of that or any other right or remedy.
        </p>
        <p className="mb-4">
          <strong>11.6 Amendment:</strong> Silence AI may amend these Terms of Service and the incorporated Email Security policies without prior client approval. We notify clients by email to the registered administrator address or by an in-service notification at least seven calendar days before the stated effective date. For a payment gateway provider change, the initial email and three-calendar-month advance notice period in Section 3.3.3 apply instead of this shorter general notice period. An email is sent when transmitted; an in-service notice is sent when made available in the account. We publish the updated text and effective date. The customer may cancel future subscription renewal in the system or delete its account under Section 10; disagreement alone does not delay the amendment or require deletion. Separately negotiated Order Forms may be changed only under their own agreed procedure.
        </p>
        <p className="mb-4">
          <strong>11.7 Entire Agreement:</strong> This Agreement, and any Order Forms, Service Plans, exhibits, schedules, attachments, and appendices referred to in it, constitute the whole agreement between the parties and supersede any previous arrangement, understanding or agreement between the parties relating to the subject matter they cover. Each of the parties acknowledges and agrees that in entering into this Agreement it does not rely on any undertaking, promise, assurance, statement, representation, warranty or understanding (whether in writing or not) of any person (whether party to this Agreement or not) relating to the subject matter of this Agreement, other than as expressly set out in this Agreement. No terms included in any purchase order or other ordering document, or any vendor invoicing service or similar platform or portal, maintained by or on your behalf shall be binding or have any effect.
        </p>
        <p className="mb-4">
          <strong>11.8 Conflict and Authority:</strong> If your subscription to the Services is purchased through a Channel Partner, the Channel Partner (and not we) is responsible for ensuring that the contents of any agreement between you and the Channel Partner, and the contents of any Order Form issued by the Channel Partner, are accurate and correct. In the event of a conflict between any provision in this Agreement and any provision in any agreement (or Order Form) between you and a Channel Partner, this Agreement will prevail to the extent of the conflict. The Channel Partner (if any) is not permitted to modify this Agreement, to make any warranties, representations, or undertakings on our behalf, or to bind us to any obligations other than those set forth in this Agreement. We will, however, have the right to enforce this Agreement and any Order Form directly against you.
        </p>
        <p className="mb-4">
          <strong>11.9 Assignment:</strong> Silence AI may transfer this Agreement and its rights and obligations without separate customer consent only to another legal entity in the Silence AI group that controls, is controlled by or is under common control with the contracting company: an entity linked to Silence AI LLC for a UAE agreement or to ТОО &quot;Silence AI&quot; for a Kazakhstan agreement. Silence AI will notify the customer of the transferee and remains responsible for obligations accrued before transfer. Any transfer to an unrelated purchaser or partner, and any customer assignment, requires the other party&apos;s prior written consent. An Affiliate for this assignment rule means only such a linked legal entity.
        </p>
        <p className="mb-4">
          <strong>11.10 No Partnership or Agency:</strong> Nothing in this Agreement is intended to or will operate to create a partnership between the parties, or authorize either party to act as agent for the other, and neither party shall have the authority to act in the name or on behalf of or otherwise to bind the other in any way (including, but not limited to, the making of any representation or warranty, the assumption of any obligation or liability and the exercise of any right or power).
        </p>
        <p className="mb-4">
          <strong>11.11 Third Party Rights:</strong> This Agreement is for the sole benefit of the parties hereto and their respective successors and permitted assigns and nothing herein, express, or implied, is intended to or shall confer upon any other person any legal or equitable right, benefit, or remedy of any nature whatsoever under or by reason of this Agreement.
        </p>
        <p className="mb-4">
          <strong>11.12 Notices:</strong> Any notice required to be given under this Agreement shall be in writing and sent by email to the other party&apos;s email address as set out in this Agreement (or such other email address as the other party may have notified in accordance with this Section 11.12). The initial notice of a payment gateway provider change must be sent to the customer&apos;s Email Security sign-in email address as specified in Section 3.3.3. Our email address for notices is: info@silenceai.net. The applicable contracting company&apos;s registered address is stated in the regional company details in these Terms. A notice sent by email shall be deemed to have been received at the time of transmission.
        </p>
        <p>
          <strong>11.13 Governing Law and Disputes:</strong> The parties will first try to resolve any dispute arising out of or in connection with this Agreement through mutual negotiation. If negotiation fails, disputes under agreements with Silence AI LLC shall be submitted to the competent courts in Sharjah, UAE, and disputes under agreements with ТОО &quot;Silence AI&quot; shall be submitted to the competent courts of Kazakhstan. Nothing in this Agreement excludes any mandatory rights or court jurisdiction that the parties cannot exclude by contract.
        </p>
      </section>

      <section id="dpa">
        <h2 className="text-2xl font-semibold mb-4">12. Data Processing Addendum (DPA)</h2>
        <p className="mb-4">
          <strong>12.1 Parties and Roles:</strong> This DPA is between Customer (the &quot;Controller&quot;) and the applicable contracting company — Silence AI LLC for UAE agreements or ТОО &quot;Silence AI&quot; for Kazakhstan agreements — as the &quot;Processor&quot;. Controller determines the purposes and means of processing Personal Data. Processor processes Personal Data only on Controller&apos;s documented instructions and as set out in this DPA.
        </p>
        <p className="mb-4">
          <strong>12.2 Purpose and Scope:</strong> Processor processes Personal Data as necessary for the Email Security &amp; Visualization Services ordered by Controller, including the email workspace, security processing, storage and sending. In provider-connected mode, the customer&apos;s Microsoft 365/Outlook or Gmail provider remains the mail server; authorized employees sign in through provider OAuth and use our workspace after their authenticated identity and company authorization are checked. Administrators add approved addresses and aliases in the CMC. Microsoft incoming mail is fetched through Microsoft Graph, Gmail incoming synchronization uses OAuth-authorized IMAP, and sending uses the respective authorized provider APIs. This mode does not itself require moving mail hosting or changing MX, SPF, DKIM or DMARC records, although other setup or domain verification may apply. Provider sign-in may require a password or MFA, and an existing platform 2FA setting may still require a challenge; ordinarily no separate local email password or new platform 2FA enrollment is required merely to connect the account. In hosted mode, administrators configure customer domains and create employee mailboxes and supported aliases in the CMC; the platform&apos;s mail stack receives inbound SMTP mail, stores it, and provides SMTP submission for sending. Hosted-domain setup displays recommended MX, SPF, DKIM and DMARC records and helps verify them. The customer connects a domain it already owns, publishes and maintains the records with its DNS provider, and Silence AI does not obtain DNS-provider access to change them. Hosted accounts use their applicable local authentication settings. Processor may receive, process, store and send messages through the transport and authorization path of the selected mode. When requested, AI-assisted reply drafting may process a selected message, including sender, subject and up to approximately 2,000 characters of its body, and return a draft for review. When separately enabled, AI auto-response or draft settings may process eligible incoming messages and save a draft, send a reply, forward a message or perform another configured mailbox action. Processor will not process Personal Data for other purposes without Controller&apos;s documented requests. Historical Gmail/Outlook mailbox migration is separate from ongoing synchronization and newly delivered mail; migrated messages do not receive the normal security classification.
        </p>
        <p className="mb-4">An administrator may configure an AI provider, while a user request or enabled user-level drafting or auto-response setting can trigger optional AI assistance. These settings are separate from the combined phishing detector.</p>
        <p className="mb-4">
          <strong>12.2.1 Email Security Checks:</strong> Eligible newly received mail may undergo sender-authentication and spoof checks, spam checks, dangerous-link analysis, domain-based phishing and fraud-risk checks, and ClamAV attachment antivirus when enabled, configured and able to access an attachment. These checks are conditional, may stop after a content threat is found, and are not guaranteed for every message or attachment. The current check flow examines known phishing domains, sender authenticity, domain fraud risk, spam, links and then eligible attachments. Spam analysis may bypass Rspamd for an authorized tenant domain with a matching source IP or a trusted provider whose sender checks passed; a spoof finding does not qualify for that bypass. Messages without attachments have no attachment content to scan, and sent mail and delivery errors have separate handling. Historical Gmail/Outlook imports do not receive normal security classification; imported incoming mail may appear in Unfiltered and retain an Inbox or source-folder association, while sent and trash imports follow separate folder rules. Accessible attachment content may still be scanned during migration. Applicable results may place newly processed mail in Spam, Dangerous Links, Malware in attached files, Possibly Phishing or Secure; spoof-only findings route to Spam. Folder placement does not show that every check ran.
        </p>
        <p className="mb-4">
          The phishing detector is a combined control. Where its effective setting is off for a mailbox, the dedicated known-phishing-domain lookup, domain fraud-risk check and dangerous-link scanner are skipped for affected incoming mail. Other enabled services may still examine content or URLs, but may not catch the same threat. Sender-authentication/spoof checks, spam checks and eligible attachment antivirus remain separate, subject to their own prerequisites and exceptions. Only CMC administrators can change the phishing-detector setting; employees cannot disable it. The detector setting does not disable separate AI assistant, reply-draft or automatic-response functions when those are enabled.
        </p>
        <p className="mb-4">A CMC administrator can change the global phishing-detector setting. Employees cannot change it. Whether these checks run also depends on the applicable plan or add-on entitlement.</p>
        <p className="mb-4">
          <strong>12.3 Data Types &amp; Subjects:</strong> Categories of Personal Data include sender, recipient, subject, timestamps and other email metadata; message bodies and attachments received through the authorized provider connection or hosted mail transport; security results; generated drafts or responses; and company/user AI context files where configured for optional AI assistance. Data subjects include Controller&apos;s users, mailbox owners, senders and recipients associated with Controller-authorized mailboxes.
        </p>
        <p className="mb-4">
          <strong>12.4 Data Minimization:</strong> Processor collects and processes the data needed to deliver the selected provider-connected or hosted mode and enabled features, including authorized mail access or platform mail transport, storage, security checks, workspace use and optional AI assistance. Processor will not augment or collect additional personal data about end users except pursuant to Controller instructions.
        </p>
        <p className="mb-4">
          <strong>12.5 Subprocessors:</strong> Processor may engage subprocessors (cloud, storage, email-API providers, AI providers used for optional drafting or automatic responses, and other service providers). Optional AI assistance may send selected sender, subject and message body or raw message, configured AI context files and generated content to a configured provider or, where configured, a fallback AI provider. Not every draft uses an external provider. Processor will enter written agreements with subprocessors imposing obligations consistent with this DPA. Controller may request a non-sensitive list of current subprocessors by contacting Processor; Processor may redact sensitive implementation details.
        </p>
        <p className="mb-4">
          <strong>12.6 Technical &amp; Organizational Measures (TOMs):</strong> Processor implements industry-standard technical and organizational measures to operational and technical controls, including (as applicable): TLS for data-in-transit; encryption of stored data where feasible; role-based access control (RBAC) for internal accounts; multi-factor authentication (MFA) for administrative/privileged access; centralized secrets management; logging for security purposes; backups; vulnerability management; and an incident response process. Processor is only contractually committing to these technical/operational measures and is not obliged hereunder to obtain any particular external certification.
        </p>
        <p className="mb-4">
          <strong>12.7 Retention &amp; Deletion:</strong> Processor will retain Personal Data only as necessary to provide Services or per Controller instruction. Default retention (modifiable by Controller): email data held for scanning/display - retained until Controller deletes the mailbox from the Service or as required by law. On termination, Controller may request deletion; Processor will delete or securely destroy Customer Personal Data within a commercially reasonable period, except where legal retention is required.
        </p>
        <p className="mb-4">
          <strong>12.8 International Transfers:</strong> For the Email Security service under a Kazakhstan company agreement, Kazakhstan customer data is stored in Kazakhstan. For the service under a UAE company agreement, the service runs on a server located either in the United States or in the European Union; no particular country or customer choice of location is promised. These statements distinguish service server and customer data storage from access domains and do not specify every backup, log, support operation or subprocessor location. If Personal Data is transferred across borders, Processor will rely on legally permitted transfer mechanisms and appropriate safeguards required by applicable law. Processor uses TLS encryption in all transfer mechanisms and operations. Controller remains responsible for any local authorizations or restrictions required for transfers initiated by Controller.
        </p>
        <p className="mb-4">
          <strong>12.9 Data Subject Requests:</strong> Processor will, to the extent permitted by law and insofar as such requests relate to processing performed on Controller&apos;s behalf, provide reasonable assistance to Controller to enable Controller to respond to data-subject requests (access, rectification, erasure, restriction, portability, objection). Controller remains primarily responsible for receiving and responding to data-subject requests.
        </p>
        <p className="mb-4">
          <strong>12.10 Security Incidents &amp; Notification:</strong> If Processor becomes aware of a confirmed Personal Data breach affecting Controller Personal Data, Processor will notify Controller without undue delay (and in accordance with applicable law) and will provide available technical details and reasonable operational assistance to enable Controller to assess and comply with its obligations. Processor&apos;s assistance is technical/operational only; Processor does not assume Controller&apos;s legal notification obligations.
        </p>
        <p className="mb-4">
          <strong>12.11 No Audit / Certification / Source Code Obligation:</strong> Controller acknowledges that: Processor will not be contractually required to obtain or maintain any specific external certification (for example, SOC/ISO) under this DPA; Processor will not provide on-site inspections, white-box access, source-code disclosure, internal credentials, raw internal logs, or developer-level access to Controller or to any third party as part of compliance verification; and Processor makes available a non-sensitive summary description of its technical and organizational measures publicly at https://silenceai.net/instructions and https://ai-soc1.silenceai.net/instructions. Processor will not disclose privileged operational artifacts.
        </p>
        <p className="mb-4">
          <strong>12.12 Liability &amp; Order of Precedence:</strong> The Parties&apos; liability for data protection matters is governed by the Agreement. This DPA prevails over the Terms of Service, Terms of Use and incorporated Privacy Policy to the extent of a conflict concerning processing of customer data on the Controller&apos;s behalf. The Privacy Policy remains part of the Agreement for other applicable processing. Nothing in this DPA limits mandatory legal duties.
        </p>
        <p>
          <strong>12.13 Contact:</strong> For DPA questions, subprocessors requests, data access/deletion requests, or incident notices contact: info@silenceai.net
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 08.10.2026</p>
    </PolicyLayout>
  );
}
