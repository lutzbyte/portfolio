import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  className?: string;
  children: ReactNode;
};

export function Tag({ className, children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}