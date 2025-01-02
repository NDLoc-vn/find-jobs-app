"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/app/contexts/auth-context";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Header from "@/app/ui/homepage/Header";

type LoginUser = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const checkError = () => {
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkError()) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth`,
        userData
      );
      if (
        (response.status === 200 &&
          // response.headers["authorization"] &&
          response.data.token &&
          response.data.account.role === "recruiter") ||
        response.data.account.role === "company"
      ) {
        // const token = response.headers["authorization"];
        const token = response.data.token;
        const userData = response.data.account;
        login(token, userData);
        toast.success("Đăng nhập thành công");
        if (response.data.account.role === "recruiter")
          router.push("/recruiter/post-job");
        else router.push("/company/company-profile");
      } else if (response.status === 400) {
        // bughh return wrong status code
        setError("Sai tài khoản hoặc mật khẩu");
      } else if (response.status === 401) {
        setError("Sai tài khoản hoặc mật khẩu");
      } else if (response.data.account.role === "candidate") {
        setError("Sai tài khoản hoặc mật khẩu");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data.details === "Authentication failed! This account is not active.") {
        setError("Tài khoản chưa được kích hoạt");
      } else {
        setError("Sai tài khoản hoặc mật khẩu");
      }
      // toast.error("Đăng nhập thất bại");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-toreabay-700">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-6 text-center">Đăng nhập</h1>

          <form onSubmit={handleSubmit}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Email"
              defaultValue={userData.email}
              onChange={handleInputChange}
              name="email"
            />

            <label className="block mb-1 text-sm font-medium text-gray-700">
              <strong>Mật khẩu</strong>
            </label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Mật khẩu"
                defaultValue={userData.password}
                onChange={handleInputChange}
                name="password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                aria-label="Show password"
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
            {/* <Link href="#" className="text-blue-600 text-sm">
              Quên mật khẩu
            </Link> */}

            {error && (
              <p className="text-red-500 col-span-1 md:col-span-2">{error}</p>
            )}

            <button className="w-full py-2 px-4 bg-xanhduong-600 text-white rounded-lg mt-4 font-semibold">
              Đăng nhập
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>
              Chưa có tài khoản?{" "}
              <Link href="/recruiter/signup" className="text-blue-600">
                Đăng ký
              </Link>
            </p>
            <p className="mt-2">
              Hoặc{" "}
              <Link href="/user/login" className="text-blue-600">
                Người tìm việc
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
