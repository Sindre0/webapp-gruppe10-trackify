"use client";

import React from "react";
import { navigate } from "rwsdk/client";

export default function AddLeaderboardData({id}: {id: string}) {

  async function handleAddLeaderboardData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Adding leaderboard data...");
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
  }
  
  async function addContestant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    const response = await fetch("/api/v1/users/email/" + encodeURIComponent(email), {
      method: "GET"
    });
    if (response.ok) {
      const userData = JSON.parse(await response.text());
      console.log("User data fetched by email:", userData.data.id);
      const addUserResponse = await fetch("/api/v1/leaderboards/" + id + "/add-user/" + userData.data.id, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
      });
      if (addUserResponse.ok) {
        alert("User added to leaderboard successfully.");
      }
      else {
        alert("Failed to add user to leaderboard.");
      }
    }
    else {
      alert("Failed to add contestant. User not found.");
    }
  }

  async function removeContestant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    const response = await fetch("/api/v1/users/email/" + encodeURIComponent(email), {
      method: "GET"
    });
    if (response.ok) {
      const userData = JSON.parse(await response.text());
      console.log("User data fetched by email:", userData.data.id);
      const addUserResponse = await fetch("/api/v1/leaderboards/" + id + "/remove-user/" + userData.data.id, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
      });
      if (addUserResponse.ok) {
        alert("User removed from leaderboard successfully.");
      }
      else {
        alert("Failed to remove user from leaderboard.");
      }
    }
    else {
      alert("Failed to remove contestant. User not found.");
    }
  }

  return (
    <section className="max-w-[80%] mx-auto mt-10 space-y-4 animate-fadeIn">
      <h1 className="text-xl m-1 font-semibold">Add data</h1>
      <div className="bg-white shadow-md p-6 space-y-6">
        {/* Add participant */}
        <section className="bg-gray-100 p-4">
          <form onSubmit={addContestant}>
            <label className="grid grid-cols-8 items-center justify-between gap-4">
              <h2 className="font-medium text-gray-800 col-span-5">Add participant</h2>
              <input
              type="text"
              name="email"
              placeholder="Email"
              className="border col-span-2 bg-white border-black text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="border p-1 border-black bg-white cursor-pointer"
              >
                ➕
              </button>
            </label>
          </form>
        </section>

        {/* Remove participant */}
        <section className="bg-gray-100 p-4">
          <form onSubmit={removeContestant}>
            <label className="grid grid-cols-8 items-center justify-between gap-4">
              <h2 className="font-medium text-gray-800 col-span-5">Remove participant</h2>
              <input
              type="text"
              name="email"
              placeholder="Email"
              className="border col-span-2 bg-white border-black text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="border p-1 border-black bg-white cursor-pointer"
              >
                ➖
              </button>
            </label>
          </form>
        </section>

        {/* Add match results */}
        <section className="bg-gray-100 p-4">
          <details open>
            <summary className="font-medium text-gray-800 cursor-pointer mb-3">
              Add match results
            </summary>
            <form className="space-y-3">
              <label className="block">
                <span className="text-sm text-gray-700">Select the winner:</span>
                <input
                  type="text"
                  name="winner"
                  placeholder="Winner name"
                  className="mt-1 w-full border border-black bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Select the loser:</span>
                <input
                  type="text"
                  name="loser"
                  placeholder="Loser name"
                  className="mt-1 w-full border border-black bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1 border text-sm border-black bg-white"
                >
                  Post
                </button>
              </div>
            </form>
          </details>
        </section>

        {/* Make announcement */}
        <section className="bg-gray-100 p-4">
          <details>
            <summary className="font-medium text-gray-800 cursor-pointer mb-3">
              Make announcement
            </summary>
            <form className="space-y-3">
              <label className="block">
                <span className="text-sm text-gray-700">Title</span>
                <input
                  type="text"
                  name="title"
                  className="mt-1 w-full border border-black bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Body</span>
                <textarea
                  name="body"
                  className="mt-1 w-full border border-black bg-white p-2 min-h-[100px] text-sm focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1 border text-sm border-black bg-white"
                >
                  Post
                </button>
              </div>
            </form>
          </details>
        </section>

        {/* Schedule match */}
        <section className="bg-gray-100 p-4">
          <details>
            <summary className="font-medium text-gray-800 cursor-pointer mb-3">
              Schedule match
            </summary>
            <form className="space-y-3">

              <fieldset className="space-y-1">
                <h2 className="text-sm text-gray-700">Select participants:</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Name 1"
                    className="border border-black bg-white px-2 py-1 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Name 2"
                    className="border border-black bg-white px-2 py-1 text-sm"
                  />
                </div>
              </fieldset>

              <label className="block">
                <span className="text-sm text-gray-700">Select date and time:</span>
                <input
                  type="datetime-local"
                  name="matchDate"
                  className="mt-1 w-full border border-black bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1 border text-sm border-black bg-white"
                >
                  Schedule
                </button>
              </div>
            </form>
          </details>
        </section>
      </div>
    </section>
  );
}
