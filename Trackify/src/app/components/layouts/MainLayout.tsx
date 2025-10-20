"use client";

import React, { useState } from "react";
import Nav from "../Nav";
import { LayoutProps } from "rwsdk/router";
import PrivateRoute from "../route-control/PrivateRoute";
import LoginSite from "../LoginSite";

export default function MainLayout({children}: LayoutProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <>
            {!isLoggedIn ? (
            <LoginSite setIsLoggedIn={setIsLoggedIn} />
        ) : (
            <PrivateRoute isLoggedIn={isLoggedIn}>
            <div>
                <Nav/>
                {children}
            </div>
            </PrivateRoute>
        )}
        </>
    )
}
