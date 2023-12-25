CREATE TABLE `songs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`addedAt` integer NOT NULL,
	`upVotes` integer NOT NULL,
	`downVotes` integer NOT NULL,
	`addedBy` integer NOT NULL,
	FOREIGN KEY (`addedBy`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`emoji` text NOT NULL
);
