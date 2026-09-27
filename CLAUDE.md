# CLAUDE.md

Context for Claude Code (or any AI assistant) working in this repository.

## Project overview

Personal portfolio website for **Silveri Bandhavi**. Built with Next.js
(App Router), TypeScript, and Tailwind CSS v4. Project content is
database-backed (Supabase) with a password-protected `/admin` portal for
adding, editing, and deleting projects without a redeploy.

## Tech stack

- **Framework:** Next.js (App Router, `src/` directory)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (via `@import "tailwindcss"` in `globals.css`,
  theme tokens defined with `@theme inline`)
- **Fonts:** Geist Sans / Geist Mono via `next/font/google`
- **Dark mode:** automatic, based on `prefers-color-scheme` (no manual toggle)
- **Database/Auth:** Supabase (Postgres + Auth), via `@supabase/supabase-js`
  and `@supabase/ssr`

## Structure

```
src/
  app/
    layout.tsx        Root layout, fonts, <html>/<body>, metadata
    page.tsx           Composes all public sections in order
    globals.css        Tailwind import + theme tokens (--background/--foreground)
    api/contact/route.ts   POST handler for the contact form (validates + logs)
    admin/
      login/
        page.tsx            Sign-in form (no admin chrome — outside the route group)
        actions.ts           signIn server action
      actions.ts              signOut / createProject / updateProject / deleteProject
      (dashboard)/            Route group — adds the admin header/nav, URL-invisible
        layout.tsx             Admin chrome: "Admin · Projects" / View site / Sign out
        page.tsx                Project list with Edit/Delete
        DeleteButton.tsx         Client component, confirm() + delete server action
        ProjectForm.tsx           Shared create/edit form (client component)
        new/page.tsx              Add-project page
        [id]/edit/page.tsx        Edit-project page (fetches by id, binds updateProject)
  components/
    Header.tsx          Sticky public nav bar with mobile menu (client component)
    Hero.tsx             Name + tagline + CTA buttons
    About.tsx            Bio paragraphs + skills tag list
    Projects.tsx          Server component — fetches projects from Supabase
    ProjectCard.tsx       Single project card (title, tags, links)
    Contact.tsx           Contact form (client component, fetches /api/contact)
    Footer.tsx            Copyright + social links
  lib/
    site-config.ts        Name, tagline, bio, skills, social links, nav — single
                           source of truth for editable site content
    supabase/
      server.ts            Supabase client for Server Components/Actions (cookie-based)
      middleware.ts          Session refresh + /admin route protection helper
  types/
    project.ts             Project / ProjectInput types (mirrors the DB schema)
supabase/
  schema.sql               Table + RLS policies + seed data — run once in the
                            Supabase SQL Editor (not applied automatically)
```

## Editing content

- **[src/lib/site-config.ts](src/lib/site-config.ts)** — name, tagline, about
  text, skills list, social/email links, nav items. Still a static file.
- **Projects** are no longer static — they live in the Supabase `projects`
  table. Edit them at `/admin` (sign in first), not by editing code.

## Projects data flow

- Public `Projects.tsx` is an async Server Component that reads the
  `projects` table directly via the Supabase server client (anon key, RLS
  allows public `select`).
- `/admin` (route group `(dashboard)`) is protected by `src/middleware.ts`,
  which calls `updateSession()` from `src/lib/supabase/middleware.ts` on every
  `/admin/*` request: unauthenticated users are redirected to
  `/admin/login`, and signed-in users hitting `/admin/login` are redirected
  to `/admin`.
- All writes (`createProject`, `updateProject`, `deleteProject` in
  `src/app/admin/actions.ts`) are Server Actions that run as the signed-in
  user — there is **no service-role key** anywhere in this app. Row Level
  Security on the `projects` table is what actually enforces who can write:
  the insert/update/delete policies in `supabase/schema.sql` check
  `auth.jwt() ->> 'email'` against one hardcoded admin email. Anyone else who
  signs in (if signups aren't disabled) can still only read, never write.
- `revalidatePath("/")` and `revalidatePath("/admin")` are called after every
  write so the public site and admin list reflect changes immediately.

## Supabase setup (one-time, manual — not something Claude can do without DB access)

1. Run **[supabase/schema.sql](supabase/schema.sql)** once in the Supabase
   SQL Editor. It creates the `projects` table, enables RLS, adds
   public-read / admin-only-write policies, and seeds the three example
   projects if the table is empty.
2. In the Supabase dashboard → Authentication → Users, manually create one
   user with the admin email referenced in `schema.sql` (defaults to
   `avi.silveri.b@gmail.com`) and a password of your choice. That's the only
   login `/admin` will accept writes for, regardless of who else signs in.
3. Fill in `.env.local` (already gitignored) with:
   - `NEXT_PUBLIC_SUPABASE_URL` — the project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project Settings → API → anon/public key
   Both are safe to expose client-side; RLS is what protects writes, not
   secrecy of these values.
4. If the admin email ever changes, update the three policy definitions in
   `supabase/schema.sql` and re-run it (it's idempotent — safe to re-run).

## Contact form

`Contact.tsx` is a client component that POSTs `{ name, email, message }` to
`src/app/api/contact/route.ts`. The route validates the payload and currently
only `console.log`s the submission — **no email/CRM provider is wired up
yet**. To make submissions actually reach an inbox, integrate a provider
(e.g. Resend, SendGrid, Postmark) inside the route handler and keep any API
keys in `.env.local` (never commit them). This is unrelated to the Supabase
project used for the projects/admin feature.

## Conventions

- Section components are Server Components by default; `Header.tsx`,
  `Contact.tsx`, admin `ProjectForm.tsx`, `DeleteButton.tsx`, and the login
  page are `"use client"` (they need interactivity/state).
- Use the `foreground`/`background` CSS variables (via Tailwind's
  `text-foreground` / `bg-background`, defined in `globals.css`) instead of
  hardcoded black/white so dark mode keeps working automatically.
- Keep public sections as anchor targets (`id="about"`, `id="projects"`,
  `id="contact"`) since the header nav and hero CTAs link to them via hash.
- Mobile-first, responsive Tailwind classes (`sm:`, `lg:` breakpoints); the
  layout is designed to look correct at narrow widths first.
- Never introduce a Supabase service-role key into this app. All admin writes
  should go through the authenticated user's session + RLS, not a bypass key.

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
- Project card images are placeholder gradient blocks (`gradient` column on
  the `projects` row, e.g. `from-indigo-500 to-violet-500`) — there's no
  image upload yet.
- `.env.local` holds real Supabase credentials and is gitignored;
  `.env.example` documents the required variable names without values.
