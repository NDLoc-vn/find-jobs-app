"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { JobDetailSkeleton } from "../ui/sketetons";
import { Job2 } from "../lib/definitions";

const JobPage = () => {
  const [loading, setLoading] = React.useState(true);
  //viet definition sau
  const [job, setJob] = React.useState<Job2 | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      const job = {
        title: "Senior UX Designer",
        category: "Design",
        company: { name: "Facebook" },
        description:
          "Here at Velstar, we don’t just make websites; we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level.",
        requirements: [
          "3+ years of experience in back-end development.",
          "Experience with HTML, JavaScript, CSS, PHP, Symfony, and/or Laravel.",
          "Working regularly with APIs and Web Services (REST, GraphQL, SOAP, etc.)",
          "Ambitious and hungry to grow your career in a fast-growing agency.",
        ],
        salary: {
          min: 100000,
          max: 120000,
          currency: "USD",
        },
        location: {
          city: "Da Nang",
          address: "Lien Chieu",
        },
        employmentType: "Full-Time",
        postedDate: "14 Jun, 2021",
        status: "Open",
      };

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setJob(job);
      setLoading(false);
    };

    fetchJobData();
  }, []);

  if (loading) {
    return <JobDetailSkeleton />;
  }

  return (
    <div className="container mx-auto h-screen p-6 mt-10 bg-white max-w-5xl">
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
              at {job?.company.name}
            </span>
            <span className="text-sm font-semibold bg-green-600 text-white px-2 pt-0.5 pb-1 rounded">
              {job?.employmentType}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="rounded bg-blue-600 hover:bg-blue-500 p-2">
              <Image
                src="/icon/bookmark.svg"
                width={20}
                height={20}
                alt="bookmark"
              />
            </div>
          </div>
          <div className="flex-grow">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded shadow-md whitespace-nowrap">
              Apply Now &#8594;
            </button>
          </div>
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
            {job?.requirements.map((req: string, index: number) => (
              <li key={index}>{req}</li>
            ))}
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
            <strong>Job Posted:</strong> {job?.postedDate}
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
