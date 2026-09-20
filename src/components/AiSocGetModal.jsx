"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    BriefcaseBusiness,
    Crosshair,
    ExternalLink,
    Globe2,
    LayoutDashboard,
    Mail,
    Server,
    X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import GlassSurface from "./GlassSurface";

const PRODUCT_LINKS = {
    emailWorkspace: "https://kz.mail.silenceai.net",
    emailAdminPanel: "https://kz.mail.csd.silenceai.net",
    webSecurity: "https://kz.web.csd.silenceai.net",
    pentester: "https://kz.pentester.csd.silenceai.net",
    serverSecurity: "https://kz.server.csd.silenceai.net",
};

const ACCESS_OPTIONS = [
    { key: "emailWorkspace", label: "Email Workspace", icon: Mail },
    { key: "emailAdminPanel", label: "Email Admin Panel", icon: LayoutDashboard },
    { key: "webSecurity", label: "Web Security", icon: Globe2 },
    { key: "pentester", label: "Pentester", icon: Crosshair },
    { key: "serverSecurity", label: "Server Security", icon: Server },
];

const AiSocGetModal = ({ isOpen, onClose }) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    const handleRedirect = (url) => {
        if (url === "#") return;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 28, scale: 0.94, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(6px)" }}
                        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.8 }}
                        className="w-full max-w-lg"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <GlassSurface
                            width="100%"
                            height="auto"
                            borderRadius={28}
                            backgroundOpacity={0.1}
                            saturation={1}
                            blur={24}
                            displace={0.15}
                            distortionScale={-70}
                            brightness={38}
                            opacity={0.9}
                            redOffset={0}
                            greenOffset={0}
                            blueOffset={0}
                            mixBlendMode="normal"
                            className="ai-soc-modal-glass overflow-hidden border border-white/15 shadow-[0_24px_72px_rgba(0,0,0,0.52)]"
                        >
                            <div className="relative max-h-[90vh] overflow-y-auto p-6 text-white sm:p-8">
                                <button
                                    onClick={onClose}
                                    aria-label={t("aiSocModal.close", "Close")}
                                    className="absolute right-4 top-4 rounded-full p-2 text-white/55 transition-all hover:bg-white/10 hover:text-white"
                                >
                                    <X className="h-5 w-5" aria-hidden="true" />
                                </button>

                                <div className="mb-7 pr-8 text-center">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200/25 bg-blue-400/10 text-blue-200 shadow-[0_0_24px_rgba(96,165,250,0.2)]">
                                        <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                        {t("aiSocModal.title", "Choose a system to log in to")}
                                    </h2>
                                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                                        {t("aiSocModal.subtitle", "Select the service you want to access.")}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {ACCESS_OPTIONS.map(({ key, label, icon: Icon }) => (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => handleRedirect(PRODUCT_LINKS[key])}
                                            className="group flex w-full items-center gap-4 rounded-2xl border border-blue-200/25 bg-blue-500/10 px-4 py-3.5 text-left font-semibold text-blue-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200/60 hover:bg-blue-500/20 hover:shadow-[0_12px_32px_rgba(37,99,235,0.24)]"
                                        >
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-200/25 bg-blue-400/10 text-blue-200 transition-all duration-300 group-hover:border-blue-100/60 group-hover:bg-blue-300/20 group-hover:text-white group-hover:shadow-[0_0_22px_rgba(96,165,250,0.65)]">
                                                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(147,197,253,0.9)]" aria-hidden="true" />
                                            </span>
                                            <span className="text-base sm:text-lg">
                                                {t(`aiSocModal.${key}`, label)}
                                            </span>
                                        </button>
                                    ))}

                                    <div className="my-3 h-px w-full bg-white/10" />

                                    <a
                                        href="https://www.onlyoffice.com/download-desktop"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/35 px-4 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-black/55"
                                    >
                                        <div className="flex items-center gap-4 text-left">
                                            <svg className="h-10 w-10 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path d="M16 3L29 9L16 15L3 9L16 3Z" fill="#3AA9E1" stroke="#3AA9E1" strokeWidth="2" strokeLinejoin="round" />
                                                <path d="M16 10.5L29 16.5L16 22.5L3 16.5L16 10.5Z" fill="#8EBE3E" stroke="#8EBE3E" strokeWidth="2" strokeLinejoin="round" />
                                                <path d="M16 18L29 24L16 30L3 24L16 18Z" fill="#F06F4D" stroke="#F06F4D" strokeWidth="2" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="text-base font-semibold text-white">
                                                    {t("aiSocModal.getOnlyOffice", "Download OnlyOffice")}
                                                </span>
                                                <span className="text-xs font-normal leading-snug text-gray-300">
                                                    {t(
                                                        "aiSocModal.onlyOfficeRedirectNote",
                                                        "You will be redirected to the official OnlyOffice website to download it (a strong alternative to Microsoft Excel, Word, and PowerPoint)."
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <ExternalLink className="h-5 w-5 shrink-0 text-white/50 transition-all duration-300 group-hover:scale-110 group-hover:text-white" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </GlassSurface>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AiSocGetModal;
