import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  leadingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

type LinkButtonProps = BaseProps & {
  href: string;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type NativeButtonProps = BaseProps & {
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-light",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-hover hover:border-primary-light/40",
  ghost: "text-foreground-secondary hover:text-foreground hover:bg-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

const externalPattern = /^(https?:\/\/|mailto:|tel:)/;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    leadingIcon,
    className,
    children,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {leadingIcon}
      <span>{children}</span>
      {arrow ? <ArrowRight aria-hidden="true" className="size-4" /> : null}
    </>
  );

  if (props.href !== undefined) {
    const isHttp = props.href.startsWith("http");

    if (externalPattern.test(props.href)) {
      return (
        <a
          href={props.href}
          className={classes}
          aria-label={props["aria-label"]}
          target={isHttp ? "_blank" : undefined}
          rel={isHttp ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={props.href}
        className={classes}
        aria-label={props["aria-label"]}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classes}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
    >
      {content}
    </button>
  );
}