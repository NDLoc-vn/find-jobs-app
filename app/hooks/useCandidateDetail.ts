import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type CandidateData = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
};

const fetchCandidateData = async (token: string, candidateId: string): Promise<CandidateData> => {
  if (!token) {
    throw new Error('Token is not set');
  }
  if (!candidateId) {
    throw new Error('Candidate ID is not set');
  }
  const response = await axios.get(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/user/profile/${candidateId}`, {
    headers: {
      Authorization: token,
    },
  })
  return response.data;
};

export const useCandidateDetail = (token: string, candidateId: string) => {
  return useQuery({
    queryKey: ['candidateData'],
    queryFn: () => fetchCandidateData(token, candidateId),
  });
};