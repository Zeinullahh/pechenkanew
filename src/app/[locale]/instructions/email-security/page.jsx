import { readFile } from "node:fs/promises";
import path from "node:path";
import Header from "@/components/Header";
import ServerSecurityGuide from "@/components/instructions/ServerSecurityGuide";

const adminChapterRules = [
  { chapter: "1.", sections: ["1.3"] },
  { chapter: "2.", sections: ["2.1", "2.2"] },
  { chapter: "3.", sections: true },
  { chapter: "6.", sections: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.11"] },
  { chapter: "7.", sections: true },
  { chapter: "8.", sections: true },
  { chapter: "9.", sections: true },
];

const workspaceChapterRules = [
  { chapter: "1.", sections: ["1.3"] },
  { chapter: "2.", sections: ["2.1", "2.3"] },
  { chapter: "4.", sections: true },
  { chapter: "6.", sections: ["6.1", "6.2", "6.3", "6.6", "6.7", "6.8"] },
  { chapter: "7.", sections: true },
  { chapter: "8.", sections: true },
  { chapter: "9.", sections: true },
];

const localeContent = {
  en: {
    file: "USER_GUIDE-Email security system.en.md",
    title: "Email Security Instruction Guide",
    product: "Email Security",
    audience: {
      "Overview": "All users",
      "Contents": "All users",
      "1. Platform overview": "All users",
      "2. Account access": "All users",
      "3. CMC — Silence 365 Email Visualizer": "Admin Panel",
      "4. Email Protector": "Email Workspace",
      "5. WebSOC / AI-SOC Web": "Admin Panel",
      "6. Common issues": "All users",
      "7. Security recommendations": "All users",
      "8. Glossary": "All users",
      "9. Contacting support": "All users",
    },
    ui: { sections: "Sections", topic: "topic", topics: "topics", overview: "Overview", reference: "Reference", closeSections: "Close sections", guideSelector: "Choose instruction system" },
    views: [
      { id: "admin", label: "Admin Panel", description: "CMC setup, domains, users, policies, and monitoring", chapterRules: adminChapterRules },
      { id: "workspace", label: "Email Workspace", description: "Mailbox, messages, folders, settings, and migration", chapterRules: workspaceChapterRules },
    ],
  },
  ru: {
    file: "USER_GUIDE-Email security system.md",
    title: "Руководство по Email Security",
    product: "Email Security",
    audience: {
      "Обзор": "Все пользователи",
      "Содержание": "Все пользователи",
      "1. О платформе": "Все пользователи",
      "2. Доступ к учётной записи": "Все пользователи",
      "3. CMC — Silence 365 Email Visualizer": "Панель администратора",
      "4. Email Protector": "Почтовое пространство",
      "5. WebSOC / AI-SOC Web": "Панель администратора",
      "6. Типовые неполадки": "Все пользователи",
      "7. Рекомендации по безопасности": "Все пользователи",
      "8. Глоссарий": "Все пользователи",
      "9. Обращение в поддержку": "Все пользователи",
    },
    ui: { sections: "Разделы", topic: "тема", topics: "темы", overview: "Обзор", reference: "Справка", closeSections: "Закрыть разделы", guideSelector: "Выберите систему инструкций" },
    views: [
      { id: "admin", label: "Панель администратора", description: "Настройка CMC, доменов, пользователей, политик и мониторинга", chapterRules: adminChapterRules },
      { id: "workspace", label: "Почтовое пространство", description: "Почта, письма, папки, настройки и миграция", chapterRules: workspaceChapterRules },
    ],
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "ru" ? "Руководство по Email Security - Silence AI" : "Email Security User Guide - Silence AI",
  };
}

export default async function Page({ params }) {
  const { locale } = await params;
  const content = localeContent[locale] || localeContent.en;
  const markdown = await readFile(path.join(process.cwd(), content.file), "utf8");

  return (
    <div className="flex min-h-screen flex-col">
      <Header hideCta allowedLocales={["en", "ru"]} />
      <main className="flex grow flex-col px-4 pb-16">
        <ServerSecurityGuide
          markdown={markdown}
          pageTitle={content.title}
          productLabel={content.product}
          chapterHeadingLevel={2}
          chapterAudienceLabels={content.audience}
          uiLabels={content.ui}
          guideViews={content.views}
          defaultViewId="admin"
        />
      </main>
    </div>
  );
}
