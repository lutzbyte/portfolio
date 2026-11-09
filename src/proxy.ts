import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { projectsCopy } from "@/data/projects";
import { getProjectSlugs } from "@/lib/content";

// Dengan Cache Components, status 404 harus diputuskan SEBELUM streaming dimulai,
// jadi slug yang tidak dikenal ditolak di sini. notFound() di halaman hanya
// menghasilkan status 200 + noindex.

function decodeSlug(raw: string): string | null {
  try {
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function notFoundResponse(): NextResponse {
  const copy = projectsCopy.notFound;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta name="color-scheme" content="dark">
<title>${escapeHtml(copy.title)}</title>
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:#080b14;color:#f8fafc;font-family:ui-sans-serif,system-ui,sans-serif;text-align:center}
.code{margin:0;font-family:ui-monospace,monospace;font-size:.875rem;color:#a78bfa}
h1{margin:.75rem 0 0;font-size:clamp(1.5rem,5vw,2.125rem);letter-spacing:-.02em}
p{margin:.75rem auto 0;max-width:28rem;color:#a5b4cf;line-height:1.5}
nav{margin-top:1.5rem;display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center}
a{display:inline-flex;align-items:center;min-height:2.75rem;padding:0 1.5rem;border-radius:999px;font-weight:600;font-size:.875rem;text-decoration:none;color:#f8fafc;background:rgba(255,255,255,.08)}
a.primary{background:#8b5cf6}
a:focus-visible{outline:2px solid #38bdf8;outline-offset:3px}
</style>
</head>
<body>
<main>
<p class="code">${escapeHtml(copy.eyebrow)}</p>
<h1>${escapeHtml(copy.title)}</h1>
<p>${escapeHtml(copy.description)}</p>
<nav>
<a class="primary" href="/projects">${escapeHtml(copy.browse)}</a>
<a href="/">${escapeHtml(copy.home)}</a>
</nav>
</main>
</body>
</html>`;

  return new NextResponse(html, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}

export function proxy(request: NextRequest) {
  const raw = request.nextUrl.pathname.split("/")[2] ?? "";
  const slug = decodeSlug(raw);

  if (slug !== null && getProjectSlugs().includes(slug)) {
    return NextResponse.next();
  }

  return notFoundResponse();
}

export const config = {
  matcher: "/projects/:slug",
};
