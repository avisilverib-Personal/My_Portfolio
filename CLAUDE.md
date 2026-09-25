# CLAUDE.md

Context for Claude Code (or any AI assistant) working in this repository.

## Project overview

Personal portfolio website for **Silveri Bandhavi**. Built with Next.js
(App Router), TypeScript, and Tailwind CSS v4. Statically-composed marketing
site — no database, no auth, no CMS.

## Tech stack

- **Framework:** Next.js (App Router, `src/` directory)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (via `@import "tailwindcss"` in `globals.css`,
  theme tokens defined with `@theme inline`)
- **Fonts:** Geist Sans / Geist Mono via `next/font/google`
- **Dark mode:** automatic, based on `prefers-color-scheme` (no manual toggle)

## Structure

```
src/
  app/
    layout.tsx        Root layout, fonts, <html>/<body>, metadata
    page.tsx           Composes all sections in order
    globals.css        Tailwind import + theme tokens (--background/--foreground)
    api/contact/route.ts   POST handler for the contact form (validates + logs)
  components/
    Header.tsx          Sticky nav bar with mobile menu (client component)
    Hero.tsx             Name + tagline + CTA buttons
    About.tsx            Bio paragraphs + skills tag list
    Projects.tsx          Grid wrapper for ProjectCard
    ProjectCard.tsx       Single project card (title, tags, links)
    Contact.tsx           Contact form (client component, fetches /api/contact)
    Footer.tsx            Copyright + social links
  data/
    projects.ts          Example project content (edit this to update projects)
  lib/
    site-config.ts        Name, tagline, bio, skills, social links, nav — single
                           source of truth for editable site content
```

## Editing content

Almost everything a user would want to change lives in two files:

- **[src/lib/site-config.ts](src/lib/site-config.ts)** — name, tagline, about
  text, skills list, social/email links, nav items.
- **[src/data/projects.ts](src/data/projects.ts)** — the 3 example project
  cards (title, description, tags, links, card gradient).

Section components (`Hero`, `About`, `Projects`, `Contact`) read from these
files rather than hardcoding copy, so content edits shouldn't require
touching component markup.

## Contact form

`Contact.tsx` is a client component that POSTs `{ name, email, message }` to
`src/app/api/contact/route.ts`. The route validates the payload and currently
only `console.log`s the submission — **no email/CRM provider is wired up
yet**. To make submissions actually reach an inbox, integrate a provider
(e.g. Resend, SendGrid, Postmark) inside the route handler and keep any API
keys in `.env.local` (never commit them).

## Conventions

- Section components are Server Components by default; only `Header.tsx` and
  `Contact.tsx` are `"use client"` (they need interactivity/state).
- Use the `foreground`/`background` CSS variables (via Tailwind's
  `text-foreground` / `bg-background`, defined in `globals.css`) instead of
  hardcoded black/white so dark mode keeps working automatically.
- Keep sections as anchor targets (`id="about"`, `id="projects"`,
  `id="contact"`) since the header nav and hero CTAs link to them via hash.
- Mobile-first, responsive Tailwind classes (`sm:`, `lg:` breakpoints); the
  layout is designed to look correct at narrow widths first.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run start    # run the production build
npm run lint     # eslint
```

## Notes

- `AGENTS.md` in this repo is auto-generated/re-written by `next dev` itself
  (Next.js writes framework-version warnings there) — leave it as-is; it is
  unrelated to this project's own context.
- Project images/logos are placeholder gradient blocks (no real screenshots
  yet) — swap the `gradient` field in `src/data/projects.ts` for real image
  assets when available.
