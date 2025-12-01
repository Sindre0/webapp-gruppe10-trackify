"use client";

import { useAuth } from "@/hooks/useAuth";

export default function WelcomeMessage() {
    const user = useAuth();

    const username = user?.username;
    return (
        <section className="mt-8 mb-8 block w-[95%] sm:w-[85%] lg:w-[60%] border border-gray-300 shadow-md rounded-3xl px-5 py-3 mx-auto text-center text-base sm:text-lg font-medium">
            <p>Welcome, {username}!</p>
        </section>
    )
}