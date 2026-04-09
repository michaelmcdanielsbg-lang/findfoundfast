-- Manager onboarding: org creation RPC, storage bucket, photo delete, signup role

-- ---------------------------------------------------------------------------
-- Signup: persist role from user metadata (Loveable / ?as=manager on signup)
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
begin
  v_role := coalesce(new.raw_user_meta_data->>'role', 'resident');
  if v_role not in ('manager', 'resident') then
    v_role := 'resident';
  end if;

  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    nullif(trim(coalesce(new.raw_user_meta_data->>'full_name', '')), ''),
    v_role
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Create org + attach to profile (managers only, once)
-- ---------------------------------------------------------------------------
create or replace function public.create_organization_for_manager(org_name text, org_email text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_org_id uuid;
  user_email text;
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'manager') then
    raise exception 'Only property managers can create an organization';
  end if;
  if exists (select 1 from public.profiles where id = auth.uid() and org_id is not null) then
    raise exception 'Organization already set up for this account';
  end if;

  user_email := coalesce(
    nullif(trim(org_email), ''),
    (select email::text from auth.users where id = auth.uid())
  );

  insert into public.organizations (name, email)
  values (trim(org_name), user_email)
  returning id into new_org_id;

  update public.profiles set org_id = new_org_id where id = auth.uid();

  return new_org_id;
end;
$$;

grant execute on function public.create_organization_for_manager(text, text) to authenticated;

-- ---------------------------------------------------------------------------
-- Storage: building photos (path = {building_id}/{filename})
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('building-photos', 'building-photos', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Managers upload building photos" on storage.objects;
create policy "Managers upload building photos"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'building-photos'
    and exists (
      select 1
      from public.buildings b
      join public.profiles p on p.org_id = b.org_id and p.role = 'manager'
      where p.id = auth.uid()
        and b.id::text = (string_to_array(name, '/'))[1]
    )
  );

drop policy if exists "Managers delete building photos" on storage.objects;
create policy "Managers delete building photos"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'building-photos'
    and exists (
      select 1
      from public.buildings b
      join public.profiles p on p.org_id = b.org_id and p.role = 'manager'
      where p.id = auth.uid()
        and b.id::text = (string_to_array(name, '/'))[1]
    )
  );

-- ---------------------------------------------------------------------------
-- building_photos: managers can delete rows for their buildings
-- ---------------------------------------------------------------------------
drop policy if exists "Managers delete photos" on public.building_photos;
create policy "Managers delete photos"
  on public.building_photos
  for delete
  using (
    building_id in (
      select b.id
      from public.buildings b
      join public.profiles p on p.org_id = b.org_id and p.role = 'manager'
      where p.id = auth.uid()
    )
  );
