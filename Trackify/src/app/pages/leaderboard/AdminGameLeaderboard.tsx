"use client";

import UpcomingMatches from "../../components/UpcomingMatches";
import Announcements from "../../components/Announcements";
import HomeLeaderboard from "@/app/components/HomeLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/hooks/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/hooks/getUserLeaderboards";
import { navigate } from "rwsdk/client";

export default function AdminGameLeaderboard({id}: {id: string}) {
  const [isAllowedState, setIsAllowedState] = useState<boolean>(true);
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
        <article className="w-[80%] mx-auto mt-6 mb-8 gap-6 min-h-[800px]">
            <h1 className="text-2xl font-semibold mb-2">Admin Desk</h1>
            <section className="flex bg-gray-50 border border-gray-800 shadow-2xl h-35">
                <button 
                onClick={() => navigate(`/leaderboard/my-leaderboards/${id}/add-data`)}
                className="w-full border border-gray-200 hover:bg-gray-100 cursor-pointer text-lg font-medium">
                    Add Data
                </button>
                <button 
                onClick={() => navigate(`/leaderboard/my-leaderboards/${id}/update-leaderboard`)}
                className="w-full border border-gray-200 hover:bg-gray-100 cursor-pointer text-lg font-medium">
                    Change Settings
                </button>
                <button 
                onClick={() => navigate(`/leaderboard/my-leaderboards/${id}/update-leaderboard`)}
                className="w-full border border-gray-200 hover:bg-gray-100 cursor-pointer text-lg font-medium">
                    Delete Leaderboard
                </button>

            </section>
        </article>
      ) : (
        <div className="text-center mt-20 font-semibold">Not authorized</div>
      )}
    </>
  );
}
