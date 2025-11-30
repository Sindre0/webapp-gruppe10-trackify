import { CornerDownRight } from "react-feather";
import DeleteCookieButton from "../user/DeleteCookieButton";

export default function HamburgerMenu({ hamburgerToggle }: { hamburgerToggle: () => void }) {
    return (
        <aside
            className="fixed inset-0 bg-black/50 z-20"
            onClick={hamburgerToggle}
        >
            <ul className="fixed right-0 top-0 h-full w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white z-30 p-4 pt-24 flex flex-col items-stretch gap-4">
                <li className="block w-full font-medium text-xl sm:text-2xl text-blue-600 cursor-pointer">
                    <a href="/">Home</a>
                </li>
                <li className="block w-full font-medium text-xl sm:text-2xl text-blue-600 cursor-pointer">
                    <a href="/leaderboard">Leaderboard</a>
                </li>
                <li className="flex flex-row gap-0">
                    <CornerDownRight className="flex-shrink-0" />
                    <ul className="ml-2 font-medium text-base sm:text-xl text-blue-600 cursor-pointer space-y-1">
                        <li><a href="/leaderboard/ongoing-leaderboards">Ongoing leaderboards</a></li>
                        <li><a href="/leaderboard/concluded-leaderboards">Concluded leaderboards</a></li>
                        <li><a href="/leaderboard/create-leaderboard">Create a Leaderboard</a></li>
                        <li><a href="/leaderboard/join-leaderboard">Join a Leaderboard</a></li>
                        <li><a href="/leaderboard/my-leaderboards">My Leaderboards</a></li>
                    </ul>
                </li>

                <li className="block w-full font-medium text-xl sm:text-2xl text-blue-600 cursor-pointer">
                    <a href="#">Upcoming Matches</a>
                </li>
                <li className="block w-full font-medium text-xl sm:text-2xl text-blue-600 cursor-pointer">
                    <a href="/announcements">Announcements</a>
                </li>
                <li className="mt-auto">
                    <DeleteCookieButton />
                </li>
            </ul>
        </aside>
    )
}