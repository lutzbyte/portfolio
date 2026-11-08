import type { Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

export const VIEWPORT = { once: true, amount: 0.2 } as const;

// Blok besar (mis. seluruh section).
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Item di dalam daftar atau grid.
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const stagger = (gap = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: 0.05 } },
});