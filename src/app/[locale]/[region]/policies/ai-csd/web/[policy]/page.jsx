import AiSocPolicyPage from "@/components/policies/AiSocPolicyPage";
import { notFound } from "next/navigation";

const policies = ["terms_of_service", "terms_of_use", "privacy", "cookies"];

export function generateStaticParams() {
  return [
    ...policies.map((policy) => ({ locale: "ru", region: "kz", policy })),
    ...policies.map((policy) => ({ locale: "en", region: "ae", policy })),
  ];
}

export default async function Page({ params }) {
  const { locale, region, policy } = await params;
  if (!policies.includes(policy) || !((locale === "ru" && region === "kz") || (locale === "en" && region === "ae"))) {
    notFound();
  }
  return <AiSocPolicyPage policy={policy} variant="web" locale={locale} />;
}
