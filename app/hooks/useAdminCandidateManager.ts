import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Candidate = {
  _id: string;
  name: string;
  email: string;
}

type CandidateData = {
  totalCandidates: number;
  candidates: Candidate[];
}

const fetchCandidateData = async (token: string): Promise<CandidateData> => {
  const response = await axios.get("https://user-service-job-system.onrender.com/api/user/admin/profile/all", {
    headers: {
      Authorization: token,
    },
  })
  const candidateData = response.data.map((candidate: Candidate) => ({
  }));
  return candidateData;
};

export const useAdminCandidateManager = (token: string) => {
  return useQuery({
    queryKey: ['candidateData'],
    queryFn: () => fetchCandidateData(token),
  });
};