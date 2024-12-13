"use client";

import { useAuth } from "@/app/contexts/auth-context";
import { useAdminCandidateManager } from "@/app/hooks/useAdminCandidateManager";
import CandidateCard from "@/app/ui/admin/CandidateCard";
import { AdminDashboardListSkeleton } from "@/app/ui/AdminSkeletons";
import Pagination from "@/app/ui/Pagination";
import SearchBar from "@/app/ui/SearchBar";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CandidateSearchBar from "@/app/ui/admin/CandidateSearchBar";

type Candidate = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  location: string;
}

const CandidateManager = () => {
  const searchParams = useSearchParams();
  const candidatePerPage = 10;
  const currentPage = Number(searchParams.get("page")) || 1;

  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [location, setLocation] = useState<string>(initialLocation);

  const { token } = useAuth();
  const router = useRouter();
  if (!token) {
    router.push("/admin/login");
    return;
  };
  const { data: candidates, isLoading } = useAdminCandidateManager(token);
  if (isLoading) {
    return (
      <AdminDashboardListSkeleton />
    )
  }
  if (!candidates) {
    return <div>No data</div>;
  }

  const filteredData = candidates.filter((candidate: Candidate) => {
    return (
      (candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      candidate.location.toLowerCase().includes(location.toLowerCase()) &&
      candidate.name !== "admin1"
    );
  });

  const handleSearch = (query: string, loc: string) => {
    setSearchQuery(query);
    setLocation(loc);
    router.push(`/admin/candidate-manager?search=${query}&location=${loc}`);
  };

  const totalPages = Math.ceil(candidates.length / candidatePerPage) || 1;
  const startIndex = (currentPage - 1) * candidatePerPage;
  const currentData = filteredData.slice(startIndex, startIndex + candidatePerPage);

  const handleCandidate = (candidateId: string) => {
    router.push(`/admin/candidate-manager/${candidateId}`);
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Số lượng công ty: {candidates.length}
      </h2>
      <CandidateSearchBar
        onSearch={handleSearch}
        initialSearch={initialSearch}
        initialLocation={initialLocation}
      />
      <div className="my-5">
        <div className="grid grid-cols-4 py-1 px-6 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
          <div>
            <h3 className="text-gray-600">Tên</h3>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
          </div>
          <div>
            <p className="text-gray-600">Giới tính</p>
          </div>
          <div>
            <p className="text-gray-600">Địa chỉ</p>
          </div>
        </div>
        <div className="grid grid-cols-1">
          {currentData.map((candidate: Candidate) => (
            <CandidateCard candidate={candidate} onClick={handleCandidate} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default CandidateManager;
