export function getUsername(userID: string) {
    const username = fetch(`/api/v1/users/${encodeURIComponent(userID)}/username`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                console.log("Fetched username data:", data.data[0].username);
                return data.data[0].username;
            } else {
                console.error("Failed to fetch leaderboard details: " + data.error.message);
                return "Unknown Leaderboard";
            }
        });
        
    return username;
}