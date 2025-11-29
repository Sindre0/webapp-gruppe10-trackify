import { route } from "rwsdk/router";
 import { userController } from "./userController";

export const userRoutes = [
    route("/login", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("User route accessed with method:", method);
        switch (method) {
            case "post":
                return await userController.loginUser(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/register", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("User route accessed with method:", method);
        switch (method) {
            case "post":
                return await userController.registerUser(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/join-leaderboard", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("User route accessed with method:", method);
        switch (method) {
            case "post":
                return await userController.joinLeaderboard(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:userID/leaderboards", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("User route accessed with method:", method);
        switch (method) {
            case "get":
                return await userController.getLeaderboards(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:userID/username", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("User route accessed with method:", method);
        switch (method) {
            case "get":
                return await userController.getUsername(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/email/:email", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("User route accessed with method:", method);
        switch (method) {
            case "get":
                return await userController.getUserByEmail(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/delete/:userID", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("User route accessed with method:", method);
        switch (method) {
            case "delete":
                return await userController.deleteUser(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }), 

];