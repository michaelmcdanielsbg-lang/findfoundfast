-- Google / Apple OAuth: map common name fields into profiles.full_name

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_full text;
begin
  v_role := coalesce(new.raw_user_meta_data->>'role', 'resident');
  if v_role not in ('manager', 'resident') then
    v_role := 'resident';
  end if;

  v_full := nullif(trim(coalesce(
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    trim(concat_ws(' ',
      nullif(trim(new.raw_user_meta_data->>'given_name'), ''),
      nullif(trim(new.raw_user_meta_data->>'family_name'), '')
    ))
  )), '');

  insert into public.profiles (id, full_name, role)
  values (new.id, v_full, v_role)
  on conflict (id) do nothing;

  return new;
end;
$$;
