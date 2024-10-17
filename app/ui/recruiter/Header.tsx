import React from "react";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full px-4 py-2 bg-white shadow z-50 mb-64">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={64}
              height={64}
              className="mr-2"
            />
          </Link>
        </div>

        <div className="hidden md:block">
          <MainNav />
        </div>
        <div className="block md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
