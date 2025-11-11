import WelcomeMessage from "../components/WelcomeMessage";
import ConcludedLeaderboardsList from "../components/ConcludedLeaderboardsList";

export default function ConcludedLeaderboards() {
    return (
        <main>
            <WelcomeMessage />
            <section className="w-[70%] mx-auto">
                <ConcludedLeaderboardsList />
            </section>
        </main>
    );
}