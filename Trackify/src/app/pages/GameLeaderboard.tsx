import WelcomeMessage from "../components/WelcomeMessage";
import OngoingPreview from "../components/OngoingPreview";
import ConcludedPreview from "../components/ConcludedPreview";
import RecentLeaderboard from "../components/RecentLeaderboard";
import UpcomingMatches from "../components/UpcomingMatches";
import GameSpecificLeaderboard from "../components/GameSpecificLeaderboard";
import Announcements from "../components/Announcements";
import GraphRender from "../components/GraphRender";




export default function GameLeaderboard() {
  return (
    <main>
      <WelcomeMessage />
      <div className="w-[70%] mx-auto mb-8">
        <div className="flex gap-8">
          <section className="w-[40%]">
            <GameSpecificLeaderboard />
          </section>
          <section className="w-[60%] flex flex-col gap-4">
            <section className="flex gap-4">
              <section className="w-1/2">
                <Announcements />
              </section>
              <section className="w-1/2">
                <UpcomingMatches />
              </section>
            </section>
            <GraphRender />
          </section>
        </div>
      </div>
    </main>
  );
}
