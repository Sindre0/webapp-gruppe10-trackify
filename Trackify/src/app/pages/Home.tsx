"use client";

import WelcomeMessage from "../components/WelcomeMessage";
import OngoingPreview from "../components/OngoingPreview";
import ConcludedPreview from "../components/ConcludedPreview";
import UpcomingMatches from "../components/UpcomingMatches";
import HomeLeaderboard from "../components/HomeLeaderboard";
import { useState } from "react";

export default function Home() {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<string | null>(null);


  return (
    <main >
      <WelcomeMessage />
      <div className="flex gap-8 mb-8 w-[70%] mx-auto">
        <div className="space-y-4"> 
          <OngoingPreview onSelect={setSelectedLeaderboard} />
          <ConcludedPreview onSelect={setSelectedLeaderboard} />
        </div>
      <HomeLeaderboard selectedLeaderboardId={selectedLeaderboard} />
      <section className="w-[30%] space-y-4">
        <UpcomingMatches />
      </section>
      </div>
    </main>
  );
}
