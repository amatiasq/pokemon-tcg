-- DECK

create table "public"."decks" (
    "id" uuid not null default gen_random_uuid (),
    "owner" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null default ''::text,
    "public" boolean not null default false
);

alter table "public"."decks" enable row level security;
CREATE UNIQUE INDEX decks_pkey ON public.decks USING btree (id);
alter table "public"."decks" add constraint "decks_pkey" PRIMARY KEY using index "decks_pkey";

alter table "public"."decks" add constraint "decks_owner_fkey" FOREIGN KEY (owner) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."decks" validate constraint "decks_owner_fkey";

create policy "Enable read/write for deck owners"
on "public"."decks"
as permissive
for all
to authenticated
using ((auth.uid() = owner))
with check ((auth.uid() = owner));

-- HELPER FUNCTION

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_deck_owner(user_uid uuid, deck_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
    owner_uid uuid;
BEGIN
    SELECT owner INTO owner_uid FROM public.decks WHERE id = deck_id;
    RETURN user_uid = owner_uid;
END;
$function$
;

-- DECK CARDS

create table "public"."deck_cards" (
    "deck" uuid not null,
    "card" text not null,
    "created_at" timestamp with time zone not null default now(),
    "amount" numeric not null,
    "notes" text not null default ''::text,
    "marks" text[]
);

alter table "public"."deck_cards" enable row level security;
CREATE UNIQUE INDEX deck_cards_pkey ON public.deck_cards USING btree (deck, card);
alter table "public"."deck_cards" add constraint "deck_cards_pkey" PRIMARY KEY using index "deck_cards_pkey";

alter table "public"."deck_cards" add constraint "deck_cards_card_fkey" FOREIGN KEY (card) REFERENCES cards(id) ON UPDATE RESTRICT ON DELETE RESTRICT not valid;
alter table "public"."deck_cards" validate constraint "deck_cards_card_fkey";

alter table "public"."deck_cards" add constraint "deck_cards_deck_fkey" FOREIGN KEY (deck) REFERENCES decks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."deck_cards" validate constraint "deck_cards_deck_fkey";

create policy "Enable read/write for deck owners"
on "public"."deck_cards"
as permissive
for all
to authenticated
using (is_deck_owner(auth.uid(), deck))
with check (is_deck_owner(auth.uid(), deck));
