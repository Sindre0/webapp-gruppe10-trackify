import { getLeaderboardDetails } from "@/app/lib/api/getLeaderboardDetails";
import { getLeaderboardEntries } from "@/app/lib/api/getLeaderboardEntries";
import { getUsername } from "@/app/lib/api/getUsername";
import { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { navigate } from "rwsdk/client";

type HomeLeaderboardProps = {
    selectedLeaderboardId: string | null;
};

type PlayerStats = {
    id: string;
    name: string;
    wins: number;
    losses: number;
    winRatio: number;
};

export default function HomeLeaderboard({ selectedLeaderboardId }: HomeLeaderboardProps) {
    const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
    const [leaderboardName, setLeaderboardName] = useState<string | null>(null);
    const [leaderboardDescription, setLeaderboardDescription] = useState<string | null>(null);
    const [leaderboardState, setLeaderboardState] = useState<string>("");
    const [isHomePage, setIsHomePage] = useState<boolean>(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);

    useEffect(() => {
        if (!selectedLeaderboardId) {
            setLeaderboardName(null);
            setPlayerStats([]);
            return;
        }

        if (window.location.pathname === "/") {
            setIsHomePage(true);
        } 

        (async () => {
            try {
                const [details, entries] = await Promise.all([
                    getLeaderboardDetails(selectedLeaderboardId),
                    getLeaderboardEntries(selectedLeaderboardId)
                ]);

                setLeaderboardName(details?.name ?? "Unnamed leaderboard");
                setLeaderboardDescription(details?.description ?? null);
                details?.active ? setLeaderboardState("ongoing") : setLeaderboardState("concluded");

                const matchResultsMap = new Map<string, { wins: number; losses: number }>();
                (entries as any[]).forEach((entry: any) => {
                    const winnerID = entry.winner_id;
                    const loserID = entry.loser_id;

                    if (!matchResultsMap.has(winnerID)) matchResultsMap.set(winnerID, { wins: 0, losses: 0 });
                    if (!matchResultsMap.has(loserID)) matchResultsMap.set(loserID, { wins: 0, losses: 0 });

                    matchResultsMap.get(winnerID)!.wins += 1;
                    matchResultsMap.get(loserID)!.losses += 1;
                });

                const savingPlayerStats: PlayerStats[] = await Promise.all(
                    Array.from(matchResultsMap.entries()).map(async ([id, results]) => {
                        const totalGames = results.wins + results.losses;
                        const winRatio = totalGames > 0 ? results.wins / totalGames : 0;
                        const name = await getUsername(id);

                        return { id, name: String(name ?? "Unknown"), wins: results.wins, losses: results.losses, winRatio };
                    })
                );

                savingPlayerStats.sort((a, b) => b.winRatio === a.winRatio ? b.wins - a.wins : b.winRatio - a.winRatio);
                setPlayerStats(savingPlayerStats);
            } catch (error) {
                try {
                    const details = await getLeaderboardDetails(selectedLeaderboardId);
                    setPlayerStats([]);
                    setLeaderboardName(details?.name);
                } catch {
                    console.error("Error fetching leaderboard data:", error);
                    setPlayerStats([]);
                    setLeaderboardName("Empty leaderboard");
                }
            }
        })();
    }, [selectedLeaderboardId]);

    return (
        <section className="block w-full">

            {selectedLeaderboardId ? ( isHomePage ? (
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <button
                        className="text-left flex-1"
                        onClick={() => {navigate(`/leaderboard/${leaderboardState}-leaderboards/${selectedLeaderboardId}`)}}>
                        <h2 className="text-blue-600 underline cursor-pointer text-xl sm:text-2xl font-semibold">
                            {leaderboardName ?? "Loading..."}
                        </h2>
                    </button>
                    {leaderboardDescription && (
                        <button
                            onClick={() => setShowDescriptionModal(true)}
                            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors whitespace-nowrap"
                        >
                            View Description
                        </button>
                    )}
                </div>
                ) : (
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold flex-1">
                            {leaderboardName ?? "Loading."}
                        </h2>
                        {leaderboardDescription && (
                            <button
                                onClick={() => setShowDescriptionModal(true)}
                                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors whitespace-nowrap"
                            >
                                View Description
                            </button>
                        )}
                    </div> )
            ) : <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Home Page</h2>}

            {selectedLeaderboardId ? (
                <div className="p-2 sm:p-4 border border-gray-300 shadow-sm rounded bg-white">
                    {playerStats.length > 0 ? (
                        <ul className="space-y-2">
                            {playerStats.map((player, index) => (
                                <li
                                    key={player.id}
                                    className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <h3 className="flex items-center gap-3 text-gray-700 font-semibold">
                                        <span className=" text-lg  w-8">
                                            {index + 1}.
                                        </span>
                                        {player.name}
                                    </h3>
                                    <section className="flex items-center gap-4 text-gray-400">
                                        <p className="font-semibold">
                                            <span className="text-green-600">{player.wins}W</span>
                                            -
                                            <span className="text-red-600">{player.losses}L</span>
                                        </p>
                                        ({(player.winRatio * 100).toFixed(1)}%)
                                    </section>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center">No entries found for this leaderboard.</p>
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center flex-col h-40 border border-gray-300 shadow-sm rounded bg-white">
                    <ArrowLeft size={32} className="mx-auto mb-4" />
                    <p className="text-gray-500 w-[80%] text-center">Select a leaderboard to view details here.</p>
                </div>
            )}

            {/* Beskrivelse vindu */}
            {showDescriptionModal && (
                <div 
                    className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm"
                    onClick={() => setShowDescriptionModal(false)}
                >
                    <div 
                        className="bg-white/90 rounded-lg shadow-lg border border-gray-200 max-w-6xl w-[90%] max-h-[80vh] p-12 animate-fadeIn overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Description</h3>
                            <button
                                onClick={() => setShowDescriptionModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{leaderboardDescription}</p>
                    </div>
                </div>
            )}
        </section>
    );
}
