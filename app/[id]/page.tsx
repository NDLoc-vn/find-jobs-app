"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { JobDetailSkeleton } from "../ui/sketetons";
import { JobDetail } from "../lib/definitions";
import Header from "../ui/homepage/Header";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getDetailJobForGuest } from "../services/jobService";

type JobDetailPageProps = {
  params: { id: string };
};

const JobPage = ({ params }: JobDetailPageProps) => {
  const { id } = params;
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  const [job, setJob] = React.useState<JobDetail | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const data = await getDetailJobForGuest(id);
        setJob(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (loading) {
    return <JobDetailSkeleton />;
  }

  return (
    <div className="container mx-auto h-screen p-6 mt-10 bg-white max-w-5xl">
      <Header />
      <button
        onClick={handleBack}
        className="text-blue-600 hover:text-blue-800 mb-4"
      >
        ← Back
      </button>
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
            <h1 className="text-3xl font-bold text-gray-800">{job?.title}</h1>
            <span className="text-lg text-gray-500 mr-2">
              at {job?.companyName}
            </span>
            <span className="text-sm font-semibold bg-green-600 text-white px-2 pt-0.5 pb-1 rounded">
              {job?.employmentType}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href={"/user/login"}>
            <div className="flex-grow">
              <button className="w-full bg-xanhduong-600 hover:bg-xanhduong-500 text-white px-4 py-2 rounded shadow-md whitespace-nowrap">
                Apply Now &#8594;
              </button>
            </div>
          </Link>
        </div>
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
                {job?.salary.min.toLocaleString()} -{" "}
                {job?.salary.max.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                Location
              </h3>
              <p className="text-gray-600 text-center whitespace-nowrap">
                {job?.location.city}, {job?.location.address}
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Job Overview
          </h2>
          <p className="text-gray-600">
            <strong>Job Posted:</strong>{" "}
            {new Date(Number(job?.postDate)).toISOString().split("T")[0]}
          </p>
          <p className="text-gray-600">
            <strong>Due:</strong>{" "}
            {new Date(Number(job?.dueDate)).toISOString().split("T")[0]}
          </p>
          <p className="text-gray-600">
            <strong>Status:</strong> {job?.status}
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
            Share this job:
          </h2>
          <div className="flex space-x-4">
            <button className="bg-gray-200 p-2 rounded hover:bg-gray-300 flex">
              <Image
                src="/icon/link.svg"
                width={20}
                height={20}
                alt="Copy Link"
              />
              <span className="ml-2">Copy Link</span>
            </button>
            <button className="bg-gray-200 p-2 rounded hover:bg-gray-300">
              <Image
                src="/icon/linkedin.svg"
                width={20}
                height={20}
                alt="LinkedIn"
              />
              <span className="sr-only">LinkedIn</span>
            </button>
            <button className="bg-gray-200 p-2 rounded hover:bg-gray-300">
              <Image
                src="/icon/facebook.svg"
                width={20}
                height={20}
                alt="Facebook"
              />
              <span className="sr-only">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
