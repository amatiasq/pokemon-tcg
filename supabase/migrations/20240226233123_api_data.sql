-- SETS

create table "public"."sets" (
    "id" text not null,
    "name" text not null,
    "series" text not null,
    "printedTotal" numeric not null,
    "total" numeric not null,
    "ptcgoCode" text,
    "releaseDate" timestamp without time zone not null,
    "updatedAt" timestamp without time zone not null,
    "img_symbol" text not null,
    "img_logo" text not null
);

alter table "public"."sets" enable row level security;
CREATE UNIQUE INDEX sets_pkey ON public.sets USING btree (id);
alter table "public"."sets" add constraint "sets_pkey" PRIMARY KEY using index "sets_pkey";

create policy "Enable read access for all users"
on "public"."sets"
as permissive
for select
to public
using (true);

create policy "Enable write for admin"
on "public"."sets"
as permissive
for all
to authenticated
using (((auth.jwt() ->> 'email'::text) = 'admin@amatiasq.com'::text))
with check (((auth.jwt() ->> 'email'::text) = 'admin@amatiasq.com'::text));

-- CARDS

create table "public"."cards" (
    "id" text not null,
    "name" text not null,
    "supertype" text not null,
    "subtypes" text[] not null,
    "set_id" text not null,
    "number" text not null,
    "img_thumb" text not null,
    "img_large" text not null,
    "more" json not null
);

alter table "public"."cards" enable row level security;
CREATE UNIQUE INDEX cards_pkey ON public.cards USING btree (id);
alter table "public"."cards" add constraint "cards_pkey" PRIMARY KEY using index "cards_pkey";

alter table "public"."cards" add constraint "cards_set_id_fkey" FOREIGN KEY (set_id) REFERENCES sets(id) ON UPDATE CASCADE not valid;
alter table "public"."cards" validate constraint "cards_set_id_fkey";

create policy "Enable read access for all users"
on "public"."cards"
as permissive
for select
to public
using (true);

create policy "Enable write for admin"
on "public"."cards"
as permissive
for all
to authenticated
using (((auth.jwt() ->> 'email'::text) = 'admin@amatiasq.com'::text))
with check (((auth.jwt() ->> 'email'::text) = 'admin@amatiasq.com'::text));
