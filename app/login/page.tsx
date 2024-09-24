"use client";

import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-toreabay-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Đăng nhập</h1>
        <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center mb-6">
          <img src="/icon/google.svg" alt="Google" className="w-5 h-5 mr-2" />
          Đăng nhập bằng Google
        </button>

        <hr className="my-6" />

        <form>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Email"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Mật khẩu</strong>
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Mật khẩu"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              👁️
            </span>
          </div>
          <Link href="#" className="text-blue-600 text-sm">
            Quên mật khẩu
          </Link>

          <button className="w-full py-2 px-4 bg-xanhduong-600 text-white rounded-lg mt-4 font-semibold">
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-blue-600">
              Đăng ký
            </Link>
          </p>
          <p className="mt-2">
            Hoặc{" "}
            <Link href="/employer-login" className="text-blue-600">
              Nhà tuyển dụng
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
