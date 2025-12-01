export function getUserLeaderboards(userID: string) {
    const leaderboards = fetch(`/api/v1/users/${encodeURIComponent(userID)}/leaderboards`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                return data.data;
            } else {
                return "Unknown Leaderboard";
            }
        });
        
    return leaderboards;
}