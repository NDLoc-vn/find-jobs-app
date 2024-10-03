import Pagination from "@/app/ui/Pagination";
import SearchBar from "@/app/ui/SearchBar";
import JobList from "@/app/ui/hompage/JobList";
import { JobListSkeleton } from "@/app/ui/sketetons";
import { Suspense } from "react";

const SearchJob = () => {
  return (
    <>
      <div className="container mx-auto px-4 flex flex-col gap-8">
        <SearchBar />
        <Suspense fallback={<JobListSkeleton />}>
          <JobList />
        </Suspense>
        <div className="flex justify-center">
          <Pagination totalPages={10} />
        </div>
      </div>
    </>
  );
};

export default SearchJob;
