export default function OngoingPreview() {
    const leaderboards = [
        { id: 1, name: "Sjakk HIOF sesong 4" },
        { id: 2, name: "Counterstrike 2025" },
        { id: 3, name: "Golf Halden 2025" },
    ];

    return (
        <section>
            <h2>Ongoing Leaderboards</h2>
            <ul>
                {leaderboards.map((board) => (
                    <li key={board.id}>
                        {board.name}
                    </li>
                ))}
            </ul>
            <a href="#">View All </a>
        </section>
    );
}
