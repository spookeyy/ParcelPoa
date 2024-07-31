import React from 'react';

export default function Messages_List({ messages, onMessageClick }) {
  if (!messages || messages.length === 0) {
    return <div className="p-4 text-red-500">No messages available.</div>;
  }

  return (
    <div className="messages-list p-6 bg-white shadow-md rounded max-w-md mx-auto mt-10">
      <h3 className="text-xl font-bold mb-4">Messages</h3>
      {messages.map((message, index) => (
        <div
          key={index}
          className="message-summary p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
          onClick={() => onMessageClick(message)}
        >
          <h4 className="text-lg font-semibold">{message.sender}</h4>
          <p className="text-gray-600 text-sm">{new Date(message.timestamp).toLocaleString()}</p>
          <p className="text-gray-800 mt-2">{message.content.slice(0, 50)}...</p>
        </div>
      ))}
    </div>
  );
}
