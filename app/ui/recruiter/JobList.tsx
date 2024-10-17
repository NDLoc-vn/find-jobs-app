"use client";

import JobCardOpen from "./JobCardOpen";
import JobCardClose from "./JobCardClose";
import { fetchJobs } from "@/app/lib/data";
import { Job } from "@/app/lib/definitions";
// import { useEffect, useState } from 'react';

interface JobListProps {
  activeTab: "openJobs" | "closeJobs";
}

export default async function JobList({ activeTab }: JobListProps) {
  const jobs: Job[] = await fetchJobs();

  // chinh lai sau khi co job service

  // export default function JobList() {
  //   const [jobs, setJobs] = useState<Job[]>([]);
  //   const getJob = async () => {
  //     setJobs(await fetchJobs());
  //   };
  //   useEffect(() => {
  //     getJob();
  //   }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job, index) => {
        // Sử dụng JobCardOpen hoặc JobCardClose tùy thuộc vào activeTab
        const JobCard = activeTab === "openJobs" ? JobCardOpen : JobCardClose;
        return (
          <JobCard
            key={index}
            title={job.title}
            company={job.company}
            salary={job.salary}
            location={job.location}
          />
        );
      })}
    </div>
  );
}
