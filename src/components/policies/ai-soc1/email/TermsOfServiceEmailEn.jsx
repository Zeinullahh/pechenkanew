"use client";

import React from "react";
import PolicyLayout from "@/components/policies/shared/PolicyLayout";

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
      <section id="right-to-use">
        <h2 className="text-2xl font-semibold mb-4">1. Right to Use</h2>
        <p className="mb-4">
          <strong>1.1 Agreement Scope:</strong> These Terms of Service (&quot;Terms&quot;) govern your access to and use of the AI-CSD 1 Email Security &amp; Visualization component provided by Silence AI LLC (&quot;Silence AI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms apply to you, the individual or entity accessing our services (&quot;you&quot; or &quot;your&quot;), and your employer or principal if you are acting on their behalf.
        </p>
        <p className="mb-4">
          <strong>1.2 Service Domain and Jurisdiction:</strong> The AI-CSD 1 Email Security &amp; Visualization system operates across two dedicated domains, each serving a distinct functional role: (i) <strong>email-soc.silenceai.net</strong> — the Centralized Management Console (CMC) for the Email Security &amp; Visualization subsystem, accessible to administrators; and (ii) <strong>mail.silenceai.net</strong> — the Webmail Client through which end users send and receive emails, accessible to users without administrative privileges. These Terms of Service apply exclusively to services accessible through the aforementioned domains. Any services provided on different domains are subject to separate terms and policies.
        </p>
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
          <strong>3.2 Performance Warranty:</strong> We will make commercially reasonable efforts to ensure that the Services perform substantially in accordance with the Documentation and that any support we provide via info@silenceai.net will be performed with reasonable skill and care (&quot;Performance Warranty&quot;). If the Services do not conform with the foregoing Performance Warranty, we will, at our expense, use reasonable efforts to promptly correct any such non-conformance. Such correction constitutes your sole and exclusive remedy for any breach of the Performance Warranty, provided that should we fail to cure such non-conformity, you shall be permitted to terminate the applicable Services in accordance with Section 10.2(a) (Termination) and receive a refund of any pre-paid Subscription Fees for such Services not delivered as of the date of termination. Notwithstanding the foregoing, the Performance Warranty does not apply where you subscribe to a free version of the Services, an Evaluation or a paid version of the Services through the Open Source Projects, and we may suspend, limit or throttle such Services at any time where necessary due to the exigencies of our business.
        </p>
        <p className="mb-4">
          <strong>3.3 Disclaimers:</strong> You acknowledge and agree that: (a) the Performance Warranty does not apply to the extent of any non-conformance which is caused by use of the Services by you that is not in accordance with the Documentation; (b) the Services will evolve over time and that functionality may be added and removed from time to time in our sole discretion; and (c) your use of the Services may not be uninterrupted or error-free. We specifically do not represent or warrant that: (a) the Services will meet your requirements or will be fit for your particular purpose; (b) the Services will be able to achieve all intended outcomes or deliver all expected results; or (c) we will be able to provide solutions for all issues you may encounter. We will not be liable to you for any false positive or false negative results incorrectly identified by the Services or for any damage or loss arising from your reliance on Service outputs.
        </p>
        <p className="mb-4">
          <strong>3.3.3 Payment Gateway Changes:</strong> Silence AI reserves the right to change the payment gateway provider in new versions of our system. Users will be notified at least 6 months prior to any such change through email notification and platform notifications.
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
        <p className="mb-4">
          <strong>4.1 Privacy Notice:</strong> To the extent that we process Personal Data relating to you (as a data controller, as defined under applicable data protection laws) when performing our obligations under this Agreement, we will do so materially in accordance with our Privacy Notice available at{" "}
          <a
            href="/policies/ai-soc1/email/privacy/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-soc1/email/privacy/
          </a>
          . The Privacy Notice does not form part of this Agreement and may be amended by us from time to time.
        </p>
        <p className="mb-4">
          <strong>4.2 Data Processing Addendum:</strong> The Data Processing Addendum set out below (Section 12 — &quot;Data Processing Addendum&quot;) is incorporated into these Terms and governs the processing of Personal Data that Silence AI processes on behalf of the Customer in connection with the Email Security &amp; Visualization Services (including Email Protector). By accepting these Terms, Customer accepts the DPA. The DPA is drafted for a UAE-headquartered Processor operating data centers worldwide and applies to Customers globally.
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
            href="/policies/ai-soc1/email/cookies/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            /policies/ai-soc1/email/cookies/
          </a>
          .
        </p>
      </section>

      <section id="email-access">
        <h2 className="text-2xl font-semibold mb-4">4.5 Restriction on Silence AI Personnel Access to Client Email Data</h2>
        <p className="mb-4">
          Silence AI personnel — including employees, contractors, officers, directors, and any other human agents acting on behalf of Silence AI LLC — are strictly prohibited from reading, accessing, copying, or otherwise reviewing the content of any email messages, attachments, or email metadata belonging to or processed on behalf of any client organization, <strong>unless the client organization has granted prior, explicit, and documented written consent</strong> permitting such access for a specified, legitimate purpose (e.g., a formally requested and authorized support investigation). This prohibition applies regardless of whether such email data is technically accessible through internal administrative systems, infrastructure tooling, or third-party API integrations (such as the Google Gmail API or Microsoft Outlook API) used to deliver the Email Protector component of the Service. All client email data is processed exclusively by automated systems to perform the contracted security-scanning and visualization functions. Any access by Silence AI personnel that falls within a client-authorized exception must be: (a) limited strictly to the scope and purpose described in the written client authorization; (b) performed by a named individual whose access is recorded in an internal audit log; and (c) terminated as soon as the authorized purpose has been fulfilled. Silence AI maintains internal role-based access controls (RBAC), multi-factor authentication requirements, and audit logging to enforce and evidence compliance with this provision. Unauthorized access to client email data by any Silence AI personnel constitutes a material breach of this Agreement and may give rise to disciplinary action, termination of the individual&apos;s employment or engagement, and civil or criminal liability under applicable law.
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
          <strong>6.1 Subscription Fees and Usage Verification:</strong> You agree to pay the Subscription Fees (if any) due for the duration of the Term. We verify our customers&apos; use of the Services on a periodic basis to ensure compliance with the Subscription Allocation. In the event such verification reveals that your use of the Services exceeds the Subscription Allocation, you must reduce your usage of the Services to the amounts set out in the Subscription Allocation within 30 days of becoming aware of the overage, failing which, we (or our Channel Partner, where applicable) may invoice you for the associated additional Subscription Fees at our then current rates for the remainder of the then-current Term. If you purchase additional Subscription Allocations or move to a higher tier Service Plan during the Term, Subscription Fees shall be pro-rated for the remainder of the then-current Term. You may not downgrade your Subscription Allocation or move to a lower tier of any Service Plan during the term of this Agreement.
        </p>
        <p className="mb-4">
          <strong>6.2 Credits:</strong> If you purchase any Services under a credit model (&quot;Credits&quot;), those Credits form part of your Subscription Allocation. Credits may be applied for various Services. When Credits are applied, the number of Credits required to redeem a Service shall be deducted from your Credit balance. Unless otherwise stated on an applicable Order Form, all Credits must be used within the term of such Order Form, after which any unused Credits will expire and cannot be redeemed, refunded, or credited. Credits are not redeemable for cash and are non-transferable. Upon exhaustion of your Credits, you agree to engage in good faith negotiations with us to purchase additional credits and otherwise true-up your consumption within 30 days.
        </p>
        <p className="mb-4">
          <strong>6.3 Billing:</strong> Depending on whether you subscribe to the Services on an Order Form or Service Plan, the billing frequency and payment terms applicable to you shall be as follows: (a) Order Form: Where you subscribe to the Services on an Order Form, we will invoice you in accordance with the billing frequency and payment terms on the Order Form and you will pay each invoice per such terms. If billing frequency and payment terms are omitted from the Order Form, the default billing frequency is annual and the payment term is net 30 from the date of the invoice; or (b) Service Plan: Where you subscribe to the Services through a Service Plan, we and/or our third party payment processor will (and you hereby authorize us to) bill your payment card for the applicable Subscription Fee. You will be billed the applicable Subscription Fee in advance on or shortly after the date you select the Service Plan and on each month or anniversary thereafter, until this Agreement and/or the Services are terminated by you or us in accordance with this Agreement. We reserve the right to change the Subscription Fees applicable to our Service Plans at any time. If you do not agree to such change, you must delete your account and stop using the Services, at which point, this Agreement will be deemed to have been terminated by you at the end of your then current billing period. We will only charge you in respect of the period before termination based on the previously agreed Subscription Fee, and will not be required to refund any Subscription Fees to you. If you do agree to such change (which will be deemed from your continued use of the Services after the date the new Subscription Fee becomes effective), your next bill will include the new Subscription Fees on a pro rata basis.
        </p>
        <p className="mb-4">
          <strong>6.4 Late Payments:</strong> If we have not received timely payment of invoices or other amounts payable (including, where applicable, in the event of Credit over-consumption following the 30 day good faith negotiation period), we may notify you of the default and, without prejudice to any other rights and remedies, we may disable your access to all or part of the Services if payment has not been made by you or by the Channel Partner (as applicable) within 10 Business Days of the date of the notice of default.
        </p>
        <p className="mb-4">
          <strong>6.5 Committed Subscription Fees and Taxes:</strong> All Subscription Fees are: (a) non-cancellable and non-refundable; (b) payable in US Dollars; and (c) exclusive of any applicable taxes. You are required to pay and bear any sales, use, value-added, goods and services, withholding, or similar taxes or duties, whether domestic or foreign, related to the transactions under this Agreement, other than taxes based on our income. You will pay all amounts due under this Agreement in full without any set-off, counterclaim, deduction or withholding. If withholding is required under the laws of any relevant tax jurisdiction, withholding will be applied at the lowest applicable rate including the reduced rate of withholding under any tax treaty. You will also provide us with a copy of the withholding tax certificate or other applicable documentation as proof of payment.
        </p>
        <p className="mb-4">
          <strong>6.6 Renewal Subscription Fee Increases:</strong> Unless otherwise set forth in the Service Plan or the Order Form (whichever is applicable), if your subscription to the Services auto-renews pursuant to Section 10.1 below, we may increase the Subscription Fees for each Renewal Term by no more than 10% over the prior year&apos;s Subscription Fees rate for the applicable Services.
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
          <strong>10.1 Term:</strong> The term of this Agreement is determined by whether you subscribe to a free version of the Services, an Evaluation, or a paid version of the Services. In each case, this Agreement shall commence on the Commencement Date and shall endure for the duration set forth in (a), (b) or (c) below:
        </p>
        <div className="space-y-4 mb-4">
          <div>
            <p><strong>(a) Free Version of Services (including Open Source Projects):</strong> This Agreement will endure until it is terminated by either party as follows:</p>
            <div className="pl-6 space-y-2 mt-2">
              <p><strong>(i)</strong> by us at any time and for any reason, including without notice to you; or</p>
              <p><strong>(ii)</strong> by you at any time by deleting your account in accordance with Section 10.3(b).</p>
            </div>
            <p className="mt-2">Additionally, we reserve the right to terminate this Agreement pursuant to Section 10.1(a)(i) and/or to delete your data at our discretion without prior notice. Examples of when this might occur include prolonged account inactivity, violation of our terms, or system maintenance needs.</p>
          </div>

          <div>
            <p><strong>(b) Evaluations:</strong> This Agreement will, unless otherwise terminated early as provided herein, endure until the earlier of:</p>
            <div className="pl-6 space-y-2 mt-2">
              <p><strong>(i)</strong> the expiry of the Evaluation Period; or</p>
              <p><strong>(ii)</strong> the termination of this Agreement by us by providing 3 calendar days&apos; notice to you, where we reasonably believe that the Services or Documentation are not being used in accordance with this Agreement, or are being accessed in a way that interferes with the normal operation of the Service.</p>
            </div>
          </div>

          <div>
            <p><strong>(c) Paid Version of Services:</strong> This Agreement will, unless otherwise terminated early as provided herein, endure for the term recorded in the Order Form or Service Plan (whichever is applicable). Unless otherwise terminated in accordance with the terms of this Agreement, the term of an initial Order Form or Service Plan will (unless otherwise specified in the Order Form or Service Plan) be 1 year from the date specified in the Order Form or Service Plan as the start date of your subscription to the Services (the &quot;Initial Term&quot;) and, thereafter, unless either party provides the other party with written notice of non-renewal at least 30 days prior to the end of the then current Term, shall renew automatically for successive 1 year periods (each a &quot;Renewal Term&quot;). The Initial Term together with any Renewal Term(s) shall constitute the Term of the Order Form or Service Plan.</p>
            <p>For the avoidance of doubt, a valid notice of non-renewal provided by one party to the other in terms of this Section 10.1(c), will result in the termination of the Order Form or Service Plan (whichever is applicable) at the end of its then current Term, and no Subscription Fees shall be refunded to you.</p>
          </div>
        </div>
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
          <strong>11.6 Amendment:</strong> We may periodically update the terms of this Agreement. If you have an active account, we will notify you of updates via email or a notification through the Services. Unless the notice states otherwise, the updated terms of this Agreement will become effective and binding 30 calendar days after it is posted. In the event that you: (a) have subscribed to a paid version of the Services and reasonably object to any update to the terms of this Agreement, the parties may discuss in good faith with a view to achieving a commercially reasonable resolution. If no such resolution can be reached within 30 calendar days of our receipt of the objection, we will either not implement the update (or any part of the update which forms the subject of the objection) with respect to your use of the Services, or permit you to terminate this Agreement (and any applicable Order Form or Service Plan) without liability to either party; or (b) have subscribed to a free version of the Services and do not agree to any update to the terms of this Agreement, you must delete your account from the Services as described in Section 10.3(b) and immediately stop using the Services, at which point this Agreement will be deemed to have been terminated by you. If this Agreement is terminated pursuant to this Section 11.6, we will refund (or cause our Channel Partner to refund, where applicable) any pre-paid Subscription Fees (if any) for such Services not delivered as of the date of termination. If you continue to use the Services after the update becomes effective, you acknowledge that you will be deemed to have agreed to (and will be bound by) the updated terms. No other amendment or modification of this Agreement, including by you or, where applicable, by any Channel Partner, shall be effective unless it is in writing and signed by an authorized representative of each party.
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
          <strong>11.12 Notices:</strong> Any notice required to be given under this Agreement shall be in writing and sent by email to the other party&apos;s email address as set out in this Agreement (or such other email address as the other party may have notified in accordance with this Section 11.12). Our email address for notices is: info@silenceai.net. Our physical address is: Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, UAE. A notice sent by email shall be deemed to have been received at the time of transmission.
        </p>
        <p>
          <strong>11.13 Governing Law:</strong> This Agreement will be governed by and construed in accordance with the laws of the United Arab Emirates, excluding its conflicts of laws rules, and each party irrevocably agrees that the courts located in Sharjah, United Arab Emirates shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with this Agreement.
        </p>
      </section>

      <section id="dpa">
        <h2 className="text-2xl font-semibold mb-4">12. Data Processing Addendum (DPA)</h2>
        <p className="mb-4">
          <strong>12.1 Parties and Roles:</strong> This DPA is between Customer (the &quot;Controller&quot;) and Silence AI LLC (the &quot;Processor&quot;). Controller determines the purposes and means of processing Personal Data. Processor processes Personal Data only on Controller&apos;s documented instructions and as set out in this DPA.
        </p>
        <p className="mb-4">
          <strong>12.2 Purpose and Scope:</strong> Processor will process Personal Data only as necessary to provide the Email Security &amp; Visualization Services ordered by Controller, specifically: accessing, storing, and processing email data (metadata, body, attachments) only where Controller has authorized such access via third-party APIs (for example Google/Gmail API, Microsoft/Outlook API) to provide Email Protector features and the secure webmail UI. Processor does not operate an SMTP service. Processor will not process Personal Data for any other purpose without Controller&apos;s documented requests. For the avoidance of doubt, Silence AI does not scan or classify email content during mailbox migration from Gmail or Outlook.
        </p>
        <p className="mb-4">
          <strong>12.2.1 Email Security Validation Process:</strong> The Email Protector component implements a five-layer sequential security validation process for incoming emails. Each email undergoes automated analysis through the following stages: (1) Sender Authentication Verification - validation of SPF, DKIM, and DMARC records to detect email spoofing; (2) Spam Detection - identification of unsolicited messages and improperly configured sender domains; (3) Dangerous Link Analysis - scanning of all embedded hyperlinks for malicious content; (4) Domain-Based Phishing Detection - analysis of sender domain characteristics to identify typosquatting and lookalike domains; and (5) AI-Powered Content Analysis - natural language processing of email body content to detect phishing context and social engineering patterns. Based on validation results, emails are automatically classified into designated folders: Possibly Spoofed, Spam, Dangerous Link, Possibly Phishing, or Secure. During mailbox migration from existing Gmail or Outlook accounts, the system does not scan or classify email content. Once migration is complete and the Webmail Client is in active use, all incoming emails are automatically scanned and classified. This processing is performed solely to provide the security-scanning functionality of the Email Protector service and constitutes a necessary component of the Services provided to Controller.
        </p>
        <p className="mb-4">
          <strong>12.3 Data Types &amp; Subjects:</strong> Categories of Personal Data: email metadata (sender, recipient, subject, timestamps), and email content/attachments only if Controller enables such access via authorized APIs. Data subjects: Controller&apos;s users and mailbox owners associated with Controller-authorized mailboxes.
        </p>
        <p className="mb-4">
          <strong>12.4 Data Minimization:</strong> Processor only collects the data provided by Controller via authorised email APIs. Processor will not augment or collect additional personal data about end users except pursuant to Controller instructions.
        </p>
        <p className="mb-4">
          <strong>12.5 Subprocessors:</strong> Processor may engage subprocessors (cloud, storage, email-API providers and other service providers). Processor will enter written agreements with subprocessors imposing obligations consistent with this DPA. Controller may request a non-sensitive list of current subprocessors by contacting Processor; Processor may redact sensitive implementation details.
        </p>
        <p className="mb-4">
          <strong>12.6 Technical &amp; Organizational Measures (TOMs):</strong> Processor implements industry-standard technical and organizational measures to operational and technical controls, including (as applicable): TLS for data-in-transit; encryption of stored data where feasible; role-based access control (RBAC) for internal accounts; multi-factor authentication (MFA) for administrative/privileged access; centralized secrets management; logging for security purposes; backups; vulnerability management; and an incident response process. Processor is only contractually committing to these technical/operational measures and is not obliged hereunder to obtain any particular external certification.
        </p>
        <p className="mb-4">
          <strong>12.7 Retention &amp; Deletion:</strong> Processor will retain Personal Data only as necessary to provide Services or per Controller instruction. Default retention (modifiable by Controller): email data held for scanning/display - retained until Controller deletes the mailbox from the Service or as required by law. On termination, Controller may request deletion; Processor will delete or securely destroy Customer Personal Data within a commercially reasonable period, except where legal retention is required.
        </p>
        <p className="mb-4">
          <strong>12.8 International Transfers:</strong> Processor operates data centers worldwide. If Personal Data is transferred across borders, Processor will rely on legally permitted transfer mechanisms and appropriate safeguards required by applicable law. Processor uses TLS encryption in all transfer mechanisms and operations. Controller remains responsible for any local authorizations or restrictions required for transfers initiated by Controller.
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
          <strong>12.12 Liability &amp; Order of Precedence:</strong> The Parties&apos; liability for data protection matters is governed by the Agreement. To the extent of any conflict between this DPA and the Agreement, this DPA governs with respect to data processing matters. Nothing in this DPA expands Processor obligations beyond the Agreement.
        </p>
        <p>
          <strong>12.13 Contact:</strong> For DPA questions, subprocessors requests, data access/deletion requests, or incident notices contact: info@silenceai.net
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">Last Updated: 13.04.2026</p>
    </PolicyLayout>
  );
}
