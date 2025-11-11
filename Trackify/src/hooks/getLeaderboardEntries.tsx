export function getLeaderboardEntries(leaderboardID: string) {
    const entries = fetch(`/api/v1/leaderboards/${encodeURIComponent(leaderboardID)}/entries`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                return data.data;
            } else {
                console.error("Failed to fetch leaderboard entries: " + data.error.message);
                return "Unknown Leaderboard";
            }
        });
        
    return entries;
}