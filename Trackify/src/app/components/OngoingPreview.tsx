"use client";

import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardName } from "@/hooks/getLeaderboardName";
import { useEffect, useState } from "react";

export default function OngoingPreview() {
    const user = useAuth();
    const [leaderboards, setLeaderboards] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchLeaderboards = async () => {
            if (!user?.id) return;
            try {
                const response = await fetch(`/api/v1/users/${encodeURIComponent(user.id)}/leaderboards`);
                const data: any = await response.json();
                console.log("Data received in OngoingPreview:", user.id);

                if (data.success) {
                    console.log("Fetched leaderboards:", data);
                    const leaderboardID = await Promise.all(
                        data.data.map(async (item: any) => {
                            const name = await getLeaderboardName(item.leaderboard_id);
                            return {
                                id: item.leaderboard_id,
                                name: name
                            };
                        })
                    );
                    setLeaderboards(leaderboardID);
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
            <h2 className="m-2 text-lg">Ongoing Leaderboards</h2>
            <ul className="px-5 py-3 border border-gray-300 shadow-md mx-auto">
                {leaderboards.map((leaderboard) => (
                    <li className="border-b border-black/20 mb-2 mt-2" key={leaderboard.id}>
                        {leaderboard.name}
                    </li>
                ))}
                <a className="block mt-4 text-blue-600 text-sm" href="#">View All </a>
            </ul>
        </section>
    );
}
