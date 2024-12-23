"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { database } from "@/app/lib/firebaseConfig";
import MessageList from "@/app/ui/message/MessageList";
import MessageInput from "@/app/ui/message/MessageInput";
import Header from "@/app/ui/recruiter/Header";
import { useAuth } from "@/app/contexts/auth-context";
import { useParams } from "next/navigation";
import { useRecruiterDetail } from "@/app/hooks/useRecruiterDetail";
import { useRouter } from "next/router";
import { useCandidateDetail } from "@/app/hooks/useCandidateDetail";

interface Message {
  id: string;
  text: string;
  // sender: "user" | "recruiter";
  senderId: string;
  currentUserId: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
}

const generateChatId = (userId1: string, userId2: string) => {
  return [userId1, userId2].join("_");
};

const MessagesPage: React.FC = () => {
  const { user: currentUser, token } = useAuth();
  if (!currentUser || !token) {
    const router = useRouter();
    router.push("/");
    return;
  };
  const { id: receiverId } = useParams<{ id: string }>();

  // let receiverName: string = "username";
  // if (currentUser.role === "candidate") {
  //   const { data } = useRecruiterDetail(token, receiverId);
  //   data && (receiverName = data.name);
  // } else {
  //   const { data } = useCandidateDetail(token, receiverId);
  //   data && (receiverName = data.name);
  // }


  const [users] = useState<User[]>([
    {
      id: receiverId,
      name: receiverId,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!selectedUser) return;

    let chatId;
    if (currentUser.role === "recruiter") {
      chatId = generateChatId(currentUser.userId, selectedUser.id);
    } else {
      chatId = generateChatId(selectedUser.id, currentUser.userId);
    }
    const messagesRef = ref(database, `messages/${chatId}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(loadedMessages);
      }
    });
  }, [selectedUser]);

  const sendMessage = () => {
    if (!selectedUser || !message) return;

    let chatId;
    if (currentUser.role === "recruiter") {
      chatId = generateChatId(currentUser.userId, selectedUser.id);
    } else {
      chatId = generateChatId(selectedUser.id, currentUser.userId);
    }
    const messagesRef = ref(database, `messages/${chatId}`);
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      text: message,
      senderId: currentUser.userId,
      timestamp: Date.now(),
    });
    setMessage("");
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex h-[calc(100vh-5rem)]">
        <div className="w-1/4 border-r overflow-y-auto p-4 overflow-hidden">
          {users.map((user) => (
            <div
              key={user.id}
              // onClick={() => handleUserSelection(user)}
              className={`flex items-center mb-4 cursor-pointer p-2 rounded-lg ${selectedUser?.id === user.id
                ? "bg-gray-200"
                : "hover:bg-gray-100"
                }`}
            >
              <img
                src="/avatar_temp.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600 truncate">
                  Chỗ để last message
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-3/4 flex flex-col">
          <div className="p-4 border-b flex items-center">
            <img
              src="/avatar_temp.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <p className="font-semibold">{selectedUser?.name}</p>
          </div>
          <MessageList messages={messages} currentUserId={currentUser.userId} />
          <MessageInput
            message={message}
            onMessageChange={setMessage}
            onSendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;