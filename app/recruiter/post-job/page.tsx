"use client";

import { categories } from "@/app/lib/data";
import { createPost } from "@/app/services/jobService";
import Header from "@/app/ui/recruiter/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    categories: categories[0]?.name || "",
    Education: "Intern",
    employmentType: "Full-time",
    city: "",
    address: "",
    salaryMin: "",
    salaryMax: "",
    currency: "VND",
    dueDate: "",
    description: "",
    requirements: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra mức lương
    const salaryMin = parseInt(formData.salaryMin, 10);
    const salaryMax = parseInt(formData.salaryMax, 10);
    if (salaryMin < 0) {
      alert("Mức lương tối thiểu phải lớn hơn hoặc bằng 0.");
      return;
    }
    if (salaryMax !== 0 && salaryMax < salaryMin) {
      alert(
        "Mức lương tối đa phải lớn hơn hoặc bằng mức lương tối thiểu hoặc bằng 0."
      );
      return;
    }

    // Kiểm tra ngày hết hạn
    const currentDate = new Date();
    const dueDate = new Date(formData.dueDate);
    if (dueDate <= currentDate) {
      alert("Ngày hạn phải lớn hơn ngày hiện tại.");
      return;
    }

    const postData = {
      id: null,
      title: formData.title,
      category: categories.find((c) => c.name === formData.categories) || {
        id: "",
        name: "",
      },
      company: null,
      postedBy: null,
      description: formData.description,
      education: formData.Education,
      requirements: formData.requirements.split("\n"),
      salary: {
        min: parseInt(formData.salaryMin, 10),
        max: parseInt(formData.salaryMax, 10),
        currency: formData.currency,
      },
      location: {
        city: formData.city,
        address: formData.address,
      },
      employmentType: formData.employmentType,
      postDate: Math.floor(new Date().getTime()).toString(),
      dueDate: new Date(formData.dueDate).getTime().toString(),
      status: "open",
    };

    console.log("Sending data to server:", postData);

    try {
      await createPost(postData);
      toast.success("Đăng tin tuyển dụng thành công!");
      router.push("/recruiter/post-manager");
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đăng tin.");
      console.error("Error creating job post:", error);
    }
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="my-10 max-w-5xl mx-auto p-8 border rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Đăng tin tuyển dụng</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="space-y-6 flex-1">
            <div>
              <label
                htmlFor="title"
                className="block font-medium text-gray-700"
              >
                Tên công việc<span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Intern UX design, ..."
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
              />
            </div>

            {/* <div>
              <label
                htmlFor="Education"
                className="block font-medium text-gray-700"
              >
                Trình độ<span className="text-red-500">*</span>
              </label>
              <select
                id="Education"
                name="Education"
                value={formData.Education}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
              >
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Manager">Manager</option>
              </select>
            </div> */}

            <div>
              <label
                htmlFor="categories"
                className="block font-medium text-gray-700"
              >
                Loại công việc<span className="text-red-500">*</span>
              </label>
              <select
                id="categories"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="employmentType"
                className="block font-medium text-gray-700"
              >
                Loại nhân viên<span className="text-red-500">*</span>
              </label>
              <select
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
              >
                <option value="FULL-TIME">Full-time</option>
                <option value="PART-TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block font-medium text-gray-700"
                >
                  Thành phố<span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Đà Nẵng, ..."
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block font-medium text-gray-700"
                >
                  Địa chỉ<span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Đà Nẵng, ..."
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="col-span-2">
                <label
                  htmlFor="salaryMin"
                  className="block font-medium text-gray-700"
                >
                  Mức lương (Tối thiểu)
                </label>
                <input
                  id="salaryMin"
                  name="salaryMin"
                  type="number"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="Tối thiểu"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="salaryMax"
                  className="block font-medium text-gray-700"
                >
                  Mức lương (Tối đa)
                </label>
                <input
                  id="salaryMax"
                  name="salaryMax"
                  type="number"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="Tối đa"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="currency"
                  className="block font-medium text-gray-700"
                >
                  Tiền tệ
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-fit border rounded-md focus:ring focus:ring-xanhduong-500"
                >
                  <option value="VND">VND</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block font-medium text-gray-700"
              >
                Tuyển đến ngày<span className="text-red-500">*</span>
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-6 flex-1">
            <div className="flex flex-col h-full">
              <label
                htmlFor="description"
                className="block font-medium text-gray-700"
              >
                Mô tả<span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full h-full border rounded-md focus:ring focus:ring-xanhduong-500 resize-none"
              />
            </div>

            <div className="flex flex-col h-full">
              <label
                htmlFor="requirements"
                className="block font-medium text-gray-700"
              >
                Yêu cầu<span className="text-red-500">*</span>
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full h-full border rounded-md focus:ring focus:ring-xanhduong-500 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-xanhduong-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Xác nhận
          </button>
        </div>
      </form>
    </>
  );
}
