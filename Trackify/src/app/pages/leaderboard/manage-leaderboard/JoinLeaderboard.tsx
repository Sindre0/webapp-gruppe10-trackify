"use client";

import { useState } from "react";
import LeaderboardButton from "../../../components/leaderboard/LeaderboardButton";
import { getLeaderboardDetails } from "@/app/lib/api/getLeaderboardDetails";
import { useAuth } from "@/hooks/useAuth";
import { API_ENDPOINTS } from "@/app/config/api";

export default function JoinLeaderboard() {
    const [addedLeaderboards, setAddedLeaderboards] = useState<{ id: string; name: string }[]>([]);
    const user = useAuth();

    async function handleJoin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const leaderboardCode = String(formData.get("leaderboard-code") ?? "").trim();

        const getResponse = await getLeaderboardDetails(leaderboardCode);
        if (getResponse === "Unknown Leaderboard") {
            alert("Leaderboard not found.");
            return;
        }
        if (getResponse.visibility === "private") {
            alert("Leaderboard is private.");
            return;
        }

        const postResponse = await fetch(`${API_ENDPOINTS.LEADERBOARDS}/${leaderboardCode}/add-user/${user?.id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ code: leaderboardCode }),
        });
        if (postResponse.status === 409) {
            alert("You are already a member of this leaderboard.");
            return;
        }
        if (postResponse.ok) {
            await postResponse.json();
            const details = await getLeaderboardDetails(leaderboardCode);
            setAddedLeaderboards(list => [...list, { id: leaderboardCode, name: details.name }]);
        }
    }

    return (
        <section className="space-y-4 w-[95%] md:w-[90%] mx-auto mt-8 animate-fadeIn">
            <h1 className="text-xl sm:text-2xl font-semibold mb-4">Join a Leaderboard</h1>
            <form onSubmit={handleJoin} className="bg-white shadow-md p-4 sm:p-6 space-y-6">
                <label className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between bg-gray-100 p-4">
                    <span className="text-gray-700 font-medium text-sm sm:text-base">Enter leaderboard code</span>
                    <input
                        type="text"
                        name="leaderboard-code"
                        placeholder="xxxxxxxx-yyyy-zzzz-uuuu-oooooooooooo"    
                        className="border border-gray-300 rounded px-2 py-1 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-[50%]"
                    />
                </label>
                <button
                    type="submit"
                    className="border border-gray-400 px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Add Leaderboard
                </button>
            </form>
            <section>
                {addedLeaderboards.length === 0 ? (
                    <h2 className="text-xl font-semibold mt-4">Add a leaderboard!</h2>
                ) : (
                    addedLeaderboards.map((leaderboard) => (
                        <div key={leaderboard.id}>
                            <LeaderboardButton href={`/leaderboard/ongoing-leaderboards/${leaderboard.id}`}>
                                Leaderboard added: {leaderboard.name}
                            </LeaderboardButton>
                        </div>
                    ))
                )}
            </section>
        </section>
    );
} 