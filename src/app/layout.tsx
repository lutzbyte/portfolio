import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { profile } from "@/data/profile";
import { getNavigation } from "@/lib/content";
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

// Metadata lengkap (Open Graph, canonical, dll.) dikerjakan di Fase 9.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.jobTitle}`,
    template: `%s | ${profile.name}`,
  },
  description: `${profile.tagline} ${profile.intro}`,
};

export const viewport: Viewport = {
  themeColor: "#080B14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${sans.variable} ${mono.variable} flex flex-col font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <Navbar
          brand={profile.name}
          items={getNavigation()}
          ctaLabel={profile.hero.secondaryCta.label}
          ctaHref={profile.hero.secondaryCta.href}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}