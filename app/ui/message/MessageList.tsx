import React from 'react';
import MessageItem from './MessageItem';

// interface Message {
//   id: string;
//   message: string;
//   sender: 'user' | 'recruiter';
//   avatar: string;
// }

interface Message {
  id: string;
  text: string;
  // sender: 'user' | 'recruiter';
  senderId: string;
  // currentUserId: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  return (
    <div className="flex-1 overflow-y-scroll p-4">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg.text}
          senderId={msg.senderId}
          currentUserId={currentUserId}
          // avatar={msg.avatar}
          avatar="/avatar_temp.jpg"
        />
      ))}
    </div>
  );
};

export default MessageList;
