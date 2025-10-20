export default function WelcomeMessage() {
    const username = "Geir Ragnar";
    const rank = 1;
    const recentLeaderboard = "Sjakk HIOF sesong 4";

    return (
        <section>
            <p>Welcome, {username}! You are ranked #{rank} on the {recentLeaderboard}</p>
        </section>
    )
}