'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/Footer";
import ParallaxGlobe from "@/components/ParallaxGlobe";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import BackToTopButton from "@/components/BackToTopButton";
import BrowserLocaleRedirect from "@/components/BrowserLocaleRedirect";
import ColorBends from "@/components/ColorBends";

const BACKGROUND_COLORS = ["#000000", "#00FFC8", "#FFFFFF", "#FF6BFF"];

export default function LayoutWrapper({ children, initialLanguage }) {
  const pathname = usePathname();
  // Strip the locale prefix (e.g. "/en/...") so route checks work on localized URLs
  const routePath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  const isPolicyPage = routePath.startsWith('/policies');
  const isServicesPage = pathname.startsWith('/services') || pathname.startsWith('/developer-services');
  // Old homepage content is now moved to /ai-soc
  const isProductPage = pathname === '/ai-soc';

  // Restrict globe to the product page only (was main page)
  const showParallaxGlobe = isProductPage;

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <BrowserLocaleRedirect currentLocale={initialLanguage} />
      {!isPolicyPage && (
        <ColorBends
          className="layout-background"
          colors={BACKGROUND_COLORS}
          speed={0.2}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.15}
          intensity={1.5}
          bandWidth={6}
          transparent
        />
      )}
      {showParallaxGlobe && <ParallaxGlobe />}
      <div className={!isPolicyPage ? "default-content-wrapper pt-20" : "default-content-wrapper"}>
        {children}
      </div>
      <div className={isPolicyPage ? "bg-black" : "relative w-full"}>
        <Footer />
      </div>
      <CookieConsent />
      <BackToTopButton />
    </LanguageProvider>
  );
}
