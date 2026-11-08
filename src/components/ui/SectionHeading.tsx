import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-eyebrow flex items-center gap-2 text-foreground-secondary">
          <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
          {eyebrow}
        </p>
        <Heading id={id} className="text-heading mt-3 text-foreground">
          {title}
        </Heading>
        {description ? (
          <p className="mt-2 text-foreground-secondary">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}