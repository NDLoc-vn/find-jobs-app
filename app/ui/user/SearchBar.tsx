"use client";

import React, { useState } from "react";
import Image from "next/image";

type SearchBarProps = {
  initialSearch?: string;
  initialLocation?: string;
  initialEmployeeType?: string;
  onSearch: (query: string, location: string, empType: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  initialSearch = "",
  initialLocation = "",
  initialEmployeeType = "",
  onSearch,
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [employeeType, setEmployeeType] = useState(initialEmployeeType);

  const handleSearchClick = () => {
    onSearch(search, location, employeeType);
  };

  return (
    <div className="flex flex-nowrap flex-col md:flex-row justify-center mt-8">
      <div className="relative md:w-1/3 w-full mb-2 md:mb-0 mr-2">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center pl-3 pointer-events-none">
          <Image
            src="/icon/mag-glass.svg"
            width={20}
            height={20}
            alt="Search icon"
          />
        </div>
        <input
          type="text"
          placeholder="Tên việc, kĩ năng ..."
          className="border px-10 py-2 w-full rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="relative md:w-1/6 w-full mb-2 md:mb-0 mr-2">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center pl-3 pointer-events-none">
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
          className="border px-10 py-2 w-full rounded-md"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="relative md:w-1/5 w-full mb-2 md:mb-0">
        <select
          aria-label="Loại nhân viên"
          value={employeeType}
          onChange={(e) => setEmployeeType(e.target.value)}
          className="border px-10 py-2 w-full rounded-md"
        >
          <option value="">Loại nhân viên</option>
          <option value="FULL-TIME">FULL-TIME</option>
          <option value="PART-TIME">PART-TIME</option>
          <option value="INTERNSHIP">INTERNSHIP</option>
          <option value="CONTRACT">CONTRACT</option>
        </select>
      </div>

      <button
        onClick={handleSearchClick}
        className="px-6 py-2 bg-xanhduong-600 text-white rounded md:ml-2 md:mt-0 mt-6"
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default SearchBar;
