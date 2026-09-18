import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link as LocalizedLink } from '@/i18n/navigation';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const copyright = t("footer.copyright", `© ${year} Silence AI. All rights reserved.`, { year });

  return (
    <footer className="bg-transparent text-white pt-52 pb-20 sm:pt-72 sm:pb-24 lg:pb-12 lg:pt-60">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Image src="/logo.svg" alt="Silence AI Logo" width={140} height={40} />
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 items-center text-gray-400 text-center md:text-left text-sm md:text-base">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
              <span className="font-semibold text-white">{t("footer.contactLabel", "Contact:")}</span>
              <span>{t("footer.contactValue", "info@silenceai.net")}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 border-t border-gray-800 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <p className="text-gray-500 text-sm text-center lg:text-left w-full lg:w-auto order-2 lg:order-1">{copyright}</p>

          <div className="w-full lg:w-auto order-1 lg:order-2">
            <div className="flex justify-center lg:justify-end mb-4">
              <LocalizedLink href="/policies/cookies" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                {t("footer.links.cookies", "Cookies Policy")}
              </LocalizedLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[100px_repeat(3,auto)] gap-y-3 gap-x-2 sm:gap-x-6 items-center text-sm md:text-right">

              {/* AI-CSD 1 Web */}
              <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold text-center sm:text-right">AI-CSD 1 Web:</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:contents">
                <LocalizedLink href="/policies/ai-soc1/web/terms_of_use" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsUse", "Terms of Use")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/web/terms_of_service" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsService", "Terms of Service")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/web/privacy" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.privacy", "Privacy Policy")}
                </LocalizedLink>
              </div>

              {/* AI-CSD 1 Email */}
              <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold text-center sm:text-right mt-2 sm:mt-0">AI-CSD 1 Email:</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:contents">
                <LocalizedLink href="/policies/ai-soc1/email/terms_of_use" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsUse", "Terms of Use")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/email/terms_of_service" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsService", "Terms of Service")}
                </LocalizedLink>
                <LocalizedLink href="/policies/ai-soc1/email/privacy" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.privacy", "Privacy Policy")}
                </LocalizedLink>
              </div>


              {/* SUPREME */}
              <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold text-center sm:text-right mt-2 sm:mt-0">Supreme:</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:contents">
                <LocalizedLink href="/policies/supreme/terms_of_use" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsUse", "Terms of Use")}
                </LocalizedLink>
                <LocalizedLink href="/policies/supreme/terms_of_service" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.termsService", "Terms of Service")}
                </LocalizedLink>
                <LocalizedLink href="/policies/supreme/privacy" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("footer.links.privacy", "Privacy Policy")}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
