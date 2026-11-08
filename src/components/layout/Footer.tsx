import { cacheLife } from "next/cache";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { footerCopy } from "@/data/navigation";
import { profile } from "@/data/profile";
import { getNavigation } from "@/lib/content";

// Dengan Cache Components, nilai tidak stabil seperti new Date() hanya boleh
// dihitung di dalam fungsi ber-cache. Tahun direvalidasi sekali sehari.
async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const items = getNavigation();
  const year = await getCurrentYear();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div>
          <Link href="/" aria-label={`${profile.name} home`} className="inline-block rounded-full">
            <Logo brand={profile.name} />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-foreground-muted">
            {profile.tagline}
          </p>
        </div>

        <nav
          aria-label={footerCopy.navLabel}
          className="md:order-3 md:col-span-2 lg:order-none lg:col-span-1"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="inline-block py-2 text-sm text-foreground-secondary transition-colors hover:text-primary-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="md:justify-self-end" />
      </Container>

      <div className="border-t border-border">
        <Container className="py-4">
          <p className="text-xs text-foreground-muted">
            © {year} {profile.name}. {footerCopy.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}