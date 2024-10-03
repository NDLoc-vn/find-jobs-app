"use client";

import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/avatar_temp.jpg"
            alt="Profile Image"
            width={100}
            height={100}
            className="rounded-full place-self-start"
          />
          <div>
            <h2 className="text-3xl font-bold">Trần Lê Huy Hoàng</h2>
            <div className="text-sm flex flex-col mt-2">
              <div className="flex items-center mb-4">
                <span className="mr-2 text-blue-500">📧</span>
                <p>hoang@gmail.com</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="mr-2 text-blue-500">📅</span>
                <p className="text-gray-500">Sinh nhật</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="mr-2 text-blue-500">📍</span>
                <p className="text-gray-500">Địa chỉ</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="mr-2 text-blue-500">📞</span>
                <p>0914141141</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-blue-500">👤</span>
                <p className="text-gray-500">Giới tính</p>
              </div>
            </div>
          </div>
        </div>
        <button className="p-2">
          <Image
            src="/icon/edit-button.svg"
            width={20}
            height={20}
            alt="Edit Button"
          />
          <span className="sr-only">Edit</span>
        </button>
      </div>

      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Học vấn</h3>
          <button className="p-2">
            <Image
              src="/icon/plus.svg"
              width={20}
              height={20}
              alt="Plus Button"
            />
            <span className="sr-only">Edit</span>
          </button>
        </div>
        <p className="text-gray-500 mt-2">Share your background education</p>
      </div>

      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Kĩ năng</h3>
          <button className="p-2">
            <Image
              src="/icon/plus.svg"
              width={20}
              height={20}
              alt="Plus Button"
            />
            <span className="sr-only">Edit</span>
          </button>
        </div>
        <p className="text-gray-500 mt-2">
          Showcase your skills and proficiencies
        </p>
      </div>

      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Kinh nghiệm làm việc</h3>
          <button className="p-2">
            <Image
              src="/icon/plus.svg"
              width={20}
              height={20}
              alt="Plus Button"
            />
            <span className="sr-only">Edit</span>
          </button>
        </div>
        <p className="text-gray-500 mt-2">
          Introduce your strengths and years of experience
        </p>
      </div>

      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Hồ sơ xin việc</h3>
          <button className="p-2">
            <Image
              src="/icon/plus.svg"
              width={20}
              height={20}
              alt="Plus Button"
            />
            <span className="sr-only">Edit</span>
          </button>
        </div>
        <p className="text-gray-500 mt-2">Add your application</p>
      </div>
    </div>
  );
};

export default ProfilePage;
