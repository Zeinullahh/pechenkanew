"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmailSecurityDocumentation from "@/components/instructions/EmailSecurityDocumentation";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMessages } from "next-intl";

export default function AiSocDocumentationTabs() {
    const { t } = useLanguage();
    const messages = useMessages();
    const tabLabels = messages?.documentation?.tabs ?? {};
    const placeholderCopy = messages?.documentation?.webSecurity?.placeholder ?? {};
    const tabs = useMemo(
        () => [
            { id: "web", label: tabLabels?.web ?? "Web Security" },
            { id: "email", label: tabLabels?.email ?? "Email Security" }
        ],
        [tabLabels]
    );
    const [activeTab, setActiveTab] = useState("email");

    return (
        <div className="flex w-full flex-col gap-2">
            {/* Tabs */}
            <div className="relative z-10 flex w-full justify-center">
                <div className="relative flex rounded-full border border-purple-400/25 bg-[#050b1a]/85 p-1 text-sm font-medium text-purple-100/70 shadow-[0_0_55px_rgba(168,85,247,0.28)] backdrop-blur-xl">
                    {tabs.map((tab) => {
                        const isActive = tab.id === activeTab;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className="relative flex min-w-[160px] items-center justify-center rounded-full px-5 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/40"
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="tab-indicator"
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200 via-violet-200 to-fuchsia-200 shadow-[0_0_35px_rgba(168,85,247,0.55)]"
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 28
                                        }}
                                    />
                                )}
                                <span
                                    className={`relative z-10 ${isActive
                                        ? "text-black"
                                        : "text-purple-100/70 hover:text-purple-50"
                                        }`}
                                >
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="relative w-full">
                <AnimatePresence mode="wait">
                    {activeTab === "email" ? (
                        <motion.div
                            key="email-doc"
                            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(10px)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* Purple visual glow for Email Docs */}
                            <div className="pointer-events-none absolute inset-0 z-0 flex justify-center overflow-hidden">
                                <div className="absolute -top-32 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]" />
                                <div className="absolute -top-10 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-fuchsia-600/15 blur-[100px]" />
                            </div>

                            <div className="relative z-10">
                                <EmailSecurityDocumentation />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="web-placeholder"
                            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(10px)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <WebSecurityPlaceholder
                                badge={placeholderCopy?.badge ?? "Web Security"}
                                title={placeholderCopy?.title ?? "Documentation is coming soon"}
                                description={placeholderCopy?.description ?? "We are preparing a detailed guide for configuring and protecting web applications. Check back soon — the materials will appear shortly."}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function WebSecurityPlaceholder({ badge, title, description }) {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <div className="relative">
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-r from-purple-600/40 via-violet-600/40 to-fuchsia-600/40 opacity-50 blur-[22px]" aria-hidden="true" />
                <div className="relative rounded-[36px] bg-gradient-to-r from-purple-500/60 via-violet-500/60 to-purple-500/60 p-[1.5px] shadow-[0_0_55px_rgba(168,85,247,0.25)]">
                    <Card className="relative rounded-[34px] border border-purple-500/10 bg-[#030712]/90 text-white shadow-[0_0_75px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
                        <div className="flex flex-col items-center gap-4 px-10 py-16 text-center sm:py-20">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                                className="text-sm uppercase tracking-[0.3em] text-purple-200/80"
                            >
                                {badge}
                            </motion.span>

                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
                                className="mt-4 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_20px_60px_-20px_rgba(34,211,238,0.45)]"
                            >
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
                            </motion.div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
