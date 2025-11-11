"use client";

import { useAuth } from "@/hooks/useAuth";
import { getLeaderboardDetails } from "@/hooks/getLeaderboardDetails";
import { useEffect, useState } from "react";
import { getUserLeaderboards } from "@/hooks/getUserLeaderboards";

type OngoingPreviewProps = {
    onSelect?: (id: string) => void;
};

export default function OngoingPreview({ onSelect }: OngoingPreviewProps) {
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
            <h2 className="text-2xl font-semibold mb-6">Ongoing Leaderboards</h2>
            <ul className="px-5 py-3 border border-gray-300 shadow-md mx-auto">
                {leaderboards.length === 0 ? (
                    <li>No ongoing leaderboards.</li>
                ) : (
                    leaderboards.map((leaderboard) => (
                        <li
                            className="border-b border-black/20 mb-2 mt-2"
                            key={leaderboard.id}
                        >
                            <button
                                type="button"
                                className="text-left w-full hover:underline"
                                onClick={() => onSelect?.(leaderboard.id)}
                            >
                                {leaderboard.name}
                            </button>
                        </li>
                    ))
                )}
                <a className="block mt-4 text-blue-600 text-sm" href="#">View All </a>
            </ul>
        </section>
    );
}
