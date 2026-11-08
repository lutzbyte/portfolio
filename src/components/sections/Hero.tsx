import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";

export function Hero() {
  const { hero, images, availability } = profile;
  const [firstName, ...restName] = profile.name.split(" ");

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col overflow-hidden pt-16 lg:min-h-[44rem] lg:justify-center lg:pt-20 xl:min-h-[48rem]"
    >
      {/* Artwork: di atas teks pada mobile, di kanan pada desktop. */}
      <div className="relative order-first -mb-20 aspect-[4/5] max-h-[28rem] w-full sm:max-h-[34rem] lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:mb-0 lg:aspect-auto lg:max-h-none lg:w-[58%]">
        <Parallax className="absolute -inset-y-8 inset-x-0" distance={32}>
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="hero-art-mask object-cover object-[60%_18%] lg:object-[50%_30%]"
          />
        </Parallax>
      </div>

      <Container className="relative z-10 pb-12 lg:pb-0">
        <div className="max-w-xl lg:max-w-[30rem] xl:max-w-xl">
          {availability.isAvailable ? (
            <p className="rise rise-d1 text-eyebrow inline-flex items-center gap-2 text-foreground-secondary">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-success"
              />
              {availability.label}
            </p>
          ) : null}

          <h1 id="hero-title" className="text-display mt-5 text-foreground">
            <span className="rise rise-d2 inline-block">{firstName}</span>{" "}
            <span className="rise rise-d3 text-brand-gradient inline-block">
              {restName.join(" ")}
            </span>
          </h1>

          <p className="rise rise-d4 text-lead mt-5 text-primary-light">
            {profile.tagline}
          </p>
          <p className="rise rise-d5 mt-4 max-w-md text-foreground-secondary">
            {profile.intro}
          </p>

          <div className="rise rise-d6 mt-7 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} arrow>
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              leadingIcon={<Mail aria-hidden="true" className="size-4" />}
            >
              {hero.secondaryCta.label}
            </Button>
          </div>

          <SocialLinks className="rise rise-d7 mt-6" />
        </div>
      </Container>

      <aside
        aria-hidden="true"
        className="glass absolute right-[5%] top-28 z-10 hidden rotate-[4deg] rounded-2xl px-6 py-5 lg:block"
      >
        <ul className="space-y-1.5 font-mono text-sm text-foreground-secondary">
          {hero.keywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </aside>

      <Link
        href="/#about"
        className="absolute bottom-6 right-[5%] z-10 hidden items-center gap-3 text-xs text-foreground-secondary transition-colors hover:text-foreground lg:flex"
      >
        <span>{hero.scrollLabel}</span>
        <span
          aria-hidden="true"
          className="relative block h-7 w-4 rounded-full border border-primary-light/60"
        >
          <span className="absolute left-1/2 top-1.5 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-primary-light" />
        </span>
      </Link>
    </section>
  );
}