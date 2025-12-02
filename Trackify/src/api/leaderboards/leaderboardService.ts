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

export type WinLossParams = {
    winnerId: string;
    loserId: string;
};

export interface LeaderboardService {
    list(params?: LeaderboardQueryParams): Promise<Result<any[]>>;
    getById(id: string): Promise<Result<any>>;
    getUsers(id: string): Promise<Result<any[]>>;
    getEntries(id: string): Promise<Result<any[]>>;
    create(params: CreateQueryParams, userId: string): Promise<Result<any>>;
    delete(leaderboardId: string, userId: string): Promise<Result<any>>;
    update(leaderboardId: string, params: CreateQueryParams): Promise<Result<any>>;
    addMatch(leaderboardId: string, params: WinLossParams): Promise<Result<any>>;
    addUser(leaderboardId: string, userId: string): Promise<Result<any>>;
    removeUser(leaderboardId: string, userId: string): Promise<Result<any>>;
}

export function createLeaderboardService(leaderboardRepository: LeaderboardRepository): LeaderboardService {
    return {
        async list(params?: LeaderboardQueryParams) : Promise<Result<any[]>> {
            return await leaderboardRepository.findMany(params);
        },
        async getById(id: string): Promise<Result<any>> {
            return await leaderboardRepository.findById(id);
        },
        async getUsers(id: string): Promise<Result<any[]>> {
            return await leaderboardRepository.findUsersByLeaderboardId(id);
        },
        async getEntries(id: string): Promise<Result<any[]>> {
            return await leaderboardRepository.findEntriesByLeaderboardId(id);
        },
        async create(params: CreateQueryParams, userId: string): Promise<Result<any>> {
            if (params.startDate === '') {
                params.startDate = undefined;
            }
            const result = await leaderboardRepository.createLeaderboard(params);
            if (!result.success) {
                return result;
            }
            const secondResult = await leaderboardRepository.attachUser(result.data[0].id, userId, true, true);
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
        },
        async update(leaderboardId: string,  params: CreateQueryParams): Promise<Result<any>> {
            return await leaderboardRepository.updateLeaderboard(leaderboardId, params);
        },
        async addMatch(leaderboardId: string, params: WinLossParams): Promise<Result<any>> {
            if (params.winnerId === params.loserId) {
                return { success: false, error: { message: "Winner and loser cannot be the same user", code: 409 } };
            }
            return await leaderboardRepository.addMatchResult(leaderboardId, params);
        },
        async addUser(leaderboardId: string, userId: string): Promise<Result<any>> {
            const isAttached = await leaderboardRepository.isUserAttached(leaderboardId, userId);
            if (!isAttached.success) {
                return { success: false, error: { message: "Failed to verify user attachment", code: 500 } };
            }
            if (isAttached.data) {
                return { success: false, error: { message: "User is already attached to the leaderboard", code: 409 } };
            }
            
            return await leaderboardRepository.attachUser(leaderboardId, userId, false, false);
        },
        async removeUser(leaderboardId: string, userId: string): Promise<Result<any>> {
            const isAttached = await leaderboardRepository.isUserAttached(leaderboardId, userId);
            if (!isAttached.success) {
                return { success: false, error: { message: "Failed to verify user attachment", code: 500 } };
            }
            if (!isAttached.data) {
                return { success: false, error: { message: "User is not attached to the leaderboard", code: 404 } };
            }
            
            return await leaderboardRepository.removeUser(leaderboardId, userId);
        }
    };
}

export const leaderboardService = createLeaderboardService(createLeaderboardRepository());