import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
    </main>
  );
}