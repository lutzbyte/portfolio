import type { Project, ProjectStatus } from "@/types";

// Menambah proyek: cukup tambahkan satu objek ke array `projects`.
// - thumbnail: letakkan gambar di public/images/projects/ lalu isi objek
//   { src: "/images/projects/nama.png", alt: "...", width: 1280, height: 800 }.
//   null = tampil placeholder.
// - githubUrl / liveUrl: isi URL atau biarkan null (tombolnya otomatis tidak muncul).
// - detail: opsional. Hanya bagian yang diisi yang tampil di /projects/[slug].
// - status: nilai di bawah hanyalah tebakan awal, sesuaikan dengan kondisi sebenarnya.
export const projects: Project[] = [
  {
    slug: "michi",
    name: "Michi",
    tagline: "Your Japanese Learning Companion",
    description: "Your Japanese Learning Companion.",
    thumbnail: null,
    technologies: ["React Native", "Expo"],
    category: "Mobile App",
    githubUrl: null,
    liveUrl: null,
    featured: true,
    status: "in-progress",
    order: 1,
  },
];

const statusLabels: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  archived: "Archived",
};

// Teks antarmuka untuk fitur proyek. Ubah di sini tanpa menyentuh komponen.
export const projectsCopy = {
  viewAllLabel: "View All Projects",
  viewProjectLabel: "View Project",
  index: {
    eyebrow: "My Projects",
    title: "All Projects",
    description: "Browse my work by category.",
  },
  filter: {
    label: "Filter by category",
    all: "All",
    empty: "No projects in this category yet.",
    resultsSuffix: "projects shown",
  },
  detail: {
    back: "Back to Projects",
    repository: "Repository",
    liveDemo: "Live Demo",
    empty: "More details about this project will be added soon.",
    overview: "Overview",
    problem: "Problem",
    solution: "Solution",
    features: "Features",
    technologies: "Technologies",
    screenshots: "Screenshots",
    info: "Project Info",
    category: "Category",
    status: "Status",
    statusLabels,
  },
  notFound: {
    eyebrow: "404",
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has moved.",
    browse: "Browse Projects",
    home: "Back Home",
  },
};