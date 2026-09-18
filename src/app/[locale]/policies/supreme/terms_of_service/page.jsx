import EnPage from "@/app/policies/supreme/terms_of_service/page.jsx";
import RuPage from "@/components/policies/ru/supreme/TermsOfService.jsx";

export default async function LocalizedPage({ params }) {
  const { locale } = await params;
  return locale === "ru" ? <RuPage /> : <EnPage />;
}
