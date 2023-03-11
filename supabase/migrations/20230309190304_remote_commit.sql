alter table "public"."audiences" disable row level security;

alter table "public"."surveys" alter column "status" set default 'In Review'::text;

alter table "public"."users" add column "use_case" text;

CREATE TRIGGER survey_post_webhook AFTER INSERT ON public.surveys FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://hooks.zapier.com/hooks/catch/2018021/3ocr63n/', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


alter table "storage"."buckets" add column "allowed_mime_types" text[];

alter table "storage"."buckets" add column "avif_autodetection" boolean default false;

alter table "storage"."buckets" add column "file_size_limit" bigint;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$function$
;


