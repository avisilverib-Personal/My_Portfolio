import { createClient } from "@/lib/supabase/server";
import ProjectCard from "@/components/ProjectCard";

export default async function Projects() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Projects
      </p>
      <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
        Selected work
      </h2>

      {projects && projects.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
          No projects yet — add one from the admin portal.
        </p>
      )}
    </section>
  );
}
