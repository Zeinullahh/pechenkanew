import HomeLanding from '@/components/HomeLanding';
import { supportedLocales } from '@/i18n/locales.mjs';

// The homepage is a dynamic locale route. Keep its parameter list local to the
// page so static exports do not rely on layout-level parameter inheritance.
export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default function Page() {
  return <HomeLanding />;
}

