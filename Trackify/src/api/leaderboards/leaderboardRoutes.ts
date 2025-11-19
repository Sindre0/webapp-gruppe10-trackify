import { route } from "rwsdk/router";
import { leaderboardController } from "./leaderboardController";

export const leaderboardRoutes = [
    route("/", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("Leaderboard route accessed with method:", method);
        switch (method) {
            case "get":
                return await leaderboardController.listLeaderboards(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/create", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("Leaderboard route accessed with method:", method);
        switch (method) {
            case "post":
                return await leaderboardController.createLeaderboard(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/delete", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("Leaderboard route accessed with method:", method);
        switch (method) {
            case "delete":
                return await leaderboardController.deleteLeaderboard(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("Leaderboard route accessed with method:", method);
        switch (method) {
            case "get":
                return await leaderboardController.getLeaderboardById(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id/entries", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("Leaderboard route accessed with method:", method);
        switch (method) {
            case "get":
                return await leaderboardController.getLeaderboardEntries(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),

];