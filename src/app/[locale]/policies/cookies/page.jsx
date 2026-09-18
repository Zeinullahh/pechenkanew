import EnPage from "@/app/policies/cookies/page.jsx";
import RuPage from "@/components/policies/ru/general/Cookies.jsx";

export default async function LocalizedPage({ params }) {
  const { locale } = await params;
  return locale === "ru" ? <RuPage /> : <EnPage />;
}
