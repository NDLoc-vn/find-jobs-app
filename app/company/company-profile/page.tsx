"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/app/contexts/auth-context';
import withAuth from '@/app/lib/withAuth';
import Header from '@/app/ui/company/Header';

interface Job {
  jobId: string;
  title: string;
  due: string;
  salary: string;
  address: string;
  numOfApp: number;
  postedBy: {
    recruiterId: string;
    recruiterName: string;
    _id: string;
  };
  _id: string;
}

interface CompanyProfile {
  website: string;
  category: string;
  _id: string;
  name: string;
  email: string;
  introduction: string;
  city: string;
  address: string[];
  phone: string;
  postedJobs: Job[];
  __v: number;
}

const CompanyProfilePage: React.FC<{ companyId: string }> = ({ companyId }) => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://user-service-job-system.onrender.com/api/company/profile/${user?.userId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch company profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [companyId]);

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <Header />
      <h1 className="text-2xl font-bold mb-4">{profile?.name}</h1>
      <table className="w-full table-auto bg-white rounded-md shadow-md">
        <tbody>
          <tr className="border-b">
            <td className="p-4 font-semibold">Email</td>
            <td className="p-4">{profile?.email}</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-semibold">Phone</td>
            <td className="p-4">{profile?.phone}</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-semibold">Website</td>
            <td className="p-4">{profile?.website}</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-semibold">Lĩnh vực</td>
            <td className="p-4">{profile?.category}</td>
          </tr>
          <tr>
            <td className="p-4 font-semibold">Địa chỉ</td>
            <td className="p-4">{profile?.address.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default withAuth(CompanyProfilePage, ['company']);
