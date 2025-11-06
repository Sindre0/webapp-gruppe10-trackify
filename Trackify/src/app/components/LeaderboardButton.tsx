"use client";

import React from "react";

const base =
  "block w-full text-left rounded-2xl border border-gray-300 " +
  "bg-white px-5 py-3 shadow focus:outline-none "


type Props = {
  children: string;          // button text
  href?: string;             // insert link      
};

export default function LeaderboardButton({children, href,}: Props){
    return (
        <a href = {href} className = {base}> 
        {children}
        </a>
        )
    }

