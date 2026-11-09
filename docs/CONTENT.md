# Mengelola Konten

Semua konten ada di `src/data/`. Setelah mengubah, jalankan:

```bash
bun run scripts/validate-data.ts
```

Skrip ini memeriksa slug ganda, URL tidak valid, file gambar yang hilang,
dan memberi peringatan untuk data yang masih kosong.

## Menambah proyek

Edit `src/data/projects.ts`, tambahkan satu objek ke array `projects`:

```ts
{
  slug: "nama-proyek",            // huruf kecil, angka, tanda hubung; jadi URL /projects/nama-proyek
  name: "Nama Proyek",
  tagline: "Satu kalimat singkat",
  description: "Deskripsi singkat.",
  thumbnail: {
    src: "/images/projects/nama-proyek.png",
    alt: "Tampilan Nama Proyek",
    width: 1280,
    height: 800,
  },                              // atau null (tampil placeholder)
  technologies: ["Next.js", "TypeScript"],
  category: "Web App",            // Web App | Mobile App | Template | Tool
  githubUrl: "https://github.com/...",   // atau null
  liveUrl: "https://...",                // atau null
  featured: true,                 // true = tampil di section Featured Projects
  status: "completed",            // completed | in-progress | archived
  order: 4,                       // harus unik; kecil = lebih dulu
  detail: {                       // opsional; hanya bagian terisi yang tampil
    overview: "...",
    problem: "...",
    solution: "...",
    features: ["...", "..."],
    screenshots: [
      { src: "/images/projects/nama-proyek-1.png", alt: "...", width: 1280, height: 800 },
    ],
  },
},
```

Letakkan gambar di `public/images/projects/`. Halaman `/projects/nama-proyek`,
filter kategori, sitemap, dan JSON-LD dibuat otomatis. Isi `detail` hanya dengan
fakta yang kamu tahu.

## Menambah skill

1. Tambahkan objek di `src/data/skills.ts` (`id`, `name`, `icon`, `category`, `description`, `order` unik).
2. Jika ikonnya sudah ada, selesai. Ikon yang tersedia: nextjs, typescript, tailwindcss, react,
   nodejs, express, python, pandas, numpy, jupyter, scikitlearn, matplotlib, excel,
   git, docker, postgresql, mysql, linux.
3. Untuk ikon baru: tambahkan key di `SkillIconKey` (`src/types/index.ts`) dan satu `case`
   di `src/components/ui/SkillIcon.tsx`. TypeScript akan menandai jika `case`-nya lupa.

## Pengalaman, sosial, navigasi

- `experience.ts`: tambah objek (`type`: `work` atau `education`, `order` unik).
- `socials.ts`: isi `url` untuk menampilkan ikon. `url` kosong atau `visible: false` = disembunyikan.
- `navigation.ts`: tiap `anchor` harus sama dengan `id` section di halaman.

## Profil

`src/data/profile.ts` memuat nama, tagline, bio, email, statistik, kutipan, dan teks
tiap section. Isi `email` untuk menampilkan email dan tombol "Get In Touch".
Statistik awal (2+ Years Coding, 10+ Projects, 100% Passion) berasal dari mockup;
ganti dengan angka yang benar.

## Gambar

- Hero dan About: `public/images/profile/hero.png` dan `about.png`.
- Gambar OG (pratinjau tautan): setelah mengubah nama, jabatan, tagline, atau hero,
  jalankan `python3 scripts/make-og.py`.