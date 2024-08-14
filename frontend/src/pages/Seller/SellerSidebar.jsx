import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import Modal from "../Agent/Modal";
import SellerProfile from "./SellerPofie";
import { UserContext } from "../../Context/UserContext";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

function SellerSidebar() {
  // const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const { currentUser, logout } = useContext(UserContext);

  useEffect(() => {
    currentUser && setUserName(currentUser.name);
  }, [currentUser]);

  const userInitial = currentUser ? currentUser.name.charAt(0).toUpperCase() : "B";

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

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="inline-block">
      <div className="relative">
        <div
          className="bg-red-800 text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm sm:text-lg md:text-xl font-semibold cursor-pointer hover:bg-yellow-800 hover:text-blue-500 transition-colors duration-300"
          onClick={toggleDropdown}
        >
          {userInitial}
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-white rounded-md shadow-lg py-2 border border-gray-200 z-10 transition-transform transform duration-300 ease-in-out translate-y-1">
            <div
              onClick={openProfileModal}
              className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300"
            >
              <FaUser className="mr-2 sm:mr-3 text-blue-500" />
              Profile
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300"
            >
              <FaSignOutAlt className="mr-2 sm:mr-3 text-red-500" />
              Log Out
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal}>
        <SellerProfile onClose={closeProfileModal} />
      </Modal>
    </div>
  );

}

export default SellerSidebar;
