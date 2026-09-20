"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  ChevronDown,
  ChevronRight,
  Edit,
  FileEdit,
  Folder,
  Inbox,
  Mail,
  MailOpen,
  Maximize2,
  Minimize2,
  Moon,
  Plus,
  RotateCcw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { ACCOUNT } from "./mockData";
import { SLNC_LOGO } from "./brandAsset";
import { isIncoming, matchesFolder, matchesSearch } from "./sandboxState";
import SandboxModal from "./SandboxModal";
import EmailHeader from "./EmailHeader";
import AttachmentHandler from "./AttachmentHandler";
import FloatingAIChat from "./FloatingAIChat";
import EmailComposer from "./EmailComposer";

const SYSTEM_FOLDERS = [
  ["unfiltered", "Unfiltered", Inbox],
  ["secure", "Secure", ShieldCheck],
  ["important", "Important", Star],
  ["auto-responded", "Auto-responded", Zap],
  ["sent", "Sent", Send],
  ["drafts", "Drafts", FileEdit],
  ["trash", "Trash", Trash2],
];
const QUARANTINE_FOLDERS = [
  ["spam", "SPAM", AlertTriangle],
  ["phishing", "Possibly Phishing", ShieldAlert],
  ["dangerous_links", "Dangerous links", ShieldAlert],
  ["malware", "Malware in attachments", ShieldAlert],
];
const RU = {
  Compose: "Написать",
  Scheduled: "Отложенные",
  SYSTEM: "СИСТЕМА",
  QUARANTINE: "КАРАНТИН",
  "MY FOLDERS": "МОИ ПАПКИ",
  Unfiltered: "Все входящие",
  Secure: "Безопасные",
  Important: "Важные",
  "Auto-responded": "Автоответы",
  Sent: "Отправленные",
  Drafts: "Черновики",
  Trash: "Корзина",
  SPAM: "СПАМ",
  "Possibly Phishing": "Возможный фишинг",
  "Dangerous links": "Опасные ссылки",
  "Malware in attachments": "Вредоносные вложения",
  "Finance & Audit": "Финансы и аудит",
  "Executive Board": "Руководство",
  "Switch to CMC": "Открыть CMC",
};
const emailDate = (email) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(email.timestamp));

export default function WebmailView({ state, dispatch }) {
  const [theme, setTheme] = useState("dark");
  const [locale, setLocale] = useState("en");
  const [quarantineOpen, setQuarantineOpen] = useState(true);
  const [fullView, setFullView] = useState(false);
  const [modal, setModal] = useState(null);
  const [compose, setCompose] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [moveFolder, setMoveFolder] = useState("finance");
  const t = (text) => (locale === "ru" ? RU[text] || text : text);
  const customFolderMap = new Map([
    ["finance", ["finance", "Finance & Audit", Folder]],
    ["executive", ["executive", "Executive Board", Folder]],
  ]);
  state.customFolders.forEach((f) => {
    customFolderMap.set(f.id, [f.id, f.name, Folder]);
  });
  const customFolders = Array.from(customFolderMap.values());
  const folders = [...SYSTEM_FOLDERS, ...QUARANTINE_FOLDERS, ...customFolders];
  const filtered = state.emails.filter(
    (e) => matchesFolder(e, state.folder) && matchesSearch(e, state.search),
  );
  const selected =
    filtered.find((e) => e.id === state.selectedEmailId) || filtered[0] || null;
  const quarantine = state.emails.filter(
    (e) => isIncoming(e) && e.threatType !== "secure",
  );
  const analysis = selected?.securityAnalysis;
  const safe = selected?.threatType === "secure";
  const onFolder = (folder) => {
    dispatch({ type: "FOLDER", folder });
    setFullView(false);
  };
  const unreadCount = (emails) => emails.filter((e) => !e.isRead).length;
  const Counts = ({ emails }) => (
    <span className="folder-count">
      {unreadCount(emails) > 0 && (
        <span
          className="unread-count"
          aria-label={`${unreadCount(emails)} unread`}
        >
          {unreadCount(emails)}
        </span>
      )}
      <span className="total-count">{emails.length}</span>
    </span>
  );
  const renderFolder = ([id, name, Icon]) => {
    const emails = state.emails.filter((email) => matchesFolder(email, id));
    return (
      <li key={id}>
        <button
          type="button"
          className={`folder-item ${state.folder === id ? "active" : ""}`}
          data-folder={id}
          aria-current={state.folder === id ? "page" : undefined}
          onClick={() => onFolder(id)}
        >
          <span className="folder-item-left">
            {[
              "secure",
              "spam",
              "phishing",
              "dangerous_links",
              "malware",
            ].includes(id) ? (
              <i
                className={`status-indicator ${id === "secure" ? "green" : ["spam", "phishing"].includes(id) ? "yellow" : "red"}`}
              />
            ) : (
              <Icon size={17} className="folder-icon" />
            )}
            <span className="folder-item-label" title={t(name)}>
              {t(name)}
            </span>
          </span>
          <span className="folder-item-right">
            <Counts emails={emails} />
          </span>
        </button>
      </li>
    );
  };
  const openEmail = (email) => {
    if (email.folder === "drafts") setCompose(email);
    dispatch({ type: "OPEN", id: email.id });
  };

  return (
    <div
      className="sandbox-webmail"
      data-theme={theme}
      role="region"
      aria-label="AI-CSD Webmail Client"
    >
      <div className="dashboard-shell">
        <header className="dashboard-topbar glass glass-toolbar">
          <div className="topbar-logo">
            <div className="brand-lockup">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="brand-logo"
                src={SLNC_LOGO}
                alt="./SLNC"
                width="96"
                height="40"
              />
              <span className="brand-slash">/</span>
              <span className="brand-text">Email Protector</span>
            </div>
          </div>
          <div className="search-bar topbar-search">
            <Search size={18} className="search-icon" />
            <input
              type="search"
              className="search-input"
              aria-label="Search emails, headers, hashes"
              placeholder={
                locale === "ru"
                  ? "Поиск писем, заголовков, хешей…"
                  : "Search emails, headers, hashes…"
              }
              value={state.search}
              onChange={(e) =>
                dispatch({ type: "SEARCH", query: e.target.value })
              }
            />
            {state.search && (
              <button
                type="button"
                className="clear-search"
                aria-label="Clear search"
                onClick={() => dispatch({ type: "SEARCH", query: "" })}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="topbar-actions">
            <button
              type="button"
              className="topbar-icon-button icon-only"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              className="topbar-icon-button"
              aria-label="Switch language"
              onClick={() => setLocale(locale === "en" ? "ru" : "en")}
            >
              {locale.toUpperCase()}
            </button>
            <button
              type="button"
              className="sb-account-chip"
              onClick={() => setModal("account")}
            >
              <span>E</span>
              {ACCOUNT}
              <ChevronDown size={13} />
            </button>
            <button
              type="button"
              className="topbar-icon-button"
              onClick={() => dispatch({ type: "MODE", mode: "cmc" })}
            >
              {t("Switch to CMC")}
            </button>
          </div>
        </header>
        <div
          className={`app-container redesigned ${fullView ? "full-view" : ""}`}
        >
          <aside
            className="sidebar glass glass-sidebar"
            aria-label="Mailbox folders"
          >
            <div className="sidebar-compose">
              <button
                type="button"
                className="send-email-button compose-cta"
                onClick={() => setCompose({})}
              >
                <Edit size={20} />
                {t("Compose")}
              </button>
              <button
                type="button"
                className="send-email-button compose-cta"
                onClick={() => setModal("scheduled")}
              >
                <CalendarClock size={20} />
                {t("Scheduled")}
              </button>
            </div>
            <div className="sidebar-scroll">
              <div className="sidebar-section">
                <div className="sidebar-section-title">{t("SYSTEM")}</div>
                <ul className="sidebar-list">
                  {SYSTEM_FOLDERS.map(renderFolder)}
                </ul>
              </div>
              <div className="sidebar-section">
                <button
                  type="button"
                  className="sidebar-section-header sidebar-section-toggle"
                  aria-expanded={quarantineOpen}
                  onClick={() => setQuarantineOpen(!quarantineOpen)}
                >
                  <span className="sidebar-section-title">
                    {t("QUARANTINE")}
                  </span>
                  <span className="sidebar-section-meta">
                    <Counts emails={quarantine} />
                    {quarantineOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                </button>
                {quarantineOpen && (
                  <ul className="sidebar-list quarantine-folder-list">
                    {QUARANTINE_FOLDERS.map(renderFolder)}
                  </ul>
                )}
              </div>
              <div className="sidebar-section">
                <div className="sidebar-section-header">
                  <span className="sidebar-section-title">
                    {t("MY FOLDERS")}
                  </span>
                  <button
                    type="button"
                    className="sidebar-section-action"
                    aria-label="Create folder"
                    onClick={() => {
                      setFolderName("");
                      setModal("folder");
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <ul className="sidebar-list">
                  {customFolders.map(renderFolder)}
                </ul>
              </div>
            </div>
          </aside>
          <section
            className="email-list-container glass glass-card"
            aria-label="Email list"
          >
            <header className="sb-mail-list-heading">
              <h3>
                {t(
                  folders.find(([id]) => id === state.folder)?.[1] ||
                    "Unfiltered",
                )}
              </h3>
              <span>{filtered.length} emails</span>
            </header>
            <div className="email-list-scroll-wrapper">
              <div className="email-list appear">
                {filtered.map((email) => {
                  const glow =
                    email.threatType === "secure"
                      ? "glow-safe"
                      : ["phishing", "spoofing", "spam"].includes(
                            email.threatType,
                          )
                        ? "glow-warning"
                        : "glow-danger";
                  const Icon =
                    email.threatType === "secure"
                      ? ShieldCheck
                      : email.threatType === "phishing"
                        ? AlertTriangle
                        : ShieldAlert;
                  return (
                    <div
                      key={email.id}
                      className={`email-item glass-card ${email.id === selected?.id ? "active" : ""} ${email.isRead ? "read" : "unread"} ${glow}`}
                      data-email-id={email.id}
                    >
                      <button
                        type="button"
                        className="sb-email-open"
                        aria-label={`Open email ${email.subject} to ${email.recipient}`}
                        onClick={() => openEmail(email)}
                      >
                        <span className="email-card-top">
                          <span className="email-card-left">
                            <Icon
                              size={16}
                              className={`email-threat-icon ${email.threatType}`}
                            />
                            <span className="status-circle" />
                            <span className="sender-info">
                              <span className="sender-row">
                                <span className="email-sender">
                                  {email.direction === "outgoing"
                                    ? email.recipient
                                    : email.senderName}
                                </span>
                                {!email.isRead && (
                                  <span className="unread-dot" />
                                )}
                              </span>
                              <span className="email-subject-line">
                                <span className="email-subject-text">
                                  {email.subject}
                                </span>
                              </span>
                              <span className="email-preview">
                                {email.preview}
                              </span>
                            </span>
                          </span>
                        </span>
                      </button>
                      <div className="email-card-right">
                        <button
                          type="button"
                          className={`email-important-toggle ${email.isImportant ? "sb-starred" : ""}`}
                          aria-label={`${email.isImportant ? "Unstar" : "Star"} ${email.subject}`}
                          aria-pressed={email.isImportant}
                          onClick={() =>
                            dispatch({ type: "STAR", id: email.id })
                          }
                        >
                          <Star
                            size={18}
                            fill={email.isImportant ? "currentColor" : "none"}
                            strokeWidth={1.5}
                          />
                        </button>
                        <span className="email-date">
                          {email.simulated ? "Now" : emailDate(email)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {!filtered.length && (
                  <div className="sb-mail-empty">
                    <Inbox size={38} />
                    <h4>No emails here</h4>
                    <p>
                      {state.search
                        ? "Try another sender, subject, or attachment hash."
                        : "Messages will appear here when they match this folder."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section
            className="email-view-container glass glass-card"
            aria-label="Email view"
          >
            {selected ? (
              <article className="email-view" key={selected.id}>
                <header className="email-view-header">
                  <div className="email-view-header-top">
                    <h2 className="email-view-subject">{selected.subject}</h2>
                    <div className="email-view-header-actions">
                      <button
                        type="button"
                        className="email-header-icon-btn"
                        aria-label={
                          fullView ? "Collapse email view" : "Expand email view"
                        }
                        onClick={() => setFullView(!fullView)}
                      >
                        {fullView ? (
                          <Minimize2 size={18} />
                        ) : (
                          <Maximize2 size={18} />
                        )}
                      </button>
                      <button
                        type="button"
                        className="email-header-icon-btn"
                        aria-label={
                          selected.isRead ? "Mark unread" : "Mark read"
                        }
                        onClick={() =>
                          dispatch({ type: "READ", id: selected.id })
                        }
                      >
                        {selected.isRead ? (
                          <Mail size={18} />
                        ) : (
                          <MailOpen size={18} />
                        )}
                      </button>
                      <button
                        type="button"
                        className="email-header-icon-btn"
                        aria-label="Move to folder"
                        onClick={() => setModal("move")}
                      >
                        <Folder size={18} />
                      </button>
                      <button
                        type="button"
                        className="email-header-icon-btn danger"
                        aria-label={
                          selected.folder === "trash"
                            ? "Restore email"
                            : "Move to Trash"
                        }
                        onClick={() =>
                          dispatch({
                            type:
                              selected.folder === "trash" ? "RESTORE" : "TRASH",
                            id: selected.id,
                          })
                        }
                      >
                        {selected.folder === "trash" ? (
                          <RotateCcw size={18} />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <EmailHeader email={selected} locale={locale} />
                </header>
                <div className="email-content-scroll">
                  <section
                    className={`sb-threat-inspector ${safe ? "safe" : "danger"}`}
                    aria-label="Threat Inspector"
                  >
                    <header>
                      {safe ? (
                        <ShieldCheck size={20} />
                      ) : (
                        <ShieldAlert size={20} />
                      )}
                      <div>
                        <span>THREAT INSPECTOR / AI-CSD</span>
                        <h3>{analysis?.verdict}</h3>
                      </div>
                    </header>
                    <dl>
                      <div>
                        <dt>DKIM / SPF</dt>
                        <dd>{analysis?.dkimSpf || "Not available"}</dd>
                      </div>
                      <div>
                        <dt>Spoof Score</dt>
                        <dd>{analysis?.spoofScore ?? "—"} / 100</dd>
                      </div>
                      <div>
                        <dt>Links / Attachments</dt>
                        <dd>
                          {analysis?.detectedLinks?.length || 0} links ·{" "}
                          {analysis?.attachments?.length || 0} attachments
                        </dd>
                      </div>
                    </dl>
                    <p>{analysis?.summary}</p>
                    <span className="sb-analysis-action">
                      {analysis?.aiActionTaken}
                    </span>
                    <button
                      type="button"
                      className="sb-domain-purge"
                      onClick={() =>
                        dispatch({ type: "PURGE", id: selected.id })
                      }
                    >
                      <Trash2 size={14} />
                      ADMIN: Domain-Wide Purge
                    </button>
                  </section>
                  <div className="email-body-container">
                    <div className="email-body">
                      {selected.body.split("\n\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  {Boolean(analysis?.detectedLinks?.length) && (
                    <section className="sb-detected-links">
                      <h4>Link inspection</h4>
                      {analysis.detectedLinks.map((link) => (
                        <div key={link.url}>
                          <span
                            className={
                              link.status === "clean"
                                ? "sb-safe-text"
                                : "sb-danger-text"
                            }
                          >
                            {link.status.toUpperCase()}
                          </span>
                          <code>{link.url}</code>
                          <p>{link.action}</p>
                        </div>
                      ))}
                    </section>
                  )}
                  <AttachmentHandler
                    attachments={analysis?.attachments || []}
                  />
                  {selected.direction !== "outgoing" && (
                    <section className="sb-smart-responder">
                      <header>
                        <Sparkles size={18} />
                        <h3>AI Smart Responder</h3>
                      </header>
                      {!safe && (
                        <p>
                          Security incidents are forwarded to
                          security@silenceai.net.
                        </p>
                      )}
                      {selected.replySent && (
                        <p className="sb-safe-text">
                          Reply sent · available in Sent and Auto-responded.
                        </p>
                      )}
                      {selected.replyDraft ? (
                        <>
                          <label htmlFor={`reply-${selected.id}`}>
                            Review your draft
                          </label>
                          <textarea
                            id={`reply-${selected.id}`}
                            value={selected.replyDraft}
                            onChange={(e) =>
                              dispatch({
                                type: "EDIT_REPLY",
                                id: selected.id,
                                body: e.target.value,
                              })
                            }
                            rows={7}
                          />
                          <div className="sb-actions">
                            <button
                              type="button"
                              className="sb-secondary"
                              onClick={() =>
                                dispatch({
                                  type: "GENERATE_REPLY",
                                  id: selected.id,
                                })
                              }
                            >
                              <RotateCcw size={14} />
                              Regenerate
                            </button>
                            <button
                              type="button"
                              className="sb-primary"
                              disabled={!selected.replyDraft.trim()}
                              onClick={() =>
                                dispatch({
                                  type: "SEND_REPLY",
                                  id: selected.id,
                                })
                              }
                            >
                              <Send size={14} />
                              Send reply
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="sb-primary"
                          onClick={() =>
                            dispatch({
                              type: "GENERATE_REPLY",
                              id: selected.id,
                            })
                          }
                        >
                          <Sparkles size={15} />
                          Generate reply
                        </button>
                      )}
                    </section>
                  )}
                </div>
              </article>
            ) : (
              <div className="sb-mail-empty">
                <Mail size={46} />
                <h3>Your inbox, protected.</h3>
                <p>
                  Select a message to review its contents and security analysis.
                </p>
                {fullView && (
                  <button
                    type="button"
                    className="sb-secondary"
                    onClick={() => setFullView(false)}
                  >
                    Back to email list
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
      <FloatingAIChat state={state} dispatch={dispatch} email={selected} />
      {compose && (
        <EmailComposer
          initial={compose.id ? compose : null}
          state={state}
          dispatch={dispatch}
          onClose={() => setCompose(null)}
        />
      )}
      {modal === "account" && (
        <SandboxModal title="Account" onClose={() => setModal(null)}>
          <div className="sb-form">
            <h4>Elena Rostova</h4>
            <p>{ACCOUNT}</p>
            <p className="sb-muted">
              Organization: silenceai.net
              <br />
              Demo access: all protected mailboxes
              <br />
              Role: Security administrator
            </p>
            <button
              type="button"
              className="sb-primary"
              onClick={() => {
                setModal(null);
                dispatch({ type: "MODE", mode: "cmc" });
              }}
            >
              Open management console
            </button>
          </div>
        </SandboxModal>
      )}
      {modal === "folder" && (
        <SandboxModal title="Create folder" onClose={() => setModal(null)}>
          <form
            className="sb-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (folderName.trim()) {
                dispatch({ type: "ADD_FOLDER", name: folderName });
                setModal(null);
              }
            }}
          >
            <label>
              Folder name
              <input
                required
                maxLength={48}
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </label>
            <button className="sb-primary" disabled={!folderName.trim()}>
              Create folder
            </button>
          </form>
        </SandboxModal>
      )}
      {modal === "move" && selected && (
        <SandboxModal title="Move to folder" onClose={() => setModal(null)}>
          <form
            className="sb-form"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({ type: "MOVE", id: selected.id, folder: moveFolder });
              setModal(null);
            }}
          >
            <label>
              Folder
              <select
                aria-label="Folder"
                value={moveFolder}
                onChange={(e) => setMoveFolder(e.target.value)}
              >
                {customFolders.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <button className="sb-primary">Move email</button>
          </form>
        </SandboxModal>
      )}
      {modal === "scheduled" && (
        <SandboxModal
          title="Scheduled emails"
          onClose={() => setModal(null)}
          wide
        >
          <div className="sb-form">
            {state.emails
              .filter((e) => e.folder === "scheduled")
              .map((email) => (
                <div className="sb-scheduled-email" key={email.id}>
                  <div>
                    <strong>{email.subject}</strong>
                    <p>
                      {email.recipient} ·{" "}
                      {email.scheduledAt?.replace("T", " ").slice(0, 16)} UTC
                    </p>
                  </div>
                  <button
                    type="button"
                    className="sb-primary"
                    onClick={() =>
                      dispatch({ type: "SEND_SCHEDULED", id: email.id })
                    }
                  >
                    Send now
                  </button>
                  <button
                    type="button"
                    className="sb-icon"
                    aria-label={`Cancel scheduled ${email.subject}`}
                    onClick={() => dispatch({ type: "TRASH", id: email.id })}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            {!state.emails.some((e) => e.folder === "scheduled") && (
              <p className="sb-empty">
                No scheduled messages. Compose an email and choose Schedule to
                add one.
              </p>
            )}
            <button
              type="button"
              className="sb-primary"
              onClick={() => {
                setModal(null);
                setCompose({});
              }}
            >
              Compose message
            </button>
          </div>
        </SandboxModal>
      )}
    </div>
  );
}
