import { CornerDownRight, Grid } from "react-feather";

export default function HamburgerMenu() {
    return (
        <aside className="fixed inset-0 bg-black/50 z-20">
            <div className="fixed right-0 top-0 h-full w-1/3 bg-white z-30 p-4 pt-24 flex flex-col items-stretch gap-4">
                <a className="block w-full font-medium text-2xl text-blue-600 cursor-pointer" href="/">Home</a>
                <a className="block w-full font-medium text-2xl text-blue-600 cursor-pointer" href="/leaderboard">Leaderboard</a>
                <div className="flex flex-row gap-0">
                    <CornerDownRight/>
                    <ul className="ml-2 font-medium text-xl text-blue-600 cursor-pointer space-y-1">
                        <li><a href="#">Ongoing leaderboards</a></li>
                        <li><a href="#">Concluded leaderboards</a></li>
                        <li><a href="#">Create a Leaderboard</a></li>
                        <li><a href="#">Join a Leaderboard</a></li>
                        <li><a href="#">My Leaderboards</a></li>
                    </ul>
                </div>


                <a className="block w-full font-medium text-2xl text-blue-600 cursor-pointer" href="#">Upcoming Matches</a>
                <a className="block w-full font-medium text-2xl text-blue-600 cursor-pointer" href="#">Announcements</a>
            </div>
        </aside>

    )
}