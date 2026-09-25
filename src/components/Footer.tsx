import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-sm text-zinc-500 sm:flex-row sm:justify-between dark:text-zinc-500">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
        <div className="flex gap-5">
          <a href={siteConfig.social.github} className="hover:text-foreground">
            GitHub
          </a>
          <a href={siteConfig.social.linkedin} className="hover:text-foreground">
            LinkedIn
          </a>
          <a href={siteConfig.social.email} className="hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
