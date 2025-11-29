"use client";

import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { navigate } from "rwsdk/client";

function deleteCookieByName(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;`;
}

export default function DeleteAccountButton() {
  const [showFirstConfirm, setShowFirstConfirm] = useState(false);
  const [showSecondConfirm, setShowSecondConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useAuth();

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
      if (!user) {
        alert("User is not logged in.");
        setShowSecondConfirm(false);
        return;
      }

      const response = await fetch(`/api/v1/users/delete/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          password: user.passwordHash
        })
      });

      const data = await response.json() as any;

      if (data.success) {
        deleteCookieByName("user_session");
        
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
      <button 
        type="button" 
        onClick={handleDeleteClick}
        className="bg-red-500 text-white px-8 py-3 text-base rounded hover:bg-red-600 transition-colors animate-fadeIn"
      >
        Delete account
      </button>

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
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors animate-fadeIn"
              >
                Cancel
              </button>
              <button
                onClick={handleFirstConfirm}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors animate-fadeIn"
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
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors disabled:opacity-50 animate-fadeIn"
              >
                Cancel
              </button>
              <button
                onClick={handleSecondConfirm}
                disabled={isDeleting}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50 animate-fadeIn"
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
