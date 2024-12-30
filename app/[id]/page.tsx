"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { JobDetailSkeleton } from "../ui/sketetons";
import { CardJob, JobDetail } from "../lib/definitions";
import UserHeader from "../ui/homepage/Header";
import RecruiterHeader from "../ui/recruiter/Header";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getDetailJobForGuest, getListCardJobs } from "../services/jobService";
import { useAuth } from "../contexts/auth-context";
import JobCard from "../ui/homepage/JobCart";

type JobDetailPageProps = {
  params: { id: string };
};

const JobPage = ({ params }: JobDetailPageProps) => {
  const { id } = params;
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  const [job, setJob] = React.useState<JobDetail | null>(null);
  const [relatedJobs, setRelatedJobs] = React.useState<CardJob[]>([]);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const data = await getDetailJobForGuest(id);
        setJob(data);
        if (data?.category.name) {
          const allJobs = await getListCardJobs();
          const sameCategoryJobs = allJobs.filter(
            (jobItem: CardJob) =>
              jobItem.category.name === data.category.name && jobItem.id !== id
          );
          const additionalJobs = allJobs
            .filter((j) => !sameCategoryJobs.includes(j) && j.id !== data.id)
            .slice(0, 3 - sameCategoryJobs.length);
          const finalJobs = [...sameCategoryJobs, ...additionalJobs].slice(
            0,
            3
          );
          setRelatedJobs(finalJobs);
        }
      } catch (error: unknown) {
        console.log("Error fetching job detail:", error);

        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          (error as { response: { status?: number } }).response?.status === 403
        ) {
          router.push("/error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (loading) {
    return <JobDetailSkeleton />;
  }

  const handleCopy = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container mx-auto p-6 mt-5 bg-white max-w-8xl">
      {user?.role === "candidate" ? <UserHeader /> : <RecruiterHeader />}
      <button
        onClick={handleBack}
        className="text-blue-600 hover:text-blue-800 mb-4"
      >
        ← Back
      </button>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-4">
          <div className="flex md:flex-row flex-col justify-between items-center border-b pb-4 mb-4">
            <div className="flex items-center">
              <Image
                src="/icon/facebook.svg"
                width={100}
                height={100}
                alt="Facebook"
                className="mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {job?.title}
                </h1>
                <span className="text-lg text-gray-500 mr-2">
                  at {job?.companyName}
                </span>
                <span className="text-sm font-semibold bg-green-600 text-white px-2 pt-0.5 pb-1 rounded">
                  {job?.employmentType}
                </span>
              </div>
            </div>
            {user?.role === "candidate" ? (
              <div className="flex items-center space-x-4">
                <Link href={"/user/login"}>
                  <div className="flex-grow">
                    <button className="w-full bg-xanhduong-600 hover:bg-xanhduong-500 text-white px-4 py-2 rounded shadow-md whitespace-nowrap">
                      Apply Now &#8594;
                    </button>
                  </div>
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Job Description
              </h2>
              <p className="text-gray-600 mb-6">{job?.description}</p>
              <h2 className="text-xl mb-2 font-semibold text-gray-800">
                Requirements
              </h2>
              <ul className="list-disc pl-6 text-gray-600">
                {job?.requirements?.length ? (
                  job.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))
                ) : (
                  <li>Không có yêu cầu nào</li>
                )}
              </ul>
            </div>
            <div className="p-4">
              <div className="flex justify-between space-x-4 mb-4">
                <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                    Salary ({job?.salary.currency})
                  </h3>
                  <p className="font-semibold text-lg text-green-500 text-center whitespace-nowrap">
                    {job?.salary?.min !== undefined &&
                    job?.salary?.max !== undefined
                      ? job.salary.min > 0 && job.salary.max > 0
                        ? `${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}`
                        : job.salary.min > 0
                        ? `${job.salary.min.toLocaleString()}`
                        : job.salary.max > 0
                        ? `${job.salary.max.toLocaleString()}`
                        : "Negotiable"
                      : "Salary information unavailable"}
                  </p>
                </div>
                <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                    Location
                  </h3>
                  <p className="text-gray-600 text-center break-words">
                    {job?.location.city}, {job?.location.address}
                  </p>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Job Overview
              </h2>
              <p className="text-gray-600">
                <strong>Job Posted:</strong>{" "}
                {new Date(Number(job?.postDate)).toLocaleDateString("en-GB")}
              </p>
              <p className="text-gray-600">
                <strong>Due:</strong>{" "}
                {new Date(Number(job?.dueDate)).toLocaleDateString("en-GB")}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {job?.status}
              </p>
              <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                Share this job:
              </h2>
              <div className="flex space-x-4">
                <button
                  className="bg-gray-200 p-2 rounded hover:bg-gray-300 flex"
                  onClick={handleCopy}
                >
                  <Image
                    src="/icon/link.svg"
                    width={20}
                    height={20}
                    alt="Copy Link"
                  />
                  <span className="ml-2">Copy Link</span>
                </button>
                {copied && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm rounded px-4 py-2 shadow-lg">
                    Link đã được sao chép!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 lg:pl-6">
          <h2 className="text-2xl font-bold mb-4">Những công việc liên quan</h2>
          <div className="space-y-4">
            {relatedJobs.map((relatedJob) => (
              <JobCard
                key={relatedJob.id}
                id={relatedJob.id}
                title={relatedJob.title}
                company={relatedJob.companyName}
                salaryMin={relatedJob.salary.min}
                salaryMax={relatedJob.salary.max}
                currency={relatedJob.salary.currency}
                city={relatedJob.location.city}
                address={relatedJob.location.address}
                employmentType={relatedJob.employmentType}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
