"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import * as Flags from "country-flag-icons/react/3x2";

// Country data with ISO codes for flag lookup
const countries = [
  { code: "KZ", name: "Kazakhstan" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "PL", name: "Poland" },
  { code: "RU", name: "Russia" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "IN", name: "India" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SG", name: "Singapore" },
  { code: "OTHER", name: "Other" },
];

// Component to render flag SVG
const FlagIcon = ({ code, className = "w-6 h-4" }) => {
  if (code === "OTHER") {
    return (
      <span className={`${className} flex items-center justify-center text-lg`}>🌍</span>
    );
  }
  const FlagComponent = Flags[code];
  if (!FlagComponent) {
    return <span className={`${className} flex items-center justify-center text-xs bg-gray-600 rounded`}>{code}</span>;
  }
  return <FlagComponent className={`${className} rounded-sm`} />;
};

const CountrySelectModal = ({ isOpen, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { t } = useLanguage();

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    if (!selectedCountry) return;
    setShowComingSoon(true);
  };

  const handleClose = () => {
    setSelectedCountry(null);
    setSearchQuery("");
    setShowComingSoon(false);
    onClose();
  };

  const handleBackToCountrySelect = () => {
    setShowComingSoon(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative z-10 w-full max-w-md mx-4 rounded-2xl border border-white/10 bg-black/90 p-6 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {showComingSoon ? (
                /* Coming Soon Message */
                <motion.div
                  key="coming-soon"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-center py-8"
                >
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3">
                    {t("countrySelect.comingSoon.title", "Almost Ready!")}
                  </h2>
                  <p className="text-gray-300 mb-2">
                    {t("countrySelect.comingSoon.message", "The admin panel for managing subscription will be ready in")}
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                    3.5 {t("countrySelect.comingSoon.hours", "hours")}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    {t("countrySelect.comingSoon.notification", "We'll notify you when it's live!")}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={handleBackToCountrySelect}
                      className="flex-1 py-3 rounded-xl font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all"
                    >
                      {t("countrySelect.comingSoon.back", "Back")}
                    </button>
                    <button
                      onClick={handleClose}
                      className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all"
                    >
                      {t("countrySelect.comingSoon.gotIt", "Got it!")}
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Country Selection */
                <motion.div
                  key="country-select"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {t("countrySelect.title", "Select Your Country")}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {t("countrySelect.subtitle", "Choose your location to proceed")}
                    </p>
                  </div>

                  {/* Search Input */}
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder={t("countrySelect.searchPlaceholder", "Search country...")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Country List */}
                  <div className="max-h-64 overflow-y-auto mb-6 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="space-y-1">
                      {filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => setSelectedCountry(country.code)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                            selectedCountry === country.code
                              ? "bg-blue-600 text-white"
                              : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <FlagIcon code={country.code} className="w-6 h-4" />
                          <span className="text-sm font-medium">{country.name}</span>
                          {selectedCountry === country.code && (
                            <svg
                              className="ml-auto h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                      {filteredCountries.length === 0 && (
                        <p className="text-center text-gray-500 py-4">
                          {t("countrySelect.noResults", "No countries found")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleContinue}
                    disabled={!selectedCountry}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                      selectedCountry
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {t("countrySelect.continue", "Continue")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountrySelectModal;
