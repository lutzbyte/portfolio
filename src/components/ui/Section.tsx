import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  id: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("section-y scroll-mt-24", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}