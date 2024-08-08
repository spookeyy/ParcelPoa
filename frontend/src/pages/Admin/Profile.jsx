import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Agent/Modal';
import SellerProfile from '../Seller/SellerPofie';
import { UserContext } from '../../Context/UserContext';
import {
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { currentUser, logout } = useContext(UserContext);
  useEffect(() => {
    const storedUserName = localStorage.getItem("name");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'S';

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
          className="bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-semibold cursor-pointer hover:bg-blue-600 hover:text-blue-500 transition-colors duration-300"
          onClick={toggleDropdown}
        >
          {userInitial}
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-2 border border-gray-200 z-10 transition-transform transform duration-300 ease-in-out translate-y-1">
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
          )}
      </div>
      <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal}>
        <SellerProfile onClose={closeProfileModal} />
      </Modal>
    </div>
  );
}

export default Profile;

