/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../../../config";
import {
  FaUser,
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHome,
} from "react-icons/fa";
import Modal from "../Modal";
import AgentProfile from "../AgentProfile";
import Sidebar from "./Sidebar";
import { UserContext } from "../../../Context/UserContext";

export default function AgentHeader() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [status, setStatus] = useState("Available");
  const [userName, setUserName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useContext(UserContext);

  useEffect(() => {
    fetch(`${server}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((profile) => {
        console.log("Profile:", profile);
        setUserName(profile.name);
        setStatus(profile.status || "Available");
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const userInitial = userName
    ? userName
        .split(" ")
        .map((name) => name[0])
        .join("")
    : "";
  // console.log("userInitial:", userInitial);

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
    logout();
  };

  return (
    <header className="bg-yellow-500 fixed top-0 left-0 right-0 p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6 border border-gray-200 z-50">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
        Agent Dashboard
      </h1>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <button
        onClick={() => {
          navigate("/");
          setSidebarOpen(false); // Close sidebar when navigating
        }}
        className="flex items-center text-gray-800 hover:bg-gray-100 p-3 rounded transition duration-200 text-sm sm:text-base absolute top-4 left-4"
      >
        <FaHome className="mr-2 text-lg sm:text-xl" />
        <span className="font-semibold sm:font bolder hidden sm:inline">Home</span>
      </button>

      <div className="absolute right-4 top-4 md:right-6 md:top-6 flex items-center">
        <div className="relative ml-16">
          <div
            className="bg-yellow-500 border border-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-semibold cursor-pointer hover:bg-gray-100 transition-colors duration-300"
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
                    status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleStatusChange("Available")}
                >
                  <FaCheckCircle
                    className={`mr-3 ${
                      status === "Available"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  />
                  Available
                </div>
                <div
                  className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-300 ${
                    status === "Unavailable"
                      ? "bg-red-100 text-red-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleStatusChange("Unavailable")}
                >
                  <FaTimesCircle
                    className={`mr-3 ${
                      status === "Unavailable"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  />
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
                  currentUser={currentUser}
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
