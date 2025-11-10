import WelcomeMessage from "../components/WelcomeMessage";
import OngoingLeaderboardsList from "../components/OngoingLeaderboardsList";

export default function OngoingLeaderboards() {
    return (
        <main>
            <WelcomeMessage />
            <section className="w-[70%] mx-auto">
                <OngoingLeaderboardsList />
            </section>
        </main>
    );
}