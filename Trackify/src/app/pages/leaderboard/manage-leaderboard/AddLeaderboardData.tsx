"use client";

import React, { use, useEffect, useState } from "react";
import { API_ENDPOINTS, API_URL } from "@/app/config/api";
import { getUsername } from "@/app/lib/api/getUsername";

export default function AddLeaderboardData({id}: {id: string}) {
    const [winnerValue, setWinnerValue] = useState<string>("");
    const [winnerSuggestions, setWinnerSuggestions] = useState<string[]>([]);

    const [loserValue, setLoserValue] = useState<string>("");
    const [loserSuggestions, setLoserSuggestions] = useState<string[]>([]);

    const [userList, setUserList] = useState<{ username: string; userId: string }[]>([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`${API_URL}/leaderboards/${id}/users`);
          if (response.ok) {
            const data: any = await response.json();
            const contestants = data.data.map((user: any) => String(user?.user_id ?? ""));

            const usernames = await Promise.all(
              contestants.map(async (userId: string) => {
                return { username: await getUsername(userId), userId };
              }
            ));
            return usernames;
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers().then(users => {
        if (users) {
          setUserList(users);
        }
      });    
    }, [id]);

    const handleWinnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setWinnerValue(value);
      if (value.length > 0) {
        const filtered = userList.filter((user) =>
          user.username.toLowerCase().startsWith(value.toLowerCase())
        );
        setWinnerSuggestions(filtered.map(user => user.username));
      } else {
        setWinnerSuggestions([]);
      }
    };

    const handleWinnerSelect = (name: string) => {
      setWinnerValue(name);
      setWinnerSuggestions([]);
    };

    const handleLoserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLoserValue(value);

      if (value.length > 0) {
        const filtered = userList.filter((user) =>
          user.username.toLowerCase().startsWith(value.toLowerCase())
        );
        setLoserSuggestions(filtered.map(user => user.username));
      } else {
        setLoserSuggestions([]);
      }
    };

    const handleLoserSelect = (name: string) => {
      setLoserValue(name);
      setLoserSuggestions([]);
    };    
  
  async function addContestant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    const response = await fetch(`${API_ENDPOINTS.USERS}/email/` + encodeURIComponent(email), {
      method: "GET"
    });
    if (response.ok) {
      const userData = JSON.parse(await response.text());
      const addUserResponse = await fetch(`${API_ENDPOINTS.LEADERBOARDS}/` + id + "/add-user/" + userData.data.id, {
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

    const response = await fetch(`${API_ENDPOINTS.USERS}/email/` + encodeURIComponent(email), {
      method: "GET"
    });
    if (response.ok) {
      const userData = JSON.parse(await response.text());
      const addUserResponse = await fetch(`${API_ENDPOINTS.LEADERBOARDS}/` + id + "/remove-user/" + userData.data.id, {
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

  async function addMatchResult(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const winner = String(formData.get("winner") ?? "").trim();
    const winnerUser = userList.find(user => user.username === winner);
    const loser = String(formData.get("loser") ?? "").trim();
    const loserUser = userList.find(user => user.username === loser);
    const response = await fetch(`${API_ENDPOINTS.LEADERBOARDS}/${id}/add-match`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ winnerId: winnerUser?.userId, loserId: loserUser?.userId }),
    });
    if (response.ok) {
      alert("Match result added successfully.");
    } else {
      alert("Failed to add match result.");
    }
  }

  return (
    <section className="w-[95%] sm:w-[90%] lg:max-w-[80%] mx-auto mt-10 space-y-4 animate-fadeIn">
      <h1 className="text-lg sm:text-xl m-1 font-semibold">Add data</h1>
      <div className="bg-white shadow-md p-4 sm:p-6 space-y-6">
        {/* Add participant */}
        <section className="bg-gray-100 p-4">
          <form onSubmit={addContestant}>
            <label className="grid grid-cols-1 sm:grid-cols-8 items-center justify-between gap-4">
              <h2 className="font-medium text-gray-800 text-sm sm:text-base col-span-1 sm:col-span-5">Add participant</h2>
              <input
              type="text"
              name="email"
              placeholder="Email"
              className="border col-span-1 sm:col-span-2 bg-white border-black text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="border p-1 border-black bg-white cursor-pointer w-full sm:w-auto"
              >
                ➕
              </button>
            </label>
          </form>
        </section>

        {/* Remove participant */}
        <section className="bg-gray-100 p-4">
          <form onSubmit={removeContestant}>
            <label className="grid grid-cols-1 sm:grid-cols-8 items-center justify-between gap-4">
              <h2 className="font-medium text-gray-800 text-sm sm:text-base col-span-1 sm:col-span-5">Remove participant</h2>
              <input
              type="text"
              name="email"
              placeholder="Email"
              className="border col-span-1 sm:col-span-2 bg-white border-black text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="border p-1 border-black bg-white cursor-pointer w-full sm:w-auto"
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
            <form className="space-y-3" onSubmit={addMatchResult}>
              <label className="block">
                <span className="text-sm text-gray-700">Select the winner:</span>
                <input
                  type="text"
                  value={winnerValue}
                  onChange={handleWinnerChange}
                  name="winner"
                  autoComplete="off"
                  placeholder="Winner name"
                  className="mt-1 w-full border border-black bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                 {winnerSuggestions.length > 0 && (
                  <ul className="absolute min-w-50 md:min-w-80 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-md z-10">
                    {winnerSuggestions.map((name) => (
                      <li
                        key={name}
                        onClick={() => handleWinnerSelect(name)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Select the loser:</span>
                <input
                  type="text"
                  value={loserValue}
                  onChange={handleLoserChange}
                  name="loser"
                  autoComplete="off"
                  placeholder="Loser name"
                  className="mt-1 w-full border border-black bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                {loserSuggestions.length > 0 && (
                  <ul
                    className="absolute min-w-50 md:min-w-80 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-md z-10"
                  >
                    {loserSuggestions.map((name) => (
                      <li
                        key={name}
                        onClick={() => handleLoserSelect(name)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
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
              Make announcement (Not implemented)
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
              Schedule match (Not implemented)
            </summary>
            <form className="space-y-3">

              <fieldset className="space-y-1">
                <h2 className="text-sm text-gray-700">Select participants:</h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Name 1"
                    className="border border-black bg-white px-2 py-1 text-sm w-full"
                  />
                  <input
                    type="text"
                    placeholder="Name 2"
                    className="border border-black bg-white px-2 py-1 text-sm w-full"
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
