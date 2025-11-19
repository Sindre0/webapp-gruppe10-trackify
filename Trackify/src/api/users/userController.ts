import type { RequestInfo } from "rwsdk/worker";
import { userService, UserService } from "./userService";
import { error } from "console";


export function createUserController(userService: UserService) {
    return {
        async loginUser(context: RequestInfo) {
            const [email, password] = context.params.login.split(":");
            const login = { email, password };
            const dataFromService = await userService.getByLogin(login);

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
            const [username, email, password] = context.params.register.split(":");
            const register = { username, email, password };

            const dataFromService = await userService.registerUser(register);
            
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
        }
    }
}

export const userController = createUserController(userService); 