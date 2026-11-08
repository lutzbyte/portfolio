import { profile } from "@/data/profile";
import { seoConfig } from "@/data/seo";
import {
  getNavigation,
  getSkills,
  getVisibleSocials,
} from "@/lib/content";
import { projectDescription } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Project, ProjectCategory } from "@/types";

const personId = absoluteUrl("/#person");
const websiteId = absoluteUrl("/#website");

const SOFTWARE_CATEGORIES: readonly ProjectCategory[] = [
  "Web App",
  "Mobile App",
  "Tool",
];

// Person + WebSite. Hanya fakta yang ada di data; field kosong dihilangkan.
export function siteJsonLd(): Record<string, unknown> {
  const sameAs = getVisibleSocials().map((social) => social.url);
  const skills = getSkills().map((skill) => skill.name);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: absoluteUrl("/"),
        jobTitle: profile.jobTitle,
        description: profile.about.bio,
        homeLocation: { "@type": "Place", name: profile.location },
        ...(profile.email ? { email: profile.email } : {}),
        ...(sameAs.length > 0 ? { sameAs } : {}),
        ...(skills.length > 0 ? { knowsAbout: skills } : {}),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: profile.name,
        url: absoluteUrl("/"),
        description: `${profile.tagline} ${profile.intro}`,
        inLanguage: seoConfig.language,
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
    ],
  };
}

export function projectJsonLd(project: Project): Record<string, unknown> {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const isSoftware = SOFTWARE_CATEGORIES.includes(project.category);
  const sameAs = [project.githubUrl, project.liveUrl].filter(
    (value): value is string => Boolean(value),
  );

  const nav = getNavigation();
  const homeLabel = nav.find((item) => item.id === "home")?.label ?? "Home";
  const projectsLabel =
    nav.find((item) => item.id === "projects")?.label ?? "Projects";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": isSoftware ? "SoftwareApplication" : "CreativeWork",
        "@id": `${url}#project`,
        name: project.name,
        description: projectDescription(project),
        url,
        keywords: project.technologies.join(", "),
        author: { "@id": personId },
        isPartOf: { "@id": websiteId },
        inLanguage: seoConfig.language,
        ...(project.thumbnail ? { image: absoluteUrl(project.thumbnail.src) } : {}),
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeLabel, item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: projectsLabel, item: absoluteUrl("/projects") },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
    ],
  };
}