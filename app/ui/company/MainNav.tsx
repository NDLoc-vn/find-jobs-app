import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/contexts/auth-context";

const MainNav = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const isActive = (route: string) => pathname === route;

  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        // {true ? (
        <>
          <Link
            href="/company/dashboard"
            className={`text-lg px-3 py-2 rounded-lg ${
              isActive("/company/dashboard")
                ? "bg-xanhduong-600 text-white"
                : "text-blue-600"
            } hover:bg-xanhduong-500 hover:text-white`}
          >
            Trang chủ
          </Link>
          {/* <Link
            href="/company/post-job"
            className={`text-lg px-3 py-2 rounded-lg ${
              isActive("/company/post-job")
                ? "bg-xanhduong-600 text-white"
                : "text-blue-600"
            } hover:bg-xanhduong-500 hover:text-white`}
          >
            Đăng tuyển
          </Link> */}
          <Link
            href="/company/recruiter-manager"
            className={`text-lg px-3 py-2 rounded-lg ${
              isActive("/company/recruiter-manager")
                ? "bg-xanhduong-600 text-white"
                : "text-blue-600"
            } hover:bg-xanhduong-500 hover:text-white`}
          >
            TK tuyển dụng
          </Link>
          <Link
            href="/company/post-manager"
            className={`text-lg px-3 py-2 rounded-lg ${
              isActive("/company/post-manager")
                ? "bg-xanhduong-600 text-white"
                : "text-blue-600"
            } hover:bg-xanhduong-500 hover:text-white`}
          >
            Bài đăng
          </Link>
          {/* <Link
            href="/company/message"
            className={`text-lg px-3 py-2 rounded-lg ${
              isActive("/company/message")
                ? "bg-xanhduong-600 text-white"
                : "text-blue-600"
            } hover:bg-xanhduong-500 hover:text-white`}
          >
            Nhắn tin
          </Link> */}

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
