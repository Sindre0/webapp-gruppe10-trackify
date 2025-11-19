"use client";

import React from "react";
import { navigate } from "rwsdk/client";

export default function CreateAccount() {
  async function handleCreateAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    if (!name || !email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Register new user via API
      const response = await fetch(`/api/v1/users/register/${name}:${email}:${password}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      fetch(`/api/v1/users/login/${encodeURIComponent(email)}:${encodeURIComponent(password)}`)
        .then(response => response.json())
        .then((data: any) => {
            if (data.success) {
                const user = data.data;
                document.cookie = `user_session=${encodeURIComponent(
                    JSON.stringify(user)
                )}; path=/`;
                console.log("Logging in user:", {user: email});
                console.log("Set cookie:", document.cookie);
                document.cookie = `user_session=${encodeURIComponent(
                    JSON.stringify(user)
                    )}; path=/`;
                    console.log("Set cookie:", document.cookie);
                navigate("/");
                  }});
    } catch (error) {
      console.error("Create account error:", error);
      alert("Could not create account.");
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 animate-fadeIn">
      <section className="bg-white shadow-lg p-8 w-full max-w-sm text-center">
        <h1 className="mb-6 text-2xl font-semibold">Trackify</h1>

        <h2 className="text-xl font-medium mb-4">
          Create account
        </h2>

        <form className="flex flex-col space-y-4 text-left" onSubmit={handleCreateAccount}>
          <label htmlFor="name" className="block text-sm text-gray-700 mb-1">Username</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"
          />

          <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"
          />

          <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"
          />

          <label htmlFor="confirm" className="block text-sm text-gray-700 mb-1">Confirm password</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"
          />

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors animate-fadeIn"
          >
            Create account
          </button>
        </form>
      </section>
    </main>
  );
}
