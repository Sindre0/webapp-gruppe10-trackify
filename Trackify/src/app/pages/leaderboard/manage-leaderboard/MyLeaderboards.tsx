"use client";

import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/hooks/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/hooks/getUserLeaderboards";
import { navigate } from "rwsdk/client";

export default function MyLeaderboards() {
    const user = useAuth();
    const [leaderboards, setLeaderboards] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchLeaderboards = async () => {
            if (!user?.id) return;
            try {
                const data: any = await getUserLeaderboards(user.id);

                if (data.length > 0) {
                    console.log("Fetched owned leaderboards.");
                    const leaderboardID = await Promise.all(
                        data.map(async (item: any) => {
                            const details = await getLeaderboardDetails(item.leaderboard_id);
                            if (item.is_owner === true || item.is_mod === true) {
                                return {
                                    id: item.leaderboard_id,
                                    name: details.name
                                };
                            }
                            return;
                        })
                    );
                    setLeaderboards(leaderboardID.filter((item: any) => item !== null));
                } else {
                    console.error("Failed to fetch owned leaderboards: " + data.error?.message);
                }
            } catch (err) {
                console.error("Error fetching owned leaderboards:", err);
            }
        };
        fetchLeaderboards();
    }, [user?.id]);
        
    return (
        <section className="space-y-4 max-w-[80%] mx-auto mt-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4">My Leaderboards</h2>
            <ul className="mx-auto">
                {leaderboards.length === 0 ? (
                    <li>You don't own any leaderboards.</li>
                ) : (
                    leaderboards.map((leaderboard) => (
                        <li
                            key={leaderboard.id}
                        >
                            <button 
                            onClick={() => navigate(`/leaderboard/my-leaderboards/${leaderboard.id}`)}
                            className="w-full text-left border shadow-md border-gray-200 rounded-3xl bg-gray-50 px-6 py-4 hover:bg-gray-100 cursor-pointer text-lg font-medium mb-4 animate-fadeIn">
                                {leaderboard.name}
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
}