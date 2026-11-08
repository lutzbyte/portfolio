import { Code, FolderCheck, Heart, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { profile } from "@/data/profile";
import type { StatIcon } from "@/types";

const statIcons: Record<StatIcon, LucideIcon> = {
  code: Code,
  folder: FolderCheck,
  heart: Heart,
};

export function About() {
  const { about, images, stats, quote } = profile;

  return (
    <Section id="about" labelledBy="about-title">
      <GlassSurface
        as="article"
        className="grid gap-6 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_auto_16rem] xl:items-center xl:gap-8"
      >
        <div className="flex flex-col gap-5 sm:flex-row md:col-span-2 xl:col-span-1">
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-square sm:w-44">
            <Image
              src={images.about.src}
              alt={images.about.alt}
              fill
              sizes="(min-width: 640px) 11rem, 100vw"
              className="object-cover object-[50%_40%]"
            />
          </div>

          <div className="min-w-0">
            <p className="text-eyebrow flex items-center gap-2 text-foreground-secondary">
              <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
              {about.eyebrow}
            </p>
            <h2 id="about-title" className="text-heading mt-3 text-foreground">
              {about.greeting}
            </h2>
            <p className="mt-3 max-w-prose text-foreground-secondary">
              {about.bio}
            </p>
            <ul aria-label="Highlights" className="mt-4 flex flex-wrap gap-2">
              {about.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="flex flex-col gap-4 xl:border-l xl:border-border xl:pl-8">
          {stats.map((stat) => {
            const Icon = statIcons[stat.icon];
            return (
              <div key={stat.id} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary-light"
                >
                  <Icon className="size-5" />
                </span>
                <div className="flex flex-col-reverse">
                  <dt className="text-xs text-foreground-secondary">
                    {stat.label}
                  </dt>
                  <dd className="text-xl font-bold leading-tight text-foreground">
                    {stat.value}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>

        <figure className="rounded-xl border border-border bg-background/40 p-5">
          <Quote aria-hidden="true" className="size-7 text-primary/60" />
          <blockquote className="mt-3 text-lg font-medium leading-snug text-foreground">
            “{quote.text}”
          </blockquote>
          <figcaption className="mt-4 text-sm italic text-primary-light">
            {quote.author}
          </figcaption>
        </figure>
      </GlassSurface>
    </Section>
  );
}