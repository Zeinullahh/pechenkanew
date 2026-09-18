import React, { useMemo, useState } from "react";
import EdgeGlowCard from "./EdgeGlowCard";
import GlassSurface from "./GlassSurface";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatKzt } from "@/lib/kzt";

const PricingSection = () => {
  const { t } = useLanguage();
  const [projectCost, setProjectCost] = useState(25000);
  const [currency] = useState("USD");

  const formatCurrencyValue = (value) => {
    return `$${value.toLocaleString()} (${formatKzt(value)})`;
  };

  const getSliderMax = () => {
    return 100000;
  };

  const getSliderStep = () => {
    return 1000;
  };

  const plans = useMemo(
    () => [
      {
        name: t("pricingCustom.plans.basic.name", "Basic"),
        percent: 0.15,
        badge: null,
        accent: "#FF00B7",
        features: [
          { label: t("pricingCustom.plans.basic.features.fix", "Critical Bug Fixes (48h SLA)"), enabled: true },
          { label: t("pricingCustom.plans.basic.features.updates", "Monthly Updates"), enabled: false },
          { label: t("pricingCustom.plans.basic.features.audit", "Quarterly Security Audits"), enabled: true },
          { label: t("pricingCustom.plans.basic.features.manager", "Dedicated Manager"), enabled: false },
        ],
      },
      {
        name: t("pricingCustom.plans.pro.name", "Pro"),
        percent: 0.2,
        badge: t("pricingCustom.plans.pro.badge", "Most Popular"),
        accent: "#00BFFF",
        features: [
          { label: t("pricingCustom.plans.pro.features.fix", "Critical Bug Fixes (24h SLA)"), enabled: true },
          { label: t("pricingCustom.plans.pro.features.updates", "10h Monthly Updates"), enabled: true },
          { label: t("pricingCustom.plans.pro.features.audit", "Monthly Security Audits"), enabled: true },
          { label: t("pricingCustom.plans.pro.features.manager", "Dedicated Manager"), enabled: false },
        ],
      },
      {
        name: t("pricingCustom.plans.enterprise.name", "Enterprise"),
        percent: 0.25,
        badge: t("pricingCustom.plans.enterprise.badge", "Best Value"),
        accent: "#37FF8B",
        features: [
          { label: t("pricingCustom.plans.enterprise.features.fix", "Critical Bug Fixes (4h SLA)"), enabled: true },
          { label: t("pricingCustom.plans.enterprise.features.updates", "Unlimited Updates + Roadmap"), enabled: true },
          { label: t("pricingCustom.plans.enterprise.features.audit", "Weekly Audits + Backups"), enabled: true },
          { label: t("pricingCustom.plans.enterprise.features.manager", "Dedicated Manager"), enabled: true },
        ],
      },
    ],
    [t]
  );

  return (
    <section className="pricing-glass-stage relative px-4 sm:px-6 lg:px-10 py-14 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          {t("pricingCustom.title", "Transparent Pricing")}
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
          {t(
            "pricing.subtitle",
            "Mobile-first plans built to scale with your product."
          )}
        </p>
      </div>

      {/* Currency Selector (Hidden) */}
      {/* <div className="flex justify-center">
        <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
      </div> */}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <EdgeGlowCard
            key={i}
            mode="static"
            spotlight
            outerClassName="rounded-[28px] p-[2px]"
            innerClassName="rounded-[26px]"
          >
            <GlassSurface
              width="100%"
              height="100%"
              borderRadius={22}
              backgroundOpacity={0.1}
              saturation={1.7}
              blur={24}
              displace={0.5}
              distortionScale={-130}
              greenOffset={8}
              blueOffset={16}
              brightness={56}
              opacity={0.9}
              mixBlendMode="screen"
              className="pricing-glass-panel pricing-glass-card"
            >
              <div className="relative h-full p-6 sm:p-8 space-y-6">
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3 left-6 px-3 py-1 text-xs font-semibold rounded-full"
                  style={{
                    background: plan.accent,
                    color: "#000",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-white/50">
                  {t(
                    "pricing.percentMaintenance",
                    "{percent}% yearly maintenance",
                    { percent: (plan.percent * 100).toFixed(0) }
                  )}
                </p>
              </div>

              {/* Price */}
              <div>
                <div
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: plan.accent }}
                >
                  {formatCurrencyValue(projectCost * plan.percent)}
                </div>
                <p className="text-xs sm:text-sm text-white/50">
                  {t("pricingCustom.perYear", "per year (est.)")}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 text-sm">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className={`flex gap-2 ${f.enabled
                        ? "text-white/80"
                        : "text-white/30 line-through"
                      }`}
                  >
                    <span
                      className={`${f.enabled ? "text-green-400" : "text-white/30"
                        }`}
                    >
                      ✓
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
              </div>
            </GlassSurface>
          </EdgeGlowCard>
        ))}
      </div>

      {/* Calculator */}
      <EdgeGlowCard
        mode="static"
        spotlight
        outerClassName="rounded-[30px] p-[2px]"
        innerClassName="rounded-[28px]"
      >
        <div
          className="rounded-[22px] border border-white/10 p-6 sm:p-10 space-y-8"
          style={{
            background:
              "linear-gradient(160deg, rgba(3,6,16,0.98), rgba(1,2,6,0.98))",
          }}
        >
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-semibold text-white">
              {t("pricingCustom.calculator.title", "Project Cost Calculator")}
            </h3>
            <p className="text-white/60 text-sm">
              {t(
                "pricing.calculator.subtitle",
                "Slide to see your yearly maintenance"
              )}
            </p>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={1000}
            max={100000}
            step={1000}
            value={projectCost}
            onChange={(e) => setProjectCost(Number(e.target.value))}
            className="w-full accent-pink-500"
          />

          {/* Sticky-like value */}
          <div className="text-center text-lg font-medium text-white">
            {t("pricingCustom.calculator.projectCost", "Project Cost:")}{" "}
            <span className="text-pink-400">
              {formatCurrencyValue(projectCost)}
            </span>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 p-4 text-center"
              >
                <div className="text-white/60 text-sm">{plan.name}</div>
                <div
                  className="text-xl font-semibold"
                  style={{ color: plan.accent }}
                >
                  {formatCurrencyValue(projectCost * plan.percent)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </EdgeGlowCard>
    </section>
  );
};

export default PricingSection;
