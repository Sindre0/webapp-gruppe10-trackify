import React from "react";
import { ArrowRight } from "react-feather";

const buttonStyle =
  "block border shadow-md border-gray-200 rounded-3xl bg-gray-50 px-6 py-4 hover:bg-gray-100 cursor-pointer text-lg font-medium mb-4 flex justify-between items-center";

type Props = {
  children: any;          // button text
  href?: string;             // insert link      
};

export default function LeaderboardButton({children, href}: Props){
  return (
      <a href = {href} className = {buttonStyle}> 
        {children}
        <ArrowRight size={36} />
      </a>
  )
}