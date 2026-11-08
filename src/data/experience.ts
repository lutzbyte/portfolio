import type { Experience } from "@/types";

// Isi berasal dari mockup. Urutan tampil mengikuti `order` (kecil = paling atas).
export const experience: Experience[] = [
  {
    id: "freelance-developer",
    year: "2023 - Present",
    title: "Freelance Developer",
    description: "Building web and mobile applications for various clients.",
    type: "work",
    order: 1,
  },
  {
    id: "it-support",
    year: "2022 - 2023",
    title: "IT Support",
    description: "Helped maintain systems and provided technical support.",
    type: "work",
    order: 2,
  },
  {
    id: "computer-science-student",
    year: "2021 - 2022",
    title: "Computer Science Student",
    description: "Learned and built projects in web development.",
    type: "education",
    order: 3,
  },
  {
    id: "high-school",
    year: "2019 - 2021",
    title: "High School",
    description: "Started my journey in technology.",
    type: "education",
    order: 4,
  },
];