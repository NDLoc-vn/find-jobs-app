"use client";

import AccountList from "@/app/ui/admin/AccountList";
import Header from "@/app/ui/admin/Header";

export default function AccountsPage() {
  return (
    <div className="container mx-auto p-6">
      <Header />
      <AccountList />
    </div>
  );
}
