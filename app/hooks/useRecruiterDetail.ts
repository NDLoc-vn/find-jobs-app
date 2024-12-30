import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type RecruiterData = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
};

const fetchRecruiterData = async (token: string, recruiterId: string): Promise<RecruiterData> => {
  if (!token) {
    throw new Error('Token is not set');
  }
  if (!recruiterId) {
    throw new Error('Recruiter ID is not set');
  }
  const response = await axios.get(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/recruiter/profile/${recruiterId}`, {
    headers: {
      Authorization: token,
    },
  })
  return response.data;
};

export const useRecruiterDetail = (token: string, recruiterId: string) => {
  return useQuery({
    queryKey: ['recruiterData'],
    queryFn: () => fetchRecruiterData(token, recruiterId),
  });
};