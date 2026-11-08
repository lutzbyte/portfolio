"use client";

import { ArrowRight } from "lucide-react";
import * as m from "motion/react-m";
import { useState } from "react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { cn } from "@/lib/cn";
import { VIEWPORT, itemVariants, stagger } from "@/lib/motion";
import type { Skill, SkillCategory, SkillsCopy } from "@/types";

type SkillGroup = {
  category: SkillCategory;
  skills: Skill[];
};

type SkillsShowcaseProps = {
  copy: SkillsCopy;
  skills: Skill[];
  groups: SkillGroup[];
};

export function SkillsShowcase({ copy, skills, groups }: SkillsShowcaseProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SectionHeading
        id="skills-title"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        action={
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="skills-details"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold whitespace-nowrap text-foreground transition-colors duration-200 hover:border-primary-light/40 hover:bg-surface-hover"
          >
            <span>{open ? copy.viewLessLabel : copy.viewAllLabel}</span>
            <ArrowRight
              aria-hidden="true"
              className={cn(
                "size-4 transition-transform duration-200",
                open && "rotate-90",
              )}
            />
          </button>
        }
      />

      <m.ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {skills.map((skill) => (
          <m.li key={skill.id} data-reveal variants={itemVariants}>
            <div className="glass glass-interactive group flex min-h-14 items-center gap-3 rounded-xl px-3 py-2 sm:px-4">
              <SkillIcon
                name={skill.icon}
                className="size-7 shrink-0 motion-safe:transition-transform motion-safe:duration-200 group-hover:scale-110"
              />
              <span className="min-w-0 text-sm font-medium leading-tight text-foreground-secondary transition-colors duration-200 group-hover:text-foreground">
                {skill.name}
              </span>
            </div>
          </m.li>
        ))}
      </m.ul>

      <div id="skills-details" hidden={!open} className="mt-6">
        <GlassSurface className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold text-primary-light">
                {group.category}
              </h3>
              <dl className="mt-3 space-y-3">
                {group.skills.map((skill) => (
                  <div key={skill.id}>
                    <dt className="text-sm font-medium text-foreground">
                      {skill.name}
                    </dt>
                    <dd className="text-sm text-foreground-secondary">
                      {skill.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </GlassSurface>
      </div>
    </>
  );
}