
import { sql } from "drizzle-orm";
import { sqliteTable, text, int, index } from "drizzle-orm/sqlite-core";
import { leaderboards } from "./leaderboard-schema";
import { users } from "./user-schema";




export const leaderboard_entry = sqliteTable("leaderboard_entry", {
  entry_id : int("entry_id").primaryKey({ autoIncrement: true }),
  leaderboard_id: text("leaderboard_id").notNull().references(() => leaderboards.id, { onDelete: "cascade" }),
  entry_date: text("entry_date").default(sql`(CURRENT_DATE)`),
  winner_id: text("winner_id").notNull().references(() => users.id),
  loser_id: text("loser_id").notNull().references(() => users.id),
},
(table) => [
    index( "idx_leaderboard_entry_leaderboard_id").on(table.leaderboard_id),
]
);

export type LeaderboardEntry = typeof leaderboard_entry.$inferSelect;