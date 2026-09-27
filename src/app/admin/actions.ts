"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProjectInput } from "@/types/project";

function parseProjectForm(formData: FormData): ProjectInput {
  const tagsRaw = String(formData.get("tags") ?? "");

  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    tags: tagsRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    live_url: String(formData.get("live_url") ?? "").trim(),
    repo_url: String(formData.get("repo_url") ?? "").trim(),
    gradient: String(formData.get("gradient") ?? "").trim() || "from-indigo-500 to-violet-500",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createProject(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const supabase = await createClient();
  const input = parseProjectForm(formData);

  if (!input.title || !input.description) {
    return { error: "Title and description are required." };
  }

  const { error } = await supabase.from("projects").insert(input);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProject(
  id: string,
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const supabase = await createClient();
  const input = parseProjectForm(formData);

  if (!input.title || !input.description) {
    return { error: "Title and description are required." };
  }

  const { error } = await supabase
    .from("projects")
    .update(input)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}
