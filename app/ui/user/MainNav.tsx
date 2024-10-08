import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MainNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const pathname = usePathname();

  const handleLogout = () => {
    // Logic to handle logout
    console.log("Logged out");
    setIsLoggedIn(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const isActive = (route: string) => pathname === route;

  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <>
          <Link
            href="/search-job"
            className={`text-lg px-3 py-2 rounded-lg ${
              isActive("/search-job")
                ? "bg-blue-600 text-white"
                : "text-blue-600"
            } hover:bg-blue-500 hover:text-white`}
          >
            Tìm việc
          </Link>
          <Link
            href="/my-jobs"
            className={`text-lg px-3 py-2 rounded-lg ${
              isActive("/my-jobs") ? "bg-blue-600 text-white" : "text-blue-600"
            } hover:bg-blue-500 hover:text-white`}
          >
            Công việc
          </Link>
          <Link
            href="/messages"
            className={`text-lg px-3 py-2 rounded-lg ${
              isActive("/messages") ? "bg-blue-600 text-white" : "text-blue-600"
            } hover:bg-blue-500 hover:text-white`}
          >
            Nhắn tin
          </Link>
          <Link
            href="/profile"
            className={`text-lg px-3 py-2 rounded-lg ${
              isActive("/profile") ? "bg-blue-600 text-white" : "text-blue-600"
            } hover:bg-blue-500 hover:text-white`}
          >
            Cá nhân
          </Link>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="rounded-full bg-gray-400"
            >
              <Image
                src="/avatar_temp.jpg"
                alt="User Avatar"
                width={64}
                height={64}
                className="rounded-full"
              />
              <span className="sr-only">Toggle</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-lg">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 border text-blue-500 rounded-lg gradient-hover"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        // Render login/signup buttons when not logged in
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-4">
            <Link href={"/user/login"}>
              <button className="w-32 h-12 px-4 py-2 bg-xanhduong-600 text-white rounded-lg font-semibold">
                Đăng nhập
              </button>
            </Link>
            <Link href={"/user/signup"}>
              <button className="w-32 h-12 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg gradient-hover">
                Đăng ký
              </button>
            </Link>
          </div>
          <Link
            href={"/recruiter/login"}
            className="text-sm text-blue-600 hover:underline"
          >
            Đăng nhập với tư cách nhà tuyển dụng ?
          </Link>
        </div>
      )}
    </div>
  );
};

export default MainNav;
