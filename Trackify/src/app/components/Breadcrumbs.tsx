import React from "react";
import { requestInfo } from "rwsdk/worker";

export default function Breadcrumbs(){
    const { request, response } = requestInfo;

    const getCurrentUrl = () => {
        console.log(request?.url)
        return <p>{request?.url}</p>
    }
    
    return (
        <nav style={{background: "lightgrey", width: "100%", borderBottom: "2px solid black", borderTop: "2px solid black", fontWeight: "600"}}>
            <ul style={{padding: "0.2rem", paddingLeft: "0.5rem"}}>
                <li style={{display: "inline"}}><a href="/">Home</a>/</li>
                <li style={{display: "inline"}}><a href="/leaderboard">Leaderboard</a></li>
            </ul>
            {getCurrentUrl()}
        </nav>
    )
}
