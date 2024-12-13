import React from "react";
import VerticalHeader from "../ui/admin/VerticalHeader";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <VerticalHeader />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;