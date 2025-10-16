import React from "react";
import { BrowserRouter as Router } from "react-dom";

export default function Breadcrumbs(){

    const getPathName = () => {
        console.log(window.location.pathname);
    } 

    
    
    return (
        <nav style={{background: "lightgrey", width: "100%", borderBottom: "2px solid black", borderTop: "2px solid black", fontWeight: "600"}}>
            <ul style={{padding: "0.2rem", paddingLeft: "0.5rem"}}>
                <li style={{display: "inline"}}><a href="/">Home</a>/</li>
                <li style={{display: "inline"}}>Leaderboard</li>
            </ul>
        </nav>
    )
}
