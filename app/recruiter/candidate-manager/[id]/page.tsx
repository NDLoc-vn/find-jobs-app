"use client";

// import Pagination from "@/app/ui/Pagination";
import Header from "@/app/ui/recruiter/Header";
import JobCardOpen from "@/app/ui/recruiter/JobCardOpen";
import SearchBar from "@/app/ui/SearchBar";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import React from "react";
import { CardCandidateApplied, JobDetail } from "@/app/lib/definitions";
import {
  getDetailJobForGuest,
  getListCandidateAppliedJobs,
} from "@/app/services/jobService";

// const candidates = [
//   {
//     id: 1,
//     name: "Trần Lê Huy Hoàng",
//     date: "23/12/2023",
//     status: "Chưa duyệt",
//     statusColor: "bg-yellow-300",
//     cvLink: "#",
//   },
//   {
//     id: 2,
//     name: "Trần Lê Huy Hoàng",
//     date: "23/12/2023",
//     status: "Từ chối",
//     statusColor: "bg-red-300",
//     cvLink: "#",
//   },
//   {
//     id: 3,
//     name: "Trần Lê Huy Hoàng",
//     date: "23/12/2023",
//     status: "Đã duyệt",
//     statusColor: "bg-green-300",
//     cvLink: "#",
//   },
//   {
//     id: 4,
//     name: "Trần Lê Huy Hoàng",
//     date: "23/12/2023",
//     status: "Đã duyệt",
//     statusColor: "bg-green-300",
//     cvLink: "#",
//   },
//   {
//     id: 5,
//     name: "Trần Lê Huy Hoàng",
//     date: "23/12/2023",
//     status: "Đã duyệt",
//     statusColor: "bg-green-300",
//     cvLink: "#",
//   },
// ];

const CandidateManager = () => {
  const router = useRouter();
  const [job, setJob] = React.useState<JobDetail | null>(null);
  const [candidates, setCandidates] = React.useState<CardCandidateApplied[]>(
    []
  );
  const { id } = useParams();
  const jobId = Array.isArray(id) ? id[0] : id;

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const data = await getDetailJobForGuest(jobId);
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    const fetchCandidateList = async () => {
      try {
        const data = await getListCandidateAppliedJobs(jobId);
        setCandidates(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching list applied candidate:", error);
      }
    };

    fetchJobDetail();
    fetchCandidateList();
  }, [id]);

  const handleDeleteJob = (id: string) => {
    id;
    router.push(`/recruiter/post-manager`);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={handleBack}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back
        </button>
        <JobCardOpen
          id={job?.id || ""}
          title={job?.title || ""}
          company={job?.companyName || ""}
          salaryMin={job?.salary.min || 0}
          salaryMax={job?.salary.max || 0}
          currency={job?.salary.currency || ""}
          address={job?.location.address || ""}
          city={job?.location.city || ""}
          employmentType={job?.employmentType || ""}
          numberApplicants={12}
          onDelete={handleDeleteJob}
        />
        <h2 className="text-2xl font-semibold mt-8 mb-2">
          Danh sách ứng viên: {12}
        </h2>
        <SearchBar />
        <div className="mt-4 mb-8">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex flex-col sm:flex-row justify-between items-center border p-4 rounded-lg shadow-md mb-3 space-y-4 sm:space-y-0"
            >
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  src="/avatar_temp.jpg"
                  alt={candidate.name}
                />
                <div>
                  <h3 className="font-bold text-center sm:text-left">
                    {candidate.name}
                  </h3>
                  <p className="text-center sm:text-left">
                    Ngày nộp: {candidate.dateSubmit}
                  </p>
                </div>
              </div>
              <div
                // className={`px-4 py-1 rounded-full text-white text-center ${candidate.statusColor}`}
                className={`px-4 py-1 rounded-full text-white text-center bg-yellow-300`}
              >
                {candidate.status}
              </div>
              <div className="flex space-x-2 justify-center">
                <a
                  href={candidate.resumeLink}
                  className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
                >
                  Xem CV
                </a>
                <a
                  href="#"
                  className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
                >
                  Nhắn tin
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="flex justify-center">
          <Pagination totalPages={10} />
        </div> */}
      </div>
    </div>
  );
};

export default CandidateManager;
