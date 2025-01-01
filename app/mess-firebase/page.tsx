"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { database } from "@/app/lib/firebaseConfig";
import MessageList from "@/app/ui/message/MessageList";
import MessageInput from "@/app/ui/message/MessageInput";
import Header from "@/app/ui/user/Header";
import { useAuth } from "@/app/contexts/auth-context";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import withAuth from "../lib/withAuth";
import { toast } from "react-toastify";

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTimestamp?: number;
}

interface Metadata {
  lastMessage: string;
  lastMessageTimestamp: number;
  recruiterName: string;
  candidateName: string;
}

// const generateChatId = (userId1: string, userId2: string) => {
//   return [userId1, userId2].join("_");
// };

const fetchUserName = async (userId: string): Promise<string> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/user/profile/${userId}`
    );
    return response.data.name;
  } catch (error) {
    console.error("Error fetching user name:", error);
    return userId;
  }
};

const MessagesPage: React.FC = () => {
  const { user: currentUser, token } = useAuth();
  const router = useRouter();
  const { id: receiverId } = useParams<{ id: string }>();

  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const selectedUser = null;
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!currentUser) return;
    const userMessagesRef = ref(database, `messages`);
    onValue(userMessagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userThreads = Object.keys(data).filter((key) =>
          key.includes(currentUser.userId)
        );
        const userListPromises = userThreads.map(async (thread) => {
          const [userId1, userId2] = thread.split("_");
          const otherUserId =
            userId1 === currentUser.userId ? userId2 : userId1;
          const metadataRef = ref(database, `messages/${thread}/metadata`);
          const metadataSnapshot = await new Promise<Metadata>((resolve) => {
            onValue(
              metadataRef,
              (snapshot) => {
                resolve(snapshot.val());
              },
              { onlyOnce: true }
            );
          });
          let otherUsername: string;
          if (currentUser.role === "recruiter") {
            otherUsername =
              metadataSnapshot?.candidateName ||
              (await fetchUserName(otherUserId));
          } else {
            otherUsername = metadataSnapshot?.recruiterName;
          }
          if (otherUserId === receiverId) {
            // setSelectedUser({ id: otherUserId, name: otherUsername });
          }
          return {
            id: otherUserId,
            name: otherUsername,
            lastMessage: metadataSnapshot?.lastMessage || "",
            lastMessageTimestamp: metadataSnapshot?.lastMessageTimestamp || 0,
          };
        });
        Promise.all(userListPromises).then(setUsers);
      }
    });
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    if (!selectedUser) return;
    const chatId = "none";
    const messagesRef = ref(database, `messages/${chatId}/messages`);
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

  const sendMessage = async () => {
    if (!currentUser || !message) return;
    // if (!selectedUser || !message) {
    // if (!message) {
    const chatId =
      currentUser.role === "recruiter"
        ? `${currentUser.userId}_${receiverId}`
        : `${receiverId}_${currentUser.userId}`;
    // }
    // else {
    //   chatId = (currentUser.role === "recruiter") ? `${currentUser.userId}_${selectedUser.id}` : `${selectedUser.id}_${currentUser.userId}`;
    // }

    if (message.trim() === "") return;

    const messagesRef = ref(database, `messages/${chatId}/messages`);
    const metadataRef = ref(database, `messages/${chatId}/metadata`);

    const metadataSnapshot = await new Promise<Metadata | null>((resolve) => {
      onValue(
        metadataRef,
        (snapshot) => {
          resolve(snapshot.val());
        },
        { onlyOnce: true }
      );
    });

    let candidateName =
      currentUser.role === "candidate" ? currentUser.name : "recruiter";
    let recruiterName =
      currentUser.role === "recruiter" ? currentUser.name : "candidate";

    if (!metadataSnapshot) {
      if (currentUser.role === "recruiter") {
        const candidateResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/user/profile/${receiverId}`
        );
        candidateName = candidateResponse.data.name;
      }
    } else {
      candidateName = metadataSnapshot.candidateName;
      recruiterName = metadataSnapshot.recruiterName;
    }

    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      text: message,
      senderId: currentUser.userId,
      timestamp: Date.now(),
    });

    setMessage("");

    set(metadataRef, {
      recruiterName,
      candidateName,
      lastMessage: message,
      lastMessageTimestamp: Date.now(),
    });
  };

  const handleUserSelection = (user: User) => {
    router.push(`/mess-firebase/${user.id}`);
  };

  if (!currentUser || !token) {
    router.push("/");
    return;
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex h-[calc(100vh-5rem)]">
        <div className="w-1/4 border-r overflow-y-auto p-4 overflow-hidden">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                handleUserSelection(user);
              }}
              className={`flex items-center mb-4 cursor-pointer p-2 rounded-lg`}
            >
              <img
                src="/avatar_temp.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.lastMessage}</p>
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
          </div>
          <MessageList messages={messages} currentUserId={currentUser.userId} />
          <MessageInput
            message={message}
            onMessageChange={setMessage}
            onSendMessage={() => {
              toast.error("Chọn nhà tuyển dụng mà bạn muốn nhắn tin");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(MessagesPage, ["candidate"]);
