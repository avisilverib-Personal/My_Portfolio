export const siteConfig = {
  name: "Silveri Bandhavi",
  initials: "SB",
  tagline: "Software engineer crafting clean, thoughtful web experiences.",
  location: "India",
  email: "avi.silveri.b@gmail.com",
  about: [
    "I'm a software engineer who enjoys turning ideas into fast, accessible, and well-crafted products. I care about clean code, sensible architecture, and the small details that make software feel good to use.",
    "Outside of shipping features, I like exploring new tools, contributing to side projects, and continuously learning better ways to build for the web.",
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "REST APIs",
    "Git",
    "SQL",
  ],
  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:avi.silveri.b@gmail.com",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
