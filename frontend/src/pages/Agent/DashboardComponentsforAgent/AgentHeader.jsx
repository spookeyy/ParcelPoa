import React, { useState } from "react";
import { FaUserCircle, FaUser, FaSignOutAlt, FaEdit } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 
import Modal from "../Modal";
import AgentProfile from "../AgentProfile";

export default function AgentHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  return (
    <header className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 relative">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Agent Dashboard
      </h1>
      <div className="absolute right-6 top-6 flex items-center">
        <FaUserCircle
          size={32}
          className="text-gray-600 cursor-pointer"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-10">
            <Link
              to="/update-status"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              <FaEdit className="mr-3 text-blue-500" />
              Update Status
            </Link>
            <button
              onClick={openProfileModal}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
            >
              <FaUser className="mr-3 text-blue-500" />
              Profile
            </button>
            <Link
              to="/agent-login"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              <FaSignOutAlt className="mr-3 text-red-500" />
              Log Out
            </Link>
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
