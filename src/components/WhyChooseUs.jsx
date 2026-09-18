import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  BrainCircuit,
  Globe2,
  Building2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import EdgeGlowCard from "./EdgeGlowCard";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyChooseUs = () => {
  const { t } = useLanguage();
  const defaultGlowPalette = {
    glowColor: "#FF00B7",
    secondaryGlowColor: "rgba(32,140,255,0.45)",
    topColor: "#FF00B7",
    leftColor: "#FF00B7",
    rightColor: "rgba(32,140,255,0.45)",
    bottomColor: "rgba(32,140,255,0.45)",
  };

  const features = useMemo(
    () => [
      {
        fallbackIcon: Rocket,
        title: t(
          "whyChooseUs.features.fast.title",
          "Fast Delivery with Enterprise Quality"
        ),
        description: t(
          "whyChooseUs.features.fast.description",
          "Rapid, iterative delivery cycles that meet enterprise-grade reliability and compliance."
        ),
        accent: "#FF00B7",
        pill: t("whyChooseUs.features.fast.pill", "Speed + Quality"),
      },
      {
        fallbackIcon: BrainCircuit,
        title: t(
          "whyChooseUs.features.ai.title",
          "AI-first Product Engineering"
        ),
        description: t(
          "whyChooseUs.features.ai.description",
          "From prototypes to production AI agents — we design, train, and deploy models that solve real business problems."
        ),
        accent: "#00BFFF",
        pill: t("whyChooseUs.features.ai.pill", "AI Engineering"),
      },
      {
        fallbackIcon: Globe2,
        title: t(
          "whyChooseUs.features.local.title",
          "Local Expertise, Global Reach"
        ),
        description: t(
          "whyChooseUs.features.local.description",
          "Deep knowledge of Kazakhstan's market and regulations combined with international best practices."
        ),
        accent: "#37FF8B",
        pill: t("whyChooseUs.features.local.pill", "KZ + Global"),
      },
    ],
    [t]
  );

  const logos = useMemo(
    () => [
      {
        src: "/nak-logo.png",
        alt: t("whyChooseUs.logos.nak", "Nur Astana Kurylys"),
        fallbackIcon: Sparkles,
      },
    ],
    [t]
  );

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55 } },
  };

  return (
    <section className="relative overflow-visible pb-24">
      {/* Ambient background (aurora + grid + noise) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[-280px] h-[620px] w-[1050px] -translate-x-1/2 rounded-full blur-3xl"
          initial={{ opacity: 0.18, scale: 0.98 }}
          animate={{ opacity: [0.16, 0.26, 0.18], scale: [0.98, 1.03, 0.99] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,0,183,0.60), transparent 60%), radial-gradient(circle at 70% 45%, rgba(32,140,255,0.50), transparent 55%), radial-gradient(circle at 40% 85%, rgba(55,255,139,0.28), transparent 55%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(70% 55% at 50% 18%, black 50%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(70% 55% at 50% 18%, black 50%, transparent 100%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/55" />
      </div>

      {/* Header */}
      <div className="relative space-y-3 pt-8 text-center sm:pt-12">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          {t("whyChooseUs.badge", "Results-driven engineering")}
        </div>

        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="relative inline-block">
            {t("whyChooseUs.title", "Why Choose Us")}
            {/* animated underline */}
            <span className="absolute left-1/2 top-[105%] h-[2px] w-[70%] -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full w-1/2"
                initial={{ x: "-55%" }}
                animate={{ x: ["-55%", "105%", "-55%"] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,0,183,0), rgba(255,0,183,0.95), rgba(32,140,255,0.95), rgba(55,255,139,0))",
                }}
              />
            </span>
          </span>
        </h2>

        <p className="mx-auto max-w-2xl text-base text-white/70 sm:text-xl">
          {t("whyChooseUs.subtitle", "Trusted by teams from")}{" "}
          <span className="text-white">{t("whyChooseUs.subtitleHighlight", "billion-dollar organizations")}</span>{" "}
          {t("whyChooseUs.subtitleTail", "— and shipped with startup speed.")}
        </p>
      </div>

      {/* Trust logos */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-4 sm:gap-6"
      >
        {logos.map((l, i) => (
          <LogoChip key={i} {...l} />
        ))}
      </motion.div>

      {/* Feature cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-30 mt-10 grid gap-6 md:grid-cols-3"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            feature={feature}
            defaultGlowPalette={defaultGlowPalette}
            itemVariant={item}
            t={t}
          />
        ))}
      </motion.div>
    </section>
  );
};

function FeatureCard({ feature, defaultGlowPalette, itemVariant, t }) {
  const [pos, setPos] = useState({ x: 18, y: 18 });

  return (
    <motion.div variants={itemVariant} className="h-full">
      <EdgeGlowCard
        mode="static"
        spotlight
        {...defaultGlowPalette}
        outerClassName="group relative z-20 h-full rounded-[34px] p-[2px]"
        innerClassName="h-full rounded-[30px]"
      >
        <div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
          }}
          className="relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/12 p-8"
          style={{
            boxShadow: "0 26px 70px rgba(0,0,0,0.48)",
              background:
                "rgba(8, 8, 14, 0.55)",
            }}
          >
            {/* Cursor spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, ${feature.accent}33 0%, transparent 62%)`,
            }}
          />

          {/* Decorative corner glow */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-2xl opacity-25"
            style={{ background: feature.accent }}
          />

          {/* Top row: pill + micro dot */}
          <div className="relative mb-6 flex items-center justify-between">
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide"
              style={{
                borderColor: `${feature.accent}40`,
                color: `${feature.accent}`,
                background: `${feature.accent}12`,
                boxShadow: `0 12px 30px ${feature.accent}12`,
              }}
            >
              {feature.pill}
            </span>

            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: feature.accent,
                boxShadow: `0 0 28px ${feature.accent}95`,
              }}
            />
          </div>

          {/* Icon: neon ring + image->svg fallback */}
          <div className="relative mb-5 flex items-center gap-4">
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl blur-[12px] opacity-55"
                style={{ background: feature.accent }}
              />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <IconWithFallback
                  src={feature.icon}
                  alt={feature.title}
                  accent={feature.accent}
                  FallbackIcon={feature.fallbackIcon}
                />
              </div>
            </div>

            {/* Tiny gradient line */}
            <div className="h-[1px] flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full w-2/3"
                style={{
                  background: `linear-gradient(90deg, ${feature.accent}00, ${feature.accent}aa, ${feature.accent}00)`,
                }}
              />
            </div>
          </div>

          <div className="relative flex flex-1 flex-col">
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {feature.description}
            </p>

            {/* CTA: “shiny” button */}
            <div className="mt-7">
              <a
                href="#services"
                className="group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
                style={{ boxShadow: `0 16px 42px ${feature.accent}14` }}
              >
                {/* sheen */}
                <span
                  className="pointer-events-none absolute -inset-y-6 left-[-60%] w-[55%] rotate-12 opacity-0 blur-xl transition-opacity duration-300 group-hover/cta:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                  }}
                />
                <span className="relative">{t("whyChooseUs.learnMore", "Learn more")}</span>
                <span
                  className="relative h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover/cta:scale-125"
                  style={{ background: feature.accent }}
                />
              </a>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
      </EdgeGlowCard>
    </motion.div>
  );
}

function IconWithFallback({ src, alt, accent, FallbackIcon }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <FallbackIcon
        size={24}
        style={{
          color: accent,
          filter: `drop-shadow(0 0 12px ${accent}70)`,
        }}
        aria-label={`${alt} icon`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-8 w-8"
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ filter: `drop-shadow(0 0 12px ${accent}40)` }}
    />
  );
}

function LogoChip({ src, alt, fallbackIcon: FallbackIcon }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_16px_46px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10">
      {/* shimmer border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,0,183,0.18), rgba(32,140,255,0.14), rgba(55,255,139,0.14))",
          maskImage:
            "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          WebkitMaskImage:
            "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          padding: 1,
        }}
      />

      {!failed ? (
        <img
          src={src}
          alt={alt}
          className="h-8 w-auto opacity-90"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-black/30">
          <FallbackIcon size={18} className="text-white/70" />
        </div>
      )}

      <span className="text-xs font-medium text-white/70">{alt}</span>
    </div>
  );
}

export default WhyChooseUs;
