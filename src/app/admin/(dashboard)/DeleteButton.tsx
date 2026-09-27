"use client";

import { useTransition } from "react";
import { deleteProject } from "../actions";

export default function DeleteButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${title}"? This can't be undone.`)) {
          startTransition(() => {
            deleteProject(id);
          });
        }
      }}
      className="text-red-600 underline-offset-4 hover:underline disabled:opacity-60 dark:text-red-400"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
