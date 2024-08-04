import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Sample data for demonstration; replace with actual data source
const messages = [
  { id: '1', date: '2024-07-20', sender: 'John Doe', content: 'Hello, this is a test message.', status: 'Unread' },
  { id: '2', date: '2024-07-22', sender: 'Jane Smith', content: 'Important update regarding your account.', status: 'Read' },
  // Add more sample messages as needed
];

export default function Messages_Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const message = messages.find(msg => msg.id === id);

  if (!message) return <div className="p-6">Message not found</div>;

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    // Replace with logic to handle reply submission
    alert(`Reply sent: ${replyContent}`);
    setReplyContent(''); // Clear the reply content
    setIsReplying(false); // Close the reply form
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:text-blue-700 flex items-center transition duration-300 ease-in-out"
          aria-label="Back to messages list"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Back to Messages List</span>
        </button>
      </div>

      {/* Message Details */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 border-b pb-4">Message Details</h1>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-600">Message ID:</p>
            <p className="text-gray-800">{message.id}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-600">Date:</p>
            <p className="text-gray-800">{message.date}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-600">Sender:</p>
            <p className="text-gray-800">{message.sender}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-600">Content:</p>
            <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-600">Status:</p>
            <p className={`text-gray-800 font-semibold ${message.status === 'Read' ? 'text-green-600' : 'text-red-600'}`}>
              {message.status}
            </p>
          </div>
        </div>

        {/* Reply Button */}
        <div className="mt-8">
          <button
            onClick={handleReplyClick}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
            aria-label="Reply to this message"
          >
            Reply
          </button>
        </div>

        {/* Reply Form */}
        {isReplying && (
          <form onSubmit={handleReplySubmit} className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Reply to Message</h2>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows="6"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your reply here..."
              required
            ></textarea>
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                aria-label="Send reply"
              >
                Send Reply
              </button>
              <button
                type="button"
                onClick={() => setIsReplying(false)}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 transition duration-300 ease-in-out"
                aria-label="Cancel reply"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
