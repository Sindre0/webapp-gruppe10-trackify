CREATE TABLE `leaderboards` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`visibility` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_DATE),
	`endDate` text DEFAULT (CURRENT_DATE),
	`active` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `leaderboard_has_user` (
	`leaderboard_id` text NOT NULL,
	`user_id` text NOT NULL,
	`is_owner` integer DEFAULT false,
	`is_mod` integer DEFAULT false,
	PRIMARY KEY(`leaderboard_id`, `user_id`),
	FOREIGN KEY (`leaderboard_id`) REFERENCES `leaderboards`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `leaderboard_entry` (
	`entry_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`leaderboard_id` text NOT NULL,
	`entry_date` text DEFAULT (CURRENT_DATE),
	`winner_id` text NOT NULL,
	`loser_id` text NOT NULL,
	FOREIGN KEY (`leaderboard_id`) REFERENCES `leaderboards`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`winner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`loser_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_leaderboard_entry_leaderboard_id` ON `leaderboard_entry` (`leaderboard_id`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`passwordHash` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "username", "email", "passwordHash", "createdAt") SELECT "id", "username", "email", "passwordHash", "createdAt" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);