"use client";

import { getLeaderboardDetails } from "@/hooks/getLeaderboardDetails";
import React, {useEffect, useState } from "react";

export default function Breadcrumbs() {
    const [pathSegments, setPathSegments] = useState<string[]>([]);

    const updateBreadcrumbs = () => {
      const segments = window.location.pathname.split("/").filter(Boolean);
      if (segments[0] === "leaderboard" && segments[1].length === 36) {
          getLeaderboardDetails(segments[1]).then(details => {
          if (details.name !== undefined) {
            segments[1] = details.name;
            setPathSegments(segments);
          } else {
            segments[1] = "Game Leaderboard";
            setPathSegments(segments);
          }})
        };
      };

    const prettifySegment = (segment: string) => {
      return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }

    useEffect(() => {
        updateBreadcrumbs();
        window.addEventListener("popstate", updateBreadcrumbs);
        return () => window.removeEventListener("popstate", updateBreadcrumbs);
    }, []);

  return (
    <div className="bg-gray-100 font-semibold p-1">
      <ul className="list-none m-0 px-4 font-normal">
        <li className="inline">
          <a href="/">Home</a>
          {pathSegments.length > 0 && " / "}
        </li>
        {pathSegments.map((segment, index) => {
          const pathUpToHere = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          return (
            <li key={index} className="inline">
              {!isLast ? (
                <>
                  <a href={pathUpToHere}>{prettifySegment(segment)}</a> /{" "}
                </>
              ) : (
                <span>{prettifySegment(segment)}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
