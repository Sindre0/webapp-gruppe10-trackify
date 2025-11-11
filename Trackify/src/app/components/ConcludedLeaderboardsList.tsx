export default function ConcludedLeaderboardsList() {
    const concludedLeaderboards = [
        { id: 1, name: "Chess Tournament Spring 2025", participants: 16, winner: "Magnus Karlsen" },
        { id: 2, name: "CS:GO Winter Cup", participants: 24, winner: "Team Frost" },
        { id: 3, name: "Sjakk HIOF sesong 3", participants: 12, winner: "Ganstas" },
        { id: 4, name: "FIFA Spring Championship", participants: 32, winner: "Lars Magne" },
        { id: 5, name: "Valorant Winter League", participants: 20, winner: "Team nub" },
        { id: 6, name: "Mario Kart Tournament", participants: 16, winner: "jæææh" },
        { id: 7, name: "League of Legends Spring Split", participants: 8, winner: "Team Dragons" },
        { id: 8, name: "Rocket League Winter Cup", participants: 15, winner: "Team Drams" }
    ];

    return (
        <section className="w-full">
            <h1 className="text-2xl font-semibold mb-6">Concluded Leaderboards</h1>
            <ul className="border border-gray-300 shadow-md divide-y divide-gray-200">
                {[...concludedLeaderboards]
                    .sort((a, b) => b.participants - a.participants)
                    .map((board) => (
                    <li key={board.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{board.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {board.participants} participants • Winner: {board.winner}
                                </p>
                            </div>
                            <a href={`/game-leaderboard`} 
                               className="text-blue-600 hover:text-blue-800 text-sm">
                                View Results
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}