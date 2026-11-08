type LogoProps = {
  brand: string;
};

export function Logo({ brand }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="size-8 text-primary-light"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 26 11.5 8 16 17l4.5-9L28 26" />
      </svg>
      <span className="text-sm font-bold tracking-tight text-foreground">
        {brand}
      </span>
    </span>
  );
}