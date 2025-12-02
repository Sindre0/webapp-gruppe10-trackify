"use client";

import { API_ENDPOINTS } from "@/app/config/api";
import { navigate } from "rwsdk/client";

export default function LoginSite() {

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "").trim();

        fetch(`${API_ENDPOINTS.USERS}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then((data: any) => {
                if (data.success) {
                    const user = data.data;
                    document.cookie = `user_session=${encodeURIComponent(
                        JSON.stringify(user)
                    )}; path=/`;
                    document.cookie = `user_session=${encodeURIComponent(
                        JSON.stringify(user)
                        )}; path=/`;
                    navigate("/");
                } else {
                    alert("Login failed: " + data.error.message);
                }
            })
            .catch(error => {
                console.error("Error during login:", error);
            });
    }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 animate-fadeIn">
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

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors animate-fadeIn">
                    Login
                </button>
            </form>
        </section>
    </main>
  );
}