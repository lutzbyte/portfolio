import { Reveal } from "@/components/motion/Reveal";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";

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