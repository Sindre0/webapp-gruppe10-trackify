import React from "react";
import { navigate } from "rwsdk/client";

type LoginSiteProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function login(setIsLoggedIn: boolean) {
    setIsLoggedIn=true;
    navigate("/");
}

export default function LoginSite({ setIsLoggedIn }: LoginSiteProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg p-8 w-full max-w-sm text-center">
            <h1 className="text-2xl font-semibold mb-6">Trackify</h1>
            <h2 className="text-xl font-medium mb-4">Sign in</h2>

            <form className="flex flex-col space-y-4 text-left">
                <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                    Email
                    </label>
                    <input id="email" type="email"
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"/>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                    Password
                    </label>
                    <input id="password" type="password"
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-1"/>
                </div>

                <p className="text-sm text-gray-600">
                    No account? <a href="#" className="text-blue-500 hover:underline">Make one here!</a>
                </p>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
                    onClick={() => setIsLoggedIn(true)}>
                    Login
                </button>
            </form>
        </div>
    </div>
  );
}