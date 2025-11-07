import React from "react";

const buttonStyle =
  "block w-full text-left rounded-2xl border border-gray-300 bg-white px-5 py-3 shadow focus:outline-none"

type Props = {
  children: string;          // button text
  href?: string;             // insert link      
};

export default function LeaderboardButton({children, href}: Props){
  return (
      <a href = {href} className = {buttonStyle}> 
        {children}
      </a>
  )
}