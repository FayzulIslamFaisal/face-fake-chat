import Link from "next/link";
import LogOut from "./auth/LogOut";

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-1">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link href="/">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src="/images/fakechat.webp"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/" className="btn-primary">
            <img src="/icons/home.svg" alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src="/icons/notification.svg" alt="Notification" />
          </button>
          <LogOut />

          <button className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">Faisal</span>
            <img
              className="max-h-[42px] max-w-[42px] lg:max-h-[44px] lg:max-w-[44px]"
              src="/images/avatars/avatar.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
