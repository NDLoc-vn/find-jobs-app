"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CardJob, JobDetail } from "@/app/lib/definitions";
import {
  addBookmarkedJob,
  appliedJob,
  deleteBookmarkedJob,
  getDetailJob,
  getDetailJobForGuest,
  getListCardJobs,
} from "@/app/services/jobService";
import { JobDetailSkeleton } from "@/app/ui/sketetons";
import Header from "@/app/ui/user/Header";
import { useAuth } from "@/app/contexts/auth-context";
import JobCard from "@/app/ui/homepage/JobCart";

type JobDetailPageProps = {
  params: { id: string };
};

const ApplyFormPopup = ({
  idPost,
  isOpen,
  onClose,
}: {
  idPost: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  // const [fullName, setFullName] = React.useState("");
  // const [cv, setCv] = React.useState<File | null>(null);
  const [cv, setCv] = React.useState<File | null>(null);
  const [coverLetter, setCoverLetter] = React.useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCv(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv) {
      alert("Vui lòng điền đầy đủ thông tin và tải lên CV!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", cv);
    formData.append("coverLetter", coverLetter);
    formData.append("idPost", idPost);

    appliedJob(formData);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Ứng tuyển công việc</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ và Tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
              placeholder="Enter your full name"
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CV (PDF) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full"
              required
              title="Upload your CV in PDF format"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cover Letter <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write a cover letter (optional)"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
            >
              Ứng tuyển
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const JobPage = ({ params }: JobDetailPageProps) => {
  const { isLoggedIn } = useAuth();
  const { id } = params;
  const [loading, setLoading] = React.useState(true);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  const [job, setJob] = React.useState<JobDetail | null>(null);
  const [relatedJobs, setRelatedJobs] = React.useState<CardJob[]>([]);
  const [copied, setCopied] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        let data = null;
        if (isLoggedIn) {
          data = await getDetailJob(id);
        } else {
          data = await getDetailJobForGuest(id);
        }
        setIsBookmarked(data.isBookMark);
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

  const handleCopy = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleBookmarkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsBookmarked(!isBookmarked);

    if (!isBookmarked) {
      addBookmarkedJob(id);
    } else {
      deleteBookmarkedJob(id);
    }
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="container mx-auto p-6 mt-5 bg-white max-w-8xl">
      <Header />
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
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <div className="flex-shrink-0">
                    <div className="rounded bg-green-600 hover:bg-green-500 p-2">
                      <Image
                        src={
                          isBookmarked
                            ? "/icon/bookmark-filled.svg"
                            : "/icon/bookmark.svg"
                        }
                        width={20}
                        height={20}
                        alt="bookmark"
                        onClick={handleBookmarkClick}
                      />
                    </div>
                  </div>
                  <div>
                    <Link href="/message">
                      <button className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded shadow-md whitespace-nowrap">
                        Contact Recruiter
                      </button>
                    </Link>
                  </div>
                  <div className="flex-grow">
                    <button
                      className={`w-full bg-xanhduong-600 hover:bg-xanhduong-500 text-white px-4 py-2 rounded shadow-md whitespace-nowrap ${
                        job?.isApplied ? "cursor-not-allowed" : ""
                      }`}
                      onClick={() => {
                        if (!job?.isApplied) {
                          openPopup();
                        }
                      }}
                      disabled={job?.isApplied}
                    >
                      {job?.isApplied ? "Applied !" : "Apply Now →"}
                    </button>
                    <ApplyFormPopup
                      idPost={id}
                      isOpen={isPopupOpen}
                      onClose={closePopup}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
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
