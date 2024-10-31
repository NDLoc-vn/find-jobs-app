"use client";

import React, { useState } from "react";
import MessageList from "@/app/ui/message/MessageList";
import MessageInput from "@/app/ui/message/MessageInput";
import Header from "@/app/ui/recruiter/Header";

interface Message {
  id: number;
  message: string;
  sender: "user" | "recruiter";
  avatar: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
}

const MessagesPage: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Huy Hoàng",
      avatar: "/avatar_temp.jpg",
      lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 2,
      name: "Văn B",
      avatar: "/avatar_temp.jpg",
      lastMessage: "Fusce vel massa ac felis porta auctor gravida ut lacus",
    },
    {
      id: 3,
      name: "Cẩm Tú",
      avatar: "/avatar_temp.jpg",
      lastMessage: "Ut id urna euismod, faucibus quam ac, eleifend arcu",
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      message:
        "Fusce non bibendum magna, sed lacinia metus. Mauris rutrum ex et euismod congue. Integer congue laoreet bibendum. Nulla sit amet efficitur lorem, eu molestie sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut ac justo iaculis, laoreet lectus a, fringilla orci. Nulla sapien neque, rhoncus nec lorem vel, fringilla vestibulum ligula.",
      sender: "recruiter",
      avatar: "/avatar_temp.jpg",
    },
    {
      id: 2,
      message: "Lorem Ipsum",
      sender: "user",
      avatar: "/avatar_temp.jpg",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);

  const handleSendMessage = (newMessage: string) => {
    const newMessageItem: Message = {
      id: messages.length + 1,
      message: newMessage,
      sender: "user",
      avatar: selectedUser ? selectedUser.avatar : "/avatar_temp.jpg",
    };
    setMessages([...messages, newMessageItem]);
  };

  const handleUserSelection = (user: User) => {
    setSelectedUser(user);
    // api
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex h-[calc(100vh-5rem)]">
        <div className="w-1/4 border-r overflow-y-auto p-4 overflow-hidden">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelection(user)}
              className={`flex items-center mb-4 cursor-pointer p-2 rounded-lg ${
                selectedUser?.id === user.id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600 truncate">
                  {user.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-3/4 flex flex-col">
          <div className="p-4 border-b flex items-center">
            <img
              src={selectedUser?.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <p className="font-semibold">{selectedUser?.name}</p>
          </div>
          <MessageList messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
