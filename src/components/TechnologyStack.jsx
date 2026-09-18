import React, { useRef } from "react";
import EdgeGlowCard from "./EdgeGlowCard";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTailwindcss,
  SiGo,
  SiFastapi,
  SiFlutter,
  SiDocker,
  SiOpenai,
} from "react-icons/si";
import { FaPlug } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

/* =========================
   TRUE 3D TILT + MAGNETIC
========================= */
const useInteractiveCard = ({
  maxTilt = 10,
  magnetStrength = 18,
} = {}) => {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const pullX = ((x - centerX) / centerX) * magnetStrength;
    const pullY = ((y - centerY) / centerY) * magnetStrength;

    el.style.transform = `
      perspective(1000px)
      translate3d(${pullX}px, ${pullY}px, 0)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = `
      perspective(1000px)
      translate3d(0, 0, 0)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return { ref, onMouseMove, onMouseLeave };
};

/* =========================
   COMPONENT
========================= */
const TechnologyStack = () => {
  const { t } = useLanguage();
  const defaultGlowPalette = {
    glowColor: "#FF00B7",
    secondaryGlowColor: "rgba(32,140,255,0.45)",
    topColor: "#FF00B7",
    leftColor: "#FF00B7",
    rightColor: "rgba(32,140,255,0.45)",
    bottomColor: "rgba(32,140,255,0.45)",
  };

  const technologies = [
    { icon: SiJavascript, label: "JavaScript", accent: "#F7DF1E" },
    { icon: SiTailwindcss, label: "Tailwind", accent: "#38BDF8" },
    { icon: SiGo, label: "Go", accent: "#00ADD8" },
    { icon: SiFastapi, label: "FastAPI", accent: "#009688" },
    { icon: SiFlutter, label: "Flutter", accent: "#02569B" },
    { icon: SiDocker, label: "Docker", accent: "#2496ED" },
    { icon: SiOpenai, label: "OpenAI", accent: "#37FF8B" },
    { icon: FaPlug, label: "Kaspi API", accent: "#FF2D2D" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-fuchsia-500/20 blur-[160px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-cyan-400/20 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            {t("technologyStack.title", "Technology Stack")}
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            {t(
              "technologyStack.subtitle",
              "A carefully selected, production-grade stack engineered for speed, scalability, and beautiful user experiences."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => {
            const interactive = useInteractiveCard({
              maxTilt: 10,
              magnetStrength: 16,
            });

            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <EdgeGlowCard
                  mode="static"
                  spotlight
                  {...defaultGlowPalette}
                  outerClassName="group rounded-[28px] p-[2px]"
                  innerClassName="rounded-[26px]"
                >
                  <div
                    ref={interactive.ref}
                    onMouseMove={interactive.onMouseMove}
                    onMouseLeave={interactive.onMouseLeave}
                    className="relative h-40 rounded-[24px] border border-white/10 flex flex-col items-center justify-center text-center overflow-hidden will-change-transform"
                    style={{
                      transformStyle: "preserve-3d",
                      background:
                        "rgba(8, 8, 14, 0.55)",
                    }}
                  >
                    {/* Glass sweep (background plane) */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      <div className="absolute top-0 left-[-150%] h-full w-[60%] bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-12 transition-all duration-700 group-hover:left-[150%]" />
                    </div>

                    {/* Hover aura (mid plane) */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                      style={{
                        transform: "translateZ(20px)",
                        background: `radial-gradient(120% 120% at 20% -10%, ${tech.accent}40 0%, transparent 60%)`,
                      }}
                    />

                    {/* ICON — FRONT PLANE */}
                    <div
                      className="relative z-10 mb-3"
                      style={{
                        transform:
                          "translateZ(55px) rotateX(-2deg) rotateY(2deg)",
                      }}
                    >
                      <Icon
                        size={56}
                        style={{
                          color: tech.accent,
                          filter:
                            "drop-shadow(0 14px 35px rgba(0,0,0,0.5))",
                        }}
                      />
                    </div>

                    {/* LABEL — MID PLANE */}
                    <span
                      className="relative z-10 text-sm font-medium text-white/90 tracking-wide"
                      style={{ transform: "translateZ(35px)" }}
                    >
                      {tech.label}
                    </span>

                    {/* Bottom glow — deep plane */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-1/2"
                      style={{
                        transform: "translateZ(15px)",
                        background: `linear-gradient(90deg, transparent, ${tech.accent}, transparent)`,
                      }}
                    />
                  </div>
                </EdgeGlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
