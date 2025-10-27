"use client";

import type { User } from "@/db/schema";
import { createContext, ReactNode } from "react";
import { navigate } from "rwsdk/client";

export const AuthContext = createContext<User | undefined>(undefined);

export function AuthProvider({
    user,
    children,
}: {
    user: User | undefined;
    children: ReactNode;
}) {
    // if (!user) {
    //     navigate("/login");
    // }
    return <AuthContext value={user}>{children}</AuthContext>;
}   