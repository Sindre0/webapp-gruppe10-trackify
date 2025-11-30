"use client";

import { getLeaderboardDetails } from "@/app/lib/api/getLeaderboardDetails";
import { start } from "node:repl";
import React, { use, useState, useEffect,} from "react";
import { navigate } from "rwsdk/client";

export default function UpdateLeaderboard({id}: {id: string}) {

  const [leaderboardName, setLeaderboardName] = useState<string>("");
  const [leaderboardDescription, setLeaderboardDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  async function handleUpdateLeaderboard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Get values from form, fallback to current state if empty
    const name = String(formData.get("name") ?? "").trim() || leaderboardName;
    const description = String(formData.get("description") ?? "").trim() || leaderboardDescription;
    const startDateValue = formData.get("start-date");
    const newStartDate = startDateValue ? String(startDateValue) : startDate;
    const endDateValue = formData.get("end-date");
    const indefinite = formData.get("indefinite") === "on";
    const newEndDate = indefinite ? "indefinite" : (endDateValue ? String(endDateValue) : endDate);
    const visibilityValue = formData.get("visibility") === "on" ? "private" : "public";
    
    const response = await fetch("/api/v1/leaderboards/" + id + "/update", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: name,
        description: description,
        visibility: visibilityValue,
        createdAt: newStartDate,
        endDate: newEndDate,
      }),
    });
    if (response.ok) {
      navigate("/leaderboard/my-leaderboards");
      console.log(response)
    }
    else {
      alert("Failed to update leaderboard.");
    } 
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardDetails =  await getLeaderboardDetails(id);
        setLeaderboardName(leaderboardDetails.name);
        setLeaderboardDescription(leaderboardDetails.description);
        setStartDate(leaderboardDetails.createdAt ?? "Not set");
        setEndDate(leaderboardDetails.endDate ?? "Not set");
      } catch (error) {
        console.error("Error fetching leaderboard details:", error);
      }
    };
    fetchData();

  }, [id]);

  return (
    <section className="w-[95%] sm:w-[90%] lg:max-w-[80%] mx-auto mt-10 space-y-4 animate-fadeIn">
      <h1 className="text-lg sm:text-xl m-1 font-semibold">Update leaderboard for {leaderboardName}</h1>

      <form
        onSubmit={handleUpdateLeaderboard}
        className="bg-white shadow-md p-4 sm:p-6 space-y-6"
      >
        {/* Leaderboard name */}
        <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:justify-between bg-gray-100 p-4">
          <span className="text-gray-700 font-medium text-sm sm:text-base">New leaderboard name</span>
          <input
            type="text"
            name="name"
            placeholder={leaderboardName}
            className="w-full sm:w-auto border bg-white border-black text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>

        {/* DATES */}
        <fieldset className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-100 p-4">
          <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="font-medium text-gray-700 text-sm sm:text-base whitespace-nowrap">
              Start date: {startDate}
            </span>
            <input
              type="date"
              name="start-date"
              className="w-full sm:w-auto border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="font-medium text-gray-700 text-sm sm:text-base whitespace-nowrap">
              End date: {endDate}
            </span>
            <input
              type="date"
              name="end-date"
              className="w-full sm:w-auto border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="font-medium text-gray-700 text-sm sm:text-base whitespace-nowrap">
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
            placeholder={leaderboardDescription}
            className="w-full border border-black bg-white p-3 min-h-[120px] text-sm focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* VISIBILITY */}
        <label className="flex items-center gap-2 justify-between bg-gray-100 hover:bg-gray-200 p-4 cursor-pointer">
          <span className="text-gray-700 font-medium text-sm sm:text-base">Leaderboard visible to only invited users?</span>
          <input
            type="checkbox"
            name="visibility"
            className="border bg-white border-black text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
