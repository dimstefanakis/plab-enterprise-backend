create table "public"."use_cases" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "use_case" text
);


alter table "public"."use_cases" enable row level security;

alter table "public"."users" alter column "use_case" set data type uuid using "use_case"::uuid;

CREATE UNIQUE INDEX use_cases_pkey ON public.use_cases USING btree (id);

alter table "public"."use_cases" add constraint "use_cases_pkey" PRIMARY KEY using index "use_cases_pkey";

alter table "public"."users" add constraint "users_use_case_fkey" FOREIGN KEY (use_case) REFERENCES use_cases(id) not valid;

alter table "public"."users" validate constraint "users_use_case_fkey";


