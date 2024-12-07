"use client";
import JobCard from "./JobCart";
import { CardJob } from "@/app/lib/definitions";
import { getListCardJobs } from "@/app/services/jobService";
import { useEffect, useState } from "react";
import { JobListSkeleton } from "../sketetons";
import Pagination from "../Pagination";
import { useSearchParams } from "next/navigation";

interface JobListProps {
  searchQuery?: string;
  sortOption?: string;
  sortOrder?: string;
  category?: string;
  city?: string;
  employmentType?: string;
}

const JobList: React.FC<JobListProps> = ({
  searchQuery,
  sortOption,
  sortOrder,
  category,
  city,
  employmentType,
}) => {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<CardJob[]>([]);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 9;
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    getListCardJobs(
      searchQuery,
      sortOption,
      sortOrder,
      category,
      city,
      employmentType
    )
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        console.log("Error fetching jobs:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery, city, employmentType, sortOption, sortOrder, category]);

  if (loading) {
    return <JobListSkeleton />;
  }

  // const totalPages = Math.ceil(jobs?.length / jobsPerPage);
  const totalPages = jobs?.length ? Math.ceil(jobs.length / jobsPerPage) : 0;
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs?.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentJobs?.length > 0 ? (
          currentJobs.map((job, index) => (
            <JobCard
              key={index}
              id={job.id}
              title={job.title}
              company={job.companyName}
              salaryMin={job.salary.min}
              salaryMax={job.salary.max}
              currency={job.salary.currency}
              city={job.location.city}
              address={job.location.address}
              employmentType={job.employmentType}
            />
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default JobList;
