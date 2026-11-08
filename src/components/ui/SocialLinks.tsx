import { BrandIcon } from "@/components/ui/BrandIcon";
import { cn } from "@/lib/cn";
import { getVisibleSocials } from "@/lib/content";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  const socials = getVisibleSocials();

  if (socials.length === 0) return null;

  return (
    <ul aria-label="Social media" className={cn("flex flex-wrap gap-3", className)}>
      {socials.map((social) => (
        <li key={social.platform}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} (opens in a new tab)`}
            className="glass glass-interactive flex size-11 items-center justify-center rounded-full text-foreground-secondary hover:text-foreground"
          >
            <BrandIcon name={social.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}