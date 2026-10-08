import { redirect } from "next/navigation";

export default async function Page({ params }) {
  await params;
  redirect("/policies/ai-csd/email/terms_of_use/");
}
