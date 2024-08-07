/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { server } from "../../../config";

export default function AgentProfile({ onClose }) {
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    userRole: "",
    profilePicture:
      "https://img.freepik.com/free-photo/young-black-woman-straw-hat-looking-away_23-2148183285.jpg?t=st=1722852363~exp=1722855963~hmac=9bf43b902f33f6a6b76a8d1e0cbb23fca6ff23ed323fcd8b76ae6c5ef8b97eab&w=740",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${server}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      setProfile({
        email: data.email,
        name: data.name,
        phoneNumber: data.phone_number,
        userRole: data.user_role,
        profilePicture: data.profile_picture || profile.profilePicture,
      });
    } catch (error) {
      toast.error("An error occurred while fetching the profile");
      console.error("Error fetching profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${server}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          email: profile.email,
          name: profile.name,
          phone_number: profile.phoneNumber,
          profile_picture: profile.profilePicture,
        }),
      });
      if (!response.ok) throw new Error("Profile update failed");
      const data = await response.json();
      setMessage(data.message);
      toast.success("Profile updated successfully");
      setTimeout(onClose, 2000);
    } catch (error) {
      toast.error("An error occurred while updating the profile");
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {profile.userRole} Profile
        </h2>
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <label
              htmlFor="profile-picture-upload"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
            <input
              type="file"
              id="profile-picture-upload"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          {["name", "email", "phoneNumber"].map((field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                name={field}
                value={profile[field]}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Role
            </label>
            <input
              type="text"
              value={profile.userRole}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Update Profile
          </button>
        </form>
        {message && (
          <div className="mt-4 text-green-500 text-center text-sm">
            {message}
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}
