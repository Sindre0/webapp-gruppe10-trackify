import React from "react";

const buttonStyle =
  "block border shadow-md border-gray-200 rounded-3xl bg-gray-50 px-6 py-4 hover:bg-gray-100 cursor-pointer text-lg font-medium mb-4"

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