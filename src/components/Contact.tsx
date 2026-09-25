"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error ?? "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Contact
      </p>
      <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
        Let&apos;s work together
      </h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Have a project in mind or just want to say hi? Fill out the form
        below, or email me directly at{" "}
        <a href={siteConfig.social.email} className="underline">
          {siteConfig.email}
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            placeholder="Your name"
            className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-foreground"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={5}
            placeholder="Tell me a bit about your project..."
            className="resize-none rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-white/15"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Thanks for reaching out! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {errorMessage || "Something went wrong. Please try again."}
          </p>
        )}
      </form>
    </section>
  );
}
