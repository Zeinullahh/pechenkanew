import {
  DEMO_NOW,
  INITIAL_EMAILS,
  INITIAL_ACTIVITY_LOGS,
  createAttack,
  makeOutgoing,
} from "./mockData.js";

export function createInitialState() {
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
      return {
        ...state,
        sequence,
        now,
        attackCount: (state.attackCount || 0) + 1,
        emails: [...attacks, ...state.emails],
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
