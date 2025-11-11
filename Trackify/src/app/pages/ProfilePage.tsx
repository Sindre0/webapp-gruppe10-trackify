import WelcomeMessage from "../components/WelcomeMessage";
import OngoingPreview from "../components/OngoingPreview";
import ConcludedPreview from "../components/ConcludedPreview";
import RecentLeaderboard from "../components/RecentLeaderboard";
import UpcomingMatches from "../components/UpcomingMatches";
import Profile from "../components/Profile";

export default function ProfilePage() {
  return (
    <main >
      <WelcomeMessage />
        <div className="mb-8 w-[70%] mx-auto space-y-4">
            <Profile />
      </div>
    </main>
  );
}
