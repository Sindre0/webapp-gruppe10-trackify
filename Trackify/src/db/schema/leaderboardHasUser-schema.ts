

import { sqliteTable, text, int, } from "drizzle-orm/sqlite-core";
import { leaderboards } from "./leaderboard-schema";
import { users } from "./user-schema";


export const leaderboard_has_user = sqliteTable("leaderboard_has_user", {
  leaderboard_id: int().primaryKey().notNull().references(() => leaderboards.id, { onDelete: "cascade" }),
  user_id: int().primaryKey().notNull().references(() => users.id, { onDelete: "cascade" }),
  is_owner: int("is_owner", {mode: "boolean"}).default(false),
  is_mod: int("is_mod", {mode: "boolean"}).default(false),
  
});

export type LeaderboardHasUser = typeof leaderboard_has_user.$inferSelect;