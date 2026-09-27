import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "./DeleteButton";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Projects</h1>
        <Link
          href="/admin/new"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          Add project
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-xl border border-black/10 px-5 py-4 dark:border-white/10"
            >
              <div>
                <p className="font-medium text-foreground">{project.title}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {project.tags.join(", ") || "No tags"}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <Link
                  href={`/admin/${project.id}/edit`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  Edit
                </Link>
                <DeleteButton id={project.id} title={project.title} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No projects yet.
          </p>
        )}
      </div>
    </div>
  );
}
