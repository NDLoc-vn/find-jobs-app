import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full px-4 py-2 bg-white shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="mr-2"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="w-32 h-12 px-4 py-2 bg-xanhduong-600 text-white rounded-lg font-semibold">
            Đăng nhập
          </button>
          <button className="w-32 h-12 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg gradient-hover">
            Đăng ký
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
