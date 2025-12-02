import { API_ENDPOINTS } from "@/app/config/api";

export function getUserLeaderboards(userID: string) {
    const leaderboards = fetch(`${API_ENDPOINTS.USERS}/${encodeURIComponent(userID)}/leaderboards`)
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