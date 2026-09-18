"use client";
import React from "react";
import { motion } from "framer-motion";
import EdgeGlowCard from "./EdgeGlowCard";
import WorldMapKazakhstan from "./WorldMapKazakhstan";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = ({ onOpenModal }) => {
  const { t } = useLanguage();
  // Match WhyChooseUs color scheme
  const defaultGlowPalette = {
    glowColor: "#FF00B7",
    secondaryGlowColor: "rgba(32,140,255,0.45)",
    topColor: "#FF00B7",
    leftColor: "#FF00B7",
    rightColor: "rgba(32,140,255,0.45)",
    bottomColor: "rgba(32,140,255,0.45)",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      className="relative overflow-visible pt-4 sm:pt-8 lg:pt-12 pb-20 sm:pb-28 lg:pb-36 font-sans"
      style={{ 
        backgroundColor: '#01091C',
        marginTop: 0,
        borderTop: 'none'
      }}
      aria-labelledby="hero-title"
    >
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[-200px] h-[700px] w-[1200px] -translate-x-1/2 rounded-full blur-3xl"
          initial={{ opacity: 0.1, scale: 0.95 }}
          animate={{ 
            opacity: [0.08, 0.15, 0.1], 
            scale: [0.95, 1.02, 0.98] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 25% 25%, rgba(255,0,183,0.4), transparent 60%), radial-gradient(circle at 75% 50%, rgba(32,140,255,0.35), transparent 55%)",
          }}
        />
      </div>

      {/* World Map Kazakhstan - Enhanced Background */}
      <WorldMapKazakhstan />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-16 lg:gap-20 -mt-16 sm:-mt-12 lg:-mt-8"
        >
          {/* Text Content */}
          <motion.div variants={item} className="text-left space-y-5 w-full">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 shadow-[0_12px_36px_rgba(0,0,0,0.25)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF00B7] animate-pulse" />
              {t("heroSection.badge", "Production-ready AI & Software")}
            </motion.div>

            <h1
              id="hero-title"
              className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] sm:whitespace-nowrap"
            >
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {t("heroSection.title", "Custom AI & Software Development")}
              </span>
            </h1>

            <motion.p
              variants={item}
              className="text-white/80 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl"
            >
              {t("heroSection.description", "We build production-ready AI agents and custom software.", {
                country: t("heroSection.country", "Kazakhstan"),
                market: t("heroSection.market", "global market")
              })}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
            >
              <button
                type="button"
                onClick={onOpenModal}
                className="group/btn relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(255,0,183,0.4)]"
                style={{
                  background:
                    "linear-gradient(135deg, #FF00B7 0%, rgba(255,0,183,0.85) 100%)",
                  boxShadow: "0 16px 42px rgba(255,0,183,0.3)",
                }}
                aria-label="Start a project"
              >
                {/* Shine effect */}
                <span
                  className="pointer-events-none absolute -inset-y-6 left-[-60%] w-[55%] rotate-12 opacity-0 blur-xl transition-opacity duration-300 group-hover/btn:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
                <span className="relative">{t("heroSection.startProject", "Start a Project")}</span>
                <span className="relative">→</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Live Demo Card - Moved to Bottom */}
          <motion.div variants={item} className="relative w-full max-w-4xl mx-auto mt-8">
            <div className="mb-4 flex items-center justify-between">
                <motion.div
                inbitial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white text-xl sm:text-2xl font-semibold"
              >
                {t("heroSection.liveDemo", "Live Demo — AI Agent")}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full animate-pulse"
                  style={{
                    background: "#37FF8B",
                    boxShadow: "0 0 12px rgba(55,255,139,0.8)",
                  }}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-white/90">{t("heroSection.live", "Live")}</span>
              </motion.div>
            </div>

            <EdgeGlowCard
              mode="static"
              spotlight
              {...defaultGlowPalette}
              outerClassName="group relative z-10 rounded-[32px] p-[2px]"
              innerClassName="rounded-[30px]"
            >
              <div
                className="relative h-full min-h-[420px] rounded-[26px] border border-white/12 overflow-hidden transition-transform duration-200"
                style={{
                  background:
                    "rgba(8, 8, 14, 0.55)",
                  boxShadow: "0 30px 80px rgba(5,12,32,0.65)",
                }}
              >
                {/* Accent scan */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{
                    background: `radial-gradient(120% 120% at 20% -10%, rgba(255,0,183,0.4) 0%, transparent 60%)`,
                  }}
                />

                {/* AI Agent Interface */}
                <div className="relative h-full p-5 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className="h-10 w-10 rounded-xl border border-white/20 flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, rgba(255,0,183,0.2), rgba(32,140,255,0.15))",
                          }}
                        >
                          <motion.div
                            className="text-2xl"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          >
                            🤖
                          </motion.div>
                        </div>
                        <motion.span
                          className="absolute -top-1 -right-1 h-3 w-3 rounded-full"
                          style={{ background: "#37FF8B" }}
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{t("heroSection.aiAgent", "AI Agent v2.1")}</div>
                        <div className="text-white/50 text-xs">{t("heroSection.processing", "Processing requests...")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#37FF8B] animate-pulse" />
                      <span className="text-xs text-white/60">{t("heroSection.active", "Active")}</span>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="flex-1 space-y-3 mb-4 overflow-hidden">
                    {/* User Message */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="flex justify-end"
                    >
                      <div
                        className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm text-white"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,0,183,0.25), rgba(255,0,183,0.15))",
                          border: "1px solid rgba(255,0,183,0.3)",
                        }}
                      >
                        {t("heroSection.userMessage", "Analyze customer data trends")}
                      </div>
                    </motion.div>

                    {/* AI Response - Typing Animation */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      className="flex justify-start"
                    >
                      <div
                        className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm text-white/90"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span>{t("heroSection.aiResponse", "Analyzing")}</span>
                          <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            ...
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Processing Indicators */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      className="space-y-2 mt-4"
                    >
                        {[
                        { label: t("heroSection.tasks.dataCollection", "Data Collection"), progress: 100, color: "#FF00B7" },
                        { label: t("heroSection.tasks.aiAnalysis", "AI Analysis"), progress: 85, color: "rgba(32,140,255,0.8)" },
                        { label: t("heroSection.tasks.reportGeneration", "Report Generation"), progress: 60, color: "#37FF8B" },
                      ].map((task, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/70">{task.label}</span>
                            <span className="text-white/50">{task.progress}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: task.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${task.progress}%` }}
                              transition={{ duration: 2, delay: 1.8 + idx * 0.3, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2 }}
                    className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10"
                  >
                    {[
                      { label: t("heroSection.stats.tasks", "Tasks"), value: "247", color: "#FF00B7" },
                      { label: t("heroSection.stats.success", "Success"), value: "98%", color: "#37FF8B" },
                      { label: t("heroSection.stats.speed", "Speed"), value: "2.3s", color: "rgba(32,140,255,0.8)" },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="text-center p-2 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <div
                          className="text-lg font-bold mb-0.5"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/50">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => {
                      // Use deterministic values based on index instead of random
                      const sizes = [3, 4.5, 2.5, 3.8, 2.8, 4.2];
                      const xPositions = [10, 30, 60, 80, 25, 75];
                      const yPositions = [15, 45, 25, 70, 85, 55];
                      const durations = [3, 4, 3.5, 4.5, 3.2, 4.8];
                      const delays = [0, 0.5, 1, 1.5, 2, 0.3];
                      
                      return (
                        <motion.div
                          key={i}
                          className="absolute rounded-full"
                          style={{
                            width: sizes[i],
                            height: sizes[i],
                            background: i % 2 === 0 ? "#FF00B7" : "rgba(32,140,255,0.6)",
                            left: `${xPositions[i]}%`,
                            top: `${yPositions[i]}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: durations[i],
                            repeat: Infinity,
                            delay: delays[i],
                          }}
                        />
                      );
                    })}

                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>
                </div>

                {/* Bottom accent glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(32,140,255,0.15) 0%, transparent 100%)",
                  }}
                />
              </div>
            </EdgeGlowCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
