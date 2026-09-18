import AiSocPolicyPage from "@/components/policies/AiSocPolicyPage";

export default async function Page({ params }) {
  const { locale } = await params;
  return <AiSocPolicyPage policy="cookies" variant="email" locale={locale} />;
}
