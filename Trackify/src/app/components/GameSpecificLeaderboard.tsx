export default function(){
  const leaderboard = {
    name: "Counter-Strike: Global Offensive",
    placings: [
      { player: "Kent", wins: 28, losses: 12 },
      { player: "Kevin", wins: 25, losses: 15 },
      { player: "Leif", wins: 25, losses: 16 },
      { player: "Lars", wins: 20, losses: 20 },
      { player: "Linda", wins: 18, losses: 22 },
      { player: "Kari", wins: 30, losses: 10 },
      { player: "Lene", wins: 15, losses: 25 },
      { player: "Kai", wins: 10, losses: 20 },
      { player: "Tom", wins: 30, losses: 10 },
      { player: "Bjørn", wins: 21, losses: 12 },
      { player: "Gaute", wins: 25, losses: 15 },
      { player: "Lasse", wins: 25, losses: 16 },
      { player: "Sander", wins: 20, losses: 20 },
      { player: "Max", wins: 18, losses: 22 },
      { player: "Sindre", wins: 30, losses: 10 },
      { player: "Sondre", wins: 15, losses: 25 },
      { player: "Geir", wins: 10, losses: 20 },
      { player: "Eirik", wins: 30, losses: 10 },
    ],
  };

  if (!leaderboard) {
    return <p>No recent leaderboard data available.</p>;
  }

  // Sorter etter høyest antall wins
  const sortedPlacings = [...leaderboard.placings].sort((a, b) => b.wins - a.wins);

  return (
    //Maa fikse w-80!
    <section className="w-full h-full">
      <h2 className="text-2xl font-semibold mb-6">{leaderboard.name}</h2>
      <ul className="px-5 py-3 border border-gray-300 shadow-md h-[calc(100%-3rem)] overflow-y-auto">
        {sortedPlacings.map((placing, index) => (
            // Obs flex for å splitte player fra w/l
          <li className="flex justify-between border-b border-black/20 mb-1 py-2" key={index}>
            {index + 1}. {placing.player}: <span>{placing.wins}W-{placing.losses}L</span>
          </li>
        ))}
        <a className="block mt-2 text-blue-600 text-sm text-center" href="#">View All</a>
      </ul>
    </section>
  );
}

