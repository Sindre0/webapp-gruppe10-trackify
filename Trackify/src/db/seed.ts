"use server";

// src/db/seed.ts

import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users, leaderboards, leaderboard_has_user, leaderboard_entry, Leaderboard } from "./schema";
import { env as WorkerEnv } from "cloudflare:workers";

export const seedData = async (env?: Env) => {
  try {
    const db = drizzle(env?.DB ?? WorkerEnv.DB);
    await db.delete(leaderboard_entry);
    await db.delete(leaderboard_has_user);
    await db.delete(leaderboards);
    await db.delete(users);
    

    const userRows = await db.insert(users).values([
      { id: "user1", username: "alice", email: "alice@example.com", passwordHash: "hash1" },
      { id: "user2", username: "bob", email: "bob@example.com", passwordHash: "hash2" },
      { id: "user3", username: "carol", email: "carol@example.com", passwordHash: "hash3" },
    ]).returning();

    const [alice, bob, carol] = userRows;

    const leaderboardData: Leaderboard[] = [
      {
        id: crypto.randomUUID(),
        name: "CS:GO Tournament",
        description: "Description for CS:GO Tournament",
        visibility: "public",
        createdAt: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400 * 1000).toISOString(),
        active: true,
      },
      {
        id: crypto.randomUUID(),
        name: "Chess Tournament",
        description: "Description for Chess Tournament",
        visibility: "public",
        createdAt: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400 * 1000).toISOString(),
        active: true,
      },
    ];

    const [...insertedLeaderboards] = await db
      .insert(leaderboards)
      .values(leaderboardData)
      .returning();

    const result = await db.select().from(users).all();
    console.log("Inserted leaderboards:", insertedLeaderboards);

    console.log("🌱 Finished seeding");

    return result;
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

export default defineScript(async ({ env }) => {
  try {
    await seedData(env);
    return Response.json(true);
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({
      success: false,
      error: "Failed to seed database",
    });
  }
});