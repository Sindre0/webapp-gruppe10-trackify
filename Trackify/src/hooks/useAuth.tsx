"use client";

import { navigate } from "rwsdk/client";
import { AuthContext } from "../app/AuthContext";
import { useContext } from "react";

export function useAuth(requireAuth: boolean = true) {
  const user = useContext(AuthContext);
  if (requireAuth && !user) {
    navigate("/login");
  }
  return user;
}