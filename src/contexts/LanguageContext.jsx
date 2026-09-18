"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const LanguageContext = createContext({
  language: "en",
  t: (key, fallback, values) => fallback ?? key,
});

export const LanguageProvider = ({ children, initialLanguage }) => {
  const t_next = useTranslations();

  const [language, setLanguageState] = useState(initialLanguage ?? "en");

  useEffect(() => {
    setLanguageState(initialLanguage ?? "en");
  }, [initialLanguage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const translate = (key, fallback, values) => {
    try {
      if (typeof t_next.has === "function" && !t_next.has(key)) {
        return fallback || key;
      }

      const result = t_next(key, values);

      if (result === key && key.includes('.') && fallback) {
        return fallback;
      }
      return result;
    } catch {
      return fallback || key;
    }
  };

  const value = useMemo(() => ({
    language,
    t: translate,
  }), [language, t_next]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
