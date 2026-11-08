import type { Skill } from "@/types";

// Menambah skill: tambahkan satu objek. Urutan tampil mengikuti `order`.
// `icon` harus salah satu SkillIconKey di src/types/index.ts (ikonnya dibuat di Fase 4).
export const skills: Skill[] = [
  { id: "nextjs", name: "Next.js", icon: "nextjs", category: "Frontend", description: "React framework for full-stack web apps.", order: 1 },
  { id: "typescript", name: "TypeScript", icon: "typescript", category: "Language", description: "Typed superset of JavaScript.", order: 2 },
  { id: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss", category: "Frontend", description: "Utility-first CSS framework.", order: 3 },
  { id: "react", name: "React", icon: "react", category: "Frontend", description: "Library for building user interfaces.", order: 4 },
  { id: "nodejs", name: "Node.js", icon: "nodejs", category: "Backend", description: "JavaScript runtime for server-side apps.", order: 5 },
  { id: "express", name: "Express", icon: "express", category: "Backend", description: "Minimal web framework for Node.js.", order: 6 },
  { id: "python", name: "Python", icon: "python", category: "Language", description: "General-purpose programming language.", order: 7 },
  { id: "git", name: "Git", icon: "git", category: "Tools", description: "Distributed version control system.", order: 8 },
  { id: "docker", name: "Docker", icon: "docker", category: "Tools", description: "Containers for consistent environments.", order: 9 },
  { id: "firebase", name: "Firebase", icon: "firebase", category: "Backend", description: "Backend platform by Google.", order: 10 },
  { id: "mysql", name: "MySQL", icon: "mysql", category: "Database", description: "Relational database management system.", order: 11 },
  { id: "linux", name: "Linux", icon: "linux", category: "Platform", description: "Open-source operating system.", order: 12 },
];