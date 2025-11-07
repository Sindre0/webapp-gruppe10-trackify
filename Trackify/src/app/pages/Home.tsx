import WelcomeMessage from "../components/WelcomeMessage";
import OngoingPreview from "../components/OngoingPreview";
import ConcludedPreview from "../components/ConcludedPreview";
import RecentLeaderboard from "../components/RecentLeaderboard";
import UpcomingMatches from "../components/UpcomingMatches";

export default function Home() {
  return (
    <main >
      <WelcomeMessage />
        <div className="flex gap-8 mb-8 w-[70%] mx-auto">
          <div className="space-y-4"> 
            <OngoingPreview />
            <ConcludedPreview />
          </div>
      <RecentLeaderboard />
      <section className="w-[30%] space-y-4">
        <UpcomingMatches />
      </section>
      </div>
    </main>
  );
}
