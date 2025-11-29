import { drizzle } from "drizzle-orm/d1";
import { and, eq } from "drizzle-orm";
import type { Result } from "../../types/result";
import { leaderboards } from "@/db/schema/leaderboard-schema";
import { env } from "cloudflare:workers";
import { leaderboard_entry } from "@/db/schema/leaderboardEntry";
import { CreateQueryParams } from "./leaderboardService";
import { leaderboard_has_user } from "@/db/schema/leaderboardHasUser-schema";


export interface LeaderboardRepository {
    findMany(params?: any): Promise<Result<any[]>>;
    findById(id: string): Promise<Result<any>>;
    findUsersByLeaderboardId(id: string): Promise<Result<any[]>>;
    findEntriesByLeaderboardId(id: string): Promise<Result<any[]>>;
    createLeaderboard(params: CreateQueryParams): Promise<Result<any>>;
    deleteLeaderboard(id: string): Promise<Result<any>>;
    isUserAttached(leaderboardId: string, userId: string): Promise<Result<any>>;
    attachUser(leaderboardId: string, userId: string, isOwner: boolean, isMod: boolean): Promise<Result<any>>;
    removeUser(leaderboardId: string, userId: string): Promise<Result<any>>;
    removeAllUsers(leaderboardId: string): Promise<Result<any>>;
    checkOwnerStatus(leaderboardId: string, userId: string): Promise<Result<any>>;
}

export function createLeaderboardRepository(): LeaderboardRepository {
    return {
        async findMany(params?: any) {
            const db = drizzle(env.DB);
            let allLeaderboards = [];
            console.log("Finding leaderboards with params:", params);

            if (params?.active == "true") {
                allLeaderboards = await db.select().from(leaderboards).where(eq(leaderboards.active, true));
            }
            else if (params?.active == "false") {
                console.log("Finding leaderboards with active = false");
                allLeaderboards = await db.select().from(leaderboards).where(eq(leaderboards.active, false));
            }
            else {
                allLeaderboards = await db.select().from(leaderboards);
                console.log("Retrieved all leaderboards....");
            }

            return {success: true, data: allLeaderboards};
        },
        async findById(id: string) {
            const db = drizzle(env.DB);
            const leaderboard = await db.select().from(leaderboards).where(eq(leaderboards.id, id));

            if (leaderboard.length === 0) {
                return {
                    success: false,
                    error: {
                        code: 404,
                        message: "Leaderboard not found"
                    }
                };
            }
            return {success: true, data: leaderboard[0]};
        },
        async findUsersByLeaderboardId(id: string) {
            const db = drizzle(env.DB);
            const users = await db.select({user_id: leaderboard_has_user.user_id}).
            from(leaderboard_has_user).where(eq(leaderboard_has_user.leaderboard_id, id));
            if (users.length === 0) {
                return {
                    success: false,
                    error: {
                        code: 404,
                        message: "No users found"
                    }
                };
            }
            return {success: true, data: users};
        },
        async findEntriesByLeaderboardId(id: string) {
            const db = drizzle(env.DB);
            const entries = await db.select().from(leaderboard_entry).where(eq(leaderboard_entry.leaderboard_id, id));

            if (entries.length === 0) {
                return {
                    success: false,
                    error: {
                        code: 404,
                        message: "No entries found"
                    }
                };
            }

            return {success: true, data: entries};
        },
        async createLeaderboard(params: CreateQueryParams) {
            const db = drizzle(env.DB);
            const result = await db.insert(leaderboards).values({
                        id: crypto.randomUUID(),
                        name: params.name,
                        description: params.description,
                        visibility: params.visibility,
                        createdAt: params.startDate,
                        endDate: params.endDate
                }).returning();
            return { success: true, data: result };
        },
        async deleteLeaderboard(id: string) {
            const db = drizzle(env.DB);
            const result = await db.delete(leaderboards).where(eq(leaderboards.id, id));
            return { success: true, data: result };
        },
        async isUserAttached(leaderboardId: string, userId: string) {
            const db = drizzle(env.DB);
            const result = await db.select().from(leaderboard_has_user).where(and(
                eq(leaderboard_has_user.leaderboard_id, leaderboardId),
                eq(leaderboard_has_user.user_id, userId))
            );
            if (result.length > 0)
                return { success: true, data: true };
            return { success: true, data: false };
        },
        async attachUser(leaderboardId: string, userId: string, isOwner: boolean, isMod: boolean) {
            const db = drizzle(env.DB);
            console.log("Attaching user to leaderboard in repository:", leaderboardId, userId, isOwner, isMod);
            const result = await db.insert(leaderboard_has_user).values({ 
                leaderboard_id: leaderboardId, 
                user_id: userId,
                is_owner: isOwner,
                is_mod: isMod
            });

            return { success: true, data: result };
        },
        async removeUser(leaderboardId: string, userId: string) {
            const db = drizzle(env.DB);

            const result = await db.delete(leaderboard_has_user).where(
                and(
                    eq(leaderboard_has_user.leaderboard_id, leaderboardId),
                    eq(leaderboard_has_user.user_id, userId)
                )
            );

            return { success: true, data: result };
        },
        async removeAllUsers(leaderboardId: string) {
            const db = drizzle(env.DB);
            const result = await db.delete(leaderboard_has_user).where(eq(leaderboard_has_user.leaderboard_id, leaderboardId));

            return { success: true, data: result };
        },
        async checkOwnerStatus(leaderboardId: string, userId: string) {
            const db = drizzle(env.DB);
            const result = await db.select({
                is_owner: leaderboard_has_user.is_owner
            }
            ).from(leaderboard_has_user).where(and(
                eq(leaderboard_has_user.leaderboard_id, leaderboardId), eq(leaderboard_has_user.user_id, userId))
            );

            if (result.length === 0) {
                return {
                    success: false,
                    error: {
                        code: 404,
                        message: "No ownership record found"
                    }
                };
            }
            return { success: true, data: result[0] }; 
        }
    };
}