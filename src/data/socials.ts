import type { SocialLink } from "@/types";

// Isi `url` (dan `username`) untuk mengaktifkan tiap akun.
// Selama `url` kosong, ikon tidak ditampilkan di website.
// Set `visible: false` untuk menyembunyikan akun walau URL terisi.
export const socials: SocialLink[] = [
  { platform: "GitHub", label: "GitHub", username: "lutzbyte", url: "https://github.com/lutzbyte", icon: "github", visible: true },
  { platform: "YouTube", label: "YouTube", username: "", url: "", icon: "youtube", visible: true },
  { platform: "Instagram", label: "Instagram", username: "lutzbyte", url: "https://instagram.com/lutzbyte", icon: "instagram", visible: true },
  { platform: "X", label: "X (Twitter)", username: "lutzbyte", url: "https://x.com/lutzbyte", icon: "x", visible: true },
  { platform: "LinkedIn", label: "LinkedIn", username: "rus-manto-42a66a3a0", url: "https://www.linkedin.com/in/rus-manto-42a66a3a0?trk=contact-info", icon: "linkedin", visible: true },
];