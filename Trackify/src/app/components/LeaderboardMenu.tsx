import LeaderboardButton from "./LeaderboardButton";

export default function LeaderboardMenu() {
    return (
        <section className='max-w-[80%] mx-auto mt-8'>
            <h1 className="text-2xl font-semibold mb-6">Leaderboard Menu</h1>
            <section className="shadow-md divide-y divide-gray-200">
                <LeaderboardButton href="/ongoing-leaderboards">Ongoing Leaderboards</LeaderboardButton>
                <LeaderboardButton href="/concluded-leaderboards">Concluded Leaderboards</LeaderboardButton>
                <LeaderboardButton href="#">Create a Leaderboard</LeaderboardButton>
                <LeaderboardButton href="#">Join a Leaderboard</LeaderboardButton>
                <LeaderboardButton href="#">My Leaderboards</LeaderboardButton>
            </section>
        </section>
    );
} 