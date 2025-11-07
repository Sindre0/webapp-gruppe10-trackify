"use client";

import { AuthContext } from "../app/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const user = useContext(AuthContext);
  if (!user) {
    throw new Error("useAuth must be used within an AuthProvider in Layout");
  }
  return user;
}