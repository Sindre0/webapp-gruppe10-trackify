import type { RequestInfo } from "rwsdk/worker";
import { UserDeleteParams, UserLoginParams, UserRegisterParams, userService, UserService } from "./userService";

export function createUserController(userService: UserService) {
    return {
        async loginUser(context: RequestInfo) {
            const body = await context.request.json();
            const parameters: UserLoginParams = JSON.parse(JSON.stringify(body));

            const dataFromService = await userService.getByLogin(parameters);
                if (!dataFromService.success) {
                    return new Response(JSON.stringify(dataFromService), { 
                    status: dataFromService.error.code || 500 ,
                    headers: { "Content-Type": "application/json" }
                    })
                };

                return new Response(JSON.stringify({
                    ...dataFromService,
                }), { status: 200 , headers: { "Content-Type": "application/json" }  
                });
        },
        async registerUser(context: RequestInfo) {
            const body = await context.request.json();
            const parameters: UserRegisterParams = JSON.parse(JSON.stringify(body));

            const dataFromService = await userService.registerUser(parameters);
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                status: dataFromService.error.code || 500 ,
                headers: { "Content-Type": "application/json" }
                })
            };

            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 201 , headers: { "Content-Type": "application/json" }  
            });
        },
        async getLeaderboards(context: RequestInfo) {
            const userID = context.params.userID;
            console.log("Get leaderboards for userID:", userID);

            const dataFromService = await userService.getLeaderboards(userID);
            
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                status: dataFromService.error.code || 500 ,
                headers: { "Content-Type": "application/json" }
                })
            };

            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 200, headers: { "Content-Type": "application/json" }  
            });
        },
        async getUsername(context: RequestInfo) {
            const userID = context.params.userID;
            console.log("Get username for userID:", userID);
            const dataFromService = await userService.getUsername(userID);
            
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                status: dataFromService.error.code || 500 ,
                headers: { "Content-Type": "application/json" }
                })
            }
            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 200, headers: { "Content-Type": "application/json" }  
            });   
        },
        async getUserByEmail(context: RequestInfo) {
            const email = context.params.email;

            const dataFromService = await userService.getUserByEmail(email);
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                status: dataFromService.error.code || 500 ,
                headers: { "Content-Type": "application/json" }
                })
            }
            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 200, headers: { "Content-Type": "application/json" }  
            });
        },
        async deleteUser(context: RequestInfo) {
            const body = await context.request.json();
            let parameters = JSON.parse(JSON.stringify(body));
            parameters.userID = context.params.userID;
            
            const dataFromService = await userService.deleteUser(parameters);
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                status: dataFromService.error.code || 500 ,
                headers: { "Content-Type": "application/json" }
                })
            }
            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 200, headers: { "Content-Type": "application/json" }  
            });
        },
        async joinLeaderboard(context: RequestInfo) {
            const body = await context.request.json();
            const parameters = JSON.parse(JSON.stringify(body));
            const dataFromService = await userService.joinLeaderboard(parameters);
            if (!dataFromService.success) {
                return new Response(JSON.stringify(dataFromService), { 
                status: dataFromService.error.code || 500 ,
                headers: { "Content-Type": "application/json" }
                })
            }
            return new Response(JSON.stringify({
                ...dataFromService,
            }), { status: 201, headers: { "Content-Type": "application/json" }  
            });
        }
    }
}

export const userController = createUserController(userService); 