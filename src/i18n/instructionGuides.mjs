import { supportedLocales } from "./locales.mjs";

const contentByLocale = {
  en: {
    ui: { sections: "Sections", topic: "topic", topics: "topics", overview: "Overview", reference: "Reference", closeSections: "Close sections", guideSelector: "Choose instruction system" },
    email: { pageTitle: "Email Security Instruction Guide", metadataTitle: "Email Security User Guide - Silence AI" },
    pentester: { pageTitle: "AI-CSD Pentester Instruction Guide", metadataTitle: "AI-CSD Pentester User Guide - Silence AI" },
    server: { pageTitle: "Server Security Instruction Guide", metadataTitle: "Server Security User Guide - Silence AI" },
    web: { pageTitle: "Web Security Instruction Guide", metadataTitle: "Web Security User Guide - Silence AI" },
  },
  ja: {
    ui: { sections: "セクション", topic: "トピック", topics: "トピック", overview: "概要", reference: "参考資料", closeSections: "セクションを閉じる", guideSelector: "手順システムを選択" },
    email: { pageTitle: "Email Security 操作ガイド", metadataTitle: "Email Security ユーザーガイド - Silence AI" },
    pentester: { pageTitle: "AI-CSD Pentester 操作ガイド", metadataTitle: "AI-CSD Pentester ユーザーガイド - Silence AI" },
    server: { pageTitle: "Server Security 操作ガイド", metadataTitle: "Server Security ユーザーガイド - Silence AI" },
    web: { pageTitle: "Web Security \u64cd\u4f5c\u30ac\u30a4\u30c9", metadataTitle: "Web Security \u30e6\u30fc\u30b6\u30fc\u30ac\u30a4\u30c9 - Silence AI" },
  },
  zh: {
    ui: { sections: "章节", topic: "主题", topics: "主题", overview: "概述", reference: "参考", closeSections: "关闭章节", guideSelector: "选择说明系统" },
    email: { pageTitle: "Email Security 操作指南", metadataTitle: "Email Security 用户指南 - Silence AI" },
    pentester: { pageTitle: "AI-CSD Pentester 操作指南", metadataTitle: "AI-CSD Pentester 用户指南 - Silence AI" },
    server: { pageTitle: "Server Security 操作指南", metadataTitle: "Server Security 用户指南 - Silence AI" },
    web: { pageTitle: "Web Security \u64cd\u4f5c\u6307\u5357", metadataTitle: "Web Security \u7528\u6237\u6307\u5357 - Silence AI" },
  },
  ko: {
    ui: { sections: "섹션", topic: "주제", topics: "주제", overview: "개요", reference: "참고", closeSections: "섹션 닫기", guideSelector: "안내 시스템 선택" },
    email: { pageTitle: "Email Security 사용 안내서", metadataTitle: "Email Security 사용자 가이드 - Silence AI" },
    pentester: { pageTitle: "AI-CSD Pentester 사용 안내서", metadataTitle: "AI-CSD Pentester 사용자 가이드 - Silence AI" },
    server: { pageTitle: "Server Security 사용 안내서", metadataTitle: "Server Security 사용자 가이드 - Silence AI" },
    web: { pageTitle: "Web Security \uc0ac\uc6a9 \uc548\ub0b4\uc11c", metadataTitle: "Web Security \uc0ac\uc6a9\uc790 \uac00\uc774\ub4dc - Silence AI" },
  },
  fr: {
    ui: { sections: "Sections", topic: "sujet", topics: "sujets", overview: "Vue d’ensemble", reference: "Référence", closeSections: "Fermer les sections", guideSelector: "Choisir le système d’instructions" },
    email: { pageTitle: "Guide d’utilisation d’Email Security", metadataTitle: "Guide utilisateur d’Email Security - Silence AI" },
    pentester: { pageTitle: "Guide d’utilisation d’AI-CSD Pentester", metadataTitle: "Guide utilisateur d’AI-CSD Pentester - Silence AI" },
    server: { pageTitle: "Guide d’utilisation de Server Security", metadataTitle: "Guide utilisateur de Server Security - Silence AI" },
    web: { pageTitle: "Guide d\u2019utilisation de Web Security", metadataTitle: "Guide utilisateur de Web Security - Silence AI" },
  },
  de: {
    ui: { sections: "Abschnitte", topic: "Thema", topics: "Themen", overview: "Überblick", reference: "Referenz", closeSections: "Abschnitte schließen", guideSelector: "Anleitungssystem auswählen" },
    email: { pageTitle: "Email Security – Bedienungsanleitung", metadataTitle: "Email Security Benutzerhandbuch - Silence AI" },
    pentester: { pageTitle: "AI-CSD Pentester – Bedienungsanleitung", metadataTitle: "AI-CSD Pentester Benutzerhandbuch - Silence AI" },
    server: { pageTitle: "Server Security – Bedienungsanleitung", metadataTitle: "Server Security Benutzerhandbuch - Silence AI" },
    web: { pageTitle: "Web Security - Bedienungsanleitung", metadataTitle: "Web Security Benutzerhandbuch - Silence AI" },
  },
  ru: {
    ui: { sections: "Разделы", topic: "тема", topics: "темы", overview: "Обзор", reference: "Справка", closeSections: "Закрыть разделы", guideSelector: "Выберите систему инструкций" },
    email: { pageTitle: "Руководство по Email Security", metadataTitle: "Руководство по Email Security - Silence AI" },
    pentester: { pageTitle: "Руководство по AI-CSD Pentester", metadataTitle: "Руководство пользователя AI-CSD Pentester - Silence AI" },
    server: { pageTitle: "Руководство по Server Security", metadataTitle: "Руководство пользователя Server Security - Silence AI" },
    web: { pageTitle: "\u0420\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e \u043f\u043e Web Security", metadataTitle: "\u0420\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f Web Security - Silence AI" },
  },
  ar: {
    ui: { sections: "الأقسام", topic: "موضوع", topics: "موضوعات", overview: "نظرة عامة", reference: "مرجع", closeSections: "إغلاق الأقسام", guideSelector: "اختر نظام الإرشادات" },
    email: { pageTitle: "دليل استخدام Email Security", metadataTitle: "دليل مستخدم Email Security - Silence AI" },
    pentester: { pageTitle: "دليل استخدام AI-CSD Pentester", metadataTitle: "دليل مستخدم AI-CSD Pentester - Silence AI" },
    server: { pageTitle: "دليل استخدام Server Security", metadataTitle: "دليل مستخدم Server Security - Silence AI" },
    web: { pageTitle: "\u062f\u0644\u064a\u0644 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 Web Security", metadataTitle: "\u062f\u0644\u064a\u0644 \u0645\u0633\u062a\u062e\u062f\u0645 Web Security - Silence AI" },
  },
  tr: {
    ui: { sections: "Bölümler", topic: "konu", topics: "konu", overview: "Genel Bakış", reference: "Başvuru", closeSections: "Bölümleri kapat", guideSelector: "Talimat sistemini seçin" },
    email: { pageTitle: "Email Security Kullanım Kılavuzu", metadataTitle: "Email Security Kullanıcı Kılavuzu - Silence AI" },
    pentester: { pageTitle: "AI-CSD Pentester Kullanım Kılavuzu", metadataTitle: "AI-CSD Pentester Kullanıcı Kılavuzu - Silence AI" },
    server: { pageTitle: "Server Security Kullanım Kılavuzu", metadataTitle: "Server Security Kullanıcı Kılavuzu - Silence AI" },
    web: { pageTitle: "Web Security Kullan\u0131m K\u0131lavuzu", metadataTitle: "Web Security Kullan\u0131c\u0131 K\u0131lavuzu - Silence AI" },
  },
};

const englishFiles = {
  email: "USER_GUIDE-Email security system.en.md",
  pentester: "AI_CSD_PENTESTER_USER_GUIDE.md",
  server: "Silence_AI_Server_Security_User_Guide(1).md",
  web: "USER_GUIDE_web security.md",
};

export function getInstructionGuideContent(locale, guide) {
  const resolvedLocale = supportedLocales.includes(locale) ? locale : "en";
  const localized = contentByLocale[resolvedLocale];
  const file = resolvedLocale === "en"
    ? englishFiles[guide]
    : guide === "email" && resolvedLocale === "ru"
      ? "USER_GUIDE-Email security system.md"
      : englishFiles[guide].replace(/(?:\.en)?\.md$/, `.${resolvedLocale}.md`);

  return {
    locale: resolvedLocale,
    direction: resolvedLocale === "ar" ? "rtl" : "ltr",
    ui: localized.ui,
    ...localized[guide],
    file,
    sourceFile: englishFiles[guide],
  };
}
