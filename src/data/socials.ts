import type { SocialLink } from "@/types";

// Isi `url` (dan `username`) untuk mengaktifkan tiap akun.
// Selama `url` kosong, ikon tidak ditampilkan di website.
// Set `visible: false` untuk menyembunyikan akun walau URL terisi.
export const socials: SocialLink[] = [
  { platform: "GitHub", label: "GitHub", username: "", url: "", icon: "github", visible: true },
  { platform: "YouTube", label: "YouTube", username: "", url: "", icon: "youtube", visible: true },
  { platform: "Discord", label: "Discord", username: "", url: "", icon: "discord", visible: true },
  { platform: "X", label: "X (Twitter)", username: "", url: "", icon: "x", visible: true },
  { platform: "LinkedIn", label: "LinkedIn", username: "", url: "", icon: "linkedin", visible: true },
];