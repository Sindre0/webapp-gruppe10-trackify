export function getLeaderboardName(leaderboardID: string) {
    const name = fetch(`/api/v1/leaderboards/${encodeURIComponent(leaderboardID)}`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                return data.data.name;
            } else {
                console.error("Failed to fetch leaderboard name: " + data.error.message);
                return "Unknown Leaderboard";
            }
        });
        
    return name;
}