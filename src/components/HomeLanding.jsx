"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BackToTopButton from "@/components/BackToTopButton";
import RequestDemoModal from "@/components/RequestDemoModal";
import AiSocGetModal from "@/components/AiSocGetModal";
import { FloatingText } from "@/components/FloatingText";
import { useLanguage } from "@/contexts/LanguageContext";
import EdgeGlowCard from "@/components/EdgeGlowCard";
import MediumArticleCard from "@/components/MediumArticleCard";
import Pricing from "@/components/Pricing";
import Insights from "@/components/Insights";
import FaqSection from "@/components/FaqSection";
import ScrollytellingSequence from "@/components/ScrollytellingSequence";
import Preloader from "@/components/Preloader";
import { DEFAULT_CURRENCY } from "@/lib/currency";
import { Rocket, BrainCircuit, Radar, ShieldCheck } from "lucide-react";

import { articles, featuredResourcesConfig } from "@/constants/mediumArticles";

const valueFeatures = [
  {
    title: "Deploy in minutes",
    description:
      "Set up web and email protection in under 4 minutes without complex configuration.",
    icon: <Rocket className="w-11 h-11 text-purple-200" />,
    glow: "from-purple-600/60 via-fuchsia-500/25 to-blue-500/40",
    glowColor: "rgba(168,85,247,0.8)",
  },
  {
    title: "AI-powered analysis",
    description:
      "Advanced AI continuously analyzes traffic, emails, and threats in real time.",
    icon: <BrainCircuit className="w-11 h-11 text-cyan-200" />,
    glow: "from-cyan-500/60 via-blue-500/30 to-purple-600/40",
    glowColor: "rgba(34,211,238,0.8)",
  },
  {
    title: "Advanced visualization",
    description:
      "Monitor web traffic and email flows through an advanced visual interface.",
    icon: <Radar className="w-11 h-11 text-indigo-200" />,
    glow: "from-indigo-500/60 via-purple-500/30 to-sky-500/40",
    glowColor: "rgba(99,102,241,0.8)",
  },
  {
    title: "Affordable security",
    description:
      "Enterprise-level protection without the cost of traditional cybersecurity systems.",
    icon: <ShieldCheck className="w-11 h-11 text-blue-200" />,
    glow: "from-blue-500/60 via-purple-500/30 to-cyan-500/40",
    glowColor: "rgba(59,130,246,0.8)",
  },
];

/* Competitive comparisons now render with their selected pricing product.
const comparisonTables = [
  {
    title: "AI-CSD Web vs Traditional WAF Solutions",
    columns: ["Features", "AI-CSD Web (pay-as-you-go)", "Cloudflare WAF + Anti-DDoS ($20/mo)", "AWS WAF (pay-as-you-go)"],
    rows: [
      {
        feature: "WAF with detection of complex attacks",
        values: [
          { type: "icon", value: true },
          { type: "icon", value: false },
          { type: "icon", value: true },
        ],
      },
      {
        feature: "Protection against DDoS attacks",
        values: [
          { type: "icon", value: true },
          { type: "text", value: "Weak at this pricing plan", tone: "neutral" },
          { type: "icon", value: false },
        ],
      },
      {
        feature: "Proactive 24/7 protection",
        values: [
          { type: "icon", value: true },
          { type: "icon", value: false },
          { type: "icon", value: false },
        ],
      },
      {
        feature: "Monitor live users, RPS, and bandwidth by country — with full historical tracking",
        values: [
          { type: "icon", value: true },
          { type: "icon", value: false },
          { type: "icon", value: false },
        ],
      },
      {
        feature: "Country blocking",
        values: [
          { type: "icon", value: true },
          { type: "text", value: "Requires Cybersec knowledge", tone: "neutral" },
          { type: "text", value: "Requires Cybersec knowledge", tone: "neutral" },
        ],
      },
      {
        feature: "Setup time",
        values: [
          { type: "text", value: "2 mins (no cybersec knowledge needed)", tone: "good" },
          { type: "text", value: "2 mins (no cybersec knowledge needed)", tone: "good" },
          { type: "text", value: "1 day (cybersec specialist needed)", tone: "bad" },
        ],
      },
    ],
  },
  {
    title: "AI-CSD Email vs Traditional Email Security",
    columns: ["Features", "AI-CSD Email", "Outlook/Gmail", "Kaspersky (connected to an email provider)"],
    rows: [
      {
        feature: "View on all emails across the domain",
        values: [
          { type: "icon", value: true },
          { type: "icon", value: false },
          { type: "icon", value: true },
        ],
      },
      {
        feature: "Ability to delete emails",
        values: [
          { type: "icon", value: true },
          { type: "icon", value: false },
          { type: "icon", value: false },
        ],
      },
      {
        feature: "Active Protection against all types of email attacks",
        values: [
          { type: "icon", value: true },
          { type: "icon", value: false },
          { type: "icon", value: false },
        ],
      },
      {
        feature: "AI that manually checks the emails",
        values: [
          { type: "icon", value: true },
          { type: "icon", value: false },
          { type: "icon", value: false },
        ],
      },
      {
        feature: "Secure setup completion time",
        values: [
          { type: "text", value: "2 mins No cybersec. knowledge needed", tone: "good" },
          { type: "text", value: "No-full security", tone: "bad" },
          { type: "text", value: "1-3 days (connecting to an email provider, can only be done by a cybersec. specialist)", tone: "bad" },
        ],
      },
    ],
  },
];
*/

// Helper Component for Auto-Scrolling Sections
function AutoScrollSection({ children, speed = 0.5, className = "" }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    let rafId = null;
    let accumulator = 0;
    let isVisible = false;
    let isDocumentVisible = document.visibilityState === "visible";
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    const shouldRun = () => (
      !isPaused && isVisible && isDocumentVisible && !motionQuery.matches
    );

    const step = () => {
      if (!shouldRun()) {
        rafId = null;
        return;
      }

      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0) {
        accumulator += speed;
        if (accumulator >= 1) {
          el.scrollLeft += 1;
          accumulator -= 1;
        }

        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += halfWidth;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      if (rafId === null && shouldRun()) rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    }, { threshold: 0.05 });

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      if (isDocumentVisible) start();
      else stop();
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) stop();
      else start();
    };

    observer.observe(el);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [speed, isPaused]);

  return (
    <div
      ref={scrollRef}
      className={`flex overflow-x-auto ${className} no-scrollbar cursor-grab active:cursor-grabbing select-none`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {children}
    </div>
  );
}

export default function HomeLanding() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGetModalOpen, setIsGetModalOpen] = useState(false);
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [isComparisonVisible, setIsComparisonVisible] = useState(false);
  const comparisonRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openGetModal = () => setIsGetModalOpen(true);
  const closeGetModal = () => setIsGetModalOpen(false);

  useEffect(() => {
    if (!comparisonRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsComparisonVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(comparisonRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-clip">
      <Preloader />
      <Header onOpenModal={openGetModal} />

      <main className="relative mx-auto flex flex-col gap-0 pb-16 z-10">
        <ScrollytellingSequence>
          <div id="pricing" className="mx-auto w-full max-w-7xl scroll-mt-24">
            <Pricing
              currency={currency}
              onCurrencyChange={setCurrency}
              onOpenModal={openGetModal}
              showLamp={false}
            />
          </div>
        </ScrollytellingSequence>

        {/* Compliance Section */}
        {(() => {
          const complianceItems = [
            {
              flag: "🇪🇺",
              name: "GDPR",
              citation: "EU Regulation 2016/679",
              desc: t("homeCompliance.cards.gdpr.desc", "The world's most stringent privacy and security law, governing personal data of all EU residents. Sets the global benchmark for data protection worldwide."),
            },
            {
              flag: "🇬🇧",
              name: "UK GDPR",
              citation: "UK Data Protection Act 2018",
              desc: t("homeCompliance.cards.ukGdpr.desc", "Post-Brexit UK equivalent of EU GDPR, retained in domestic law. Substantively identical in scope and obligations — EU GDPR compliance extends to UK GDPR."),
            },
            {
              flag: "🇺🇸",
              name: "CCPA / CPRA",
              citation: "California Consumer Privacy Act, 2020",
              desc: t("homeCompliance.cards.ccpa.desc", "Registration uses Google OAuth, which transmits profile data (name, email, Google ID) to our servers — this is personal data under CCPA. Users retain full rights to know, access, and delete their account data at any time."),
            },
            {
              flag: "🇨🇦",
              name: "PIPEDA",
              citation: "Canada — Personal Information Protection and Electronic Documents Act",
              desc: t("homeCompliance.cards.pipeda.desc", "Applies to any commercial organization handling Canadian residents' data regardless of where the company is based. As we scale globally, personal data from Canadian users is handled with the same minimal-collection standards."),
            },
            {
              flag: "🇸🇦",
              name: "KSA PDPL",
              citation: "Saudi Arabia — SDAIA, 2023",
              desc: t("homeCompliance.cards.ksaPdpl.desc", "Saudi Personal Data Protection Law enforced by SDAIA. Governs collection, processing, and cross-border transfer of personal data."),
            },
            {
              flag: "🇦🇪",
              name: "UAE PDPL",
              citation: "Federal Law No. 45 of 2021",
              desc: t("homeCompliance.cards.uaePdpl.desc", "UAE Personal Data Protection Law regulating personal data processing across the mainland and free zones, including DIFC and ADGM."),
            },
            {
              flag: "🇶🇦",
              name: "Qatar PDPL",
              citation: "Law No. 13 of 2016",
              desc: t("homeCompliance.cards.qatarPdpl.desc", "Qatar's Personal Data Privacy Protection Law administered by the Ministry of Transport and Communications."),
            },
            {
              flag: "🇧🇭",
              name: "Bahrain PDPL",
              citation: "Law No. 30 of 2018",
              desc: t("homeCompliance.cards.bahrainPdpl.desc", "Bahrain Personal Data Protection Law regulated by the Personal Data Protection Authority (PDPA), aligned with international standards."),
            },
            {
              flag: "🇰🇼",
              name: "Kuwait DP",
              citation: "Decree-Law No. 20 of 2014",
              desc: t("homeCompliance.cards.kuwaitDp.desc", "Kuwait's Electronic Communications and Transactions Law establishing data protection obligations for electronic service providers."),
            },
            {
              flag: "🇴🇲",
              name: "Oman PDPL",
              citation: "Royal Decree No. 6 of 2022",
              desc: t("homeCompliance.cards.omanPdpl.desc", "Oman Personal Data Protection Law establishing comprehensive rights for data subjects and obligations for controllers and processors."),
            },
            {
              flag: "🔒",
              name: "Privacy by Design",
              citation: "GDPR Art. 25 · All GCC frameworks",
              desc: t("homeCompliance.cards.privacyByDesign.desc", "Supreme's code scanning runs entirely on your local machine — no source code is ever transmitted or processed externally. Account data (Google OAuth profile) is handled separately under our privacy policy."),
              supremeOnly: true,
            },
          ];

          const doubled = [...complianceItems, ...complianceItems];

          return (
            <section id="compliance" className="pt-24 pb-4 w-full scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mb-8 text-center px-4"
              >
                <div className="inline-flex items-center gap-2 border border-green-400/25 bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-300 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {t("homeCompliance.badge", "Regulatory Compliance")}
                </div>
                <h2 className="text-3xl font-bold sm:text-4xl text-white">
                  {t("homeCompliance.title", "Built for Global Compliance")}
                </h2>
                <p className="mt-3 text-white/50 text-sm">
                  {t("homeCompliance.subtitle", "Continuous live compliance coverage")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
                className="mx-auto mb-2 flex w-full max-w-5xl flex-col gap-5 border border-emerald-300/30 bg-emerald-400/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center border border-emerald-200/45 bg-emerald-300/15 text-emerald-100">
                    <ShieldCheck className="h-7 w-7" aria-hidden="true" />
                    <span className="mt-0.5 text-[11px] font-bold leading-none">SOC 2</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                      {t("homeCompliance.soc2.badge", "SOC 2")}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                      {t("homeCompliance.soc2.title", "SOC 2 Audit Report & Readiness Report Available")}
                    </h3>
                  </div>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-emerald-50/75 sm:text-right">
                  {t("homeCompliance.soc2.description", "Independent assurance and readiness documentation are available for review.")}
                </p>
              </motion.div>

              <div className="relative w-full">
                <AutoScrollSection speed={0.5} className="py-5 gap-0">
                  {doubled.map((item, i) => (
                    <div
                      key={`${item.name}-${i}`}
                      className="shrink-0 w-64 mx-3 glass-readable rounded-2xl p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="shrink-0 rounded-xl border-0 bg-white/5 p-2 text-xl leading-none">
                            {item.flag}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm leading-tight">{item.name}</div>
                            <div className="text-[11px] text-gray-400 mt-0.5 leading-tight">{item.citation}</div>
                          </div>
                        </div>
                        <p className="text-sm text-white leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-green-400">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {t("homeCompliance.statusLabel", "Compliant")}
                        </div>
                        {item.supremeOnly && (
                          <div className="inline-flex items-center gap-1 rounded-full border border-violet-400/30 bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                            {t("homeCompliance.supremeOnly", "Supreme only")}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </AutoScrollSection>
              </div>
            </section>
          );
        })()}

        {/* Partners Section */}
        {(() => {
          const partners = [
            { name: "Nur Astana Kurylys", capAmount: "$1.5", capUnit: "billion", logo: "/partners/nur-astana-kurylys.png" },
            { name: "Kazatomprom", capAmount: "$20.774", capUnit: "billion", logo: "/partners/kazatomprom.png" },
            { name: "Alibaba", capAmount: "$283.4", capUnit: "billion", logo: "/partners/alibaba.png" },
            { name: "QazCloud", capAmount: "$100", capUnit: "million", logo: "/partners/qazcloud.png" },
            { name: "KazakhCinema", capAmount: "$50", capUnit: "million", logo: "/partners/kazakhcinema.png" },
            { name: "Neuro Force", capAmount: "$8", capUnit: "million", logo: "/partners/neuroforce.png" },
          ];

          const allPartners = [...partners, ...partners, ...partners, ...partners];

          return (
            <section id="resources" className="py-12 w-full scroll-mt-24">
              <span id="partners" className="-mt-24 block" />
              <div className="mb-10 text-center px-4">
                <h2 className="text-3xl font-bold sm:text-4xl text-white">
                  {t("homePartners.title", "Clients and Partners")}
                </h2>
                <p className="mt-3 text-sm text-white/60">
                  {t("homePartners.subtitle", "Featured here are some of our leading clients and partners; this is not a complete list.")}
                </p>
              </div>

              <div className="relative w-full">
                <AutoScrollSection speed={0.4} className="py-8 gap-0 items-center">
                  {allPartners.map((p, i) => (
                    <div
                      key={`${p.name}-${i}`}
                      className="shrink-0 w-64 mx-3 glass-readable rounded-2xl p-5 flex flex-col items-center gap-4 group opacity-50 hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="relative h-32 w-48 flex flex-col items-center justify-center gap-2 grayscale group-hover:grayscale-0 transition-all duration-300">
                        <div className="relative h-20 w-full flex items-center justify-center">
                          <img
                            src={p.logo}
                            alt={p.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-bold text-white/50 group-hover:text-white transition-colors duration-300">{p.name}</span>
                        </div>
                      </div>

                      <div className="text-center mt-2">
                        <div className="text-[10px] text-white/30 font-mono tracking-wider uppercase">{t("homePartners.marketCap", "Market Cap")}</div>
                        <div className="text-sm font-medium text-white/80">{p.capAmount} {t(`homePartners.${p.capUnit}`, p.capUnit === "billion" ? "Billion" : "Million")}</div>
                      </div>
                    </div>
                  ))}
                </AutoScrollSection>
              </div>
            </section>
          );
        })()}

        <div className="w-full max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
          <FloatingText />
        </div>

        {/* Featured Resources */}
        <section className="space-y-8 pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold sm:text-4xl">
                {t("home.resources.title", "Featured articles")}
              </h2>
              <p className="text-white/70 max-w-xl">
                {t(
                  "home.resources.subtitle",
                  "Silence is one of few private companies that have government level intelligence."
                )}
              </p>
            </div>
            {featuredResourcesConfig.showViewAllLink && (
              <a
                href={featuredResourcesConfig.mediumProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap"
              >
                {t("home.resources.viewAll", "View all articles")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, featuredResourcesConfig.displayCount).map((article, idx) => (
              <MediumArticleCard key={article.url} article={article} index={idx} />
            ))}
          </div>
        </section>

        <div className="w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
          <Insights />
        </div>

        {/* Why AI-CSD */}
        <div className="w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {t("aiSocValueSection.title", "Why AI-CSD")}
            </h2>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mt-4">
              {t(
                "aiSocValueSection.subtitle",
                "AI-CSD makes enterprise-level cybersecurity accessible to any company. Deploy protection in minutes and manage web and email security from one unified platform."
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {valueFeatures.map((feature) => (
              <div key={feature.title} className="relative group flex">
                <EdgeGlowCard
                  mode="follow"
                  outerClassName="rounded-[26px] p-[1.5px] w-full"
                  innerClassName="relative flex h-full flex-col gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-black p-8 shadow-none"
                  glowColor={feature.glowColor}
                  secondaryGlowColor={feature.glowColor}
                  glass={false}
                >
                  <div className="flex flex-col gap-4 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mx-auto shadow-none shrink-0">
                      {feature.icon}
                    </div>
                    <div className="space-y-3 text-center flex flex-col flex-grow">
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed flex-grow">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </EdgeGlowCard>
              </div>
            ))}
          </div>
        </div>

        {false && <>
        <section className="w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
          <div
            ref={comparisonRef}
            className={`relative overflow-hidden glass-readable rounded-[32px] px-5 py-10 sm:px-10 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${isComparisonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="relative z-10">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {t("aiSocComparison.sectionTitle", "Competitive Advantages")}
                </h2>
              </div>
              <div className="mt-8 space-y-10">
                {comparisonTables.map((table) => (
                  <div key={table.title} className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white text-center">
                      {table.title}
                    </h3>
                    <div className="mx-auto w-[90vw] max-w-none glass-readable rounded-3xl overflow-hidden">
                      <div className="overflow-hidden">
                        <div>
                          <div className="grid grid-cols-4 text-[11px] sm:text-sm md:text-[15px] font-semibold text-slate-200">
                            {table.columns.map((column, columnIndex) => (
                              <div
                                key={column}
                                className={`px-3 py-3 sm:px-5 border-b text-center ${columnIndex === 0 ? "text-left" : ""} ${columnIndex === 1 ? "bg-emerald-500/10 text-white " : ""} ${columnIndex !== table.columns.length - 1 ? "border-r" : ""}`}
                                style={{
                                  borderColor: "rgba(100,200,255,0.35)",
                                }}
                              >
                                {column}
                              </div>
                            ))}
                          </div>
                          {table.rows.map((row, rowIndex) => (
                            <div
                              key={row.feature}
                              className={`group/row grid grid-cols-4 items-stretch text-[13px] sm:text-sm md:text-[15px] text-slate-200 transition-colors duration-300 hover:bg-[rgba(40,120,255,0.08)] ${rowIndex !== table.rows.length - 1 ? "border-b" : ""}`}
                              style={{ borderColor: "rgba(120,180,255,0.25)" }}
                            >
                              <div
                                className="px-3 py-3 sm:px-5 text-left border-r"
                                style={{ borderColor: "rgba(100,200,255,0.35)" }}
                              >
                                <span className="text-slate-200/90">
                                  {row.feature}
                                </span>
                              </div>
                              {row.values.map((cell, cellIndex) => {
                                const isHighlight = cellIndex === 0;
                                const highlightClasses = isHighlight
                                  ? "bg-emerald-500/10  motion-safe:animate-pulse"
                                  : "";
                                const borderClass =
                                  cellIndex !== row.values.length - 1 ? "border-r" : "";
                                if (cell.type === "icon") {
                                  return (
                                    <div
                                      key={`${row.feature}-icon-${cellIndex}`}
                                      className={`px-3 py-3 sm:px-5 flex items-center justify-center transition-all duration-300 hover:brightness-110 ${highlightClasses} ${borderClass}`}
                                      style={{ borderColor: "rgba(100,200,255,0.35)" }}
                                    >
                                      <span
                                        className={`text-2xl font-semibold ${cell.value ? "text-emerald-400" : "text-rose-400"}`}
                                      >
                                        {cell.value ? "+" : "-"}
                                      </span>
                                    </div>
                                  );
                                }

                                const toneClass =
                                  cell.tone === "good"
                                    ? "text-emerald-300"
                                    : cell.tone === "bad"
                                      ? "text-rose-300"
                                      : "text-slate-200";

                                return (
                                  <div
                                    key={`${row.feature}-text-${cellIndex}`}
                                    className={`px-3 py-3 sm:px-5 flex items-center justify-center text-center transition-all duration-300 hover:brightness-110 ${toneClass} ${highlightClasses} ${borderClass}`}
                                    style={{ borderColor: "rgba(100,200,255,0.35)" }}
                                  >
                                    {cell.value}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        </>}

        <FaqSection />
      </main>

      <BackToTopButton />
      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />
      <AiSocGetModal isOpen={isGetModalOpen} onClose={closeGetModal} />
    </div>
  );
}
