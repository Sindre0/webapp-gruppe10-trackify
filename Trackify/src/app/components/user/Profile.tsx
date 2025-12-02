"use client";

import { useEffect, useState } from "react";
import DeleteCookieButton from "./DeleteCookieButton";
import DeleteAccountButton from "./DeleteAccountButton";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showManageAccount, setShowManageAccount] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "user_session") {
        const userData = JSON.parse(decodeURIComponent(value));
        setUsername(userData.username || "");
        setEmail(userData.email || "");
      }
    }
  }, []);

  return (
    <main className="flex flex-col items-center w-[90%] mx-auto mt-8">
      <article className="w-full mt-3 flex flex-col md:flex-row gap-4 md:gap-10 px-4 md:px-16">
        <aside className="w-full md:w-1/4 min-w-[200px]">
          <nav>
            <h2 className="m-2 text-lg">Account</h2>
            <section className="shadow-md border border-gray-200 px-6 py-4 mb-8">
              <ul>
                <li className="py-1 border-b border-gray-400">
                  <button 
                    onClick={() => setShowManageAccount(false)}
                    className="text-gray-700 hover:text-blue-600 text-lg cursor-pointer"
                  >
                    Profile
                  </button>
                </li>
                <li className="py-1 border-b border-gray-400">
                  <button 
                    onClick={() => setShowManageAccount(true)}
                    className="text-gray-700 hover:text-blue-600 text-lg cursor-pointer"
                  >
                    Manage account
                  </button>
                </li>
              </ul>
            </section>

            <h2 className="m-2 text-lg">App settings (Not implemented)</h2>
            <section className="shadow-md border border-gray-200 px-6 py-4">
              <ul>
                <li className="py-1 border-b border-gray-400">Dashboard</li>
                <li className="py-1 border-b border-gray-400">Notifications</li>
                <li className="py-1 border-b border-gray-400">Customization</li>
                <li className="py-1 text-blue-600">View All</li>
              </ul>
            </section>
          </nav>
        </aside>

        <section className="flex-1 w-full">
          <h2 className="m-2 text-lg">{showManageAccount ? "Manage account" : "Profile"}</h2>
          <div className="shadow-md border border-gray-200 px-8 py-10 w-auto mx-auto">
            {!showManageAccount ? (
              <article className="flex flex-col md:flex-row justify-evenly space-y-6 mb-6 md:items-center gap-2">
                <section className="flex flex-col gap-2 w-full md:w-1/2">
                  <label htmlFor="username-input" className="w-auto">Username</label>
                  <input 
                    id="username-input"
                    type="text" 
                    value={username}
                    disabled
                    aria-label="Username"
                    className="w-full h-7 bg-gray-300 px-2 rounded"
                  />
                  <label htmlFor="email-input" className="w-auto">Email</label>
                  <input 
                    id="email-input"
                    type="email" 
                    value={email}
                    disabled
                    aria-label="Email"
                    className="w-full h-7 bg-gray-300 px-2 rounded"
                  />
                </section>
                <div className=" flex flex-col items-center justify-center gap-3">
                  <div className="w-40 h-32 rounded-[40px] overflow-hidden bg-gray-200">
                    <img
                      src="#"
                      alt="Profile"
                    />
                  </div>
                  <button className="text-blue-600">
                    Change profile picture
                  </button>
                </div>
              </article>
            ) : (
              <article className="flex-1 flex items-center justify-center">
                <div className="flex flex-col md:flex-row gap-4">
                  <DeleteCookieButton label="Log out" />
                  <DeleteAccountButton />
                </div>
              </article>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}
