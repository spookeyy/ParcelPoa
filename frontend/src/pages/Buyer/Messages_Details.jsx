import React from 'react';

export default function Messages_Details({ message }) {
  if (!message) {
    return <div className="p-4 text-red-500">No message details available.</div>;
  }

  return (
    <div className="message-details p-6 bg-white shadow-md rounded max-w-md mx-auto mt-10">
      <h3 className="text-xl font-bold mb-4">Message Details</h3>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">From: {message.sender}</h3>
        <p className="text-gray-600 text-sm">{new Date(message.timestamp).toLocaleString()}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-medium">Message:</h4>
        <p className="text-gray-800">{message.content}</p>
      </div>
      <div className="flex justify-between mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
          Reply
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200">
          Delete
        </button>
      </div>
    </div>
  );
}
