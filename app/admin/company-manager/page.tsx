"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/ui/Pagination";
import SearchBar from "@/app/ui/admin/SearchBar";
import { useAdminCompanyManager } from "@/app/hooks/useAdminCompanyManager";
import { useAuth } from "@/app/contexts/auth-context";
import CompanyCard from "@/app/ui/admin/CompanyCard";
import { AdminDashboardListSkeleton } from "@/app/ui/AdminSkeletons";
import { useState } from "react";

type Company = {
  _id: string;
  name: string;
  email: string;
  city: string;
  field: string;
}

const CompanyManager = () => {
  const searchParams = useSearchParams();
  const companyPerPage = 10;
  const currentPage = Number(searchParams.get("page")) || 1;
  const router = useRouter();
  const { token } = useAuth();

  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialField = searchParams.get("field") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [location, setLocation] = useState<string>(initialLocation);
  const [field, setField] = useState<string>(initialField);

  if (!token) {
    router.push("/admin/login");
    return;
  }

  const { data, isLoading } = useAdminCompanyManager(token);
  if (isLoading) {
    return (
      <AdminDashboardListSkeleton />
    )
  }
  if (!data) {
    return <div>No data</div>;
  }

  const handleSearch = (query: string, loc: string, field: string) => {
    setSearchQuery(query);
    setLocation(loc);
    setField(field);
    router.push(`/admin/company-manager?search=${query}&location=${loc}&field=${field}`);
  };

  const filteredData = data.filter((company: Company) => {
    return (
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      company.city.toLowerCase().includes(location.toLowerCase())
      // company.field.toLowerCase().includes(field.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / companyPerPage) || 1;
  const startIndex = (currentPage - 1) * companyPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + companyPerPage);

  const handleCompany = (id: string) => {
    router.push(`/admin/company-manager/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Số lượng công ty: {data.length}
      </h2>
      <SearchBar
        initialSearch={initialSearch}
        initialLocation={initialLocation}
        initialField={initialField}
        onSearch={handleSearch}
      />
      <div className="my-5">
        <div className="grid grid-cols-4 py-1 px-6 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
          <div>
            <h3 className="text-gray-600">Tên công ty</h3>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
          </div>
          <div>
            <p className="text-gray-600">Thành phố</p>
          </div>
          <div>
            <p className="text-gray-600">Lĩnh vực</p>
          </div>
        </div>
        <div className="grid grid-cols-1">
          {currentData.map((company: Company) => (
            <CompanyCard company={company} onClick={handleCompany} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default CompanyManager;
