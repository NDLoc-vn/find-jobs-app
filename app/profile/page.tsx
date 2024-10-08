"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../ui/user/Header";

const ProfilePage = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const openForm = (formName: string) => {
    setActiveForm(formName);
  };

  const closeForm = () => {
    setActiveForm(null);
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Information */}
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
          <button onClick={() => openForm("editProfile")} className="p-2">
            <Image
              src="/icon/edit-button.svg"
              width={20}
              height={20}
              alt="Edit Button"
            />
            <span className="sr-only">Edit</span>
          </button>
        </div>

        {/* Sections */}
        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Học vấn</h3>
            <button onClick={() => openForm("education")} className="p-2">
              <Image
                src="/icon/plus.svg"
                width={20}
                height={20}
                alt="Plus Button"
              />
              <span className="sr-only">Add Education</span>
            </button>
          </div>
          <p className="text-gray-500 mt-2">Share your background education</p>
        </div>

        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Kĩ năng</h3>
            <button onClick={() => openForm("skills")} className="p-2">
              <Image
                src="/icon/plus.svg"
                width={20}
                height={20}
                alt="Plus Button"
              />
              <span className="sr-only">Add Skills</span>
            </button>
          </div>
          <p className="text-gray-500 mt-2">Showcase your skills</p>
        </div>

        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Kinh nghiệm làm việc</h3>
            <button onClick={() => openForm("experience")} className="p-2">
              <Image
                src="/icon/plus.svg"
                width={20}
                height={20}
                alt="Plus Button"
              />
              <span className="sr-only">Add Experience</span>
            </button>
          </div>
          <p className="text-gray-500 mt-2">Introduce your experience</p>
        </div>

        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Hồ sơ xin việc</h3>
            <button onClick={() => openForm("application")} className="p-2">
              <Image
                src="/icon/plus.svg"
                width={20}
                height={20}
                alt="Plus Button"
              />
              <span className="sr-only">Add Application</span>
            </button>
          </div>
          <p className="text-gray-500 mt-2">Upload your CV</p>
        </div>

        {/* Pop-up Form */}
        {activeForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-h-[90%] w-full max-w-lg flex flex-col">
              {/* Form Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold">
                  {activeForm === "editProfile" && "Thông tin cá nhân"}
                  {activeForm === "education" && "Học vấn"}
                  {activeForm === "skills" && "Kĩ năng"}
                  {activeForm === "experience" && "Kinh nghiệm"}
                  {activeForm === "application" && "Hồ sơ xin việc"}
                </h3>
                <button
                  onClick={closeForm}
                  className="text-gray-400 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              {/* Form Content*/}
              <div className="overflow-y-auto p-4 flex-1">
                {/* Edit Profile Form */}
                {activeForm === "editProfile" && (
                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={"Trần Lê Huy Hoàng"}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Nhập email"
                        value={"hoang@gmail.com"}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        placeholder="Nhập ngày sinh"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập địa chỉ"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={"0914141141"}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Giới tính
                      </label>
                      <select
                        title="Gender"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option>Nam</option>
                        <option>Nữ</option>
                      </select>
                    </div>
                  </form>
                )}
                {/* Similar form fields for other activeForm sections */}
              </div>

              {/* Form Footer */}
              <div className="p-4 border-t flex justify-end space-x-4">
                <button
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Hủy bỏ
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
