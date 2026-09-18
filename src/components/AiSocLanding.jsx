"use client";

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header.jsx';
import Hero from '@/components/Hero.jsx';
import Pricing from '@/components/Pricing.jsx';
import { StickyScrollSolution } from '@/components/StickyScrollSolution.jsx';
import Insights from '@/components/Insights.jsx';
import AiSocGetModal from '@/components/AiSocGetModal.jsx';
import { FloatingText } from '@/components/FloatingText.jsx';
import Spotlights from '@/components/Spotlights.jsx';
import BackToTopButton from '@/components/BackToTopButton';
import FaqSection from '@/components/FaqSection.jsx';
import { useLanguage } from '@/contexts/LanguageContext';
import { solutionContent } from '@/lib/solutionContent';
import EdgeGlowCard from '@/components/EdgeGlowCard.jsx';
import { Rocket, BrainCircuit, Radar, ShieldCheck } from 'lucide-react';
import { DEFAULT_CURRENCY } from '@/lib/currency';

const AiSocLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [isComparisonVisible, setIsComparisonVisible] = useState(false);
  const comparisonRef = useRef(null);
  const { t } = useLanguage();
  const valueFeatures = [
    {
      title: t('aiSocValueSection.features.deploy.title', 'Deploy in minutes'),
      description: t(
        'aiSocValueSection.features.deploy.description',
        'Set up web and email protection in under 4 minutes without complex configuration.'
      ),
      icon: <Rocket className="w-11 h-11 text-purple-200 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]" />,
      glow: 'from-purple-600/60 via-fuchsia-500/25 to-blue-500/40',
      glowColor: 'rgba(168,85,247,0.8)',
    },
    {
      title: t('aiSocValueSection.features.ai.title', 'AI-powered analysis'),
      description: t(
        'aiSocValueSection.features.ai.description',
        'Advanced AI continuously analyzes traffic, emails, and threats in real time.'
      ),
      icon: <BrainCircuit className="w-11 h-11 text-cyan-200 drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]" />,
      glow: 'from-cyan-500/60 via-blue-500/30 to-purple-600/40',
      glowColor: 'rgba(34,211,238,0.8)',
    },
    {
      title: t('aiSocValueSection.features.visualization.title', 'Advanced visualization'),
      description: t(
        'aiSocValueSection.features.visualization.description',
        'Monitor web traffic and email flows through an advanced visual interface.'
      ),
      icon: <Radar className="w-11 h-11 text-indigo-200 drop-shadow-[0_0_18px_rgba(99,102,241,0.32)]" />,
      glow: 'from-indigo-500/60 via-purple-500/30 to-sky-500/40',
      glowColor: 'rgba(99,102,241,0.8)',
    },
    {
      title: t('aiSocValueSection.features.affordable.title', 'Affordable security'),
      description: t(
        'aiSocValueSection.features.affordable.description',
        'Enterprise-level protection without the cost of traditional cybersecurity systems.'
      ),
      icon: <ShieldCheck className="w-11 h-11 text-blue-200 drop-shadow-[0_0_18px_rgba(59,130,246,0.32)]" />,
      glow: 'from-blue-500/60 via-purple-500/30 to-cyan-500/40',
      glowColor: 'rgba(59,130,246,0.8)',
    },
  ];

  const comparisonTables = [
    {
      title: t('aiSocComparison.web.title', 'AI-CSD Web vs Traditional WAF Solutions'),
      columns: [
        t('aiSocComparison.common.features', 'Features'),
        t('aiSocComparison.web.columns.aiSoc', 'AI-CSD Web (pay-as-you-go)'),
        t('aiSocComparison.web.columns.cloudflare', 'Cloudflare WAF + Anti-DDoS ($20/mo)'),
        t('aiSocComparison.web.columns.aws', 'AWS WAF (pay-as-you-go)'),
      ],
      rows: [
        {
          feature: t('aiSocComparison.web.rows.complexWaf.feature', 'WAF with detection of complex attacks'),
          values: [
            { type: 'icon', value: true },
            { type: 'icon', value: false },
            { type: 'icon', value: true },
          ],
        },
        {
          feature: t('aiSocComparison.web.rows.ddos.feature', 'Protection against DDoS attacks'),
          values: [
            { type: 'icon', value: true },
            { type: 'text', value: t('aiSocComparison.web.rows.ddos.cloudflare', 'Weak at this pricing plan'), tone: 'neutral' },
            { type: 'icon', value: false },
          ],
        },
        {
          feature: t('aiSocComparison.web.rows.proactive.feature', 'Proactive 24/7 protection'),
          values: [
            { type: 'icon', value: true },
            { type: 'icon', value: false },
            { type: 'icon', value: false },
          ],
        },
        {
          feature: t(
            'aiSocComparison.web.rows.monitoring.feature',
            'Monitor live users, RPS, and bandwidth by country — with full historical tracking'
          ),
          values: [
            { type: 'icon', value: true },
            { type: 'icon', value: false },
            { type: 'icon', value: false },
          ],
        },
        {
          feature: t('aiSocComparison.web.rows.countryBlocking.feature', 'Country blocking'),
          values: [
            { type: 'icon', value: true },
            { type: 'text', value: t('aiSocComparison.web.rows.countryBlocking.cloudflare', 'Requires Cybersec knowledge'), tone: 'neutral' },
            { type: 'text', value: t('aiSocComparison.web.rows.countryBlocking.aws', 'Requires Cybersec knowledge'), tone: 'neutral' },
          ],
        },
        {
          feature: t('aiSocComparison.web.rows.setup.feature', 'Setup time'),
          values: [
            { type: 'text', value: t('aiSocComparison.web.rows.setup.aiSoc', '2 mins (no cybersec knowledge needed)'), tone: 'good' },
            { type: 'text', value: t('aiSocComparison.web.rows.setup.cloudflare', '2 mins (no cybersec knowledge needed)'), tone: 'good' },
            { type: 'text', value: t('aiSocComparison.web.rows.setup.aws', '1 day (cybersec specialist needed)'), tone: 'bad' },
          ],
        },
      ],
    },
    {
      title: t('aiSocComparison.email.title', 'AI-CSD Email vs Traditional Email Security'),
      columns: [
        t('aiSocComparison.common.features', 'Features'),
        t('aiSocComparison.email.columns.aiSoc', 'AI-CSD Email'),
        t('aiSocComparison.email.columns.outlook', 'Outlook/Gmail'),
        t('aiSocComparison.email.columns.kaspersky', 'Kaspersky (connected to an email provider)'),
      ],
      rows: [
        {
          feature: t('aiSocComparison.email.rows.viewAll.feature', 'View on all emails across the domain'),
          values: [
            { type: 'icon', value: true },
            { type: 'icon', value: false },
            { type: 'icon', value: true },
          ],
        },
        {
          feature: t('aiSocComparison.email.rows.delete.feature', 'Ability to delete emails'),
          values: [
            { type: 'icon', value: true },
            { type: 'icon', value: false },
            { type: 'icon', value: false },
          ],
        },
        {
          feature: t('aiSocComparison.email.rows.activeProtection.feature', 'Active Protection against all types of email attacks'),
          values: [
            { type: 'icon', value: true },
            { type: 'icon', value: false },
            { type: 'icon', value: false },
          ],
        },
        {
          feature: t('aiSocComparison.email.rows.aiManual.feature', 'AI that manually checks the emails'),
          values: [
            { type: 'icon', value: true },
            { type: 'icon', value: false },
            { type: 'icon', value: false },
          ],
        },
        {
          feature: t('aiSocComparison.email.rows.setup.feature', 'Secure setup completion time'),
          values: [
            { type: 'text', value: t('aiSocComparison.email.rows.setup.aiSoc', '2 mins No cybersec. knowledge needed'), tone: 'good' },
            { type: 'text', value: t('aiSocComparison.email.rows.setup.outlook', 'No-full security'), tone: 'bad' },
            {
              type: 'text',
              value: t('aiSocComparison.email.rows.setup.kaspersky', '1-3 days (connecting to an email provider, can only be done by a cybersec. specialist)'),
              tone: 'bad',
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    // Preload solution section imagery so assets are cached before scrolling
    solutionContent.forEach(({ imagePath }) => {
      const img = new window.Image();
      img.src = imagePath;
    });
  }, []);

  useEffect(() => {
    if (!comparisonRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsComparisonVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(comparisonRef.current);

    return () => observer.disconnect();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center p-1 pt-8 md:pt-16">
        <Spotlights />
        <div className="w-full max-w-7xl mx-auto">
          <Header onOpenModal={openModal} />
          <Hero onOpenModal={openModal} />
          <Pricing
            currency={currency}
            onCurrencyChange={setCurrency}
            onOpenModal={openModal}
          />
        </div>
        <div className="w-full max-w-7xl mx-auto">
          <Insights />
        </div>
        <div className="w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {t('aiSocValueSection.title', 'Why AI-CSD')}
            </h2>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mt-4">
              {t(
                'aiSocValueSection.subtitle',
                'AI-CSD makes enterprise-level cybersecurity accessible to any company. Deploy protection in minutes and manage web and email security from one unified platform.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {valueFeatures.map((feature) => (
              <div key={feature.title} className="relative group flex">
                <EdgeGlowCard
                  mode="follow"
                  outerClassName="w-full rounded-[26px] p-[1.5px]"
                  innerClassName="relative flex h-full flex-col gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-black p-8 shadow-none"
                  glowColor={feature.glowColor}
                  secondaryGlowColor={feature.glowColor}
                  glass={false}
                >
                  <div className="flex flex-col gap-4 h-full">
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/10 flex items-center justify-center mx-auto shadow-[0_0_35px_-12px_rgba(255,255,255,0.3)] shrink-0">
                      {feature.icon}
                    </div>
                    <div className="space-y-3 text-center flex flex-col flex-grow">
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed flex-grow">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </EdgeGlowCard>
              </div>
            ))}
          </div>
        </div>
        <section className="w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
          <div
            ref={comparisonRef}
            className={`relative overflow-hidden rounded-[32px] border border-emerald-400/15 glass-readable px-5 py-10 sm:px-10 shadow-[0_0_40px_rgba(16,185,129,0.12)] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${isComparisonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-[120px]" />
            <div className="relative z-10">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {t('aiSocComparison.sectionTitle', 'Competitive Advantages')}
                </h2>
              </div>
              <div className="mt-8 space-y-10">
                {comparisonTables.map((table) => (
                  <div key={table.title} className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white text-center">
                      {table.title}
                    </h3>
                    <div className="mx-auto w-[90vw] max-w-none rounded-3xl bg-slate-950/70 backdrop-blur-xl shadow-[0_0_25px_rgba(80,150,255,0.2)] overflow-hidden">
                      <div className="overflow-hidden">
                        <div>
                          <div className="grid grid-cols-4 text-[11px] sm:text-sm md:text-[15px] font-semibold text-slate-200">
                            {table.columns.map((column, columnIndex) => (
                              <div
                                key={column}
                                className={`px-3 py-3 sm:px-5 border-b text-center ${columnIndex === 0 ? 'text-left' : ''
                                  } ${columnIndex === 1
                                    ? 'bg-emerald-500/10 text-white shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                                    : ''
                                  } ${columnIndex !== table.columns.length - 1 ? 'border-r' : ''}`}
                                style={{
                                  borderColor: 'rgba(100,200,255,0.35)',
                                  boxShadow: '0 0 8px rgba(80,150,255,0.5)',
                                }}
                              >
                                {column}
                              </div>
                            ))}
                          </div>
                          {table.rows.map((row, rowIndex) => (
                            <div
                              key={row.feature}
                              className={`group/row grid grid-cols-4 items-stretch text-[13px] sm:text-sm md:text-[15px] text-slate-200 transition-colors duration-300 hover:bg-[rgba(40,120,255,0.08)] hover:[box-shadow:inset_0_0_20px_rgba(80,150,255,0.25)] ${rowIndex !== table.rows.length - 1 ? 'border-b' : ''
                                }`}
                              style={{ borderColor: 'rgba(120,180,255,0.25)' }}
                            >
                              <div
                                className="px-3 py-3 sm:px-5 text-left border-r"
                                style={{ borderColor: 'rgba(100,200,255,0.35)' }}
                              >
                                <span className="text-slate-200/90">
                                  {row.feature}
                                </span>
                              </div>
                              {row.values.map((cell, cellIndex) => {
                                const isHighlight = cellIndex === 0;
                                const highlightClasses = isHighlight
                                  ? 'bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.18)] motion-safe:animate-pulse'
                                  : '';
                                const borderClass =
                                  cellIndex !== row.values.length - 1
                                    ? 'border-r'
                                    : '';
                                if (cell.type === 'icon') {
                                  return (
                                    <div
                                      key={`${row.feature}-icon-${cellIndex}`}
                                      className={`px-3 py-3 sm:px-5 flex items-center justify-center transition-all duration-300 hover:brightness-110 ${highlightClasses} ${borderClass}`}
                                      style={{ borderColor: 'rgba(100,200,255,0.35)' }}
                                    >
                                      <span
                                        className={`text-2xl font-semibold ${cell.value ? 'text-emerald-400' : 'text-rose-400'
                                          }`}
                                      >
                                        {cell.value ? '+' : '-'}
                                      </span>
                                    </div>
                                  );
                                }

                                const toneClass =
                                  cell.tone === 'good'
                                    ? 'text-emerald-300'
                                    : cell.tone === 'bad'
                                      ? 'text-rose-300'
                                      : 'text-slate-200';

                                return (
                                  <div
                                    key={`${row.feature}-text-${cellIndex}`}
                                    className={`px-3 py-3 sm:px-5 flex items-center justify-center text-center transition-all duration-300 hover:brightness-110 ${toneClass} ${highlightClasses} ${borderClass}`}
                                    style={{ borderColor: 'rgba(100,200,255,0.35)' }}
                                  >
                                    {cell.value}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="w-full mt-24 px-4 sm:px-0">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              {t('solution.sectionTitle', 'AI-CSD Platform Overview')}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {t('solution.sectionSubtitle', 'AI-CSD provides a unified interface for monitoring and protecting web infrastructure and corporate email in real time.')}
            </p>
          </div>
          <StickyScrollSolution />
        </div>
        <FaqSection />
        <div className="w-full max-w-7xl mx-auto mt-24">
          <FloatingText />
        </div>
      </main>
      <AiSocGetModal isOpen={isModalOpen} onClose={closeModal} />
      <BackToTopButton />
    </>
  );
};

export default AiSocLanding;
