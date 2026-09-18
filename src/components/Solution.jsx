import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import EdgeGlowCard from './EdgeGlowCard';

const Solution = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
            {t("solution.sectionTitle", "Our Solution")}
          </h2>
          <p className="mt-4 text-lg text-white max-w-2xl mx-auto">
            {t(
              "solution.sectionSubtitle",
              "Ready in 4 minutes and usable by any IT professional—no cybersecurity expertise required. We offer advanced visualization and affordability."
            )}
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
          {/* Global Shield */}
          <EdgeGlowCard
            mode="static"
            outerClassName="rounded-3xl p-[2px]"
            innerClassName="glass-card p-8 rounded-3xl"
            glowColor="#FF00B7"
            secondaryGlowColor="rgba(0,191,255,0.7)"
            topColor="#FF00B7"
            leftColor="#FF00B7"
            rightColor="rgba(0,191,255,0.7)"
            bottomColor="rgba(0,191,255,0.7)"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("solution.cards.globalShield.title", "Global Shield - CIA-Level Traffic Monitoring")}
              </h3>
              <p className="text-gray-300 mb-4">
                {t(
                  "solution.cards.globalShield.description",
                  "Our interactive 3D globe provides a stunning visualization of your web traffic, showing requests per second, active users, and traffic volume in bytes."
                )}
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t("solution.cards.globalShield.bullets.one", "Easy setup: just specify your IP and domain.")}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t("solution.cards.globalShield.bullets.two", "Receive an agent IP to add to your DNS.")}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t("solution.cards.globalShield.bullets.three", "Port closing for zero exposure.")}
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 relative" style={{ paddingTop: '56.25%' }}>
              <div className="absolute inset-0 bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-white">Insert GIF of 3D traffic globe</p>
              </div>
            </div>
            </div>
          </EdgeGlowCard>

          {/* Email Protector */}
          <EdgeGlowCard
            mode="static"
            outerClassName="rounded-3xl p-[2px]"
            innerClassName="glass-card p-8 rounded-3xl"
            glowColor="#FF00B7"
            secondaryGlowColor="rgba(0,191,255,0.7)"
            topColor="#FF00B7"
            leftColor="#FF00B7"
            rightColor="rgba(0,191,255,0.7)"
            bottomColor="rgba(0,191,255,0.7)"
          >
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("solution.cards.emailProtector.title", "Email Protector - World's First AI Email Protection")}
              </h3>
              <p className="text-gray-300 mb-4">
                {t(
                  "solution.cards.emailProtector.description",
                  "The world's first AI-based email protection system. Our vector view makes it easy to track email flow over time and identify threats."
                )}
              </p>
               <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t("solution.cards.emailProtector.bullets.one", "Detects spoofing, spam, phishing, and malware.")}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t("solution.cards.emailProtector.bullets.two", "Admin can add email accounts for protection.")}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t("solution.cards.emailProtector.bullets.three", "Most advanced commercial mail flow visualizer.")}
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 relative" style={{ paddingTop: '56.25%' }}>
              <div className="absolute inset-0 bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-white">Insert screenshot of email flow vector view</p>
              </div>
            </div>
            </div>
          </EdgeGlowCard>

          {/* Security Tester */}
          <EdgeGlowCard
            mode="static"
            outerClassName="rounded-3xl p-[2px]"
            innerClassName="glass-card p-8 rounded-3xl"
            glowColor="#FF00B7"
            secondaryGlowColor="rgba(0,191,255,0.7)"
            topColor="#FF00B7"
            leftColor="#FF00B7"
            rightColor="rgba(0,191,255,0.7)"
            bottomColor="rgba(0,191,255,0.7)"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("solution.cards.securityTester.title", "Security Tester - Next-Gen Vulnerability Testing")}
              </h3>
              <p className="text-gray-300 mb-4">
                {t(
                  "solution.cards.securityTester.description",
                  "Our system provides a One-Time-Token (OTT) for full-coverage security checks. Simply connect via our browser or VSCode extension."
                )}
              </p>
               <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t("solution.cards.securityTester.bullets.one", "Specify security scope and target in the CMC.")}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t("solution.cards.securityTester.bullets.two", "Paste the OTT and start the security check.")}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {t("solution.cards.securityTester.bullets.three", "Intelligence-driven risk insights.")}
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 relative" style={{ paddingTop: '56.25%' }}>
              <div className="absolute inset-0 bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-white">Insert screenshot of security report</p>
              </div>
            </div>
            </div>
          </EdgeGlowCard>
        </div>
        
        {/* CMC Section */}
        <div className="text-center mt-20">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("solution.cmc.title", "Centralized Management Console (CMC)")}
            </h3>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
              {t(
                "solution.cmc.description",
                "All three components are managed through a unified console that provides centralized visualization, easy configuration and monitoring, and comprehensive security reporting."
              )}
            </p>
        </div>

      </div>
    </section>
  );
};

export default Solution;
