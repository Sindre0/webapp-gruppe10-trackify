"use client";

import { getLeaderboardDetails } from "@/app/lib/api/getLeaderboardDetails";
import React, { use, useState, useEffect,} from "react";
import { navigate } from "rwsdk/client";

export default function UpdateLeaderboard({id}: {id: string}) {

  const [leaderboardName, setLeaderboardName] = useState<string>("");


  async function handleUpdateLeaderboard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Updating leaderboard...");
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
  }

  useEffect(() => {
    const fetchData = async () => {
      const leaderboardDetails =  await getLeaderboardDetails(id);
      setLeaderboardName(leaderboardDetails.name);
    };
    fetchData();

  }, [id]);

  return (
    <section className="max-w-[80%] mx-auto mt-10 space-y-4 animate-fadeIn">
      <h1 className="text-xl m-1 font-semibold">Update leaderboard for {leaderboardName}</h1>

      <form
        onSubmit={handleUpdateLeaderboard}
        className="bg-white shadow-md p-6 space-y-6"
      >
        {/* Leaderboard name */}
        <label className="flex items-center justify-between bg-gray-100 p-4">
          <span className="text-gray-700 font-medium">New leaderboard name</span>
          <input
            type="text"
            name="name"
            placeholder="Name..."
            className="border bg-white border-black text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </label>

        {/* DATES */}
        <fieldset className="grid grid-cols-3 gap-4 bg-gray-100 p-4">
          <label className="flex items-center gap-2">
            <span className="font-medium text-gray-700 whitespace-nowrap">
              Start date:
            </span>
            <input
              type="date"
              name="start-date"
              className="border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="font-medium text-gray-700 whitespace-nowrap">
              End date:
            </span>
            <input
              type="date"
              name="end-date"
              className="border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="font-medium text-gray-700 whitespace-nowrap">
              Indefinite:
            </span>
            <input
              type="checkbox"
              name="indefinite"
              className="h-4 w-4 border-gray-300"
            />
          </label>
        </fieldset>

        {/* DESCRIPTION */}
        <label className="bg-gray-100 p-4 space-y-2 block">
          <span className="text-gray-700 font-medium">Description</span>
          <textarea
            name="description"
            placeholder="My leaderboard..."
            className="w-full border border-black bg-white p-3 min-h-[120px] text-sm focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* SUBMIT */}
        <footer className="flex justify-end">
          <button
            type="submit"
            className="border border-gray-400 px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors animate-fadeIn"
          >
            Update
          </button>
        </footer>
      </form>
    </section>
  );
}
