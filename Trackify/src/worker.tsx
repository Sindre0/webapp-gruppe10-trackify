import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";

import { User, users } from "./db/schema/user-schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import Breadcrumbs from "./app/components/Breadcrumbs";
import EksempelKomponent from "./app/components/EksempelKomponent";

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
    route("/", async () => {
      return ( 

        <div style={{ width: "100%", margin: "0 auto" }}>
          <div>
          <Breadcrumbs/>
          </div>
          <h1>Eksempel tittel</h1>
          <a href="/leaderboard">Leaderboard</a>
          <EksempelKomponent/>
        </div>
      );
    }),
    route("/home", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/" },
          });
        }
      },
      Home,
    ]),
    route("/leaderboard", [
      async () => {
      return (  
        <div style={{ width: "100%", margin: "0 auto" }}>
          <Breadcrumbs/>
          <p style={{paddingTop: "5rem"}}>This is a leaderboard site.</p>
        </div>
      );  
      },
    ])
  ]),
]);
