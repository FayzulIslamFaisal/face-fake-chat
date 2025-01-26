"use client";
import { UseAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();
  const { setAuth } = UseAuth();

  const handleLogOut = () => {
    setAuth({});
    router.push("/login");
  };
  return (
    <button onClick={handleLogOut} className="icon-btn">
      <img src="/icons/logout.svg" alt="Logout" />
    </button>
  );
};

export default LogOut;
