"use client";

import React from "react";
import { navigate } from "rwsdk/client";

type Props = {
  cookieName?: string;
  label?: string;
  onDeleted?: () => void;
};


function deleteCookieByName(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;`;
}

export default function DeleteCookieButton({
  cookieName = "user_session",
  label = "Log out",
  onDeleted,
}: Props) {
  const handleClick = () => {
    deleteCookieByName(cookieName);
    console.log("Logged out - cleared cookie:", cookieName);
    
    if (onDeleted) {
      onDeleted();
    } else {
      navigate("/login");
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleClick}
      className="bg-blue-400 text-white px-8 py-3 text-base rounded hover:bg-blue-500 transition-colors animate-fadeIn"
    >
      {label}
    </button>
  );
}
