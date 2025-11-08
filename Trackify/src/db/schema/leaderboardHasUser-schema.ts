

import { sqliteTable, text, int, primaryKey } from "drizzle-orm/sqlite-core";
import { leaderboards } from "./leaderboard-schema";
import { users } from "./user-schema";


export const leaderboard_has_user = sqliteTable("leaderboard_has_user", {
  leaderboard_id: text("leaderboard_id").notNull().references(() => leaderboards.id, { onDelete: "cascade" }),
  user_id: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  is_owner: int("is_owner", {mode: "boolean"}).default(false),
  is_mod: int("is_mod", {mode: "boolean"}).default(false),

}, (table) => ({
  pk: primaryKey({ columns: [table.leaderboard_id, table.user_id] })
}));

export type LeaderboardHasUser = typeof leaderboard_has_user.$inferSelect;