const FALLBACK_URL = "http://localhost:3000";

export const siteUrl: string = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL
).replace(/\/+$/, "");

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}