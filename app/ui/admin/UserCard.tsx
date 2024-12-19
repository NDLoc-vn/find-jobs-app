import { FC } from "react";
import Image from "next/image";

type userData = {
  name: string;
  email: string;
}

interface UserCardProps {
  key: number;
  handleEditUser: () => void;
  handleDeleteUser: () => void;
  userData: userData;
}

const UserCard: FC<UserCardProps> = ({ key, userData }) => {
  return (
    <div
      key={key}
      className={"border p-4 rounded-lg shadow-md cursor-pointer"}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/avatar_temp.jpg"
            width={55}
            height={55}
            alt="Avatar"
            className="rounded-full mr-4"
          />
          <div>
            <p className="font-bold">{userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Image
            src="/icon/edit-button.svg"
            width={20}
            height={20}
            alt="Edit"
            className="mr-2 cursor-pointer"
          />
          <Image
            src="/icon/delete-circle.svg"
            width={20}
            height={20}
            alt="Delete"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
