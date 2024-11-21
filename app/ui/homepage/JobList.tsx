"use client";
import JobCard from "./JobCart";
import { CardJob } from "@/app/lib/definitions";
import { getListCardJobs } from "@/app/services/jobService";
import { useEffect, useState } from "react";
import { JobListSkeleton } from "../sketetons";

interface JobListProps {
  searchQuery: string;
  sortOption: string;
  sortOrder: "asc" | "desc";
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
  const [jobs, setJobs] = useState<CardJob[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) {
    return <JobListSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job, index) => (
        <JobCard
          key={index}
          id={job.id}
          title={job.title}
          company={job.company}
          salaryMin={job.salary.min}
          salaryMax={job.salary.max}
          currency={job.salary.currency}
          city={job.location.city}
          address={job.location.address}
          employmentType={job.employmentType}
        />
      ))}
    </div>
  );
};

export default JobList;
