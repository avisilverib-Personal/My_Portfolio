"use client";

import { useActionState } from "react";
import { signIn } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-foreground">Admin sign in</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Sign in to manage portfolio projects.
        </p>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>

          {state?.error && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {state.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
