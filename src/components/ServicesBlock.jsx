import React, { useMemo, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Bot, Code2, ShieldCheck, ServerCog, Smartphone } from "lucide-react";
import EdgeGlowCard from "./EdgeGlowCard";
import { useLanguage } from "@/contexts/LanguageContext";

const ServicesBlock = () => {
  const { t } = useLanguage();
  const defaultGlowPalette = {
    glowColor: "#FF00B7",
    secondaryGlowColor: "rgba(32,140,255,0.45)",
    topColor: "#FF00B7",
    leftColor: "#FF00B7",
    rightColor: "rgba(32,140,255,0.45)",
    bottomColor: "rgba(32,140,255,0.45)",
  };

  const services = useMemo(
    () => [
      {
        icon: null,
        fallbackIcon: Bot,
        title: t("servicesBlock.services.aiAgents.title", "AI Agents"),
        description: t(
          "servicesBlock.services.aiAgents.description",
          "Custom conversational and autonomous agents for support, ops, and analytics."
        ),
        accent: "#FF00B7",
        tag: t("servicesBlock.services.aiAgents.tag", "Automation"),
      },
      {
        icon: null,
        fallbackIcon: Code2,
        title: t("servicesBlock.services.customSoftware.title", "Custom Software"),
        description: t(
          "servicesBlock.services.customSoftware.description",
          "End-to-end web and desktop apps tailored to your workflows."
        ),
        accent: "#00BFFF",
        tag: t("servicesBlock.services.customSoftware.tag", "Build"),
      },
      {
        icon: null,
        fallbackIcon: ShieldCheck,
        title: t("servicesBlock.services.cybersecurity.title", "Cybersecurity"),
        description: t(
          "servicesBlock.services.cybersecurity.description",
          "Audits, penetration testing, and continuous monitoring."
        ),
        accent: "#37FF8B",
        tag: t("servicesBlock.services.cybersecurity.tag", "Protect"),
      },
      {
        icon: null,
        fallbackIcon: ServerCog,
        title: t("servicesBlock.services.backend.title", "Backend / DevOps"),
        description: t(
          "servicesBlock.services.backend.description",
          "Scalable APIs, CI/CD pipelines, and cloud infrastructure."
        ),
        accent: "#3B82F6",
        tag: t("servicesBlock.services.backend.tag", "Scale"),
      },
      {
        icon: null,
        fallbackIcon: Smartphone,
        title: t("servicesBlock.services.mobile.title", "Mobile"),
        description: t(
          "servicesBlock.services.mobile.description",
          "Cross-platform apps with native performance and polished UX."
        ),
        accent: "#FF00B7",
        tag: t("servicesBlock.services.mobile.tag", "Ship"),
      },
    ],
    [t]
  );

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.09, delayChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden rounded-[38px] border border-white/10 glass-readable p-6 sm:p-10">
      {/* Animated Aurora + grid + noise */}
      <div className="pointer-events-none absolute inset-0">
        {/* aurora blobs */}
        <motion.div
          className="absolute -top-52 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full blur-3xl"
          initial={{ opacity: 0.22, scale: 0.98 }}
          animate={{ opacity: [0.18, 0.28, 0.2], scale: [0.98, 1.02, 0.99] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,0,183,0.60), transparent 60%), radial-gradient(circle at 70% 45%, rgba(32,140,255,0.52), transparent 55%), radial-gradient(circle at 40% 80%, rgba(55,255,139,0.30), transparent 55%)",
          }}
        />

        {/* soft spotlight */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 0%, rgba(255,255,255,0.12), transparent 62%)",
          }}
        />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage:
              "radial-gradient(70% 60% at 50% 25%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(70% 60% at 50% 25%, black 55%, transparent 100%)",
          }}
        />

        {/* noise layer */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
      </div>

      {/* Header */}
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          {t("servicesBlock.badge", "What we offer")}
        </div>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          <span
            className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
            style={{
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.40))",
            }}
          >
            {t("servicesBlock.title", "Our Services")}
          </span>
        </h2>

        {/* animated underline */}
        <div className="mx-auto mt-4 h-[2px] w-44 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full w-1/2 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,0,183,0.0), rgba(255,0,183,0.9), rgba(32,140,255,0.9), rgba(55,255,139,0.0))",
            }}
            initial={{ x: "-40%" }}
            animate={{ x: ["-40%", "90%", "-40%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
          {t(
            "servicesBlock.description",
            "Premium UI, strong engineering, and fast delivery — everything you need to launch a product that looks and performs like a top-tier brand."
          )}
        </p>
      </div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            defaultGlowPalette={defaultGlowPalette}
            itemVariant={item}
            t={t}
          />
        ))}
      </motion.div>
    </section>
  );
};

function ServiceCard({ service, defaultGlowPalette, itemVariant, t }) {
  // 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-40, 40], [8, -8]);
  const rotateY = useTransform(mx, [-40, 40], [-8, 8]);
  const [pos, setPos] = useState({ x: 18, y: 18 });

  return (
    <motion.div
      variants={itemVariant}
      className="h-full"
      style={{ perspective: 900 }}
    >
      <motion.div
        className="h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          mx.set(x / 4);
          my.set(y / 4);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        <EdgeGlowCard
          mode="static"
          spotlight
          {...defaultGlowPalette}
          outerClassName="group relative z-10 h-full rounded-[30px] p-[2px]"
          innerClassName="h-full rounded-[26px]"
        >
          <div
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
            }}
            className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 p-6"
            style={{
              boxShadow: "0 26px 70px rgba(0,0,0,0.48)",
              background:
                "rgba(8, 8, 14, 0.55)",
              transform: "translateZ(14px)",
            }}
          >
            {/* hover spotlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, ${service.accent}33 0%, transparent 62%)`,
              }}
            />

            {/* moving sheen */}
            <div
              className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.10) 48%, transparent 60%)",
                transform: "rotate(8deg)",
                animation: "sheen 1.3s ease-in-out infinite",
              }}
            />
            <style>{`
              @keyframes sheen {
                0% { transform: translateX(-12%) rotate(8deg); }
                50% { transform: translateX(12%) rotate(8deg); }
                100% { transform: translateX(-12%) rotate(8deg); }
              }
            `}</style>

            {/* Tag row */}
            <div className="relative mb-5 flex items-center justify-between">
              <span
                className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide"
                style={{
                  borderColor: `${service.accent}45`,
                  color: `${service.accent}`,
                  background: `${service.accent}12`,
                  boxShadow: `0 10px 26px ${service.accent}12`,
                }}
              >
                {service.tag}
              </span>
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background: service.accent,
                  boxShadow: `0 0 26px ${service.accent}90`,
                }}
              />
            </div>

            {/* Icon */}
            <div className="relative mb-4 flex h-12 w-12 items-center justify-center">
              {/* neon ring */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl blur-[10px] opacity-50"
                style={{ background: service.accent }}
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <IconWithFallback
                  src={service.icon}
                  alt={service.title}
                  accent={service.accent}
                  FallbackIcon={service.fallbackIcon}
                />
              </div>
            </div>

            {/* Content */}
            <h3 className="relative text-lg font-semibold tracking-tight text-white">
              {service.title}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-white/60">
              {service.description}
            </p>

            {/* CTA */}
            <div className="relative mt-6">
              <a
                href="#contact-form"
                className="group/cta inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
                style={{ boxShadow: `0 14px 36px ${service.accent}14` }}
                aria-label={t("servicesBlock.learnMoreAria", "Learn more about this service")}
              >
                <span className="relative">
                  {t("servicesBlock.learnMore", "Learn more")}
                  <span
                    className="pointer-events-none absolute -bottom-[6px] left-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover/cta:w-full"
                    style={{ background: service.accent }}
                  />
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover/cta:scale-125"
                  style={{ background: service.accent }}
                />
              </a>
            </div>

            {/* bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
          </div>
        </EdgeGlowCard>
      </motion.div>
    </motion.div>
  );
}

function IconWithFallback({ src, alt, accent, FallbackIcon }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <FallbackIcon
        size={22}
        style={{
          color: accent,
          filter: `drop-shadow(0 0 10px ${accent}70)`,
        }}
        aria-label={`${alt} icon`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-7 w-7"
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ filter: `drop-shadow(0 0 12px ${accent}40)` }}
    />
  );
}

export default ServicesBlock;
