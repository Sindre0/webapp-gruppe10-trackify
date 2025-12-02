"use client";

import { API_ENDPOINTS } from "@/app/config/api";
import { useAuth } from "@/hooks/useAuth";
import { navigate } from "rwsdk/client";

export default function NewLeaderboard() {
  const user = useAuth();

  async function handleCreateLeaderboard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const startDateValue = formData.get("start-date");
    const indefinite = formData.get("indefinite") === "on";
    let endDateValue = formData.get("end-date");
    if (indefinite === true) {
        endDateValue = 'indefinite';
    }
    const isPrivate = formData.get("visibility") === "on";
    let visibility;
    isPrivate ? visibility = "private" : visibility = "public";

    const response = await fetch(`${API_ENDPOINTS.LEADERBOARDS}/create`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name,
        description,
        visibility,
        startDate: startDateValue,
        endDate: endDateValue,
        userId: user?.id,
      }),
    });

    if (response.ok) {
      navigate("/leaderboard/my-leaderboards");
    }
  }

  return (
    <section className="w-[95%] sm:w-[90%] lg:max-w-[80%] mx-auto mt-10 space-y-4 animate-fadeIn">
      <h1 className="text-lg sm:text-xl m-1 font-semibold">Create leaderboard</h1>

      <form
        onSubmit={handleCreateLeaderboard}
        className="bg-white shadow-md p-4 sm:p-6 space-y-6"
      >
        {/* Leaderboard name */}
        <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:justify-between bg-gray-100 p-4">
          <span className="text-gray-700 font-medium text-sm sm:text-base">Leaderboard name</span>
          <input
            type="text"
            name="name"
            placeholder="Name..."
            className="w-full sm:w-auto border bg-white border-black text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </label>

        {/* DATES */}
        <fieldset className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-100 p-4">
          <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="font-medium text-gray-700 text-sm sm:text-base whitespace-nowrap">
              Start date:
            </span>
            <input
              type="date"
              name="start-date"
              className="w-full sm:w-auto border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="font-medium text-gray-700 text-sm sm:text-base whitespace-nowrap">
              End date:
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

        {/* VISIBILITY */}
        <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:justify-between bg-gray-100 hover:bg-gray-200 p-4 cursor-pointer">
          <span className="text-gray-700 font-medium text-sm sm:text-base">Leaderboard visible to only invited users?</span>
          <input
            type="checkbox"
            name="visibility"
            className="border bg-white border-black text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>

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
            className="border border-gray-400 px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer animate-fadeIn"
          >
            Create
          </button>
        </footer>
      </form>
    </section>
  );
}
