"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/app/contexts/auth-context";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

    // try {
    //   const mockResponse = {
    //     status: 200,
    //     headers: {
    //       "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ3MDBhNThmZWQzY2Q0NDEzMTQzOTMiLCJlbWFpbCI6InRlc3R1c2VyMkBnbWFpbC5jb20iLCJyb2xlIjoiY2FuZGlkYXRlIiwiaWF0IjoxNzMyNzMwMDAxfQ.HUVIOTgO7qQUgJ1oy-xJQIOuBZz0HP0k8CJnVbe2vFA"
    //     },
    //     data: {
    //       "message": "Authentication successful",
    //       "account": {
    //         "_id": "674700a6d4e03d709fb7f4b1",
    //         "userId": "674700a58fed3cd441314393",
    //         "name": "testuser2",
    //         "email": "testuser2@gmail.com",
    //         "role": "candidate"
    //       }
    //     }
    //   };

    //   const response = mockResponse;

    //   if (response.status === 200 && response.headers["authorization"]) {
    //     const token = response.headers["authorization"];
    //     const userData = response.data.account;
    //     login(token, userData);
    //     console.log(response.data.message);
    //     toast.success("Đăng nhập thành công");
    //   }
    // } catch (err) {
    //   setError("Đăng nhập thất bại");
    //   // toast.error("Đăng nhập thất bại");
    // }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth`,
        userData
      );
      if (
        response.status === 200 &&
        response.headers["authorization"]
      ) {
        const token = response.headers["authorization"];
        const userData = response.data.user;
        login(token, userData);
        toast.success("Đăng nhận thành công");
        router.push("/");
      } else if (response.status === 400) {
        // bughh return wrong status code
        setError("Đăng nhập thất bại");
      } else if (response.status === 401) {
        setError("Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Đăng nhập thất bại");
      // toast.error("Đăng nhập thất bại");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

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
          <Link href="#" className="text-blue-600 text-sm">
            Quên mật khẩu
          </Link>

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
