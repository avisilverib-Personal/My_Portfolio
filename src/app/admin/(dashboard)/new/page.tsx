import ProjectForm from "../ProjectForm";
import { createProject } from "../../actions";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Add project</h1>
      <ProjectForm action={createProject} submitLabel="Create project" />
    </div>
  );
}
