ALTER TABLE "songs" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" DROP COLUMN IF EXISTS "addedAt";