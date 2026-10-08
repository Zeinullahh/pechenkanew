import WebJurisdictionSelector from "@/components/policies/shared/WebJurisdictionSelector";

export default function Page() {
  return (
    <main className="min-h-screen bg-black px-6 py-28 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold">Web Security Terms of Use</h1>
        <div className="mt-8"><WebJurisdictionSelector policy="terms_of_use" /></div>
      </div>
    </main>
  );
}
