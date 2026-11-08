import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { projectsCopy } from "@/data/projects";
import { getProjectCategories, getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const copy = projectsCopy.index;

export const metadata: Metadata = buildMetadata({
  title: copy.title,
  description: `${copy.description} Projects by ${profile.name} across ${getProjectCategories().join(", ")}.`,
  path: "/projects",
  ogTitle: `${copy.title} | ${profile.name}`,
});

export default function ProjectsPage() {
  return (
    <main id="main" className="pt-16">
      <Section id="all-projects" labelledBy="all-projects-title">
        <SectionHeading
          as="h1"
          id="all-projects-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <ProjectsExplorer
          projects={getProjects()}
          categories={getProjectCategories()}
        />
      </Section>
    </main>
  );
}