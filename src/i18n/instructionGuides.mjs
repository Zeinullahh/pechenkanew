import { supportedLocales } from "./locales.mjs";

const contentByLocale = {
  en: {
    ui: { sections: "Sections", topic: "topic", topics: "topics", overview: "Overview", reference: "Reference", closeSections: "Close sections", guideSelector: "Choose instruction system" },
    pentester: { pageTitle: "AI-CSD Pentester Instruction Guide", metadataTitle: "AI-CSD Pentester User Guide - Silence AI" },
    server: { pageTitle: "Server Security Instruction Guide", metadataTitle: "Server Security User Guide - Silence AI" },
  },
  ja: {
    ui: { sections: "セクション", topic: "トピック", topics: "トピック", overview: "概要", reference: "参考資料", closeSections: "セクションを閉じる", guideSelector: "手順システムを選択" },
    pentester: { pageTitle: "AI-CSD Pentester 操作ガイド", metadataTitle: "AI-CSD Pentester ユーザーガイド - Silence AI" },
    server: { pageTitle: "Server Security 操作ガイド", metadataTitle: "Server Security ユーザーガイド - Silence AI" },
  },
  zh: {
    ui: { sections: "章节", topic: "主题", topics: "主题", overview: "概述", reference: "参考", closeSections: "关闭章节", guideSelector: "选择说明系统" },
    pentester: { pageTitle: "AI-CSD Pentester 操作指南", metadataTitle: "AI-CSD Pentester 用户指南 - Silence AI" },
    server: { pageTitle: "Server Security 操作指南", metadataTitle: "Server Security 用户指南 - Silence AI" },
  },
  ko: {
    ui: { sections: "섹션", topic: "주제", topics: "주제", overview: "개요", reference: "참고", closeSections: "섹션 닫기", guideSelector: "안내 시스템 선택" },
    pentester: { pageTitle: "AI-CSD Pentester 사용 안내서", metadataTitle: "AI-CSD Pentester 사용자 가이드 - Silence AI" },
    server: { pageTitle: "Server Security 사용 안내서", metadataTitle: "Server Security 사용자 가이드 - Silence AI" },
  },
  fr: {
    ui: { sections: "Sections", topic: "sujet", topics: "sujets", overview: "Vue d’ensemble", reference: "Référence", closeSections: "Fermer les sections", guideSelector: "Choisir le système d’instructions" },
    pentester: { pageTitle: "Guide d’utilisation d’AI-CSD Pentester", metadataTitle: "Guide utilisateur d’AI-CSD Pentester - Silence AI" },
    server: { pageTitle: "Guide d’utilisation de Server Security", metadataTitle: "Guide utilisateur de Server Security - Silence AI" },
  },
  de: {
    ui: { sections: "Abschnitte", topic: "Thema", topics: "Themen", overview: "Überblick", reference: "Referenz", closeSections: "Abschnitte schließen", guideSelector: "Anleitungssystem auswählen" },
    pentester: { pageTitle: "AI-CSD Pentester – Bedienungsanleitung", metadataTitle: "AI-CSD Pentester Benutzerhandbuch - Silence AI" },
    server: { pageTitle: "Server Security – Bedienungsanleitung", metadataTitle: "Server Security Benutzerhandbuch - Silence AI" },
  },
  ru: {
    ui: { sections: "Разделы", topic: "тема", topics: "темы", overview: "Обзор", reference: "Справка", closeSections: "Закрыть разделы", guideSelector: "Выберите систему инструкций" },
    pentester: { pageTitle: "Руководство по AI-CSD Pentester", metadataTitle: "Руководство пользователя AI-CSD Pentester - Silence AI" },
    server: { pageTitle: "Руководство по Server Security", metadataTitle: "Руководство пользователя Server Security - Silence AI" },
  },
  ar: {
    ui: { sections: "الأقسام", topic: "موضوع", topics: "موضوعات", overview: "نظرة عامة", reference: "مرجع", closeSections: "إغلاق الأقسام", guideSelector: "اختر نظام الإرشادات" },
    pentester: { pageTitle: "دليل استخدام AI-CSD Pentester", metadataTitle: "دليل مستخدم AI-CSD Pentester - Silence AI" },
    server: { pageTitle: "دليل استخدام Server Security", metadataTitle: "دليل مستخدم Server Security - Silence AI" },
  },
  tr: {
    ui: { sections: "Bölümler", topic: "konu", topics: "konu", overview: "Genel Bakış", reference: "Başvuru", closeSections: "Bölümleri kapat", guideSelector: "Talimat sistemini seçin" },
    pentester: { pageTitle: "AI-CSD Pentester Kullanım Kılavuzu", metadataTitle: "AI-CSD Pentester Kullanıcı Kılavuzu - Silence AI" },
    server: { pageTitle: "Server Security Kullanım Kılavuzu", metadataTitle: "Server Security Kullanıcı Kılavuzu - Silence AI" },
  },
};

const englishFiles = {
  pentester: "AI_CSD_PENTESTER_USER_GUIDE.md",
  server: "Silence_AI_Server_Security_User_Guide(1).md",
};

export function getInstructionGuideContent(locale, guide) {
  const resolvedLocale = supportedLocales.includes(locale) ? locale : "en";
  const localized = contentByLocale[resolvedLocale];
  const file = resolvedLocale === "en"
    ? englishFiles[guide]
    : englishFiles[guide].replace(/\.md$/, `.${resolvedLocale}.md`);

  return {
    locale: resolvedLocale,
    direction: resolvedLocale === "ar" ? "rtl" : "ltr",
    ui: localized.ui,
    ...localized[guide],
    file,
    sourceFile: englishFiles[guide],
  };
}