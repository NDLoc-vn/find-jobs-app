import React from 'react';

type Company = {
  _id: string;
  name: string;
  email: string;
  city: string;
  field: string;
};

type CompanyCardProps = {
  company: Company;
  onClick: (id: string) => void;
};

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClick }) => {
  return (
    <div
      className="grid grid-cols-4 border-t p-6 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
      onClick={() => onClick(company._id)}
    >
      <div>
        <h3 className="text-gray-600">{company.name}</h3>
      </div>
      <div>
        <p className="text-gray-600">{company.email}</p>
      </div>
      <div>
        <p className="text-gray-600">{company.city}</p>
      </div>
      <div>
        <p className="text-gray-600">{company.field}</p>
      </div>
    </div>
  );
};

export default CompanyCard;