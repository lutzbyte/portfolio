import { experience } from "@/data/experience";
import { navigation } from "@/data/navigation";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { socials } from "@/data/socials";
import type {
  Experience,
  NavItem,
  Project,
  ProjectCategory,
  Skill,
  SkillCategory,
  SocialLink,
} from "@/types";

const byOrder = <T extends { order: number }>(a: T, b: T): number =>
  a.order - b.order;

export function getNavigation(): NavItem[] {
  return [...navigation].sort(byOrder);
}

export function getVisibleSocials(): SocialLink[] {
  return socials.filter((s) => s.visible && s.url.trim() !== "");
}

export function getSkills(): Skill[] {
  return [...skills].sort(byOrder);
}

export function getSkillsByCategory(): Array<{
  category: SkillCategory;
  skills: Skill[];
}> {
  const groups = new Map<SkillCategory, Skill[]>();
  for (const skill of getSkills()) {
    const list = groups.get(skill.category) ?? [];
    list.push(skill);
    groups.set(skill.category, list);
  }
  return Array.from(groups, ([category, items]) => ({ category, skills: items }));
}

export function getProjects(): Project[] {
  return [...projects].sort(byOrder);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectCategories(): ProjectCategory[] {
  return Array.from(new Set(getProjects().map((p) => p.category)));
}

export function getExperience(): Experience[] {
  return [...experience].sort(byOrder);
}