import type { CSSProperties } from "react";   

export default function HamburgerMenu() {
    const sidePanelStyle: CSSProperties = {
        position: "fixed",   
        top: "0",
        right: "0",            
        width: "20%",      
        height: "100%",        
        backgroundColor: "white",
        zIndex: 1     
    };

    return (
        <div style={sidePanelStyle}>
            <a href="">Home</a>
            <a href="">Leaderboard</a>
            <ul>
                <li><a href="">Ongoing leaderboards</a></li>
                <li><a href="">Create a Leaderboard</a></li>
                <li><a href="">Join a Leaderboard</a></li>
                <li><a href="">My Leaderboards</a></li>
            </ul>

            <a href="">Upcoming Matches</a>
            <a href="">Announcements</a>
        </div>
    )
}