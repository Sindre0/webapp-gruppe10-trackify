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
      <article className="w-[70%] mx-auto mb-8">
        <main className="flex gap-6 min-h-[800px]">
          <aside className="w-[40%] h-full">
              <GameSpecificLeaderboard />
          </aside>
          
          <section className="w-[60%] flex flex-col gap-6 h-full">
            <section className="h-[33%] flex gap-6">
              <article className="w-1/2 h-full">
                <Announcements />
              </article>
              <article className="w-1/2 h-full">
                <UpcomingMatches />
              </article>
            </section>
            <section className="h-[67%]">
              <GraphRender />
            </section>
          </section>
        </main>
      </article>
    </main>
  );
}
