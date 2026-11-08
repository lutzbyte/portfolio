import type { NavItem } from "@/types";

// `url` berbentuk "/#anchor" agar tetap berfungsi dari halaman /projects/[slug].
export const navigation: NavItem[] = [
  { id: "home", label: "Home", url: "/", anchor: "home", order: 1 },
  { id: "about", label: "About", url: "/#about", anchor: "about", order: 2 },
  { id: "skills", label: "Skills", url: "/#skills", anchor: "skills", order: 3 },
  { id: "projects", label: "Projects", url: "/#projects", anchor: "projects", order: 4 },
  { id: "journey", label: "Journey", url: "/#journey", anchor: "journey", order: 5 },
  { id: "contact", label: "Contact", url: "/#contact", anchor: "contact", order: 6 },
];