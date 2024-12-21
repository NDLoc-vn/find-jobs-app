import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const CreateAccountForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [error, setError] = useState("");

  const token = Cookies.get("token");

  const checkError = () => {
    if (password !== cfPassword) {
      setError("Mật khẩu xác nhận không đúng");
      return false;
    }
    if (password.length < 6 || name.length < 2 || email.length < 2) {
      setError("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (!name || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (password && !cfPassword) {
      setError("Vui lòng điền xác nhận mật khẩu");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!checkError()) {
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/recruiter/register`,
        {
          recruiter: {
            name,
            email,
            password,
          },
        },
        {
          headers: {
            Authorization: `${token}`, // Đính kèm token vào header
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Đăng ký thành công");
        setName("");
        setEmail("");
        setPassword("");
      } else if (response.status === 400) {
        setError("Tài khoản đã tồn tại");
      } else {
        setError("Đăng ký thất bại");
      }
    } catch (error: any) {
      if (error.response) {
        alert(`Có lỗi xảy ra: ${error.response.data.message}`);
      } else {
        alert("Có lỗi xảy ra trong khi tạo tài khoản!");
      }
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <form className="w-full max-w-4xl mx-auto mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-name"
            >
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-name"
              type="text"
              placeholder="Nhập họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={cfPassword}
              onChange={(e) => setCfPassword(e.target.value)}
            />
          </div>
          <div className="w-full px-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
              type="submit"
            >
              Tạo tài khoản
            </button>
          </div>
          {error && (
            <p className="text-red-500 col-span-1 md:col-span-2">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateAccountForm;
