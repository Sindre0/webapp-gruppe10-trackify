import { API_ENDPOINTS } from "@/app/config/api";

export function getLeaderboardDetails(leaderboardID: string) {
    const details = fetch(`${API_ENDPOINTS.LEADERBOARDS}/${encodeURIComponent(leaderboardID)}`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                return data.data;
            } else {
                return "Unknown Leaderboard";
            }
        });
        
    return details;
}