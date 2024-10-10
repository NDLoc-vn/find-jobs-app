"use client";

import Pagination from "@/app/ui/Pagination";
import SearchBar from "@/app/ui/SearchBar";
import JobList from "@/app/ui/homepage/JobList";
import { JobListSkeleton } from "@/app/ui/sketetons";
import { Suspense } from "react";
import Header from "../ui/user/Header";

const SearchJob = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto mb-14 px-4 flex flex-col gap-8">
        <SearchBar />
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
