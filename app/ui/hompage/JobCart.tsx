import React from "react";

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
    <div className="p-4 border rounded mb-4">
      <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded">
        INTERNSHIP
      </span>
      <h3 className="font-bold text-lg mt-2">{title}</h3>
      <p>{company}</p>
      <p>Salary: {salary}</p>
      <p>{location}</p>
    </div>
  );
};

export default JobCard;
