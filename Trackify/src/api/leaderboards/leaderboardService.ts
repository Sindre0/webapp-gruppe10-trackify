import { Result } from "@/types/result";
import { createLeaderboardRepository, LeaderboardRepository } from "./leaderboardRepository";

export type LeaderboardQueryParams = {
    active?: boolean;
};

export type CreateQueryParams = {
    name: string;
    description: string;
    visibility: string;
    startDate: string | undefined;
    endDate: string;
};

export interface LeaderboardService {
    list(params?: LeaderboardQueryParams): Promise<Result<any[]>>;
    getById(id: string): Promise<Result<any>>;
    getEntries(id: string): Promise<Result<any[]>>;
    create(params?: CreateQueryParams, userId?: string): Promise<Result<any>>;
    delete(leaderboardId: string, userId: string): Promise<Result<any>>;
}

export function createLeaderboardService(leaderboardRepository: LeaderboardRepository): LeaderboardService {
    return {
        async list(params?: LeaderboardQueryParams) : Promise<Result<any[]>> {
            return await leaderboardRepository.findMany(params);

        },
        async getById(id: string): Promise<Result<any>> {
            return await leaderboardRepository.findById(id);
        },
        async getEntries(id: string): Promise<Result<any[]>> {
            return await leaderboardRepository.findEntriesByLeaderboardId(id);
        },
        async create(params: CreateQueryParams, userId: string): Promise<Result<any>> {
            if (params.startDate === '') {
                params.startDate = undefined;
            }
            const result = await leaderboardRepository.createLeaderboard(params);
            console.log("Created leaderboard:", result);
            if (!result.success) {
                return result;
            }
            console.log("Attaching user to leaderboard:", userId, result.data[0].id);
            const secondResult = await leaderboardRepository.attachUser(result.data[0].id, userId);
            if (!secondResult.success) {
                return secondResult;
            }
            return result;
        },
        async delete(leaderboardId: string, userId: string): Promise<Result<any>> {
            const ownerCheck = await leaderboardRepository.checkOwnerStatus(leaderboardId, userId);
            if (!ownerCheck.success) {
                return { success: false, error: { message: "Failed to verify owner status", code: 500 } };
            }
            if (!ownerCheck.data.is_owner) {
                return { success: false, error: { message: "User is not the owner of the leaderboard", code: 403 } };
            }
            
            const result = await leaderboardRepository.deleteLeaderboard(leaderboardId);
            if (!result.success) {
                return result;
            }
            const secondResult = await leaderboardRepository.removeAllUsers(leaderboardId);
            if (!secondResult.success) {
                return secondResult;
            }

            return result;
        }
    };
}

export const leaderboardService = createLeaderboardService(createLeaderboardRepository());