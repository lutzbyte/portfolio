"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projectsCopy } from "@/data/projects";
import { cn } from "@/lib/cn";
import type { Project, ProjectCategory } from "@/types";

type ProjectsExplorerProps = {
  projects: Project[];
  categories: ProjectCategory[];
};

type Filter = ProjectCategory | "all";

export function ProjectsExplorer({ projects, categories }: ProjectsExplorerProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const copy = projectsCopy.filter;

  const filters: Filter[] = ["all", ...categories];
  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <>
      <div
        role="group"
        aria-label={copy.label}
        className="mb-6 flex flex-wrap gap-2"
      >
        {filters.map((item) => {
          const active = item === filter;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={cn(
                "h-10 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                active
                  ? "border-primary/50 bg-primary/15 text-primary-light"
                  : "border-border bg-surface text-foreground-secondary hover:bg-surface-hover hover:text-foreground",
              )}
            >
              {item === "all" ? copy.all : item}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} {copy.resultsSuffix}
      </p>

      {visible.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-foreground-secondary">{copy.empty}</p>
      )}
    </>
  );
}