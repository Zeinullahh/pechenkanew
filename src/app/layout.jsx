import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { supportedLocales } from "@/i18n/locales.mjs";
import "./globals.css";
import { setRequestLocale } from 'next-intl/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export const metadata = {
  metadataBase: new URL('https://silenceai.net'),
  title: {
    default: "Silence AI - Secure Development & AI-CSD",
    template: "%s | Silence AI"
  },
  description: "Silence AI provides cutting-edge AI cybersecurity, sealed development cloud solutions, and AI-CSD. Keep code, prompts, and builds entirely within your secure network.",
  keywords: [
    "Silence AI",
    "Silence AI LLC",
    "Silence AI cybersecurity",
    "Silence cybersecurity",
    "AI security",
    "secure development cloud",
    "private AI cloud",
    "AI-CSD",
    "AI driven SOC",
    "SLNC-env",
  ],
  applicationName: "Silence AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Silence AI - Secure Development Cloud & AI-CSD',
    description: 'Silence AI provides cutting-edge AI cybersecurity, sealed development cloud solutions, and AI-CSD. Keep code, prompts, and builds entirely within your secure network.',
    url: 'https://silenceai.net',
    siteName: 'Silence AI',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/supreme_dashboard.jpeg',
        width: 1200,
        height: 630,
        alt: 'Silence AI Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silence AI - Secure Development Cloud & AI-CSD',
    description: 'Silence AI provides cutting-edge AI cybersecurity, sealed development cloud solutions, and AI-CSD. Keep code, prompts, and builds entirely within your secure network.',
    images: ['/supreme_dashboard.jpeg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ja': '/ja',
      'zh': '/zh',
      'ko': '/ko',
      'fr': '/fr',
      'de': '/de',
      'ru': '/ru',
      'ar': '/ar',
      'tr': '/tr',
    },
  },
  other: {
    verification: 'bms90c794rpwp6mwhst',
    'websoc-verification': 'cmnrls68f0003tb2544ylfgyr',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Silence AI",
  legalName: "Silence AI LLC",
  url: "https://silenceai.net",
  logo: "https://silenceai.net/logo.png",
  description: "Silence AI creates sealed development cloud environments and AI-CSD solutions for ultimate corporate data security.",
};

export default async function RootLayout(props) {
  const locale = 'en';

  const localeMessages = (await import(`@/locales/${locale}.json`)).default;
  const messages = transformBranding(localeMessages);

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
        style={{ backgroundColor: "#000000" }}
      >
        {/* Runs before any body markup parses, so returning visitors never see the preloader flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var slncFrames=localStorage.getItem("slnc-frames-preloaded");if(slncFrames&&Date.now()-Number(slncFrames)<604800000){document.documentElement.classList.add("frames-cached")}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
