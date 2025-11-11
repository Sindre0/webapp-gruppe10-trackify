import type { RequestInfo } from "rwsdk/worker";
import { leaderboardService, LeaderboardService } from "./leaderboardService";
import { error } from "console";


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
    }
}
}

export const leaderboardController = createLeaderboardController(leaderboardService); 