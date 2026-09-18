import {getRequestConfig} from 'next-intl/server';
import {supportedLocales} from './locales.mjs';

export default getRequestConfig(async ({locale}) => {
  let resolvedLocale = locale;

  // Validate that the incoming `locale` parameter is valid
  if (!resolvedLocale || !supportedLocales.includes(resolvedLocale)) {
    resolvedLocale = 'en';
  }

  const messages = (await import(`../locales/${resolvedLocale}.json`)).default;

  return {
    locale: resolvedLocale,
    messages,
    // Use fallback behavior for missing messages instead of throwing errors
    onError: (error) => {
      // Silently ignore missing message errors during build
      if (error.code === 'MISSING_MESSAGE') {
        return;
      }
      console.error(error);
    },
    getMessageFallback: ({namespace, key, error}) => {
      // Return the default value (second argument to t()) or the key itself
      return key;
    }
  };
});
