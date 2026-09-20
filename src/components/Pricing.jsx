"use client";


import React, { useState, useMemo } from "react";
import { CybersecurityLamp } from "./CybersecurityLamp";
import { useLanguage } from "@/contexts/LanguageContext";
import { convertPrice, formatPrice } from "@/lib/currency";
import CurrencySelector from "./CurrencySelector";
import { motion } from "framer-motion";
import { competitiveComparisons } from "@/lib/competitiveComparison";
import GlassSurface from "@/components/GlassSurface";
import InteractiveSandbox from "@/components/sandbox/InteractiveSandbox";


// Microsoft 365 Pricing Data
const PRICING_DATA = {
  // Business plans
  business: {
    standard: {
      yearly: 7.30,
      monthly: 8.60,
      kzt: { yearly: 3400, monthly: 3400 },
      unit: "/user/month",
    },
    premium: { // Premium 100
      yearly: 12.00,
      monthly: 13.45,
      kzt: { yearly: 5500, monthly: 5500 },
      unit: "/user/month",
    },
    max: { // Business MAX 100
      yearly: 25.00,
      monthly: 25.00,
      kzt: { yearly: 11500, monthly: 11500 },
      unit: "/user/month",
    },
  },
};


const PRODUCT_OPTIONS = [
  {
    id: "email",
    labelKey: "pricing.aiSoc.tabs.email",
    labelFallback: "Email Security",
    endpointX: 100,
  },
  {
    id: "web",
    labelKey: "pricing.aiSoc.tabs.web",
    labelFallback: "Web Security",
    endpointX: 300,
  },
  {
    id: "pentester",
    labelKey: "pricing.aiSoc.tabs.pentester",
    labelFallback: "Pentester",
    endpointX: 500,
  },
  {
    id: "server",
    labelKey: "pricing.aiSoc.tabs.server",
    labelFallback: "Server Security",
    endpointX: 700,
  },
];


const COMMON_FEATURE_KEYS = [
  "pricing.aiSoc.features.common.customDomainEmail",
  "pricing.aiSoc.features.common.officeSuite",
  "pricing.aiSoc.features.common.adminConsole",
  "pricing.aiSoc.features.common.dnsSecuritySetup",
  "pricing.aiSoc.features.common.emailMigration",
  "pricing.aiSoc.features.common.aiThreatProtection",
  "pricing.aiSoc.features.common.emailFlowVisualization",
  "pricing.aiSoc.features.common.domainWideDeletion",
];


const PLAN_SPECIFIC_FEATURE_KEYS = {
  premium: [
    "pricing.aiSoc.features.premium.userLimit",
    "pricing.aiSoc.features.premium.adminLimit",
    "pricing.aiSoc.features.premium.storage",
  ],
  max: [
    "pricing.aiSoc.features.max.userLimit",
    "pricing.aiSoc.features.max.adminLimit",
    "pricing.aiSoc.features.max.storage",
  ],
  standard: [
    "pricing.aiSoc.features.standard.userLimit",
    "pricing.aiSoc.features.standard.adminLimit",
    "pricing.aiSoc.features.standard.storage",
  ],
};


const FEATURE_FALLBACKS = {
  "pricing.aiSoc.features.common.customDomainEmail": "Custom company email on your own domain (you@yourcompany.com)",
  "pricing.aiSoc.features.common.officeSuite": "Desktop and mobile office suite including document, spreadsheet, presentation, and email tools",
  "pricing.aiSoc.features.common.adminConsole": "Admin console with domain-wide email management and bulk operations",
  "pricing.aiSoc.features.common.dnsSecuritySetup": "Email security setup through DNS (SPF, DKIM, DMARC) on the admin console",
  "pricing.aiSoc.features.common.emailMigration": "Email migration",
  "pricing.aiSoc.features.common.aiThreatProtection": "5 layered, AI-powered threat protection with automatic email categorization (Secure, Spam, Dangerous Links, Phishing, Spoofed)",
  "pricing.aiSoc.features.common.emailFlowVisualization": "Advanced email flow visualization across entire domain with comprehensive filters on the Admin Console",
  "pricing.aiSoc.features.common.domainWideDeletion": "Ability for admin to delete emails across all users in domain",
  "pricing.aiSoc.features.premium.userLimit": "For enterprises with 15-300 employees",
  "pricing.aiSoc.features.premium.adminLimit": "Up to 5 administrators",
  "pricing.aiSoc.features.premium.storage": "Up to 50GB storage per user",
  "pricing.aiSoc.features.max.userLimit": "Unlimited number of users",
  "pricing.aiSoc.features.max.adminLimit": "Up to 10 administrators",
  "pricing.aiSoc.features.max.storage": "Up to 200GB storage per user",
  "pricing.aiSoc.features.standard.userLimit": "For enterprises with 1-15 employees",
  "pricing.aiSoc.features.standard.adminLimit": "Up to 1 administrator",
  "pricing.aiSoc.features.standard.storage": "Up to 8GB storage per user",
};


const BUSINESS_PLAN_CONFIG = [
  {
    id: "standard",
    segment: "business",
    titleKey: "pricing.aiSoc.planTitles.standard",
    titleFallback: "Business Standard",
    featureKeys: [...COMMON_FEATURE_KEYS, ...PLAN_SPECIFIC_FEATURE_KEYS.standard],
  },
  {
    id: "premium",
    segment: "business",
    titleKey: "pricing.aiSoc.planTitles.premium",
    titleFallback: "Business Premium 100",
    featureKeys: [...COMMON_FEATURE_KEYS, ...PLAN_SPECIFIC_FEATURE_KEYS.premium],
  },
  {
    id: "max",
    segment: "business",
    titleKey: "pricing.aiSoc.planTitles.max",
    titleFallback: "Business MAX 100",
    featureKeys: [...COMMON_FEATURE_KEYS, ...PLAN_SPECIFIC_FEATURE_KEYS.max],
  },
];

const SERVER_SECURITY_PRICING = {
  monthly: 29,
  annual: 290,
  billingUnit: "protected server",
  annualBadge: "2 months free",
};

const SERVER_SECURITY_GROUPS = [
  {
    title: "Access Protection",
    features: [
      "Just-in-time server access",
      "Temporary firewall authorization",
      "MFA and TOTP authentication",
      "IP / CIDR access policies",
      "Automatic access expiration",
      "Brute-force and rate-limit protection",
      "Protected SSH and configured TCP services",
    ],
  },
  {
    title: "Server & Workload Protection",
    features: [
      "File Integrity Monitoring",
      "Vulnerability detection",
      "Security configuration assessment",
      "Package and system inventory",
      "Container and Kubernetes workload visibility",
    ],
  },
  {
    title: "Automated Defense",
    features: [
      "Malicious IP blocking",
      "Automated firewall response",
      "Behavioral threat protection",
      "Automatic access revocation",
      "Automated remediation controls",
    ],
  },
  {
    title: "Centralized Management",
    features: [
      "Silence AI CMC dashboard",
      "Centralized Guard management",
      "Security alerts and incident timeline",
      "Infrastructure inventory and audit logs",
      "Central policy management",
    ],
  },
];

/* Legacy long-form comparison retained in source history for reference.
const SERVER_SECURITY_COMPARISON = [
  {
    capability: "Pricing model",
    silence: "$29/server/month · $290/server/year",
    datadog: "From $25/host/month annually; $30 on-demand",
    wazuh: "Cloud starts at $571/month · up to 100 agents",
    tailscale: "$18/user/month plus applicable resource pricing",
    cloudflare: "$7/user/month public pay-as-you-go",
  },
  {
    capability: "Server / workload threat protection",
    silence: "Included",
    datadog: "Included",
    wazuh: "Included",
    tailscale: "Not its primary purpose",
    cloudflare: "Not its primary purpose",
  },
  {
    capability: "Vulnerability management",
    silence: "Included",
    datadog: "Included",
    wazuh: "Included",
    tailscale: "Not core",
    cloudflare: "Not core",
  },
  {
    capability: "File Integrity Monitoring",
    silence: "Included",
    datadog: "Included",
    wazuh: "Included",
    tailscale: "Not core",
    cloudflare: "Not core",
  },
  {
    capability: "Just-in-time infrastructure/server access",
    silence: "Included",
    datadog: "Not the primary function",
    wazuh: "Not a native core access platform",
    tailscale: "Included",
    cloudflare: "Temporary / policy-based access available",
  },
  {
    capability: "MFA / identity-aware access",
    silence: "Included",
    datadog: "Not the core server-access product",
    wazuh: "Not the core access model",
    tailscale: "Supported through identity-provider capabilities",
    cloudflare: "Included through Access / IdP and MFA policies",
  },
  {
    capability: "Automated security response",
    silence: "Included",
    datadog: "Available through security workflows",
    wazuh: "Active Response available",
    tailscale: "Access control focused",
    cloudflare: "Access / network policy focused",
  },
  {
    capability: "Combined server protection + server access",
    silence: "✓ One platform",
    datadog: "Primarily cloud/workload security",
    wazuh: "Primarily endpoint/XDR/SIEM-style monitoring",
    tailscale: "Primarily secure connectivity/access",
    cloudflare: "Primarily Zero Trust/SSE/access",
  },
];

*/

const PENTEST_FEATURES = [
  "Graph-first source-code analysis",
  "Automatic Graphify security graph creation",
  "Continuous project graph updates",
  "Full SAST",
  "Full DAST",
  "Website penetration testing",
  "API penetration testing",
  "Source-code-aware penetration testing",
  "Business-logic vulnerability discovery",
  "Authentication & authorization testing",
  "Multi-step workflow analysis",
  "Cross-service attack-path analysis",
  "Autonomous vulnerability investigation",
  "Exploitability validation",
  "Attack-chain discovery",
  "Kimi K2.7 Code security agents",
  "Kimi K3 advanced reasoning",
  "Intelligent model routing",
  "Dependency and configuration analysis",
  "Security misconfiguration detection",
  "Vulnerability prioritization",
  "Remediation recommendations",
  "Corrected-code / remediation suggestions",
  "Vulnerability retesting",
  "Security reports",
  "Executive reports",
  "Technical developer reports",
  "CI/CD integration",
  "Multiple repositories/projects supported",
];

/* Legacy long-form comparison retained in source history for reference.
const PENTEST_COMPARISON = [
  ["Primary approach", "Source-aware autonomous penetration testing", "Developer-first AppSec platform", "Autonomous infrastructure penetration testing", "Application/API scanning + attack-surface management", "AI white-box web-app pentesting"],
  ["Public pricing model", "$9,900/year + prepaid compute", "Per contributing developer / Enterprise quote", "Annual asset-based license", "Annual platform fee + target costs", "Per pentest"],
  ["Public pricing reference", "$9,900/year", "Team from $25/dev/month; Ignite from $1,260/dev/year", "Core: $25,000/year for 500 assets", "Enterprise from €15,000/year + target fees", "$3,500/test for subscribers; $4,000 one-off"],
  ["SAST + live application testing in one workflow", "Included", "Available / varies by product", "Different product focus", "Available / varies by product", "Available / varies by product"],
  ["Persistent graph-first understanding of source code", "Included", "Different architecture / not positioned as the core workflow", "Different architecture / not positioned as the core workflow", "Different architecture / not positioned as the core workflow", "Different architecture / not positioned as the core workflow"],
  ["Business-logic reasoning", "Autonomous source + runtime reasoning", "Available through broader offensive-security offerings", "Infrastructure-focused", "Application scanning focus", "AI pentest workflow"],
  ["Autonomous exploit validation", "Included", "Available / varies by product", "Core strength", "Available / varies by product", "AI pentest workflow"],
  ["Cost control before scan", "Maximum compute authorized before testing", "Plan / scope dependent", "Plan / scope dependent", "Plan / scope dependent", "Plan / scope dependent"],
  ["Usage-based AI compute", "$5 / 1M Pentest Compute Tokens", "Not directly comparable / bundled", "Not directly comparable / bundled", "Not directly comparable / bundled", "Not directly comparable / bundled"],
];

*/

const SERVER_SECURITY_COLUMNS = [
  { key: "silence", label: "Silence AI" },
  { key: "datadog", label: "Datadog CSM" },
  { key: "wazuh", label: "Wazuh Cloud" },
  { key: "tailscale", label: "Tailscale Premium" },
  { key: "cloudflare", label: "Cloudflare Zero Trust" },
];

const SERVER_SECURITY_COMPARISON = [
  {
    capability: "One-command full server protection",
    silence: { status: "builtIn" },
    datadog: { status: "unavailable" },
    wazuh: { status: "partial", tooltip: "Agent deployment and security modules require additional configuration." },
    tailscale: { status: "unavailable" },
    cloudflare: { status: "unavailable" },
  },
  {
    capability: "TOTP unlocks SSH / Kubernetes only when needed",
    silence: {
      status: "builtIn",
      tooltip: "TOTP temporarily allows the administrator’s source IP; normal SSH or Kubernetes authentication still applies.",
    },
    datadog: { status: "unavailable" },
    wazuh: { status: "unavailable" },
    tailscale: { status: "partial", tooltip: "Identity-provider MFA and access policies use a different access model." },
    cloudflare: { status: "partial", tooltip: "MFA access policies use a different model from temporary source-IP authorization." },
  },
  {
    capability: "Automatically blocks attacking IPs",
    silence: { status: "builtIn" },
    datadog: { status: "partial", tooltip: "Automated response depends on configured workflows and integrations." },
    wazuh: { status: "builtIn" },
    tailscale: { status: "unavailable" },
    cloudflare: { status: "partial", tooltip: "Network controls have a different scope from host-level automated blocking." },
  },
  {
    capability: "Runtime + file + malware protection",
    silence: { status: "builtIn" },
    datadog: { status: "partial", tooltip: "Coverage spans multiple Cloud Security capabilities and configuration." },
    wazuh: { status: "builtIn" },
    tailscale: { status: "unavailable" },
    cloudflare: { status: "unavailable" },
  },
  {
    capability: "Vulnerability & security posture monitoring",
    silence: { status: "builtIn" },
    datadog: { status: "builtIn" },
    wazuh: { status: "builtIn" },
    tailscale: { status: "unavailable" },
    cloudflare: { status: "unavailable" },
  },
  {
    capability: "Incidents + active blocks in one dashboard",
    silence: { status: "builtIn" },
    datadog: { status: "partial", tooltip: "Connecting findings with response depends on configured workflows and integrations." },
    wazuh: { status: "partial", tooltip: "Active Response is available; setup and dashboard workflow vary by configuration." },
    tailscale: { status: "unavailable" },
    cloudflare: { status: "partial", tooltip: "Access and network events differ from host-level incidents and active blocks." },
  },
  {
    capability: "Pricing",
    pricing: true,
    silence: ["$29/server/month", "$290/server/year"],
    datadog: ["$25/host/month annually", "$30/host/month on-demand"],
    wazuh: ["From $571/month", "Up to 100 agents"],
    tailscale: ["$18/user/month"],
    cloudflare: ["$7/user/month"],
  },
];

const trackPricingEvent = (eventName) => {
  if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName });
  }
};

const ProductComparison = ({ productType }) => {
  const comparison = competitiveComparisons[productType];

  if (!comparison) return null;

  return (
    <section className="mt-12 sm:mt-16" aria-labelledby={`${productType}-security-comparison-title`}>
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          {comparison.eyebrow || "Competitive advantages"}
        </p>
        <h3 id={`${productType}-security-comparison-title`} className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          {comparison.title}
        </h3>
        {comparison.description && (
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60">
            {comparison.description}
          </p>
        )}
        <p className="mt-3 text-xs font-medium text-sky-200/70 sm:hidden">
          Swipe or drag horizontally to compare every option <span aria-hidden="true">→</span>
        </p>
      </div>
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={24}
        backgroundOpacity={0.08}
        saturation={1.55}
        blur={14}
        displace={0.35}
        className="pricing-comparison-surface mx-auto w-[90vw] max-w-none overflow-hidden rounded-3xl"
      >
        <div
          className="pricing-table-scroll w-full overflow-x-auto"
          tabIndex="0"
          role="region"
          aria-label={`${comparison.title}. Scroll horizontally to view all providers.`}
        >
          <table className="w-full min-w-[980px] lg:min-w-[1100px] table-fixed border-collapse text-left text-[11px] sm:text-sm">
            <thead className="text-slate-200">
              <tr>
                {comparison.columns.map((column, index) => (
                  <th
                    key={column.label || column}
                    className={`border-b border-sky-300/25 px-2 py-4 text-center font-semibold sm:px-4 ${
                      index === 0
                        ? "sticky left-0 z-20 w-[210px] min-w-[190px] sm:w-[240px] sm:min-w-[220px] bg-slate-950/95 text-left"
                        : "w-[150px] min-w-[140px] sm:w-[175px] sm:min-w-[160px]"
                    } ${index === 1 ? "bg-emerald-500/10 text-white" : ""}`}
                  >
                    <span className="block px-1 leading-tight break-words">{column.label || column}</span>
                    {column.sublabel && (
                      <span className="mt-1 block text-[10px] font-normal text-white/45">
                        {column.sublabel}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map(([feature, values]) => {
                const isPricingRow = feature?.isPricingRow;
                const featureKey = typeof feature === "string" ? feature : feature.label;
                return (
                  <tr
                    key={featureKey}
                    className={`border-b border-sky-300/20 last:border-0 ${
                      isPricingRow ? "bg-white/[0.035]" : ""
                    }`}
                  >
                    <th
                      className={`sticky left-0 z-10 border-r border-sky-300/25 bg-slate-950/95 px-3 py-4 text-left font-medium text-slate-200 sm:px-5 ${
                        isPricingRow ? "bg-slate-900/95 py-5 text-white" : ""
                      }`}
                    >
                      {typeof feature === "string" ? (
                        feature
                      ) : (
                        <div>
                          <span className="block font-semibold text-white text-xs sm:text-sm">
                            {feature.label}
                          </span>
                          <span className="mt-1 flex items-center gap-1.5 text-[11px] text-white/70">
                            {feature.icon && (
                              <img
                                src={feature.icon}
                                alt="Notion"
                                width={16}
                                height={16}
                                className="h-4 w-4 shrink-0 object-contain aspect-square inline-block"
                                loading="lazy"
                              />
                            )}
                            <span className="font-normal">{feature.sublabel}</span>
                          </span>
                        </div>
                      )}
                    </th>
                    {values.map((value, index) => (
                      <td
                        key={`${featureKey}-${index}`}
                        className={`border-r border-sky-300/25 px-3 py-4 text-center align-middle last:border-r-0 ${
                          index === 0
                            ? isPricingRow
                              ? "bg-emerald-500/[0.18] text-emerald-300 shadow-[inset_0_0_32px_rgba(16,185,129,0.08)]"
                              : "bg-emerald-500/10 text-emerald-300"
                            : isPricingRow
                            ? "bg-white/[0.02] text-slate-200"
                            : "text-slate-200"
                        }`}
                      >
                        {typeof value === "boolean" ? (
                          <span className={`text-2xl font-semibold ${value ? "text-emerald-400" : "text-rose-400"}`}>
                            {value ? "✓" : "✕"}
                          </span>
                        ) : value?.type === "check" ? (
                          <span className="flex flex-col items-center gap-1">
                            <span className="text-2xl font-semibold text-emerald-400">✓</span>
                            <span className="max-w-[155px] text-[11px] leading-4 text-white/50">{value.comment}</span>
                          </span>
                        ) : value?.value ? (
                          <span className="flex flex-col items-center justify-center gap-0.5">
                            <span
                              className={`text-sm tracking-tight whitespace-nowrap ${
                                value.highlight || index === 0
                                  ? "text-emerald-300 font-bold sm:text-base"
                                  : "text-white font-semibold sm:text-sm"
                              }`}
                            >
                              {value.value}
                            </span>
                            {value.comment && (
                              <span className="text-[10px] uppercase font-medium tracking-wider text-white/45 whitespace-nowrap">
                                {value.comment}
                              </span>
                            )}
                            {value.note && (
                              <span className="text-[10px] font-medium text-emerald-400/90 whitespace-nowrap">
                                {value.note}
                              </span>
                            )}
                          </span>
                        ) : (
                          <span
                            className={`inline-block ${
                              typeof value === "string" && value.length > 25 ? "text-left" : "text-center whitespace-nowrap"
                            } text-xs leading-5 sm:text-[13px] text-slate-200`}
                          >
                            {value}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassSurface>
      {comparison.footnote && (
        <p className="mx-auto mt-4 max-w-5xl text-center text-[11px] leading-5 text-white/35 sm:text-left">
          {comparison.footnote}
        </p>
      )}
    </section>
  );
};

const BillingPill = ({ billing, setBilling, labels, ariaLabel }) => (
  <div
    className="flex min-w-[220px] items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
    role="group"
    aria-label={ariaLabel}
  >
    {[["yearly", labels.yearly], ["monthly", labels.monthly]].map(([value, label]) => (
      <button
        key={value}
        type="button"
        onClick={() => setBilling(value)}
        aria-pressed={billing === value}
        className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${billing === value ? "bg-blue-500 text-white" : "text-white/50 hover:text-white"}`}
      >
        {label}
      </button>
    ))}
  </div>
);

const FeatureItem = ({ children, compact = false }) => (
  <li className={`flex gap-2 leading-5 text-white/70 ${compact ? "text-xs" : "text-sm"}`}>
    <span className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true">✓</span>
    <span>{children}</span>
  </li>
);

const EmailSecurityPricing = ({
  plans,
  billing,
  setBilling,
  billingLabels,
  currency,
  onCurrencyChange,
  onOpenModal,
}) => {
  const sharedFeatures = plans[0]?.features.slice(0, -3) ?? [];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Email Security</p>
          <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Choose the capacity your team needs.</h3>
          <p className="mt-4 text-sm leading-6 text-white/60">Every plan includes the complete email protection platform. Plans differ only by team size, administrator seats, and mailbox storage.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <BillingPill billing={billing} setBilling={setBilling} labels={billingLabels} ariaLabel="Email security billing period" />
          <CurrencySelector currency={currency} onCurrencyChange={onCurrencyChange} pricingStyle />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {plans.map((plan) => {
          const priceData = PRICING_DATA.business[plan.id];
          const price = billing === "yearly" ? priceData.yearly : priceData.monthly;
          const displayPrice = currency === "KZT"
            ? priceData.kzt[billing]
            : convertPrice(price, currency);
          const differentiators = plan.features.slice(-3);
          const highlighted = plan.id === "premium";

          return (
            <GlassSurface
              key={plan.id}
              width="100%"
              height="100%"
              borderRadius={26}
              backgroundOpacity={highlighted ? 0.12 : 0.08}
              saturation={1.55}
              blur={14}
              displace={0.35}
              className={`pricing-glass-panel pricing-glass-card overflow-hidden rounded-[26px] flex flex-col h-full ${
                highlighted ? "border border-blue-300/40 shadow-[0_18px_70px_rgba(37,99,235,0.2)]" : ""
              }`}
            >
              <div className={`relative flex h-full flex-col p-6 sm:p-7 ${highlighted ? "bg-blue-500/[0.08]" : ""}`}>
                {highlighted && <span className="absolute right-5 top-5 rounded-full border border-blue-300/25 bg-blue-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-100">Most popular</span>}
                <p className="pr-24 text-lg font-semibold text-white">{plan.title}</p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">{formatPrice(displayPrice, currency)}</span>
                  <span className="pb-1 text-xs leading-4 text-white/45">/ user<br />/ month</span>
                </div>
                <p className="mt-2 text-xs text-white/45">{billing === "yearly" ? "Annual commitment" : "Billed monthly"}</p>

                <div className="my-6 h-px bg-white/10" />
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">Plan capacity</p>
                <ul className="space-y-3">
                  {differentiators.map((feature) => {
                    const label = typeof feature === "string" ? feature : feature.label;
                    return <FeatureItem key={label}>{label}</FeatureItem>;
                  })}
                </ul>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className={`pricing-button-invert mt-auto w-full rounded-full px-6 py-3 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${highlighted ? "bg-blue-500" : "border border-white/20 bg-white/[0.04]"}`}
                  style={{ marginTop: "2rem" }}
                >
                  Choose {plan.title}
                </button>
              </div>
            </GlassSurface>
          );
        })}
      </div>

      <GlassSurface width="100%" height="auto" borderRadius={24} backgroundOpacity={0.08} saturation={1.55} blur={14} displace={0.35} className="pricing-glass-panel mt-6 overflow-hidden rounded-3xl">
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Included in every plan</p>
              <h4 className="mt-2 text-xl font-semibold text-white">Complete protection, without security add-ons.</h4>
            </div>
            <p className="text-xs text-white/45">Only capacity changes between plans.</p>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {sharedFeatures.map((feature) => {
              const featureItem = typeof feature === "string" ? { label: feature } : feature;
              return (
                <FeatureItem key={featureItem.label} compact>
                  <span className="flex items-center gap-2">
                    {featureItem.icon && <img src={featureItem.icon} alt={featureItem.iconAlt || ""} className="h-5 w-5 object-contain" loading="lazy" />}
                    {featureItem.label.replace(/:$/, "")}
                  </span>
                </FeatureItem>
              );
            })}
          </ul>
        </div>
      </GlassSurface>
    </div>
  );
};

const WebSecurityPricing = ({
  billing,
  setBilling,
  billingLabels,
  currency,
  onCurrencyChange,
  onOpenModal,
}) => {
  const isAnnual = billing === "yearly";
  const monthlyPrice = isAnnual ? 350 : 420;
  const annualCharge = 4200;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Web Security</p>
          <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">One product. Full protection.</h3>
          <p className="mt-4 text-sm leading-6 text-white/60">Your price changes with usage — not with how well we protect you.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <BillingPill billing={billing} setBilling={setBilling} labels={billingLabels} ariaLabel="Web security billing period" />
          <CurrencySelector currency={currency} onCurrencyChange={onCurrencyChange} pricingStyle />
        </div>
      </div>

      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={28}
        backgroundOpacity={0.08}
        saturation={1.55}
        blur={14}
        displace={0.35}
        className="pricing-glass-panel pricing-glass-card overflow-hidden rounded-[28px]"
      >
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.25fr] lg:p-8 items-center">
          {/* Left Column: Pricing & CTA */}
          <div className="flex flex-col justify-between space-y-6 h-full">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                  All-in-one Web Defense
                </span>
                <span className="text-xs text-white/45">Instant deployment</span>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Full security platform</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-semibold tracking-tight text-white">
                    {formatPrice(convertPrice(monthlyPrice, currency), currency)}
                  </span>
                  <span className="text-sm text-white/50">/ month</span>
                </div>
                {isAnnual ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      2 months free · Save $840 / year
                    </span>
                    <p className="text-xs text-white/45">
                      Billed annually at {formatPrice(convertPrice(annualCharge, currency), currency)}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-white/45">Billed monthly · Cancel anytime</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenModal}
              className="pricing-button-invert w-full rounded-full bg-blue-500 py-3.5 px-6 font-medium text-white shadow-[0_4px_24px_rgba(59,130,246,0.35)] transition-all hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Start protecting your website
            </button>
          </div>

          {/* Right Column: Usage Breakdown */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-blue-300/20 bg-blue-500/[0.07] p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Included every month</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xl font-semibold text-white">10M</p>
                      <p className="mt-0.5 text-xs text-white/45">legitimate requests</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">25 GB</p>
                      <p className="mt-0.5 text-xs text-white/45">SIEM log storage</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Pay as you go</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xl font-semibold text-white">{formatPrice(convertPrice(1, currency), currency)}</p>
                      <p className="mt-0.5 text-xs text-white/45">per extra 1M requests</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">{formatPrice(convertPrice(0.5, currency), currency)}</p>
                      <p className="mt-0.5 text-xs text-white/45">per extra GB / month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-emerald-300/25 bg-emerald-400/[0.08] px-4 py-2.5">
                <p className="text-xs sm:text-sm font-semibold text-emerald-200">✓ BLOCKED MALICIOUS TRAFFIC — $0.00</p>
                <p className="mt-0.5 text-[11px] text-white/55">You pay for your legitimate users. Never your attackers.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">SIEM log retention</p>
                <p className="mt-1 text-xs text-white/50">Control storage with flexible retention periods</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <span>7d</span>
                <span className="text-white/30">·</span>
                <span>30d</span>
                <span className="text-white/30">·</span>
                <span>90d</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-blue-500/[0.07] px-6 py-4 text-center sm:px-10">
          <p className="text-xs sm:text-sm font-semibold text-white">
            Single predictable price · Zero request fees on blocked traffic · Full WAF, IPS, DDoS & SIEM included
          </p>
        </div>
      </GlassSurface>
    </div>
  );
};


const Pricing = ({ currency, onCurrencyChange, onOpenModal, showLamp = true }) => {
  const { t } = useLanguage();
  const [billing, setBilling] = useState("yearly"); // "yearly" or "monthly"
  const [productType, setProductType] = useState("email");
  const [hoveredProductType, setHoveredProductType] = useState(null);
  const highlightedProductType = hoveredProductType ?? productType;


  const billingLabels = useMemo(
    () => ({
      yearly: "Annual",
      monthly: t("pricing.aiSoc.billing.monthly", "Monthly"),
    }),
    [t]
  );


  const calendlyFeature = useMemo(
    () => ({
      label: t("aiSocPricing.calendlyIntegration", "Supports integration with Calendly"),
      icon: "/partners/calendly.png",
      iconAlt: "Calendly",
    }),
    [t]
  );


  const businessPlans = useMemo(
    () =>
      BUSINESS_PLAN_CONFIG.map((plan) => {
        const { featureKeys, titleKey, titleFallback, ...rest } = plan;


        return {
          ...rest,
          title: t(titleKey, titleFallback),
          features: [
            calendlyFeature,
            ...featureKeys.map((featureKey) =>
              t(featureKey, FEATURE_FALLBACKS[featureKey] || featureKey)
            ),
          ],
        };
      }),
    [calendlyFeature, t]
  );


  const webPlans = useMemo(() => {
    const plan = {
      id: "globalShield",
        title: t("pricing.plans.globalShield.title", "Web Security and Traffic Management"),
        features: [
        t("pricing.plans.globalShield.features.webProtection", "Full WAF protection"),
        "Dedicated Web IPS layer",
        t("pricing.plans.globalShield.features.ddosProtection", "Real-time DDoS protection"),
        "Behavioral CAPTCHA and bot protection",
        "Integrated Web Threat SIEM",
        t("pricing.plans.globalShield.features.cmc", "Security analytics and global traffic monitoring"),
        t("pricing.plans.globalShield.features.country", "Country blocking"),
        "IP and subnet blocking",
        t("pricing.plans.globalShield.features.aiManager", "AI security manager that can execute security actions"),
      ],
    };
    return [plan];
  }, [calendlyFeature, t]);


  const visiblePlans = useMemo(
    () => {
      if (productType === "email") return businessPlans;
      if (productType === "web") return webPlans;
      return [];
    },
    [productType, businessPlans, webPlans]
  );


  return (
    <section className="pricing-glass-stage pricing-glass-stage--viewport w-screen pt-12 sm:pt-16 relative px-4 sm:px-6 lg:px-8">
      <div className="container relative z-[1] mx-auto max-w-7xl">
        {/* Pricing Title - Simplified and smaller */}
        <h2
          className="font-bold text-white text-center mb-8 sm:mb-12 leading-none"
          style={{
            fontSize: "clamp(40px, 8vw, 100px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {t("pricing.title", "Pricing")}
        </h2>

        {/* Architecture / Product Selector */}
        <div className="relative z-10 mb-12 flex flex-col items-center justify-center sm:mb-16">
          {/* Top Text */}
          <p className="text-purple-200/80 text-xs sm:text-sm uppercase tracking-[0.2em] mb-8 font-medium text-center">
            {t("aiSocPricing.intro", "AI-SOC is a lineup of standalone cybersecurity systems")}
          </p>

          <div className="w-full max-w-[800px]">
            <svg
              viewBox="0 0 800 90"
              className="h-auto w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {PRODUCT_OPTIONS.map((option) => (
                <path
                  key={option.id}
                  d={`M400 3 L${option.endpointX} 88`}
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className={`transition-all duration-500 ease-out ${productType === option.id ? "opacity-100 stroke-[2px]" : "opacity-35"
                    }`}
                />
              ))}
            </svg>

            <div className="grid grid-cols-4 items-start">
              {PRODUCT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setProductType(option.id);
                    if (option.id === "pentester") trackPricingEvent("penetration_testing_pricing_selected");
                  }}
                  onMouseEnter={() => setHoveredProductType(option.id)}
                  onMouseLeave={() => setHoveredProductType(null)}
                  onFocus={() => setHoveredProductType(option.id)}
                  onBlur={() => setHoveredProductType(null)}
                  aria-pressed={productType === option.id}
                  className="flex min-w-0 justify-center bg-transparent px-1 py-3 text-center focus:outline-none sm:px-3"
                >
                  <div className="flex min-w-0 flex-col items-center">
                    <span
                      className={`text-[10px] font-semibold leading-tight transition-colors duration-300 sm:text-sm md:text-base lg:text-lg ${productType === option.id
                        ? "text-white"
                        : "text-white/40"
                        }`}
                    >
                      {t(option.labelKey, option.labelFallback)}
                    </span>
                    {highlightedProductType === option.id && (
                      <motion.div
                        layoutId="product-type-underline"
                        className="mt-2 h-[2px] w-full min-w-8 bg-[#3B82F6]"
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {(visiblePlans.length > 0 || productType === "server" || productType === "pentester") && (
          <div className="relative z-10 space-y-6">
          {productType === "server" ? (
            <ServerSecurityPricing billing={billing} setBilling={setBilling} onOpenModal={onOpenModal} />
          ) : productType === "pentester" ? (
            <PenetrationTestingPricing onOpenModal={onOpenModal} />
          ) : productType === "web" ? (
            <WebSecurityPricing
              plan={visiblePlans[0]}
              billing={billing}
              setBilling={setBilling}
              billingLabels={billingLabels}
              currency={currency}
              onCurrencyChange={onCurrencyChange}
              onOpenModal={onOpenModal}
            />
          ) : (
            <EmailSecurityPricing
              plans={visiblePlans}
              billing={billing}
              setBilling={setBilling}
              billingLabels={billingLabels}
              currency={currency}
              onCurrencyChange={onCurrencyChange}
              onOpenModal={onOpenModal}
            />
          )}
          </div>
        )}

        {productType === "server" && <ServerSecurityComparison />}

        {(productType === "web" || productType === "email" || productType === "pentester") && <ProductComparison productType={productType} />}

        {productType === "pentester" && (
          <div className="mx-auto mt-12 max-w-6xl rounded-[28px] border border-white/10 bg-white/[0.035] p-6 text-center sm:mt-16 sm:p-8">
            <h4 className="text-2xl font-semibold text-white">Testing a very large or mission-critical system?</h4>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/55">For large enterprise, government and critical-infrastructure environments, Silence AI supports high-compute assessments, dedicated deployment requirements and custom security workflows.</p>
            <button type="button" onClick={() => { trackPricingEvent("penetration_testing_contact_sales_clicked"); onOpenModal?.(); }} className="mt-6 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:border-blue-300 hover:text-blue-200">Contact Sales</button>
          </div>
        )}

        {productType === "web" && (
          <div className="mt-10 sm:mt-12 px-2 sm:px-0">
            <div className="pricing-glass-media mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950/70 backdrop-blur-xl">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/BXWdaovJCjw"
                  title="Web Security Instructions Video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
        {productType === "email" && (
          <>
            <InteractiveSandbox />
            <div className="w-full flex justify-center px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                <div className="pricing-glass-media w-full rounded-2xl overflow-hidden bg-black">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src="https://www.youtube.com/embed/3lW9az21aDk"
                      title="AI-SOC Email Security"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
                <div className="pricing-glass-media w-full rounded-2xl overflow-hidden bg-black">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src="https://www.youtube.com/embed/HGhDQ3bhk6o"
                      title="AI-SOC Email Security Additional Info"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            {showLamp && (
              <div className="relative left-1/2 -translate-x-1/2 w-[100vw] h-[220px] max-w-none overflow-visible z-10">
                <CybersecurityLamp
                  containerClassName="w-full h-full min-h-0 bg-transparent"
                  headingClassName="hidden"
                />
              </div>
            )}
          </>
        )}
      </div>


    </section>
  );
};


const PenetrationTestingPricing = ({ onOpenModal }) => {
  const [billing, setBilling] = useState("monthly");
  const isAnnual = billing === "annual";

  const selectBilling = (value) => {
    setBilling(value);
    trackPricingEvent(`penetration_testing_${value}_selected`);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-16">
      <div className="max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Silence AI Autonomous Penetration Tester</p>
        <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">One autonomous pentester. Everything included.</h3>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/60">Deep source-code analysis, SAST, DAST, API testing and business-logic security testing powered by a persistent security graph and autonomous AI agents.</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-blue-100">
          <span className="rounded-full border border-blue-300/25 bg-blue-400/10 px-3 py-1.5">No surprise AI bills</span>
          <span className="rounded-full border border-blue-300/25 bg-blue-400/10 px-3 py-1.5">Prepaid compute</span>
        </div>
      </div>

      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={28}
        backgroundOpacity={0.08}
        saturation={1.55}
        blur={14}
        displace={0.35}
        className="pricing-glass-panel overflow-hidden rounded-[28px]"
      >
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-8 flex max-w-xs items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1" role="group" aria-label="Penetration testing billing period">
              {[['monthly', 'Monthly'], ['annual', 'Annual']].map(([value, label]) => (
                <button key={value} type="button" onClick={() => selectBilling(value)} aria-pressed={billing === value} className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${billing === value ? 'bg-blue-500 text-white' : 'text-white/50 hover:text-white'}`}>
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-semibold tracking-tight text-white">{isAnnual ? "$9,900" : "$990"}</span>
              <span className="text-sm text-white/50">/ {isAnnual ? "year" : "month"}</span>
            </div>
            {isAnnual ? (
              <>
                <p className="mt-3 text-sm font-medium text-blue-200">$825/month — billed annually</p>
                <span className="mt-3 inline-flex rounded-full border border-blue-300/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-200">Save $1,980</span>
                <p className="mt-4 text-sm text-white/60">1.2B Pentest Compute Tokens per year, provisioned as 100M included tokens every month.</p>
              </>
            ) : (
              <p className="mt-4 text-sm text-white/60">100M Pentest Compute Tokens included every month.</p>
            )}
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-lg font-semibold text-white">$5 / 1M Pentest Compute Tokens</p>
              <p className="mt-2 text-xs leading-5 text-white/45">AI compute included. Additional compute is prepaid — you always know the maximum cost before a pentest starts.</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <button type="button" onClick={() => { trackPricingEvent("penetration_testing_start_clicked"); onOpenModal?.(); }} className="pricing-button-invert rounded-full bg-[#3B82F6] px-6 py-3 font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">Start Penetration Testing</button>
              <button type="button" onClick={() => { trackPricingEvent("penetration_testing_contact_sales_clicked"); onOpenModal?.(); }} className="rounded-full border border-white/20 px-6 py-3 font-medium text-white/80 transition hover:border-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">Contact Sales</button>
            </div>
          </div>
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">Everything included with one complete product</h4>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {PENTEST_FEATURES.map((feature) => <li key={feature} className="flex gap-2 text-sm leading-5 text-white/70"><span className="text-blue-300" aria-hidden="true">✓</span><span>{feature}</span></li>)}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 bg-blue-500/[0.07] px-6 py-5 text-center sm:px-10"><p className="text-sm font-semibold text-white">No feature tiers. No paid testing add-ons. Only AI compute scales with usage.</p></div>
      </GlassSurface>

      <section aria-labelledby="pentest-compute-title">
        <div className="mb-8 max-w-2xl"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">How compute billing works</p><h4 id="pentest-compute-title" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Pay only for the compute you use.</h4><p className="mt-4 text-sm leading-6 text-white/60">Large autonomous penetration tests require different amounts of reasoning. Your project is graphed and estimated before expensive AI testing begins.</p></div>
        <div className="grid gap-3 md:grid-cols-5">
          {[['1', 'Upload Project', 'Submit the application source code as a .zip project.'], ['2', 'Build Security Graph', 'Create a Graphify-powered code and security graph.'], ['3', 'Estimate Pentest', 'Use source tokens, graph complexity, services, endpoints and expected investigation workload.'], ['4', 'Approve Maximum Cost', 'Review estimated compute, included balance, additional tokens and maximum cost.'], ['5', 'Run Autonomous Pentest', 'K2.7 / K3 inference starts only after sufficient balance is reserved.']].map(([step, title, copy]) => <div key={step} className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-4"><span className="text-xs font-semibold text-blue-300">{step}</span><h5 className="mt-3 text-sm font-semibold text-white">{title}</h5><p className="mt-2 text-xs leading-5 text-white/50">{copy}</p></div>)}
        </div>
        <div className="mt-5 rounded-2xl border border-blue-300/20 bg-blue-500/[0.07] p-5"><p className="text-sm font-semibold text-white">Your pentest can never exceed the approved compute budget without your authorization.</p><p className="mt-2 text-xs leading-5 text-white/50">No negative balances. No surprise overage invoices. Unused purchased compute remains available for future assessments; included monthly compute refreshes each billing cycle.</p></div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="flex items-center gap-2.5">
                <img
                  src="/notion-logo.png"
                  alt="Notion"
                  width={22}
                  height={22}
                  className="h-5.5 w-5.5 shrink-0 object-contain aspect-square"
                  loading="lazy"
                />
                <p className="text-sm font-semibold text-white">Example enterprise application (Notion-class)</p>
              </div>
              <p className="mt-3 text-xs text-white/50">Source code: <strong className="text-white/80">~2M lines of code · 8.4M source tokens</strong></p>
              <p className="mt-1 text-xs text-white/50">Security graph: <strong className="text-white/80">High complexity</strong></p>
            </div>
            <div>
              <p className="text-xs text-white/50">Estimated Pentest Compute</p>
              <p className="mt-1 text-2xl font-semibold text-blue-200">140M–190M tokens</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Included / maximum additional</p>
              <p className="mt-1 text-sm font-semibold text-white">100M / 90M tokens · <span className="text-blue-200">$450 maximum</span></p>
            </div>
          </div>
          <p className="mt-5 text-[11px] leading-5 text-white/35">Illustrative example. Actual compute requirements are calculated from your project before testing begins.</p>
        </div>
      </section>
    </div>
  );
};

const ServerSecurityPricing = ({ billing, setBilling, onOpenModal }) => {
  const isAnnual = billing === "yearly";
  const price = isAnnual ? SERVER_SECURITY_PRICING.annual : SERVER_SECURITY_PRICING.monthly;

  return (
    <div className="mx-auto w-[90vw] max-w-none">
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Server Security</p>
        <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Complete Protection</h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/60">Maximum available protection. No security feature gates.</p>
      </div>

      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={28}
        backgroundOpacity={0.08}
        saturation={1.55}
        blur={14}
        displace={0.35}
        className="pricing-glass-panel overflow-hidden rounded-[28px]"
      >
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(230px,0.72fr)_1.28fr] lg:p-10">
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1" role="group" aria-label="Billing period">
              {[['yearly', 'Annual'], ['monthly', 'Monthly']].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setBilling(value)}
                  aria-pressed={billing === value}
                  className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${billing === value ? 'bg-blue-500 text-white' : 'text-white/50 hover:text-white'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-end gap-2">
              <span className="text-6xl font-semibold tracking-tight text-white">${price}</span>
              <span className="pb-2 text-sm text-white/50">/ protected server / {isAnnual ? 'year' : 'month'}</span>
            </div>
            {isAnnual && (
              <>
                <span className="mt-3 w-fit rounded-full border border-blue-300/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-200">{SERVER_SECURITY_PRICING.annualBadge}</span>
                <p className="mt-2 text-xs text-white/45">$290 billed annually · equivalent to less than $25/server/month</p>
              </>
            )}
            <button
              type="button"
              onClick={onOpenModal}
              className="pricing-button-invert mt-8 rounded-full bg-[#3B82F6] px-6 py-3 font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Start protecting servers
            </button>
            <p className="mt-5 text-xs leading-5 text-white/45"><strong className="font-medium text-white/70">Protected server:</strong> a physical server, virtual machine, cloud instance, or Kubernetes worker node running Silence AI Guard. Containers running on a protected node are included.</p>
            <p className="mt-2 text-xs font-medium text-blue-200/80">Unlimited administrators. No per-user pricing.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {SERVER_SECURITY_GROUPS.map((group) => (
              <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h4 className="mb-4 text-sm font-semibold text-white">{group.title}</h4>
                <ul className="space-y-2.5">
                  {group.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-xs leading-5 text-white/70">
                      <span className="mt-0.5 text-blue-300" aria-hidden="true">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 bg-blue-500/[0.07] px-6 py-5 text-center sm:px-8">
          <p className="text-lg font-semibold text-white">Everything above is included.</p>
          <p className="mx-auto mt-1 max-w-3xl text-xs leading-5 text-white/50">No paid security add-ons. No per-admin charges. No artificial limits on detections, blocked attacks, security rules, or remediations.</p>
        </div>
      </GlassSurface>
    </div>
  );
};

const SERVER_COMPARISON_STATUS = {
  builtIn: { symbol: "+", label: "Built in", className: "text-emerald-400" },
  partial: { symbol: "◐", label: "Partial or additional configuration", className: "text-amber-300" },
  unavailable: { symbol: "–", label: "Not a primary native capability", className: "text-rose-400" },
};

const ServerComparisonValue = ({ value, highlighted = false }) => {
  if (Array.isArray(value)) {
    return (
      <span className={`flex flex-col gap-1 text-[11px] leading-4 sm:text-xs ${highlighted ? "font-semibold text-emerald-100" : "text-white/65"}`}>
        {value.map((line) => <span key={line}>{line}</span>)}
      </span>
    );
  }

  const display = SERVER_COMPARISON_STATUS[value.status];
  return (
    <span
      className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-full text-3xl font-semibold leading-none ${display.className} ${value.tooltip ? "cursor-help focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70" : ""}`}
      aria-label={value.tooltip ? `${display.label}. ${value.tooltip}` : display.label}
      title={value.tooltip}
      tabIndex={value.tooltip ? 0 : undefined}
    >
      <span aria-hidden="true">{display.symbol}</span>
    </span>
  );
};

const ServerSecurityComparison = () => (
  <section className="mx-auto mt-16 w-[90vw] max-w-none" aria-labelledby="server-security-comparison-title">
    <div className="mb-8 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Competitive advantages</p>
      <h3 id="server-security-comparison-title" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Silence AI vs Traditional Server Security</h3>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60">Access control, threat detection and automated response — in one server security platform.</p>
      <p className="mt-3 text-xs font-medium text-sky-200/70 sm:hidden">Swipe or drag horizontally to compare every option <span aria-hidden="true">→</span></p>
    </div>
    <GlassSurface width="100%" height="auto" borderRadius={24} backgroundOpacity={0.08} saturation={1.55} blur={14} displace={0.35} className="pricing-comparison-surface overflow-hidden rounded-3xl">
      <div className="pricing-table-scroll" tabIndex="0" role="region" aria-label="Server security competitor comparison. Scroll horizontally to view all vendors.">
        <table className="server-security-comparison-table w-full table-fixed border-collapse text-left text-[11px] sm:text-xs">
        <thead>
          <tr className="border-b border-emerald-100/10 text-white/55">
            <th scope="col" className="w-[24%] bg-slate-950/95 px-2 py-5 font-semibold text-white/80 md:sticky md:left-0 md:z-20">Features</th>
            {SERVER_SECURITY_COLUMNS.map((column, index) => (
              <th key={column.key} scope="col" className={`border-l border-white/[0.07] px-2 py-5 text-center font-semibold ${index === 0 ? "bg-emerald-500/[0.16] text-emerald-100 shadow-[inset_0_0_36px_rgba(16,185,129,0.08)]" : "text-white/60"}`}>
                <span>{column.label}</span>
                {index === 0 && <span className="mx-auto mt-2 block w-fit rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-emerald-200">All-in-one</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SERVER_SECURITY_COMPARISON.map((row) => (
            <tr key={row.capability} className={`border-b border-white/[0.07] last:border-0 ${row.pricing ? "bg-white/[0.025]" : ""}`}>
              <th scope="row" className={`bg-slate-950/95 px-5 py-5 font-medium leading-5 text-white/85 md:sticky md:left-0 md:z-10 ${row.pricing ? "text-emerald-100" : ""}`}>{row.capability}</th>
              {SERVER_SECURITY_COLUMNS.map((column, index) => (
                <td key={`${row.capability}-${column.key}`} className={`border-l border-white/[0.07] px-4 py-4 text-center align-middle ${index === 0 ? "bg-emerald-500/[0.12] shadow-[inset_0_0_34px_rgba(16,185,129,0.06)]" : "bg-white/[0.015]"}`}>
                  <ServerComparisonValue value={row[column.key]} highlighted={index === 0} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </GlassSurface>
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-white/45" aria-label="Comparison legend">
      <span><strong className="mr-1 text-base font-semibold text-emerald-400">+</strong> Built in</span>
      <span><strong className="mr-1 text-base font-semibold text-amber-300">◐</strong> Partial / additional configuration</span>
      <span><strong className="mr-1 text-base font-semibold text-rose-400">–</strong> Not a primary native capability</span>
    </div>
    <p className="mt-3 text-center text-[11px] leading-5 text-white/35">Published pricing models differ by server, host, cloud plan, agent capacity, or user. Pricing may change; competitor pricing checked September 2026.</p>
  </section>
);


export default Pricing;
