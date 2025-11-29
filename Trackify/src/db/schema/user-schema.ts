
import { sql } from "drizzle-orm";
import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";



export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  createdAt: text("createdAt").default(sql`(CURRENT_DATE)`)
  
}, (table) => [
  index("idx_users_username").on(table.username),
]

);

export type User = typeof users.$inferSelect;