import WebJurisdictionSelector from "@/components/policies/shared/WebJurisdictionSelector";
import EmailJurisdictionSelector from "@/components/policies/shared/EmailJurisdictionSelector";

const titles = {
  web: {
    terms_of_use: "Web Security Terms of Use",
    terms_of_service: "Web Security Terms of Service",
    privacy: "Web Security Privacy Policy",
    cookies: "Web Security Cookie Policy",
  },
  email: {
    terms_of_use: "Email Security Terms of Use",
    terms_of_service: "Email Security Terms of Service",
    privacy: "Email Security Privacy Policy",
  },
};

export default function PolicyJurisdictionLanding({ variant, policy, locale = "en" }) {
  const Selector = variant === "email" ? EmailJurisdictionSelector : WebJurisdictionSelector;

  return (
    <main className="min-h-screen bg-black px-6 py-28 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold">{titles[variant][policy]}</h1>
        <div className="mt-8"><Selector policy={policy} locale={locale} /></div>
      </div>
    </main>
  );
}
