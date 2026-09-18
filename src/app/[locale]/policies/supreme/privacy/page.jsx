import EnPage from "@/app/policies/supreme/privacy/page.jsx";
import RuPage from "@/components/policies/ru/supreme/Privacy.jsx";

export default async function LocalizedPage({ params }) {
  const { locale } = await params;
  return locale === "ru" ? <RuPage /> : <EnPage />;
}
