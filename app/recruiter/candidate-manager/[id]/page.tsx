"use client";

// import Pagination from "@/app/ui/Pagination";
import Header from "@/app/ui/recruiter/Header";
import JobCardOpen from "@/app/ui/recruiter/JobCardOpen";
// import SearchBar from "@/app/ui/SearchBar";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import React from "react";
import { CardCandidateApplied, JobDetail } from "@/app/lib/definitions";
import {
  editStatusCv,
  getDetailJobForGuest,
  getListCandidateAppliedJobs,
} from "@/app/services/jobService";

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
      } catch (error: unknown) {
        console.log("Error fetching list applied candidate:", error);

        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          (error as { response: { status?: number } }).response?.status === 403
        ) {
          router.push("/error");
        }
      }
    };

    fetchJobDetail();
    fetchCandidateList();
  }, [id]);

  const handleDeleteJob = (id: string) => {
    id;
    router.push(`/recruiter/post-manager`);
  };

  const handleChangeStatus = async (
    jobId: string = "",
    newStatus: string,
    candidateId: string
  ) => {
    try {
      await editStatusCv(jobId, newStatus, candidateId);
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.idUser === candidateId
            ? { ...candidate, status: newStatus }
            : candidate
        )
      );
    } catch (error: unknown) {
      console.log("Error edit status cv:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as { response: { status?: number } }).response?.status === 403
      ) {
        router.push("/error");
      }
    }
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
          Danh sách ứng viên: {candidates.length}
        </h2>
        {/* <SearchBar /> */}
        <div className="mt-4 mb-8">
          {candidates.map((candidate) => (
            <div
              key={candidate.idUser}
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
                    Ngày nộp:{" "}
                    {new Date(Number(candidate.dateSubmit)).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>
              </div>
              {/* <div
                // className={`px-4 py-1 rounded-full text-white text-center ${candidate.statusColor}`}
                className={`px-4 py-1 rounded-full text-white text-center bg-yellow-300`}
              >
                {candidate.status}
              </div> */}
              <div>
                <select
                  aria-label="Resume Status"
                  value={candidate.status}
                  onChange={(e) =>
                    handleChangeStatus(
                      job?.id,
                      e.target.value,
                      candidate.idUser
                    )
                  }
                  className="px-4 py-1 rounded-full text-center border bg-white"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>
              <div className="flex space-x-2 justify-center">
                <a
                  href={candidate.resumeLink}
                  className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
                  download
                >
                  Xem CV
                </a>
                <a
                  href={`/recruiter/mess-firebase/${candidate.idUser}`}
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
