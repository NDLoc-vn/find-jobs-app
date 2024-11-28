"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../ui/user/Header";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { formatDOB, toYYYYMMDD } from "../lib/utils";
import SkillsForm from "../ui/user/profile/SkillsForm";
import { UserDetailSkeleton } from "../ui/sketetons";
import { ObjectId } from "bson";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type UserProfileType = {
  name: string;
  location?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
};

type EducationType = {
  _id: string;
  school: string;
  major: string;
  duration: string;
  description: string;
};

type ExperienceType = {
  _id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
};

type SkillType = {
  _id: string;
  title: string;
};

type checkType = {
  _id: string;
  name: string;
};

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // temp
  const [richTextContent, setRichTextContent] = useState<string>("");

  const [educations, setEducations] = useState<EducationType[]>([]);
  const [education, setEducation] = useState<EducationType | null>(null);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [experience, setExperience] = useState<ExperienceType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [check, setCheck] = useState<checkType | null>(null);

  // // temp skill
  const [skills, setSkills] = useState<string[]>([]);
  const [fetchedSkills, setFetchedSkills] = useState<SkillType[]>([]);
  const [inputSkillValue, setInputSkillValue] = useState<string>("");
  const handleSkillsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSkillValue(e.target.value);
  };

  const addSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };
  // ////

  const { token, user } = useAuth();

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/profile/${user?.userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUserProfile({
        name: response.data.name,
        location: response.data.location,
        phone: response.data.phone,
        dateOfBirth: response.data.dateOfBirth,
        gender: response.data.gender,
      });
      setEducations(response.data.education);
      setExperiences(response.data.experience);
      setFetchedSkills(response.data.skills);
      setSkills(response.data.skills.map((skill: SkillType) => skill.title));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    if (activeForm === "editProfile") {
      axios
        .put(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/profile`,
          {
            name: userProfile?.name,
            location: userProfile?.location,
            phone: userProfile?.phone,
            dateOfBirth: userProfile?.dateOfBirth,
            gender: userProfile?.gender,
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
    } else if (activeForm === "education") {
      axios
        .post(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/edu`,
          {
            "education": {
              "school": education?.school,
              "major": education?.major,
              "duration": education?.duration,
              "description": education?.description
            }
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
    } else if (activeForm === "skills") {
      const postSkills: SkillType[] = skills.map(skill => {
        const existingSkill = fetchedSkills.find(fetchedSkill => fetchedSkill.title === skill);
        return {
          _id: existingSkill ? existingSkill._id : new ObjectId().toHexString(),
          title: skill,
        };
      });

      const skillsToDelete = fetchedSkills.filter(fetchedSkill => !skills.includes(fetchedSkill.title));
      skillsToDelete.forEach(skill => {
        axios
          .delete(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/skills`,
            {
              headers: {
                Authorization: token,
              },
              data: {
                skillId: skill._id,
              }
            }
          )
          .catch((err) => {
            console.error(err);
          });
      });

      axios
        .post(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/skills`,
          {
            "skills": postSkills
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
        }
        );
    } else if (activeForm === "experience") {
      axios
        .post(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/exp`,
          {
            "experience": {
              "company": experience?.company,
              "position": experience?.position,
              "duration": experience?.duration,
              "description": experience?.description
            }
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
    }
    closeForm();
  }

  const handleDelete = () => {
    const isConfirmed = confirm("Bạn có chắc chắn muốn xoá không?");
    if (!isConfirmed) return;
    if (activeForm === "education") {
      axios
        .delete(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/edu`,
          {
            headers: {
              Authorization: token,
            },
            data: {
              eduId: check?._id,
            }
          }
        )
        .then(() => {
          setEducations(prevList => prevList.filter(item => item._id !== check?._id));
          closeForm();
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (activeForm === "experience") {
      axios
        .delete(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/exp`,
          {
            headers: {
              Authorization: token,
            },
            data: {
              expId: check?._id,
            }
          }
        )
        .then(() => {
          setExperiences(prevList => prevList.filter(item => item._id !== check?._id));
          closeForm();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  const handleUserProfileInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserProfile({ ...userProfile!, [name]: value });
  };

  const handleEducationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isEdit) {
      const { name, value } = e.target;
      setEducations(prevList => prevList.map(item => item._id === check?._id ? { ...item, [name]: value } : item));
    } else {
      const { name, value } = e.target;
      setEducation({ ...education!, [name]: value });
    }
  }

  const handleExperienceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isEdit) {
      const { name, value } = e.target;
      setExperiences(prevList => prevList.map(item => item._id === check?._id ? { ...item, [name]: value } : item));
    } else {
      const { name, value } = e.target;
      setExperience({ ...experience!, [name]: value });
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const openForm = (formName: string) => {
    setActiveForm(formName);
  };

  const closeForm = () => {
    setIsEdit(false);
    setCheck(null);
    setEducation(null);
    setExperience(null);
    setActiveForm(null);
  };

  if (isLoading) {
    return <>
      <Header />
      <UserDetailSkeleton />
    </>
  }

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
                    {formatDOB(userProfile?.dateOfBirth)}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-blue-500">📍</span>
                  <p>
                    {userProfile?.location === ""
                      ? "Địa chỉ"
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
                  <p>
                    {userProfile?.gender === ""
                      ? "Giới tính"
                      : userProfile?.gender === "male" ? "Nam" : "Nữ"
                    }
                  </p>
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
          <div className="flex justify-between items-center border-b-2">
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
          {educations.length === 0 && (
            <p className="text-gray-500 mt-2">No education information</p>
          )}
          <ul className="mt-2 space-y-2">
            {educations.map((education: EducationType) => (
              <li key={education._id} className="border-b pb-2 flex justify-between">
                <div>
                  <h4 className="font-bold">{education.school}</h4>
                  <p>{education.major}</p>
                  <p>
                    {education.duration}
                  </p>
                  <p>{education.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <button onClick={
                    () => {
                      setIsEdit(true);
                      setCheck({
                        _id: education._id,
                        name: "education"
                      });
                      openForm("education");
                    }
                  } className="p-2">
                    <Image
                      src="/icon/edit-button.svg"
                      width={20}
                      height={20}
                      alt="edit button"
                    />
                    <span className="sr-only">edit education</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
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
          {skills.length === 0 && (
            <p className="text-gray-500 mt-2">No skill information</p>
          )}
          <ul className="mt-2 space-y-2">
            {skills.map((skill: string) => (
              <span
                key={skill}
                className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </ul>
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


          {experiences.length === 0 && (
            <p className="text-gray-500 mt-2">No Experience</p>
          )}
          <ul className="mt-2 space-y-2">
            {experiences.map((experience: ExperienceType) => (
              <li key={experience._id} className="border-b pb-2 flex justify-between">
                <div>
                  <h4 className="font-bold">{experience.company}</h4>
                  <p>{experience.position}</p>
                  <p>
                    {experience.duration}
                  </p>
                  <p>{experience.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <button onClick={
                    () => {
                      setIsEdit(true);
                      setCheck({
                        _id: experience._id,
                        name: "experience"
                      });
                      openForm("experience");
                    }
                  } className="p-2">
                    <Image
                      src="/icon/edit-button.svg"
                      width={20}
                      height={20}
                      alt="edit button"
                    />
                    <span className="sr-only">edit experience</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>



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
                        onChange={handleUserProfileInputChange}
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
                        onChange={handleUserProfileInputChange}
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
                        onChange={handleUserProfileInputChange}
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
                        name="gender"
                        value={userProfile?.gender}
                        onChange={handleUserProfileInputChange}
                      >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                      </select>
                    </div>
                  </form>
                ) : activeForm === "education" ? (
                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Trường học
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={educations.find((item) => item._id === check?._id)?.school}
                        onChange={handleEducationInputChange}
                        placeholder="Nhập trường học"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Chuyên ngành
                      </label>
                      <input
                        type="text"
                        name="major"
                        value={educations.find((item) => item._id === check?._id)?.major}
                        onChange={handleEducationInputChange}
                        placeholder="Nhập chuyên ngành"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Thời gian học
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          name="duration"
                          value={educations.find((item) => item._id === check?._id)?.duration}
                          onChange={handleEducationInputChange}
                          placeholder="Nhập chuyên ngành"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả
                      </label>
                      <textarea
                        name="description"
                        value={educations.find((item) => item._id === check?._id)?.description}
                        onChange={handleEducationInputChange}
                        placeholder="Nhập mô tả"
                        rows={5}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </form>
                ) : activeForm === "skills" ? (

                  <SkillsForm skills={skills} inputValue={inputSkillValue} handleSkillsInputChange={handleSkillsInputChange} addSkill={addSkill} />

                ) : activeForm === "experience" ? (
                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Công ty
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={experiences.find((item) => item._id === check?._id)?.company}
                        onChange={handleExperienceInputChange}
                        placeholder="Nhập công ty"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Vị trí
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={experiences.find((item) => item._id === check?._id)?.position}
                        onChange={handleExperienceInputChange}
                        placeholder="Nhập vị trí"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Thời gian làm việc
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          name="duration"
                          value={experiences.find((item) => item._id === check?._id)?.duration}
                          onChange={handleExperienceInputChange}
                          placeholder="Nhập thời gian làm việc"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả
                      </label>
                      <textarea
                        name="description"
                        value={experiences.find((item) => item._id === check?._id)?.description}
                        onChange={handleExperienceInputChange}
                        placeholder="Nhập mô tả"
                        rows={5}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
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
              <  div className="p-4 border-t flex justify-end space-x-4">
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
                {isEdit && (
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Xoá
                  </button>
                )}
              </div>
            </div>
          </div>
        )
        }
      </div >
    </div >
  );
};

export default ProfilePage;
