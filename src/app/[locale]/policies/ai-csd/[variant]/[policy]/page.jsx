import { notFound } from "next/navigation";
import PolicyJurisdictionLanding from "@/components/policies/shared/PolicyJurisdictionLanding";

const locales = ["en", "ru"];
const policies = {
  web: ["terms_of_use", "terms_of_service", "privacy", "cookies"],
  email: ["terms_of_use", "terms_of_service", "privacy"],
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.entries(policies).flatMap(([variant, names]) =>
      names.map((policy) => ({ locale, variant, policy }))
    )
  );
}

export default async function Page({ params }) {
  const { locale, variant, policy } = await params;
  if (!locales.includes(locale) || !policies[variant]?.includes(policy)) notFound();
  return <PolicyJurisdictionLanding variant={variant} policy={policy} locale={locale} />;
}
