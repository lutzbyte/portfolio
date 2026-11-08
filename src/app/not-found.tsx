import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { projectsCopy } from "@/data/projects";

export default function NotFound() {
  const copy = projectsCopy.notFound;

  return (
    <main id="main" className="pt-16">
      <Section id="not-found" labelledBy="not-found-title">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-sm text-primary-light">{copy.eyebrow}</p>
          <h1 id="not-found-title" className="text-heading mt-3 text-foreground">
            {copy.title}
          </h1>
          <p className="mt-3 text-foreground-secondary">{copy.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/projects" arrow>
              {copy.browse}
            </Button>
            <Button href="/" variant="secondary">
              {copy.home}
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}