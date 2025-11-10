"use client";

import { navigate } from "rwsdk/client";
import { AuthContext } from "../app/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const user = useContext(AuthContext);
  if (!user) {
    navigate("/login");
    ;
  }
  return user;
}