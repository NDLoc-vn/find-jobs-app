import { useEffect, useState } from "react";
import AccountCard from "./AccountCard";
import { fetchCompanyAccount } from "@/app/lib/data";
import { AccountListSkeleton } from "../AdminSkeletons";
import Pagination from "../Pagination";

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

const AccountList = () => {
  const [accounts, setAccounts] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchCompanyAccount();
        setAccounts(data);
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, []);

  const handleCreateAccount = (formData: FormData) => {
    console.log("chap nhan", formData);
  };

  const handleDeleteAccount = (formData: FormData) => {
    console.log("tu choi", formData);
  };

  if (loading) {
    return (
      <AccountListSkeleton />
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        Số lượng tài khoản cần cấp: {accounts.length}
      </h1>

      <div className="space-y-6">
        {accounts.map((account, index) => (
          <AccountCard
            key={index}
            handleCreateAccount={handleCreateAccount}
            handleDeleteAccount={handleDeleteAccount}
            initialFormData={account}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={1} />
      </div>
    </div>
  );
};

export default AccountList;
