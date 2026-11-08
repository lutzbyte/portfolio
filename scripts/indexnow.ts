// Kirim daftar URL ke IndexNow (Bing dan mesin lain yang mendukung).
// Jalankan SETELAH deploy: bun run scripts/indexnow.ts
import { getProjectSlugs } from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/site";

const ENDPOINT = "https://api.indexnow.org/indexnow";

async function main(): Promise<number> {
  const key = process.env.INDEXNOW_KEY?.trim();

  if (!key) {
    console.error("INDEXNOW_KEY belum diisi di .env.local.");
    return 1;
  }
  if (siteUrl.includes("localhost")) {
    console.error(
      "NEXT_PUBLIC_SITE_URL masih localhost. Isi domain produksi dulu.",
    );
    return 1;
  }

  const urlList = [
    absoluteUrl("/"),
    absoluteUrl("/projects"),
    ...getProjectSlugs().map((slug) => absoluteUrl(`/projects/${slug}`)),
  ];

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key,
      keyLocation: absoluteUrl(`/${key}.txt`),
      urlList,
    }),
  });

  console.log(`IndexNow: ${response.status} ${response.statusText}`);
  console.log(`${urlList.length} URL dikirim.`);

  if (response.status === 200 || response.status === 202) return 0;

  console.error("Gagal. Pastikan file kunci dapat dibuka di keyLocation.");
  return 1;
}

main().then((code) => process.exit(code));