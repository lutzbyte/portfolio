import { Briefcase, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  StaggerListItem,
  StaggerOrderedList,
  TimelineLine,
} from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { getExperience } from "@/lib/content";
import type { ExperienceType } from "@/types";

const typeIcons: Record<ExperienceType, LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
};

export function Journey() {
  const items = getExperience();
  const copy = profile.sections.journey;

  if (items.length === 0) return null;

  return (
    <Section id="journey" labelledBy="journey-title">
      <SectionHeading
        id="journey-title"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <div className="relative max-w-3xl">
        <TimelineLine />
        <StaggerOrderedList className="space-y-6">
          {items.map((item) => {
            const Icon = typeIcons[item.type];
            return (
              <StaggerListItem key={item.id} className="relative flex gap-4">
                <span
                  aria-hidden="true"
                  className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background-secondary text-primary-light"
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1 pt-0.5 sm:grid sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-4">
                  <p className="text-sm font-medium text-primary-light">
                    {item.year}
                  </p>
                  <div className="mt-1 sm:mt-0">
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerListItem>
            );
          })}
        </StaggerOrderedList>
      </div>
    </Section>
  );
}