import Header from "@/components/Header";
import SupremeInstructions from "@/components/instructions/SupremeInstructions";

export const metadata = {
    title: "Supreme Instructions - Silence AI",
};

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header hideCta />
            <main className="flex grow flex-col px-4 pb-16">
                <SupremeInstructions />
            </main>
        </div>
    );
}
