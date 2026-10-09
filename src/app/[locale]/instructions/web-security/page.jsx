import { readFile } from "node:fs/promises";
import path from "node:path";
import ServerSecurityGuide from "@/components/instructions/ServerSecurityGuide";
import { getInstructionGuideContent } from "@/i18n/instructionGuides.mjs";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: getInstructionGuideContent(locale, "web").metadataTitle };
}

export default async function Page({ params }) {
  const { locale } = await params;
  const content = getInstructionGuideContent(locale, "web");
  const source = await readFile(path.join(process.cwd(), content.file), "utf8");
  const markdown = source.replace(/^# .+\r?\n/, "");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex grow flex-col px-4 pb-16">
        <ServerSecurityGuide
          markdown={markdown}
          anchorMarkdown={markdown}
          locale={content.locale}
          direction={content.direction}
          pageTitle={content.pageTitle}
          productLabel="Web Security"
          chapterHeadingLevel={2}
          uiLabels={content.ui}
        />
      </main>
    </div>
  );
}
