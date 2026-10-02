"use client";

import { useEffect } from "react";
import { getPreferredLocale } from "@/i18n/browserLocale";
import { supportedLocales } from "@/i18n/locales.mjs";

const localePrefixPattern = new RegExp(`^/(${supportedLocales.join("|")})(?=/|$)`);

function withLocale(pathname, locale) {
  const pathWithoutLocale = pathname.replace(localePrefixPattern, "") || "/";
  return `/${locale}${pathWithoutLocale === "/" ? "/" : pathWithoutLocale}`;
}

export default function BrowserLocaleRedirect({ currentLocale }) {
  useEffect(() => {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const targetLocale = getPreferredLocale(window.localStorage, languages);
    const targetPath = withLocale(window.location.pathname, targetLocale);

    if (currentLocale === targetLocale && window.location.pathname === targetPath) {
      return;
    }

    window.location.replace(`${targetPath}${window.location.search}${window.location.hash}`);
  }, [currentLocale]);

  return null;
}
