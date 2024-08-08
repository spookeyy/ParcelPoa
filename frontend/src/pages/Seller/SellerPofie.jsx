/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import ChangePassword from "../../components/Change-Password";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import { server } from "../../../config";

export default function SellerProfile({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userRole, setUserRole] = useState("");
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [userName, setUserName] = useState("");

  const { authToken } = useContext(UserContext);
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch(`${server}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((profile) => {
        setName(profile.name);
        setEmail(profile.email);
        setPhoneNumber(profile.phone_number);
        setUserRole(profile.user_role);
        setUserName(profile.name);
      })
      .catch((error) => {
        toast.error("An error occurred while fetching the profile");
        console.error("Error fetching profile:", error);
      });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    fetch(`${server}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ name, email, phone_number: phoneNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Profile updated successfully") {
          setMessage("Profile updated successfully");
          toast.success(data.message);
          setTimeout(() => onClose(), 2000); // Close modal after a delay
        } else {
          setMessage("Profile update failed");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while updating the profile");
        console.error("Error updating profile:", error);
        setMessage("An error occurred while updating the profile");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-yellow-900 bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-yellow-200 rounded-t">
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-500">Business Profile</h2>
          <button onClick={onClose} className="text-yellow-500 hover:text-yellow-700">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-yellow-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-yellow-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-yellow-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="userRole" className="block text-sm font-medium text-yellow-700">User Role</label>
              <input
                type="text"
                id="userRole"
                value={userRole}
                readOnly
                className="mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md shadow hover:bg-white hover:text-yellow-500 transition-all duration-300 ease-in-out"
            >
              Update Profile
            </button>
            {message && <div className="mt-4 text-green-500 text-center">{message}</div>}
          </form>
        </div>

        {/* Modal footer */}
        <div className="flex flex-col sm:flex-row justify-between p-4 border-t border-yellow-200">
          <button
            onClick={onClose}
            className="mb-2 sm:mb-0 sm:mr-2 px-4 py-2 text-yellow-600 border border-yellow-300 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="px-4 py-2 text-yellow-600 border border-yellow-300 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 ease-in-out"
          >
            Change Password
          </button>
        </div>

        {showChangePassword && <ChangePassword />}
      </div>
    </div>
  );
}
