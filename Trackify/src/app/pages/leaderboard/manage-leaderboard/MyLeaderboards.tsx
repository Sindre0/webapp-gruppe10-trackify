"use client";

import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/app/lib/api/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/app/lib/api/getUserLeaderboards";
import { navigate } from "rwsdk/client";
import LeaderboardButton from "@/app/components/leaderboard/LeaderboardButton";

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
            } catch  {
                console.log("No owned leaderboards for this user");
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