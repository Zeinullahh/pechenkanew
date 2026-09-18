"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/contexts/LanguageContext";

const EmailSecurityModal = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center backdrop-blur-md bg-black/40"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative bg-[#050b1a]/95 backdrop-blur-2xl text-white rounded-2xl border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)] p-8 w-full max-w-md mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-bold mb-2 text-center text-white/90">
                            {t("emailSecurityModal.title", "Email Security")}
                        </h2>
                        <p className="text-gray-400 text-center mb-8 text-sm">
                            {t("emailSecurityModal.subtitle", "Select how you would like to access your account")}
                        </p>

                        <div className="flex flex-col gap-4">
                            <a
                                href="https://mail.silenceai.net/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-full py-5 px-6 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 rounded-xl font-semibold transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col items-start translate-x-0 group-hover:translate-x-1 transition-transform">
                                        <span className="text-lg">{t("emailSecurityModal.webmail.title", "Webmail")}</span>
                                        <span className="text-xs text-blue-400 font-normal">{t("emailSecurityModal.webmail.desc", "Access your inbox directly")}</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </a>

                            <a
                                href="https://email-soc.silenceai.net/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-full py-5 px-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 border border-purple-500/30 rounded-xl font-semibold transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col items-start translate-x-0 group-hover:translate-x-1 transition-transform">
                                        <span className="text-lg">{t("emailSecurityModal.admin.title", "Admin Console")}</span>
                                        <span className="text-xs text-purple-400 font-normal">{t("emailSecurityModal.admin.desc", "Manage security settings and users")}</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EmailSecurityModal;
