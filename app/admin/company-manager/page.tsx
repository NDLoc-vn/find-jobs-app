"use client";

import { useRouter } from "next/navigation";
import Header from "@/app/ui/admin/Header";
import Pagination from "@/app/ui/Pagination";
import SearchBar from "@/app/ui/SearchBar";
import Image from "next/image";

interface Company {
  id: number;
  name: string;
  avatar: string;
  email: string;
  website: string;
}

const companies: Company[] = [
  {
    id: 1,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 2,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 3,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 4,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 5,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 6,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 7,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 8,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 9,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 10,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 11,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
  {
    id: 12,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  },
];

const CompanyManager = () => {
  const router = useRouter();

  const handleCompany = (id: number) => {
    router.push(`/admin/company-manager/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <Header />
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Danh sách công ty: {companies.length}
      </h2>
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className={"border p-4 rounded-lg shadow-md cursor-pointer"}
            onClick={() => handleCompany(company.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={company.avatar}
                  width={55}
                  height={55}
                  alt="Avatar"
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-bold">{company.name}</p>
                  <p>Email: {company.email}</p>
                  <p>Website: {company.website}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Image
                  src="/icon/edit-button.svg"
                  width={20}
                  height={20}
                  alt="Edit"
                  className="mr-2 cursor-pointer"
                />
                <Image
                  src="/icon/delete-circle.svg"
                  width={20}
                  height={20}
                  alt="Delete"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination totalPages={10} />
      </div>
    </div>
  );
};

export default CompanyManager;
