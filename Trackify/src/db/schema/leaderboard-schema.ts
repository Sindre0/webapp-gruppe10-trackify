// src/db/schema/user-schema.ts

import { sql } from "drizzle-orm";
import { sqliteTable, text, int, } from "drizzle-orm/sqlite-core";


export const leaderboards = sqliteTable("leaderboards", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  visibility: text("visibility").notNull(),
  createdAt: text("createdAt").default(sql`(CURRENT_DATE)`),
  endDate: text("endDate").default(sql`(CURRENT_DATE)`),
  active: int("active", {mode: "boolean"}).default(true),
});

export type Leaderboard = typeof leaderboards.$inferSelect;