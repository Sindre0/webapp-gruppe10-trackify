export function getLeaderboardDetails(leaderboardID: string) {
    const name = fetch(`/api/v1/leaderboards/${encodeURIComponent(leaderboardID)}`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                return data.data;
            } else {
                console.error("Failed to fetch leaderboard details: " + data.error.message);
                return "Unknown Leaderboard";
            }
        });
        
    return name;
}