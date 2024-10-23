import { FC, useEffect, useState } from "react";

interface FormData {
  name: string;
  email: string;
  industry: string;
  phone: string;
  location: {
    city: string;
    address: string;
  };
  website: string;
}
interface AccountCardProps {
  key: number;
  handleCreateAccount: (formData: FormData) => void;
  handleDeleteAccount: (formData: FormData) => void;
  initialFormData: FormData;
}

const AccountCard: FC<AccountCardProps> = ({ handleCreateAccount, handleDeleteAccount, initialFormData }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    industry: "",
    phone: "",
    location: {
      city: "",
      address: "",
    },
    website: "",
  });

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <div className="border p-4 rounded-lg shadow">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block font-medium">Tên công ty</label>
          <input
            name="companyName"
            className="border rounded p-2 w-full"
            value={formData.name}
            disabled
          />
        </div>
        <div>
          <label className="block font-medium">Email công ty</label>
          <input
            name="companyEmail"
            className="border rounded p-2 w-full"
            value={formData.email}
            disabled
          />
        </div>
        <div>
          <label className="block font-medium">Số điện thoại công ty</label>
          <input
            name="companyPhone"
            className="border rounded p-2 w-full"
            value={formData.phone}
            disabled
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block font-medium">Lĩnh vực</label>
          <input
            name="industry"
            className="border rounded p-2 w-full"
            value={formData.industry}
            disabled
          />
        </div>
        <div>
          <label className="block font-medium">Thành phố</label>
          <input
            name="city"
            className="border rounded p-2 w-full"
            value={formData.location.city}
            disabled
          />
        </div>
        <div>
          <label className="block font-medium">Địa chỉ công ty</label>
          <input
            name="address"
            className="border rounded p-2 w-full"
            value={formData.location.address}
            disabled
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block font-medium">Website công ty</label>
          <input
            name="website"
            className="border rounded p-2 w-full"
            value={formData.website}
            disabled
          />
        </div>
        <div>
          <label className="block font-medium">Mật khẩu</label>
          <input
            name="password"
            type="password"
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="flex items-end w-full flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={() => handleCreateAccount(formData)}
          >
            Tạo tài khoản
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
            onClick={() => handleDeleteAccount(formData)}
          >
            Xóa
          </button>
        </div>
      </div>

    </div>
  );
};

export default AccountCard;
