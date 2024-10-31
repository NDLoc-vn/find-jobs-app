"use client";

import Header from "@/app/ui/company/Header";

export default function PostJob() {
  return (
    <>
      <Header />
      <form className="my-10 max-w-4xl mx-auto p-8 border rounded-lg shadow-lg">
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
                placeholder="Intern UX design, ..."
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
              />
            </div>

            <div>
              <label
                htmlFor="employmentType"
                className="block font-medium text-gray-700"
              >
                Loại công việc<span className="text-red-500">*</span>
              </label>
              <select
                id="employmentType"
                name="employmentType"
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block font-medium text-gray-700"
              >
                Địa điểm<span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Đà Nẵng, ..."
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="minSalary"
                  className="block font-medium text-gray-700"
                >
                  Mức lương (Tối thiểu)
                </label>
                <input
                  id="minSalary"
                  type="number"
                  placeholder="Tối thiểu"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
                />
              </div>
              <div>
                <label
                  htmlFor="maxSalary"
                  className="block font-medium text-gray-700"
                >
                  Mức lương (Tối đa)
                </label>
                <input
                  id="maxSalary"
                  type="number"
                  placeholder="Tối đa"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-xanhduong-500"
                />
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
