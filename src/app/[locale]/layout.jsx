import { NextIntlClientProvider } from "next-intl";
import { supportedLocales } from "@/i18n/locales.mjs";
import "../globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { setRequestLocale } from 'next-intl/server';

const BRAND_REPLACEMENTS = [
  [/\bSilence AI LLC\b/g, "Silence"],
  [/\bSilence AI\b/g, "Silence"],
];

const EXCLUDED_BRAND_KEYWORDS = ["footer", "policy", "policies", "terms", "privacy", "cookies"];

function shouldSkipBrandTransform(pathSegments) {
  return pathSegments.some((segment) =>
    EXCLUDED_BRAND_KEYWORDS.some((keyword) => segment.toLowerCase().includes(keyword))
  );
}

function transformBranding(value, pathSegments = []) {
  if (typeof value === "string") {
    if (shouldSkipBrandTransform(pathSegments)) {
      return value;
    }

    return BRAND_REPLACEMENTS.reduce((text, [pattern, replacement]) => {
      return text.replace(pattern, replacement);
    }, value);
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => transformBranding(item, [...pathSegments, String(index)]));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        transformBranding(nestedValue, [...pathSegments, key]),
      ])
    );
  }

  return value;
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props) {
  const params = await props.params;
  const { locale } = params;

  // Validate that the incoming `locale` parameter is valid
  if (!supportedLocales.includes(locale)) {
    return null; // Or notFound()
  }

  // Enable static rendering
  setRequestLocale(locale);

  const localeMessages = (await import(`@/locales/${locale}.json`)).default;
  const messages = transformBranding(localeMessages);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LayoutWrapper initialLanguage={locale}>{props.children}</LayoutWrapper>
    </NextIntlClientProvider>
  );
}
