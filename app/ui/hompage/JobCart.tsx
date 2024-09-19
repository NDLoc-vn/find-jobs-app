import React from "react";
import Image from "next/image";

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
  return (
    <div className="p-4 border rounded mb-4 gradient-hover">
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="flex flex-wrap items-center mt-1 gap-x-2">
        <span className="bg-green-100 text-green-600 font-semibold px-2 py-1 text-xs rounded">
          INTERNSHIP
        </span>
        <p className="text-gray-400">Salary: {salary}</p>
      </div>
      <p className="mt-1">{company}</p>
      <div className="flex flex-nowrap justify-between">
        <div className="flex flex-nowrap">
          <Image
            src="/icon/gray-location.svg"
            width={20}
            height={20}
            alt="Location"
          />
          <p>{location}</p>
        </div>
        <Image src="/icon/bookmark.svg" width={20} height={20} alt="Location" />
      </div>
    </div>
  );
};

export default JobCard;
