// src/app/[locale]/layout.tsx
import { ToastProvider } from '@/components/ui/toast-provider';
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import { routing, Locale } from "@/i18n/routing";
import { generateRootMetadata } from "@/lib/metadata";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import CookieConsent from "@/components/ui/cookie-consent";
import JsonLd, {
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
} from "@/components/JsonLd";
import {
  SITE_URL,
  GOOGLE_ANALYTICS_ID,
  GOOGLE_VERIFICATION,
  ANALYTICS_ENABLED,
  ENV
} from '@/config/constants';
import "../../styles/globals.css";

// ============================================
// FONTS CONFIGURATION
// ============================================
const inter = Inter({
  subsets: ["latin"],
  display: "swap",  // ✅ Evita FOIT (Flash of Invisible Text)
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,  // ✅ Reduce CLS
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",  // ✅ Evita FOIT
  variable: "--font-poppins",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,  // ✅ Reduce CLS
});

// ============================================
// VIEWPORT CONFIGURATION
// ============================================
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

// ============================================
// METADATA GENERATION
// ============================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return generateRootMetadata({ params });
}

// ============================================
// STATIC PARAMS FOR ALL LOCALES
// ============================================
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ============================================
// ROOT LAYOUT COMPONENT
// ============================================
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get translations
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <head>
        {/* ✅ Preload optimizado para LCP - imagen de fondo crítica */}
        <link 
          rel="preload" 
          as="image" 
          href="/images/background.jpg"
          fetchPriority="high"
        />

        {/* DNS Prefetch for analytics */}
        {ANALYTICS_ENABLED && (
          <>
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://www.googletagmanager.com" />
          </>
        )}
        {/* ✅ Google Search Console Verification */}
        {GOOGLE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={GOOGLE_VERIFICATION}
          />
        )}

        {/* Favicon - Modern approach */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.webmanifest" />


        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="MálagaPets" />

        {/* JSON-LD Structured Data */}
        <JsonLd data={generateOrganizationJsonLd({ siteUrl: SITE_URL })} />
        <JsonLd data={generateWebsiteJsonLd(SITE_URL)} />
      </head>

      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            {/* Skip to main content for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:m-2"
            >
              {t("skipToContent")}
            </a>

            {/* Main Layout Structure */}
            <div className="flex min-h-screen flex-col">
              <Header />
              {children}
              <Footer />
            </div>

            {/* Toast Notifications */}
            <ToastProvider />

            {/* Cookie Consent - Outside main layout */}
            <CookieConsent />
          </NextIntlClientProvider>
        </ThemeProvider>

        {/* Google Analytics - Using Next.js Script component */}
        {ANALYTICS_ENABLED && GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              strategy="lazyOnload"  // ✅ Cambiado de afterInteractive a lazyOnload
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"  // ✅ Cambiado de afterInteractive a lazyOnload
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                  });
                `,
              }}
            />
          </>
        )}

        {/* Development indicators */}
        {ENV.isDevelopment && (
          <Script
            id="dev-indicator"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                console.log('🔧 Development Mode');
                console.log('📍 Locale: ${locale}');
                console.log('🌐 Site URL: ${SITE_URL}');
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}