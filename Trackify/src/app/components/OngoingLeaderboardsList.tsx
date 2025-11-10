export default function OngoingLeaderboardsList() {
    const ongoingLeaderboards = [
        { id: 1, name: "Sjakk HIOF sesong 4", participants: 12,},
        { id: 2, name: "F13th the game 2024", participants: 18},
        { id: 3, name: "Frisbeegolf Halden 2025", participants: 8},
        { id: 4, name: "FIFA Tournament 2025", participants: 24},
        { id: 5, name: "Valorant Community Cup", participants: 16},
        { id: 6, name: "League of Legends Høst Split", participants: 10},
        { id: 7, name: "Mario Kart Championship", participants: 12},
        { id: 8, name: "Rocket League Cup", participants: 15}
    ];

    return (
        <section className="w-full">
            <h1 className="text-2xl font-semibold mb-6">Ongoing Leaderboards</h1>
            <ul className="border border-gray-300 shadow-md divide-y divide-gray-200">
                {[...ongoingLeaderboards]
                    .sort((a, b) => b.participants - a.participants)
                    .map((board) => (
                    <li key={board.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{board.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {board.participants} participants
                                </p>
                            </div>
                            <a href={`/game-leaderboard`} 
                               className="text-blue-600 hover:text-blue-800 text-sm">
                                View Leaderboard
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}