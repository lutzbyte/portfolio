"use client";

import { useEffect, useState } from "react";

/**
 * Mengembalikan id section yang sedang melewati garis pantau di sekitar
 * tengah layar. `scope` (mis. pathname) memicu pemasangan ulang observer
 * ketika halaman berganti tanpa me-reload layout.
 */
export function useActiveSection(ids: readonly string[], scope: string): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const targets = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, scope]);

  return active;
}