create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by the owner."
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Realtime
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profiles;

-- Set up Storage
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

create policy "Anyone can update an avatar."
  on storage.objects for update
  with check ( bucket_id = 'avatars' );

-- Actual data

create table
  public.sets (
    id text not null,
    name text not null,
    series text not null,
    "printedTotal" numeric not null,
    total numeric not null,
    "ptcgoCode" text null,
    "releaseDate" timestamp without time zone not null,
    "updatedAt" timestamp without time zone not null,
    img_symbol text not null,
    img_logo text not null,
    constraint sets_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.cards (
    id text not null,
    name text not null,
    supertype text not null,
    subtypes text[] not null,
    set_id text not null,
    number text not null,
    img_thumb text not null,
    img_large text not null,
    more json not null,
    constraint cards_pkey primary key (id),
    constraint cards_set_id_fkey foreign key (set_id) references sets (id) on update cascade
  ) tablespace pg_default;
