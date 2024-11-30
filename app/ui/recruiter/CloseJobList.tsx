"use client";

import { CardJob } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { getListClosedJobs } from "@/app/services/jobService";
import JobCardClose from "./JobCardClose";
import { JobListSkeleton } from "../sketetons";

export default function CloseJobList() {
  const [jobs, setJobs] = useState<CardJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListClosedJobs()
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

  const handleDeleteJob = (id: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  if (loading) {
    return <JobListSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job, index) => {
        return (
          <JobCardClose
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
            numberApplicants={job.numberApplicant}
            onDelete={handleDeleteJob}
          />
        );
      })}
    </div>
  );
}
