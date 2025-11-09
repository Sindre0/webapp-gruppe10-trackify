import { route } from "rwsdk/router";
import { leaderboardController } from "./leaderboardController";

export const leaderboardRoutes = [
    // Define leaderboard related routes here
    route("/", async (ctx: any) => {
        const method = ctx.request.method.toLowerCase();
        console.log("Leaderboard route accessed with method:", method);
        switch (method) {
            case "get":
                return await leaderboardController.listLeaderboards(ctx);
            case "post":
                // Handle leaderboard creation
                break;
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    })
];