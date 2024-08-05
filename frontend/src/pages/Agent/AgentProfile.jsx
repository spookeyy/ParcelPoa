import React, { useState, useEffect } from "react";
import ChangePassword from "../../components/Change-Password";

export default function AgentProfile({ onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agentOption, setAgentOption] = useState("");
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((profile) => {
        setEmail(profile.email);
        setName(profile.name);
        setPhoneNumber(profile.phoneNumber);
        setAgentOption(profile.agentOption);
        setProfilePicture(profile.profilePicture); 
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    fetch("/api/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, phoneNumber, agentOption }),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Profile updated successfully");
          setTimeout(() => onClose(), 2000); // Close modal after a delay
        } else {
          console.error("Profile update failed");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 min-h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-center">Agent Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img
              src={profilePicture || "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <label htmlFor="profile-picture-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9 9m0-18L12 14M4 6l-1 1m1 1l-1 1m16 0l1 1m-1-1l1-1M3 13l1 1m1-1l1-1m12 0l1 1m1-1l1 1M6 21h12a1 1 0 001-1v-2H5v2a1 1 0 001 1z" />
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
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Update Profile
          </button>
        </form>
        {message && <div className="mt-4 text-green-500 text-center">{message}</div>}

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="w-full bg-yellow-500 text-white py-2 rounded-md shadow-lg hover:bg-yellow-600 transition duration-300"
          >
            Change Password
          </button>
        </div>
        {showChangePassword && <ChangePassword />}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 rounded-md shadow-lg hover:bg-gray-600 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
