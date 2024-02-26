create table "public"."settings" (
    "id" uuid not null,
    "pokemon_id" text
);

alter table "public"."settings" enable row level security;
CREATE UNIQUE INDEX settings_pkey ON public.settings USING btree (id);
alter table "public"."settings" add constraint "settings_pkey" PRIMARY KEY using index "settings_pkey";

alter table "public"."settings" add constraint "settings_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."settings" validate constraint "settings_id_fkey";

create policy "Enable read/write for users based on user_id"
on "public"."settings"
as permissive
for all
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));
