/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../Context/NotificationContext";
import { UserContext } from "../../Context/UserContext";

// Sample data
const initialMessages = [
  {
    id: "1",
    date: "2024-07-20",
    sender: "John Doe",
    content: "Hello, this is a test message.",
    status: "Unread",
  },
  {
    id: "2",
    date: "2024-07-22",
    sender: "Jane Smith",
    content: "Important update regarding your account.",
    status: "Read",
  },
  // Add more sample messages as needed
];

// Filter Component
const FilterBar = ({ onFilterChange, onReset }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
    <button
      onClick={() => alert("Filter Icon Clicked")}
      className="text-gray-700 hover:text-gray-900"
      aria-label="Open filter options"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 10l5 5 5-5H7z"
        ></path>
      </svg>
    </button>
    <select
      onChange={(e) => onFilterChange("date", e.target.value)}
      className="border rounded p-2 text-sm sm:text-base"
      aria-label="Filter by date"
    >
      <option value="">Select Date</option>
      <option value="2024-07-20">2024-07-20</option>
      <option value="2024-07-22">2024-07-22</option>
      {/* Add more options */}
    </select>
    <select
      onChange={(e) => onFilterChange("sender", e.target.value)}
      className="border rounded p-2 text-sm sm:text-base"
      aria-label="Filter by sender"
    >
      <option value="">Select Sender</option>
      <option value="John Doe">John Doe</option>
      <option value="Jane Smith">Jane Smith</option>
      {/* Add more options */}
    </select>
    <select
      onChange={(e) => onFilterChange("status", e.target.value)}
      className="border rounded p-2 text-sm sm:text-base"
      aria-label="Filter by status"
    >
      <option value="">Select Status</option>
      <option value="Unread">Unread</option>
      <option value="Read">Read</option>
    </select>
    <button
      onClick={onReset}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-sm sm:text-base"
      aria-label="Reset filters"
    >
      Reset Filter
    </button>
  </div>
);

// Main Messages List Component
export default function Messages_List() {
  const [messages, setMessages] = useState(initialMessages);
  const [filters, setFilters] = useState({ date: "", sender: "", status: "" });
  const navigate = useNavigate();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ date: "", sender: "", status: "" });
  };

  const { notifications, fetchNotifications, markAsRead, deleteNotification } =
    useNotification();
  const { authToken } = useContext(UserContext);

  useEffect(() => {
    if (authToken) {
      fetchNotifications();
    }
  }, [authToken, fetchNotifications]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteNotification(id);
    }
  };

  const handleViewDetails = (id) => {
    markAsRead(id);
    navigate(`/message/${id}`);
  };


  // Apply filters
  const filteredMessages = messages.filter((message) => {
    return (
      (!filters.date || message.date === filters.date) &&
      (!filters.sender || message.sender === filters.sender) &&
      (!filters.status || message.status === filters.status)
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
        Messages List
      </h1>

      <FilterBar onFilterChange={handleFilterChange} onReset={resetFilters} />

      {/* Responsive table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs sm:text-sm lg:text-base">
            <tr>
              <th className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 text-left font-medium border-b border-gray-300">
                Message ID
              </th>
              <th className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 text-left font-medium border-b border-gray-300">
                Date
              </th>
              <th className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 text-left font-medium border-b border-gray-300">
                Sender
              </th>
              <th className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 text-left font-medium border-b border-gray-300">
                Content
              </th>
              <th className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 text-left font-medium border-b border-gray-300">
                Status
              </th>
              <th className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 text-left font-medium border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs sm:text-sm lg:text-base">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3">
                    {message.id}
                  </td>
                  <td className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3">
                    {message.date}
                  </td>
                  <td className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3">
                    {message.sender}
                  </td>
                  <td className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3">
                    {message.content}
                  </td>
                  <td className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3">
                    {message.status}
                  </td>
                  <td className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetails(message.id)}
                      className="text-blue-400 hover:text-blue-600 text-xs sm:text-sm lg:text-base"
                      aria-label={`View Details of Message ID: ${message.id}`}
                    >
                      <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="text-red-400 hover:text-red-600 text-xs sm:text-sm lg:text-base"
                      aria-label={`Delete Message ID: ${message.id}`}
                    >
                      <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 text-center text-gray-500"
                >
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
