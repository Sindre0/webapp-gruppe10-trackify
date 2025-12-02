import { API_ENDPOINTS } from "@/app/config/api";

export function getUsername(userID: string) {
    const username = fetch(`${API_ENDPOINTS.USERS}/${encodeURIComponent(userID)}/username`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                return data.data[0].username;
            } else {
                return "Unknown Leaderboard";
            }
        });
        
    return username;
}