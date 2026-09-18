import EnPage from "@/app/policies/sithub/terms_of_use/page.jsx";
import RuPage from "@/components/policies/ru/sithub/TermsOfUse.jsx";

export default async function LocalizedPage({ params }) {
  const { locale } = await params;
  return locale === "ru" ? <RuPage /> : <EnPage />;
}
