export default function ConcludedPreview() {
    const leaderboards = [
        { id: 1, name: "Monopoly Game Night" },
        { id: 2, name: "Marvel Rivals" },
        { id: 3, name: "Sjakk HIOF sesong 3" },
    ];

    return (
        <section className="block w-64">
            <h2 className="m-2 text-lg">Concluded Leaderboards</h2>
            <ul className="px-5 py-3 border border-gray-300 shadow-md mx-auto mb-2">
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
