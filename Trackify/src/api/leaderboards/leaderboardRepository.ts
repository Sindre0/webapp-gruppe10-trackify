import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Result } from "../../types/result";
import { leaderboards } from "@/db/schema/leaderboard-schema";
import { env } from "cloudflare:workers";
import { leaderboard_entry } from "@/db/schema/leaderboardEntry";
import { CreateQueryParams } from "./leaderboardService";
import { leaderboard_has_user } from "@/db/schema/leaderboardHasUser-schema";


export interface LeaderboardRepository {
    findMany(params?: any): Promise<Result<any[]>>;
    findById(id: string): Promise<Result<any>>;
    findEntriesByLeaderboardId(id: string): Promise<Result<any[]>>;
    createLeaderboard(params: CreateQueryParams): Promise<Result<any>>;
    attachUser(leaderboardId: string, userId: string): Promise<Result<any>>;
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
        async attachUser(leaderboardId: string, userId: string) {
            const db = drizzle(env.DB);

            const result = await db.insert(leaderboard_has_user).values({ 
                leaderboard_id: leaderboardId, 
                user_id: userId,
                is_owner: true,
                is_mod: true
            });

            return { success: true, data: result };
        }
    };
}