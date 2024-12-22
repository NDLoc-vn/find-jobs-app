import React from 'react';

interface MessageItemProps {
  message: string;
  // sender: 'user' | 'recruiter';
  senderId: string;
  currentUserId: string;
  avatar: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, senderId, currentUserId, avatar }) => {
  console.log(senderId, currentUserId)
  return (
    <div className={`flex ${senderId === currentUserId ? 'justify-end' : 'justify-start'} mb-4`}>
      {senderId !== currentUserId && <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full mr-2" />}
      <div className={`max-w-xs p-2 rounded-lg text-white ${senderId === currentUserId ? 'bg-blue-500' : 'bg-gray-500 text-black'}`}>
        {message}
      </div>
      {senderId === currentUserId && <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full ml-2" />}
    </div>
  );
};

export default MessageItem;