'use client';

import JobCard from './JobCart';
import { fetchJobs } from '@/app/lib/data';
import { Job } from '@/app/lib/definitions';
// import { useEffect, useState } from 'react';

export default async function JobList() {
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
      {jobs.map((job, index) => (
        <JobCard
          key={index}
          title={job.title}
          company={job.company}
          salary={job.salary}
          location={job.location}
        />
      ))}
    </div>
  );
}
