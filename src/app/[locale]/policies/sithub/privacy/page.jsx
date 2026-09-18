import EnPage from "@/app/policies/sithub/privacy/page.jsx";
import RuPage from "@/components/policies/ru/sithub/Privacy.jsx";

export default async function LocalizedPage({ params }) {
  const { locale } = await params;
  return locale === "ru" ? <RuPage /> : <EnPage />;
}
