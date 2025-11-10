import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Result } from "../../types/result";
import { leaderboards } from "@/db/schema/leaderboard-schema";
import { env } from "cloudflare:workers";


export interface LeaderboardRepository {
    findMany(params?: any): Promise<Result<any[]>>;
    findById(id: string): Promise<Result<any>>;
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
    };
}