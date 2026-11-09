import type { SkillIconKey } from "@/types";

type SkillIconProps = {
  name: SkillIconKey;
  className?: string;
};

const FONT = "ui-sans-serif, system-ui, sans-serif";

// Ikon sederhana buatan sendiri (bukan logo resmi) agar tanpa dependency tambahan.
export function SkillIcon({ name, className = "size-7" }: SkillIconProps) {
  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: "false",
    className,
  } as const;

  switch (name) {
    case "nextjs":
      return (
        <svg {...common} fill="none">
          <circle cx="12" cy="12" r="10" fill="#0b0f1a" stroke="#f8fafc" strokeWidth="1.5" />
          <path
            d="M9 16V8l7 9.5M15.5 8v4"
            stroke="#f8fafc"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "typescript":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178c6" />
          <text
            x="12"
            y="16.2"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="700"
            fontFamily={FONT}
            fill="#ffffff"
          >
            TS
          </text>
        </svg>
      );

    case "tailwindcss":
      return (
        <svg {...common}>
          <path
            fill="#38bdf8"
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
          />
        </svg>
      );

    case "react":
      return (
        <svg {...common}>
          <g stroke="#61dafb" strokeWidth="1.2" fill="none">
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          </g>
          <circle cx="12" cy="12" r="1.8" fill="#61dafb" />
        </svg>
      );

    case "nodejs":
      return (
        <svg {...common}>
          <path
            d="M12 2.5 20.5 7.25v9.5L12 21.5l-8.5-4.75v-9.5z"
            fill="none"
            stroke="#5fa04e"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <text
            x="12"
            y="14.8"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="700"
            fontFamily={FONT}
            fill="#5fa04e"
          >
            JS
          </text>
        </svg>
      );

    case "express":
      return (
        <svg {...common}>
          <text
            x="12"
            y="16.4"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fontFamily={FONT}
            fill="#e2e8f0"
          >
            EX
          </text>
        </svg>
      );

    case "python":
      return (
        <svg {...common}>
          <rect x="3" y="2.5" width="12" height="12" rx="4.5" fill="#3776ab" />
          <rect x="9" y="9.5" width="12" height="12" rx="4.5" fill="#ffd43b" />
          <circle cx="7.5" cy="6.5" r="1" fill="#ffffff" />
          <circle cx="16.5" cy="17.5" r="1" fill="#0b0f1a" />
        </svg>
      );

    case "pandas":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="4" height="9" rx="1" fill="#ffca00" />
          <rect x="10" y="8" width="4" height="13" rx="1" fill="#e70488" />
          <rect x="16" y="3" width="4" height="11" rx="1" fill="#e2e8f0" />
        </svg>
      );

    case "numpy":
      return (
        <svg {...common}>
          <path d="M12 2.5 20 7v10l-8 4.5L4 17V7z" fill="#4dabcf" />
          <path
            d="M12 12 4 7M12 12l8-5M12 12v9.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "jupyter":
      return (
        <svg {...common} fill="none">
          <path
            d="M4 8.5c2-2.2 5-3.5 8-3.5s6 1.3 8 3.5"
            stroke="#f37726"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M4 15.5c2 2.2 5 3.5 8 3.5s6-1.3 8-3.5"
            stroke="#f37726"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.4" fill="#9e9e9e" />
          <circle cx="19.5" cy="4" r="1.2" fill="#9e9e9e" />
          <circle cx="4.5" cy="20" r="1.2" fill="#9e9e9e" />
        </svg>
      );

    case "scikitlearn":
      return (
        <svg {...common}>
          <circle cx="9" cy="12" r="7" fill="#f7931e" />
          <circle cx="15" cy="12" r="7" fill="#29abe2" fillOpacity="0.85" />
        </svg>
      );

    case "matplotlib":
      return (
        <svg {...common} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3.5V20h16.5" stroke="#94a3b8" strokeWidth="1.6" />
          <path d="M7 15l4-5 3 3 5-7" stroke="#38bdf8" strokeWidth="1.8" />
          <path d="M7 18l4-2 3 1 5-4" stroke="#f97316" strokeWidth="1.8" />
        </svg>
      );

    case "excel":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#1d6f42" />
          <text
            x="12"
            y="16.6"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="800"
            fontFamily={FONT}
            fill="#ffffff"
          >
            X
          </text>
        </svg>
      );

    case "git":
      return (
        <svg {...common}>
          <rect
            x="4.2"
            y="4.2"
            width="15.6"
            height="15.6"
            rx="2.2"
            transform="rotate(45 12 12)"
            fill="#f05032"
          />
          <path
            d="M9.5 8.5v7M9.5 12l5-2.2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <g fill="#ffffff">
            <circle cx="9.5" cy="8.5" r="1.3" />
            <circle cx="9.5" cy="15.5" r="1.3" />
            <circle cx="14.5" cy="9.8" r="1.3" />
          </g>
        </svg>
      );

    case "docker":
      return (
        <svg {...common} fill="#2496ed">
          <rect x="4.5" y="9.2" width="2.8" height="2.8" rx="0.4" />
          <rect x="7.9" y="9.2" width="2.8" height="2.8" rx="0.4" />
          <rect x="11.3" y="9.2" width="2.8" height="2.8" rx="0.4" />
          <rect x="14.7" y="9.2" width="2.8" height="2.8" rx="0.4" />
          <rect x="7.9" y="6.2" width="2.8" height="2.8" rx="0.4" />
          <rect x="11.3" y="6.2" width="2.8" height="2.8" rx="0.4" />
          <rect x="14.7" y="6.2" width="2.8" height="2.8" rx="0.4" />
          <rect x="11.3" y="3.2" width="2.8" height="2.8" rx="0.4" />
          <path d="M2 12.5h17.5c0 4-3.3 7-7.7 7-4.6 0-9.1-1.9-9.8-7z" />
        </svg>
      );

    case "postgresql":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" fill="#336791" />
          <text
            x="12"
            y="15.6"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="800"
            fontFamily={FONT}
            fill="#ffffff"
          >
            PG
          </text>
        </svg>
      );

    case "mysql":
      return (
        <svg {...common} fill="none" stroke="#4da3c4" strokeWidth="1.6">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );

    case "linux":
      return (
        <svg {...common}>
          <ellipse cx="9" cy="21.4" rx="2.4" ry="1" fill="#fbbf24" />
          <ellipse cx="15" cy="21.4" rx="2.4" ry="1" fill="#fbbf24" />
          <ellipse cx="12" cy="14" rx="6.2" ry="7.5" fill="#1f2937" stroke="#94a3b8" strokeWidth="1" />
          <ellipse cx="12" cy="15.5" rx="3.6" ry="5.2" fill="#f1f5f9" />
          <ellipse cx="12" cy="7" rx="3.8" ry="3.8" fill="#1f2937" stroke="#94a3b8" strokeWidth="1" />
          <path d="M10.6 8.2h2.8L12 9.9z" fill="#fbbf24" />
          <circle cx="10.6" cy="6.4" r="0.6" fill="#f8fafc" />
          <circle cx="13.4" cy="6.4" r="0.6" fill="#f8fafc" />
        </svg>
      );
  }
}