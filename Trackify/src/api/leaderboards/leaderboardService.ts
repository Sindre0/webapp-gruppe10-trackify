import { Result } from "@/types/result";
import { createLeaderboardRepository, LeaderboardRepository } from "./leaderboardRepository";

export type LeaderboardQueryParams = {
    active?: boolean;
};

export interface LeaderboardService {
    list(params?: LeaderboardQueryParams): Promise<Result<any[]>>;
    getById(id: string): Promise<Result<any | null>>;
}

export function createLeaderboardService(leaderboardRepository: LeaderboardRepository): LeaderboardService {
    return {
        async list(params?: LeaderboardQueryParams) {
            return await leaderboardRepository.findMany(params);

        },
        async getById(id: string): Promise<Result<any>> {
            // Placeholder implementation
            return {
                success: false,
                error: {
                    message: "Not implemented"
                }
            };
        },
    };
}

export const leaderboardService = createLeaderboardService(createLeaderboardRepository());