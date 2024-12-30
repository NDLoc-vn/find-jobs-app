import React from 'react';

interface MessageItemProps {
  message: string;
  senderId: string;
  currentUserId: string;
  avatar: string;
  timestamp: number;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, senderId, currentUserId, avatar, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString();

  return (
    <div className={`flex ${senderId === currentUserId ? 'justify-end' : 'justify-start'} mb-4`}>
      {senderId !== currentUserId && <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full mr-2" />}
      <div className="relative group">
        <div className={`max-w-xs p-2 rounded-lg text-white ${senderId === currentUserId ? 'bg-blue-500' : 'bg-gray-500 text-black'}`}>
          {message}
        </div>
        <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
          {formattedTime}
        </div>
      </div>
      {senderId === currentUserId && <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full ml-2" />}
    </div>
  );
};

export default MessageItem;