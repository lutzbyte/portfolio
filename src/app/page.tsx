import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  description: `${profile.tagline} ${profile.intro}`,
  path: "/",
  ogTitle: `${profile.name} | ${profile.jobTitle}`,
});

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      <Skills />
      <FeaturedProjects />
      <Journey />
      <Reveal>
        <Contact />
      </Reveal>
    </main>
  );
}