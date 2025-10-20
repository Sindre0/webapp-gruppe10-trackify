import WelcomeMessage from "../components/WelcomeMessage";
import OngoingPreview from "../components/OngoingPreview";
import ConcludedPreview from "../components/ConcludedPreview";
import RecentLeaderboard from "../components/RecentLeaderboard";
import UpcomingMatches from "../components/UpcomingMatches";

export default function Home() {
  return (
    <div>
      <WelcomeMessage />
      <OngoingPreview />
      <ConcludedPreview />
      <RecentLeaderboard />
      <UpcomingMatches />
    </div>
  );
}
