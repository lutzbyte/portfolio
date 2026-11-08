import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Tag } from "@/components/ui/Tag";
import { projectsCopy } from "@/data/projects";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  /** h3 di home (di bawah h2 section), h2 di /projects (di bawah h1). */
  headingLevel?: "h2" | "h3";
};

const iconLink =
  "flex size-10 items-center justify-center rounded-full text-foreground-secondary transition-colors duration-200 hover:bg-surface-hover hover:text-foreground";

export function ProjectCard({ project, headingLevel = "h3" }: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <GlassSurface
      as="article"
      interactive
      className="group relative flex h-full flex-col overflow-hidden"
    >
      <ProjectThumbnail
        name={project.name}
        thumbnail={project.thumbnail}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-foreground-muted">
          {project.category}
        </p>
        <Heading className="mt-1 text-lg font-bold text-foreground">
          {project.name}
        </Heading>
        <p className="mt-1 text-sm text-foreground-secondary">
          {project.tagline}
        </p>

        <ul
          aria-label={projectsCopy.detail.technologies}
          className="mt-4 flex flex-wrap gap-1.5"
        >
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Tag className="px-2.5 py-0.5">{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light after:absolute after:inset-0"
          >
            {projectsCopy.viewProjectLabel}
            <span className="sr-only">: {project.name}</span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5"
            />
          </Link>

          <div className="relative z-10 flex items-center">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectsCopy.detail.repository}: ${project.name} (opens in a new tab)`}
                className={iconLink}
              >
                <BrandIcon name="github" className="size-4" />
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectsCopy.detail.liveDemo}: ${project.name} (opens in a new tab)`}
                className={iconLink}
              >
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </GlassSurface>
  );
}