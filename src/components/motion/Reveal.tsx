"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import {
  EASE,
  VIEWPORT,
  itemVariants,
  revealVariants,
  stagger,
} from "@/lib/motion";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type StaggerProps = BaseProps & {
  gap?: number;
};

/** Muncul sekali saat masuk viewport. */
export function Reveal({ children, className }: BaseProps) {
  return (
    <m.div
      data-reveal
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </m.div>
  );
}

/** <ul> yang menampilkan anak-anaknya berurutan. Anak: StaggerListItem. */
export function StaggerList({ children, className, gap = 0.08 }: StaggerProps) {
  return (
    <m.ul
      className={className}
      variants={stagger(gap)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </m.ul>
  );
}

/** Versi <ol> untuk daftar berurutan seperti timeline. */
export function StaggerOrderedList({
  children,
  className,
  gap = 0.12,
}: StaggerProps) {
  return (
    <m.ol
      className={className}
      variants={stagger(gap)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </m.ol>
  );
}

export function StaggerListItem({ children, className }: BaseProps) {
  return (
    <m.li data-reveal className={className} variants={itemVariants}>
      {children}
    </m.li>
  );
}

/** Gambar membesar halus dari skala 1.1 saat masuk viewport. */
export function ImageReveal({ children }: { children: ReactNode }) {
  return (
    <m.div
      data-reveal
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/** Garis timeline yang "tumbuh" dari atas ke bawah. */
export function TimelineLine() {
  return (
    <m.div
      data-reveal
      aria-hidden="true"
      className="absolute bottom-5 left-5 top-5 w-px origin-top bg-border"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE }}
    />
  );
}