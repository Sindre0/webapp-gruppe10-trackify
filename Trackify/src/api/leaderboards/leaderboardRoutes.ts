import { route } from "rwsdk/router";
import { leaderboardController } from "./leaderboardController";

export const leaderboardRoutes = [
    route("/", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get":
                return await leaderboardController.listLeaderboards(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/create", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "post":
                return await leaderboardController.createLeaderboard(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/delete", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "delete":
                return await leaderboardController.deleteLeaderboard(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id/update", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "put":
                return await leaderboardController.updateLeaderboard(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id/add-match", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "post":
                return await leaderboardController.addMatchResult(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id/users", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get":
                return await leaderboardController.getLeaderboardUsers(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id/entries", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get":
                return await leaderboardController.getLeaderboardEntries(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id/entries/:userId", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get":
                return await leaderboardController.getLeaderboardUserEntries(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id/add-user/:userId", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "post":
                return await leaderboardController.addUserToLeaderboard(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id/remove-user/:userId", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "post":
                return await leaderboardController.removeUserFromLeaderboard(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/:id", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get":
                return await leaderboardController.getLeaderboardById(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
];