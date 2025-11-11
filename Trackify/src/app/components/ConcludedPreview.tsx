"use client";

import { getLeaderboardDetails } from "@/hooks/getLeaderboardName";
import { getUserLeaderboards } from "@/hooks/getUserLeaderboards";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function ConcludedPreview() {
    const user = useAuth();
    const [leaderboards, setLeaderboards] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchLeaderboards = async () => {
            if (!user?.id) return;
            try {
                
                const data: any = await getUserLeaderboards(user.id);
                console.log("Fetching leaderboards for user ID:", data);

                if (data.length > 0) {
                    console.log("Fetched leaderboards:", data);
                    const leaderboardID = await Promise.all(
                        data.map(async (item: any) => {
                            const details = await getLeaderboardDetails(item.leaderboard_id);
                            if (details.active === true) {
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
                    console.error("Failed to fetch leaderboards: " + data.error?.message);
                }
            } catch (err) {
                console.error("Error fetching leaderboards:", err);
            }
        };
        fetchLeaderboards();
    }, [user?.id]);

    return (
        <section className="block w-64">
            <h2 className="m-2 text-lg">Concluded Leaderboards</h2>
            <ul className="px-5 py-3 border border-gray-300 shadow-md mx-auto mb-2">
                {leaderboards.length === 0 ? (
                    <li>No ongoing leaderboards.</li>
                ) : (
                    leaderboards.map((leaderboard) => (
                        <li className="border-b border-black/20 mb-2 mt-2" key={leaderboard.id}>
                            {leaderboard.name}
                        </li>
                    ))
                )}
                <a className="block mt-4 text-blue-600 text-sm" href="#">View All </a>
            </ul>
        </section>
    );
}
