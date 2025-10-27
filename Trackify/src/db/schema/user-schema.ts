
import { sql } from "drizzle-orm";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";


export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  createdAt: text().default(sql`(CURRENT_DATE)`)
});

export type User = typeof users.$inferSelect;