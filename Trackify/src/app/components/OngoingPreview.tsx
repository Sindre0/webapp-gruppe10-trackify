export default function OngoingPreview() {
    const leaderboards = [
        { id: 1, name: "Sjakk HIOF sesong 4" },
        { id: 2, name: "Counterstrike 2025" },
        { id: 3, name: "Golf Halden 2025" },
    ];

    return (
        <section className="w-full">
            <h2 className="m-2 text-lg">Ongoing Leaderboards</h2>
            <ul className="px-5 py-3 border border-gray-300 shadow-md mx-auto">
                {leaderboards.map((board) => (
                    <li className="border-b border-black/20 mb-2 mt-2" key={board.id}>
                        {board.name}
                    </li>
                ))}
                <a className="block mt-4 text-blue-600 text-sm" href="#">View All </a>
            </ul>
        </section>
    );
}
