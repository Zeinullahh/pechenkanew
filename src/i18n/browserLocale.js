import { defaultLocale, supportedLocales } from "./locales.mjs";

export const LOCALE_PREFERENCE_KEY = "silence-preferred-locale";

export function getBrowserLocale(languages = []) {
  for (const language of languages) {
    const normalized = String(language).toLowerCase().replace(/_/g, "-");
    const candidates = [normalized, normalized.split("-")[0]];
    const match = candidates.find((candidate) => supportedLocales.includes(candidate));

    if (match) return match;
  }

  return defaultLocale;
}

export function getPreferredLocale(storage, languages) {
  const savedLocale = storage?.getItem(LOCALE_PREFERENCE_KEY);

  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale;
  }

  return getBrowserLocale(languages);
}

export function saveLocalePreference(storage, locale) {
  if (supportedLocales.includes(locale)) {
    storage?.setItem(LOCALE_PREFERENCE_KEY, locale);
  }
}
