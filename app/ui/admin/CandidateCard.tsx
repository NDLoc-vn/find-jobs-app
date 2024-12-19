import React from 'react';

type Candidate = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  location: string;
}

type CandidateCardProps = {
  candidate: Candidate;
  onClick: (id: string) => void;
};

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onClick }) => {
  return (
    <div
      className="grid grid-cols-4 border-t p-6 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
      onClick={() => onClick(candidate._id)}
    >
      <div>
        <h3 className="text-gray-600">{candidate.name}</h3>
      </div>
      <div>
        <p className="text-gray-600">{candidate.email}</p>
      </div>
      <div>
        <p className="text-gray-600">{candidate.gender === "male" ? "Nam" : "Nữ"}</p>
      </div>
      <div>
        <p className="text-gray-600">{candidate.location}</p>
      </div>
    </div>
  );
};

export default CandidateCard;