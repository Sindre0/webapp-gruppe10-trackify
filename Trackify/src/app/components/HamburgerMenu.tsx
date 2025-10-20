import type { CSSProperties } from "react";   
import { CornerDownRight, Grid } from "react-feather";

export default function HamburgerMenu() {
    const sidePanelStyle: CSSProperties = {
        position: "fixed",   
        top: "0",
        right: "0",            
        width: "30%",      
        height: "100%",        
        backgroundColor: "white",
        zIndex: "1",
        padding: "1rem",
        paddingTop: "6rem",
        display: "flex",            
        flexDirection: "column",    
        alignItems: "stretch", 
        gap: "1rem"
    };
    const overlayStyle: CSSProperties = {
        position: "fixed",  
        top: "0",
        left: "0",
        width: "100%",           
        height: "100%",           
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        zIndex: "-1"
    }
    const destinationStyle :CSSProperties = {
        width: "100%",
        fontWeight: "500",
        fontSize: 24,
        color: "blue",
        cursor: "pointer"
    }

    return (
        <div style={overlayStyle}>
            <div style={sidePanelStyle}>
                <a style={destinationStyle} href="/">Home</a>
                <a style={destinationStyle} href="/leaderboard">Leaderboard</a>
                <div style={{display: "flex", flexDirection: "row", gap: "0"}}>
                    <CornerDownRight/>
                    <ul style={{...destinationStyle, fontSize: 20}}>
                        <li><a href="">Ongoing leaderboards</a></li>
                        <li><a href="">Create a Leaderboard</a></li>
                        <li><a href="">Join a Leaderboard</a></li>
                        <li><a href="">My Leaderboards</a></li>
                    </ul>
                </div>


                <a style={destinationStyle} href="">Upcoming Matches</a>
                <a style={destinationStyle} href="">Announcements</a>
            </div>
        </div>

    )
}