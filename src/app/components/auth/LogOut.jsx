"use client";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();

  const handleLogOut = () => {
    router.push("/login");
  };
  return (
    <button onClick={handleLogOut} className="icon-btn">
      <img src="/icons/logout.svg" alt="Logout" />
    </button>
  );
};

export default LogOut;
