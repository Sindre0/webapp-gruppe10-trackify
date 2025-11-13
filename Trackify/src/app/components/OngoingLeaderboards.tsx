"use client";

import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/hooks/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/hooks/getUserLeaderboards";

export default function OngoingLeaderboards() {
    const user = useAuth();
    const [leaderboards, setLeaderboards] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchLeaderboards = async () => {
            if (!user?.id) return;
            try {
                const data: any = await getUserLeaderboards(user.id);

                if (data.length > 0) {
                    console.log("Fetched ongoing leaderboards.");
                    const leaderboardID = await Promise.all(
                        data.map(async (item: any) => {
                            const details = await getLeaderboardDetails(item.leaderboard_id);
                            if (details.active === false) {
                                return null;
                            }
                            return {
                                id: item.leaderboard_id,
                                name: details.name
                            };
                        })
                    );
                    setLeaderboards(leaderboardID.filter((item: any) => item !== null));
                } else {
                    console.error("Failed to fetch ongoing leaderboards: " + data.error?.message);
                }
            } catch (err) {
                console.error("Error fetching ongoing leaderboards:", err);
            }
        };
        fetchLeaderboards();
    }, [user?.id]);
        
    return (
        <section className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Ongoing Leaderboards</h2>
            <ul className=" mx-auto">
                {leaderboards.length === 0 ? (
                    <li>No ongoing leaderboards.</li>
                ) : (
                    leaderboards.map((leaderboard) => (
                        <li
                            className="border shadow-md border-gray-200 rounded-3xl bg-gray-50 px-6 py-4 hover:bg-gray-100 cursor-pointer text-lg font-medium mb-4"
                            key={leaderboard.id}
                        >
                            {leaderboard.name}
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
}