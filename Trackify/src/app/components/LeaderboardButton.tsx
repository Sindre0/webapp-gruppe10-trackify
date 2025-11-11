import React from "react";

const buttonStyle =
  "block w-full text-left bg-white px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer text-lg font-medium text-gray-900"

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