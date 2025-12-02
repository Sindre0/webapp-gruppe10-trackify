"use client";

import { getLeaderboardDetails } from "@/app/lib/api/getLeaderboardDetails";
import { getUserLeaderboards } from "@/app/lib/api/getUserLeaderboards";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

type ConcludedPreviewProps = {
    onSelect?: (id: string) => void;
};

export default function ConcludedPreview({ onSelect }: ConcludedPreviewProps) {
    const user = useAuth();
    const [leaderboards, setLeaderboards] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchLeaderboards = async () => {
            if (!user?.id) return;      
            const data: any = await getUserLeaderboards(user.id);
            if (data.length > 0) {
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
                console.error("no concluded leaderboards for this user ");
            } 
        };
        fetchLeaderboards();
    }, [user?.id]);

    return (
        <section className="block w-full">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Concluded Leaderboards</h2>
            <ul className="px-3 sm:px-5 py-3 border border-gray-300 shadow-md mx-auto mb-2">
                {leaderboards.length === 0 ? (
                    <li>No concluded leaderboards.</li>
                ) : (
                    leaderboards.slice(0, 3).map((leaderboard) => (
                        <li className="border-b border-black/20 mb-2 mt-2" key={leaderboard.id}>
                            <button
                                type="button"
                                className="text-left w-full hover:underline cursor-pointer text-sm sm:text-base"
                                onClick={() => onSelect?.(leaderboard.id)}
                            >
                                {leaderboard.name}
                            </button>
                        </li>
                    ))
                )}
                <a className="block mt-4 text-blue-600 text-sm" href="/leaderboard/concluded-leaderboards">View All </a>
            </ul>
        </section>
    );
}
