"use client";

import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/hooks/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/hooks/getUserLeaderboards";
import { navigate } from "rwsdk/client";
import LeaderboardButton from "../LeaderboardButton";

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
        <section className="space-y-4 max-w-[80%] mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Ongoing Leaderboards</h2>
            <ul className="mx-auto">
                {leaderboards.length === 0 ? (
                    <li>No ongoing leaderboards.</li>
                ) : (
                    leaderboards.map((leaderboard) => (
                        <li key={leaderboard.id}>
                            <LeaderboardButton href={`/leaderboard/ongoing-leaderboards/${leaderboard.id}`}>
                                {leaderboard.name}
                            </LeaderboardButton>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
}