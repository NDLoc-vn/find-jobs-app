"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/auth-context";

const MobileNav = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const activeClass = "bg-xanhduong-600 text-white";
  const inactiveClass = "text-blue-600 border border-blue-600 gradient-hover";

  return (
    <div className="relative flex items-center">
      <button className="mr-6" onClick={handleMenuToggle}>
        <Image src="/icon/bars-3.svg" alt="Menu" width={26} height={26} />
        <span className="sr-only">Toggle</span>
      </button>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={handleMenuToggle}
        />
      )}

      <div
        className={clsx(
          "fixed inset-y-0 right-0 bg-white z-20 transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
          "transition-transform duration-300 ease-in-out",
          "w-full sm:w-1/4"
        )}
      >
        <button className="absolute top-6 right-6" onClick={handleMenuToggle}>
          <Image
            src="/icon/arrow-right.svg"
            alt="Close"
            width={26}
            height={26}
            className="mr-6"
          />
          <span className="sr-only">Toggle</span>
        </button>

        <nav className="px-4 flex flex-col items-center justify-start mt-20 h-full space-y-6">
          {isLoggedIn ? (
            <>
              <Link href="/admin/home" className="w-full">
                <button
                  className={clsx(
                    "h-12 w-full px-4 py-2 rounded-lg font-semibold",
                    pathname.endsWith("/home") ? activeClass : inactiveClass
                  )}
                >
                  Số liệu
                </button>
              </Link>
              <Link href="/admin/grant-accounts" className="w-full">
                <button
                  className={clsx(
                    "h-12 w-full px-4 py-2 rounded-lg font-semibold",
                    pathname.endsWith("/grant-accounts")
                      ? activeClass
                      : inactiveClass
                  )}
                >
                  Cấp TK
                </button>
              </Link>
              <Link href="/admin/post-manager" className="w-full">
                <button
                  className={clsx(
                    "h-12 w-full px-4 py-2 rounded-lg font-semibold",
                    pathname.endsWith("/post-manager")
                      ? activeClass
                      : inactiveClass
                  )}
                >
                  Bài đăng
                </button>
              </Link>
              <Link href="/admin/recruiter-manager" className="w-full">
                <button
                  className={clsx(
                    "h-12 w-full px-4 py-2 rounded-lg font-semibold",
                    pathname.endsWith("/recruiter-manager")
                      ? activeClass
                      : inactiveClass
                  )}
                >
                  Nhà tuyển dụng
                </button>
              </Link>
              <Link href="/admin/candidate-manager" className="w-full">
                <button
                  className={clsx(
                    "h-12 w-full px-4 py-2 rounded-lg font-semibold",
                    pathname.endsWith("/candidate-manager")
                      ? activeClass
                      : inactiveClass
                  )}
                >
                  Người ứng tuyển
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full h-12 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold mt-4"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              {/* Guest navigation */}
              <Link href="/user/login" className="w-full">
                <button className="h-12 w-full px-4 py-2 bg-xanhduong-600 text-white rounded-lg font-semibold">
                  Đăng nhập
                </button>
              </Link>
              <Link href="/user/signup" className="w-full">
                <button className="w-full h-12 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg gradient-hover">
                  Đăng ký
                </button>
              </Link>
              <Link
                href="/recruiter/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Đăng nhập với tư cách nhà tuyển dụng ?
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
