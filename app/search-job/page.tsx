"use client";

import SearchBar from "@/app/ui/user/SearchBar";
import JobList from "@/app/ui/user/JobList";
import Header from "../ui/user/Header";
import Categories from "../ui/user/Categories";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type SortOptionsProps = {
  onChange: (value: string) => void;
};

const SortOptions: React.FC<SortOptionsProps> = ({ onChange }) => (
  <div className="flex items-center space-x-4 mb-4">
    <label>Sắp xếp theo:</label>
    <select
      aria-label="Loại sắp xếp"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="time">Thời gian</option>
      <option value="minSalary">Mức lương tối thiểu</option>
      <option value="maxSalary">Mức lương tối đa</option>
    </select>
    <select
      aria-label="Kiểu sắp xếp"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="asc">Tăng dần</option>
      <option value="desc">Giảm dần</option>
    </select>
  </div>
);

const SearchJob: React.FC = () => {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialEmployeeType = searchParams.get("employeeType") || "";
  const initialCategory = decodeURIComponent(
    searchParams.get("category") || ""
  );

  const [sortOption, setSortOption] = useState<string>("time");
  const [order, setOrder] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [location, setLocation] = useState<string>(initialLocation);
  const [employeeType, setEmployeeType] = useState<string>(initialEmployeeType);
  const [category, setCategory] = useState<string>(initialCategory);

  useEffect(() => {
    console.log(initialCategory);
    setCategory(initialCategory);
  }, [initialCategory]);

  const handleSortChange = (value: string) => {
    if (["time", "minSalary", "maxSalary"].includes(value)) {
      setSortOption(value);
    } else {
      setOrder(value);
    }
  };

  const handleSearch = (query: string, loc: string, empType: string) => {
    setSearchQuery(query);
    setLocation(loc);
    setEmployeeType(empType);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory((prevCategory) =>
      prevCategory === selectedCategory ? "" : selectedCategory
    );
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mb-14 px-4 flex flex-col">
        <SearchBar
          initialSearch={initialSearch}
          initialLocation={initialLocation}
          initialEmployeeType={initialEmployeeType}
          onSearch={handleSearch}
        />
        <div className="flex mt-4">
          <div className="w-1/4 pr-4">
            <Categories
              selectedCategory={category}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          <div className="w-3/4">
            <SortOptions onChange={handleSortChange} />
            <h2 className="text-lg md:text-xl font-bold mt-7 mb-4">
              Danh sách việc làm
            </h2>
            <JobList
              searchQuery={searchQuery}
              city={location}
              employmentType={employeeType}
              sortOption={sortOption}
              sortOrder={order}
              category={category}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchJob;
