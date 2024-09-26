"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-toreabay-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Đăng ký</h1>

        <form>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Họ và tên</strong>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Họ và tên"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Email</strong>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Email"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Mật khẩu</strong>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Mật khẩu"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image
                src={showPassword ? "/icon/eye.svg" : "/icon/eye-slash.svg"}
                alt="Toggle Password Visibility"
                width={20}
                height={20}
              />
            </button>
          </div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Nhập lại mật khẩu</strong>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-4">
            <input
              type={showComfirmPassword ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Nhập lại mật khẩu"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowComfirmPassword(!showComfirmPassword)}
            >
              <Image
                src={showComfirmPassword ? "/icon/eye.svg" : "/icon/eye-slash.svg"}
                alt="Toggle Password Visibility"
                width={20}
                height={20}
              />
            </button>
          </div>

          <button className="w-full py-2 px-4 bg-xanhduong-600 text-white rounded-lg mt-4 font-semibold">
            Đăng ký
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-blue-600">
              Đăng nhập
            </Link>
          </p>
          <p className="mt-2">
            Hoặc{" "}
            <Link href="/recruiter-login" className="text-blue-600">
              Nhà tuyển dụng
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
