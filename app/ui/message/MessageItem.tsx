import React from 'react';

interface MessageItemProps {
  message: string;
  sender: 'user' | 'recruiter';
  avatar: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, sender, avatar }) => {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {sender === 'recruiter' && <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full mr-2" />}
      <div className={`max-w-xs p-2 rounded-lg text-white ${sender === 'user' ? 'bg-blue-500' : 'bg-gray-500 text-black'}`}>
        {message}
      </div>
      {sender === 'user' && <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full ml-2" />}
    </div>
  );
};

export default MessageItem;