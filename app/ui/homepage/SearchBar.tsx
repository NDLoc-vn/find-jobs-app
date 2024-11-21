"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [employeeType, setEmployeeType] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    const queryParams: { [key: string]: string } = {};

    if (search) queryParams.search = search;
    if (location) queryParams.location = location;
    if (employeeType) queryParams.employeeType = employeeType;

    const queryString = new URLSearchParams(queryParams).toString();

    router.push(`/search-job?${queryString}`);
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
          placeholder="Chức danh, kĩ năng, ..."
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
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-xanhduong-600 text-white rounded md:ml-2 md:mt-0 mt-6"
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default SearchBar;
