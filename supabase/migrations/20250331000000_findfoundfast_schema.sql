-- FindFoundFast Database Schema
-- Run in Supabase SQL Editor or: supabase db push

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- ORGANIZATIONS (property management companies)
-- ---------------------------------------------------------------------------
create table if not exists public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  plan text default 'starter',
  created_at timestamp with time zone default now()
);

-- ---------------------------------------------------------------------------
-- BUILDINGS (each building a property manager sets up)
-- ---------------------------------------------------------------------------
create table if not exists public.buildings (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references public.organizations (id) on delete cascade,
  name text not null,
  address text,
  slug text unique not null,
  gate_code text,
  lobby_code text,
  notes text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- ---------------------------------------------------------------------------
-- BUILDING PHOTOS (step-by-step photo guide)
-- ---------------------------------------------------------------------------
create table if not exists public.building_photos (
  id uuid primary key default uuid_generate_v4(),
  building_id uuid references public.buildings (id) on delete cascade,
  step_number integer not null,
  label text not null,
  caption text,
  storage_path text not null,
  public_url text not null,
  created_at timestamp with time zone default now()
);

-- ---------------------------------------------------------------------------
-- PROFILES (extends Supabase auth users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  org_id uuid references public.organizations (id),
  building_id uuid references public.buildings (id),
  full_name text,
  unit_number text,
  role text default 'resident',
  created_at timestamp with time zone default now(),
  constraint profiles_role_check check (role in ('manager', 'resident'))
);

-- ---------------------------------------------------------------------------
-- SESSIONS (each time a resident activates their link)
-- ---------------------------------------------------------------------------
create table if not exists public.sessions (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles (id) on delete cascade,
  building_id uuid references public.buildings (id) on delete cascade,
  token text unique not null default encode(gen_random_bytes(6), 'hex'),
  unit_number text,
  expires_at timestamp with time zone not null,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- ---------------------------------------------------------------------------
-- DEMO REQUESTS (landing / get started form — matches app/api/demo)
-- ---------------------------------------------------------------------------
create table if not exists public.demo_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  property_name text,
  unit_count text,
  phone text,
  property_type text,
  type text,
  created_at timestamp with time zone default now()
);

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------
alter table public.organizations enable row level security;
alter table public.buildings enable row level security;
alter table public.building_photos enable row level security;
alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.demo_requests enable row level security;

-- ---------------------------------------------------------------------------
-- POLICIES (idempotent re-runs)
-- ---------------------------------------------------------------------------

drop policy if exists "Managers see own org" on public.organizations;
create policy "Managers see own org" on public.organizations
  for select using (
    id in (select org_id from public.profiles where id = auth.uid())
  );

drop policy if exists "Users see their buildings" on public.buildings;
create policy "Users see their buildings" on public.buildings
  for select using (
    org_id in (select org_id from public.profiles where id = auth.uid())
    or id in (select building_id from public.profiles where id = auth.uid())
  );

drop policy if exists "Managers insert buildings" on public.buildings;
create policy "Managers insert buildings" on public.buildings
  for insert with check (
    org_id in (
      select org_id from public.profiles where id = auth.uid() and role = 'manager'
    )
  );

drop policy if exists "Managers update buildings" on public.buildings;
create policy "Managers update buildings" on public.buildings
  for update using (
    org_id in (
      select org_id from public.profiles where id = auth.uid() and role = 'manager'
    )
  );

drop policy if exists "Users see building photos" on public.building_photos;
create policy "Users see building photos" on public.building_photos
  for select using (
    building_id in (
      select building_id from public.profiles where id = auth.uid()
      union
      select id from public.buildings where org_id in (
        select org_id from public.profiles where id = auth.uid()
      )
    )
  );

drop policy if exists "Managers insert photos" on public.building_photos;
create policy "Managers insert photos" on public.building_photos
  for insert with check (
    building_id in (
      select id from public.buildings where org_id in (
        select org_id from public.profiles where id = auth.uid() and role = 'manager'
      )
    )
  );

drop policy if exists "Users see own profile" on public.profiles;
create policy "Users see own profile" on public.profiles
  for select using (id = auth.uid());

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile" on public.profiles
  for update using (id = auth.uid());

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile" on public.profiles
  for insert with check (id = auth.uid());

drop policy if exists "Residents see own sessions" on public.sessions;
create policy "Residents see own sessions" on public.sessions
  for select using (profile_id = auth.uid());

drop policy if exists "Residents insert sessions" on public.sessions;
create policy "Residents insert sessions" on public.sessions
  for insert with check (profile_id = auth.uid());

drop policy if exists "Residents update own sessions" on public.sessions;
create policy "Residents update own sessions" on public.sessions
  for update using (profile_id = auth.uid());

-- Do NOT use `for select using (true)` on sessions — it exposes all tokens.
-- Driver link flow: call public.get_session_by_token(token) (security definer) instead.

drop policy if exists "Public read photos" on public.building_photos;
create policy "Public read photos" on public.building_photos
  for select using (true);

drop policy if exists "Public read buildings by slug" on public.buildings;
create policy "Public read buildings by slug" on public.buildings
  for select using (true);

drop policy if exists "Anyone can submit demo request" on public.demo_requests;
create policy "Anyone can submit demo request" on public.demo_requests
  for insert with check (true);

drop policy if exists "Managers read demo requests" on public.demo_requests;
create policy "Managers read demo requests" on public.demo_requests
  for select using (
    exists (
      select 1 from public.profiles where id = auth.uid() and role = 'manager'
    )
  );

-- ---------------------------------------------------------------------------
-- Signup → profile row (prefer trigger over client insert)
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(trim(coalesce(new.raw_user_meta_data->>'full_name', '')), ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.is_session_valid(session_token text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.sessions
    where token = session_token
    and is_active = true
    and expires_at > now()
  );
$$;

-- Single-row fetch for driver link (avoids broad SELECT on sessions)
create or replace function public.get_session_by_token(session_token text)
returns public.sessions
language sql
security definer
set search_path = public
stable
as $$
  select s.*
  from public.sessions s
  where s.token = session_token
    and s.is_active = true
    and s.expires_at > now()
  limit 1;
$$;

grant execute on function public.is_session_valid(text) to anon, authenticated;
grant execute on function public.get_session_by_token(text) to anon, authenticated;
