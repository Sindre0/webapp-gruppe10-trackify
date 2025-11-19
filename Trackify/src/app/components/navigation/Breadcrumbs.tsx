"use client";

import { getLeaderboardDetails } from "@/hooks/getLeaderboardDetails";
import {useEffect, useState } from "react";

export default function Breadcrumbs() {
    const [pathSegments, setPathSegments] = useState<string[]>([]);
    const [leaderboardName, setLeaderboardName] = useState<string | null>(null);

    const updateBreadcrumbs = () => {
      const segments = window.location.pathname.split("/").filter(Boolean);
      setPathSegments(segments);
    };
    
  const prettifySegment = (segment: string, index: number) => {
    if (index === 2) {
      if (leaderboardName) {
        return leaderboardName;
      }
    }
    return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

    useEffect(() => {
        updateBreadcrumbs();
        window.addEventListener("popstate", updateBreadcrumbs);
        return () => window.removeEventListener("popstate", updateBreadcrumbs);
    }, []);

    useEffect(() => {
      if (pathSegments[2] && pathSegments[2].length === 36) {
        getLeaderboardDetails(pathSegments[2])
          .then((details: any) => {
            if (details?.name) {
              setLeaderboardName(details.name);
            }
          });
      } else {
        setLeaderboardName(null);
      }
    }, [pathSegments]);

    useEffect(() => {
      if (!pathSegments || pathSegments.length === 0) {
        document.title = "Trackify";
        return;
      }
      const index = pathSegments.length - 1;
      const title = prettifySegment(pathSegments[index], index);
      document.title = title;
    }, [pathSegments, leaderboardName]);

  return (
    <div className="bg-gray-100 py-2 px-4 rounded-md mb-4">
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
                  <a href={pathUpToHere}>{prettifySegment(segment, index)}</a> /{" "}
                </>
              ) : (
                <span>{prettifySegment(segment, index)}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
