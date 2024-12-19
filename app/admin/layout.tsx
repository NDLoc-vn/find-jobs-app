import React from "react";
import VerticalHeader from "../ui/admin/VerticalHeader";
import Header from "../ui/admin/Header";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Header />
      <VerticalHeader />
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;