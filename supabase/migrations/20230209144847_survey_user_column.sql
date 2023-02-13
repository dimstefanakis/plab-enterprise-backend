alter table "public"."surveys" add column "user" uuid;

alter table "public"."surveys" add constraint "surveys_user_fkey" FOREIGN KEY ("user") REFERENCES users(id) not valid;

alter table "public"."surveys" validate constraint "surveys_user_fkey";


