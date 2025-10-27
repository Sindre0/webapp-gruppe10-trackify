// src/db/schema/user-schema.ts

import { sql } from "drizzle-orm";
import { sqliteTable, text, int, } from "drizzle-orm/sqlite-core";


export const leaderboards = sqliteTable("leaderboards", {
  id: text("id").primaryKey(),
  name: text().notNull(),
  description: text(),
  visibility: text().notNull(),
  createdAt: text().default(sql`(CURRENT_DATE)`),
  active: int("active", {mode: "boolean"}).default(true),
});

export type Leaderboard = typeof leaderboards.$inferSelect;