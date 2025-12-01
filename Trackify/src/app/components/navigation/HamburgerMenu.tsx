import { CornerDownRight } from "react-feather";
import DeleteCookieButton from "../user/DeleteCookieButton";

export default function HamburgerMenu() {
    return (
        <aside
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10">
            <ul className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white shadow-2xl z-30 p-6 pt-24 flex flex-col items-stretch gap-3 md:rounded-l-3xl">
                <li className="block w-full">
                    <a href="/" 
                        className="block font-semibold text-xl md:text-2xl text-blue-600 md:text-gray-800 hover:text-blue-600 px-4 py-3 rounded-2xl md:bg-white bg-blue-50 hover:bg-blue-50 shadow-md md:shadow-none md:hover:shadow-md">
                        Home
                    </a>
                </li>
                <li className="block w-full">
                    <a href="/leaderboard" 
                        className="block font-semibold text-xl md:text-2xl text-blue-600 md:text-gray-800 hover:text-blue-600 px-4 py-3 rounded-2xl md:bg-white bg-blue-50 hover:bg-blue-50 shadow-md md:shadow-none md:hover:shadow-md">
                        Leaderboard
                    </a>
                </li>
                <li className="flex gap-2 bg-indigo-50 p-4 rounded-2xl shadow-sm border border-blue-100">
                    <CornerDownRight className="shrink-0 text-blue-500 mt-1" size={25} />
                    <ul className="ml-1 font-medium text-base md:text-lg space-y-2 flex-1">
                        <li>
                            <a href="/leaderboard/ongoing-leaderboards" 
                                className="block text-blue-600 md:text-gray-700 md:hover:text-blue-600 px-3 py-2 rounded-xl bg-white md:bg-indigo-50 hover:bg-white shadow-sm md:shadow-none md:hover:shadow-sm">
                                Ongoing leaderboards
                            </a>
                        </li>
                        <li>
                            <a href="/leaderboard/concluded-leaderboards" 
                                className="block text-blue-600 md:text-gray-700 md:hover:text-blue-600 px-3 py-2 rounded-xl bg-white md:bg-indigo-50 hover:bg-white shadow-sm md:shadow-none md:hover:shadow-sm">
                                Concluded leaderboards
                            </a>
                        </li>
                        <li>
                            <a href="/leaderboard/create-leaderboard" 
                                className="block text-blue-600 md:text-gray-700 md:hover:text-blue-600 px-3 py-2 rounded-xl bg-white md:bg-indigo-50 hover:bg-white shadow-sm md:shadow-none md:hover:shadow-sm">
                                Create a Leaderboard
                            </a>
                        </li>
                        <li>
                            <a href="/leaderboard/join-leaderboard" 
                                className="block text-blue-600 md:text-gray-700 md:hover:text-blue-600 px-3 py-2 rounded-xl bg-white md:bg-indigo-50 hover:bg-white shadow-sm md:shadow-none md:hover:shadow-sm">
                                Join a Leaderboard
                            </a>
                        </li>
                        <li>
                            <a href="/leaderboard/my-leaderboards" 
                                className="block text-blue-600 md:text-gray-700 md:hover:text-blue-600 px-3 py-2 rounded-xl bg-white md:bg-indigo-50 hover:bg-white shadow-sm md:shadow-none md:hover:shadow-sm">
                                My Leaderboards
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="mt-auto pt-4 border-t border-gray-200">
                    <DeleteCookieButton />
                </li>
            </ul>
        </aside>
    )
}