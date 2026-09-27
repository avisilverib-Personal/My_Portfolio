import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProjectForm from "../../ProjectForm";
import { updateProject } from "../../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Edit project</h1>
      <ProjectForm
        action={updateProjectWithId}
        project={project}
        submitLabel="Save changes"
      />
    </div>
  );
}
