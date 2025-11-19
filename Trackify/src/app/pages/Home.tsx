"use client";

import WelcomeMessage from "../components/WelcomeMessage";
import OngoingPreview from "../components/ongoing-leaderboard/OngoingPreview";
import ConcludedPreview from "../components/concluded-leaderboard/ConcludedPreview";
import UpcomingMatches from "../components/UpcomingMatches";
import HomeLeaderboard from "../components/HomeLeaderboard";
import { useState } from "react";

export default function Home() {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<string | null>(null);


  return (
    <main >
      <WelcomeMessage />
      <article className="flex gap-8 mb-8 w-[80%] mx-auto">
        <section className="space-y-4 w-[30%]"> 
          <OngoingPreview onSelect={setSelectedLeaderboard} />
          <ConcludedPreview onSelect={setSelectedLeaderboard} />
        </section>
        <HomeLeaderboard selectedLeaderboardId={selectedLeaderboard} />
        <section className="w-[35%] hidden md:block">
          <UpcomingMatches />
        </section>
      </article>
    </main>
  );
}
