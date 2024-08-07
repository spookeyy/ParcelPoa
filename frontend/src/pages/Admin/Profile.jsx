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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userRole"
              className="block text-sm font-medium text-gray-700"
            >
              User Role
            </label>
            <input
              type="text"
              id="userRole"
              value={userRole}
              readOnly
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
        {message && (
          <div className="mt-4 text-green-500 text-center">{message}</div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="w-full bg-yellow-500 text-white py-2 rounded-md shadow hover:bg-yellow-600"
          >
            Change Password
          </button>
        </div>
        {showChangePassword && <ChangePassword />}
      </div>
    </div>
  );
}
