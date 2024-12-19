import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Company = {
  _id: string;
  name: string;
  email: string;
  city: string;
  field: string;
}

const fetchCompanyData = async (token: string): Promise<Company[]> => {
  const response = await axios.get("https://user-service-job-system.onrender.com/api/company/admin/profile/all", {
    headers: {
      Authorization: token,
    },
  })
  const companiesData = response.data.map((company: Company) => ({
    _id: company._id,
    name: company.name,
    email: company.email,
    city: company.city,
    field: company.field,
  }));
  return companiesData;
  // return [...companiesData, ...companiesData, ...companiesData, ...companiesData, ...companiesData];
};

export const useAdminCompanyManager = (token: string) => {
  return useQuery({
    queryKey: ['companyData'],
    queryFn: () => fetchCompanyData(token),
  });
};