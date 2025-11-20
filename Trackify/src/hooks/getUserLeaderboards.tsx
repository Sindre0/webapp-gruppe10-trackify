export function getUserLeaderboards(userID: string) {
    const leaderboards = fetch(`/api/v1/users/${encodeURIComponent(userID)}/leaderboards`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                console.log("Fetched the user's leaderboards:", data.data);
                return data.data;
            } else {
                console.log("Failed to fetch the user's leaderboards: " + data.error.message);
                return "Unknown Leaderboard";
            }
        });
        
    return leaderboards;
}