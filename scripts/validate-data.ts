// Memeriksa seluruh file di src/data. Jalankan: bun run scripts/validate-data.ts
import { existsSync } from "node:fs";
import { join } from "node:path";
import { experience } from "@/data/experience";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { socials } from "@/data/socials";

const errors: string[] = [];
const warnings: string[] = [];

function expect(condition: boolean, message: string): void {
  if (!condition) errors.push(message);
}

function findDuplicates(values: ReadonlyArray<string | number>): Array<string | number> {
  const seen = new Set<string | number>();
  const duplicates = new Set<string | number>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return Array.from(duplicates);
}

function expectUnique(label: string, values: ReadonlyArray<string | number>): void {
  const duplicates = findDuplicates(values);
  expect(duplicates.length === 0, `${label} ganda: ${duplicates.join(", ")}`);
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function publicFileExists(src: string): boolean {
  return existsSync(join(process.cwd(), "public", src));
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Proyek
expectUnique("Slug proyek", projects.map((p) => p.slug));
expectUnique("Urutan proyek (order)", projects.map((p) => p.order));
for (const project of projects) {
  const tag = `Proyek "${project.slug}"`;
  expect(SLUG_PATTERN.test(project.slug), `${tag}: slug harus huruf kecil, angka, dan tanda hubung`);
  expect(project.technologies.length > 0, `${tag}: technologies kosong`);
  if (project.githubUrl) expect(isHttpUrl(project.githubUrl), `${tag}: githubUrl bukan URL http(s)`);
  if (project.liveUrl) expect(isHttpUrl(project.liveUrl), `${tag}: liveUrl bukan URL http(s)`);
  if (project.thumbnail) {
    expect(publicFileExists(project.thumbnail.src), `${tag}: file thumbnail tidak ada (public${project.thumbnail.src})`);
  } else {
    warnings.push(`${tag}: thumbnail masih kosong (tampil placeholder)`);
  }
  for (const shot of project.detail?.screenshots ?? []) {
    expect(publicFileExists(shot.src), `${tag}: file screenshot tidak ada (public${shot.src})`);
  }
  if (!project.detail) warnings.push(`${tag}: detail belum diisi`);
}
if (!projects.some((p) => p.featured)) {
  warnings.push("Tidak ada proyek featured, section Featured Projects tidak tampil");
}

// Skills, pengalaman, navigasi
expectUnique("ID skill", skills.map((s) => s.id));
expectUnique("Urutan skill (order)", skills.map((s) => s.order));
expectUnique("ID pengalaman", experience.map((e) => e.id));
expectUnique("Urutan pengalaman (order)", experience.map((e) => e.order));
expectUnique("ID navigasi", navigation.map((n) => n.id));
expectUnique("Urutan navigasi (order)", navigation.map((n) => n.order));
for (const item of navigation) {
  expect(item.url.startsWith("/"), `Navigasi "${item.id}": url harus diawali "/"`);
  expect(item.anchor.length > 0, `Navigasi "${item.id}": anchor kosong`);
}

// Sosial
expectUnique("Platform sosial", socials.map((s) => s.platform));
for (const social of socials) {
  if (social.url.trim() === "") {
    if (social.visible) warnings.push(`Sosial "${social.platform}": url kosong (ikon tidak tampil)`);
  } else {
    expect(isHttpUrl(social.url), `Sosial "${social.platform}": url bukan URL http(s)`);
  }
}

// Profil
for (const key of ["hero", "about"] as const) {
  expect(publicFileExists(profile.images[key].src), `Gambar profil ${key} tidak ada (public${profile.images[key].src})`);
}
if (!profile.email) {
  warnings.push("profile.email kosong (email dan tombol 'Get In Touch' tidak tampil)");
} else {
  expect(EMAIL_PATTERN.test(profile.email), "profile.email tidak valid");
}

for (const message of warnings) console.log(`PERINGATAN ${message}`);
for (const message of errors) console.log(`ERROR      ${message}`);

if (errors.length > 0) {
  console.log(`\nFAIL data: ${errors.length} error, ${warnings.length} peringatan`);
  process.exit(1);
}
console.log(`\nPASS data: 0 error, ${warnings.length} peringatan`);