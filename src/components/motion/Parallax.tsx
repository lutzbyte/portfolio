"use client";

import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Jarak geser maksimum (px) selama 700px pertama scroll. */
  distance?: number;
};

export function Parallax({ children, className, distance = 32 }: ParallaxProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, distance]);

  return (
    <m.div
      className={className}
      style={reduceMotion ? undefined : { y, willChange: "transform" }}
    >
      {children}
    </m.div>
  );
}