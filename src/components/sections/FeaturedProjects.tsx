import { StaggerList, StaggerListItem } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { projectsCopy } from "@/data/projects";
import { getFeaturedProjects } from "@/lib/content";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();
  const copy = profile.sections.projects;

  if (projects.length === 0) return null;

  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        action={
          <Button href="/projects" variant="secondary" size="sm" arrow>
            {projectsCopy.viewAllLabel}
          </Button>
        }
      />

      <StaggerList
        gap={0.1}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <StaggerListItem key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </StaggerListItem>
        ))}
      </StaggerList>
    </Section>
  );
}