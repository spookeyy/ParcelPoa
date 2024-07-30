import React, { useState } from 'react';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

// Sample data
const initialMessages = [
  { id: '1', date: '2024-07-20', sender: 'John Doe', content: 'Hello, this is a test message.', status: 'Unread' },
  { id: '2', date: '2024-07-22', sender: 'Jane Smith', content: 'Important update regarding your account.', status: 'Read' },
  // Add more sample messages as needed
];

// Filter Component
const FilterBar = ({ onFilterChange, onReset }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
    <button
      onClick={() => alert('Filter Icon Clicked')}
      className="text-gray-700 hover:text-gray-900"
      aria-label="Open filter options"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5H7z"></path>
      </svg>
    </button>
    <select
      onChange={(e) => onFilterChange('date', e.target.value)}
      className="border rounded p-2"
      aria-label="Filter by date"
    >
      <option value="">Select Date</option>
      <option value="2024-07-20">2024-07-20</option>
      <option value="2024-07-22">2024-07-22</option>
      {/* Add more options */}
    </select>
    <select
      onChange={(e) => onFilterChange('sender', e.target.value)}
      className="border rounded p-2"
      aria-label="Filter by sender"
    >
      <option value="">Select Sender</option>
      <option value="John Doe">John Doe</option>
      <option value="Jane Smith">Jane Smith</option>
      {/* Add more options */}
    </select>
    <select
      onChange={(e) => onFilterChange('status', e.target.value)}
      className="border rounded p-2"
      aria-label="Filter by status"
    >
      <option value="">Select Status</option>
      <option value="Unread">Unread</option>
      <option value="Read">Read</option>
    </select>
    <button
      onClick={onReset}
      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
      aria-label="Reset filters"
    >
      Reset Filter
    </button>
  </div>
);

// Main Messages List Component
export default function Messages_List() {
  const [messages, setMessages] = useState(initialMessages);
  const [filters, setFilters] = useState({ date: '', sender: '', status: '' });
  const navigate = useNavigate();

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ date: '', sender: '', status: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(prevMessages => 
        prevMessages.filter(message => message.id !== id)
      );
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/message/${id}`);
  };

  // Apply filters
  const filteredMessages = messages.filter(message => {
    return (
      (!filters.date || message.date === filters.date) &&
      (!filters.sender || message.sender === filters.sender) &&
      (!filters.status || message.status === filters.status)
    );
  });

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4">Messages List</h1>

      <FilterBar onFilterChange={handleFilterChange} onReset={resetFilters} />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Message ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sender</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredMessages.map(message => (
              <tr key={message.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{message.id}</td>
                <td className="px-6 py-4 text-sm">{message.date}</td>
                <td className="px-6 py-4 text-sm">{message.sender}</td>
                <td className="px-6 py-4 text-sm">{message.content}</td>
                <td className="px-6 py-4 text-sm">{message.status}</td>
                <td className="px-6 py-4 text-sm flex items-center gap-2">
                  <button
                    onClick={() => handleViewDetails(message.id)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label={`View Details of Message ID: ${message.id}`}
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Delete Message ID: ${message.id}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
