"use client";
import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

export const UseAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.user ? "Authenticated" : "Not Authenticated"
  );
  return useContext(AuthContext);
};
