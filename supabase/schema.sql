-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Safe to re-run: uses "if not exists" / "or replace" where possible.

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  live_url text,
  repo_url text,
  gradient text not null default 'from-indigo-500 to-violet-500',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- Only this email may create/update/delete projects, regardless of who else
-- signs in. Change the address below if you use a different admin email.
drop policy if exists "Admin can insert projects" on public.projects;
create policy "Admin can insert projects"
  on public.projects
  for insert
  to authenticated
  with check ((auth.jwt() ->> 'email') = 'avi.silveri.b@gmail.com');

drop policy if exists "Admin can update projects" on public.projects;
create policy "Admin can update projects"
  on public.projects
  for update
  to authenticated
  using ((auth.jwt() ->> 'email') = 'avi.silveri.b@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'avi.silveri.b@gmail.com');

drop policy if exists "Admin can delete projects" on public.projects;
create policy "Admin can delete projects"
  on public.projects
  for delete
  to authenticated
  using ((auth.jwt() ->> 'email') = 'avi.silveri.b@gmail.com');

-- Seed the three example projects (skip if the table already has rows).
insert into public.projects (title, description, tags, live_url, repo_url, gradient, sort_order)
select * from (values
  ('Task Flow', 'A drag-and-drop task manager with boards, labels, and real-time sync across devices.', array['Next.js','TypeScript','Tailwind CSS'], '#', '#', 'from-indigo-500 to-violet-500', 1),
  ('Weather Now', 'A minimal weather dashboard with hourly forecasts, saved locations, and severe-weather alerts.', array['React','REST API','Chart.js'], '#', '#', 'from-sky-500 to-cyan-400', 2),
  ('Recipe Box', 'A recipe organizer with search, tagging, and shareable collections for home cooks.', array['Next.js','Node.js','PostgreSQL'], '#', '#', 'from-rose-500 to-orange-400', 3)
) as seed(title, description, tags, live_url, repo_url, gradient, sort_order)
where not exists (select 1 from public.projects);
