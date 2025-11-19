"use client";

import React, { useState } from "react";
import { navigate } from "rwsdk/client";

function deleteCookieByName(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;`;
}

export default function DeleteAccountButton() {
  const [showFirstConfirm, setShowFirstConfirm] = useState(false);
  const [showSecondConfirm, setShowSecondConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowFirstConfirm(true);
  };

  const handleFirstConfirm = () => {
    setShowFirstConfirm(false);
    setShowSecondConfirm(true);
  };

  const handleFirstCancel = () => {
    setShowFirstConfirm(false);
  };

  const handleSecondConfirm = async () => {
    setIsDeleting(true);
    
    try {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      let userId = null;
      
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "user_session") {
          const userData = JSON.parse(decodeURIComponent(value));
          userId = userData.id;
          break;
        }
      }

      if (!userId) {
        alert("User session not found. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json() as any;

      if (data.success) {
        deleteCookieByName("user_session");
        console.log("Account deleted successfully");
        
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        alert("Failed to delete account: " + data.error.message);
        setShowSecondConfirm(false);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account.");
      setShowSecondConfirm(false);
      setIsDeleting(false);
    }
  };

  const handleSecondCancel = () => {
    setShowSecondConfirm(false);
  };

  return (
    <>
      <span onClick={handleDeleteClick} className="cursor-pointer">
        Delete account
      </span>

      {/* Confirm N1 popup */}
      {showFirstConfirm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={handleFirstCancel}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Delete Account?</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and will delete all your data.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleFirstCancel}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFirstConfirm}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/*N2 popup*/}
      {showSecondConfirm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={handleSecondCancel}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-red-600">Final Confirmation</h2>
            <p className="text-gray-700 mb-6">
              This is your last chance! Are you absolutely sure you want to permanently delete your account and all associated data?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleSecondCancel}
                disabled={isDeleting}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSecondConfirm}
                disabled={isDeleting}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting" : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
