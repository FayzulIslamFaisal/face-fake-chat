"use client";
import { UseAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoutes = ({ children }) => {
  const { auth } = UseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.user) {
      router.push("/login");
    }
  }, [auth?.user, router]);

  if (!auth?.user) {
    return null; // Optionally, show a loading spinner here while redirecting
  }

  return <>{children}</>; // Render children when the user is authenticated
};

export default PrivateRoutes;
