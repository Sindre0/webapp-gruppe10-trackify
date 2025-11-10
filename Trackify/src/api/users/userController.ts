import type { RequestInfo } from "rwsdk/worker";
import { userService, UserService } from "./userService";
import { error } from "console";


export function createUserController(userService: UserService) {
    return {
        async loginUser(context: RequestInfo) {
            const [email, password] = context.params.login.split(":");
            const login = { email, password };
            console.log("Login parameter received:", login);
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
        }
    }
}

export const userController = createUserController(userService); 