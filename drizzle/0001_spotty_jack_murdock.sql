ALTER TABLE "comment" ALTER COLUMN "created_on" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "item" ALTER COLUMN "created_on" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "list" ALTER COLUMN "created_on" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "list_to_user" ALTER COLUMN "join_date" SET DATA TYPE timestamp;