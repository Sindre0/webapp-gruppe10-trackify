import LeaderboardButton from "../components/LeaderboardButton";

export default function LeaderboardMenu() {
    return (
        <section className='space-y-4 max-w-[80%] mx-auto mt-8'>
            <h1 className="text-2xl font-semibold mb-6">Leaderboard Menu</h1>
            <section className="shadow-md divide-y divide-gray-200">
                <LeaderboardButton href="leaderboard/ongoing-leaderboards">Ongoing Leaderboards</LeaderboardButton>
                <LeaderboardButton href="leaderboard/concluded-leaderboards">Concluded Leaderboards</LeaderboardButton>
                <LeaderboardButton href="leaderboard/create-leaderboard">Create a Leaderboard</LeaderboardButton>
                <LeaderboardButton href="#">Join a Leaderboard</LeaderboardButton>
                <LeaderboardButton href="#">My Leaderboards</LeaderboardButton>
            </section>
        </section>
    );
} 