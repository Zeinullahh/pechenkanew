import React, { useEffect, useMemo, useState } from "react";
import EdgeGlowCard from "./EdgeGlowCard";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const HowWeWork = () => {
  const { t } = useLanguage();
  const defaultGlowPalette = {
    glowColor: "#FF00B7",
    secondaryGlowColor: "rgba(32,140,255,0.45)",
    topColor: "#FF00B7",
    leftColor: "#FF00B7",
    rightColor: "rgba(32,140,255,0.45)",
    bottomColor: "rgba(32,140,255,0.45)",
  };

  const steps = useMemo(
    () => [
      { key: "discovery", title: t("howWeWork.steps.discovery.title", "Discovery"), desc: t("howWeWork.steps.discovery.desc", "Requirements, stakeholders, success metrics."), accent: "#FF00B7" },
      { key: "design", title: t("howWeWork.steps.design.title", "Design"), desc: t("howWeWork.steps.design.desc", "UX, architecture, prototype."), accent: "#00BFFF" },
      { key: "poc", title: t("howWeWork.steps.poc.title", "Proof of Concept"), desc: t("howWeWork.steps.poc.desc", "Rapid validation with measurable KPIs."), accent: "#37FF8B" },
      { key: "build", title: t("howWeWork.steps.build.title", "Build"), desc: t("howWeWork.steps.build.desc", "Iterative sprints, automated tests."), accent: "#3B82F6" },
      { key: "deploy", title: t("howWeWork.steps.deploy.title", "Deploy"), desc: t("howWeWork.steps.deploy.desc", "CI/CD, monitoring, security hardening."), accent: "#FF00B7" },
      { key: "support", title: t("howWeWork.steps.support.title", "Support & Scale"), desc: t("howWeWork.steps.support.desc", "Maintenance, roadmap, continuous improvement."), accent: "#00BFFF" },
    ],
    [t]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /* =========================
     VERY FAST AUTO PROGRESS
  ========================= */
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(
      () => setActiveIndex((i) => (i + 1) % steps.length),
      1200 // ⚡ faster
    );
    return () => clearInterval(interval);
  }, [paused, steps.length]);

  /* =========================
     REACTIVE CURVE (FAST)
  ========================= */
  const curvePath = useMemo(() => {
    const t = activeIndex / (steps.length - 1);
    const cp1y = 120 - t * 70;
    const cp2y = 120 + t * 90;
    return `M 0 120 C 300 ${cp1y}, 700 ${cp2y}, 1000 120`;
  }, [activeIndex, steps.length]);

  const progressLength = (activeIndex + 1) / steps.length;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-fuchsia-500/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {t("howWeWork.title", "How We Work")}
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            {t(
              "howWeWork.subtitle",
              "Ultra-fast delivery pipeline — optimized for velocity."
            )}
          </p>
        </motion.div>

        <div className="relative">
          {/* CURVED PIPELINE */}
          <svg
            viewBox="0 0 1000 240"
            preserveAspectRatio="none"
            className="hidden md:block absolute top-1/2 left-0 w-full h-40 -translate-y-1/2 pointer-events-none"
          >
            {/* Base */}
            <path
              d={curvePath}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />

            {/* Active progress */}
            <motion.path
              d={curvePath}
              fill="none"
              stroke={steps[activeIndex].accent}
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                strokeDasharray: `${progressLength * 1000} 1000`,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }} // ⚡ faster
              style={{
                filter: `drop-shadow(0 0 14px ${steps[activeIndex].accent})`,
              }}
            />

            {/* FAST PARTICLE */}
            <AnimatePresence>
              {!paused && (
                <motion.circle
                  key={activeIndex}
                  r="4"
                  fill={steps[activeIndex].accent}
                  initial={{ "--offset-pos": "0%" }}
                  animate={{ "--offset-pos": "100%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "linear" }} // ⚡ very fast
                  style={{
                    offsetPath: `path('${curvePath}')`,
                    offsetDistance: "var(--offset-pos)",
                    filter: `drop-shadow(0 0 12px ${steps[activeIndex].accent})`,
                  }}
                />
              )}
            </AnimatePresence>
          </svg>

          {/* STEPS */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, i) => {
              const isActive = i === activeIndex;

              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  onMouseEnter={() => {
                    setPaused(true);
                    setActiveIndex(i);
                  }}
                  onMouseLeave={() => setPaused(false)}
                >
                  <EdgeGlowCard
                    mode="static"
                    spotlight
                    {...defaultGlowPalette}
                    outerClassName="group rounded-[30px] p-[2px]"
                    innerClassName="rounded-[26px]"
                  >
                    <div
                      className="relative h-full rounded-[22px] border border-white/12 px-4 py-6 text-center transition-all duration-300"
                      style={{
                        background:
                          "rgba(8, 8, 14, 0.55)",
                        boxShadow: isActive
                          ? `0 30px 80px ${step.accent}55`
                          : "0 22px 60px rgba(5,12,32,0.65)",
                      }}
                    >
                      <div
                        className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{
                          color: step.accent,
                          boxShadow: isActive
                            ? `0 0 35px ${step.accent}`
                            : "0 0 0 1px rgba(255,255,255,0.1)",
                        }}
                      >
                        0{i + 1}
                      </div>

                      <h4 className="text-sm font-semibold text-white">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-xs text-white/60">
                        {step.desc}
                      </p>
                    </div>
                  </EdgeGlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
