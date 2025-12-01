"use client";

import { navigate } from "rwsdk/client";

type Props = {
  cookieName?: string;
  label?: string;
  onDeleted?: () => void;
};


function deleteCookieByName(name: string) {
  document.cookie = `${name}=; Max-Age=0; Path=/;`;
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
      className="bg-indigo-50 text-indigo-700 px-8 py-3 text-base rounded hover:bg-indigo-100 transition-colors animate-fadeIn"
    >
      {label}
    </button>
  );
}
