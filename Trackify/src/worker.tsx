import { defineApp } from "rwsdk/worker";
import { layout, prefix, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import MainLayout from "./app/components/layouts/MainLayout";
import { leaderboardRoutes } from "./api/leaderboards/leaderboardRoutes";
import { userRoutes } from "./api/users/userRoutes";

import { seedData } from "./db/seed";
import { User, users } from "./db/schema/user-schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import LeaderboardMenu from "./app/pages/leaderboard/LeaderboardMenu";
import Home from "./app/pages/Home";
import LoginSite from "./app/pages/user/LoginSite";
import CreateAccount from "./app/pages/user/CreateAccount";
import OngoingLeaderboards from "./app/components/leaderboard/ongoing-leaderboard/OngoingLeaderboards";
import ConcludedLeaderboards from "./app/components/leaderboard/concluded-leaderboard/ConcludedLeaderboards";
import GameLeaderboard from "./app/pages/leaderboard/GameLeaderboard";
import Profile from "./app/components/user/Profile";
import NewLeaderboard from "./app/pages/leaderboard/manage-leaderboard/NewLeaderboard";
import UpdateLeaderboard from "./app/pages/leaderboard/manage-leaderboard/UpdateLeaderboard";
import AddLeaderboardData from "./app/pages/leaderboard/manage-leaderboard/AddLeaderboardData";
import Announcements from "./app/components/leaderboard/Announcements";
import MyLeaderboards from "./app/pages/leaderboard/manage-leaderboard/MyLeaderboards";
import AdminGameLeaderboard from "./app/pages/leaderboard/AdminGameLeaderboard";
import JoinLeaderboard from "./app/pages/leaderboard/manage-leaderboard/JoinLeaderboard";
import { API_ENDPOINTS } from "./app/config/api";
import { AuthProvider } from "./app/AuthContext";

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | null;
  authUrl: string;
};

export function extractSessionFromCookies(cookieHeader: string): string | null {
  const cookies = cookieHeader.split(";").map((c) => c.trim());
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
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return;
    }

    const userData = extractSessionFromCookies(cookies);

    if (!userData) {
      return;
    }
    ctx.user = JSON.parse(userData) as User;
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
  prefix(API_ENDPOINTS.LEADERBOARDS, [leaderboardRoutes]),
  prefix(API_ENDPOINTS.USERS, [userRoutes]),
  render(Document, [
    route("/login", async () => {
      return <LoginSite />;
    }),
    route("/create-account", async () => {
      return <CreateAccount />;
    }),
    route("/guest-leaderboard/:id", async ({params, ctx}) => { 
      const leaderboardId = params.id;
      const user = ctx?.user ?? undefined;
      return (
        <AuthProvider user={user} requireAuth={false}>
          <GameLeaderboard id={leaderboardId} />
        </AuthProvider>
      );
    }),
    layout(MainLayout, [
      async (context) => {
        const user = context.ctx.user;
        if (!user) {
          // Makes sure that context is loaded before html renders. Avoids flickering.
          return <Home />;
        };
      },
      route("/", async () => {
        return (
          <Home />
        );
      }),
      route("/profile", async () => { 
        return (  
          <Profile />
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
        route("/join-leaderboard", async () => { 
          return (  
            <JoinLeaderboard />
          );  
        }),
        route("/my-leaderboards", async () => {
          return (
              <MyLeaderboards />
          );
        }),
        route("/my-leaderboards/:id", async ({params}) => {
          const leaderboardId = params.id;
          return (
              <AdminGameLeaderboard id={leaderboardId} />
          );
        }),
        route("/my-leaderboards/:id/update-leaderboard", async ({params}) => {
          const leaderboardId = params.id;
          return (  
            <UpdateLeaderboard id={leaderboardId} />
          );  
        }),
        route("/my-leaderboards/:id/add-data", async ({params}) => {
          const leaderboardId = params.id;
          return (  
            <AddLeaderboardData id={leaderboardId} />
          );  
        }),
        route("/ongoing-leaderboards", async () => {  // OBS: Keep ongoing- and concluded-leaderboards above the :id route
          return (
              <OngoingLeaderboards />
          );
        }),
        route("/concluded-leaderboards", async () => {
          return (
            <ConcludedLeaderboards />
          );
        }),
        route("/ongoing-leaderboards/:id", async ({params}) => { 
          const leaderboardId = params.id;
          return (  
            <GameLeaderboard id={leaderboardId} />
          );
        }),
        route("/concluded-leaderboards/:id", async ({params}) => { 
          const leaderboardId = params.id;
          return (  
            <GameLeaderboard id={leaderboardId} />
          );
        }),
      ]),
    ]),
  ]),
]);




