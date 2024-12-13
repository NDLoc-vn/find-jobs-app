"use client";

import { useAuth } from "@/app/contexts/auth-context";
import { useAdminCandidateManager } from "@/app/hooks/useAdminCandidateManager";
import Pagination from "@/app/ui/Pagination";
import SearchBar from "@/app/ui/SearchBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Candidate = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  location: string;
}

const CandidateManager = () => {
  const { token } = useAuth();
  const router = useRouter();
  if (!token) {
    router.push("/admin/login");
    return;
  };
  const { data } = useAdminCandidateManager(token);
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Danh sách tài khoản tìm việc: {12}
      </h2>
      <SearchBar />

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={"border p-4 rounded-lg shadow-md cursor-pointer"}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={account.avatar}
                  width={55}
                  height={55}
                  alt="Avatar"
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-bold">{account.name}</p>
                  <p>Email: {account.email}</p>
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
      </div> */}

      <div className="flex justify-center">
        <Pagination totalPages={10} />
      </div>
    </div>
  );
};

export default CandidateManager;
