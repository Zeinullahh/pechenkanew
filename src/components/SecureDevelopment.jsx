"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import BackToTopButton from "@/components/BackToTopButton";
import RequestSystemModal from "@/components/RequestSystemModal";
import ComingSoonModal from "@/components/ComingSoonModal";
import EdgeGlowCard from "@/components/EdgeGlowCard";
import { FloatingText } from "@/components/FloatingText";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SecureDevelopmentPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [currency, setCurrency] = useState("USD");
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { t } = useLanguage();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openAdminModal = () => setIsAdminModalOpen(true);
    const closeAdminModal = () => setIsAdminModalOpen(false);

    const pricing = {
        USD: { 
            monthly: "$480",
            monthlyFuture: "$630",
            yearly: "$336",
            yearlyTotal: "$4,032",
            yearlyFuture: "$5,225",
            discount: "30%",
            suffix: "" 
        }
    };

    const impactTimeline = [
        { 
            year: "2010", 
            attack: t("secureDevelopment.timeline.stuxnet.attack", "Stuxnet"), 
            target: t("secureDevelopment.timeline.stuxnet.target", "Natanz enrichment facility"), 
            impact: t("secureDevelopment.timeline.stuxnet.impact", "Destroyed ~1,000 centrifuges"), 
            severityKey: "Critical",
            severity: t("secureDevelopment.timeline.stuxnet.severity", "Critical") 
        },
        { 
            year: "2015", 
            attack: t("secureDevelopment.timeline.blackEnergy.attack", "BlackEnergy"), 
            target: t("secureDevelopment.timeline.blackEnergy.target", "Ukraine power grid"), 
            impact: t("secureDevelopment.timeline.blackEnergy.impact", "230k customers lost power"), 
            severityKey: "High",
            severity: t("secureDevelopment.timeline.blackEnergy.severity", "High") 
        },
        { 
            year: "2017", 
            attack: t("secureDevelopment.timeline.triton.attack", "TRITON"), 
            target: t("secureDevelopment.timeline.triton.target", "Saudi petrochemical plant"), 
            impact: t("secureDevelopment.timeline.triton.impact", "Safety systems disabled"), 
            severityKey: "Critical",
            severity: t("secureDevelopment.timeline.triton.severity", "Critical") 
        },
        { 
            year: "2021", 
            attack: t("secureDevelopment.timeline.colonialPipeline.attack", "Colonial Pipeline"), 
            target: t("secureDevelopment.timeline.colonialPipeline.target", "US fuel pipeline"), 
            impact: t("secureDevelopment.timeline.colonialPipeline.impact", "6-day fuel paralysis"), 
            severityKey: "High",
            severity: t("secureDevelopment.timeline.colonialPipeline.severity", "High") 
        },
        { 
            year: "2025", 
            attack: t("secureDevelopment.timeline.pdvsa.attack", "PDVSA"), 
            target: t("secureDevelopment.timeline.pdvsa.target", "Venezuela refining"), 
            impact: t("secureDevelopment.timeline.pdvsa.impact", "Refinery operations disrupted"), 
            severityKey: "Medium",
            severity: t("secureDevelopment.timeline.pdvsa.severity", "Medium") 
        },
    ];

    const severityStyles = {
        Critical: { color: "#f87171", bg: "rgba(248,113,113,0.08)" },
        High: { color: "#fb923c", bg: "rgba(251,146,60,0.07)" },
        Medium: { color: "#fcd34d", bg: "rgba(252,211,77,0.06)" },
    };

    const architecture = [
        { title: "Git Repository Server", tag: "Self-hosted version control", accent: "#38bdf8" },
        { title: "Security Analyzer", tag: "Local code scanning engine", accent: "#a855f7" },
        { title: "Vulnerability Database", tag: "Downloaded security patches", accent: "#22c55e" },
    ];

    const analyzerShots = [
        {
            src: "/slnc-env-analyzer/slnc-env-analyzer1.png",
            titleKey: "secureDevelopment.analyzer.visualizer.shots.scanOverview.title",
            descKey: "secureDevelopment.analyzer.visualizer.shots.scanOverview.description",
            title: "Scan overview",
            desc: "See issues grouped by severity before code leaves your network.",
        },
        {
            src: "/slnc-env-analyzer/slnc-env-analyzer2.png",
            titleKey: "secureDevelopment.analyzer.visualizer.shots.misconfigurations.title",
            descKey: "secureDevelopment.analyzer.visualizer.shots.misconfigurations.description",
            title: "Detection of misconfigurations",
            desc: "Our AI-powered code analyzer even finds misconfigurations within the code.",
        },
        {
            src: "/slnc-env-analyzer/slnc-env-analyzer3.png",
            titleKey: "secureDevelopment.analyzer.visualizer.shots.inlineDiffs.title",
            descKey: "secureDevelopment.analyzer.visualizer.shots.inlineDiffs.description",
            title: "Vulnerable package detection",
            desc: "Detect vulnerable package versions along with the version where the vulnerability is fixed.",
        },
    ];

    const cardHover = { whileHover: { y: -4, scale: 1.01 }, transition: { duration: 0.25, ease: "easeOut" } };

    const HoverCard = ({ title, tag, accent }) => {
        const overlay = `${accent}33`;

        return (
            <EdgeGlowCard
                mode="static"
                glowColor={accent}
                secondaryGlowColor="rgba(32,140,255,0.35)"
                outerClassName="group relative rounded-[26px] p-[1px] edge-glow-card--default"
                innerClassName="rounded-[24px]"
            >
                <div
                    className="relative flex h-52 w-full flex-col justify-between overflow-hidden rounded-[22px] border border-white/10 glass-readable p-6 transition-colors duration-200 group-hover:border-white/20"
                >
                    <div className="relative flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl font-bold text-white">{title}</h3>
                            <p className="mt-2 text-sm text-slate-400">{tag}</p>
                        </div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            {t("secureDevelopment.components.onPremNotice", "Stays on-prem. No egress.")}
                        </p>
                    </div>
                </div>
            </EdgeGlowCard>
        );
    };

    return (
        <div className="min-h-screen bg-[#01091C] text-slate-200 font-sans selection:bg-pink-500/30 relative overflow-x-clip">
            <Header />

            <main className="relative z-10 pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
                {/* Hero */}
                <section className="relative">
                    {/* Spotlights */}
                    <div className="hero-spotlight hero-spotlight--pink" aria-hidden="true" />
                    <div className="hero-spotlight hero-spotlight--cyan" aria-hidden="true" />
                    
                    <EdgeGlowCard
                        mode="static"
                        spotlight
                        glowColor="#FF00B7"
                        secondaryGlowColor="rgba(55,255,139,0.7)"
                        outerClassName="group relative z-10 rounded-[34px] p-[2px] edge-glow-card--hero"
                        innerClassName="glass-card rounded-[30px]"
                    >
                    <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-10">
                        {/* Internal glow effects */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,0,183,0.35),transparent_60%)] blur-[80px] mix-blend-screen" />
                            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(55,255,139,0.3),transparent_60%)] blur-[80px] mix-blend-screen" />
                        </div>

                    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl space-y-5">
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-200"
                            >
                                {t("secureDevelopment.hero.badge", "Sithub · Self-Hosted Development Platform")}
                            </motion.p>
                            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                                {t("secureDevelopment.hero.title", "GitHub on your server. Code never leaves your network.")}
                            </motion.h1>
                            <p className="text-base sm:text-lg text-slate-200 max-w-xl">
                                {t("secureDevelopment.hero.description", "Self-hosted GitHub alternative with built-in security scanning. All functionality stays within your infrastructure—repositories, code analyzer, and vulnerability reports run locally.")}
                            </p>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-wrap gap-3 pt-2"
                            >
                                <button 
                                    type="button"
                                    onClick={openAdminModal}
                                    className="rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 px-8 py-3.5 text-base font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/25"
                                >
                                    {t("header.cta.get", "Get")}
                                </button>
                            </motion.div>
                        </div>

                        {/* GlassyBox3D removed as requested */}
                    </div>

                </div>
                </EdgeGlowCard>
                </section>

                {/* Pricing Section */}
                <section className="relative">
                    <GlowOrb className="-left-20 top-0" color="rgba(168,85,247,0.15)" size="24rem" blur="100px" />
                    <GlowOrb className="right-0 -bottom-10" color="rgba(59,130,246,0.12)" size="20rem" blur="90px" />
                    
                    <div className="text-center mb-10">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">{t("secureDevelopment.pricing.subtitle", "Simple, transparent pricing")}</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{t("secureDevelopment.pricing.title", "Choose your plan")}</h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Currency Switcher (Hidden) */}
                        {/* <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
                                <button
                                    onClick={() => setCurrency("USD")}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                                        currency === "USD" 
                                            ? "bg-white/10 text-white" 
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    USD
                                </button>
                            </div>
                        </div> */}

                        {/* Limited Time Offer Banner */}
                        <div className="mb-8 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-blue-500/10 p-4 text-center backdrop-blur-xl">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-blue-400 font-bold text-sm uppercase tracking-wide">
                                    {t("secureDevelopment.pricing.limitedOffer", "Limited Time Offer")}
                                </span>
                            </div>
                            <p className="text-slate-300 text-sm">
                                {t("secureDevelopment.pricing.priceIncreaseNotice", "Lock in current prices! After 6 months, prices increase by 30%")}
                            </p>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Monthly Card */}
                            <EdgeGlowCard
                                mode="static"
                                glowColor="#8b5cf6"
                                secondaryGlowColor="rgba(139,92,246,0.35)"
                                outerClassName="group relative rounded-2xl p-[1px] edge-glow-card--default h-full"
                                innerClassName="rounded-[18px] h-full"
                            >
                                <div className="relative overflow-hidden rounded-[16px] glass-readable p-6 h-full">
                                    <div className="flex flex-col h-full space-y-5">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{t("secureDevelopment.pricing.monthlyPlan", "Monthly")}</h3>
                                            <p className="text-sm text-slate-400 mt-1">{t("secureDevelopment.pricing.monthlyDesc", "Flexible billing")}</p>
                                        </div>

                                        <div className="border-t border-white/10 pt-5">
                                            <div className="flex items-end gap-2">
                                                <span className="text-4xl font-bold text-white">
                                                    {pricing[currency].monthly}{pricing[currency].suffix}
                                                </span>
                                                <span className="text-slate-400 pb-1">/{t("secureDevelopment.pricing.month", "month")}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-sm text-slate-500 line-through">
                                                    {pricing[currency].monthlyFuture}{pricing[currency].suffix}
                                                </span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {t("secureDevelopment.pricing.features.fullAccess", "Full platform access")}
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {t("secureDevelopment.pricing.features.support", "Priority support")}
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {t("secureDevelopment.pricing.features.cancelAnytime", "Cancel anytime")}
                                            </li>
                                        </ul>

                                        <button 
                                            type="button"
                                            onClick={openAdminModal}
                                            className="w-full rounded-full py-3.5 text-sm font-semibold transition-all border border-white/20 bg-white/5 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-violet-500 hover:to-blue-500 hover:border-transparent mt-auto block text-center"
                                        >
                                            {t("secureDevelopment.pricing.getStarted", "Get Started")}
                                        </button>
                                    </div>
                                </div>
                            </EdgeGlowCard>

                            {/* Yearly Card */}
                            <EdgeGlowCard
                                mode="static"
                                glowColor="#10b981"
                                secondaryGlowColor="rgba(16,185,129,0.35)"
                                outerClassName="group relative rounded-2xl p-[1px] edge-glow-card--default h-full"
                                innerClassName="rounded-[18px] h-full"
                            >
                                <div className="relative overflow-hidden rounded-[16px] glass-readable p-6 h-full">
                                    {/* Double Savings Badge */}
                                    <div className="absolute -right-8 top-4 rotate-45 bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-1 text-xs font-bold text-white">
                                        {t("secureDevelopment.pricing.doubleSavings", "2x SAVINGS")}
                                    </div>

                                    <div className="flex flex-col h-full space-y-5">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{t("secureDevelopment.pricing.yearlyPlan", "Annual")}</h3>
                                            <p className="text-sm text-slate-400 mt-1">{t("secureDevelopment.pricing.yearlyDesc", "Best value")}</p>
                                        </div>

                                        <div className="border-t border-white/10 pt-5">
                                            <div className="flex items-end gap-2">
                                                <span className="text-4xl font-bold text-white">
                                                    {pricing[currency].yearly}{pricing[currency].suffix}
                                                </span>
                                                <span className="text-slate-400 pb-1">/{t("secureDevelopment.pricing.month", "month")}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-2">
                                                {t("secureDevelopment.pricing.billedAnnually", "Billed annually at")} <span className="text-emerald-400 font-medium">{pricing[currency].yearlyTotal}{pricing[currency].suffix}</span>
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-sm text-slate-500 line-through">
                                                    {pricing[currency].yearlyFuture}{pricing[currency].suffix}/yr
                                                </span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {t("secureDevelopment.pricing.features.fullAccess", "Full platform access")}
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {t("secureDevelopment.pricing.features.support", "Priority support")}
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-300">
                                                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {t("secureDevelopment.pricing.features.priceLock", "Price locked for 12 months")}
                                            </li>
                                        </ul>

                                        <button 
                                            type="button"
                                            onClick={openAdminModal}
                                            className="w-full rounded-full py-3.5 text-sm font-semibold transition-all bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 mt-auto block text-center"
                                        >
                                            {t("secureDevelopment.pricing.getStarted", "Get Started")}
                                        </button>
                                    </div>
                                </div>
                            </EdgeGlowCard>
                        </div>
                    </div>
                </section>

                {/* Components section */}
                <section className="relative space-y-6">
                    <EdgeGlowCard outerClassName="relative overflow-hidden rounded-[28px]" innerClassName="rounded-[26px]">
                        <div className="p-8 md:p-10 space-y-5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
                                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                                {t("secureDevelopment.components.subtitle", "Three core components, fully isolated")}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">{t("secureDevelopment.components.title", "Everything runs on your infrastructure")}</h2>
                            <p className="text-slate-100 text-base md:text-lg leading-relaxed">
                                {t("secureDevelopment.components.description", "Your code, repositories, and security analysis never leave your network. Sithub provides complete GitHub functionality with built-in code scanning—all hosted on your servers. Download vulnerability databases from us, but your code stays private.")}
                            </p>

                            <div className="grid gap-5 md:grid-cols-3">
                                {architecture.map((item) => {
                                    let titleKey = "";
                                    let tagKey = "";
                                    if (item.title === "Git Repository Server") {
                                        titleKey = "secureDevelopment.components.gitServer.title";
                                        tagKey = "secureDevelopment.components.gitServer.tag";
                                    } else if (item.title === "Security Analyzer") {
                                        titleKey = "secureDevelopment.components.analyzer.title";
                                        tagKey = "secureDevelopment.components.analyzer.tag";
                                    } else if (item.title === "Vulnerability Database") {
                                        titleKey = "secureDevelopment.components.vulnDb.title";
                                        tagKey = "secureDevelopment.components.vulnDb.tag";
                                    }
                                    return (
                                        <HoverCard 
                                            key={item.title} 
                                            title={t(titleKey, item.title)} 
                                            tag={t(tagKey, item.tag)} 
                                            accent={item.accent} 
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </EdgeGlowCard>
                </section>

                {/* Impact timeline */}
                <section className="space-y-6 relative">
                    <GlowOrb className="-left-10 -top-20" color="rgba(248,113,113,0.16)" size="24rem" blur="110px" />
                    <GlowOrb className="right-0 top-8" color="rgba(190,24,93,0.12)" size="18rem" blur="95px" />

                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t("secureDevelopment.timeline.subtitle", "Recent wake-up calls")}</p>
                                <h2 className="text-3xl font-bold text-white">{t("secureDevelopment.timeline.title", "Why isolated, checked code matters")}</h2>
                            </div>
                        </div>

                    <EdgeGlowCard outerClassName="relative overflow-hidden rounded-[28px]" innerClassName="rounded-[26px]" glowColor="#f43f5e" secondaryGlowColor="rgba(248,113,113,0.4)">
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/25 via-fuchsia-600/20 to-blue-500/10" />
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400" />
                        <div className="relative flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.22em] text-rose-100">{t("secureDevelopment.timeline.incident.title", "Critical incident — leaked code")}</p>
                                <h3 className="text-xl md:text-2xl font-bold text-white">{t("secureDevelopment.timeline.incident.heading", "DeepSeek breach put source and prompts on the open internet")}</h3>
                                <p className="text-sm text-rose-50/90">{t("secureDevelopment.timeline.incident.description", "Keep inference and scanning on-prem. No external model egress. Audit trails by default.")}</p>
                            </div>
                            <button onClick={openModal} className="whitespace-nowrap rounded-full border border-rose-200/60 px-4 py-2 text-sm font-semibold text-white hover:border-white/70 transition">
                                {t("secureDevelopment.timeline.incident.seePlan", "See containment plan")}
                            </button>
                        </div>
                    </EdgeGlowCard>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {impactTimeline.map((item) => {
                            const tone = severityStyles[item.severityKey] || severityStyles.Medium;
                            return (
                                <motion.div
                                    key={item.attack}
                                    {...cardHover}
                                    className="relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl"
                                    style={{
                                        background: tone.bg,
                                        borderColor: `${tone.color}33`,
                                        boxShadow: tone.ring,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                    <div className="absolute inset-x-0 top-0 h-1 opacity-80" style={{ background: `linear-gradient(90deg, ${tone.color}, transparent)` }} />
                                    <div className="relative flex items-start justify-between gap-3">
                                        <div className="space-y-1">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 border border-white/10">
                                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tone.color }} />
                                                {item.year}
                                            </span>
                                            <h3 className="text-lg font-bold text-white">{item.attack}</h3>
                                            <p className="text-sm text-slate-200/90">{item.target}</p>
                                        </div>
                                        <span
                                            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide border"
                                            style={{ borderColor: `${tone.color}66`, color: tone.color, backgroundColor: `${tone.color}14` }}
                                        >
                                            {item.severity}
                                        </span>
                                    </div>
                                    <p className="relative mt-4 text-sm text-slate-100" style={{ color: "#f8fafc" }}>{item.impact}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* AI analyzer snapshot */}
                <section className="space-y-6 relative">
                    <GlowOrb className="-right-12 top-0" color="rgba(236,72,153,0.14)" size="22rem" blur="95px" />
                    <GlowOrb className="left-4 bottom-0" color="rgba(59,130,246,0.12)" size="18rem" blur="90px" />

                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t("secureDevelopment.analyzer.subtitle", "Live assurance")}</p>
                                <h2 className="text-3xl font-bold text-white">{t("secureDevelopment.analyzer.title", "Analyzer that beats CodeQL")}</h2>
                            </div>
                        </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { 
                                title: t("secureDevelopment.analyzer.features.quality.title", "Automatic code quality"), 
                                desc: t("secureDevelopment.analyzer.features.quality.description", "Structure, style, and best-practice checks tuned for safety-critical code"), 
                                icon: "✨" 
                            },
                            { 
                                title: t("secureDevelopment.analyzer.features.vulnerability.title", "Vulnerability sweeps"), 
                                desc: t("secureDevelopment.analyzer.features.vulnerability.description", "SQLi, XSS, auth bypass, and insecure dependencies surfaced instantly"), 
                                icon: "🛡️" 
                            },
                            { 
                                title: t("secureDevelopment.analyzer.features.secrets.title", "Secrets guard"), 
                                desc: t("secureDevelopment.analyzer.features.secrets.description", "Keys, tokens, and credentials blocked at commit time"), 
                                icon: "🔑" 
                            },
                            { 
                                title: t("secureDevelopment.analyzer.features.config.title", "Config hardening"), 
                                desc: t("secureDevelopment.analyzer.features.config.description", "Docker/K8s, IAM, and network policies scanned for privilege creep"), 
                                icon: "⚙️" 
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur-xl"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: idx * 0.05 }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(236,72,153,0.12))" }} />
                                <div className="relative flex gap-4">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">{item.title}</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <EdgeGlowCard outerClassName="relative overflow-hidden rounded-[28px]" innerClassName="rounded-[26px]" glowColor="#38bdf8">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/8 to-transparent" />
                        <div className="relative grid gap-4 md:grid-cols-3 p-5">
                            <div className="md:col-span-2 space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{t("secureDevelopment.analyzer.beyondCodeQL.subtitle", "Beyond CodeQL")}</p>
                                <h3 className="text-xl font-bold text-white">{t("secureDevelopment.analyzer.beyondCodeQL.title", "Finds what static queries miss")}</h3>
                                <p className="text-sm text-slate-200 leading-relaxed">
                                    {t("secureDevelopment.analyzer.beyondCodeQL.description", "Finds misconfigs and vulnerable packages faster than CodeQL and offers fixes, not just alerts.")}
                                </p>
                            </div>
                            <div className="space-y-2 text-sm text-slate-200">
                                <div className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                    <p>{t("secureDevelopment.analyzer.beyondCodeQL.points.packages", "Knows package graphs and flags risky dependencies in seconds.")}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                                    <p>{t("secureDevelopment.analyzer.beyondCodeQL.points.config", "Spots config drift and privilege creep—beyond static rules.")}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                                    <p>{t("secureDevelopment.analyzer.beyondCodeQL.points.patches", "Each finding comes with a suggested patch and owner.")}</p>
                                </div>
                            </div>
                        </div>
                    </EdgeGlowCard>

                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">
                        <GlowOrb className="-left-10 -top-14" color="rgba(236,72,153,0.12)" size="18rem" blur="80px" />
                        <GlowOrb className="right-0 bottom-0" color="rgba(59,130,246,0.1)" size="14rem" blur="70px" />

                        <div className="flex flex-wrap items-center justify-between gap-4 relative">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t("secureDevelopment.analyzer.visualizer.subtitle", "Visualizer")}</p>
                                <h3 className="text-2xl font-bold text-white">{t("secureDevelopment.analyzer.visualizer.title", "Code analyzer in action")}</h3>
                                <p className="text-sm text-slate-300">{t("secureDevelopment.analyzer.visualizer.description", "Crisp snapshots from recent scans, rendered beautifully inside the on-prem console.")}</p>
                            </div>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 border border-white/10">
                                {t("secureDevelopment.analyzer.visualizer.privateWorkspace", "Private workspace only")}
                            </span>
                        </div>

                        <div className="relative mt-8 grid gap-5 md:grid-cols-3">
                            {analyzerShots.map((shot, idx) => {
                                return (
                                    <div
                                        key={shot.src}
                                        className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-xl backdrop-blur-sm cursor-pointer"
                                        style={{ boxShadow: "0 20px 50px -28px rgba(15,23,42,0.9)" }}
                                        onClick={() => {
                                            setSelectedImage(shot);
                                            setIsImageModalOpen(true);
                                        }}
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <img
                                                src={shot.src}
                                                alt={t(shot.titleKey, shot.title)}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-4 space-y-1">
                                            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                {t("secureDevelopment.analyzer.visualizer.frame", "Frame {index}", { index: idx + 1 })}
                                            </div>
                                            <h4 className="text-lg font-semibold text-white">{t(shot.titleKey, shot.title)}</h4>
                                            <p className="text-sm text-slate-300 leading-relaxed">{t(shot.descKey, shot.desc)}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="mt-5 text-center text-sm text-slate-400">
                            {t("secureDevelopment.analyzer.visualizer.andManyMore", "And many more...")}
                        </p>
                    </div>
                </section>

                {/* Target industries */}
                <section className="space-y-6 relative">
                    <GlowOrb className="-right-6 top-4" color="rgba(59,130,246,0.12)" size="16rem" blur="80px" />
                    <GlowOrb className="left-0 bottom-2" color="rgba(16,185,129,0.12)" size="14rem" blur="70px" />

                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t("secureDevelopment.industries.subtitle", "Where we deploy")}</p>
                                <h2 className="text-3xl font-bold text-white">{t("secureDevelopment.industries.title", "Built for regulated, high-impact sectors")}</h2>
                            </div>
                        </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { 
                                icon: "🛢️", 
                                title: t("secureDevelopment.industries.oilGas.title", "Oil & Gas"), 
                                text: t("secureDevelopment.industries.oilGas.description", "Drilling, refining, pipeline control") 
                            }, 
                            { 
                                icon: "⚡", 
                                title: t("secureDevelopment.industries.energy.title", "Energy"), 
                                text: t("secureDevelopment.industries.energy.description", "Grid, distribution, and EMS") 
                            }, 
                            { 
                                icon: "⚛️", 
                                title: t("secureDevelopment.industries.nuclear.title", "Nuclear"), 
                                text: t("secureDevelopment.industries.nuclear.description", "Reactor controls and safety") 
                            }, 
                            { 
                                icon: "🏭", 
                                title: t("secureDevelopment.industries.manufacturing.title", "Manufacturing"), 
                                text: t("secureDevelopment.industries.manufacturing.description", "ICS, OT, and robotics") 
                            }, 
                            { 
                                icon: "🏛️", 
                                title: t("secureDevelopment.industries.government.title", "Government"), 
                                text: t("secureDevelopment.industries.government.description", "Ministries, defense, critical agencies") 
                            }
                        ].map((item) => (
                            <motion.div key={item.title} {...cardHover}>
                                <EdgeGlowCard outerClassName="h-full rounded-[24px]" innerClassName="rounded-[22px] h-full">
                                    <div className="p-6 text-center space-y-2">
                                        <div className="text-3xl">{item.icon}</div>
                                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                        <p className="text-sm text-slate-300">{item.text}</p>
                                    </div>
                                </EdgeGlowCard>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Social CTA */}
                <section className="w-full mt-16">
                    <FloatingText />
                </section>

            </main>

            <RequestSystemModal isOpen={isModalOpen} onClose={closeModal} />
            <ComingSoonModal
                isOpen={isAdminModalOpen}
                onClose={closeAdminModal}
                title={t("secureDevelopment.comingSoon.title", "Admin panel")}
                message={t(
                    "secureDevelopment.comingSoon.message",
                    "The admin panel is under development right now, it will be available by the end of the next week."
                )}
            />

            <AnimatePresence>
                {isImageModalOpen && selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl bg-black/90"
                        onClick={() => setIsImageModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative max-w-6xl max-h-[90vh] w-full mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsImageModalOpen(false)}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors cursor-pointer z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-full object-contain rounded-lg shadow-2xl"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                                <h3 className="text-xl font-bold text-white">
                                    {t(selectedImage.titleKey, selectedImage.title)}
                                </h3>
                                <p className="text-slate-300 mt-2">
                                    {t(selectedImage.descKey, selectedImage.desc)}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <BackToTopButton />
        </div>
    );
}
