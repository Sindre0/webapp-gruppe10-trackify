import LeaderboardButton from "../../components/leaderboard/LeaderboardButton";

export default function LeaderboardMenu() {
    return (
        <section className="space-y-4 w-[95%] sm:w-[90%] lg:max-w-[80%] mx-auto mt-8 animate-fadeIn">
            <h1 className="text-xl sm:text-2xl font-semibold mb-4">Leaderboard Menu</h1>
            <section>
                <LeaderboardButton href="leaderboard/ongoing-leaderboards">Ongoing Leaderboards</LeaderboardButton>
                <LeaderboardButton href="leaderboard/concluded-leaderboards">Concluded Leaderboards</LeaderboardButton>
                <LeaderboardButton href="leaderboard/create-leaderboard">Create a Leaderboard</LeaderboardButton>
                <LeaderboardButton href="leaderboard/join-leaderboard">Join a Leaderboard</LeaderboardButton>
                <LeaderboardButton href="leaderboard/my-leaderboards">My Leaderboards</LeaderboardButton>
            </section>
        </section>
    );
} 