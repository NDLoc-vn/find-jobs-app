"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/app/ui/homepage/Header";
import axios from "axios";
import ProvinceInput from "@/app/ui/ProvinceInput";
import CompanyFieldInput from "@/app/ui/admin/CompanyFieldInput";

export default function CompanySignup() {
  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    website: "",
    phone: "",
    category: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleCityChange = (city: string) => {
    setCompanyData({
      ...companyData,
      address: city,
    });
  }

  const handleCategoryChange = (category: string) => {
    setCompanyData({
      ...companyData,
      category: category,
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !companyData.name ||
      !companyData.email ||
      !companyData.password ||
      !companyData.address ||
      !companyData.website ||
      !companyData.phone ||
      !companyData.category
    ) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/company/register`,
        companyData
      );
      if (response.status === 201) {
        setSuccess("Đăng ký thành công. Vui lòng đợi xác nhận từ admin");
      } else {
        setError("Đăng ký thất bại");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-toreabay-700">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Đăng ký công ty
          </h1>

          <form
            onSubmit={handleSubmit}
            className="gap-x-4"
          >
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Tên công ty</strong>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-8"
                name="name"
                onChange={handleInputChange}
                placeholder="Tên công ty"
              />

              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Email</strong>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg mb-8"
                name="email"
                onChange={handleInputChange}
                placeholder="Email"
              />

              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Mật khẩu</strong>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg mb-8"
                name="password"
                onChange={handleInputChange}
                placeholder="Mật khẩu"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Địa chỉ</strong>
                <span className="text-red-500">*</span>
              </label>
              <div
                className="w-full p-2 rounded-lg mb-8"
              >
                <ProvinceInput value={""} onChange={handleCityChange} />
              </div>
              {/* <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-8"
                name="address"
                onChange={handleInputChange}
                placeholder="Địa chỉ"
              /> */}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Số điện thoại</strong>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-8"
                name="phone"
                onChange={handleInputChange}
                placeholder="Số điện thoại"
              />
            </div>

            <div className="col-span-1 md:col-span-2 mt-8 md:mt-0">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Website</strong>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-8"
                name="website"
                onChange={handleInputChange}
                placeholder="Website"
              />

              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Lĩnh vực</strong>
                <span className="text-red-500">*</span>
              </label>
              <CompanyFieldInput value={""} onChange={handleCategoryChange} />
              {/* <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-8"
                name="category"
                onChange={handleInputChange}
                placeholder="Lĩnh vực"
              /> */}
            </div>

            {error && (
              <p className="text-red-500 col-span-1 md:col-span-2">{error}</p>
            )}
            {success && (
              <p className="text-green-500 col-span-1 md:col-span-2">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="col-span-1 md:col-span-2 w-full py-2 px-4 bg-xanhduong-600 text-white rounded-lg mt-4 font-semibold"
            >
              Yêu cầu cấp tài khoản
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>
              Nhà tuyển dụng?{" "}
              <Link href="/recruiter/login" className="text-blue-600">
                Đăng nhập
              </Link>
            </p>
            <p className="mt-2">
              Bạn muốn tìm việc?{" "}
              <Link href="/user/login" className="text-blue-600">
                Người tìm việc
              </Link>
            </p>
          </div>
        </div>
      </div >
    </div >
  );
}