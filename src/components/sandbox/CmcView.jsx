"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ChevronUp,
  ExternalLink,
  Filter,
  Menu,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { COMPANY_USERS, DOMAIN_COLUMNS } from "./mockData";
import { filterTraffic, THREAT_CATEGORIES } from "./sandboxState";
import SandboxModal from "./SandboxModal";
import AnalyticsCards from "./AnalyticsCards";

const X_POSITIONS = [105, 279.5, 454, 930, 1105, 1279.5];
const TIMEFRAMES = [
  ["Last hour", 1],
  ["Last 3 hours", 3],
  ["Last 6 hours", 6],
  ["Last 12 hours", 12],
  ["Last 24 hours", 24],
  ["All time", 0],
];
const shortName = (name) => (name.length > 8 ? `${name.slice(0, 6)}...` : name);

export default function CmcView({ state, dispatch }) {
  const [direction, setDirection] = useState("incoming");
  const [modal, setModal] = useState(null);
  const [showThreats, setShowThreats] = useState(false);
  const [selection, setSelection] = useState(null);
  const [emailId, setEmailId] = useState(null);
  const [filters, setFilters] = useState({ from: "", subject: "" });
  const [draftFilters, setDraftFilters] = useState(filters);
  const [timeframe, setTimeframe] = useState({ label: "All time", hours: 0 });
  const [custom, setCustom] = useState({
    start: "2026-09-20T00:00",
    end: "2026-09-20T11:00",
  });
  const [rangeError, setRangeError] = useState("");
  const [labels, setLabels] = useState(true);
  const glowId = useId().replaceAll(":", "");
  const traffic = filterTraffic(state.emails, {
    ...filters,
    ...timeframe,
    direction,
    now: state.now,
  });
  const selectedEmail = state.emails.find((e) => e.id === emailId);
  const selectedMessages = selection
    ? traffic.filter((e) => {
        if (selection.department === "Finance & Audit") {
          return (
            /finance|elena\.r|audit/i.test(e.senderEmail) ||
            /finance|elena\.r|audit/i.test(e.recipient) ||
            /invoice|wire|remittance|sla|audit|budget/i.test(`${e.subject} ${e.body}`)
          );
        }
        if (selection.department === "Security Ops") {
          return (
            /soc|jmqst011|security/i.test(e.senderEmail) ||
            /soc|jmqst011|security/i.test(e.recipient) ||
            e.threatType !== "secure"
          );
        }
        if (selection.department === "Executive Board") {
          return (
            /ceo|director|executive/i.test(e.senderEmail) ||
            /ceo|director|executive/i.test(e.recipient) ||
            e.isImportant
          );
        }
        if (selection.email) {
          return e.senderEmail === selection.email || e.recipient === selection.email;
        }
        return [e.senderEmail, e.recipient].some(
          (address) => address.split("@")[1] === selection.domain,
        );
      })
    : [];
  const activeFilters = Boolean(
    filters.from || filters.subject || timeframe.hours || timeframe.start,
  );
  const incidentCount = traffic.filter((e) => e.threatType !== "secure").length;

  const openSelection = (next) => {
    setSelection(next);
    setModal("selection");
  };
  const keyOpen = (e, next) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSelection(next);
    }
  };
  const openEmail = (id) => {
    setEmailId(id);
    setModal("email");
  };
  const closeModal = () => setModal(null);

  return (
    <div className="cmc-shell" role="region" aria-label="AI-CSD Admin Console">
      <header className="cmc-header">
        <button
          type="button"
          className="cmc-menu"
          aria-label="Settings Menu"
          onClick={() => setModal("settings")}
        >
          <Menu size={30} strokeWidth={2} />
        </button>
        <nav aria-label="CMC navigation">
          <button type="button" onClick={() => setModal("instructions")}>
            Instructions
          </button>
          <button type="button" onClick={() => setModal("web")}>
            Web Security
          </button>
          <button
            type="button"
            className="active"
            onClick={() => {
              setShowThreats(false);
              setModal(null);
            }}
          >
            Email Security
          </button>
        </nav>
        <button
          type="button"
          className="cmc-profile"
          onClick={() => setModal("profile")}
        >
          <span>J</span> jmqst011
        </button>
      </header>
      <div className="cmc-subbar">
        <div className="cmc-branding-badge" title="silenceai.net · Active Company Domain">
          <div className="cmc-branding-logo">
            <span>EV</span>
          </div>
          <div className="cmc-branding-info">
            <span className="cmc-branding-name">silenceai.net</span>
            <span className="cmc-branding-sub">Company Hub</span>
          </div>
        </div>
        <div className="cmc-filter-buttons">
          <button
            type="button"
            className="cmc-white-pill"
            onClick={() => setModal("time")}
          >
            TimeFrame: {timeframe.label}
          </button>
          <button
            type="button"
            className="cmc-white-pill"
            onClick={() => {
              setDraftFilters(filters);
              setModal("filter");
            }}
          >
            <Filter size={15} />
            Filter
            {(filters.from || filters.subject) && (
              <i className="cmc-filter-dot" />
            )}
          </button>
        </div>
        <div className="cmc-mode-capsule" aria-label="Traffic direction">
          <span
            className="cmc-mode-slider"
            style={{
              transform:
                direction === "incoming" ? "translateX(0)" : "translateX(100%)",
            }}
          />
          {["incoming", "outgoing"].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={direction === value}
              onClick={() => setDirection(value)}
            >
              {value === "incoming" ? "Incoming" : "Outgoing"}
            </button>
          ))}
        </div>
        {activeFilters && (
          <button
            type="button"
            className="cmc-filter-clear"
            onClick={() => {
              setFilters({ from: "", subject: "" });
              setTimeframe({ label: "All time", hours: 0 });
            }}
          >
            Clear filters · {traffic.length} emails
          </button>
        )}
      </div>
      <div className="cmc-canvas">
        <AnalyticsCards
          traffic={traffic}
          onSelectDepartment={(dept) => openSelection({ department: dept })}
          onSelectDomain={(domain) => openSelection({ domain })}
        />
        <svg
          viewBox="0 0 1384 826"
          className="cmc-topology"
          aria-label="Email traffic topology"
        >
          <defs>
            <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`${glowId}-dept`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className="cmc-graph-content">
            {DOMAIN_COLUMNS.map((column, c) =>
              column.map(({ domain, users }, row) => {
                const x = X_POSITIONS[c];
                const y = 93 + row * 128.6;
                const messages = traffic.filter(
                  (e) =>
                    (direction === "incoming"
                      ? e.senderEmail
                      : e.recipient
                    ).split("@")[1] === domain,
                );
                return (
                  <g
                    key={domain}
                    className="cmc-domain"
                    data-domain={domain}
                    transform={`translate(${x} ${y})`}
                    opacity={messages.length ? 1 : 0.2}
                  >
                    <g
                      role="button"
                      tabIndex={0}
                      aria-label={`Open domain ${domain}`}
                      onClick={() => openSelection({ domain })}
                      onKeyDown={(e) => keyOpen(e, { domain })}
                    >
                      <title>{`${domain} — ${messages.length} emails`}</title>
                      <circle r="49.5" className="cmc-cluster" />
                      <text y="-56" className="cmc-domain-label">
                        {domain}
                      </text>
                    </g>
                    {users.map((name, index) => {
                      const angle =
                        (index * 2 * Math.PI) / users.length - Math.PI / 2;
                      const x = 27.25 * Math.cos(angle);
                      const y = 27.25 * Math.sin(angle);
                      const email = `${name}@${domain}`;
                      const count = messages.filter(
                        (e) => e.senderEmail === email || e.recipient === email,
                      ).length;
                      return (
                        <g
                          key={email}
                          transform={`translate(${x} ${y})`}
                          className="cmc-user-node"
                          role="button"
                          tabIndex={0}
                          aria-label={`Open sender ${email}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openSelection({ domain, email });
                          }}
                          onKeyDown={(e) => keyOpen(e, { domain, email })}
                          opacity={count ? 1 : 0.35}
                        >
                          <title>{`${email} — ${count} emails`}</title>
                          <circle
                            r="12.4"
                            fill="#fff"
                            stroke="rgba(255,255,255,.5)"
                            strokeWidth=".5"
                          />
                          {labels && (
                            <text y="-15.5" className="cmc-user-label">
                              {shortName(name)}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                );
              }),
            )}
            {/* Department Clusters above Company Cluster matching cmc-v2 */}
            <g className="cmc-departments">
              {/* Department 1: Finance & Audit */}
              <g
                transform="translate(585 175)"
                className="cmc-department-cluster"
                role="button"
                tabIndex={0}
                aria-label="Open department Finance & Audit"
                onClick={() => openSelection({ department: "Finance & Audit" })}
                onKeyDown={(e) => keyOpen(e, { department: "Finance & Audit" })}
              >
                <title>Finance & Audit Department · 14 emails</title>
                <text y="-58" className="cmc-dept-eyebrow">DEPARTMENT</text>
                <text y="-44" className="cmc-dept-label">Finance & Audit</text>
                <circle
                  r="45"
                  className="cmc-cluster cmc-dept-circle"
                  filter={`url(#${glowId}-dept)`}
                />
                {/* Users inside department */}
                <g
                  transform="translate(-16 -6)"
                  className="cmc-user-node"
                  onClick={(e) => {
                    e.stopPropagation();
                    openSelection({ department: "Finance & Audit", email: "elena.r@silenceai.net" });
                  }}
                >
                  <circle r="12" fill="#e9d5ff" stroke="#34d399" strokeWidth="1.5" />
                  {labels && <text y="-15" className="cmc-user-label">elena.r</text>}
                </g>
                <g
                  transform="translate(16 10)"
                  className="cmc-user-node"
                  onClick={(e) => {
                    e.stopPropagation();
                    openSelection({ department: "Finance & Audit", email: "audit@silenceai.net" });
                  }}
                >
                  <circle r="12" fill="#ffffff" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                  {labels && <text y="-15" className="cmc-user-label">audit</text>}
                </g>
              </g>

              {/* Department 2: Security Ops */}
              <g
                transform="translate(800 175)"
                className="cmc-department-cluster"
                role="button"
                tabIndex={0}
                aria-label="Open department Security Ops"
                onClick={() => openSelection({ department: "Security Ops" })}
                onKeyDown={(e) => keyOpen(e, { department: "Security Ops" })}
              >
                <title>Security Ops Department · 18 emails</title>
                <text y="-58" className="cmc-dept-eyebrow">DEPARTMENT</text>
                <text y="-44" className="cmc-dept-label">Security Ops</text>
                <circle
                  r="45"
                  className="cmc-cluster cmc-dept-circle cmc-dept-security"
                  filter={`url(#${glowId}-dept)`}
                />
                {/* Users inside department */}
                <g
                  transform="translate(-16 10)"
                  className="cmc-user-node"
                  onClick={(e) => {
                    e.stopPropagation();
                    openSelection({ department: "Security Ops", email: "jmqst011@silenceai.net" });
                  }}
                >
                  <circle r="12" fill="#4c1d95" stroke="#34d399" strokeWidth="1.5" />
                  {labels && <text y="-15" className="cmc-user-label">jmqst011</text>}
                </g>
                <g
                  transform="translate(16 -6)"
                  className="cmc-user-node"
                  onClick={(e) => {
                    e.stopPropagation();
                    openSelection({ department: "Security Ops", email: "soc@silenceai.net" });
                  }}
                >
                  <circle r="12" fill="#ffffff" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                  {labels && <text y="-15" className="cmc-user-label">soc</text>}
                </g>
              </g>
            </g>
            <g transform="translate(692 414)" className="cmc-company">
              <g
                role="button"
                tabIndex={0}
                aria-label="Open company silenceai.net"
                onClick={() => openSelection({ domain: "silenceai.net" })}
                onKeyDown={(e) => keyOpen(e, { domain: "silenceai.net" })}
              >
                <text y="-150" className="cmc-company-eyebrow">
                  YOUR COMPANY
                </text>
                <text y="-136" className="cmc-domain-label">
                  silenceai.net
                </text>
                <circle
                  r="124"
                  className="cmc-cluster cmc-company-cluster"
                  filter={`url(#${glowId})`}
                />
              </g>
              {COMPANY_USERS.map((user, i) => {
                const angle = (i * Math.PI) / 3 - Math.PI / 2;
                const x = Math.cos(angle) * 80.5;
                const y = Math.sin(angle) * 80.5;
                return (
                  <g
                    key={i}
                    transform={`translate(${x} ${y})`}
                    className="cmc-user-node cmc-employee"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open employee ${user.email}${i === 1 ? " received" : ""}`}
                    onClick={() =>
                      openSelection({
                        domain: "silenceai.net",
                        email: user.email,
                      })
                    }
                    onKeyDown={(e) =>
                      keyOpen(e, { domain: "silenceai.net", email: user.email })
                    }
                  >
                    <title>{user.email}</title>
                    {labels && (
                      <line
                        x1="0"
                        y1="-24.8"
                        x2="0"
                        y2="-29"
                        stroke="rgba(255,255,255,.35)"
                        strokeDasharray="2,2"
                      />
                    )}
                    <circle
                      r="24.8"
                      fill={user.fill}
                      stroke={
                        user.employee ? "#a78bfa" : "rgba(255,255,255,.5)"
                      }
                      strokeWidth={user.employee ? 2 : 0.5}
                    />
                    {labels && (
                      <text y="-28" className="cmc-employee-label">
                        {user.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
        <button
          type="button"
          className="cmc-floating-btn"
          aria-label="Open Threat Grid"
          aria-expanded={showThreats}
          onClick={() => setShowThreats(true)}
        >
          <ChevronUp size={27} />
        </button>
        {showThreats && (
          <section className="cmc-threat-panel" aria-label="Threat Grid">
            <header className="cmc-threat-header">
              <h3>
                Threat Grid <span>{incidentCount} intercepted threats</span>
              </h3>
              <button
                type="button"
                className="sb-icon"
                aria-label="Close Threat Grid"
                onClick={() => setShowThreats(false)}
              >
                <X size={23} />
              </button>
            </header>
            <div className="cmc-threat-scroll">
              <div className="cmc-threat-grid">
                {THREAT_CATEGORIES.map((category) => {
                  const emails = traffic.filter(category.matches);
                  return (
                    <article
                      key={category.name}
                      className="cmc-threat-card"
                      style={{ "--threat-color": category.color }}
                      data-category={category.name}
                    >
                      <header>
                        <i />
                        <h4>{category.name}</h4>
                        <span className="cmc-category-count">
                          {emails.length}
                        </span>
                      </header>
                      <div className="cmc-threat-emails">
                        {emails.length ? (
                          emails.map((email) => (
                            <button
                              type="button"
                              key={email.id}
                              className="cmc-threat-email"
                              onClick={() => openEmail(email.id)}
                            >
                              <strong>{email.subject}</strong>
                              <span>From: {email.senderEmail}</span>
                              <span>To: {email.recipient}</span>
                              {email.threatType === "malware" && (
                                <em>Malware in attachment</em>
                              )}
                            </button>
                          ))
                        ) : (
                          <p className="sb-empty">
                            No emails in this category.
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <button
                type="button"
                className="sb-secondary"
                onClick={() => setModal("audit")}
              >
                Audit log · {state.logs.length} events
              </button>
            </div>
          </section>
        )}
      </div>

      {modal === "time" && (
        <SandboxModal title="Select TimeFrame" onClose={closeModal}>
          <div className="cmc-time-options">
            {TIMEFRAMES.map(([label, hours]) => (
              <button
                type="button"
                key={label}
                aria-pressed={timeframe.label === label}
                onClick={() => {
                  setTimeframe({ label, hours });
                  closeModal();
                }}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setRangeError("");
                setModal("custom");
              }}
            >
              Custom Range
            </button>
          </div>
        </SandboxModal>
      )}
      {modal === "custom" && (
        <SandboxModal title="Custom Range" onClose={closeModal}>
          <form
            className="sb-form"
            onSubmit={(e) => {
              e.preventDefault();
              const start = `${custom.start}:00Z`;
              const end = `${custom.end}:00Z`;
              if (Date.parse(start) >= Date.parse(end)) {
                setRangeError("Start must be before end.");
                return;
              }
              if (Date.parse(end) > state.now) {
                setRangeError("End cannot be after the demo clock.");
                return;
              }
              setTimeframe({ label: "Custom Range", hours: 0, start, end });
              closeModal();
            }}
          >
            <p className="sb-muted">
              Demo clock:{" "}
              {new Date(state.now).toISOString().replace("T", " ").slice(0, 16)}{" "}
              UTC
            </p>
            <label>
              From (UTC)
              <input
                type="datetime-local"
                required
                value={custom.start}
                onChange={(e) =>
                  setCustom({ ...custom, start: e.target.value })
                }
              />
            </label>
            <label>
              To (UTC)
              <input
                type="datetime-local"
                required
                value={custom.end}
                onChange={(e) => setCustom({ ...custom, end: e.target.value })}
              />
            </label>
            {rangeError && (
              <p role="alert" className="sb-error">
                {rangeError}
              </p>
            )}
            <button className="sb-primary">Apply range</button>
          </form>
        </SandboxModal>
      )}
      {modal === "filter" && (
        <SandboxModal title="Filter Email Traffic" onClose={closeModal}>
          <form
            className="sb-form"
            onSubmit={(e) => {
              e.preventDefault();
              setFilters(draftFilters);
              closeModal();
            }}
          >
            <label>
              From (Sender)
              <input
                value={draftFilters.from}
                onChange={(e) =>
                  setDraftFilters({ ...draftFilters, from: e.target.value })
                }
                placeholder="e.g. team@ or apple.com"
              />
            </label>
            <label>
              Subject
              <input
                value={draftFilters.subject}
                onChange={(e) =>
                  setDraftFilters({ ...draftFilters, subject: e.target.value })
                }
                placeholder="e.g. Invoice or Security"
              />
            </label>
            <div className="sb-actions">
              <button
                type="button"
                className="sb-secondary"
                onClick={() => {
                  setFilters({ from: "", subject: "" });
                  closeModal();
                }}
              >
                Clear filters
              </button>
              <button className="sb-primary">Apply Filters</button>
            </div>
          </form>
        </SandboxModal>
      )}
      {modal === "selection" && (
        <SandboxModal
          title={selection.department || selection.email || selection.domain}
          onClose={closeModal}
          wide
        >
          <p className="sb-muted">
            {selectedMessages.length} {direction} emails · current timeframe and
            filters
          </p>
          <div className="cmc-domain-messages">
            {selectedMessages.map((email) => (
              <div key={email.id}>
                <div>
                  <strong>{email.subject}</strong>
                  <p>
                    {email.senderEmail} → {email.recipient}
                  </p>
                </div>
                <button
                  type="button"
                  className="sb-secondary"
                  onClick={() => openEmail(email.id)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="sb-primary"
                  onClick={() => {
                    closeModal();
                    dispatch({ type: "OPEN", id: email.id, fromCmc: true });
                  }}
                >
                  View in Mail
                </button>
              </div>
            ))}
            {!selectedMessages.length && (
              <p className="sb-empty">
                No matching emails. Adjust the timeframe or filters to see more
                traffic.
              </p>
            )}
          </div>
        </SandboxModal>
      )}
      {modal === "email" && selectedEmail && (
        <SandboxModal title={selectedEmail.subject} onClose={closeModal} wide>
          <div className="cmc-message-meta">
            From: {selectedEmail.senderEmail}
            <br />
            To: {selectedEmail.recipient}
          </div>
          <div className="cmc-analysis">
            <ShieldCheck size={20} />
            <p>
              <strong>{selectedEmail.securityAnalysis?.verdict}</strong>
              <br />
              {selectedEmail.securityAnalysis?.summary}
            </p>
          </div>
          <div className="cmc-message-body">{selectedEmail.body}</div>
          <div className="sb-actions">
            <button
              type="button"
              className="sb-secondary"
              onClick={() => {
                closeModal();
                dispatch({ type: "OPEN", id: selectedEmail.id, fromCmc: true });
              }}
            >
              <ExternalLink size={15} />
              Open in Webmail
            </button>
            <button
              type="button"
              className="sb-danger"
              onClick={() => {
                dispatch({ type: "PURGE", id: selectedEmail.id });
                closeModal();
              }}
            >
              <Trash2 size={15} />
              Delete across entire domain
            </button>
          </div>
        </SandboxModal>
      )}
      {modal === "settings" && (
        <SandboxModal title="Settings Menu" onClose={closeModal}>
          <div className="sb-form">
            <p className="sb-muted">Email Visualizer · silenceai.net</p>
            <label className="sb-checkbox">
              <input
                type="checkbox"
                checked={labels}
                onChange={(e) => setLabels(e.target.checked)}
              />
              Show sender labels
            </label>
            <button
              type="button"
              className="sb-secondary"
              onClick={() => {
                setTransform({ x: 0, y: 0, k: 1 });
                closeModal();
              }}
            >
              Reset canvas position
            </button>
            <button
              type="button"
              className="sb-secondary"
              onClick={() => setModal("audit")}
            >
              Audit log · {state.logs.length} events
            </button>
            <button
              type="button"
              className="sb-primary"
              onClick={() => {
                closeModal();
                dispatch({ type: "MODE", mode: "webmail" });
              }}
            >
              Open Email Protector
            </button>
          </div>
        </SandboxModal>
      )}
      {modal === "audit" && (
        <SandboxModal title="CMC Audit Log" onClose={closeModal} wide>
          <div className="cmc-audit">
            {state.logs.map((log) => (
              <article key={log.id}>
                <time>{log.time}</time>
                <div>
                  <strong>{log.category}</strong>
                  <p>{log.detail}</p>
                  <span>{log.action}</span>
                </div>
              </article>
            ))}
          </div>
        </SandboxModal>
      )}
      {modal === "profile" && (
        <SandboxModal title="jmqst011" onClose={closeModal}>
          <div className="sb-form">
            <p>Administrator · silenceai.net</p>
            <p className="sb-muted">
              Domain visibility: all demo mailboxes
              <br />
              Permissions: inspect incidents, review audit events, purge
              campaigns.
            </p>
            <button
              type="button"
              className="sb-primary"
              onClick={() => setModal("audit")}
            >
              View account activity
            </button>
          </div>
        </SandboxModal>
      )}
      {modal === "instructions" && (
        <SandboxModal
          title="Email Visualizer Instructions"
          onClose={closeModal}
        >
          <ol className="cmc-instructions">
            <li>Click a domain or sender to inspect its emails.</li>
            <li>
              Use TimeFrame and Filter to narrow traffic. Switch to Outgoing for
              sent messages.
            </li>
            <li>
              Scroll to zoom, drag to pan, or double-click to reset the canvas.
            </li>
            <li>Open the pink arrow to review five threat categories.</li>
            <li>
              Simulate an attack, open its message, and delete the campaign
              across the domain. Review the result in Email Protector and the
              audit log.
            </li>
          </ol>
        </SandboxModal>
      )}
      {modal === "web" && (
        <SandboxModal
          title="Web Security · Email links"
          onClose={closeModal}
          wide
        >
          <div className="cmc-domain-messages">
            {traffic
              .filter((e) => e.securityAnalysis?.detectedLinks?.length)
              .map((email) => (
                <div key={email.id}>
                  <div>
                    <strong>{email.subject}</strong>
                    {email.securityAnalysis.detectedLinks.map((link) => (
                      <p key={link.url}>
                        {link.targetHost} · {link.status} · {link.action}
                      </p>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="sb-secondary"
                    onClick={() => openEmail(email.id)}
                  >
                    Inspect
                  </button>
                </div>
              ))}
            {!traffic.some(
              (e) => e.securityAnalysis?.detectedLinks?.length,
            ) && (
              <p className="sb-empty">
                No detected links in this traffic selection.
              </p>
            )}
          </div>
        </SandboxModal>
      )}
    </div>
  );
}
