export default function ConcludedPreview() {
    const leaderboards = [
        { id: 1, name: "Monopoly Game Night" },
        { id: 2, name: "Marvel Rivals" },
        { id: 3, name: "Sjakk HIOF sesong 3" },
    ];

    return (
        <section>
            <h2>Concluded Leaderboards</h2>
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
