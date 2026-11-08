"use client";

import { useEffect, useState } from "react";

// Hanya aktif di `bun run dev`. Pada build produksi komponen ini tidak merender apa pun.
const ENABLED = process.env.NODE_ENV === "development";

type Info = { width: number; count: number };

export function OverflowDebug() {
  const [info, setInfo] = useState<Info>({ width: 0, count: 0 });

  useEffect(() => {
    if (!ENABLED) return;

    const style = document.createElement("style");
    style.textContent =
      "[data-overflow]{outline:2px solid #ef4444!important;outline-offset:-2px}";
    document.head.appendChild(style);

    const scan = () => {
      const limit = document.documentElement.clientWidth;
      let count = 0;

      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        el.removeAttribute("data-overflow");
        if (el.closest("[aria-hidden='true'], [data-overflow-badge]")) return;

        const rect = el.getBoundingClientRect();
        if (rect.width <= 1 || rect.height <= 1) return;

        if (rect.right > limit + 1 || rect.left < -1) {
          el.setAttribute("data-overflow", "1");
          count += 1;
        }
      });

      setInfo({ width: limit, count });
    };

    const first = window.setTimeout(scan, 400);
    const timer = window.setInterval(scan, 1500);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
      style.remove();
    };
  }, []);

  if (!ENABLED || info.width === 0) return null;

  return (
    <div
      data-overflow-badge
      className="pointer-events-none fixed bottom-2 left-2 z-[60] rounded-md bg-black/80 px-2 py-1 font-mono text-[11px] text-white"
    >
      {info.width}px · overflow {info.count}
    </div>
  );
}