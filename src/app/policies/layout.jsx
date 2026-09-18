import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import enMessages from "../../locales/en.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Silence AI - Policies",
  icons: {
    icon: '/logo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function PoliciesLayout({ children }) {
  const locale = 'en';

  return (
    <NextIntlClientProvider locale={locale} messages={enMessages}>
      <LayoutWrapper initialLanguage={locale}>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
          {children}
        </div>
      </LayoutWrapper>
    </NextIntlClientProvider>
  );
}
