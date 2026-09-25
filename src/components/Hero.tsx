import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)]"
      />

      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Hi, I&apos;m
      </p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
        {siteConfig.tagline}
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="#projects"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
