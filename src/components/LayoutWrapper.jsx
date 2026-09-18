'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/Footer";
import ParallaxGlobe from "@/components/ParallaxGlobe";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import BackToTopButton from "@/components/BackToTopButton";

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
      {showParallaxGlobe && <ParallaxGlobe />}
      <div className={!isPolicyPage ? "default-content-wrapper pt-20" : "default-content-wrapper"}>
        {children}
      </div>
      <div className={isPolicyPage ? "bg-black" : "relative w-full"}>
        {!isPolicyPage && (
          <div className="absolute inset-0 -z-10 layout-background pointer-events-none">
            <img
              src="/moonrise.webp"
              alt="Moonrise"
              className="w-full h-full object-cover object-bottom layout-background-image"
              style={{ filter: "hue-rotate(250deg)" }}
            />
          </div>
        )}
        <Footer />
      </div>
      <CookieConsent />
      <BackToTopButton />
    </LanguageProvider>
  );
}
