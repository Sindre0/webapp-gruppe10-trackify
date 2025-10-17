import { defineApp } from "rwsdk/worker";
import { layout, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import Nav from "./app/components/Nav"
import Breadcrumbs from "./app/components/Breadcrumbs";
import MainLayout from "./app/components/layouts/MainLayout";

import { User, users } from "./db/schema/user-schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";


export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
};

export default defineApp([
  setCommonHeaders(),
  render(Document, [
    layout(MainLayout, [
      route("/", async () => {
        return (
          <div style={{ width: "100%", margin: "0 auto" }}>
            <h1>Eksempel tittel</h1>
            <a href="/leaderboard">Leaderboard</a>
          </div>
        );
      }),
      route("/leaderboard", async () => { 
        return (  
          <div style={{ width: "100%", margin: "0 auto" }}>
            <p style={{paddingTop: "5rem"}}>This is a leaderboard site.</p>
          </div>
        );  
        },
      )
      ]),
    ]),
  ]);

