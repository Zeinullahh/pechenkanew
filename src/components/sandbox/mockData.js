// Deterministic, local fixtures. Security findings are demonstration data.

export const DEMO_NOW = Date.parse("2026-09-20T11:00:00Z");
export const ACCOUNT = "elena.r@silenceai.net";
export const COMPANY_USERS = [
  {
    name: "jmqst011",
    email: "jmqst011@silenceai.net",
    fill: "#4c1d95",
    employee: true,
  },
  {
    name: "jmqst011",
    email: "jmqst011@silenceai.net",
    fill: "#e9d5ff",
    employee: true,
  },
  { name: "noreply", email: "noreply@silenceai.net", fill: "#ffffff" },
  { name: "info", email: "info@silenceai.net", fill: "#ffffff" },
  {
    name: "zeinulla.rs...",
    email: "zeinulla.rs@silenceai.net",
    fill: "#ffffff",
  },
  { name: "info", email: "info@silenceai.net", fill: "#1a1a2e" },
];

// Column order and sender names transcribed from Screenshot_20260214_143049.png.
export const DOMAIN_COLUMNS = [
  [
    ["m.ngrok.com", "team"],
    ["aiu.kz", "team"],
    ["cloudpayments.kz", "noreply"],
    ["google.com", "googlecloud", "google-noreply", "no-reply"],
    ["apple.com", "appstore", "no-reply"],
    ["cloud.vk.com", "noreply"],
    ["d.whoosh.bike", "no-reply"],
  ],
  [
    ["mail.instagram.com", "security", "no-reply", "business"],
    ["tome.app", "team", "founders"],
    ["englishdom.com", "inform"],
    ["id.apple.com", "appleid"],
    ["strava.com", "no-reply"],
    ["accountprotection.microsoft.com", "account-security"],
    ["kazatomprom.kz", "myussupport"],
  ],
  [
    ["kz.adidas.com", "news", "info"],
    ["mailout.comms.premierleague.com", "comms"],
    ["olx.kz", "noreply"],
    ["email.apple.com", "no-reply", "noreply"],
    ["info.glovoapp.com", "toktok"],
    ["accounts.google.com", "no-reply"],
    ["gmail.com", "maksssg"],
  ],
  [
    ["insideapple.apple.com", "iCloud", "AppleSupport"],
    ["mail.notion.so", "team"],
    ["mail.perplexity.ai", "team"],
    ["mcs.mail.ru", "vkcs_support"],
    ["nitec.kz", "myussupport"],
    ["silence.codes", "noreply"],
    ["team.quizizz.com", "hello"],
  ],
  [
    ["duolingo.com", "hello"],
    ["faceit.com", "no-reply"],
    ["glovoapp.com", "no-reply"],
    ["info.wayground.com", "hello"],
    ["learn.quizizz.com", "hello"],
    ["mail.ru", "gdaumen"],
    ["mailout.users.premierleague.com", "noreply"],
  ],
  [
    ["onlyfans.com", "no-reply"],
    ["slidesgo.com", "info"],
    ["support.facebook.com", "advertising"],
    ["uefa.com", "no-reply"],
    ["vkcloud.kz", "info"],
    ["wordwall.net", "donotreply"],
    ["worldsbeyondnft.com", "noreply"],
  ],
].map((column) => column.map(([domain, ...users]) => ({ domain, users })));

const FEATURED_EMAILS = [
  {
    id: "em-phish-01",
    senderName: "Alex Vance (via external relay)",
    senderEmail: "alex.vance@silenceai-support.co",
    recipient: "elena.r@silenceai.net",
    recipientName: "Elena Rostova (CFO)",
    subject: "URGENT: Confidential Acquisition & Wire Transfer Authorization",
    preview:
      "Elena, I am in a board meeting right now and cannot talk on the phone. Please prepare a wire transfer of $84,500...",
    dateFormatted: "10:42 AM",
    timestamp: "2026-09-20T10:42:15Z",
    folder: "phishing",
    threatType: "phishing",
    isRead: false,
    isImportant: true,
    isDeleted: false,
    securityAnalysis: {
      verdict: "Zero-Day Phishing Intercepted",
      level: "critical",
      spoofScore: 96,
      dkimSpf: "FAIL (Domain mismatch: silenceai-support.co != silenceai.net)",
      summary:
        "High-confidence executive impersonation (CEO fraud). The sender address uses a typo-squatted lookalike domain designed to bypass visual inspection. Urgency patterns and wire transfer instructions detected.",
      aiActionTaken:
        "Quarantined before delivery. Admin alert broadcasted to Security Operations.",
      detectedLinks: [
        {
          url: "https://silenceai-support.co/wire-portal/auth",
          targetHost: "silenceai-support.co",
          status: "malicious",
          action: "Blocked by AI-CSD Web Filter",
        },
      ],
      attachments: [],
      aiSuggestedAction:
        "Permanently delete across domain and add originating subnet /24 to CMC blacklist.",
    },
    body: `Elena,

I am currently tied up in an offsite strategic board meeting with our European investors and cannot take voice calls.

We are closing an expedited acquisition deal that requires immediate escrow settlement before 12:00 PM UTC. Please execute an urgent wire authorization of $84,500 to the intermediary account provided in the secure portal below:

Portal: https://silenceai-support.co/wire-portal/auth
Ref: ACQ-2026-EU-ESCROW

Do not discuss this on Slack as this transaction is under strict NDA until public market disclosure on Monday. Confirm once initiated.

Alex Vance
Chief Executive Officer
Silence AI LLC`,
  },
  {
    id: "em-link-02",
    senderName: "Microsoft 365 Security Alert",
    senderEmail: "account-update@m1crosoft-online-sec.com",
    recipient: "d.chen@silenceai.net",
    recipientName: "David Chen (Tech Lead)",
    subject: "Action Required: Enterprise SSO Session Expiring in 24 Hours",
    preview:
      "Your Microsoft Entra ID authentication token requires re-validation. Failure to confirm will suspend active GitHub & Azure deployments...",
    dateFormatted: "09:55 AM",
    timestamp: "2026-09-20T09:55:00Z",
    folder: "dangerous_links",
    threatType: "dangerous_links",
    isRead: false,
    isImportant: false,
    isDeleted: false,
    securityAnalysis: {
      verdict: "Dangerous Link Neutralized",
      level: "high",
      spoofScore: 89,
      dkimSpf: "FAIL (Untrusted IP 185.220.101.5)",
      summary:
        "Credential harvesting attack. The email mimics Microsoft 365 Entra ID alerts, routing through an unverified VPS hosting an adversary-in-the-middle (AiTM) reverse proxy.",
      aiActionTaken:
        "URL neutralized with zero-delay browser isolation redirect.",
      detectedLinks: [
        {
          url: "https://login-m1crosoft-online-sec.com/entra/oauth2/reauth",
          targetHost: "m1crosoft-online-sec.com",
          status: "malicious",
          action: "Replaced with AI-CSD Warning Barrier",
        },
      ],
      attachments: [],
      aiSuggestedAction:
        "Domain-wide URL purge completed. 0 employees entered credentials.",
    },
    body: `Notice: Silence AI Enterprise Administrator Portal

Your Single Sign-On (SSO) security token for Microsoft 365 & Azure Enterprise is scheduled to expire within 24 hours.

If this session is not re-authenticated immediately, your organization's API pipelines, repository webhooks, and cloud deploy tokens will be temporarily locked to prevent unauthorized privilege escalation.

Verify your account immediately:
https://login-m1crosoft-online-sec.com/entra/oauth2/reauth

Security ID: SEC-9941-MSFT
Tenant: silenceai.net`,
  },
  {
    id: "em-malware-03",
    senderName: "Global Logistics Billing",
    senderEmail: "invoicing@apex-logistics-corp.net",
    recipient: "support@silenceai.net",
    recipientName: "Support Queue",
    subject: "Overdue Remittance & Freight Statement #INV-771204",
    preview:
      "Attached is the corrected freight invoice and tariff breakdown for container shipping manifest. Please remit pending balance...",
    dateFormatted: "09:12 AM",
    timestamp: "2026-09-20T09:12:30Z",
    folder: "malware",
    threatType: "malware",
    isRead: true,
    isImportant: false,
    isDeleted: false,
    securityAnalysis: {
      verdict: "Malware in Attachment Blocked",
      level: "critical",
      spoofScore: 45,
      dkimSpf: "PASS (Compromised legitimate vendor account)",
      summary:
        "Weaponized Excel macro detected. Attachment contains obfuscated VBA payload configured to download a remote Trojan RAT upon workbook open.",
      aiActionTaken:
        "Infected attachment sanitized & stripped. Safe sanitized text forwarded with alert.",
      detectedLinks: [],
      attachments: [
        {
          name: "Invoice_Remittance_Overdue_771204.xlsm",
          size: "348 KB",
          type: "application/vnd.ms-excel.sheet.macroEnabled.12",
          isMalicious: true,
          scanStatus: "Blocked",
          virusTotalVerdict:
            "Trojan.Downloader.VBA.Agent (58/72 engines flagged)",
          sha256:
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        },
      ],
      aiSuggestedAction:
        "Quarantine attachment, alert vendor of compromised email account.",
    },
    body: `Hello Accounts Payable,

Please find attached the updated remittance advice and statement of account regarding airfreight billings for shipment REF-44029.

Due to changes in port tariffs, a differential surcharge has been applied. Review the attached breakdown in the Excel spreadsheet to ensure your payments balance before end of month:

Attachment: Invoice_Remittance_Overdue_771204.xlsm [BLOCKED BY AI-CSD DEFENSE]

Best regards,
Billing Operations
Apex Logistics Global`,
  },
  {
    id: "em-clean-04",
    senderName: "Sarah Jenkins",
    senderEmail: "sarah.jenkins@fintech-partners.io",
    recipient: "d.chen@silenceai.net",
    recipientName: "David Chen (Tech Lead)",
    subject: "API Integration SLA & Dedicated Enterprise Node Contract",
    preview:
      "Hi David, our legal team reviewed the API security spec for the AI-CSD gateway. Everything looks solid, we're ready to proceed with the Q4 deployment...",
    dateFormatted: "08:30 AM",
    timestamp: "2026-09-20T08:30:00Z",
    folder: "secure",
    threatType: "secure",
    isRead: true,
    isImportant: true,
    isDeleted: false,
    securityAnalysis: {
      verdict: "Verified Safe",
      level: "safe",
      spoofScore: 0,
      dkimSpf: "PASS (DMARC Aligned: fintech-partners.io)",
      summary:
        "Legitimate corporate correspondence. Full cryptographic authentication passed. Content and links verified against real-time threat intelligence feeds.",
      aiActionTaken: "Delivered to Secure Inbox. AI Response Draft prepared.",
      detectedLinks: [
        {
          url: "https://fintech-partners.io/docs/integration-v2",
          targetHost: "fintech-partners.io",
          status: "clean",
          action: "Verified Clean",
        },
      ],
      attachments: [
        {
          name: "SLA_Agreement_Q4_v3.pdf",
          size: "1.2 MB",
          type: "application/pdf",
          isMalicious: false,
          scanStatus: "Clean",
          virusTotalVerdict: "No threats detected (0/72 engines)",
          sha256:
            "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
        },
      ],
      aiSuggestedAction:
        "Send pre-generated AI response draft or schedule review.",
    },
    aiDraftReply: `Hi Sarah,

Thank you for confirming the SLA and security review. We are excited to partner with FinTech Partners.

I've reviewed the updated PDF and our team has allocated the dedicated private node cluster for your staging rollout next Tuesday. I will share the cryptographic keys and gateway endpoints via our secure developer portal tomorrow morning.

Best regards,
David Chen
Tech Lead · Silence AI`,
    body: `Hi David,

Our infrastructure and legal teams have completed their formal review of the AI-CSD Email & Web Gateway integration spec. 

We are very impressed with the sub-millisecond inspection latency and automated impersonation detection. Everything aligns with our regulatory SOC 2 Type II compliance mandate.

Attached is the finalized enterprise SLA agreement for your countersignature:
- Attachment: SLA_Agreement_Q4_v3.pdf

Could we schedule a quick 15-minute handoff call on Monday to finalize the private staging keys?

Looking forward to launching!

Best regards,
Sarah Jenkins
VP of Technology Integrations
FinTech Partners International`,
  },
  {
    id: "em-clean-05",
    senderName: "Silence AI DevOps Automation",
    senderEmail: "infra-alerts@silenceai.net",
    recipient: "alex.vance@silenceai.net",
    recipientName: "Alex Vance (CEO)",
    subject:
      "Automated Report: Weekly Zero-Day Defense Health & Threat Mitigation",
    preview:
      "All 128 protected mailboxes operating at 100% uptime. 142 total threats intercepted this week with zero false negatives...",
    dateFormatted: "Yesterday",
    timestamp: "2026-09-19T18:00:00Z",
    folder: "secure",
    threatType: "secure",
    isRead: true,
    isImportant: false,
    isDeleted: false,
    securityAnalysis: {
      verdict: "Verified Safe Internal System",
      level: "safe",
      spoofScore: 0,
      dkimSpf: "PASS (Internal Cryptographic Signature)",
      summary:
        "Internal cluster monitoring dispatch. TLS 1.3 encrypted, zero anomalies.",
      aiActionTaken: "Delivered to Secure Inbox.",
      detectedLinks: [],
      attachments: [],
      aiSuggestedAction: "Archived after review.",
    },
    body: `Weekly Security Summary for Tenant: silenceai.net

Key Metrics for past 7 days:
- Protected Mailboxes: 128
- Total Inbound / Outbound Scanned: 34,812 emails
- Malicious Links Neutralized: 32
- Impersonation / CEO Spoofs Blocked: 18
- Zero-Day Phishing Kits Stopped: 27
- Infected Attachments Stripped: 20
- Spam Filtered: 45

System Status:
- AI-CSD Gateway Latency: 1.8ms avg
- Admin Console: Fully Operational
- Anti-Impersonation Engine: Active (Strict Mode)`,
  },
  {
    id: "em-spam-06",
    senderName: "Crypto Capital Yield",
    senderEmail: "newsletter@crypto-super-wealth.biz",
    recipient: "m.gomez@silenceai.net",
    recipientName: "Maria Gomez (HR)",
    subject: "Guaranteed 450% APY on AI Automated Liquidity Pools",
    preview:
      "Exclusive invitation for accredited investors. Learn how proprietary arbitrage algorithms beat market downturns...",
    dateFormatted: "Sep 18",
    timestamp: "2026-09-18T14:20:00Z",
    folder: "spam",
    threatType: "spam",
    isRead: false,
    isImportant: false,
    isDeleted: false,
    securityAnalysis: {
      verdict: "Unsolicited Bulk Spam",
      level: "medium",
      spoofScore: 62,
      dkimSpf: "NEUTRAL",
      summary:
        "Mass-mailing marketing spam campaign from unregistered commercial sender with low domain reputation score.",
      aiActionTaken: "Routed to Spam folder automatically.",
      detectedLinks: [
        {
          url: "https://crypto-super-wealth.biz/optin",
          targetHost: "crypto-super-wealth.biz",
          status: "suspicious",
          action: "Low reputation domain",
        },
      ],
      attachments: [],
      aiSuggestedAction: "Leave in spam for automatic 30-day purge.",
    },
    body: `Dear Investor,

Discover our proprietary automated arbitrage trading protocol that delivers up to 450% APY without market exposure risk!

Sign up today to receive our free whitepaper and immediate beta access:
https://crypto-super-wealth.biz/optin

Click here to unsubscribe from all marketing communications.`,
  },
];

export const INITIAL_ACTIVITY_LOGS = [
  {
    id: "log-1",
    time: "10:42:15",
    type: "CRITICAL",
    category: "CEO Impersonation",
    sender: "alex.vance@silenceai-support.co",
    target: "elena.r@silenceai.net",
    action: "Quarantined by AI-CSD",
    detail:
      "Lookalike domain detected (96% spoof score). Prevented fraudulent wire transfer.",
  },
  {
    id: "log-2",
    time: "09:55:01",
    type: "HIGH",
    category: "Credential Harvesting",
    sender: "account-update@m1crosoft-online-sec.com",
    target: "d.chen@silenceai.net",
    action: "Dangerous Link Neutralized",
    detail: "Replaced phishing URL with zero-trust isolation page.",
  },
  {
    id: "log-3",
    time: "09:12:30",
    type: "CRITICAL",
    category: "Weaponized Macro",
    sender: "invoicing@apex-logistics-corp.net",
    target: "support@silenceai.net",
    action: "Attachment Blocked",
    detail:
      "Trojan.Downloader.VBA stripped from incoming invoice .xlsm workbook.",
  },
  {
    id: "log-4",
    time: "08:30:00",
    type: "SAFE",
    category: "Verified Delivery",
    sender: "sarah.jenkins@fintech-partners.io",
    target: "d.chen@silenceai.net",
    action: "Delivered + AI Draft Ready",
    detail: "DKIM/SPF passed. AI response draft generated.",
  },
  {
    id: "log-5",
    time: "08:14:22",
    type: "INFO",
    category: "Gateway IPS",
    sender: "185.220.101.5 (Port 25)",
    target: "MX Gateway",
    action: "IP Blocked",
    detail: "Automated brute-force SMTP handshake throttled and blacklisted.",
  },
];

export const TOPOLOGY_DATA = {
  company: {
    domain: "silenceai.net",
    name: "Silence AI (Protected Domain)",
    status: "Active Shield",
    shieldLevel: "Strict Enterprise",
  },
  employees: [
    {
      id: "e1",
      name: "Alex Vance",
      email: "alex.vance@silenceai.net",
      role: "CEO",
      count: 842,
      avatar: "AV",
      threats: 1,
    },
    {
      id: "e2",
      name: "Elena Rostova",
      email: "elena.r@silenceai.net",
      role: "CFO",
      count: 1240,
      avatar: "ER",
      threats: 1,
    },
    {
      id: "e3",
      name: "David Chen",
      email: "d.chen@silenceai.net",
      role: "Tech Lead",
      count: 2150,
      avatar: "DC",
      threats: 1,
    },
    {
      id: "e4",
      name: "Maria Gomez",
      email: "m.gomez@silenceai.net",
      role: "HR Lead",
      count: 680,
      avatar: "MG",
      threats: 1,
    },
    {
      id: "e5",
      name: "Support Desk",
      email: "support@silenceai.net",
      role: "Helpdesk",
      count: 3410,
      avatar: "SD",
      threats: 1,
    },
  ],
  externalDomains: [
    {
      domain: "fintech-partners.io",
      label: "FinTech Partners",
      type: "clean",
      traffic: 412,
    },
    {
      domain: "google.com",
      label: "Google Workspace",
      type: "clean",
      traffic: 1890,
    },
    {
      domain: "silenceai-support.co",
      label: "Fake Support (Attacker)",
      type: "threat",
      threats: 1,
    },
    {
      domain: "m1crosoft-online-sec.com",
      label: "Phish Host (Attacker)",
      type: "threat",
      threats: 1,
    },
    {
      domain: "apex-logistics-corp.net",
      label: "Compromised Vendor",
      type: "threat",
      threats: 1,
    },
  ],
};

const SAFE_ANALYSIS = {
  verdict: "Verified Safe",
  level: "safe",
  spoofScore: 0,
  dkimSpf: "PASS (DKIM / SPF / DMARC aligned)",
  summary:
    "Authenticated sender. No suspicious links or attachments in this demonstration message.",
  aiActionTaken: "Delivered to Secure Inbox.",
  detectedLinks: [],
  attachments: [],
};
const subjects = [
  "Your account activity summary",
  "Your workspace is ready",
  "Security notification",
  "Your weekly update",
  "Account confirmation",
  "Your service receipt",
  "New activity in your workspace",
];
const topologyEmails = DOMAIN_COLUMNS.flatMap((column, c) =>
  column.flatMap(({ domain, users }, r) =>
    users.map((sender, u) => {
      const recipient = COMPANY_USERS[(c + r + u) % COMPANY_USERS.length].email;
      const subject = `${domain} — ${subjects[r]}`;
      return {
        id: `topology-${c}-${r}-${u}`,
        campaignId: `topology-${c}-${r}-${u}`,
        senderName: domain,
        senderEmail: `${sender}@${domain}`,
        recipient,
        subject,
        preview: `Hello ${recipient.split("@")[0]}, your ${domain} workspace update is ready to review.`,
        body: `Hello ${recipient.split("@")[0]},\n\n${subject}.\n\nYour workspace activity has been processed successfully. You can review the summary at your next sign-in. No changes to your account are required.\n\nThank you,\nThe ${domain} team`,
        timestamp: new Date(
          DEMO_NOW - ((c * 7 + r) * 40 + u * 10 + 30) * 60000,
        ).toISOString(),
        folder: "secure",
        threatType: "secure",
        direction: "incoming",
        isRead: (r + u) % 3 !== 0,
        isImportant: false,
        securityAnalysis: SAFE_ANALYSIS,
      };
    }),
  ),
);
const outgoingEmails = DOMAIN_COLUMNS.flatMap((column, c) =>
  column.map(({ domain, users }, r) => ({
    id: `outgoing-${c}-${r}`,
    campaignId: `outgoing-${c}-${r}`,
    senderName: "Silence AI",
    senderEmail: COMPANY_USERS[(c + r) % 6].email,
    recipient: `${users[0]}@${domain}`,
    subject: `Re: ${domain} — ${subjects[r]}`,
    preview: "Thank you for the update. We have reviewed the account summary.",
    body: "Hello,\n\nThank you for the update. We have reviewed the account summary and everything is in order.\n\nBest regards,\nSilence AI",
    timestamp: new Date(
      DEMO_NOW - ((c * 7 + r) * 35 + 10) * 60000,
    ).toISOString(),
    folder: "sent",
    threatType: "secure",
    direction: "outgoing",
    isRead: true,
    isImportant: false,
    securityAnalysis: SAFE_ANALYSIS,
  })),
);
export const INITIAL_EMAILS = [
  ...FEATURED_EMAILS.map((email) => ({
    ...email,
    campaignId: email.id,
    direction: "incoming",
  })),
  // A second delivery of the same campaign makes domain-wide deletion observable.
  {
    ...FEATURED_EMAILS[0],
    id: "em-phish-01-copy",
    campaignId: "em-phish-01",
    direction: "incoming",
    recipient: "jmqst011@silenceai.net",
  },
  ...topologyEmails,
  ...outgoingEmails,
];

export function createAttack(sequence, now) {
  const malware = sequence % 2 === 0;
  const original = FEATURED_EMAILS[malware ? 2 : 0];
  const campaignId = `attack-${sequence}`;
  return [ACCOUNT, "jmqst011@silenceai.net"].map((recipient, index) => ({
    ...structuredClone(original),
    id: `${campaignId}-${index}`,
    campaignId,
    recipient,
    subject: malware
      ? `Macro Malware: Updated vendor rates #${sequence}`
      : `CEO Fraud: Confidential wire authorization #${sequence}`,
    senderEmail: malware
      ? "billing@vendor-remittance.example"
      : "alex.vance@silenceai-board.example",
    timestamp: new Date(now).toISOString(),
    isRead: false,
    direction: "incoming",
    simulated: true,
    securityAnalysis: {
      ...structuredClone(original.securityAnalysis),
      verdict: malware
        ? "Zero-Day Macro Malware Blocked"
        : "Zero-Day CEO Fraud Intercepted",
      level: "critical",
      detectedLinks: malware
        ? [
            {
              url: "https://vendor-remittance.example/payload",
              targetHost: "vendor-remittance.example",
              status: "malicious",
              action: "Macro download blocked",
            },
          ]
        : original.securityAnalysis.detectedLinks,
    },
  }));
}

export function makeOutgoing({
  id,
  recipient,
  subject,
  body,
  folder = "sent",
  scheduledAt,
  replyToId,
}) {
  return {
    id,
    campaignId: id,
    senderName: "Elena Rostova",
    senderEmail: ACCOUNT,
    recipient,
    subject,
    body,
    preview: body.slice(0, 160),
    timestamp: new Date(DEMO_NOW).toISOString(),
    direction: "outgoing",
    folder,
    scheduledAt,
    replyToId,
    isRead: true,
    isImportant: false,
    threatType: "secure",
    securityAnalysis: { ...SAFE_ANALYSIS },
  };
}
