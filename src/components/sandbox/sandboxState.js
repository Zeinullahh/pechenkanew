import { SERVER_DEMO_NOW, INITIAL_SERVERS, INITIAL_SENSORS, INITIAL_INCIDENTS, INITIAL_RESPONSES, INITIAL_EVENTS, INITIAL_PACKAGES, INITIAL_POSTURE_CHECKS, INITIAL_POLICY, INITIAL_PROVISIONING } from './serverMockData.js';
import { normalizeIPOrCIDR, validateServerSecurityPolicy } from './server/server-security-policy.mjs';
import {
  DEMO_NOW,
  INITIAL_EMAILS,
  INITIAL_ACTIVITY_LOGS,
  createAttack,
  makeOutgoing,
} from "./mockData.js";
import {
  INITIAL_WEBSOC_AGENTS,
  INITIAL_WEBSOC_METRICS,
  INITIAL_WEBSOC_TOP_COUNTRIES,
  INITIAL_WEBSOC_PAYMENTS,
  generateHistoricalStats,
} from "./websocMockData.js";

export function createInitialState() {
  return { ...createInitialEmailState(), websoc: createInitialWebState().websoc };
}

export function createInitialEmailState() {
  return {
    emails: structuredClone(INITIAL_EMAILS),
    logs: structuredClone(INITIAL_ACTIVITY_LOGS),
    mode: "cmc",
    selectedEmailId: null,
    folder: "unfiltered",
    search: "",
    sequence: 0,
    now: DEMO_NOW,
    resetVersion: 0,
    toast: null,
    customFolders: [],
  };
}

export function createInitialWebState() {
  return {
    resetVersion: 0,
    toast: null,
    websoc: {
      agents: structuredClone(INITIAL_WEBSOC_AGENTS),
      selectedDomains: [],
      selectedParam: "Bandwidth",
      selectedRange: "1 day",
      selectedChartWindow: null,
      theme: "primary",
      blacklist: ["KP", "IR"],
      underAttack: false,
      anomalyMsg: null,
      liveMetrics: structuredClone(INITIAL_WEBSOC_METRICS),
      topCountries: structuredClone(INITIAL_WEBSOC_TOP_COUNTRIES),
      statsHistory: generateHistoricalStats("1 day", false),
      userBalance: 1250.0,
      paymentHistory: structuredClone(INITIAL_WEBSOC_PAYMENTS),
    },
  };
}

export function emailSandboxReducer(state, action) {
  if (action.type.startsWith("WEBSOC_")) return state;
  if (action.type === "MODE" && !["cmc", "webmail"].includes(action.mode)) {
    return state;
  }
  if (action.type === "RESET") {
    return { ...createInitialEmailState(), resetVersion: state.resetVersion + 1 };
  }
  const { websoc: _websoc, ...emailState } = sandboxReducer(state, action);
  return emailState;
}

export function webSandboxReducer(state, action) {
  if (action.type === "RESET") {
    return { ...createInitialWebState(), resetVersion: state.resetVersion + 1 };
  }
  if (action.type === "ATTACK") {
    const attackMetrics = structuredClone(state.websoc.liveMetrics);
    if (!attackMetrics["silenceai.net"]) attackMetrics["silenceai.net"] = {};
    attackMetrics["silenceai.net"].RU = {
      "Requests per second (RPS)": 4850,
      "Bandwidth usage": 1468006400,
      "Number of IP addresses with active connection(s)": 12450,
      "Processed requests": 145500,
    };
    return {
      ...state,
      websoc: {
        ...state.websoc,
        underAttack: true,
        anomalyMsg: "CRITICAL: 4,850 RPS L7 DDoS flood detected targeting silenceai.net origin from RU/CN botnet. Silence WAF auto-mitigation active.",
        liveMetrics: attackMetrics,
        topCountries: [
          {
            countryCode: "Russian Federation (RU)",
            country: "Russian Federation",
            code: "RU",
            activeIps: 12450,
            bandwidthUsage: 1468006400,
            requestsPerSecond: 4850,
          },
          ...state.websoc.topCountries.filter((country) => country.code !== "RU"),
        ],
        statsHistory: generateHistoricalStats(state.websoc.selectedRange, true),
      },
      toast: {
        title: "Simulated web attack intercepted",
        detail: "WAF rate limiting is active for the detected L7 DDoS flood.",
        type: "critical",
      },
    };
  }
  if (action.type.startsWith("WEBSOC_") || action.type === "DISMISS_TOAST") {
    return sandboxReducer(state, action);
  }
  return state;
}
const eventLog = (state, category, detail, action = category) => ({
  id: `audit-${state.sequence + 1}`,
  time: new Date(state.now).toISOString().slice(11, 19),
  category,
  detail,
  action,
  type: "ADMIN",
});
export function sandboxReducer(state, action) {
  switch (action.type) {
    case "MODE":
      return { ...state, mode: action.mode };
    case "FOLDER":
      return {
        ...state,
        folder: action.folder,
        selectedEmailId: null,
        search: "",
      };
    case "SEARCH":
      return { ...state, search: action.query, selectedEmailId: null };
    case "OPEN": {
      const email = state.emails.find((e) => e.id === action.id);
      if (!email) return state;
      return {
        ...state,
        mode: action.fromCmc ? "webmail" : state.mode,
        folder: action.fromCmc ? email.folder : state.folder,
        search: action.fromCmc ? "" : state.search,
        selectedEmailId: email.id,
        emails: state.emails.map((e) =>
          e.id === email.id ? { ...e, isRead: true } : e,
        ),
      };
    }
    case "STAR":
      return {
        ...state,
        emails: state.emails.map((e) =>
          e.id === action.id ? { ...e, isImportant: !e.isImportant } : e,
        ),
      };
    case "READ":
      return {
        ...state,
        emails: state.emails.map((e) =>
          e.id === action.id ? { ...e, isRead: !e.isRead } : e,
        ),
      };
    case "PURGE": {
      const email = state.emails.find((e) => e.id === action.id);
      if (!email) return state;
      const copies = state.emails.filter(
        (e) => (e.campaignId || e.id) === (email.campaignId || email.id),
      );
      const ids = new Set(copies.map((e) => e.id));
      const detail = `Purged “${email.subject}” from ${copies.length} domain mailbox${copies.length === 1 ? "" : "es"}.`;
      return {
        ...state,
        sequence: state.sequence + 1,
        emails: state.emails.filter((e) => !ids.has(e.id)),
        selectedEmailId: ids.has(state.selectedEmailId)
          ? null
          : state.selectedEmailId,
        logs: [
          eventLog(state, "Admin Domain Purge", detail, "Permanently Deleted"),
          ...state.logs,
        ],
        toast: { title: "Domain-wide purge complete", detail, type: "success" },
      };
    }
    case "TRASH":
      return {
        ...state,
        selectedEmailId: null,
        emails: state.emails.map((e) =>
          e.id === action.id
            ? { ...e, previousFolder: e.folder, folder: "trash" }
            : e,
        ),
      };
    case "RESTORE":
      return {
        ...state,
        selectedEmailId: null,
        emails: state.emails.map((e) =>
          e.id === action.id
            ? { ...e, folder: e.previousFolder || "secure" }
            : e,
        ),
      };
    case "ATTACK": {
      const sequence = state.sequence + 1;
      const now = state.now + 60000;
      const attacks = createAttack((state.attackCount || 0) + 1, now);
      const detail = `${attacks[0].securityAnalysis.verdict}. ${attacks.length} deliveries quarantined.`;

      const attackMetrics = structuredClone(state.websoc?.liveMetrics || INITIAL_WEBSOC_METRICS);
      if (!attackMetrics["silenceai.net"]) attackMetrics["silenceai.net"] = {};
      attackMetrics["silenceai.net"]["RU"] = {
        "Requests per second (RPS)": 4850.0,
        "Bandwidth usage": 1468006400,
        "Number of IP addresses with active connection(s)": 12450,
        "Processed requests": 145500,
      };

      const attackTopCountries = [
        {
          countryCode: "Russian Federation (RU)",
          country: "Russian Federation",
          code: "RU",
          activeIps: 12450,
          bandwidthUsage: 1468006400,
          requestsPerSecond: 4850.0,
        },
        ...(state.websoc?.topCountries || INITIAL_WEBSOC_TOP_COUNTRIES).filter((c) => c.code !== "RU"),
      ];

      return {
        ...state,
        sequence,
        now,
        attackCount: (state.attackCount || 0) + 1,
        emails: [...attacks, ...state.emails],
        websoc: {
          ...state.websoc,
          underAttack: true,
          anomalyMsg:
            "CRITICAL: 4,850 RPS L7 DDoS flood detected targeting silenceai.net origin from RU/CN botnet. Silence WAF auto-mitigation active.",
          liveMetrics: attackMetrics,
          topCountries: attackTopCountries,
          statsHistory: generateHistoricalStats(state.websoc?.selectedRange || "1 day", true),
        },
        logs: [
          eventLog(
            { ...state, now },
            "Attack Intercepted",
            detail,
            "Quarantined by AI-CSD",
          ),
          ...state.logs,
        ],
        toast: {
          title: "Simulated zero-day attack intercepted",
          detail,
          type: "critical",
        },
      };
    }
    case "GENERATE_REPLY":
      return {
        ...state,
        emails: state.emails.map((e) =>
          e.id === action.id
            ? {
                ...e,
                replyDraft:
                  e.aiDraftReply ||
                  (e.threatType === "secure"
                    ? `Hello ${e.senderName},\n\nThank you for your message regarding “${e.subject}”. I will review the details and follow up shortly.\n\nBest regards,\nElena`
                    : `Security team,\n\nPlease review the quarantined message “${e.subject}” from ${e.senderEmail}. AI-CSD reported: ${e.securityAnalysis?.summary}\n\nPlease verify the sender through a trusted channel before taking any action.\n\nElena`),
              }
            : e,
        ),
      };
    case "EDIT_REPLY":
      return {
        ...state,
        emails: state.emails.map((e) =>
          e.id === action.id ? { ...e, replyDraft: action.body } : e,
        ),
      };
    case "SEND_REPLY": {
      const email = state.emails.find((e) => e.id === action.id);
      if (!email?.replyDraft?.trim()) return state;
      const reply = makeOutgoing({
        id: `reply-${state.sequence + 1}`,
        recipient:
          email.threatType === "secure"
            ? email.senderEmail
            : "security@silenceai.net",
        subject: `Re: ${email.subject}`,
        body: email.replyDraft,
        replyToId: email.id,
      });
      return {
        ...state,
        sequence: state.sequence + 1,
        emails: [
          reply,
          ...state.emails.map((e) =>
            e.id === email.id
              ? { ...e, autoResponded: true, replyDraft: "", replySent: true }
              : e,
          ),
        ],
        toast: {
          title: "Reply sent in demo",
          detail: `Delivered to ${reply.recipient}. Available in Sent.`,
          type: "success",
        },
      };
    }
    case "COMPOSE": {
      const email = makeOutgoing({
        ...action.email,
        id: action.email.id || `composed-${state.sequence + 1}`,
      });
      return {
        ...state,
        sequence: state.sequence + 1,
        emails: [email, ...state.emails.filter((e) => e.id !== email.id)],
        toast: {
          title:
            email.folder === "drafts"
              ? "Draft saved"
              : email.folder === "scheduled"
                ? "Email scheduled"
                : "Email sent in demo",
          detail: email.subject,
          type: "success",
        },
      };
    }
    case "SEND_SCHEDULED":
      return {
        ...state,
        emails: state.emails.map((e) =>
          e.id === action.id ? { ...e, folder: "sent", scheduledAt: null } : e,
        ),
        toast: {
          title: "Scheduled email sent in demo",
          detail: "Available in Sent.",
          type: "success",
        },
      };
    case "ADD_FOLDER": {
      const name = action.name.trim();
      if (
        !name ||
        state.customFolders.some(
          (f) => f.name.toLowerCase() === name.toLowerCase(),
        )
      )
        return state;
      return {
        ...state,
        sequence: state.sequence + 1,
        customFolders: [
          ...state.customFolders,
          { id: `folder-${state.sequence + 1}`, name },
        ],
      };
    }
    case "MOVE":
      return {
        ...state,
        selectedEmailId: null,
        emails: state.emails.map((e) =>
          e.id === action.id ? { ...e, customFolder: action.folder } : e,
        ),
      };
    case "AI_CREATE_AND_MOVE_FOLDER": {
      const folderName = action.folderName || "Finance & Audit";
      const folderId = action.folderId || "finance";
      const existing = state.customFolders.find(
        (f) => f.id === folderId || f.name.toLowerCase() === folderName.toLowerCase(),
      );
      const customFolders = existing
        ? state.customFolders
        : [...state.customFolders, { id: folderId, name: folderName }];

      let movedCount = 0;
      const emails = state.emails.map((e) => {
        const isMatch =
          action.emailIds
            ? action.emailIds.includes(e.id)
            : /invoice|wire|remittance|sla|audit|financial|budget|tax|payment|finance/i.test(
                `${e.subject} ${e.body} ${e.senderEmail}`,
              );
        if (isMatch) {
          movedCount++;
          return { ...e, customFolder: folderId };
        }
        return e;
      });

      const detail = `Фолдер «${folderName}» создан: ${movedCount} писем перенаправлено.`;
      return {
        ...state,
        sequence: state.sequence + 1,
        customFolders,
        emails,
        logs: [
          eventLog(state, "AI Mail Organization", detail, "Folder Created & Routed"),
          ...state.logs,
        ],
        toast: {
          title: `Фолдер «${folderName}» создан`,
          detail: `${movedCount} писем перенаправлено в новую папку`,
          type: "success",
        },
      };
    }
    case "TOAST":
      return { ...state, toast: action.toast };
    case "DISMISS_TOAST":
      return { ...state, toast: null };
    case "WEBSOC_PARAM":
      return {
        ...state,
        websoc: { ...state.websoc, selectedParam: action.param },
      };
    case "WEBSOC_THEME":
      return {
        ...state,
        websoc: { ...state.websoc, theme: action.theme },
      };
    case "WEBSOC_RANGE":
      return {
        ...state,
        websoc: {
          ...state.websoc,
          selectedRange: action.range,
          selectedChartWindow: null,
          statsHistory: generateHistoricalStats(
            action.range,
            state.websoc.underAttack,
          ),
        },
      };
    case "WEBSOC_SELECT_CHART_WINDOW":
      return {
        ...state,
        websoc: { ...state.websoc, selectedChartWindow: action.window },
      };
    case "WEBSOC_DOMAIN_TOGGLE": {
      const exists = state.websoc.selectedDomains.includes(action.domain);
      const selectedDomains = exists
        ? state.websoc.selectedDomains.filter((d) => d !== action.domain)
        : [...state.websoc.selectedDomains, action.domain];
      return {
        ...state,
        websoc: { ...state.websoc, selectedDomains },
      };
    }
    case "WEBSOC_BLACKLIST_ADD": {
      if (state.websoc.blacklist.includes(action.code)) return state;
      return {
        ...state,
        websoc: {
          ...state.websoc,
          blacklist: [...state.websoc.blacklist, action.code],
        },
      };
    }
    case "WEBSOC_BLACKLIST_REMOVE":
      return {
        ...state,
        websoc: {
          ...state.websoc,
          blacklist: state.websoc.blacklist.filter((c) => c !== action.code),
        },
      };
    case "WEBSOC_ADD_AGENT": {
      const newAgent = {
        id: `agent-${state.websoc.agents.length + 1}`,
        domain: action.domain,
        ipAddress: action.ipAddress || "185.199.110.153",
        verified: true,
        dnsRouted: true,
        verificationKey: `ws-verif-${Math.random().toString(36).slice(2, 8)}`,
        ports: [80, 443],
        enable2FA: false,
      };
      return {
        ...state,
        websoc: {
          ...state.websoc,
          agents: [...state.websoc.agents, newAgent],
        },
      };
    }
    case "WEBSOC_DELETE_AGENT":
      return {
        ...state,
        websoc: {
          ...state.websoc,
          agents: state.websoc.agents.filter((a) => a.id !== action.id),
          selectedDomains: state.websoc.selectedDomains.filter(
            (d) => d !== action.domain,
          ),
        },
      };
    case "WEBSOC_VERIFY_AGENT":
      return {
        ...state,
        websoc: {
          ...state.websoc,
          agents: state.websoc.agents.map((a) =>
            a.id === action.id ? { ...a, verified: true, dnsRouted: true } : a,
          ),
        },
      };
    case "WEBSOC_UPDATE_AGENT_CONFIG":
      return {
        ...state,
        websoc: {
          ...state.websoc,
          agents: state.websoc.agents.map((a) =>
            a.id === action.id
              ? {
                  ...a,
                  ipAddress: action.ipAddress || a.ipAddress,
                  ports: action.ports || a.ports,
                  enable2FA:
                    action.enable2FA !== undefined
                      ? action.enable2FA
                      : a.enable2FA,
                }
              : a,
          ),
        },
      };
    case "WEBSOC_DISMISS_ANOMALY":
      return {
        ...state,
        websoc: { ...state.websoc, anomalyMsg: null },
      };
    case "WEBSOC_TOPUP": {
      const amount = Number(action.amount) || 100;
      const newPayment = {
        id: `txn_${Math.random().toString(36).slice(2, 10)}`,
        date: new Date().toISOString().replace("T", " ").slice(0, 16),
        amount: `$${amount.toFixed(2)}`,
        status: "Completed",
        currency: "USD",
      };
      return {
        ...state,
        websoc: {
          ...state.websoc,
          userBalance: state.websoc.userBalance + amount,
          paymentHistory: [newPayment, ...state.websoc.paymentHistory],
        },
      };
    }
    case "RESET":
      return { ...createInitialState(), resetVersion: state.resetVersion + 1 };
    default:
      return state;
  }
}
export const isTrafficEmail = (email) =>
  !["trash", "drafts", "scheduled"].includes(email.folder);
export const isIncoming = (email) =>
  isTrafficEmail(email) && email.direction !== "outgoing";
export function matchesFolder(email, folder) {
  if (["sent", "drafts", "trash", "scheduled"].includes(folder))
    return email.folder === folder;
  if (!isIncoming(email)) return false;
  if (folder === "unfiltered") return true;
  if (folder === "important") return email.isImportant;
  if (folder === "auto-responded") return Boolean(email.autoResponded);
  if (folder === "finance")
    return (
      email.customFolder === folder ||
      /invoice|wire|remittance|sla/i.test(email.subject)
    );
  if (folder === "executive")
    return email.customFolder === folder || email.isImportant;
  if (folder.startsWith("folder-")) return email.customFolder === folder;
  return email.threatType === folder;
}
export function matchesSearch(email, query) {
  const searchable = [
    email.subject,
    email.senderName,
    email.senderEmail,
    email.recipient,
    email.body,
    ...(email.securityAnalysis?.attachments || []).flatMap((a) => [
      a?.name,
      a?.sha256,
      a?.hash,
    ]),
    email.securityAnalysis?.dkimSpf,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return searchable.includes(query.trim().toLowerCase());
}
export const THREAT_CATEGORIES = [
  {
    name: "Possibly spoofed",
    color: "#eab308",
    matches: (e) =>
      e.threatType === "spoofing" || e.securityAnalysis?.spoofScore >= 80,
  },
  { name: "Spam", color: "#ef4444", matches: (e) => e.threatType === "spam" },
  {
    name: "Dangerous link",
    color: "#ef4444",
    matches: (e) => ["dangerous_links", "malware"].includes(e.threatType),
  },
  {
    name: "Possibly phishing",
    color: "#ef4444",
    matches: (e) => e.threatType === "phishing",
  },
  {
    name: "Secure emails",
    color: "#22c55e",
    matches: (e) => e.threatType === "secure",
  },
];
export function filterTraffic(
  emails,
  {
    direction = "incoming",
    from = "",
    subject = "",
    hours = 0,
    start = "",
    end = "",
    now = DEMO_NOW,
  } = {},
) {
  return emails.filter(
    (e) =>
      isTrafficEmail(e) &&
      e.direction === direction &&
      e.senderEmail.toLowerCase().includes(from.trim().toLowerCase()) &&
      e.subject.toLowerCase().includes(subject.trim().toLowerCase()) &&
      (!hours || Date.parse(e.timestamp) >= now - hours * 3600000) &&
      (!start || Date.parse(e.timestamp) >= Date.parse(start)) &&
      (!end || Date.parse(e.timestamp) <= Date.parse(end)),
  );
}

// A local, evidence-based assistant: every response uses the current inbox and selected incident.
export function answerSecurityQuestion(question, email, emails, logs) {
  const q = question.toLowerCase();
  const threats = emails.filter(
    (e) => isIncoming(e) && e.threatType !== "secure",
  );
  if (/переведи|перенаправ|папк|фолдер|folder|move.*to/.test(q)) {
    let folder = "Finance & Audit";
    if (/audit|аудит/i.test(q) && !/finance|финанс/i.test(q)) folder = "Audit";
    else if (/finance|финанс/i.test(q) && !/audit|аудит/i.test(q)) folder = "Finance";
    else if (/executive|руковод/i.test(q)) folder = "Executive Board";
    return `Фолдер «${folder}» был создан (кастомный фолдер добавлен в систему), и соответствующие письма были перенаправлены туда. Вы можете открыть его в боковом меню.`;
  }
  if (/purge|delet|удал|очист/.test(q))
    return `Use ADMIN: Domain-Wide Purge or Delete across entire domain to remove every delivery of the selected campaign from both products. ${logs.filter((l) => l.category === "Admin Domain Purge").length} purge operations are recorded in the CMC audit log.`;
  if (/how many|summary|overview|count|сколько|сводк/.test(q))
    return `There are ${threats.length} quarantined deliveries: ${threats.filter((e) => e.threatType === "phishing").length} phishing, ${threats.filter((e) => e.threatType === "malware").length} malware, ${threats.filter((e) => e.threatType === "dangerous_links").length} dangerous links, and ${threats.filter((e) => e.threatType === "spam").length} spam. Counts reflect your current demo actions.`;
  const match =
    emails.find(
      (e) =>
        q.includes(e.senderEmail.toLowerCase()) ||
        (q.includes("macro") && e.threatType === "malware") ||
        (/ceo|wire/.test(q) && e.threatType === "phishing"),
    ) || email;
  if (!match)
    return `Select an email to inspect an incident, or ask for a quarantine summary. The demo currently contains ${threats.length} quarantined deliveries.`;
  const analysis = match.securityAnalysis;
  if (/attach|macro|hash|virus|malware|влож|вирус|хеш/.test(q)) {
    const attachments = analysis?.attachments || [];
    return attachments.length
      ? attachments
          .map(
            (a) =>
              `${a?.name || "Attachment"}: ${a?.virusTotalVerdict || "No scan result"}. SHA-256: ${a?.sha256 || a?.hash || "not available"}. ${a?.isMalicious ? "Download is blocked." : "Clean in the demonstration scan."}`,
          )
          .join("\n")
      : `“${match.subject}” has no attachments. ${analysis?.summary || ""}`;
  }
  if (/dkim|spf|spoof|sender|отправ|подмен/.test(q))
    return `Sender: ${match.senderEmail}. Authentication: ${analysis?.dkimSpf || "Unknown"}. Spoof score: ${analysis?.spoofScore ?? "Unknown"}/100. ${analysis?.summary || ""}`;
  if (/link|url|ссыл/.test(q))
    return (
      (analysis?.detectedLinks || [])
        .map((l) => `${l.url}: ${l.status}. ${l.action}.`)
        .join("\n") || "The selected message contains no detected links."
    );
  return `For “${match.subject}”: ${analysis?.verdict || "Awaiting analysis"}. ${analysis?.summary || ""} ${analysis?.aiSuggestedAction || analysis?.aiActionTaken || ""} This local assistant can explain sender authentication, links, attachment hashes, quarantine counts, and purge history from the demo data.`;
}

// Server Security has its own reducer and per-server fixtures; it never enters the
// legacy combined email/WebSOC reducer.
export function createInitialServerState(now = SERVER_DEMO_NOW) {
  const rebase = value => {
    if (Array.isArray(value)) return value.map(rebase);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, rebase(entry)]));
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) return new Date(Date.parse(value) + now - SERVER_DEMO_NOW).toISOString();
    return value;
  };
  const servers = rebase(INITIAL_SERVERS);
  const profile = () => rebase({ sensors: INITIAL_SENSORS, incidents: INITIAL_INCIDENTS, responses: INITIAL_RESPONSES, events: INITIAL_EVENTS, inventory: INITIAL_PACKAGES, postureChecks: INITIAL_POSTURE_CHECKS, policy: INITIAL_POLICY, provisioning: INITIAL_PROVISIONING });
  const byAgent = Object.fromEntries(servers.map(agent => [agent.id, profile()]));
  byAgent['srv-db'].provisioning = null;
  return { resetVersion: 0, toast: null, server: { servers, activeServerId: servers[0].id, view: 'console', tab: 'overview', sequence: 0, baselineNow: now, now, enrollmentLocators: {}, byAgent, ...byAgent[servers[0].id] } };
}

export function serverSandboxReducer(state, action) {
  const server = state.server;
  const save = patch => {
    const updated = { ...server, ...patch };
    const profile = Object.fromEntries(['sensors', 'incidents', 'responses', 'events', 'inventory', 'postureChecks', 'policy', 'provisioning'].map(key => [key, updated[key]]));
    return { ...state, server: { ...updated, byAgent: { ...updated.byAgent, [updated.activeServerId]: profile } } };
  };
  const notify = (next, title, type = 'success', detail = '') => ({ ...next, toast: { title, detail, type } });
  switch (action.type) {
    case 'DISMISS_TOAST': return { ...state, toast: null };
    case 'SERVER_TOAST': return notify(state, action.title, action.tone || 'success');
    case 'RESET': return { ...createInitialServerState(server.now), resetVersion: state.resetVersion + 1 };
    case 'SERVER_SET_VIEW': return ['console', 'fleet'].includes(action.view) ? save({ view: action.view }) : state;
    case 'SERVER_SELECT_AGENT':
      if (!server.byAgent[action.id]) return state;
      return { ...state, server: { ...server, ...server.byAgent[action.id], activeServerId: action.id, view: 'console', tab: 'overview' } };
    case 'SERVER_SET_TAB': return ['overview', 'incidents', 'responses', 'sensors', 'posture', 'inventory', 'events', 'policy'].includes(action.tab) ? save({ tab: action.tab }) : state;
    case 'SERVER_INCIDENT_STATUS':
      if (!['INVESTIGATING', 'RESOLVED', 'DISMISSED'].includes(action.status) || !server.incidents.some(row => row.id === action.id)) return state;
      return notify(save({ incidents: server.incidents.map(row => row.id === action.id ? { ...row, status: action.status } : row) }), `Incident marked ${action.status.toLowerCase()}`);
    case 'SERVER_HEARTBEAT': {
      const now = action.now ?? server.now;
      const byAgent = Object.fromEntries(Object.entries(server.byAgent).map(([id, profile]) => [id, {
        ...profile,
        sensors: profile.sensors.map(row => ({ ...row, observedAt: new Date(now - 1000).toISOString(), details: { ...row.details, functional_evidence_at: new Date(now - 1000).toISOString() } })),
        responses: profile.responses.map(row => row.status === 'APPLIED' && Date.parse(row.expiresAt) <= now ? { ...row, status: 'COMPLETE' } : row),
      }]));
      return { ...state, server: { ...server, ...byAgent[server.activeServerId], now, byAgent } };
    }
    case 'SERVER_GENERATE_TOKEN': {
      const id = action.id || server.activeServerId;
      if (!server.byAgent[id] || !['INITIAL', 'REENROLL'].includes(action.purpose || 'INITIAL')) return state;
      if (action.purpose !== 'REENROLL' && server.servers.find(row => row.id === id)?.machineCredentialIssuedAt) return state;
      const sequence = server.sequence + 1;
      const locator = { locator: action.token || `demo-enrollment-${id}-${sequence}`, purpose: action.purpose || 'INITIAL', expires_at: new Date((action.now ?? server.now) + 600000).toISOString(), single_use: true };
      return notify(save({ sequence, enrollmentLocators: { ...server.enrollmentLocators, [id]: locator } }), locator.purpose === 'REENROLL' ? 'Recovery code generated' : 'Enrollment code generated');
    }
    case 'SERVER_POLICY_MUTATE': {
      const mutation = action.mutation || action.payload || {};
      const data = structuredClone(server.policy);
      const policy = data.policy;
      try {
        const cidr = mutation.cidr ? normalizeIPOrCIDR(mutation.cidr) : null;
        switch (mutation.action) {
          case 'set_mode': policy.response.mode = mutation.mode; break;
          case 'add_trusted':
            if (data.trusted_ips.some(row => row.cidr === cidr)) throw new Error('Trusted source already exists');
            data.trusted_ips.push({ cidr, description: mutation.description || '' }); break;
          case 'remove_trusted': data.trusted_ips = data.trusted_ips.filter(row => row.cidr !== cidr); break;
          case 'move_trusted_to_block':
            if (!data.trusted_ips.some(row => row.cidr === cidr)) throw new Error('Trusted source not found');
            data.trusted_ips = data.trusted_ips.filter(row => row.cidr !== cidr);
            // Fall through to the same validated explicit-block insertion.
          case 'add_block':
            if (!mutation.reason?.trim()) throw new Error('An explicit block requires a reason');
            if (mutation.expires_at && !Number.isFinite(Date.parse(mutation.expires_at))) throw new Error('Invalid expiry');
            data.explicit_blocks.push({ cidr, reason: mutation.reason.trim(), expiresAt: mutation.expires_at || null }); break;
          case 'remove_block': data.explicit_blocks = data.explicit_blocks.filter(row => row.cidr !== cidr); break;
          case 'set_sensor':
            if (!INITIAL_SENSORS.some(row => row.sensor === mutation.sensor)) throw new Error('Unknown sensor');
            policy.components[mutation.sensor] = Boolean(mutation.enabled); break;
          case 'set_suricata_interface':
            if (!/^[\w.:-]{1,15}$/.test(mutation.interface)) throw new Error('Invalid interface name');
            policy.suricata = { interface: mutation.interface }; break;
          default: return state;
        }
        policy.policy_revision += 1;
        policy.trusted_ips = data.trusted_ips;
        policy.explicit_blocks = data.explicit_blocks.map(row => ({ ...row, expires_at: row.expiresAt || null }));
        validateServerSecurityPolicy(policy);
        data.revision = { revision: policy.policy_revision, createdAt: new Date(server.now).toISOString() };
        data.activation_state = 'applied';
        const sensors = server.sensors.map(row => ({ ...row, state: policy.components[row.sensor] ? 'HEALTHY' : 'DISABLED', details: { ...row.details, detecting: policy.components[row.sensor], policy_revision: String(policy.policy_revision), response_mode: policy.response.mode, ...(row.sensor === 'suricata' ? { interface: policy.suricata.interface } : {}) } }));
        const provisioning = server.provisioning ? { ...server.provisioning, policyActivation: { revision: String(policy.policy_revision), activatedAt: new Date(server.now).toISOString(), components: policy.components } } : null;
        const sequence = server.sequence + 1;
        const event = { eventId: `policy-${sequence}`, source: 'policy', eventType: 'policy.activation', severity: 'info', occurredAt: new Date(server.now).toISOString(), payload: { title: 'Signed security policy activated', revision: policy.policy_revision, action: mutation.action } };
        return notify(save({ policy: data, sensors, provisioning, sequence, events: [event, ...server.events] }), 'Security policy saved and activated');
      } catch (error) { return notify(state, error.message, 'critical'); }
    }
    case 'ATTACK': {
      const sequence = server.sequence + 1;
      const now = action.now ?? server.now;
      const time = new Date(now).toISOString();
      const event = { eventId: `attack-event-${sequence}`, source: 'crowdsec', eventType: 'security.detection', severity: 'high', occurredAt: time, incidentId: `attack-inc-${sequence}`, payload: { scenario: 'crowdsecurity/ssh-bf', source_ip: '198.51.100.42', attempts: 62, destination_port: 22, title: 'Repeated SSH login attempts', subject: { scenario: 'crowdsecurity/ssh-bf' } } };
      const incident = { id: event.incidentId, summary: 'crowdsecurity/ssh-bf', severity: 'high', status: 'CONTAINED', sourceIP: '198.51.100.42', detectionSources: ['crowdsec'], firstSeenAt: time, lastSeenAt: time, eventCount: 62, events: [event], evidence: event.payload };
      const response = { ...structuredClone(INITIAL_RESPONSES[0]), id: `attack-response-${sequence}`, startsAt: time, expiresAt: new Date(now + 900000).toISOString(), policyRevision: server.policy.policy.policy_revision };
      return notify(save({ sequence, incidents: [incident, ...server.incidents], responses: [response, ...server.responses], events: [event, ...server.events] }), 'Simulated server attack intercepted: CrowdSec auto-blocked 198.51.100.42 on SSH port 22', 'critical', 'Temporary protection applied on ports 22 / 6443.');
    }
    default: return state;
  }
}
