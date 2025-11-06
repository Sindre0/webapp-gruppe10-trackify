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
      // TODO: Legg til database backend

      // Midlertidig løsning:
      const user = {
        id: 1,
        name,
        email,
      };
      document.cookie = `user_session=${encodeURIComponent(
        JSON.stringify(user)
      )}; path=/`;

      navigate("/");
    } catch (err) {
      console.error("Create account error:", err);
      alert("Could not create account. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold mb-6">Trackify</h1>
        <h2 className="text-xl font-medium mb-4">Create account</h2>

        <form className="flex flex-col space-y-4 text-left" onSubmit={handleCreateAccount}>
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"
            />
          </div>

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
