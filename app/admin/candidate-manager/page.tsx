"use client";

import Header from "@/app/ui/admin/Header";
import Pagination from "@/app/ui/Pagination";
import SearchBar from "@/app/ui/SearchBar";
import Image from "next/image";

interface CandidateAccount {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const accounts: CandidateAccount[] = [
  {
    id: 1,
    name: "Trần Lê Huy Hoàng",
    email: "abc@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    email: "nguyenb@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 3,
    name: "Lê Thị Cẩm Tú",
    email: "camtu@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 4,
    name: "Phạm Minh Quân",
    email: "phamquan@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 5,
    name: "Đỗ Hồng Sơn",
    email: "dongson@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 6,
    name: "Nguyễn Thanh Hoa",
    email: "nguyenhoa@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 7,
    name: "Nguyễn Anh Tuấn",
    email: "tuan@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
  {
    id: 8,
    name: "Trần Thị Thu Hà",
    email: "thuha@gmail.com",
    avatar: "/avatar_temp.jpg",
  },
];

const CandidateManager = () => {
  return (
    <div className="container mx-auto p-6">
      <Header />
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Danh sách tài khoản tìm việc: {12}
      </h2>
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={"border p-4 rounded-lg shadow-md cursor-pointer"}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={account.avatar}
                  width={55}
                  height={55}
                  alt="Avatar"
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-bold">{account.name}</p>
                  <p>Email: {account.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Image
                  src="/icon/edit-button.svg"
                  width={20}
                  height={20}
                  alt="Edit"
                  className="mr-2 cursor-pointer"
                />
                <Image
                  src="/icon/delete-circle.svg"
                  width={20}
                  height={20}
                  alt="Delete"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination totalPages={10} />
      </div>
    </div>
  );
};

export default CandidateManager;
