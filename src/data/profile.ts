import type { Profile } from "@/types";

// Teks dan angka di bawah berasal dari mockup. Periksa dan sesuaikan dengan data aslimu.
export const profile: Profile = {
  name: "RUS MANTO",
  jobTitle: "Developer & Data Analyst",
  tagline: "Crafting Digital Experiences Through Code & Creativity.",
  intro:
    "I'm a passionate developer who loves building modern web applications and turning data into clear, useful insights.",
  location: "Indonesia",
  // Isi email aslimu. Selama kosong, tombol email tidak ditampilkan.
  email: "rusmanto.co@gmail.com",
  availability: {
    isAvailable: true,
    label: "Available for new opportunities",
  },
  hero: {
    keywords: ["Code", "Analyze", "Build", "Improve", "Repeat"],
    scrollLabel: "Scroll Down",
    primaryCta: { label: "Explore My Work", href: "/#projects" },
    secondaryCta: { label: "Contact Me", href: "/#contact" },
  },
  about: {
    eyebrow: "About Me",
    greeting: "Hi, I'm RUS MANTO",
    bio: "I'm a developer from Indonesia who is passionate about technology, from web and mobile development to data analysis. I enjoy turning ideas into real and useful digital products, and raw data into insights that help make better decisions.",
    tags: ["Developer", "Data Analyst", "Problem Solver", "Lifelong Learner"],
  },
  stats: [
    { id: "years", value: "2+", label: "Years Coding", icon: "code" },
    { id: "projects", value: "1", label: "Projects Completed", icon: "folder" },
    { id: "passion", value: "100%", label: "Passion", icon: "heart" },
  ],
  quote: {
    text: "Better code, better tomorrow.",
    author: "RUS MANTO",
  },
  sections: {
    skills: {
      eyebrow: "My Skills",
      title: "Technologies I Work With",
      description:
        "A stack of tools I use to build products and make sense of data.",
      viewAllLabel: "View All Skills",
      viewLessLabel: "Hide Details",
    },
    projects: {
      eyebrow: "My Projects",
      title: "Featured Projects",
      description: "Some of my work that I'm proud of.",
    },
    journey: {
      eyebrow: "My Journey",
      title: "Experience & Education",
      description: "Milestones that shaped my journey.",
    },
  },
  contact: {
    eyebrow: "Let's Work Together",
    title: "Have a Project in Mind?",
    description:
      "I'm always open to new opportunities, collaborations, or just a friendly chat.",
    ctaLabel: "Get In Touch",
  },
  images: {
    hero: {
      src: "/images/profile/hero.png",
      alt: "RUS MANTO Hero Image",
      width: 828,
      height: 941,
    },
    about: {
      src: "/images/profile/about.png",
      alt: "RUS MANTO About Profile",
      width: 822,
      height: 941,
    },
  },
};