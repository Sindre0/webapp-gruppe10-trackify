"use client";

import UpcomingMatches from "../../components/leaderboard/UpcomingMatches";
import Announcements from "../../components/leaderboard/Announcements";
import HomeLeaderboard from "@/app/components/leaderboard/HomeLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/app/lib/api/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/app/lib/api/getUserLeaderboards";
import LeaderboardButton from "@/app/components/leaderboard/LeaderboardButton";

export default function GameLeaderboard({id}: {id: string}) {
  const [isAllowedState, setIsAllowedState] = useState<boolean>(false);
  const [isModerator, setIsModerator] = useState<boolean>(false);
  const user = useAuth();

  async function checkAuthorization() {
    if (!user?.id) return;
    await getUserLeaderboards(user.id).then(leaderboards => {
      leaderboards.forEach(async (leaderboard: any) => {
        if (leaderboard.leaderboard_id !== id) return;
        if (leaderboard.is_owner || leaderboard.is_mod) {
          setIsModerator(true);
        }
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
      return;
    } else {
      checkAuthorization()
    };
  }, [user?.id]);

  return (
    <>
      {isModerator && (
      <section className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mt-6">
        <LeaderboardButton href={`/leaderboard/my-leaderboards/${id}`}>You are an admin. Go to moderator page?</LeaderboardButton>
      </section>
      )}
      
      {isAllowedState ? (
        <article className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mt-6 flex flex-col lg:flex-row gap-4 sm:gap-6 min-h-[400px] lg:min-h-[800px]">
          <aside className="w-full lg:w-[40%] h-full">
            <HomeLeaderboard selectedLeaderboardId={id} />
          </aside>
          <section className="w-full lg:w-[60%] flex flex-col gap-4 sm:gap-6 h-full">
            <section className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <article className="w-full sm:w-1/2 h-full">
                <Announcements />
              </article>
              <article className="w-full md:w-1/2 h-full">
                <UpcomingMatches />
              </article>
            </section>
            <section className="flex-1">
              
            </section>
          </section>
        </article>
      ) : (
        <div className="text-center mt-20 font-semibold">Not authorized</div>
      )}
    </>
  );
}
