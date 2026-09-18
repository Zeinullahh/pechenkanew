"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/contexts/LanguageContext";

const RequestDemoModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary stub - data is not sent anywhere
    setIsSubmitted(true);
    // onClose(); // Removed to show confirmation
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-black/70 backdrop-blur-2xl text-white rounded-3xl border border-white/15 p-8 w-full max-w-md mx-4 shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {isSubmitted ? (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-4">{t("requestDemoModal.successTitle", "Thank you!")}</h2>
                <p className="text-gray-300 mb-6">
                  {t("requestDemoModal.successBody", "We'll get back to you soon to schedule your demo.")}
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-colors"
                >
                  {t("requestDemoModal.close", "Close")}
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-6">{t("requestDemoModal.title", "Contact Us")}</h2>

                <div className="space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {t("requestDemoModal.contactInfo", "You can contact us through this email")}
                    <br />
                    <a
                      href="mailto:info@silenceai.net"
                      className="text-blue-400 font-bold hover:text-blue-300 transition-colors text-xl mt-2 inline-block"
                    >
                      info@silenceai.net
                    </a>
                    <br />
                    {t("requestDemoModal.contactSuffix", "to reach us out")}
                  </p>

                  <div className="pt-6">
                    <button
                      onClick={handleClose}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-colors"
                    >
                      {t("requestDemoModal.close", "Close")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestDemoModal;
