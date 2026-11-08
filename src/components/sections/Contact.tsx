import { Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { contactCopy } from "@/data/contact";
import { profile } from "@/data/profile";

type DetailRowProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

function DetailRow({ icon, label, children }: DetailRowProps) {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary-light"
      >
        {icon}
      </span>
      <div>
        <dt className="text-xs text-foreground-muted">{label}</dt>
        <dd className="text-foreground">{children}</dd>
      </div>
    </div>
  );
}

export function Contact() {
  const { contact, email, location, availability } = profile;
  const labels = contactCopy.detailLabels;

  return (
    <Section id="contact" labelledBy="contact-title">
      <GlassSurface className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div>
          <p className="text-eyebrow flex items-center gap-2 text-foreground-secondary">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            {contact.eyebrow}
          </p>
          <h2 id="contact-title" className="text-heading mt-3 text-foreground">
            {contact.title}
          </h2>
          <p className="mt-3 max-w-md text-foreground-secondary">
            {contact.description}
          </p>

          <dl className="mt-6 space-y-4">
            {email ? (
              <DetailRow
                icon={<Mail className="size-5" />}
                label={labels.email}
              >
                <a
                  href={`mailto:${email}`}
                  className="break-all underline-offset-4 hover:underline"
                >
                  {email}
                </a>
              </DetailRow>
            ) : null}

            {location ? (
              <DetailRow
                icon={<MapPin className="size-5" />}
                label={labels.location}
              >
                {location}
              </DetailRow>
            ) : null}

            {availability.isAvailable ? (
              <DetailRow
                icon={<span className="size-2.5 rounded-full bg-success" />}
                label={labels.availability}
              >
                {availability.label}
              </DetailRow>
            ) : null}
          </dl>

          {email ? (
            <div className="mt-6">
              <Button href={`mailto:${email}`} arrow>
                {contact.ctaLabel}
              </Button>
            </div>
          ) : null}

          <SocialLinks className="mt-6" />
        </div>

        <ContactForm />
      </GlassSurface>
    </Section>
  );
}