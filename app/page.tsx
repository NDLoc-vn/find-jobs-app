import SearchBar from "./ui/SearchBar";
import Categories from "./ui/homepage/Categories";
import { Suspense } from "react";
import { JobListSkeleton } from "./ui/sketetons";
import JobList from "./ui/homepage/JobList";
import Header from "./ui/homepage/Header";

export default function Home() {
  return (
    <div className={`min-h-screen bg-white`}>
      <Header />
      <div className="text-center mt-4 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mt-10">
          Web tìm việc số 1 Việt Nam
        </h1>
      </div>

      <div className="container mx-auto px-4">
        <SearchBar />
        <Categories />

        <section className="mt-12">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            Việc làm nổi bật
          </h2>

          <Suspense fallback={<JobListSkeleton />}>
            <JobList />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
