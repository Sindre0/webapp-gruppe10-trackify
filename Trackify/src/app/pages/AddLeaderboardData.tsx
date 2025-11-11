"use client";

import React from "react";
import { navigate } from "rwsdk/client";

export default function AddLeaderboardData({id}: {id: string}) {

  // fetch leaderboard by id...

  async function handleAddLeaderboardData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Adding leaderboard data...");
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
  }
    async function addContestant(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const username = String(formData.get("username") ?? "").trim();
      alert("Adding contestant: " + username);
    }

  return (
    <section className="max-w-[80%] mx-auto mt-10 space-y-4">
      <h1 className="text-xl m-1 font-semibold">Add data</h1>
      <div className="bg-white shadow-md p-6 space-y-6">
        {/* Add participant/team */}
        <section className="bg-gray-100 p-4">
          <form className="flex items-center justify-between ">

            <h2 className="font-medium text-gray-800">Add participant/Team</h2>
            <button
              type="button"
              className="border p-1 border-black bg-white"
            >
              ➕
            </button>


          </form>
        </section>

        {/* Remove participant/team */}
        <section className="bg-gray-100 p-4">
          <form className="flex items-center justify-between ">

            <h2 className="font-medium text-gray-800">Remove participant/Team</h2>
            <button
              type="button"
              className="border p-1 border-black bg-white"
            >
              ➖
            </button>


          </form>
        </section>

        {/* Make announcement */}
        <section className="bg-gray-100 p-4">
          <details open>
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

        {/* Add match results */}
        <section className="bg-gray-100 p-4">
          <details>
            <summary className="font-medium text-gray-800 cursor-pointer mb-3">
              Add match results
            </summary>
            <form className="space-y-3">
              <label className="block">
                <span className="text-sm text-gray-700">Select a completed match:</span>
                <select
                  name="completedMatch"
                  className="mt-1 w-full border border-black bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose match --</option>
                  <option>Dummy Match 1</option>
                  <option>Dummy Match 2</option>
                </select>
              </label>

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
                <span className="text-sm text-gray-700">
                  Award score for each participant:
                </span>
                <input
                  type="text"
                  name="scores"
                  placeholder="e.g. 10, 5, 3"
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
      </div>
    </section>
  );
}
