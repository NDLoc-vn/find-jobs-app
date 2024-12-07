"use client";

import { useState, useRef, useEffect } from "react";
import Header from "../ui/user/Header";
import AppliedJobList from "../ui/user/AppliedJobList";
import BookmarkedJobList from "../ui/user/BookmarkedJobList";
import SearchBar from "../ui/homepage/SearchBar";

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState<"applied" | "saved">("applied");
  const appliedRef = useRef<HTMLButtonElement | null>(null);
  const savedRef = useRef<HTMLButtonElement | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const currentTab =
      activeTab === "applied" ? appliedRef.current : savedRef.current;
    if (currentTab) {
      const { offsetWidth, offsetLeft } = currentTab;
      setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab]);

  return (
    <>
      <Header />
      <SearchBar />
      <div className="container mx-auto mb-14 px-4 flex flex-col gap-8">
        <div className="relative">
          <div className="flex justify-start mt-5 gap-8 text-xl">
            <button
              ref={appliedRef}
              className={`py-2 text-xl ${
                activeTab === "applied" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("applied")}
            >
              Đã Ứng Tuyển
            </button>
            <button
              ref={savedRef}
              className={`py-2 text-xl ${
                activeTab === "saved" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("saved")}
            >
              Đã Lưu
            </button>
          </div>

          {/* Sliding underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
            style={{ width: underlineStyle.width, left: underlineStyle.left }}
          ></div>
        </div>

        {activeTab === "applied" ? <AppliedJobList /> : <BookmarkedJobList />}
      </div>
    </>
  );
};

export default MyJobs;
