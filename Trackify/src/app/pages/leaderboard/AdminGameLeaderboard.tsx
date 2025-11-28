"use client";

import UpcomingMatches from "../../components/leaderboard/UpcomingMatches";
import Announcements from "../../components/leaderboard/Announcements";
import HomeLeaderboard from "@/app/components/leaderboard/HomeLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/app/lib/api/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/app/lib/api/getUserLeaderboards";
import { navigate } from "rwsdk/client";
import LeaderboardButton from "@/app/components/leaderboard/LeaderboardButton";
import { ArrowRight } from "react-feather";

export default function AdminGameLeaderboard({id}: {id: string}) {
  const [isBlockedState, setIsBlockedState] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useAuth();

  async function checkAuthorization() {
    if (!user?.id) return;
    await getUserLeaderboards(user.id).then(leaderboards => {
      leaderboards.forEach(async (leaderboard: any) => {
        if (leaderboard.leaderboard_id !== id) return;
        if (leaderboard.is_owner) {
          setIsBlockedState(false);
          setIsOwner(true);
        }
        else if (leaderboard.is_mod) {
          setIsBlockedState(false);
        }
        return;
      });
    });
  }

  useEffect(() => {
    checkAuthorization()
    setLoading(false);
  }, [user?.id]);

  function confirmDelete() {
    const confirmation = window.confirm("Are you sure you want to delete this leaderboard? This action cannot be undone.");
    return confirmation;
  }

  async function handleDelete() {
    if (!confirmDelete()) return;
    const response = await fetch(`/api/v1/leaderboards/delete`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        leaderboardId: id,
        userId: user?.id,
      }),
    });
    if (response.ok) {
      navigate("/leaderboard/my-leaderboards");
    }
  }

  return (
    <>
    {loading ? <div>Loading...</div> : (
      isBlockedState ? (
        <div>
          <h1 className="text-center mt-20 font-semibold">Not authorized</h1>
        </div>
      ) : (
        <article className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mt-6 mb-8 gap-6 min-h-[400px] lg:min-h-[800px] animate-fadeIn">
            <LeaderboardButton href = {`/leaderboard/ongoing-leaderboards/${id}`}>
              <h2>View Leaderboard</h2>
            </LeaderboardButton>
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">Admin Desk</h1>
            <section className="flex flex-col sm:flex-row bg-gray-50 border border-gray-800 shadow-2xl mt-6">
                <button 
                onClick={() => navigate(`/leaderboard/my-leaderboards/${id}/add-data`)}
                className="w-full border border-gray-200 hover:bg-gray-100 cursor-pointer text-base sm:text-lg font-medium py-3 sm:py-4 animate-fadeIn">
                    Add Data
                </button>
                <button 
                onClick={() => navigate(`/leaderboard/my-leaderboards/${id}/update-leaderboard`)}
                className="w-full border border-gray-200 hover:bg-gray-100 cursor-pointer text-base sm:text-lg font-medium py-3 sm:py-4 animate-fadeIn">
                    Change Settings
                </button>
                {isOwner && (
                <button 
                onClick={() => handleDelete()}
                className="w-full border text-red-500 border-gray-200 hover:bg-gray-100 cursor-pointer text-base sm:text-lg font-medium py-3 sm:py-4">
                    Delete Leaderboard
                </button>
                )}
            </section>            
        </article>
      )
    )}
      
    </>
  );
}
