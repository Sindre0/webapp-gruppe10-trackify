import { route } from "rwsdk/router";
 import { userController } from "./userController";

export const userRoutes = [
    route("/:login", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("User route accessed with method:", method);
        switch (method) {
            case "get":
                return await userController.loginUser(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    })
];