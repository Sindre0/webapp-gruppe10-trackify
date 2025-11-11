export function getUserLeaderboards(userID: string) {
    const leaderboards = fetch(`/api/v1/users/${encodeURIComponent(userID)}/leaderboards`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                console.log("Fetched leaderboards:", data.data);
                return data.data;
            } else {
                console.error("Failed to fetch leaderboard name: " + data.error.message);
                return "Unknown Leaderboard";
            }
        });
        
    return leaderboards;
}