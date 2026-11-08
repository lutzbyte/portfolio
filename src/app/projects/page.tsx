import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsCopy } from "@/data/projects";
import { getProjectCategories, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: projectsCopy.index.title,
  description: projectsCopy.index.description,
};

export default function ProjectsPage() {
  const copy = projectsCopy.index;

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