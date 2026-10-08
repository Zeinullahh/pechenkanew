import { notFound } from "next/navigation";
import PolicyJurisdictionLanding from "@/components/policies/shared/PolicyJurisdictionLanding";

const policies = {
  web: ["terms_of_use", "terms_of_service", "privacy", "cookies"],
  email: ["terms_of_use", "terms_of_service", "privacy"],
};

export function generateStaticParams() {
  return Object.entries(policies).flatMap(([variant, names]) =>
    names.map((policy) => ({ variant, policy }))
  );
}

export default async function Page({ params }) {
  const { variant, policy } = await params;
  if (!policies[variant]?.includes(policy)) notFound();
  return <PolicyJurisdictionLanding variant={variant} policy={policy} />;
}
