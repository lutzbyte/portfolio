# RUS MANTO — Personal Portfolio

Website portfolio dark glassmorphism. Konten dikelola lewat `src/data/`,
jadi menambah proyek atau skill tidak perlu menyentuh komponen.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Motion ·
Lucide React · React Hook Form · Zod · Bun

## Menjalankan (Termux)

```bash
bun install
cp .env.example .env.local   # lalu isi nilainya
bun run dev                  # http://localhost:3000
```

Script `dev` dan `build` memakai `--webpack` karena Termux menjalankan Next.js
dengan binding WASM. Di mesin lain, flag itu boleh dihapus.

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `bun run dev` | Server development |
| `bun run build` | Build produksi |
| `bun run lint` | ESLint |
| `bunx tsc --noEmit` | Cek tipe |
| `bun run scripts/validate-data.ts` | Validasi seluruh data konten |
| `bash scripts/qa.sh` | Pemeriksaan akhir lengkap (build + uji rute) |
| `python3 scripts/make-og.py` | Buat ulang gambar OG `public/og.jpg` |
| `bun run scripts/indexnow.ts` | Kirim URL ke IndexNow (setelah deploy) |

## Struktur

```
src/
├── app/              # halaman, layout, sitemap, robots, API kontak
├── components/       # layout, sections, projects, ui, motion, seo, contact
├── data/             # SEMUA konten (profile, projects, skills, ...)
├── lib/              # helper (content, seo, jsonld, motion, site)
├── hooks/
└── types/
public/images/        # profile/ dan projects/
scripts/              # QA, validasi, OG, IndexNow
docs/                 # panduan konten dan deploy
```

## Variabel lingkungan

Lihat `.env.example`. Yang wajib untuk produksi: `NEXT_PUBLIC_SITE_URL`.
Form kontak butuh `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`.

## Dokumen lain

- [Mengelola konten](docs/CONTENT.md): menambah proyek, skill, pengalaman, sosial
- [Deploy ke Vercel](docs/DEPLOY.md): GitHub, Vercel, domain, Search Console, Bing