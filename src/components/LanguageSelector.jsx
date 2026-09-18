"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import clsx from "clsx";
import {
  US,
  JP,
  CN,
  KR,
  FR,
  DE,
  RU,
  SA,
  TR,
  VN,
} from "country-flag-icons/react/3x2";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const FLAG_COMPONENTS = {
  US,
  JP,
  CN,
  KR,
  FR,
  DE,
  RU,
  SA,
  TR,
  VN,
};

const LANGUAGE_OPTIONS = [
  { code: "en", label: "EN", name: "English", englishName: "English", flag: "US" },
  { code: "ja", label: "JA", name: "日本語", englishName: "Japanese", flag: "JP" },
  { code: "zh", label: "ZH", name: "中文", englishName: "Chinese", flag: "CN" },
  { code: "ko", label: "KO", name: "한국어", englishName: "Korean", flag: "KR" },
  { code: "fr", label: "FR", name: "Français", englishName: "French", flag: "FR" },
  { code: "de", label: "DE", name: "Deutsch", englishName: "German", flag: "DE" },
  { code: "ru", label: "RU", name: "Русский", englishName: "Russian", flag: "RU" },
  { code: "ar", label: "AR", name: "العربية", englishName: "Arabic", flag: "SA" },
  { code: "tr", label: "TR", name: "Türkçe", englishName: "Turkish", flag: "TR" },
];

export default function LanguageSelector({ align = "right", allowedLocales }) {
  const { language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const options = useMemo(() => {
    if (!allowedLocales) return LANGUAGE_OPTIONS;
    return LANGUAGE_OPTIONS.filter((item) => allowedLocales.includes(item.code));
  }, [allowedLocales]);

  const showSearch = options.length > 3;

  const active = useMemo(() => {
    return LANGUAGE_OPTIONS.find((item) => item.code === language) ?? LANGUAGE_OPTIONS[0];
  }, [language]);

  const ActiveFlag = FLAG_COMPONENTS[active.flag] ?? null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    if (!query) return options;

    return options.filter((item) =>
      [item.name, item.label, item.code].some((value) =>
        value.toLocaleLowerCase().includes(query)
      )
    );
  }, [searchTerm, options]);

  const handleSelect = (code) => {
    setIsOpen(false);
    setSearchTerm("");
    if (code === language) return;
    router.replace(pathname, { locale: code });
  };

  return (
    <div className="relative z-[9999]" ref={containerRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => {
            const next = !prev;
            if (!next) setSearchTerm("");
            return next;
          });
        }}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="h-4 w-6 overflow-hidden rounded-[4px] border border-white/20">
          {ActiveFlag ? (
            <ActiveFlag className="h-full w-full" />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-white/10 text-[10px] font-semibold uppercase">
              {active.label}
            </span>
          )}
        </span>
        <span>{active.label}</span>
        <svg
          className={clsx("h-3 w-3 text-white/70 transition-transform", isOpen && "rotate-180")}
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10.59 0.589966L6 5.16997L1.41 0.589966L0 1.99997L6 7.99997L12 1.99997L10.59 0.589966Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Choose language"
          className={clsx(
            "fixed z-[9999] mt-2 w-[90vw] max-w-[16rem] rounded-2xl border border-white/10 bg-black/85 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl",
            "left-1/2 -translate-x-1/2",
            "sm:absolute sm:w-auto sm:min-w-[16rem]",
            align === "center" && "sm:left-1/2 sm:-translate-x-1/2",
            align === "left" && "sm:left-0 sm:translate-x-0",
            align === "right" && "sm:left-auto sm:right-0 sm:translate-x-0"
          )}
        >
          {showSearch && (
            <div className="mb-2">
              <label htmlFor="language-search" className="sr-only">
                Search languages
              </label>
              <div className="relative">
                <input
                  id="language-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search languages"
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/15 bg-black/55 px-3 py-2 pr-9 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M8.5 3a5.5 5.5 0 014.388 8.795l3.159 3.158a1 1 0 01-1.414 1.414l-3.158-3.159A5.5 5.5 0 118.5 3zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          )}

          <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
            {filteredOptions.length === 0 && (
              <p className="px-2 py-2 text-sm text-white/60">No languages found.</p>
            )}

            {filteredOptions.map((item) => {
              const Flag = FLAG_COMPONENTS[item.flag] ?? null;
              const isActive = item.code === active.code;

              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(item.code)}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white transition",
                    isActive ? "bg-white/15 font-semibold" : "hover:bg-white/10"
                  )}
                >
        <span className="h-4 w-6 overflow-hidden rounded-[4px] border border-white/20">
                    {Flag ? (
                      <Flag className="h-full w-full" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-white/10 text-[10px] font-semibold uppercase">
                        {item.label}
                      </span>
                    )}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="truncate">{item.name}</span>
                    <span className="truncate text-xs text-white/60">{item.englishName}</span>
                  </span>
                  {isActive && (
                    <svg
                      className="h-4 w-4 text-[#FF00B7]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
