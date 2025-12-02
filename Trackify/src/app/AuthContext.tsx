"use client";

import type { User } from "@/db/schema";
import { createContext, ReactNode, useEffect } from "react";
import { navigate } from "rwsdk/client";

export const AuthContext = createContext<User | undefined>(undefined);

export function AuthProvider({user, children, requireAuth = true}: {
    user: User | undefined;
    children: ReactNode;
    requireAuth?: boolean;
}) {
    useEffect(() => {
        if (requireAuth && !user) {
            navigate("/login");
        }
    }, [user, requireAuth]);
    return <AuthContext value={user}>{children}</AuthContext>;
}   