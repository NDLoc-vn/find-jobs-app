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
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Đăng nhập
          </button>
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded">
            Đăng ký
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
