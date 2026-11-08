import type { Project } from "@/types";

// Menambah proyek: cukup tambahkan satu objek ke array ini.
// - thumbnail: letakkan gambar di public/images/projects/ lalu isi objek ImageAsset. null = tampil placeholder.
// - githubUrl / liveUrl: isi URL atau biarkan null (tombolnya otomatis tidak muncul).
// - detail: opsional. Hanya bagian yang diisi yang tampil di halaman /projects/[slug].
// - status: nilai di bawah hanyalah tebakan awal, sesuaikan dengan kondisi sebenarnya.
export const projects: Project[] = [
  {
    slug: "michi",
    name: "Michi",
    tagline: "Your Japanese Learning Companion",
    description: "Your Japanese Learning Companion.",
    thumbnail: null,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Web App",
    githubUrl: null,
    liveUrl: null,
    featured: true,
    status: "in-progress",
    order: 1,
  },
  {
    slug: "dailata",
    name: "Dailata",
    tagline: "Simple & Modern Task Management",
    description: "Simple & Modern Task Management.",
    thumbnail: null,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Web App",
    githubUrl: null,
    liveUrl: null,
    featured: true,
    status: "in-progress",
    order: 2,
  },
  {
    slug: "nexora",
    name: "Nexora",
    tagline: "Modern Landing Page Template",
    description: "Modern Landing Page Template.",
    thumbnail: null,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Template",
    githubUrl: null,
    liveUrl: null,
    featured: true,
    status: "in-progress",
    order: 3,
  },
];