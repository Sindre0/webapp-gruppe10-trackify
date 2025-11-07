import WelcomeMessage from "../components/WelcomeMessage";
import OngoingPreview from "../components/OngoingPreview";
import ConcludedPreview from "../components/ConcludedPreview";
import RecentLeaderboard from "../components/RecentLeaderboard";
import UpcomingMatches from "../components/UpcomingMatches";
import GameSpecificLeaderboard from "../components/GameSpecificLeaderboard";
import Announcements from "../components/Announcements";


export default function Home() {
  return (
    <main >
      <WelcomeMessage />
        <div className="gap-8 mb-8 w-[70%] mx-auto">
          <div className="flex flex-row space-y-4"> 
            <section className ="w-[100%]">
              <GameSpecificLeaderboard />
            </section>
            <section>   
                <Announcements />
            </section>
          </div>
      </div>
    </main>
  );
}
