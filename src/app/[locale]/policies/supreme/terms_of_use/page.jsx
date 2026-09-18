import EnPage from "@/app/policies/supreme/terms_of_use/page.jsx";
import RuPage from "@/components/policies/ru/supreme/TermsOfUse.jsx";

export default async function LocalizedPage({ params }) {
  const { locale } = await params;
  return locale === "ru" ? <RuPage /> : <EnPage />;
}
