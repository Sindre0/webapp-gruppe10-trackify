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
    <nav style={{ background: "lightgrey", fontWeight: 600, padding: "0.5rem" }}>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <li style={{ display: "inline" }}>
          <a href="/">Home</a>
          {pathSegments.length > 0 && " / "}
        </li>
        {pathSegments.map((segment, index) => {
          const pathUpToHere = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          return (
            <li key={index} style={{ display: "inline" }}>
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
    </nav>
  );
}
