import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

// Semua halaman publik. Proyek baru masuk otomatis dari data/projects.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/projects") },
    ...getProjectSlugs().map((slug) => ({
      url: absoluteUrl(`/projects/${slug}`),
    })),
  ];
}