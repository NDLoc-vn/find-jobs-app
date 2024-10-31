"use client";

import Pagination from "@/app/ui/Pagination";
import SearchBar from "@/app/ui/SearchBar";
import JobList from "@/app/ui/user/JobList";
import { JobListSkeleton } from "@/app/ui/sketetons";
import { Suspense } from "react";
import Header from "../ui/user/Header";
import Categories from "../ui/homepage/Categories";

const SearchJob = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto mb-14 px-4 flex flex-col">
        <SearchBar />
        <Categories />
        <h2 className="text-lg md:text-xl font-bold mt-12 mb-4">
          Việc làm nổi bật
        </h2>
        <Suspense fallback={<JobListSkeleton />}>
          <JobList />
        </Suspense>
        <Suspense>
          <div className="flex justify-center">
            <Pagination totalPages={10} />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default SearchJob;
