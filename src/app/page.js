"use client";
import Link from "next/link";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import { UseAuth } from "./hooks/UseAuth";

export default function Home() {
  const { auth } = UseAuth();
  console.log("auth====>", auth);

  return (
    <>
      <PrivateRoutes>
        <div className="container mx-auto">
          <h1>Welcome to the Home Page</h1>
          <Link href="/profile">Profile</Link>
        </div>
      </PrivateRoutes>
    </>
  );
}
