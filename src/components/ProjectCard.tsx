import type { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-white/5">
      <div className={`h-36 w-full bg-gradient-to-br ${project.gradient}`} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-4 text-sm font-medium">
          {project.live_url && (
            <a
              href={project.live_url}
              className="text-foreground underline-offset-4 hover:underline"
            >
              Live demo
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              className="text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
