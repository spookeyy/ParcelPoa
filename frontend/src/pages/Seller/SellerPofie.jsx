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
  const [profileImage, setProfileImage] = useState(null); // For profile picture

  const { authToken } = useContext(UserContext);
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch profile data including the profile picture
  const fetchProfile = () => {
    fetch(`${server}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((profile) => {
        setProfileImage(profile.profile_picture); // Set the profile picture
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

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the profile image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Update profile data including the profile picture
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    fetch(`${server}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name,
        email,
        phone_number: phoneNumber,
        profile_picture: profileImage, // Include profile picture in update
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Profile updated successfully") {
          setMessage("Profile updated successfully");
          toast.success(data.message);
          setTimeout(onClose, 2000); // Close modal after a delay
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
    <div className="fixed inset-0 flex items-center justify-center bg-yellow-700 bg-opacity-50 z-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto relative z-10">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-yellow-200 rounded-t">
          <h2 className="text-lg sm:text-xl font-semibold text-black">
            {userRole} Profile
          </h2>
          <button
            onClick={onClose}
            className="text-black hover:text-yellow-700"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="mt-[-10px] p-4 sm:p-6 sm:mt-[-10px]">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Profile picture */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <img
                  src={profileImage || "/path/to/default/profile.jpg"} // Default profile picture
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500 shadow-lg"
                />
                <label
                  htmlFor="profile-picture-upload"
                  className="absolute bottom-0 right-0 bg-yellow-500 text-white p-2 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors"
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

            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-bold text-yellow-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-black mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-yellow-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-black mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Phone number */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-yellow-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="text-black mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>

            {/* User role */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-yellow-700">
                User Role
              </label>
              <input
                type="text"
                value={userRole}
                readOnly
                className="text-black mt-1 block w-full border-yellow-300 rounded-lg shadow-sm bg-yellow-50"
              />
            </div>

            {/* Password change link */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                className="text-sm font-bold text-yellow-600 hover:text-yellow-700 focus:outline-none"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </button>
            </div>

            {/* Update button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Change Password modal */}
      {showChangePassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-auto relative">
            <ChangePassword onClose={() => setShowChangePassword(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
