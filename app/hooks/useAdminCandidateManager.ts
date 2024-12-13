import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Candidate = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  location: string;
}

const fetchCandidateData = async (token: string): Promise<Candidate[]> => {
  const response = await axios.get("https://user-service-job-system.onrender.com/api/user/admin/profile/all", {
    headers: {
      Authorization: token,
    },
  })
  const candidateData = response.data.map((candidate: Candidate) => ({
    _id: candidate._id,
    name: candidate.name,
    email: candidate.email,
    gender: candidate.gender,
    location: candidate.location,
  }));
  return candidateData;
};

export const useAdminCandidateManager = (token: string) => {
  return useQuery({
    queryKey: ['candidateData'],
    queryFn: () => fetchCandidateData(token),
  });
};