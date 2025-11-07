import LeaderboardButton from "../components/LeaderboardButton";

export default function LeaderboardMenu() {
    return (
        <section className='space-y-4 max-w-[80%] mx-auto mt-8'>
            <ul>
                <li className="pb-4">
                    <LeaderboardButton href="#">Ongoing Leaderboards</LeaderboardButton>
                </li>
                <li className="pb-4">
                    <LeaderboardButton href="#">Concluded leaderboards</LeaderboardButton>
                </li>
                <li className="pb-4">
                    <LeaderboardButton href="#">Create a leaderboard</LeaderboardButton>
                </li>
                <li className="pb-4">
                    <LeaderboardButton href="#">Join a leaderboard</LeaderboardButton>
                </li>
                <li className="pb-4">
                    <LeaderboardButton href="#">My leaderboards</LeaderboardButton>
                </li>
            </ul>
        </section>
    );
} 