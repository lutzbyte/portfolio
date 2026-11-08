import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassSurfaceProps = {
  as?: "div" | "section" | "article" | "aside" | "li" | "figure";
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

export function GlassSurface({
  as: Tag = "div",
  interactive = false,
  className,
  children,
}: GlassSurfaceProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-glass",
        interactive && "glass-interactive",
        className,
      )}
    >
      {children}
    </Tag>
  );
}