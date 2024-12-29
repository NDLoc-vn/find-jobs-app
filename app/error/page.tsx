import React from "react";
import Link from "next/link";

const Error403Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <p className="mt-4 text-xl text-gray-700">
          Bạn không có quyền truy cập vào tài nguyên này.
        </p>
        <p className="mt-2 text-gray-500">
          Vui lòng kiểm tra lại quyền truy cập hoặc liên hệ với quản trị viên.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Error403Page;
