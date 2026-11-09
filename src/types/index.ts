export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type SocialPlatform = "github" | "youtube" | "instagram" | "x" | "linkedin";

export type StatIcon = "code" | "folder" | "heart";

export interface ProfileStat {
  id: string;
  value: string;
  label: string;
  icon: StatIcon;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface SkillsCopy extends SectionCopy {
  viewAllLabel: string;
  viewLessLabel: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroCopy {
  keywords: string[];
  scrollLabel: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
}

export interface Profile {
  name: string;
  jobTitle: string;
  tagline: string;
  intro: string;
  location: string;
  email?: string;
  availability: { isAvailable: boolean; label: string };
  hero: HeroCopy;
  about: { eyebrow: string; greeting: string; bio: string; tags: string[] };
  stats: ProfileStat[];
  quote: { text: string; author: string };
  sections: {
    skills: SkillsCopy;
    projects: SectionCopy;
    journey: SectionCopy;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
  images: { hero: ImageAsset; about: ImageAsset };
}

export type ProjectStatus = "completed" | "in-progress" | "archived";

export type ProjectCategory = "Web App" | "Mobile App" | "Template" | "Tool";

export interface ProjectDetail {
  overview?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  screenshots?: ImageAsset[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: ImageAsset | null;
  technologies: string[];
  category: ProjectCategory;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  status: ProjectStatus;
  order: number;
  detail?: ProjectDetail;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Language"
  | "Data"
  | "Database"
  | "Tools"
  | "Platform";

export type SkillIconKey =
  | "nextjs"
  | "typescript"
  | "tailwindcss"
  | "react"
  | "nodejs"
  | "express"
  | "python"
  | "pandas"
  | "numpy"
  | "jupyter"
  | "scikitlearn"
  | "matplotlib"
  | "excel"
  | "git"
  | "docker"
  | "postgresql"
  | "mysql"
  | "linux";

export interface Skill {
  id: string;
  name: string;
  icon: SkillIconKey;
  category: SkillCategory;
  description: string;
  order: number;
}

export type ExperienceType = "work" | "education";

export interface Experience {
  id: string;
  year: string;
  title: string;
  description: string;
  type: ExperienceType;
  order: number;
}

export interface SocialLink {
  platform: string;
  label: string;
  username: string;
  url: string;
  icon: SocialPlatform;
  visible: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  url: string;
  anchor: string;
  order: number;
}