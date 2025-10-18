

export default function HamburgerMenu() {

    return (
        <div style={{display: "inline"}}>
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