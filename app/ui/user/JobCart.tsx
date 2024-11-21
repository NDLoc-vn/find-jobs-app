"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/contexts/auth-context";
import {
  addBookmarkedJob,
  deleteBookmarkedJob,
} from "@/app/services/jobService";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  city: string;
  address: string;
  employmentType: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  salaryMin,
  salaryMax,
  currency,
  city,
  address,
  employmentType,
}) => {
  const { isLoggedIn } = useAuth();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmarkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsBookmarked(!isBookmarked);

    if (!isBookmarked) {
      addBookmarkedJob(id);
    } else {
      deleteBookmarkedJob(id);
    }
  };

  return (
    <Link href={`/search-job/${id}`}>
      <div className="cursor-pointer p-4 border rounded mb-4 gradient-hover">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex flex-wrap items-center mt-1 gap-x-2">
          <span className="bg-green-100 text-green-600 font-semibold px-2 py-1 text-xs rounded">
            {employmentType.toUpperCase()}
          </span>
          <p className="text-gray-400">
            Salary: {currency} {salaryMin}-{salaryMax}
          </p>
        </div>

        <div className="flex justify-start items-center mt-2">
          <div className="mr-4 flex-shrink-0">
            <Image
              src="/icon/google.svg"
              width={40}
              height={40}
              alt="Company Logo"
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col justify-between">
            <p className="font-semibold">{company}</p>
            <div className="flex items-center">
              <Image
                src="/icon/gray-location.svg"
                width={20}
                height={20}
                alt="Location"
              />
              <p className="ml-1">
                {city}, {address}
              </p>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="flex ml-auto">
              <Image
                src={
                  isBookmarked
                    ? "/icon/bookmark-filled.svg"
                    : "/icon/bookmark.svg"
                }
                width={20}
                height={20}
                alt="Bookmark"
                onClick={handleBookmarkClick}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
