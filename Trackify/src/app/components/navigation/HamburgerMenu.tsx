import { CornerDownRight } from "react-feather";

export default function HamburgerMenu({ hamburgerToggle }: { hamburgerToggle: () => void }) {
    return (
        <aside
            className="fixed inset-0 bg-black/50 z-20"
            onClick={hamburgerToggle}
        >
            <ul className="fixed right-0 top-0 h-full w-1/3 bg-white z-30 p-4 pt-24 flex flex-col items-stretch gap-4">
                <li className="block w-full font-medium text-2xl text-blue-600 cursor-pointer">
                    <a href="/">Home</a>
                </li>
                <li className="block w-full font-medium text-2xl text-blue-600 cursor-pointer">
                    <a href="/leaderboard">Leaderboard</a>
                </li>
                <li className="flex flex-row gap-0">
                    <CornerDownRight/>
                    <ul className="ml-2 font-medium text-xl text-blue-600 cursor-pointer space-y-1">
                        <li><a href="/leaderboard/ongoing-leaderboards">Ongoing leaderboards</a></li>
                        <li><a href="/leaderboard/concluded-leaderboards">Concluded leaderboards</a></li>
                        <li><a href="/leaderboard/create-leaderboard">Create a Leaderboard</a></li>
                        <li><a href="#">Join a Leaderboard</a></li>
                        <li><a href="#">My Leaderboards</a></li>
                    </ul>
                </li>

                <li className="block w-full font-medium text-2xl text-blue-600 cursor-pointer">
                    <a href="#">Upcoming Matches</a>
                </li>
                <li className="block w-full font-medium text-2xl text-blue-600 cursor-pointer">
                    <a href="/announcements">Announcements</a>
                </li>
            </ul>
        </aside>
    )
}