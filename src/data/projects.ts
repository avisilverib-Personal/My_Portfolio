export type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    title: "Task Flow",
    description:
      "A drag-and-drop task manager with boards, labels, and real-time sync across devices.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "#",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    title: "Weather Now",
    description:
      "A minimal weather dashboard with hourly forecasts, saved locations, and severe-weather alerts.",
    tags: ["React", "REST API", "Chart.js"],
    liveUrl: "#",
    repoUrl: "#",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    title: "Recipe Box",
    description:
      "A recipe organizer with search, tagging, and shareable collections for home cooks.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    liveUrl: "#",
    repoUrl: "#",
    gradient: "from-rose-500 to-orange-400",
  },
];
