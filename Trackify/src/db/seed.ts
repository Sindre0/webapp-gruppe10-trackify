"use server";

// src/db/seed.ts

import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users, leaderboards, leaderboard_has_user, leaderboard_entry, type Leaderboard, type LeaderboardHasUser, type LeaderboardEntry } from "./schema";
import { env as WorkerEnv } from "cloudflare:workers";

export const seedData = async (env?: Env) => {
  try {
    const db = drizzle(env?.DB ?? WorkerEnv.DB);
    await db.delete(leaderboard_entry);
    await db.delete(leaderboard_has_user);
    await db.delete(leaderboards);
    await db.delete(users);
    

    const [user1] = await db
    .insert(users)
    .values({
      id: "36b8f84d-df4e-4d49-b662-bcde71a8764f",
      username: "Test user",
      email: "test@testuser.io",
      passwordHash: "hashedpassword",
    })
    .returning();

    const [user2] = await db
    .insert(users)
    .values({
      id: "46b8f84d-df4e-4d49-b662-bcde71a8764f",
      username: "Test user 2",
      email: "test2@testuser.io",
      passwordHash: "hashedpassword",
    })
    .returning();

    const [user3] = await db
    .insert(users)
    .values({
      id: "56b8f84d-df4e-4d49-b662-bcde71a8764f",
      username: "Test user 3",
      email: "test3@testuser.io",
      passwordHash: "hashedpassword",
    })
    .returning();

    const leaderboardData: Leaderboard[] = [
      {
        id: "66b8f84d-df4e-4d49-b662-bcde71a8764f",
        name: "CS:GO Tournament",
        description: "Description for CS:GO Tournament",
        visibility: "public",
        createdAt: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400 * 1000).toISOString(),
        active: true,
      },
      {
        id: "76b8f84d-df4e-4d49-b662-bcde71a8764f",
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

    
    const LeaderboardHasUserData: LeaderboardHasUser[] = [
      {
        leaderboard_id: leaderboardData[0].id,
        user_id: user1.id,
        is_owner: true,
        is_mod: false,
      },
      {
        leaderboard_id: leaderboardData[0].id,
        user_id: user2.id,
        is_owner: false,
        is_mod: true,
      },
      {
        leaderboard_id: leaderboardData[0].id,
        user_id: user3.id,
        is_owner: false,
        is_mod: false,
      },
      {
        leaderboard_id: leaderboardData[1].id,
        user_id: user1.id,
        is_owner: true,
        is_mod: false,
      },
      {
        leaderboard_id: leaderboardData[1].id,
        user_id: user2.id,
        is_owner: false,
        is_mod: false,
      }
    ];

    await db.insert(leaderboard_has_user).values(LeaderboardHasUserData).returning();

    const LeaderboardEntryData: LeaderboardEntry[] = [
      {
        entry_id: 0,
        leaderboard_id: leaderboardData[0].id,
        entry_date: new Date().toISOString(),
        winner_id: user2.id,
        loser_id: user3.id,
      },
      {
        entry_id: 1,
        leaderboard_id: leaderboardData[0].id,
        entry_date: new Date().toISOString(),
        winner_id: user1.id,
        loser_id: user2.id,
      },
      {
        entry_id: 2,
        leaderboard_id: leaderboardData[0].id,
        entry_date: new Date().toISOString(),
        winner_id: user1.id,
        loser_id: user3.id,
      },
      {
        entry_id: 3,
        leaderboard_id: leaderboardData[0].id,
        entry_date: new Date().toISOString(),
        winner_id: user2.id,
        loser_id: user1.id,
      },
      {
        entry_id: 4,
        leaderboard_id: leaderboardData[1].id,
        entry_date: new Date().toISOString(),
        winner_id: user1.id,
        loser_id: user2.id,
      },
      {
        entry_id: 5,
        leaderboard_id: leaderboardData[1].id,
        entry_date: new Date().toISOString(),
        winner_id: user2.id,
        loser_id: user1.id,
      },
      {
        entry_id: 6,
        leaderboard_id: leaderboardData[1].id,
        entry_date: new Date().toISOString(),
        winner_id: user1.id,
        loser_id: user2.id,
      }
    ]

    await db.insert(leaderboard_entry).values(LeaderboardEntryData).returning();

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