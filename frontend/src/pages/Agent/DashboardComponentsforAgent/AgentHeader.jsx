import React, { useState, useEffect } from "react";
import { server } from "../../../../config";
import {
  FaUser,
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import AgentProfile from "../AgentProfile";
import Sidebar from "./Sidebar";

export default function AgentHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [status, setStatus] = useState("Available");
  const [userName, setUserName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${server}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((profile) => {
        setUserName(profile.name);
        setStatus(profile.status || "Available");
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

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
    fetch(`${server}/update-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.status);
        setIsDropdownOpen(false);
        console.log("Status updated:", data.message);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <header className="bg-white fixed top-0 left-0 right-0 p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6 border border-gray-200 z-50">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
        Agent Dashboard
      </h1>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-blue-500 text-white p-2 rounded-lg shadow-md absolute top-4 left-4 z-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
        </button>
      <div className="absolute right-4 top-4 md:right-6 md:top-6 flex items-center">
        <div className="relative ml-16">
          <div
            className="bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-semibold cursor-pointer hover:bg-blue-600 hover:text-blue-500 transition-colors duration-300"
            onClick={toggleDropdown}
          >
            {userInitial}
          </div>
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white ${
              status === "Available" ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-2 border border-gray-200 z-10 transition-transform transform duration-300 ease-in-out translate-y-1">
              <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b border-gray-200">
                Status: {status}
              </div>
              <div className="flex flex-col">
                <div
                  className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-300 ${
                    status === "Available" ? "bg-green-100 text-green-700" : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleStatusChange("Available")}
                >
                  <FaCheckCircle className={`mr-3 ${status === "Available" ? "text-green-500" : "text-gray-500"}`} />
                  Available
                </div>
                <div
                  className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-300 ${
                    status === "Unavailable" ? "bg-red-100 text-red-700" : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleStatusChange("Unavailable")}
                >
                  <FaTimesCircle className={`mr-3 ${status === "Unavailable" ? "text-red-500" : "text-gray-500"}`} />
                  Unavailable
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
                <div
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300"
                >
                  <FaSignOutAlt className="mr-3 text-red-500" />
                  Log Out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal}>
        <AgentProfile onClose={closeProfileModal} />
      </Modal>
    </header>
  );
}
