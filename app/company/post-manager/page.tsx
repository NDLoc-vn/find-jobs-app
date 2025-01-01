"use client";

import withAuth from "@/app/lib/withAuth";
import CloseJobList from "@/app/ui/company/CloseJobList";
import Header from "@/app/ui/company/Header";
import OpenJobList from "@/app/ui/company/OpenJobList";
// import SearchBar from "@/app/ui/SearchBar";
import { useState, useRef, useEffect } from "react";

const PostManager = () => {
  const [activeTab, setActiveTab] = useState<"openJobs" | "closeJobs">(
    "openJobs"
  );
  const openJobsdRef = useRef<HTMLButtonElement | null>(null);
  const closeJobsRef = useRef<HTMLButtonElement | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const currentTab =
      activeTab === "openJobs" ? openJobsdRef.current : closeJobsRef.current;
    if (currentTab) {
      const { offsetWidth, offsetLeft } = currentTab;
      setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab]);

  return (
    <>
      <Header />
      <div className="container mx-auto mb-14 px-4 flex flex-col gap-8">
        {/* <SearchBar /> */}
        <div className="relative mt-5">
          <div className="flex justify-start gap-8 text-xl">
            <button
              ref={openJobsdRef}
              className={`py-2 text-xl ${activeTab === "openJobs" ? "text-blue-500" : "text-gray-500"
                }`}
              onClick={() => setActiveTab("openJobs")}
            >
              Đang tuyển
            </button>
            <button
              ref={closeJobsRef}
              className={`py-2 text-xl ${activeTab === "closeJobs" ? "text-blue-500" : "text-gray-500"
                }`}
              onClick={() => setActiveTab("closeJobs")}
            >
              Đã đóng
            </button>
          </div>

          {/* Sliding underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
            style={{ width: underlineStyle.width, left: underlineStyle.left }}
          ></div>
        </div>

        {activeTab === "openJobs" ? (
          <OpenJobList recruiterId="" />
        ) : (
          <CloseJobList recruiterId="" />
        )}
      </div>
    </>
  );
};

export default withAuth(PostManager, ["company"]);
