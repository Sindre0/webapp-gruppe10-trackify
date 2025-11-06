"use client";

import React, {useEffect, useState } from "react";

export default function Breadcrumbs() {
    const [pathSegments, setPathSegments] = useState<string[]>([]);

    const updateBreadcrumbs = () => {
      const segments = window.location.pathname.split("/").filter(Boolean);
      setPathSegments(segments);
    };
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
                  <a href={pathUpToHere}>{segment}</a> /{" "}
                </>
              ) : (
                <span>{segment}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
