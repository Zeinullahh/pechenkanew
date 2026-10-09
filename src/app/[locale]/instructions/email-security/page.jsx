import { readFile } from "node:fs/promises";
import path from "node:path";
import ServerSecurityGuide from "@/components/instructions/ServerSecurityGuide";
import { getInstructionGuideContent } from "@/i18n/instructionGuides.mjs";

const adminChapterRules = [
  { chapter: "2.", sections: ["2.2"] },
  { chapter: "3.", sections: true },
  { chapter: "6.", sections: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.11"] },
];

const workspaceChapterRules = [
  { chapter: "2.", sections: ["2.3"] },
  { chapter: "4.", sections: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11"] },
  { chapter: "6.", sections: ["6.2", "6.3", "6.7", "6.8"] },
];

const viewLabels = {
  en: { full: "Full guide", fullDescription: "All products and instructions", adminDescription: "Domains, employees, mail flow, protection, and monitoring", workspaceDescription: "Messages, folders, and mailbox settings" },
  ja: { full: "ガイド全体", fullDescription: "すべての製品と手順", adminDescription: "ドメイン、従業員、メールの流れ、保護と監視", workspaceDescription: "メール、フォルダー、メールボックス設定" },
  zh: { full: "完整指南", fullDescription: "所有产品与操作说明", adminDescription: "域名、员工、邮件流、防护与监控", workspaceDescription: "邮件、文件夹与邮箱设置" },
  ko: { full: "전체 안내서", fullDescription: "모든 제품과 사용법", adminDescription: "도메인, 직원, 메일 흐름, 보호 및 모니터링", workspaceDescription: "메시지, 폴더 및 메일함 설정" },
  fr: { full: "Guide complet", fullDescription: "Tous les produits et toutes les instructions", adminDescription: "Domaines, employés, flux, protection et surveillance", workspaceDescription: "Messages, dossiers et paramètres de la boîte" },
  de: { full: "Gesamtes Handbuch", fullDescription: "Alle Produkte und Anleitungen", adminDescription: "Domains, Mitarbeiter, Mailfluss, Schutz und Überwachung", workspaceDescription: "Nachrichten, Ordner und Postfacheinstellungen" },
  ru: { full: "Полное руководство", fullDescription: "Все продукты и инструкции", adminDescription: "Домены, сотрудники, почтовые потоки, защита и мониторинг", workspaceDescription: "Письма, папки и настройки почтового ящика" },
  ar: { full: "الدليل الكامل", fullDescription: "جميع المنتجات والتعليمات", adminDescription: "النطاقات والموظفون وتدفق البريد والحماية والمراقبة", workspaceDescription: "الرسائل والمجلدات وإعدادات البريد" },
  tr: { full: "Tam kılavuz", fullDescription: "Tüm ürünler ve talimatlar", adminDescription: "Etki alanları, çalışanlar, posta akışı, koruma ve izleme", workspaceDescription: "İletiler, klasörler ve posta kutusu ayarları" },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: getInstructionGuideContent(locale, "email").metadataTitle };
}

export default async function Page({ params }) {
  const { locale } = await params;
  const content = getInstructionGuideContent(locale, "email");
  const [markdown, anchorMarkdown] = await Promise.all([
    readFile(path.join(process.cwd(), content.file), "utf8"),
    readFile(path.join(process.cwd(), content.sourceFile), "utf8"),
  ]);
  const labels = viewLabels[content.locale];
  const guideViews = [
    { id: "full", label: labels.full, description: labels.fullDescription },
    { id: "admin", label: "Admin Console", description: labels.adminDescription, chapterRules: adminChapterRules },
    { id: "workspace", label: "Email Workspace", description: labels.workspaceDescription, chapterRules: workspaceChapterRules },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex grow flex-col px-4 pb-16">
        <ServerSecurityGuide
          markdown={markdown}
          anchorMarkdown={anchorMarkdown}
          locale={content.locale}
          direction={content.direction}
          pageTitle={content.pageTitle}
          productLabel="Email Security"
          chapterHeadingLevel={2}
          uiLabels={content.ui}
          guideViews={guideViews}
          defaultViewId="full"
        />
      </main>
    </div>
  );
}
