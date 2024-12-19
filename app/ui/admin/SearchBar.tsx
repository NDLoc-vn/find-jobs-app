"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProvinceInput from "../ProvinceInput";
import CompanyFieldInput from "./CompanyFieldInput";

type SearchBarProps = {
  initialSearch?: string;
  initialLocation?: string;
  initialField?: string;
  onSearch: (query: string, location: string, field: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  initialSearch = "",
  initialLocation = "",
  initialField = "",
  onSearch,
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [field, setField] = useState(initialField);

  const handleSearchClick = () => {
    onSearch(search, location, field);
  };

  return (
    <div className="flex flex-nowrap flex-col md:flex-row justify-center mt-8">
      <div className="relative md:w-1/3 w-full mr-2">
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

      <div className="relative md:w-1/6 w-full mr-2">
        <ProvinceInput value={location} onChange={setLocation} />
      </div>

      <div className="relative md:w-1/5 w-full">
        <CompanyFieldInput value={field} onChange={setField} />
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
