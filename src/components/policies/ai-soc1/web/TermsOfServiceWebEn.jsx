"use client";

import React from "react";
import PolicyLayout from "@/components/policies/shared/PolicyLayout";
import WebJurisdictionSelector from "@/components/policies/shared/WebJurisdictionSelector";

const sections = [
  { id: "right-to-use", title: "1. Right to Use" },
  { id: "restrictions", title: "2. Restrictions on Use" },
  { id: "obligations", title: "3. Obligations, Warranties, and Disclaimers" },
  { id: "data-processing", title: "4. Data Processing and Privacy" },
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

export default function TermsOfServiceWebEn() {
  return (
    <PolicyLayout
      title="AI-CSD 1 Web Policy"
      subtitle="Terms of Service"
      sections={sections}
    >
      <WebJurisdictionSelector policy="terms_of_service" active="ae" locale="en" />
      <section id="right-to-use">
        <h2 className="text-2xl font-semibold mb-4">1. Right to Use</h2>
        <p className="mb-4">
          <strong>1.1 Agreement Scope:</strong> These Terms of Service (&quot;Terms&quot;) govern the AI-CSD 1 Web Security &amp; Traffic Management service supplied under the customer&apos;s order or service agreement by Silence AI LLC, Licence Number 2539365.01, registered at Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE (&quot;Silence AI&quot;). This UAE version applies only where that company is the contracting provider and the UAE customer deployment is specified in the order. The contracting company and deployment are determined by the actual order or service agreement, not by language, visitor IP address, or URL locale.
        </p>
        <p className="mb-4">
          <strong>1.2 Service Scope and Access Points:</strong> The Web Security service includes the customer console and its incident and log views; the supplied agent and active edge, proxy, or WAF protection; and related APIs, configuration, telemetry, and support under the subscription or order. The customer console address is stated in onboarding materials. Silence AI supplies the IP address applicable to the customer&apos;s deployment for connecting or configuring the agent or active protection. A covered component or protected site remains within these Terms when it uses another hostname, IP address, or endpoint. The separate sign-in/SSO portal used for access will be identified in the customer&apos;s onboarding materials; its operator and any separate terms or privacy notice are stated there. A sign-in redirect does not end Silence AI&apos;s obligations for the subscribed Web Security service.
        </p>
        <p className="mb-4">Protection applies to traffic routed through the configured Web Security deployment. Where included and enabled, WAF, IPS and DDoS controls are designed to detect and mitigate threats, but cannot identify or stop every attack; malicious requests may pass and legitimate requests may be blocked. This protection statement does not change the availability commitment or credit procedure in Section 6.7.</p>
        <p className="mb-4">
          <strong>1.3 Grant of Rights:</strong> Subject to the Subscription Allocation for the applicable Application(s), we grant you a non-exclusive, non-transferable, non-assignable (subject to Section 11.9), non-sublicensable right to: (a) access and use (and to permit your Users to access and use) the Services, Support, and Documentation during the Term solely for the Permitted Purpose; and (b) use the Service Data for business purposes in conjunction with your operations, subject to Section 10.3(a) (Effect of Termination).
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
          <strong>3.2 Performance Warranty:</strong> We will use commercially reasonable efforts to provide the Services substantially in accordance with the Documentation and support with reasonable skill and care. If we fail to correct a material non-conformity within a reasonable time after notice, Customer may terminate the affected Services under Section 10.2(a) and receive a refund of prepaid subscription fees for undelivered service, subject to applicable law. Section 6.7 separately governs the confirmed availability commitment and Downtime Credits.
        </p>
        <p className="mb-4">
          <strong>3.3 Disclaimers:</strong> You acknowledge and agree that: (a) the Performance Warranty does not apply to the extent of any non-conformance which is caused by use of the Services by you that is not in accordance with the Documentation; (b) the Services will evolve over time and that functionality may be added and removed from time to time in our sole discretion; and (c) your use of the Services may not be uninterrupted or error-free. We specifically do not represent or warrant that: (a) the Services will meet your requirements or will be fit for your particular purpose; (b) the Services will be able to achieve all intended outcomes or deliver all expected results; or (c) we will be able to provide solutions for all issues you may encounter. We will not be liable to you for any false positive or false negative results incorrectly identified by the Services or for any damage or loss arising from your reliance on Service outputs.
        </p>
        <p className="mb-4">
          <strong>3.3.1 System Version Updates:</strong> Silence AI reserves the right to create new versions of the system and make older versions unavailable, while maintaining active protection using the IP address supplied for the relevant customer deployment (the Agent of the &quot;Web Security &amp; Traffic Management&quot; component mentioned in the Terms of Use).
        </p>
        <p className="mb-4">
          <strong>3.3.2 IP Address Management:</strong> Silence AI may issue a new protection IP address for the customer deployment. We will give advance notice to the customer sign-in email address and, where available, in the console, with the new configuration and a reasonable migration period before retiring the previous IP address. The applicable order or a separate written notice will state any specific migration deadline.
        </p>
        <p className="mb-4">
          <strong>3.3.3 Payment Gateway Changes:</strong> Silence AI reserves the right to change the payment gateway provider in new versions of our system. Users will be notified at least 6 months prior to any such change through email notification and platform notifications.
        </p>
        <p className="mb-4">
          <strong>3.4 Customer Obligations:</strong> Customer is responsible for keeping account credentials secure, managing authorized users, securing its own systems, ensuring that it is authorized to protect the connected sites and traffic, supplying lawful and accurate Customer Data, reviewing protection decisions, and configuring controls for its environment. Customer will comply with applicable law and the Documentation.
        </p>
        <p className="mb-4">
          <strong>3.5 Third Party Features:</strong> The Services may contain features designed to interoperate with applications or services separately provided to you by third parties. Any operation or transaction completed via any third-party website, system, platform, or application is between you and the relevant third party, and is at your own risk. We cannot guarantee the continued availability of such features; accordingly, we may cease providing interoperability with them at any time, including if the relevant third-party ceases to make its application or service available for interoperation with the Services or changes the way it does so in a way that is not reasonably acceptable to us.
        </p>
        <p className="mb-4">
          <strong>3.6 Beta Features:</strong> A beta feature, if separately offered, is available only within an active subscription and on the terms disclosed when Customer opts in. It may change or end, subject to the order and mandatory law. No free trial or free activation is promised by this clause.
        </p>
        <p>
          <strong>3.7 Consulting Services:</strong> You may opt to purchase consulting services to be provided on a time and materials basis as mutually agreed upon in a statement of work signed by both parties (&quot;Consulting Services&quot;). The statement of work will describe the scope of the Consulting Services as well as the fees to be paid. The statement of work may include terms that amend or supplement the terms in this Agreement as those terms specifically apply to our delivery of the Consulting Services.
        </p>
      </section>

      <section id="data-processing">
        <h2 className="text-2xl font-semibold mb-4">4. Data Processing and Privacy</h2>
        <p className="mb-4">
          <strong>4.1 Privacy Notice:</strong> To the extent that we process Personal Data relating to you (as a data controller, as defined under applicable data protection laws) when performing our obligations under this Agreement, we will do so materially in accordance with our Privacy Notice available at{" "}
          <a
            href="/en/ae/policies/ai-csd/web/privacy/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /en/ae/policies/ai-csd/web/privacy/
          </a>
          . The Privacy Notice does not form part of this Agreement and may be amended by us from time to time.
        </p>
        <p className="mb-4">
          <strong>4.2 Data Processing Addendum:</strong> Section 12 (the DPA) is incorporated into these Terms and governs Personal Data processed by Silence AI LLC on Customer&apos;s behalf in the Web Security service described in Section 1.2. Privacy laws applicable to the processing, processor obligations, and transfer safeguards apply independently of the contractual law and forum in Section 11.13.
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
            href="/en/ae/policies/ai-csd/web/cookies/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /en/ae/policies/ai-csd/web/cookies/
          </a>
          .
        </p>
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
        <p className="mb-4">
          <strong>6.1 Subscription Fees and Usage Verification:</strong> A subscription under an order or service plan is required; standalone pay-as-you-go access is not offered by these Terms. The order, plan or linked pricing schedule states the subscription fee and term, included features and allowances, usage measurement and reset rules, and any overage rates. A SIEM storage allowance is separate from the applicable retention period.
        </p>
        <p className="mb-4">
          <strong>6.2 Credits:</strong> The prepaid WebSOC account balance is distinct from the subscription allowance and any Service Level Agreement credit under Section 6.7. It is used for additional usage only as described in Section 6.3. Funds added to the balance and any unused balance are subject to the applicable order, purchase terms, and mandatory refund law; they do not automatically expire as subscription credits.
        </p>
        <p className="mb-4">
          <strong>6.3 Billing:</strong> The order or service plan states when the subscription fee is invoiced or paid. Renewal under Section 10.1 does not itself authorize a recurring card charge. Charges for usage above an included allowance and any prepaid balance apply only as stated in the order or plan. If the checkout offers automatic top-up, it requires the customer to authorize the amount, balance trigger, payment method and cancellation method; funds are credited only after successful payment. Failed payment or additional authentication may delay crediting and limit additional usage under the plan. For online sales under agreements with Silence AI LLC in the UAE, Paddle.com handles checkout, billing and payment collection as authorized reseller and merchant of record; Silence AI supplies Web Security under this agreement. Paddle&apos;s <a href="https://www.paddle.com/legal/buyer-terms" className="underline">Buyer Terms</a> govern the purchase transaction, and its <a href="https://www.paddle.com/legal/privacy" className="underline">Privacy Notice</a> describes payment-data processing. The displayed checkout and invoice identify the applicable Paddle entity and payment terms.
        </p>
        <p className="mb-4">
          <strong>6.4 Late Payments:</strong> If an invoiced amount is overdue, we may notify you and may limit access after 10 Business Days from notice, subject to applicable law and the order. An insufficient prepaid balance is handled under Section 6.3; it is not a 30-day credit negotiation.
        </p>
        <p className="mb-4">
          <strong>6.5 Committed Subscription Fees and Taxes:</strong> Subscription fees, wallet additions, taxes, refunds, and any cancellation rights are stated in the applicable order and checkout and remain subject to mandatory law. For a Paddle sale, Paddle presents and collects the transaction charges and applicable taxes and handles purchase refunds under its Buyer Terms; service delivery and termination remain governed by this agreement. A refund of prepaid service fees required under Section 3.2 or 8.4 is unaffected. Payment-data processing and transfer locations are separate from Web Security hosting.
        </p>
        <p className="mb-4">
          <strong>6.6 Price Changes and Email Notice:</strong> Silence AI may change subscription or overage prices for a future billing period, subject to the order and mandatory law. At least 30 calendar days before any price change takes effect, Silence AI will send notice stating the new price and effective date to the email address the customer uses to sign in to the service. A price change does not alter a committed prepaid term unless the customer agrees or applicable law permits it. The customer may decline a future-period price by cancelling renewal under Section 10 and the applicable purchase terms. Renewal alone does not authorize automatic charging of a saved payment method.
        </p>
      </section>

      <section id="sla">
        <h2 className="text-2xl font-semibold mb-4">6.7 Service Level Agreement (SLA)</h2>
        <p className="mb-4">
          <strong>6.7.1 Uptime Commitment:</strong> Silence AI LLC (&quot;Silence AI&quot;) commits to maintaining one hundred percent (100%) platform availability (&quot;Uptime Commitment&quot;) for the Services during each calendar month of the applicable Subscription Term. For the purposes of this Section 6.7, &quot;Downtime&quot; means any continuous period of sixty (60) seconds or more during which the Services are wholly unavailable to the Customer due to a fault attributable to Silence AI&apos;s infrastructure, excluding: (a) scheduled or emergency maintenance windows notified to Customer in advance; (b) events of Force Majeure as described in Section 11.2; (c) interruptions caused by Customer&apos;s acts or omissions, Customer&apos;s third-party integrations, or Customer&apos;s network or equipment; and (d) suspension of Services permitted under this Agreement.
        </p>
        <p className="mb-4">
          <strong>6.7.2 Downtime Credit:</strong> In the event that Downtime occurs during a calendar month in which Customer held an active paid subscription to the Services, Silence AI shall issue to Customer a monetary credit (&quot;Downtime Credit&quot;) calculated on a strictly pro-rata basis as follows:
        </p>
        <div className="pl-6 mb-4 space-y-2">
          <p><strong>(a) Monthly Subscribers:</strong> The Downtime Credit shall equal the product of (i) the total Subscription Fees paid by Customer for the affected calendar month, multiplied by (ii) the ratio of the total verified Downtime minutes in that month to the total number of minutes in that calendar month.</p>
          <p><strong>(b) Annual or Multi-Period Subscribers:</strong> For Customers billed on an annual or multi-period basis, the monthly Subscription Fee equivalent shall be calculated by dividing the total Subscription Fees attributable to the affected Services by the number of calendar months in the applicable billing period, and the Downtime Credit shall be derived therefrom in accordance with sub-section (a) above.</p>
          <p><strong>Illustrative Example (Non-Binding):</strong> If Customer pays one hundred United States Dollars (USD $100.00) per calendar month and the Services experience verified Downtime for fifteen (15) days (representing fifty percent (50%) of the applicable calendar month), the Downtime Credit shall be fifty United States Dollars (USD $50.00).</p>
        </div>
        <p className="mb-4">
          <strong>6.7.3 Nature of Downtime Credit; Exclusive Remedy:</strong> ALL DOWNTIME CREDITS ISSUED PURSUANT TO THIS SECTION 6.7 CONSTITUTE A REIMBURSEMENT OF A PRO-RATA PORTION OF PRE-PAID SUBSCRIPTION FEES ATTRIBUTABLE TO THE PERIOD OF DOWNTIME. DOWNTIME CREDITS DO NOT, UNDER ANY CIRCUMSTANCES, CONSTITUTE, REPRESENT, OR IMPLY: (a) COMPENSATION FOR LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR ANY OTHER DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR EXEMPLARY DAMAGES SUSTAINED BY CUSTOMER AS A RESULT OF DOWNTIME; OR (b) AN ACKNOWLEDGMENT OF LIABILITY OR FAULT BY SILENCE AI BEYOND THE SPECIFIC FAILURE TO MAINTAIN THE UPTIME COMMITMENT. THE ISSUANCE OF A DOWNTIME CREDIT SHALL CONSTITUTE CUSTOMER&apos;S SOLE AND EXCLUSIVE REMEDY FOR ANY FAILURE BY SILENCE AI TO MEET THE UPTIME COMMITMENT SET FORTH IN SECTION 6.7.1, AND IS SUBJECT TO AND SHALL NOT EXCEED THE LIMITATIONS OF LIABILITY SET FORTH IN SECTION 9 OF THIS AGREEMENT.
        </p>
        <p className="mb-4">
          <strong>6.7.4 Credit Claim Procedure:</strong> To be eligible for a Downtime Credit, Customer must submit a written credit request to info@silenceai.net within thirty (30) calendar days of the date on which the Downtime giving rise to the claim occurred (&quot;Claim Period&quot;). Requests submitted after the expiry of the Claim Period shall be deemed waived and shall not be eligible for credit. Each credit request must include: (a) the date(s) and time(s) of the alleged Downtime; (b) a description of the nature of the service unavailability experienced; and (c) any supporting evidence reasonably available to Customer. Silence AI shall evaluate each credit request in good faith, using its own monitoring records as the primary reference, and shall provide Customer with its determination within thirty (30) calendar days of receipt of a complete claim. Silence AI&apos;s determination shall be final and binding, absent manifest error.
        </p>
        <p className="mb-4">
          <strong>6.7.5 Credit Application:</strong> Approved Downtime Credits shall be applied against Customer&apos;s next invoice for the Services. Where no further invoices are anticipated (for example, where Customer has terminated the Agreement in accordance with its terms), approved Downtime Credits shall, at Silence AI&apos;s election, be refunded directly to the payment method on file or, where that is not practicable, applied as a credit to any balance outstanding. Downtime Credits are non-transferable, carry no cash value except as expressly provided herein, and shall expire upon termination or expiry of this Agreement if not applied or refunded as provided in this Section 6.7.5.
        </p>
        <p>
          <strong>6.7.6 Relationship to Other Provisions:</strong> Nothing in this Section 6.7 shall be construed to limit or modify the exclusions of liability set forth in Section 9 (Limitation of Liability) of this Agreement, including the exclusion of consequential, indirect, or incidental damages. In the event of a conflict between this Section 6.7 and Section 9, Section 9 shall govern except to the extent that this Section 6.7 expressly provides for specific Downtime Credits as detailed herein.
        </p>
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
        <p className="mb-4">
          <strong>10.1 Term:</strong> A paid subscription under the applicable order or service plan is required for Web Security access.
        </p>
        <p className="mb-4">The subscription starts and ends as stated in the applicable order or service plan. It renews only if that order or plan expressly provides for renewal, with its stated notice and cancellation method. A renewal does not by itself authorize a charge to a saved payment method. Any prepaid fees or balance remaining on termination are handled under the order, Section 6, and applicable law.</p>
        <p className="mb-4">
          <strong>10.2 Termination:</strong> Without affecting any other right or remedy available to it, including (but not limited to) the rights in Section 10.1, either party may terminate this Agreement, an Order Form and/or the Service Plan with immediate effect by giving written notice to the other party if:
        </p>
        <div className="space-y-2 mb-4">
          <p><strong>(a)</strong> the other party commits a material breach of any other term of this Agreement which breach is irremediable or, if such breach is remediable, the breaching party fails to remedy that breach within a period of 30 days after being notified in writing to do so;</p>
          <p><strong>(b)</strong> the other party ceases to function as a going concern or to conduct operations in the normal course of business; or,</p>
          <p><strong>(c)</strong> the other party has a petition filed by or against it under any bankruptcy or insolvency laws which petition has not been dismissed or set aside within sixty (60) days of filing.</p>
        </div>
        <p className="mb-4">We may additionally terminate this Agreement upon written notice to you if:</p>
        <div className="pl-6 space-y-2 mb-4">
          <p><strong>(i)</strong> you fail to pay any amount due under this Agreement on the due date for payment and remain in default not less than 10 Business Days after being notified in writing to make such payment (though termination does not relieve you of your payment obligation); or</p>
          <p><strong>(ii)</strong> the Channel Partner (if any) fails to pay any amounts due to us with respect to your subscription to the Services.</p>
        </div>
        <p>You acknowledge and agree that we shall have no liability of any kind with respect to any such termination, and your sole recourse with respect to any such termination shall be against the Channel Partner.</p>
        <p className="mb-4 mt-4">
          <strong>10.3 Effect of Termination:</strong> On termination or expiry of this Agreement and/or an applicable Order Form/Service Plan for any reason:
        </p>
        <div className="space-y-2 mb-4">
          <p><strong>(a)</strong> the rights granted to you under this Agreement, including under Section 1 (Right to Use) shall immediately terminate except that you may continue to use (in accordance with the restrictions on use set out in this Agreement) Service Data provided to you prior to termination or expiry of this Agreement. You assume sole responsibility and we shall incur no liability risk resulting from any continued use of the Service Data following termination or expiration;</p>
          <p><strong>(b)</strong> you must promptly delete your account from the Services by either activating the delete function in the Services or contacting our support team for deletion assistance;</p>
          <p><strong>(c)</strong> you shall immediately uninstall all tools and software components from all computer equipment in your possession or control and, upon written request from us, will provide satisfactory evidence of the same; and,</p>
          <p><strong>(d)</strong> any rights, remedies, obligations, or liabilities of the parties that have accrued up to the date of termination or expiry, including the right to claim damages with respect to any breach of this Agreement which existed at or before the date of termination shall not be affected or prejudiced.</p>
        </div>
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
          <strong>11.6 Amendment:</strong> We will give customers written notice of a material change at least 30 calendar days before it takes effect, unless an earlier change is required by law or needed to address an urgent security issue. A customer may object in writing before the effective date; the parties will discuss the objection in good faith. If no resolution is reached within 30 calendar days after we receive it, we will either keep the existing terms for that customer for the current term or permit termination with a refund of prepaid subscription fees for undelivered service, subject to mandatory law and the actual purchase terms. A change to an agreed order, service plan or DPA requires the amendment method stated in that document. Continued use after effective notice may constitute acceptance only to the extent permitted by law.
        </p>
        <p className="mb-4">
          <strong>11.7 Entire Agreement:</strong> This Agreement, and any Order Forms, Service Plans, exhibits, schedules, attachments, and appendices referred to in it, constitute the whole agreement between the parties and supersede any previous arrangement, understanding or agreement between the parties relating to the subject matter they cover. Each of the parties acknowledges and agrees that in entering into this Agreement it does not rely on any undertaking, promise, assurance, statement, representation, warranty or understanding (whether in writing or not) of any person (whether party to this Agreement or not) relating to the subject matter of this Agreement, other than as expressly set out in this Agreement. No terms included in any purchase order or other ordering document, or any vendor invoicing service or similar platform or portal, maintained by or on your behalf shall be binding or have any effect.
        </p>
        <p className="mb-4">
          <strong>11.8 Conflict and Authority:</strong> If your subscription to the Services is purchased through a Channel Partner, the Channel Partner (and not we) is responsible for ensuring that the contents of any agreement between you and the Channel Partner, and the contents of any Order Form issued by the Channel Partner, are accurate and correct. In the event of a conflict between any provision in this Agreement and any provision in any agreement (or Order Form) between you and a Channel Partner, this Agreement will prevail to the extent of the conflict. The Channel Partner (if any) is not permitted to modify this Agreement, to make any warranties, representations, or undertakings on our behalf, or to bind us to any obligations other than those set forth in this Agreement. We will, however, have the right to enforce this Agreement and any Order Form directly against you.
        </p>
        <p className="mb-4">
          <strong>11.9 Assignment:</strong> Neither party may assign or transfer this Agreement or any performance rights or obligations under this Agreement without the prior written consent of the other party. Notwithstanding the foregoing, no consent is required for: (a) either party to assign this Agreement in its entirety to an Affiliate or to a successor of all or substantially all its assets through merger, reorganization, consolidation, or acquisition, provided that the assigning party provides notice of the assignment to the other party; or (b) a Channel Partner (if any) to assign your Order Form to us, in which event you will continue to be bound by this Agreement. No assignment shall relieve the assigning party of any of its obligations hereunder incurred prior to the assignment. Any attempted assignment, transfer, or other conveyance in violation of the foregoing shall be null and void. This Agreement shall be binding upon and shall inure to the benefit of the parties hereto and their respective successors and permitted assigns.
        </p>
        <p className="mb-4">
          <strong>11.10 No Partnership or Agency:</strong> Nothing in this Agreement is intended to or will operate to create a partnership between the parties, or authorize either party to act as agent for the other, and neither party shall have the authority to act in the name or on behalf of or otherwise to bind the other in any way (including, but not limited to, the making of any representation or warranty, the assumption of any obligation or liability and the exercise of any right or power).
        </p>
        <p className="mb-4">
          <strong>11.11 Third Party Rights:</strong> This Agreement is for the sole benefit of the parties hereto and their respective successors and permitted assigns and nothing herein, express, or implied, is intended to or shall confer upon any other person any legal or equitable right, benefit, or remedy of any nature whatsoever under or by reason of this Agreement.
        </p>
        <p className="mb-4">
          <strong>11.12 Notices:</strong> Notices under this Agreement must be sent in writing to the other party&apos;s designated email address. Our email for notices and DPA requests is info@silenceai.net. Our registered address is Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. A notice sent by email is deemed received at transmission, subject to applicable law.
        </p>
        <p>
          <strong>11.13 Governing Law and Disputes:</strong> This Agreement is governed by the laws of the United Arab Emirates, excluding conflict-of-laws rules. A party raising a contractual dispute or alleged non-compliance must give written notice to the other party, stating the issue and requested resolution. The parties will attempt in good faith to resolve it by mutual negotiation for 30 calendar days after receipt of notice. If unresolved, either party may bring the dispute before the competent courts in Sharjah, UAE. Urgent interim relief may be sought sooner. This procedure does not restrict mandatory consumer rights, data-subject rights, complaints to regulators, or a forum required by applicable law. Paddle&apos;s Buyer Terms separately govern a Paddle purchase transaction and may specify different law and courts, including country-specific exceptions.
        </p>
      </section>

      <section id="dpa">
        <h2 className="text-2xl font-semibold mb-4">12. Data Processing Addendum (DPA)</h2>
        <p className="mb-4">
          <strong>12.1 Parties and Roles:</strong> This DPA is between Customer (Controller) and Silence AI LLC (Processor), Licence Number 2539365.01, for the UAE customer deployment identified in the order. Controller determines the purposes and means of processing Personal Data. Processor acts on Controller&apos;s documented instructions and this DPA.
        </p>
        <p className="mb-4">
          <strong>12.2 Purpose and Scope:</strong> Processor processes Personal Data as necessary to provide the ordered Web Security service in Section 1.2, including collection, storage, parsing, analysis, protection decisions, and display of web traffic and incident logs through the console, agent, edge/proxy or WAF, APIs, configuration, telemetry, and support. Any processing for another purpose requires Controller&apos;s documented instructions.
        </p>
        <p className="mb-4">
          <strong>12.3 Data Types &amp; Subjects:</strong> Categories of Personal Data: IP addresses, request URIs, timestamps, HTTP headers, user-agent strings, and country codes when present in web server logs. Data subjects: visitors to Controller&apos;s websites and web properties protected by the Web Security &amp; Traffic Management component.
        </p>
        <p className="mb-4">
          <strong>12.4 Data Minimization:</strong> Processor only collects the data provided by Controller via web server logs or authorised APIs. Processor will not augment or collect additional personal data about end users except pursuant to Controller instructions.
        </p>
        <p className="mb-4">
          <strong>12.5 Subprocessors:</strong> Processor may engage subprocessors (cloud, storage, and other service providers). Processor will enter written agreements with subprocessors imposing obligations consistent with this DPA. Controller may request a non-sensitive list of current subprocessors by contacting Processor; Processor may redact sensitive implementation details.
        </p>
        <p className="mb-4">
          <strong>12.6 Technical &amp; Organizational Measures (TOMs):</strong> Processor implements industry-standard technical and organizational measures to operational and technical controls, including (as applicable): TLS for data-in-transit; encryption of stored data where feasible; role-based access control (RBAC) for internal accounts; multi-factor authentication (MFA) for administrative/privileged access; centralized secrets management; logging for security purposes; backups; vulnerability management; and an incident response process. Processor is only contractually committing to these technical/operational measures and is not obliged hereunder to obtain any particular external certification.
        </p>
        <p className="mb-4">
          <strong>12.7 Retention &amp; Deletion:</strong> Processor retains Personal Data only as necessary to provide Services or per Controller instruction. The applicable order or data-retention schedule states the period for web-server logs; raw web logs, structured SIEM events, incidents and backups may have different schedules. A SIEM storage allowance concerns storage volume, not retention time. On termination, Controller may request deletion; Processor will delete or securely destroy Customer Personal Data within a commercially reasonable period, except where legal retention is required.
        </p>
        <p className="mb-4">
          <strong>12.8 International Transfers:</strong> For a customer contracting with Silence AI LLC, the Web Security deployment is provided on a server located in the United States or Europe. The location assigned to the customer is stated in the order, service plan, or linked data-location schedule. The deployment server location does not establish where backups, authentication, support access, payment data, AI integrations, or subprocessors process Personal Data. Those other locations and any transfers from the UAE or other applicable jurisdictions are described in the relevant schedule or privacy notice and supported by the legally required transfer mechanism. TLS alone is not a transfer mechanism. Controller and Processor retain their respective duties under applicable privacy law.
        </p>
        <p className="mb-4">
          <strong>12.9 Data Subject Requests:</strong> Processor will, to the extent permitted by law and insofar as such requests relate to processing performed on Controller&apos;s behalf, provide reasonable assistance to Controller to enable Controller to respond to data-subject requests (access, rectification, erasure, restriction, portability, objection). Controller remains primarily responsible for receiving and responding to data-subject requests.
        </p>
        <p className="mb-4">
          <strong>12.10 Security Incidents &amp; Notification:</strong> If Processor becomes aware of a confirmed Personal Data breach affecting Controller Personal Data, Processor will notify Controller without undue delay (and in accordance with applicable law) and will provide available technical details and reasonable operational assistance to enable Controller to assess and comply with its obligations. Processor&apos;s assistance is technical/operational only; Processor does not assume Controller&apos;s legal notification obligations.
        </p>
        <p className="mb-4">
          <strong>12.11 Compliance Information and Audits; No Certification Obligation:</strong> Upon Controller&apos;s written request to info@silenceai.net, Processor will make available the information necessary to demonstrate compliance with Processor&apos;s obligations under this DPA. Processor may provide relevant documentation, written responses, redacted evidence, or a confidential call as appropriate to the request. Where the GDPR or another applicable data protection law requires an audit right, Processor will allow for and contribute to audits, including inspections, of the processing covered by this DPA conducted by Controller or an independent auditor mandated by Controller. The parties will cooperate in good faith to select an appropriate audit method, taking into account the information already supplied and relevant security concerns. Reasonable arrangements may address advance notice, scope, timing, confidentiality, auditor qualifications, and protection of other customers&apos; data and system security, but will not prevent the effective exercise of a mandatory audit right. This DPA does not require Processor to obtain or maintain a particular external certification (such as SOC or ISO), and it grants no general right to source code, internal credentials, or unrestricted access to systems or information concerning other customers.
        </p>
        <p className="mb-4">
          <strong>12.12 Liability &amp; Order of Precedence:</strong> The Parties&apos; liability for data protection matters is governed by the Agreement. To the extent of any conflict between this DPA and the Agreement, this DPA governs with respect to data processing matters. Nothing in this DPA limits an obligation that cannot be excluded or restricted under applicable data protection law.
        </p>
        <p>
          <strong>12.13 Contact:</strong> For DPA questions, subprocessors requests, data access/deletion requests, or incident notices contact: info@silenceai.net
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last updated: 7 October 2026</p>
    </PolicyLayout>
  );
}
