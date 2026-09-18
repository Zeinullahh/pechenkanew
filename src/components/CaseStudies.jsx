import React, { useMemo, useRef, useState } from "react";
import EdgeGlowCard from "./EdgeGlowCard";
import { useLanguage } from "@/contexts/LanguageContext";

/* =========================
   3D TILT HOOK
========================= */
const useTilt = (maxTilt = 8) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rx = ((y - cy) / cy) * -maxTilt;
    const ry = ((x - cx) / cx) * maxTilt;

    el.style.transform = `
      perspective(1000px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      scale(1.035)
    `;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return { ref, onMove, onLeave };
};

/* =========================
   INLINE SPARKLINE (NO DEPS)
========================= */
const Sparkline = ({ data, accent }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1e-6, max - min);

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 90 - ((d - min) / range) * 70;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-16">
      <g opacity="0.25">
        <line x1="0" y1="25" x2="100" y2="25" stroke="white" strokeWidth="0.6" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.6" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="white" strokeWidth="0.6" />
      </g>

      <polygon
        points={areaPoints}
        fill={accent}
        opacity="0.12"
        style={{ filter: `drop-shadow(0 0 10px ${accent}55)` }}
      />

      <polyline
        points={points}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 10px ${accent}88)` }}
      />
    </svg>
  );
};

/* =========================
   IMAGE FALLBACK HERO
   (solves broken images)
========================= */
const FallbackHero = ({ title, accent, label }) => {
  const initials = useMemo(() => {
    const parts = title.replace(/—/g, " ").split(" ").filter(Boolean);
    const a = parts[0]?.[0] || "C";
    const b = parts[1]?.[0] || "S";
    return (a + b).toUpperCase();
  }, [title]);

  return (
    <div className="relative h-44 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 20% 0%, ${accent}40 0%, rgba(0,0,0,0) 60%),
                       radial-gradient(90% 90% at 80% 20%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 55%),
                       linear-gradient(160deg, rgba(10,12,20,0.95), rgba(2,3,8,0.98))`,
        }}
      />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 10px)",
          maskImage:
            "radial-gradient(140px 90px at 30% 35%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(140px 90px at 30% 35%, black 0%, transparent 70%)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-2xl opacity-40"
        style={{ background: accent }}
      />
      <div className="absolute -bottom-12 right-6 w-44 h-44 rounded-full bg-white/10 blur-3xl" />

      {/* Icon badge */}
      <div
        className="absolute top-6 left-6 rounded-2xl px-3 py-2 glass-readable"
        style={{ boxShadow: `0 0 30px ${accent}33` }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 14px ${accent}` }}
          />
          <span className="text-xs tracking-widest text-white/70 uppercase">
            {label}
          </span>
        </div>
      </div>

      {/* Big initials */}
      <div className="absolute inset-0 flex items-end justify-end p-6">
        <div
          className="text-4xl font-bold tracking-tight"
          style={{
            color: "rgba(255,255,255,0.75)",
            textShadow: `0 0 25px ${accent}55`,
          }}
        >
          {initials}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    </div>
  );
};

const CaseStudyCard = ({ study, glow, t }) => {
  const tilt = useTilt(9);
  const [imgOk, setImgOk] = useState(true);

  return (
    <EdgeGlowCard
      mode="static"
      spotlight
      {...glow}
      outerClassName="group rounded-[32px] p-[2px]"
      innerClassName="rounded-[30px]"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        className="relative h-full rounded-[26px] border border-white/12 overflow-hidden transition-transform duration-200"
        style={{
          transformStyle: "preserve-3d",
          background: "rgba(8, 8, 14, 0.55)",
          boxShadow: "0 30px 80px rgba(5,12,32,0.65)",
        }}
      >
        {/* Accent activation */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
          style={{
            transform: "translateZ(10px)",
            background: `radial-gradient(120% 120% at 20% -10%, ${study.accent}40 0%, transparent 60%)`,
          }}
        />

        {/* Soft sweep on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
          style={{
            transform: "translateZ(20px)",
            background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.045), transparent)",
          }}
        />

        {/* KPI Badge */}
        <div
          className="absolute top-6 right-6 z-20 rounded-2xl px-4 py-2 text-sm font-semibold backdrop-blur-md"
          style={{
            transform: "translateZ(60px)",
            background: `${study.accent}22`,
            color: study.accent,
            boxShadow: `0 0 30px ${study.accent}66`,
            border: `1px solid ${study.accent}55`,
          }}
        >
          {study.result}
        </div>

        {/* HERO: image if available, otherwise fallback */}
        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          {study.image && imgOk ? (
            <div className="relative h-44 overflow-hidden">
              <img
                src={study.image}
                alt={study.title}
                loading="lazy"
                onError={() => setImgOk(false)}
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          ) : (
            <FallbackHero title={study.title} accent={study.accent} label={t("caseStudies.caseStudy", "Case Study")} />
          )}
        </div>

        {/* Content */}
        <div className="relative p-6" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-lg font-semibold text-white mb-4">{study.title}</h3>

          {/* Impact Timeline */}
          <div className="relative pl-6 space-y-4">
            <div
              className="absolute left-1 top-1 bottom-1 w-px"
              style={{
                background: `linear-gradient(${study.accent}, transparent)`,
                boxShadow: `0 0 12px ${study.accent}88`,
              }}
            />

            <div className="flex gap-3">
              <span className="mt-1 w-2 h-2 rounded-full" style={{ backgroundColor: study.accent }} />
              <p className="text-sm text-white/60">
                <span className="text-white/80 font-medium">{t("caseStudies.problem", "Problem:")}</span> {study.problem}
              </p>
            </div>

            <div className="flex gap-3">
              <span className="mt-1 w-2 h-2 rounded-full" style={{ backgroundColor: study.accent }} />
              <p className="text-sm text-white/60">
                <span className="text-white/80 font-medium">{t("caseStudies.solution", "Solution:")}</span> {study.solution}
              </p>
            </div>

            <div className="flex gap-3">
              <span className="mt-1 w-2 h-2 rounded-full" style={{ backgroundColor: study.accent }} />
              <p className="text-sm font-semibold text-white">{study.result}</p>
            </div>
          </div>

          {/* Inline Metrics */}
          <div
            className="mt-6 rounded-2xl p-4 border border-white/10 bg-black/40"
            style={{ transform: "translateZ(35px)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wide text-white/50">{study.metricLabel}</span>
              <span className="text-xs font-semibold" style={{ color: study.accent }}>
                {t("caseStudies.liveImpact", "Live Impact")}
              </span>
            </div>

            <div className="transition-transform duration-300 group-hover:scale-[1.02]">
              <Sparkline data={study.metrics} accent={study.accent} />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-white/45">
              <span>{t("caseStudies.before", "Before")}</span>
              <span>{t("caseStudies.after", "After")}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <span className="text-sm text-white/70 underline group-hover:text-white transition">
              {t("caseStudies.buildCta", "Build something like this →")}
            </span>
          </div>
        </div>

        {/* Accent border */}
        <div
          className="absolute inset-0 rounded-[26px] opacity-0 group-hover:opacity-100 transition duration-500"
          style={{ boxShadow: `inset 0 0 0 1px ${study.accent}55` }}
        />
      </div>
    </EdgeGlowCard>
  );
};

/* =========================
   MAIN COMPONENT
========================= */
const CaseStudies = () => {
  const { t } = useLanguage();
  const glow = {
    glowColor: "#FF00B7",
    secondaryGlowColor: "rgba(32,140,255,0.45)",
    topColor: "#FF00B7",
    leftColor: "#FF00B7",
    rightColor: "rgba(32,140,255,0.45)",
    bottomColor: "rgba(32,140,255,0.45)",
  };

  // ✅ Keep image paths if you have them.
  // ✅ If not, the component automatically shows the premium fallback hero instead.
  const caseStudies = useMemo(
    () => [
      {
        image: null,
        title: t("caseStudies.items.nak.title", "NAK — Team Management AI"),
        problem: t("caseStudies.items.nak.problem", "Manual resource allocation"),
        solution: t("caseStudies.items.nak.solution", "AI-powered scheduling agent"),
        result: t("caseStudies.items.nak.result", "+32% productivity"),
        accent: "#FF00B7",
        metrics: [42, 44, 46, 50, 58, 62],
        metricLabel: t("caseStudies.items.nak.metricLabel", "Team Output Index"),
      },
      {
        image: null,
        title: t("caseStudies.items.chic.title", "Chic Flowers — eCommerce"),
        problem: t("caseStudies.items.chic.problem", "Low online conversions"),
        solution: t("caseStudies.items.chic.solution", "Personalized recommender + UX overhaul"),
        result: t("caseStudies.items.chic.result", "+45% online sales"),
        accent: "#00BFFF",
        metrics: [18, 19, 21, 26, 30, 36],
        metricLabel: t("caseStudies.items.chic.metricLabel", "Conversion Rate Growth"),
      },
      {
        image: null,
        title: t("caseStudies.items.silence.title", "Silence AI-CSD"),
        problem: t("caseStudies.items.silence.problem", "High alert noise"),
        solution: t("caseStudies.items.silence.solution", "AI detection & automated response"),
        result: t("caseStudies.items.silence.result", "−68% false positives"),
        accent: "#37FF8B",
        metrics: [92, 88, 80, 60, 42, 30],
        metricLabel: t("caseStudies.items.silence.metricLabel", "False Alert Volume"),
      },
    ],
    [t]
  );

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-fuchsia-500/10 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <span className="inline-block text-sm tracking-widest text-white/50 uppercase">
            {t("caseStudies.badge", "Proven Impact")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">{t("caseStudies.title", "Case Studies")}</h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            {t("caseStudies.subtitle", "We don’t ship features. We ship outcomes.")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} glow={glow} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
