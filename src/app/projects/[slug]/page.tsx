import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Tag } from "@/components/ui/Tag";
import { projectsCopy } from "@/data/projects";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import type { ProjectStatus } from "@/types";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const statusDot: Record<ProjectStatus, string> = {
  completed: "bg-success",
  "in-progress": "bg-primary-light",
  archived: "bg-foreground-muted",
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: projectsCopy.notFound.title };

  return {
    title: project.name,
    description: project.description,
  };
}

type DetailBlockProps = {
  id: string;
  title: string;
  children: ReactNode;
};

function DetailBlock({ id, title, children }: DetailBlockProps) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 text-foreground-secondary">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const copy = projectsCopy.detail;
  const detail = project.detail;
  const features = detail?.features ?? [];
  const screenshots = detail?.screenshots ?? [];
  const hasDetail = Boolean(
    detail?.overview ||
      detail?.problem ||
      detail?.solution ||
      features.length > 0 ||
      screenshots.length > 0,
  );

  return (
    <main id="main" className="pt-16">
      <article className="section-y">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {copy.back}
          </Link>

          <header className="mt-6 max-w-3xl">
            <p className="text-eyebrow text-foreground-secondary">
              {project.category}
            </p>
            <h1 className="mt-3 text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-tight tracking-tight text-foreground">
              {project.name}
            </h1>
            <p className="text-lead mt-3 text-primary-light">{project.tagline}</p>
          </header>

          <div className="mt-8 overflow-hidden rounded-glass border border-border">
            <ProjectThumbnail
              name={project.name}
              thumbnail={project.thumbnail}
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority
              className="aspect-[16/9]"
            />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <aside className="order-first lg:order-last lg:self-start">
              <GlassSurface className="p-5 lg:sticky lg:top-24">
                <h2 className="text-sm font-semibold text-primary-light">
                  {copy.info}
                </h2>
                <dl className="mt-3 space-y-3 text-sm">
                  <div>
                    <dt className="text-foreground-muted">{copy.category}</dt>
                    <dd className="text-foreground">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">{copy.status}</dt>
                    <dd className="flex items-center gap-2 text-foreground">
                      <span
                        aria-hidden="true"
                        className={`size-2 rounded-full ${statusDot[project.status]}`}
                      />
                      {copy.statusLabels[project.status]}
                    </dd>
                  </div>
                </dl>

                <h2 className="mt-5 text-sm font-semibold text-primary-light">
                  {copy.technologies}
                </h2>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <Tag className="px-2.5 py-0.5">{tech}</Tag>
                    </li>
                  ))}
                </ul>

                {project.githubUrl || project.liveUrl ? (
                  <div className="mt-5 flex flex-col gap-2">
                    {project.githubUrl ? (
                      <Button
                        href={project.githubUrl}
                        variant="secondary"
                        leadingIcon={<BrandIcon name="github" className="size-4" />}
                      >
                        {copy.repository}
                      </Button>
                    ) : null}
                    {project.liveUrl ? (
                      <Button href={project.liveUrl} arrow>
                        {copy.liveDemo}
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </GlassSurface>
            </aside>

            <div className="min-w-0 space-y-10">
              {detail?.overview ? (
                <DetailBlock id="overview" title={copy.overview}>
                  <p>{detail.overview}</p>
                </DetailBlock>
              ) : null}

              {detail?.problem ? (
                <DetailBlock id="problem" title={copy.problem}>
                  <p>{detail.problem}</p>
                </DetailBlock>
              ) : null}

              {detail?.solution ? (
                <DetailBlock id="solution" title={copy.solution}>
                  <p>{detail.solution}</p>
                </DetailBlock>
              ) : null}

              {features.length > 0 ? (
                <DetailBlock id="features" title={copy.features}>
                  <ul className="list-disc space-y-2 pl-5 marker:text-primary-light">
                    {features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </DetailBlock>
              ) : null}

              {screenshots.length > 0 ? (
                <DetailBlock id="screenshots" title={copy.screenshots}>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {screenshots.map((shot) => (
                      <li key={shot.src}>
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                          className="h-auto w-full rounded-xl border border-border"
                        />
                      </li>
                    ))}
                  </ul>
                </DetailBlock>
              ) : null}

              {!hasDetail ? <p>{copy.empty}</p> : null}
            </div>
          </div>
        </Container>
      </article>
    </main>
  );
}