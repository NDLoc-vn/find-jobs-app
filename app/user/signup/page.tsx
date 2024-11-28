"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type SignupUser = {
  name: string;
  email: string;
  password: string;
};

type InputFieldProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  toggleVisibility?: () => void;
};

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, showToggle, toggleVisibility }) => (
  <div className="relative mb-4">
    <label className="block mb-1 text-sm font-medium text-gray-700">
      <strong>{label}</strong>
      <span className="text-red-500">*</span>
    </label>
    <div className="relative mb-4">
      <input
        type={type}
        className="w-full p-2 border border-gray-300 rounded-lg"
        placeholder={label}
        value={value}
        onChange={onChange}
        name={name}
      />
      {showToggle && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={toggleVisibility}
        >
          <Image
            src={type === "text" ? "/icon/eye.svg" : "/icon/eye-slash.svg"}
            alt="Toggle Password Visibility"
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  </div>
);

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [userData, setUserData] = useState<SignupUser>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  const checkError = () => {
    if (userData.password !== confirmPassword) {
      setError("Mật khẩu xác nhận không đúng");
      return false;
    }
    if (userData.password.length < 6 || userData.name.length < 2 || userData.email.length < 2) {
      setError("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (!userData.name || !userData.email || !userData.password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (userData.password && !confirmPassword) {
      setError("Vui lòng điền xác nhận mật khẩu");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkError()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/register`, userData);
      if (response.status === 201) {
        toast.success("Đăng ký thành công");
        router.push("/user/login");
        // setSuccess("Đăng ký thành công");
        // console.log("User registered successfully", response.data);
      } else if (response.status === 400) {
        // bughh return wrong status code
        setError("Tài khoản đã tồn tại");
      } else {
        setError("Đăng ký thất bại");
        // console.error("Failed to register user", response.statusText);
      }
    } catch (err) {
      setError("Đăng ký thất bại");
      // console.error("An unknown error occurred", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-toreabay-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Đăng ký</h1>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Họ và tên"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <InputField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            showToggle={true}
            toggleVisibility={() => setShowPassword(!showPassword)}
          />
          <InputField
            label="Nhập lại mật khẩu"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showToggle={true}
            toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {error && <p className="text-red-500 col-span-1 md:col-span-2">{error}</p>}
          {/* {success && <p className="text-green-500 col-span-1 md:col-span-2">{success}</p>} */}

          <button className="w-full py-2 px-4 bg-xanhduong-600 text-white rounded-lg mt-4 font-semibold">
            Đăng ký
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Đã có tài khoản?{" "}
            <Link href="/user/login" className="text-blue-600">
              Đăng nhập
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

export default Signup;
