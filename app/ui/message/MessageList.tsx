import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-scroll p-4">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg.text}
          senderId={msg.senderId}
          currentUserId={currentUserId}
          avatar="/avatar_temp.jpg"
          timestamp={msg.timestamp}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
