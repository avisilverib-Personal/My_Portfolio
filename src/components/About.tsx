import { siteConfig } from "@/lib/site-config";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-12 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            About me
          </p>
          <div className="mt-4 flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-3xl font-bold text-white">
            {siteConfig.initials}
          </div>
        </div>

        <div>
          {siteConfig.about.map((paragraph) => (
            <p
              key={paragraph}
              className="mb-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-6 flex flex-wrap gap-2">
            {siteConfig.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/15 dark:text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
