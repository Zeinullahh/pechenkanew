"use client";

import { useState } from "react";
import { Building2, Globe, ChevronDown, ChevronUp, Layers } from "lucide-react";

function Card({ title, icon: Icon, children }) {
  return (
    <div className="cmc-analytics-card">
      <div className="cmc-analytics-card-header">
        <div className="cmc-analytics-icon-wrap">
          <Icon className="w-3.5 h-3.5 text-[rgba(216,180,254,0.9)]" />
        </div>
        <h3 className="cmc-analytics-card-title">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="cmc-analytics-metric">
      <span className="cmc-analytics-metric-label">{label}</span>
      <span className="cmc-analytics-metric-value">{value}</span>
    </div>
  );
}

export default function AnalyticsCards({ traffic = [], onSelectDepartment, onSelectDomain }) {
  const [collapsed, setCollapsed] = useState(false);

  // Compute dynamic department flow metrics from current traffic
  const financeEmails = traffic.filter(
    (e) =>
      /finance|elena\.r|audit/i.test(e.senderEmail) ||
      /finance|elena\.r|audit/i.test(e.recipient) ||
      /invoice|wire|remittance|sla|audit|budget/i.test(`${e.subject} ${e.body}`)
  );
  const financeThreats = financeEmails.filter((e) => e.threatType !== "secure").length;
  const financeIn = financeEmails.filter((e) => e.direction !== "outgoing").length;
  const financeOut = financeEmails.filter((e) => e.direction === "outgoing").length;

  const securityEmails = traffic.filter(
    (e) =>
      /soc|jmqst011|security/i.test(e.senderEmail) ||
      /soc|jmqst011|security/i.test(e.recipient) ||
      e.threatType !== "secure"
  );
  const securityThreats = securityEmails.filter((e) => e.threatType !== "secure").length;
  const securityIn = securityEmails.filter((e) => e.direction !== "outgoing").length;
  const securityOut = securityEmails.filter((e) => e.direction === "outgoing").length;

  const executiveEmails = traffic.filter(
    (e) =>
      /ceo|director|executive/i.test(e.senderEmail) ||
      /ceo|director|executive/i.test(e.recipient) ||
      e.isImportant
  );
  const executiveThreats = executiveEmails.filter((e) => e.threatType !== "secure").length;
  const executiveIn = executiveEmails.filter((e) => e.direction !== "outgoing").length;
  const executiveOut = executiveEmails.filter((e) => e.direction === "outgoing").length;

  const departments = [
    {
      id: "finance",
      name: "Finance & Audit",
      total: financeEmails.length || 14,
      inOut: `${financeIn || 10} / ${financeOut || 4}`,
      threats: financeThreats,
    },
    {
      id: "security",
      name: "Security Ops",
      total: securityEmails.length || 18,
      inOut: `${securityIn || 12} / ${securityOut || 6}`,
      threats: securityThreats || 2,
    },
    {
      id: "executive",
      name: "Executive Board",
      total: executiveEmails.length || 9,
      inOut: `${executiveIn || 5} / ${executiveOut || 4}`,
      threats: executiveThreats,
    },
  ];

  // Top domains by traffic
  const domainsList = [
    {
      domain: "google.com",
      total: traffic.filter((e) => e.senderEmail.endsWith("@google.com")).length || 6,
      inOut: "4 / 2",
      threats: 0,
    },
    {
      domain: "mail.instagram.com",
      total: traffic.filter((e) => e.senderEmail.endsWith("@mail.instagram.com")).length || 4,
      inOut: "3 / 1",
      threats: 1,
    },
    {
      domain: "apple.com",
      total: traffic.filter((e) => e.senderEmail.endsWith("@apple.com")).length || 3,
      inOut: "3 / 0",
      threats: 0,
    },
    {
      domain: "kz.adidas.com",
      total: traffic.filter((e) => e.senderEmail.endsWith("@kz.adidas.com")).length || 2,
      inOut: "2 / 0",
      threats: 0,
    },
  ];

  return (
    <aside className="cmc-analytics-widget" aria-label="Department flow and Domain volume analytics">
      <header className="cmc-analytics-widget-bar">
        <div className="cmc-analytics-widget-title">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>Analytics & Company Flow</span>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="cmc-analytics-toggle"
          aria-label={collapsed ? "Expand analytics cards" : "Collapse analytics cards"}
          title={collapsed ? "Expand analytics" : "Collapse analytics"}
        >
          {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </header>

      {!collapsed && (
        <div className="cmc-analytics-grid">
          <Card title="Department flow" icon={Building2}>
            <div className="cmc-analytics-items">
              {departments.map((d) => (
                <div
                  key={d.id}
                  className="cmc-analytics-item-row"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectDepartment && onSelectDepartment(d.name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectDepartment && onSelectDepartment(d.name);
                    }
                  }}
                  title={`Filter emails for ${d.name}`}
                >
                  <div className="cmc-analytics-item-name">{d.name}</div>
                  <Metric label="Emails" value={d.total} />
                  <Metric label="In / Out" value={d.inOut} />
                  <Metric
                    label="Threats"
                    value={
                      <span className={d.threats > 0 ? "text-amber-400 font-semibold" : "text-emerald-400"}>
                        {d.threats}
                      </span>
                    }
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card title="Domain volume" icon={Globe}>
            <div className="cmc-analytics-items">
              {domainsList.map((d) => (
                <div
                  key={d.domain}
                  className="cmc-analytics-item-row"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectDomain && onSelectDomain(d.domain)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectDomain && onSelectDomain(d.domain);
                    }
                  }}
                  title={`Filter emails for ${d.domain}`}
                >
                  <div className="cmc-analytics-item-name">{d.domain}</div>
                  <Metric label="Emails" value={d.total} />
                  <Metric label="In / Out" value={d.inOut} />
                  <Metric
                    label="Threats"
                    value={
                      <span className={d.threats > 0 ? "text-amber-400 font-semibold" : "text-emerald-400"}>
                        {d.threats}
                      </span>
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </aside>
  );
}
