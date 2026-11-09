import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { seoConfig } from "@/data/seo";
import type { Project } from "@/types";

export const ogImage = {
  url: seoConfig.ogImage.path,
  width: seoConfig.ogImage.width,
  height: seoConfig.ogImage.height,
  alt: `${profile.name}: ${profile.tagline}`,
};

type PageSeo = {
  /** Kosongkan untuk memakai judul default dari layout. */
  title?: string;
  description: string;
  /** Path halaman, mis. "/projects". Dipakai untuk canonical dan og:url. */
  path: string;
  ogTitle: string;
};

// Next.js mengganti (bukan menggabungkan) openGraph/twitter milik layout
// saat halaman mendefinisikannya, jadi semua field ditulis lengkap di sini.
export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
}: PageSeo): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: profile.name,
      title: ogTitle,
      description,
      locale: seoConfig.ogLocale,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage.url],
    },
  };
}

export function projectDescription(project: Project): string {
  return (
    project.detail?.overview ??
    `${project.tagline}. Built with ${project.technologies.join(", ")}.`
  );
}