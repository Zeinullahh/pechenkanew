import AiSocDocumentationTabs from "@/components/instructions/AiSocDocumentationTabs";

export const metadata = {
    title: "AI-CSD Instructions - Silence AI",
};

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex grow flex-col px-4 pb-16">
                <AiSocDocumentationTabs />
            </main>
        </div>
    );
}
