"use client";

import { useActionState } from "react";
import type { Project } from "@/types/project";

type Action = (
  prevState: { error: string } | null,
  formData: FormData
) => Promise<{ error: string } | null>;

export default function ProjectForm({
  action,
  project,
  submitLabel,
}: {
  action: Action;
  project?: Project;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={project?.title}
          className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={project?.description}
          className="resize-none rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="tags" className="text-sm font-medium text-foreground">
          Tags <span className="text-zinc-500">(comma-separated)</span>
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          placeholder="Next.js, TypeScript, Tailwind CSS"
          defaultValue={project?.tags.join(", ")}
          className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="live_url"
            className="text-sm font-medium text-foreground"
          >
            Live URL
          </label>
          <input
            id="live_url"
            name="live_url"
            type="text"
            placeholder="https://..."
            defaultValue={project?.live_url ?? ""}
            className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="repo_url"
            className="text-sm font-medium text-foreground"
          >
            Repo URL
          </label>
          <input
            id="repo_url"
            name="repo_url"
            type="text"
            placeholder="https://github.com/..."
            defaultValue={project?.repo_url ?? ""}
            className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="gradient"
            className="text-sm font-medium text-foreground"
          >
            Card gradient{" "}
            <span className="text-zinc-500">(Tailwind classes)</span>
          </label>
          <input
            id="gradient"
            name="gradient"
            type="text"
            placeholder="from-indigo-500 to-violet-500"
            defaultValue={project?.gradient ?? "from-indigo-500 to-violet-500"}
            className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="sort_order"
            className="text-sm font-medium text-foreground"
          >
            Sort order
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={project?.sort_order ?? 0}
            className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 self-start rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Saving..." : submitLabel}
      </button>

      {state?.error && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
