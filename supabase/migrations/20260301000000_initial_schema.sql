-- =============================================================
-- Enums
-- =============================================================

create type public.contract_type as enum ('CDI', 'CDD', 'Stage', 'Freelance');
create type public.user_role as enum ('seeker', 'employer');
create type public.application_status as enum ('pending', 'reviewed', 'accepted', 'rejected');

-- =============================================================
-- Tables
-- =============================================================

create table public.companies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  logo_url    text,
  description text,
  website     text,
  city        text,
  created_at  timestamptz not null default now()
);

create table public.users (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  role        public.user_role not null,
  full_name   text,
  cv_url      text,
  created_at  timestamptz not null default now()
);

create table public.jobs (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text not null,
  location      text,
  city          text,
  salary_min    integer,
  salary_max    integer,
  contract_type public.contract_type not null,
  is_remote     boolean not null default false,
  sector        text,
  company_id    uuid not null references public.companies (id) on delete cascade,
  created_at    timestamptz not null default now()
);

create table public.applications (
  id           uuid primary key default gen_random_uuid(),
  job_id       uuid not null references public.jobs (id) on delete cascade,
  user_id      uuid not null references public.users (id) on delete cascade,
  status       public.application_status not null default 'pending',
  cover_letter text,
  created_at   timestamptz not null default now(),
  unique (job_id, user_id)
);

-- =============================================================
-- Indexes
-- =============================================================

create index jobs_company_id_idx on public.jobs (company_id);
create index jobs_contract_type_idx on public.jobs (contract_type);
create index jobs_city_idx on public.jobs (city);
create index jobs_is_remote_idx on public.jobs (is_remote);
create index jobs_created_at_idx on public.jobs (created_at desc);
create index applications_job_id_idx on public.applications (job_id);
create index applications_user_id_idx on public.applications (user_id);
create index applications_status_idx on public.applications (status);

-- =============================================================
-- Row Level Security
-- =============================================================

alter table public.companies   enable row level security;
alter table public.users       enable row level security;
alter table public.jobs        enable row level security;
alter table public.applications enable row level security;

-- companies: anyone can read, only authenticated employers can insert/update their own
create policy "companies_select" on public.companies
  for select using (true);

create policy "companies_insert" on public.companies
  for insert with check (auth.role() = 'authenticated');

create policy "companies_update" on public.companies
  for update using (auth.role() = 'authenticated');

-- users: users can read/update only their own row
create policy "users_select_own" on public.users
  for select using (auth.uid() = id);

create policy "users_insert_own" on public.users
  for insert with check (auth.uid() = id);

create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

-- jobs: anyone can read; authenticated users can insert/update (enforce employer role in app layer)
create policy "jobs_select" on public.jobs
  for select using (true);

create policy "jobs_insert" on public.jobs
  for insert with check (auth.role() = 'authenticated');

create policy "jobs_update" on public.jobs
  for update using (auth.role() = 'authenticated');

create policy "jobs_delete" on public.jobs
  for delete using (auth.role() = 'authenticated');

-- applications: seekers can read/insert their own; job owners can read applications for their jobs
create policy "applications_select_own" on public.applications
  for select using (auth.uid() = user_id);

create policy "applications_insert_own" on public.applications
  for insert with check (auth.uid() = user_id);

create policy "applications_update_own" on public.applications
  for update using (auth.uid() = user_id);
