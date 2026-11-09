import type { Skill } from "@/types";

// Menambah skill: tambahkan satu objek. Urutan tampil mengikuti `order` (harus unik).
// `icon` harus salah satu SkillIconKey di src/types/index.ts (ikonnya ada di SkillIcon.tsx).
export const skills: Skill[] = [
  { id: "nextjs", name: "Next.js", icon: "nextjs", category: "Frontend", description: "React framework for full-stack web apps.", order: 1 },
  { id: "typescript", name: "TypeScript", icon: "typescript", category: "Language", description: "Typed superset of JavaScript.", order: 2 },
  { id: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss", category: "Frontend", description: "Utility-first CSS framework.", order: 3 },
  { id: "react", name: "React", icon: "react", category: "Frontend", description: "Library for building user interfaces.", order: 4 },
  { id: "nodejs", name: "Node.js", icon: "nodejs", category: "Backend", description: "JavaScript runtime for server-side apps.", order: 5 },
  { id: "express", name: "Express", icon: "express", category: "Backend", description: "Minimal web framework for Node.js.", order: 6 },
  { id: "python", name: "Python", icon: "python", category: "Language", description: "General-purpose programming language.", order: 7 },
  { id: "pandas", name: "Pandas", icon: "pandas", category: "Data", description: "Data analysis and manipulation library for Python.", order: 8 },
  { id: "numpy", name: "NumPy", icon: "numpy", category: "Data", description: "Numerical computing with arrays in Python.", order: 9 },
  { id: "jupyter", name: "Jupyter", icon: "jupyter", category: "Data", description: "Interactive notebooks for analysis and experiments.", order: 10 },
  { id: "scikit-learn", name: "Scikit-learn", icon: "scikitlearn", category: "Data", description: "Machine learning library for Python.", order: 11 },
  { id: "matplotlib", name: "Matplotlib", icon: "matplotlib", category: "Data", description: "Data visualization library for Python.", order: 12 },
  { id: "excel", name: "Excel", icon: "excel", category: "Data", description: "Spreadsheets for data analysis and reporting.", order: 13 },
  { id: "git", name: "Git", icon: "git", category: "Tools", description: "Distributed version control system.", order: 14 },
  { id: "docker", name: "Docker", icon: "docker", category: "Tools", description: "Containers for consistent environments.", order: 15 },
  { id: "postgresql", name: "PostgreSQL", icon: "postgresql", category: "Database", description: "Advanced open-source relational database.", order: 16 },
  { id: "mysql", name: "MySQL", icon: "mysql", category: "Database", description: "Relational database management system.", order: 17 },
  { id: "linux", name: "Linux", icon: "linux", category: "Platform", description: "Open-source operating system.", order: 18 },
];