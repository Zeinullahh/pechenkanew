import EmailJurisdictionSelector from "./EmailJurisdictionSelector";

const titles = {
  terms_of_service: "Terms of Service",
  terms_of_use: "Terms of Use",
  privacy: "Privacy Policy",
};

export default function EmailPolicyLanding({ policy }) {
  return (
    <main className="min-h-screen bg-black px-6 py-28 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold">Email Security {titles[policy]}</h1>
        <div className="mt-8"><EmailJurisdictionSelector policy={policy} /></div>
      </div>
    </main>
  );
}
