import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-eyebrow flex items-center gap-2 text-foreground-secondary">
          <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-heading mt-3 text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-foreground-secondary">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}