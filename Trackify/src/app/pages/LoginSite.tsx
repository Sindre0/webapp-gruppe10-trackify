"use client";

import React from "react";
import { navigate } from "rwsdk/client";

export default function LoginSite() {

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim();

        const user = {
            id: 1,
            name: email.split("@")[0] || "User",
            email,
        };

        document.cookie = `user_session=${encodeURIComponent(
            JSON.stringify(user)
        )}; path=/`;
        console.log("Set cookie:", document.cookie);
        navigate("/");
    }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <section className="bg-white shadow-lg p-8 w-full max-w-sm text-center">
            <h1 className="text-2xl font-semibold mb-6">Trackify</h1>
            <h2 className="text-xl font-medium mb-4">Sign in</h2>

            <form className="flex flex-col space-y-4 text-left" onSubmit={handleLogin}>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                    Email
                </label>
                <input id="email" name="email" type="email" autoComplete="email" required
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"/>

                <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                Password
                </label>
                <input id="password" name="password" type="password" autoComplete="current-password"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"/>


                <p className="text-sm text-gray-600">
                    No account? <a href="/create-account" className="text-blue-500 hover:underline">Make one here!</a>
                </p>

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors">
                    Login
                </button>
            </form>
        </section>
    </main>
  );
}