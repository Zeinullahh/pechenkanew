import React from "react";
import EdgeGlowCard from "./EdgeGlowCard";
import { useLanguage } from "@/contexts/LanguageContext";

const ConsultingQuestionnaire = ({ search, setSearch, openIndex, setOpenIndex }) => {
  const { t } = useLanguage();
  const defaultGlowPalette = {
    glowColor: "#FF00B7",
    secondaryGlowColor: "rgba(32,140,255,0.45)",
    topColor: "#FF00B7",
    leftColor: "#FF00B7",
    rightColor: "rgba(32,140,255,0.45)",
    bottomColor: "rgba(32,140,255,0.45)",
  };

  const faqAccentPalette = [
    { color: "#FF00B7", glow: "rgba(255,0,183,0.35)" },
    { color: "#00BFFF", glow: "rgba(0,191,255,0.32)" },
    { color: "#37FF8B", glow: "rgba(55,255,139,0.28)" },
    { color: "#3B82F6", glow: "rgba(59,130,246,0.35)" },
  ];

  const consultingQuestionsData = t("consulting.questions");
  const consultingQuestions = Array.isArray(consultingQuestionsData) ? consultingQuestionsData : [];

  const filteredQuestions = consultingQuestions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="relative space-y-8">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          {t("consulting.title", "Consulting Services")}
        </h2>
      </div>
      <EdgeGlowCard
        mode="static"
        spotlight
        {...defaultGlowPalette}
        outerClassName="group relative z-10 rounded-[30px] p-[2px] edge-glow-card--default"
        innerClassName="glass-card rounded-[26px]"
      >
        <div
          className="relative flex flex-col gap-6 overflow-hidden rounded-[22px] border border-white/12 p-8"
          style={{
            boxShadow: "0 18px 45px rgba(5,12,32,0.55)",
            background: "linear-gradient(150deg, rgba(2,5,12,0.97), rgba(0,1,4,0.98))",
          }}
        >
          <input
            type="text"
            placeholder={t("consulting.searchPlaceholder", "Search questions...")}
            className="w-full px-4 py-3 border border-white/20 rounded-lg bg-black/40 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF00B7] transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="space-y-4 text-left">
            {filteredQuestions.map((q, idx) => {
              const accent = faqAccentPalette[idx % faqAccentPalette.length];
              const isOpen = openIndex === idx;

              return (
                <EdgeGlowCard
                  key={q.question}
                  mode="static"
                  spotlight
                  {...defaultGlowPalette}
                  outerClassName="group relative z-10 rounded-[30px] p-[2px] edge-glow-card--default"
                  innerClassName="glass-card rounded-[26px]"
                >
                  <div
                    className="relative overflow-hidden rounded-[22px] border border-white/12 p-6"
                    style={{
                      boxShadow: isOpen ? `0 24px 60px ${accent.glow}` : "0 18px 45px rgba(5,12,32,0.55)",
                      background: "linear-gradient(150deg, rgba(2,5,12,0.97), rgba(0,1,4,0.98))",
                    }}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-[22px] transition-opacity duration-500 ${
                        isOpen ? "opacity-90" : "opacity-0"
                      } group-hover:opacity-100`}
                      style={{
                        background: `radial-gradient(90% 130% at 20% -10%, ${accent.color}33 0%, transparent 70%)`,
                      }}
                    />
                    <div className="relative z-10 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${idx}`}
                        className="flex w-full items-center justify-between gap-4 text-left text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      >
                        <span className="text-base font-semibold sm:text-lg">{q.question}</span>
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white text-xl leading-none transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <div
                        id={`faq-panel-${idx}`}
                        className={`overflow-hidden text-sm text-white/65 transition-all duration-500 ease-out ${
                          isOpen ? "opacity-100 pt-4" : "opacity-0"
                        }`}
                        style={{ maxHeight: isOpen ? "240px" : "0px" }}
                      >
                        <p>{q.answer}</p>
                      </div>
                    </div>
                  </div>
                </EdgeGlowCard>
              );
            })}
            {filteredQuestions.length === 0 && (
              <div className="text-white/50 text-center py-8">{t("consulting.noResults", "No results found")}</div>
            )}
          </div>
        </div>
      </EdgeGlowCard>
    </section>
  );
};

export default ConsultingQuestionnaire;
