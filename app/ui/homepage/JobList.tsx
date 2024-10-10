import JobCard from './JobCart';
import { fetchJobs } from '@/app/lib/data';
import { Job } from '@/app/lib/definitions';

export default async function JobList() {
  const jobs: Job[] = await fetchJobs();

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
