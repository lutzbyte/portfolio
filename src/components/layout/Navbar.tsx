"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/types";

type NavbarProps = {
  brand: string;
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
};

export function Navbar({ brand, items, ctaLabel, ctaHref }: NavbarProps) {
  const pathname = usePathname();
  const sectionId = useActiveSection(
    items.map((item) => item.anchor),
    pathname,
  );
  const [scrolled, setScrolled] = useState(false);
  // Menu terbuka hanya untuk path tempat ia dibuka, jadi otomatis menutup saat pindah halaman.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const open = menuPath === pathname;
  const activeAnchor =
    pathname === "/"
      ? sectionId
      : pathname.startsWith("/projects")
        ? "projects"
        : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuPath(null);
        buttonRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 48rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuPath(null);
    };

    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onChange);
    };
  }, [open]);

  const toggleMenu = () => setMenuPath(open ? null : pathname);

  const handlePanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenuPath(null);
    }
  };

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        solid
          ? "border-border bg-background/75 backdrop-blur-xl"
          : "border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label={`${brand} home`}
          className="justify-self-start rounded-full"
        >
          <Logo brand={brand} />
        </Link>

        <nav aria-label="Primary" className="glass hidden rounded-full p-1 md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const active = item.anchor === activeAnchor;
              return (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                      active
                        ? "bg-primary/15 text-primary-light ring-1 ring-inset ring-primary/40"
                        : "text-foreground-secondary hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden justify-self-end md:block">
          <Button href={ctaHref} variant="secondary" size="sm" arrow>
            {ctaLabel}
          </Button>
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={toggleMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="glass glass-interactive inline-flex size-11 items-center justify-center rounded-full text-foreground md:hidden"
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto md:hidden"
          onClick={handlePanelClick}
        >
          <div className="container-page pb-5 pt-2">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {items.map((item) => {
                  const active = item.anchor === activeAnchor;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.url}
                        aria-current={active ? "location" : undefined}
                        className={cn(
                          "flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors duration-200",
                          active
                            ? "bg-primary/15 text-primary-light"
                            : "text-foreground-secondary hover:bg-surface hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-4">
              <Button href={ctaHref} size="lg" arrow className="w-full">
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}