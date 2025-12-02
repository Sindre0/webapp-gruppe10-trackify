"use client";

import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/app/lib/api/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/app/lib/api/getUserLeaderboards";
import LeaderboardButton from "@/app/components/leaderboard/LeaderboardButton";

export default function MyLeaderboards() {
    const user = useAuth();
    const [leaderboards, setLeaderboards] = useState<{ id: string; name: string; description: string | null }[]>([]);

    useEffect(() => {
        const fetchLeaderboards = async () => {
            if (!user?.id) return;

            const data: any = await getUserLeaderboards(user.id);

            if (data !== "Unknown Leaderboard") {
                const ownedLeaderboards = data.filter((item: any) => item.is_owner === true || item.is_mod === true);
                const leaderboardsData = await Promise.all(
                    ownedLeaderboards.map(async (item: any) => {
                        const details = await getLeaderboardDetails(item.leaderboard_id);
                        return {
                            id: item.leaderboard_id,
                            name: details.name,
                            description: details.description,
                        };
                    })
                );
                setLeaderboards(leaderboardsData);
            } 
        };
        fetchLeaderboards();
    }, [user?.id]);
        
    return (
        <section className="space-y-4 w-[95%] sm:w-[90%] lg:max-w-[80%] mx-auto mt-8 animate-fadeIn">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Leaderboards</h2>
            <ul className="mx-auto">
                {leaderboards.length === 0 ? (
                    <li>You don't own any leaderboards. Add one <a className="text-blue-700" href="/leaderboard/create-leaderboard">here.</a></li>
                ) : (
                    leaderboards.map((leaderboard) => (
                        <li key={leaderboard.id} className="mb-4">
                            <LeaderboardButton href={`/leaderboard/ongoing-leaderboards/${leaderboard.id}`}>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-xl">{leaderboard.name}</span>
                                    {leaderboard.description && (
                                        <span className="text-sm text-gray-600 font-normal">{leaderboard.description}</span>
                                    )}
                                </div>
                            </LeaderboardButton>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
}