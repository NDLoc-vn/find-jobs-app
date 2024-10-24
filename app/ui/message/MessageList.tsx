import React from 'react';
import MessageItem from './MessageItem';

interface Message {
  id: number;
  message: string;
  sender: 'user' | 'recruiter';
  avatar: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-scroll p-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg.message} sender={msg.sender} avatar={msg.avatar} />
      ))}
    </div>
  );
};

export default MessageList;
