import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type MonthlyData = {
  month: number;
  year: number;
  count: number;
};

type UserData = {
  totalUsers: number;
  usersCreatedToday: number;
  usersCreatedEachMonth: MonthlyData[];
};

type RecruiterData = {
  totalRecruiters: number;
  recruitersCreatedToday: number;
  recruitersCreatedEachMonth: MonthlyData[];
};

type GrowthData = {
  users: UserData;
  recruiters: RecruiterData;
};

const fetchGrowthData = async (token: string): Promise<GrowthData> => {
  const response = await axios.get("https://user-service-job-system.onrender.com/api/statistics/growth/", {
    headers: {
      Authorization: token,
    },
  })
  return response.data;
};

export const useAdminDashboardData = (token: string) => {
  return useQuery({
    queryKey: ['growthData'],
    queryFn: () => fetchGrowthData(token),
  });
};