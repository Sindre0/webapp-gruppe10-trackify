import LeaderboardButton from "./LeaderboardButton";


export default function LeaderboardMenu() {
    return (
        <section className='space-y-4 max-w-[80%] mx-auto mt-8'>
            <LeaderboardButton href="#">Ongoing Leaderboards</LeaderboardButton>
            <LeaderboardButton href="#">Concluded leaderboards</LeaderboardButton>
            <LeaderboardButton href="#">Create a leaderboard</LeaderboardButton>
            <LeaderboardButton href="#">Join a leaderboard</LeaderboardButton>
            <LeaderboardButton href="#">My leaderboards</LeaderboardButton>
        </section>
    );
}