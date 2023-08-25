DO $$ BEGIN
 CREATE TYPE "itemStatus" AS ENUM('ACTIVE', 'BACKLOG', 'COMPLETE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('OWNER', 'MEMBER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_on" date DEFAULT now(),
	"user_id" integer NOT NULL,
	"item_id" integer NOT NULL,
	"text" varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item" (
	"id" serial PRIMARY KEY NOT NULL,
	"list_id" integer NOT NULL,
	"created_on" date DEFAULT now() NOT NULL,
	"name" varchar(35) NOT NULL,
	"adder_id" integer,
	"likes" integer DEFAULT 0,
	"status" "itemStatus" DEFAULT 'ACTIVE'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_on" date DEFAULT now() NOT NULL,
	"name" varchar(35) NOT NULL,
	CONSTRAINT "list_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list_to_user" (
	"user_id" integer NOT NULL,
	"list_id" integer NOT NULL,
	"role" "role" DEFAULT 'MEMBER' NOT NULL,
	"join_date" date DEFAULT now() NOT NULL,
	CONSTRAINT list_to_user_user_id_list_id PRIMARY KEY("user_id","list_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(35) NOT NULL,
	"list_id" integer NOT NULL,
	CONSTRAINT "name_list_unique" UNIQUE("name","list_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag_to_item" (
	"item_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT tag_to_item_tag_id_item_id PRIMARY KEY("tag_id","item_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(35) NOT NULL,
	"encryptedPass" text NOT NULL,
	CONSTRAINT "user_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item" ADD CONSTRAINT "item_list_id_list_id_fk" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item" ADD CONSTRAINT "item_adder_id_user_id_fk" FOREIGN KEY ("adder_id") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_to_user" ADD CONSTRAINT "list_to_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_to_user" ADD CONSTRAINT "list_to_user_list_id_list_id_fk" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_list_id_list_id_fk" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag_to_item" ADD CONSTRAINT "tag_to_item_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag_to_item" ADD CONSTRAINT "tag_to_item_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
