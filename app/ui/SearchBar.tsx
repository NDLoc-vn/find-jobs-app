import React from "react";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Image
            src="/icon/mag-glass.svg"
            width={20}
            height={20}
            alt="Search icon"
          />
        </div>
        <input
          type="text"
          placeholder="Chức danh, kĩ năng, ..."
          className="border px-10 py-2 w-full rounded-l-md"
        />
      </div>
      <div className="relative w-64">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Image
            src="/icon/location.svg"
            width={20}
            height={20}
            alt="Location icon"
          />
        </div>
        <input
          type="text"
          placeholder="Vị trí"
          className="border px-10 py-2 w-64 rounded-r-md"
        />
      </div>
      <button className="px-6 py-2 bg-xanhduong-600 text-white rounded ml-2">
        Tìm kiếm
      </button>
    </div>
  );
};

export default SearchBar;
