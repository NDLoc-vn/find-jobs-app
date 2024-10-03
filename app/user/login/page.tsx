"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-toreabay-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Đăng nhập</h1>
        <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center mb-6">
          <Image
            src="/icon/google.svg"
            width={20}
            height={20}
            alt="Google"
            className="w-5 h-5 mr-2"
          />
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
              <span className="sr-only">Show password</span>
            </button>
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
            <Link href="/user/signup" className="text-blue-600">
              Đăng ký
            </Link>
          </p>
          <p className="mt-2">
            Hoặc{" "}
            <Link href="/recruiter/login" className="text-blue-600">
              Nhà tuyển dụng
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
