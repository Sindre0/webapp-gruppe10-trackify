export default function WelcomeMessage() {
    const username = "Geir Ragnar";
    const rank = 1;
    const recentLeaderboard = "Sjakk HIOF sesong 4";

    return (
        <section className="flex justify-center mt-8 mb-8">
            <section className = "block w-[60%] border border-gray-300 shadow-md rounded-3xl px-5 py-3">
                <p>Welcome, {username}! You are ranked #{rank} on the {recentLeaderboard}</p>
            </section>
        </section>
    )
}