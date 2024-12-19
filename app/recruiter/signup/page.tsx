"use client";

import { useState } from "react";
import Link from "next/link";
import { Company } from "@/app/lib/definitions";
import CityInput from "@/app/ui/CityInput";
import Header from "@/app/ui/homepage/Header";

export default function CompanySignup() {
  const [companyData, setCompanyData] = useState<Company>({
    name: "",
    email: "",
    industry: "",
    city: "",
    address: "",
    website: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isValidCity, setIsValidCity] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleCityValidChange = (isValid: boolean) => {
    setIsValidCity(isValid);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !companyData.name ||
      !companyData.email ||
      !companyData.industry ||
      !companyData.address ||
      !companyData.city ||
      !companyData.website
    ) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (!isValidCity) {
      setError("Vui lòng chọn thành phố hợp lệ");
      return;
    }

    try {
      console.log(companyData);
      //api

      setSuccess("Company registered successfully!");
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
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4"
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
                // value={companyData.name}
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
                // value={companyData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Địa chỉ</strong>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-8"
                name="address"
                // value={companyData.address}
                onChange={handleInputChange}
                placeholder="Địa chỉ"
              />
              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Tỉnh thành</strong>
                <span className="text-red-500">*</span>
              </label>
              <CityInput
                onCityInput={handleInputChange}
                changeCityValid={handleCityValidChange}
              />
            </div>

            <div className="col-span-1 md:col-span-2 mt-8 md:mt-0">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                <strong>Lĩnh vực</strong>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-8"
                name="industry"
                // value={companyData.industry}
                onChange={handleInputChange}
                placeholder="Lĩnh vực"
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
                // value={companyData.website}
                onChange={handleInputChange}
                placeholder="Website"
              />
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
      </div>
    </div>
  );
}
