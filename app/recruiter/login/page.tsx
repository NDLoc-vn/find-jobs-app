'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecruiterLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      //api

      setSuccess("Đăng nhập thành công");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-toreabay-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Đăng nhập cho nhà tuyển dụng</h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            <strong>Mật khẩu</strong>
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="w-full py-2 px-4 bg-xanhduong-600 text-white rounded-lg mt-4 font-semibold">
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Chưa có tài khoản cho công ty?{" "}
            <Link href="/company/signup" className="text-blue-600">
              Đăng ký
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
  );
};