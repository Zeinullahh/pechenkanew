"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/contexts/LanguageContext";

const RequestSystemModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary stub - data is not sent anywhere
    setIsSubmitted(true);
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
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-black/70 backdrop-blur-xl text-white rounded-xl border border-white/10 shadow-2xl p-8 w-full max-w-md mx-4"
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
                 <h2 className="text-2xl font-bold mb-4">{t("requestSystemModal.successTitle", "Thank you!")}</h2>
                 <p className="text-gray-300 mb-6">
                   {t("requestSystemModal.successBody", "We'll get back to you soon with more information about SLNC-env.")}
                 </p>
                 <button
                   onClick={handleClose}
                   className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-all"
                 >
                   {t("requestSystemModal.close", "Close")}
                 </button>
               </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">{t("requestSystemModal.title", "Request System Information")}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {t("requestSystemModal.name", "Name")}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder={t("requestSystemModal.placeholders.name", "Your name")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {t("requestSystemModal.email", "Email")}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder={t("requestSystemModal.placeholders.email", "your@email.com")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {t("requestSystemModal.company", "Company")}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder={t("requestSystemModal.placeholders.company", "Your company")}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
                    >
                      {t("requestSystemModal.submit", "Submit Request")}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestSystemModal;
