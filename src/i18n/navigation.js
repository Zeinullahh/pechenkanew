import {createNavigation} from 'next-intl/navigation';
import {supportedLocales} from './locales.mjs';

export const locales = supportedLocales;
export const {Link, redirect, usePathname, useRouter} = createNavigation({locales});
