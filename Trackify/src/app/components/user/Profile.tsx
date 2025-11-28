"use client";

import { useEffect, useState } from "react";
import DeleteCookieButton from "./DeleteCookieButton";
import DeleteAccountButton from "./DeleteAccountButton";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [showManageAccount, setShowManageAccount] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "user_session") {
        try {
          const userData = JSON.parse(decodeURIComponent(value));
          setUsername(userData.username || "");
        } catch (e) {
          console.error("Error parsing user session:", e);
        }
        break;
      }
    }
  }, []);

  return (
    <main className="flex flex-col items-center space-y-4 w-[95%] sm:w-[90%] lg:max-w-[80%] mx-auto mt-8 animate-fadeIn">
      <div className="w-full mt-3 flex flex-col lg:flex-row gap-4 lg:gap-10 px-4 sm:px-8 lg:px-16">
        <div className="w-full lg:w-[30%] gap-8 lg:mr-10">
          <h2 className="m-2 text-base sm:text-lg">Account</h2>
          <section className="shadow-md border border-gray-200 px-4 sm:px-6 py-4 mb-8">
            <ul className="text-sm">
              <li className="py-1 border-b border-gray-400">
                <a 
                  href="#profile" 
                  onClick={(e) => { e.preventDefault(); setShowManageAccount(false); }}
                  className="text-gray-700 hover:text-blue-600 cursor-pointer text-base sm:text-lg italic"
                >
                  Profile
                </a>
              </li>
              <li className="py-1 border-b border-gray-400">
                <a 
                  href="#manage-account"
                  onClick={(e) => { e.preventDefault(); setShowManageAccount(true); }}
                  className="text-gray-700 hover:text-blue-600 cursor-pointer text-base sm:text-lg italic"
                >
                  Manage account
                </a>
              </li>
            </ul>
          </section>
          
          <h2 className="m-2 text-base sm:text-lg">App settings</h2>
          <section className="shadow-md border border-gray-200 px-4 sm:px-6 py-4">
            <ul className="text-sm">
              <li className="py-1 border-b border-gray-400">Dashboard</li>
              <li className="py-1 border-b border-gray-400">Notifications</li>
              <li className="py-1 border-b border-gray-400">Customization</li>
              <li className="py-1 text-blue-600">View All</li>
            </ul>
          </section>
        </div>

        <div className="flex-1 w-full lg:w-auto">
         <h2 id="profile" className="m-2 text-base sm:text-lg">{showManageAccount ? "Manage account" : "Profile"}</h2>
         <section className="shadow-md border border-gray-200 px-4 sm:px-8 lg:px-30 py-6 sm:py-10 lg:py-30">
           {!showManageAccount ? (
             <div key="profile-view" className="flex flex-col lg:flex-row animate-fadeIn">
               <div className="space-y-6 text-sm lg:mr-20 mb-6 lg:mb-0">
                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-10">
                   <span className="w-full sm:w-24">Username</span>
                   <input 
                     type="text" 
                     value={username}
                     disabled
                     className="w-full sm:w-48 h-7 bg-gray-300 px-2 rounded cursor-not-allowed"
                   />
                  </div>
              </div>
                <div className="lg:ml-auto flex flex-col items-center justify-center gap-3">
                  <div className="w-36 h-28 sm:w-48 sm:h-36 rounded-[40px] overflow-hidden bg-gray-200">
                    <img
                      src="#"
                    />
                  </div>
                  <button className="text-sm text-blue-600">
                    Change profile picture
                  </button>
                </div>
              </div>
           ) : (
             <div key="manage-view" className="flex animate-fadeIn min-h-[200px]">
               <div className="flex-1 flex items-center justify-center">
                 <div className="flex flex-col sm:flex-row gap-4">
                   <DeleteCookieButton label="Log out" />
                   <DeleteAccountButton />
                 </div>
               </div>
             </div>
           )}
          </section>
        </div>
      </div>
    </main>
  );
}
