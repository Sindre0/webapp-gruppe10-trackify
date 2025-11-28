import type { RequestInfo } from "rwsdk/worker";
import { UserLoginParams, UserRegisterParams, userService, UserService } from "./userService";

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
            const userID = context.params.userID;
            
            // Get user session from cookies
            const cookieHeader = context.request.headers.get("Cookie") || "";
            const cookies = cookieHeader.split(";").map((c) => c.trim());
            let authenticatedUserId: string | null = null;
            
            for (const cookie of cookies) {
                const [name, value] = cookie.split("=");
                if (name === "user_session") {
                    try {
                        const userData = JSON.parse(decodeURIComponent(value));
                        authenticatedUserId = userData.id;
                    } catch (e) {
                        console.error("Error parsing user session:", e);
                    }
                    break;
                }
            }

            if (!authenticatedUserId) {
                return new Response(JSON.stringify({
                    success: false,
                    error: { message: "Account is not authenticated", code: 401 }
                }), { 
                    status: 401,
                    headers: { "Content-Type": "application/json" }
                });
            }

            if (authenticatedUserId !== userID) {
                return new Response(JSON.stringify({
                    success: false,
                    error: { message: "Account is not authorized to delete this user", code: 403 }
                }), { 
                    status: 403,
                    headers: { "Content-Type": "application/json" }
                });
            }

            const dataFromService = await userService.deleteUser(userID);

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