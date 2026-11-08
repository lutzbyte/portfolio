import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./motion.css";
import { OverflowDebug } from "@/components/dev/OverflowDebug";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { profile } from "@/data/profile";
import { seoConfig } from "@/data/seo";
import { getNavigation } from "@/lib/content";
import { siteJsonLd } from "@/lib/jsonld";
import { ogImage } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
});

// Token verifikasi dibaca dari env. Kosong = tag tidak dibuat (tidak ada token palsu).
const googleToken =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;
const bingToken =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() || undefined;

// Canonical dan openGraph.url diatur per halaman (src/lib/seo.ts), bukan di sini.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.jobTitle}`,
    template: `%s | ${profile.name}`,
  },
  description: `${profile.tagline} ${profile.intro}`,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: seoConfig.ogLocale,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage.url],
  },
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
  verification: {
    google: googleToken,
    other: bingToken ? { "msvalidate.01": bingToken } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#080B14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={seoConfig.language} data-scroll-behavior="smooth">
      <body
        className={`${sans.variable} ${mono.variable} flex flex-col font-sans antialiased`}
      >
        {/* Tanpa JavaScript, elemen animasi Motion tetap terlihat. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal]{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <MotionProvider>
          <Navbar
            brand={profile.name}
            items={getNavigation()}
            ctaLabel={profile.hero.secondaryCta.label}
            ctaHref={profile.hero.secondaryCta.href}
          />
          {children}
          <Footer />
        </MotionProvider>
        <JsonLd data={siteJsonLd()} />
        <OverflowDebug />
      </body>
    </html>
  );
}