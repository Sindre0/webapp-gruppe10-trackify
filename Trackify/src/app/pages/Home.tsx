"use client";

import WelcomeMessage from "../components/user/WelcomeMessage";
import OngoingPreview from "../components/leaderboard/ongoing-leaderboard/OngoingPreview";
import ConcludedPreview from "../components/leaderboard/concluded-leaderboard/ConcludedPreview";
import UpcomingMatches from "../components/leaderboard/UpcomingMatches";
import HomeLeaderboard from "../components/leaderboard/HomeLeaderboard";
import { useState } from "react";

export default function Home() {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<string | null>(null);


  return (
    <main className="animate-fadeIn">
      <WelcomeMessage />
      <article className="flex flex-col md:flex-row gap-4 md:gap-6 w-[95%] sm:w-[90%] lg:w-[80%] mx-auto">
        <section className="space-y-4 w-full md:w-[30%]"> 
          <OngoingPreview onSelect={setSelectedLeaderboard} />
          <ConcludedPreview onSelect={setSelectedLeaderboard} />
        </section>
        <section className="w-full md:w-[35%]">
          <HomeLeaderboard selectedLeaderboardId={selectedLeaderboard} />
        </section>
        <section className="w-full md:w-[35%] hidden md:block">
          <UpcomingMatches />
        </section>
      </article>
    </main>
  );
}
