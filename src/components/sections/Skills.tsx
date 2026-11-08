import { SkillsShowcase } from "@/components/sections/SkillsShowcase";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { getSkills, getSkillsByCategory } from "@/lib/content";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SkillsShowcase
        copy={profile.sections.skills}
        skills={getSkills()}
        groups={getSkillsByCategory()}
      />
    </Section>
  );
}