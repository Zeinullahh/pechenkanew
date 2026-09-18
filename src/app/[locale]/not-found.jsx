"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef } from "react";

const NotFound = () => {
  const { t } = useLanguage();
  const cardRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("not-found-page");
    return () => {
      document.body.classList.remove("not-found-page");
    };
  }, []);

  useEffect(() => {
    // reserve hook in case we want light motion later
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#01091C] px-6 py-20 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,0,183,0.12),transparent_42%),radial-gradient(circle_at_82%_14%,rgba(88,116,255,0.14),transparent_44%),radial-gradient(circle_at_50%_96%,rgba(0,0,0,0.32),transparent_56%)]" />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div
          ref={cardRef}
          className="relative w-full overflow-hidden rounded-[28px] border border-white/14 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-blue-900/40 p-8 shadow-[0_32px_96px_rgba(0,0,0,0.34)] ring-1 ring-white/6 sm:p-12"
        >
          <div className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_18%_18%,rgba(255,0,183,0.14),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(88,116,255,0.16),transparent_44%),radial-gradient(circle_at_50%_96%,rgba(0,0,0,0.30),transparent_56%)]" />
          <div className="relative flex flex-col items-center gap-4 sm:gap-5">
            <h1 className="text-4xl font-bold sm:text-5xl">404</h1>
            <p className="text-lg text-white/80 sm:text-xl font-semibold tracking-tight uppercase">
              {t("notFound.title", "Not found")}
            </p>
            <p className="text-base text-white/70 sm:text-lg max-w-2xl">
              {t(
                "notFound.description",
                "We looked everywhere but couldn’t find this page."
              )}
            </p>
            <div className="pt-4 w-full">
              <Link
                href="/"
                className="inline-flex h-[54px] w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100"
              >
                {t("notFound.cta", "Back to homepage")}
              </Link>
            </div>
          </div>
        </div>
      </div>
        <style jsx global>{`
          [aria-label="Social links"] {
            display: none !important;
          }
        `}</style>
    </main>
  );
};

export default NotFound;
