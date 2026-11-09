# Deploy ke Vercel

## 1. Siapkan sebelum deploy

```bash
bash scripts/qa.sh          # harus berakhir "SEMUA LULUS"
git status                  # pastikan semua sudah di-commit
```

## 2. Push ke GitHub (dari Termux)

```bash
pkg install gh
gh auth login               # ikuti petunjuk
gh repo create rusmanto --private --source=. --push
```

Cek bahwa `.env.local` tidak ikut ter-push:
`git ls-files .env.local` harus kosong.

## 3. Impor ke Vercel

1. Masuk ke vercel.com, pilih *Add New → Project*, lalu pilih repositori.
2. Framework Next.js terdeteksi otomatis. Biarkan build command bawaan
   (memakai script `build` di `package.json`).
3. Isi *Environment Variables* sebelum deploy pertama:

| Variabel | Nilai |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL final tanpa garis miring akhir, mis. `https://domainmu.id` |
| `RESEND_API_KEY` | dari dashboard Resend |
| `CONTACT_FROM_EMAIL` | alamat di domain terverifikasi Resend |
| `CONTACT_TO_EMAIL` | inbox pribadimu |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | isi setelah langkah 5 (boleh kosong dulu) |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | isi setelah langkah 5 (boleh kosong dulu) |
| `INDEXNOW_KEY` | isi jika memakai IndexNow |

Variabel `NEXT_PUBLIC_*` ikut tertanam saat build. Setelah mengubahnya, deploy ulang.

## 4. Domain

Tambahkan domain di *Project → Settings → Domains* dan ikuti nilai DNS yang
ditampilkan Vercel di registrar. Jangan hapus record DNS lain yang sudah ada
(mis. record Resend milik subdomain pengiriman email).
Setelah domain aktif, pastikan `NEXT_PUBLIC_SITE_URL` sama persis dengan domain
utama, lalu deploy ulang.

## 5. Setelah deploy

1. Buka `/sitemap.xml`, `/robots.txt`, dan `/og.jpg` di domain produksi.
2. **Google Search Console**: tambah properti, verifikasi (isi token ke
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` lalu deploy ulang), kirim `/sitemap.xml`.
3. **Bing Webmaster Tools**: impor dari Search Console atau verifikasi manual
   (`NEXT_PUBLIC_BING_SITE_VERIFICATION`), kirim `/sitemap.xml`.
4. **IndexNow** (opsional): `bun run scripts/indexnow.ts`.
5. Kirim satu pesan lewat form kontak di produksi dan pastikan masuk ke inbox.
6. Ukur di PageSpeed Insights (`pagespeed.web.dev`) untuk halaman utama,
   versi mobile dan desktop.

Status indexing hanya bisa dipastikan di Search Console dan Bing setelah verifikasi,
dan biasanya butuh hari sampai minggu.

## Masalah umum

| Gejala | Penyebab dan solusi |
| --- | --- |
| Canonical atau sitemap mengarah ke `localhost` | `NEXT_PUBLIC_SITE_URL` belum diisi di Vercel; isi lalu deploy ulang |
| Form kontak "belum dikonfigurasi" | Tiga variabel Resend belum lengkap di Vercel |
| Form kontak gagal terkirim | Cek *Logs* di dashboard Resend; periksa alamat `CONTACT_FROM_EMAIL` |
| Verifikasi Search Console gagal | Token belum ter-deploy; deploy ulang setelah mengisi env |