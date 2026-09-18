import AiSocPolicyPage from "@/components/policies/AiSocPolicyPage";

export default async function Page({ params }) {
  const { locale } = await params;
  return <AiSocPolicyPage policy="privacy" variant="email" locale={locale} />;
}
