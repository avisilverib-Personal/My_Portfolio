import Link from "next/link";
import { signOut } from "../actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-black/5 dark:border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-sm font-semibold text-foreground">
            Admin · Projects
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/"
              className="text-zinc-600 hover:text-foreground dark:text-zinc-400"
            >
              View site
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="text-zinc-600 hover:text-foreground dark:text-zinc-400"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
