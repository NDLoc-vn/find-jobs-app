'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Company } from '../lib/definitions';

export default function CompanySignup() {
  const [companyData, setCompanyData] = useState<Company>({
    name: '',
    email: '',
    industry: '',
    city: '',
    address: '',
    website: '',
  });
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!companyData.name || !companyData.email || !companyData.industry || !companyData.address || !companyData.city || !companyData.website) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      //api

      setSuccess("Company registered successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-toreabay-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Đăng ký công ty</h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Tên công ty</strong>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            name="name"
            value={companyData.name} 
            onChange={handleInputChange} 
            placeholder="Tên công ty"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Email</strong>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            name="email"
            value={companyData.email} 
            onChange={handleInputChange} 
            placeholder="Email"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Lĩnh vực</strong>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            name="industry"
            value={companyData.industry} 
            onChange={handleInputChange} 
            placeholder="Lĩnh vực"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Địa chỉ</strong>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            name="address"
            value={companyData.address} 
            onChange={handleInputChange} 
            placeholder="Địa chỉ"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Thành phố</strong>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            name="city"
            value={companyData.city} 
            onChange={handleInputChange} 
            placeholder="Thành phố"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Website</strong>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            name="website"
            value={companyData.website} 
            onChange={handleInputChange} 
            placeholder="Website"
          />

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button type="submit" className="w-full py-2 px-4 bg-xanhduong-600 text-white rounded-lg mt-4 font-semibold">
            Yêu cầu cấp tài khoản
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Nhà tuyển dụng?{" "}
            <Link href="/recruiter-login" className="text-blue-600">
              Đăng nhập
            </Link>
          </p>
          <p className="mt-2">
            Bạn muốn tìm việc?{" "}
            <Link href="/login" className="text-blue-600">
              Người tìm việc
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
};