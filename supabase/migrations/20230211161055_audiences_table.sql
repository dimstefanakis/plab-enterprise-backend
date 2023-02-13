create table "public"."audiences" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "image_url" text,
    "description" text
);


alter table "public"."audiences" enable row level security;

CREATE UNIQUE INDEX audiences_name_key ON public.audiences USING btree (name);

CREATE UNIQUE INDEX audiences_pkey ON public.audiences USING btree (id);

alter table "public"."audiences" add constraint "audiences_pkey" PRIMARY KEY using index "audiences_pkey";

alter table "public"."audiences" add constraint "audiences_name_key" UNIQUE using index "audiences_name_key";


