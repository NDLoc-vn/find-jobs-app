"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../ui/user/Header";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
// import { UserProfileType } from "../lib/definitions";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { formatDOB, toYYYYMMDD } from "../lib/utils";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type UserProfileType = {
  name: string;
  location?: string;
  phone?: string;
  dateOfBirth?: string;
};

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [richTextContent, setRichTextContent] = useState<string>("");

  const { token, user } = useAuth();

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USERS_API_URL}/profile/${user?.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      setUserProfile({
        name: response.data.name,
        location: response.data.location,
        phone: response.data.phone,
        dateOfBirth: response.data.dateOfBirth,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    if (activeForm === "editProfile") {
      axios
        .put(`${process.env.NEXT_PUBLIC_USERS_API_URL}/profile`,
          {
            name: userProfile?.name,
            location: userProfile?.location,
            phone: userProfile?.phone,
            dateOfBirth: userProfile?.dateOfBirth,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(() => {
          fetchUserInfo();
          closeForm();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("not available");
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile!, [name]: value });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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
              <h2 className="text-3xl font-bold">{userProfile?.name}</h2>
              <div className="text-sm flex flex-col mt-2">
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-blue-500">📧</span>
                  <p>{user?.email}</p>
                </div>
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-blue-500">📅</span>
                  <p>
                    {/* {userProfile?.dateOfBirth === ""
                      ? "Sinh nhật"
                      : userProfile?.dateOfBirth} */}
                    {formatDOB(userProfile?.dateOfBirth)}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-blue-500">📍</span>
                  <p>
                    {userProfile?.location === ""
                      ? "Địa điểm"
                      : userProfile?.location}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-blue-500">📞</span>
                  <p>
                    {userProfile?.phone === ""
                      ? "Số điện thoại"
                      : userProfile?.phone}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-blue-500">👤</span>
                  <p className="text-gray-500">Giới tính (be ch tra ve)</p>
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
                {activeForm === "editProfile" ? (
                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={userProfile?.name}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-300"
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Nhập email"
                        value={user?.email}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-300"
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        placeholder="Nhập ngày sinh"
                        name="dateOfBirth"
                        value={toYYYYMMDD(formatDOB(userProfile?.dateOfBirth))}
                        onChange={handleInputChange}
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
                        name="location"
                        value={userProfile?.location}
                        onChange={handleInputChange}
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
                        name="phone"
                        value={userProfile?.phone}
                        onChange={handleInputChange}
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
                ) : (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={richTextContent}
                      onChange={setRichTextContent}
                    />
                  </div>
                )}
              </div>

              {/* Form Footer */}
              <div className="p-4 border-t flex justify-end space-x-4">
                <button
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
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
