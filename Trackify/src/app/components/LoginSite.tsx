"use client";

import React from "react";
import { navigate } from "rwsdk/client";

export default function LoginSite() {

  function handleLogin(event: React.FormEvent) {
    
      event.preventDefault();
      const form = new FormData();
      const email = String(form.get("email") || "").trim();
      

        // In a real app you'd verify credentials on the server. For now we
        // create a minimal `User` shape matching `src/db/schema/user-schema.ts`.
        const user = {
            id: 1,
            name: email.split("@")[0] || "User",
            email,
        };

        // Store as encoded JSON so the worker can decode and parse it.
        document.cookie = `user_session=${encodeURIComponent(
            JSON.stringify(user)
        )}; path=/`;
        console.log("Set cookie:", document.cookie);
        alert("Login clicked");
        // Redirect to home so the worker receives the cookie on the next request.
        navigate("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg p-8 w-full max-w-sm text-center">
            <h1 className="text-2xl font-semibold mb-6">Trackify</h1>
            <h2 className="text-xl font-medium mb-4">Sign in</h2>

            <form className="flex flex-col space-y-4 text-left">
                <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                    Email
                    </label>
                    <input id="email" type="email"
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"/>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                    Password
                    </label>
                    <input id="password" type="password"
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"/>
                </div>

                <p className="text-sm text-gray-600">
                    No account? <a href="#" className="text-blue-500 hover:underline">Make one here!</a>
                </p>

                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
                    onClick={handleLogin}
                    >
                    Login
                </button>
            </form>
        </div>
    </div>
  );
}