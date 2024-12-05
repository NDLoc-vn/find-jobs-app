"use client";

import { useState, Suspense, useRef, useEffect } from "react";
import { JobListSkeleton } from "@/app/ui/sketetons";
import Image from "next/image";
import CreateAccountForm from "@/app/ui/company/CreateAccountForm";
import { useRouter } from "next/navigation";
import OpenJobList from "@/app/ui/admin/OpenJobList";
import CloseJobList from "@/app/ui/admin/CloseJobList";

interface Company {
  id: number;
  name: string;
  avatar: string;
  email: string;
  website: string;
}

interface RecruiterAccount {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const accounts: RecruiterAccount[] = [
  {
    id: 1,
    name: "Trần Lê Huy Hoàng",
    email: "abc@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    email: "nguyenb@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 3,
    name: "Lê Thị Cẩm Tú",
    email: "camtu@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 4,
    name: "Phạm Minh Quân",
    email: "phamquan@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 5,
    name: "Đỗ Hồng Sơn",
    email: "dongson@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 6,
    name: "Nguyễn Thanh Hoa",
    email: "nguyenhoa@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
];

const RecruiterManager = ({ params }: { params: { id: number } }) => {
  const company: Company = {
    id: params.id,
    name: "Facebook",
    avatar: "/icon/facebook.svg",
    email: "abc@gmail.com",
    website: "facebook.com",
  };

  const [activeAccount, setActiveAccount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"openJobs" | "closeJobs">(
    "openJobs"
  );
  const openJobsRef = useRef<HTMLButtonElement | null>(null);
  const closeJobsRef = useRef<HTMLButtonElement | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const currentTab =
      activeTab === "openJobs" ? openJobsRef.current : closeJobsRef.current;
    if (currentTab) {
      const { offsetWidth, offsetLeft } = currentTab;
      setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab, activeAccount]);

  const handleAccountClick = (accountId: number) => {
    setActiveAccount(accountId);
    setActiveTab("openJobs");
  };

  return (
    <div>
      <div className="container mx-auto p-6">
        <button
          onClick={handleBack}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back
        </button>
        <div className="flex items-center justify-between border p-4 rounded-lg">
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

        <h1 className="text-2xl font-semibold mt-8 mb-2">
          Tạo tài khoản tuyển dụng:
        </h1>
        <CreateAccountForm />

        <h1 className="text-2xl font-semibold mt-8 mb-2">
          Danh sách tài khoản tuyển dụng: {accounts.length}
        </h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 mt-4 mb-8">
          {/* Left column: Recruiter accounts */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                onClick={() => handleAccountClick(account.id)}
                className={`border p-4 rounded-lg shadow-md cursor-pointer ${activeAccount === account.id ? "border-blue-500" : ""
                  }`}
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
          </div>

          {/* Right column: Job list for the selected account */}
          <div className="col-span-1 md:col-span-6 border p-4 rounded-lg shadow-md">
            {activeAccount ? (
              <>
                <div className="relative">
                  <div className="flex justify-start gap-8 text-xl">
                    <button
                      ref={openJobsRef}
                      className={`py-2 text-xl ${activeTab === "openJobs"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => setActiveTab("openJobs")}
                    >
                      Đang tuyển
                    </button>
                    <button
                      ref={closeJobsRef}
                      className={`py-2 text-xl ${activeTab === "closeJobs"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => setActiveTab("closeJobs")}
                    >
                      Đã đóng
                    </button>
                  </div>

                  {/* Sliding underline */}
                  <div
                    className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
                    style={{
                      width: underlineStyle.width,
                      left: underlineStyle.left,
                      bottom: "4px",
                    }}
                  ></div>
                </div>

                <Suspense fallback={<JobListSkeleton />}>
                  {activeTab === "openJobs" ? (
                    <OpenJobList />
                  ) : (
                    <CloseJobList />
                  )}
                </Suspense>
              </>
            ) : (
              <p className="text-gray-500">
                Chọn một tài khoản để xem danh sách các bài đăng tuyển
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterManager;
