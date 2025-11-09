import { defineApp } from "rwsdk/worker";
import { layout, prefix, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import MainLayout from "./app/components/layouts/MainLayout";

import { seedData } from "./db/seed";
import { User, users } from "./db/schema/user-schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import LeaderboardMenu from "./app/pages/LeaderboardMenu";
import Home from "./app/pages/Home";
import LoginSite from "./app/pages/LoginSite";
import CreateAccount from "./app/pages/CreateAccount";
import NewLeaderboard from "./app/pages/NewLeaderboard";
import UpdateLeaderboard from "./app/pages/UpdateLeaderboard";
import AddLeaderboardData from "./app/pages/AddLeaderboardData";
import { leaderboardRoutes } from "./api/leaderboards/leaderboardRoutes";

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | null;
  authUrl: string;
};

export function extractSessionFromCookies(cookieHeader: string): string | null {
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  console.log("Extracting session from cookies:", cookies);
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "user_session") {
      return decodeURIComponent(value);
    }
  }

  return null;
}

export async function authenticationMiddleware({
  ctx,
  request,
}: {
  ctx: AppContext;
  request: Request;
}) {
  ctx.user = null;
  try {
    // Get session cookie
    console.log("Authenticating request...");
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return;
    }

    const userData = extractSessionFromCookies(cookies);

    if (!userData) {
      return;
    }
    ctx.user = JSON.parse(userData) as User;
    console.log("Authenticated user:", ctx.user);
  } catch (error) {
    console.error("Authentication middleware error:", error);
    ctx.user = null;
  }
}

export default defineApp([
  setCommonHeaders(),
  authenticationMiddleware,
  route("/api/seed", async () => {
    await seedData(env);
    return Response.json({ success: true });
    }),
  prefix("/api/v1/leaderboard", [leaderboardRoutes]),
  render(Document, [
    route("/login", async () => {
      return <LoginSite />;
    }),
    route("/create-account", async () => {
      return <CreateAccount />;
    }),
    layout(MainLayout, [
      route("/", async () => {
        return (
          <Home />
        );
      }),
      prefix("/leaderboard", [
        route("/", async () => { 
          return (  
            <LeaderboardMenu />
          );  
        }),
        route("/create-leaderboard", async () => { 
          return (  
            <NewLeaderboard />
          );  
        }),
        route("/my-leaderboards/:id/update-leaderboard", ({params}) => {
          const leaderboardId = params.id;

          return (  
            <UpdateLeaderboard id={leaderboardId} />
          );  
        }),
        route("/my-leaderboards/:id/add-data", ({params}) => {
          const leaderboardId = params.id;

          return (  
            <AddLeaderboardData id={leaderboardId} />
          );  
        }),
      ]),
      route("/test-db", async ({}) => {
        const db = drizzle(env.DB);
        const allUsers = await db.select().from(users);
        return Response.json(allUsers);
      }),
    ]),
  ]),
]);

