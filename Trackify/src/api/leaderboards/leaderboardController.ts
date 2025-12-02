import type { RequestInfo } from "rwsdk/worker";
import { leaderboardService, LeaderboardService } from "./leaderboardService";

export function createLeaderboardController(leaderboardService: LeaderboardService) {
    return {
        async listLeaderboards(context: RequestInfo) {
            try {
                const searchParams = new URL(context.request.url).searchParams;
                const searchEntries = Object.fromEntries(searchParams.entries());
                const dataFromService = await leaderboardService.list(searchEntries);
                
                if (!dataFromService.success) {
                    return new Response(JSON.stringify(dataFromService), { 
                        status: dataFromService.error.code || 500 ,
                        headers: { "Content-Type": "application/json" }})
                };

                return new Response(JSON.stringify({
                    ...dataFromService,
                    params: searchEntries
                }), { status: 200 , headers: { "Content-Type": "application/json" }  
                });
                }
            catch {
                return new Response(JSON.stringify({
                    error: "Failed to list leaderboards",
                    success: false
                }), { status: 500 , headers: { "Content-Type": "application/json" }  
                });
            }     
        },
        async getLeaderboardById(context: RequestInfo) {
            const id  = context.params.id;
            const dataFromService = await leaderboardService.getById(id);

            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }})
            };

            return new Response(JSON.stringify({
                ...dataFromService,
                id: id
            }), { status: 200 , headers: { "Content-Type": "application/json" }  
            });
        },
        async getLeaderboardUsers(context: RequestInfo) {
            const id  = context.params.id;
            const dataFromService = await leaderboardService.getUsers(id);

            if (!dataFromService.success) {
            return new Response(JSON.stringify(dataFromService), { 
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }})
            };

            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 200 , headers: { "Content-Type": "application/json" }  
            });
        },
        async getLeaderboardEntries(context: RequestInfo) {
            const id  = context.params.id;
            const dataFromService = await leaderboardService.getEntries(id);

            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }})
            };

            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 200 , headers: { "Content-Type": "application/json" }  
            });
        },
        async createLeaderboard(context: RequestInfo) {
            const body = await context.request.json();
            const parameters = JSON.parse(JSON.stringify(body));

            let params;
            let userID;
            try {
                userID = parameters.userId as string;
                params = {
                    name: parameters.name as string,
                    description: parameters.description as string,
                    visibility: parameters.visibility as string,
                    startDate: parameters.startDate as string,
                    endDate: parameters.endDate as string,
                };
            } catch {
                return new Response(JSON.stringify({
                    error: "Invalid parameters", code: 400, success: false
                }), { status: 400 , headers: { "Content-Type": "application/json" }  
                });
            }

            const dataFromService = await leaderboardService.create(params, userID);
              
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }})
            };

            return new Response(JSON.stringify({
                ...dataFromService,
                params: params
            }), { status: 201 , headers: { "Content-Type": "application/json" }  
            });
        },
        async deleteLeaderboard(context: RequestInfo) {
            const body = await context.request.json();
            const parameters = JSON.parse(JSON.stringify(body));

            let userId;
            let leaderboardId;
            try {
                userId = parameters.userId as string;
                leaderboardId = parameters.leaderboardId as string;
            } catch {
                return new Response(JSON.stringify({
                    error: "Invalid parameters", code: 400, success: false
                }), { status: 400 , headers: { "Content-Type": "application/json" }  
                });
            }

            const dataFromService = await leaderboardService.delete(leaderboardId, userId);
            
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }})
            }
            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 200 , headers: { "Content-Type": "application/json" }  
            });
        },
        async updateLeaderboard(context: RequestInfo) {
            const body = await context.request.json();
            const parameters = JSON.parse(JSON.stringify(body));
            const leaderboardId = context.params.id;
            
            const dataFromService = await leaderboardService.update(leaderboardId, parameters);
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }})
            }
            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 201, headers: { "Content-Type": "application/json" }  
            });
        },
        async addMatchResult(context: RequestInfo) {
            const body = await context.request.json();
            const parameters = JSON.parse(JSON.stringify(body));
            const leaderboardId = context.params.id;
            const dataFromService = await leaderboardService.addMatch(leaderboardId, parameters);
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), {
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }})
            }
            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 201, headers: { "Content-Type": "application/json" }
            });
        },
        async addUserToLeaderboard(context: RequestInfo) {
            const userId = context.params.userId;
            const leaderboardId = context.params.id;

            const dataFromService = await leaderboardService.addUser(leaderboardId, userId);
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }})
            }
            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 201, headers: { "Content-Type": "application/json" }  
            });
        },
        async removeUserFromLeaderboard(context: RequestInfo) {
            const userId = context.params.userId;
            const leaderboardId = context.params.id;
            const dataFromService = await leaderboardService.removeUser(leaderboardId, userId);
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }})
            }
            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 200 , headers: { "Content-Type": "application/json" }  
            });
        }
    };
};

export const leaderboardController = createLeaderboardController(leaderboardService); 