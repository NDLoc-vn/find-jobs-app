"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  title: string;
  company: string;
  salary: string;
  location: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  salary,
  location,
}) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Link href={"/search-job/1"}>
      <div className="cursor-pointer p-4 border rounded mb-4 gradient-hover">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex flex-wrap items-center mt-1 gap-x-2">
          <span className="bg-green-100 text-green-600 font-semibold px-2 py-1 text-xs rounded">
            INTERNSHIP
          </span>
          <p className="text-gray-400">Salary: {salary}</p>
        </div>

        <div className="flex justify-between items-center mt-2">
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
              <p className="ml-1">{location}</p>
            </div>
          </div>

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
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
