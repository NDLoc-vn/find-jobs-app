import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center border-t p-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border rounded-lg focus:outline-none"
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-lg ml-2">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
