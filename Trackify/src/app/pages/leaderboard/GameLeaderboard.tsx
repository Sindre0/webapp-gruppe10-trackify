"use client";

import WelcomeMessage from "../../components/WelcomeMessage";
import OngoingPreview from "../../components/ongoing-leaderboard/OngoingPreview";
import ConcludedPreview from "../../components/concluded-leaderboard/ConcludedPreview";
import UpcomingMatches from "../../components/UpcomingMatches";
import GameSpecificLeaderboard from "../../components/GameSpecificLeaderboard";
import Announcements from "../../components/Announcements";
import GraphRender from "../../components/GraphRender";
import HomeLeaderboard from "@/app/components/HomeLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/hooks/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/hooks/getUserLeaderboards";
import { check } from "drizzle-orm/gel-core";

export default function GameLeaderboard({id}: {id: string}) {
  const [isAllowedState, setIsAllowedState] = useState<boolean>(false);
  const user = useAuth();

  async function checkAuthorization() {
    if (!user?.id) return;
    await getUserLeaderboards(user.id).then(leaderboards => {
      leaderboards.forEach(async (leaderboard: any) => {
        if (leaderboard.leaderboard_id !== id) return;
        setIsAllowedState(true);
      });
    });
  }

  async function checkVisibility() {
    await getLeaderboardDetails(id).then(details => {
      if (details.visibility === "public") {
        setIsAllowedState(true);
      }
    });
  }

  useEffect(() => {
    checkVisibility();
    if (isAllowedState) {
    } else {
      checkAuthorization()
    };
  }, [user?.id]);

  return (
    <>
      {isAllowedState ? (
        <article className="w-[80%] mx-auto mt-6 mb-8 flex gap-6 min-h-[800px]">
          <aside className="w-[40%] h-full">
            <HomeLeaderboard selectedLeaderboardId={id} />
          </aside>
          <section className="w-[60%] flex flex-col gap-6 h-full">
            <section className="h-[33%] flex gap-6">
              <article className="w-1/2 h-full">
                <Announcements />
              </article>
              <article className="w-1/2 h-full">
                <UpcomingMatches />
              </article>
            </section>
            <section className="h-[67%]">
              <GraphRender />
            </section>
          </section>
        </article>
      ) : (
        <div className="text-center mt-20 font-semibold">Not authorized</div>
      )}
    </>
  );
}
