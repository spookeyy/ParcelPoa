import React, { useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import AgentProfile from "../AgentProfile";

export default function AgentHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [status, setStatus] = useState("available"); // State for status

  const navigate = useNavigate();

  // Assume you have access to the user's name
  const userName = "Simon"; // Replace with dynamic data

  // Extract the first initial
  const userInitial = userName.charAt(0).toUpperCase();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsDropdownOpen(false); // Close dropdown
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsDropdownOpen(false); // Close dropdown after changing status
    console.log({ status: newStatus }); // Log the new status
  };

  return (
    <header className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6 border border-gray-200 relative">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
        Agent Dashboard
      </h1>
      <div className="absolute right-4 top-4 md:right-6 md:top-6 flex items-center">
        {/* Display the user's initial instead of the icon */}
        <div
          className="bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-semibold cursor-pointer hover:bg-white hover:text-blue-500 transition-colors duration-300"
          onClick={toggleDropdown}
        >
          {userInitial}
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-2 border border-gray-200 z-10 transition-transform transform duration-300 ease-in-out translate-y-1">
            <div className="flex flex-col">
              <div
                className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-300 ${
                  status === "available"
                    ? "bg-green-100 text-green-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleStatusChange("available")}
              >
                <FaCheckCircle
                  className={`mr-3 ${
                    status === "available" ? "text-green-500" : "text-gray-500"
                  }`}
                />
                Available
              </div>
              <div
                className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-300 ${
                  status === "not-available"
                    ? "bg-red-100 text-red-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleStatusChange("not-available")}
              >
                <FaTimesCircle
                  className={`mr-3 ${
                    status === "not-available"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />
                Not Available
              </div>
            </div>

            <div className="border-t border-gray-200 mt-2">
              <div
                onClick={openProfileModal}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300"
              >
                <FaUser className="mr-3 text-blue-500" />
                Profile
              </div>
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaSignOutAlt className="mr-3 text-red-500" />
                Log Out
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal}>
        <AgentProfile onClose={closeProfileModal} />
      </Modal>
    </header>
  );
}
