"use client";

import { useState, Suspense, useRef, useEffect } from "react";
import Header from "../ui/company/Header";
import JobList from "@/app/ui/recruiter/JobList";
import { JobListSkeleton } from "@/app/ui/sketetons";
import Image from "next/image";
import CreateAccountForm from "../ui/company/CreateAccountForm";

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
  {
    id: 7,
    name: "Lý Gia Hưng",
    email: "lyhung@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 8,
    name: "Trương Nhật Linh",
    email: "truonglinh@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
];

const RecruiterManager = () => {
  const [activeAccount, setActiveAccount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"openJobs" | "closeJobs">(
    "openJobs"
  );
  const openJobsRef = useRef<HTMLButtonElement | null>(null);
  const closeJobsRef = useRef<HTMLButtonElement | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const jobListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentTab =
      activeTab === "openJobs" ? openJobsRef.current : closeJobsRef.current;
    if (currentTab) {
      const { offsetWidth, offsetLeft } = currentTab;
      setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab]);

  const handleAccountClick = (accountId: number) => {
    setActiveAccount(accountId);
    setActiveTab("openJobs");

    setTimeout(() => {
      if (jobListRef.current) {
        const yOffset = -90;
        const y =
          jobListRef.current.getBoundingClientRect().top +
          window.scrollY +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-2">
          Tạo tài khoản tuyển dụng:
        </h1>
        <CreateAccountForm />

        <h1 className="text-2xl font-semibold mt-8 mb-2">
          Danh sách tài khoản tuyển dụng: {accounts.length}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-8">
          {accounts.map((account) => (
            <div
              key={account.id}
              onClick={() => handleAccountClick(account.id)}
              className={`border p-4 rounded-lg shadow-md cursor-pointer ${
                activeAccount === account.id ? "border-blue-500" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={account.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4"
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

        {/* Show tabs and job list for the selected account */}
        {activeAccount && (
          <div
            ref={jobListRef}
            className="container mx-auto mb-14 px-4 flex flex-col gap-8"
          >
            <div className="relative">
              <div className="flex justify-start gap-8 text-xl">
                <button
                  ref={openJobsRef}
                  className={`py-2 text-xl ${
                    activeTab === "openJobs" ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("openJobs")}
                >
                  Đang tuyển
                </button>
                <button
                  ref={closeJobsRef}
                  className={`py-2 text-xl ${
                    activeTab === "closeJobs"
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
                }}
              ></div>
            </div>

            <Suspense fallback={<JobListSkeleton />}>
              <JobList activeTab={activeTab} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterManager;
