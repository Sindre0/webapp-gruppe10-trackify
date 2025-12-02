import { API_ENDPOINTS } from "@/app/config/api";

export function getLeaderboardEntries(leaderboardID: string) {
    const entries = fetch(`${API_ENDPOINTS.LEADERBOARDS}/${encodeURIComponent(leaderboardID)}/entries`)
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