import TermsOfUseWebEn from "./ai-soc1/web/TermsOfUseWebEn";
import TermsOfUseEmailEn from "./ai-soc1/email/TermsOfUseEmailEn";
import TermsOfServiceWebEn from "./ai-soc1/web/TermsOfServiceWebEn";
import TermsOfServiceEmailEn from "./ai-soc1/email/TermsOfServiceEmailEn";
import PrivacyWebEn from "./ai-soc1/web/PrivacyWebEn";
import PrivacyEmailEn from "./ai-soc1/email/PrivacyEmailEn";
import CookiesWebEn from "./ai-soc1/web/CookiesWebEn";
import CookiesEmailEn from "./ai-soc1/email/CookiesEmailEn";

import TermsOfUseWebRu from "./ru/ai-soc1/web/TermsOfUseWeb";
import TermsOfUseEmailRu from "./ru/ai-soc1/email/TermsOfUseEmail";
import TermsOfServiceWebRu from "./ru/ai-soc1/TermsOfServiceWeb";
import TermsOfServiceEmailRu from "./ru/ai-soc1/TermsOfServiceEmail";
import PrivacyWebRu from "./ru/ai-soc1/PrivacyWeb";
import PrivacyEmailRu from "./ru/ai-soc1/PrivacyEmail";
import CookiesWebRu from "./ru/ai-soc1/CookiesWeb";
import CookiesEmailRu from "./ru/ai-soc1/CookiesEmail";

const registry = {
  terms_of_use: {
    web: { en: TermsOfUseWebEn, ru: TermsOfUseWebRu },
    email: { en: TermsOfUseEmailEn, ru: TermsOfUseEmailRu },
  },
  terms_of_service: {
    web: { en: TermsOfServiceWebEn, ru: TermsOfServiceWebRu },
    email: { en: TermsOfServiceEmailEn, ru: TermsOfServiceEmailRu },
  },
  privacy: {
    web: { en: PrivacyWebEn, ru: PrivacyWebRu },
    email: { en: PrivacyEmailEn, ru: PrivacyEmailRu },
  },
  cookies: {
    web: { en: CookiesWebEn, ru: CookiesWebRu },
    email: { en: CookiesEmailEn, ru: CookiesEmailRu },
  },
};

export default function AiSocPolicyPage({ policy, variant, locale }) {
  const lang = locale === "ru" ? "ru" : "en";
  const Component = registry[policy]?.[variant]?.[lang];

  if (!Component) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Policy not found.</p>
      </div>
    );
  }

  return <Component />;
}
