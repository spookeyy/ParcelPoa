import React, { useState, useEffect } from "react";
import ChangePassword from "../../components/Change-Password";

export default function AgentProfile({ onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agentOption, setAgentOption] = useState("");
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState("https://img.freepik.com/free-photo/young-black-woman-straw-hat-looking-away_23-2148183285.jpg?t=st=1722852363~exp=1722855963~hmac=9bf43b902f33f6a6b76a8d1e0cbb23fca6ff23ed323fcd8b76ae6c5ef8b97eab&w=740");

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((profile) => {
        setEmail(profile.email);
        setName(profile.name);
        setPhoneNumber(profile.phoneNumber);
        setAgentOption(profile.agentOption);
        setProfilePicture(profile.profilePicture || profilePicture);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    fetch("/api/profile", {
      method: "PUT",
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
      const formData = new FormData();
      formData.append("profilePicture", file);

      fetch("/api/profile/picture", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // Update the profilePicture state with the new URL
            setProfilePicture(URL.createObjectURL(file));
          } else {
            console.error("Profile picture upload failed");
          }
        })
        .catch((error) => {
          console.error("Error uploading profile picture:", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 min-h-[70vh]">
      <div className="w-full bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Agent Profile
        </h2>
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-2">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
            />
            <label
              htmlFor="profile-picture-upload"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
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
                  d="M12 14l9 9m0-18L12 14M4 6l-1 1m1 1l-1 1m16 0l1 1m-1-1l1-1M3 13l1 1m1-1l1-1m12 0l1 1m1-1l1 1M6 21h12a1 1 0 001-1v-2H5v2a1 1 0 001 1z"
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
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
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
          <div className="mb-2">
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-2">
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Update Profile
          </button>
        </form>
        {message && (
          <div className="mt-3 text-green-500 text-center text-sm">
            {message}
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="w-full bg-yellow-500 text-white py-2 rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-300"
          >
            Change Password
          </button>
        </div>
        {showChangePassword && <ChangePassword />}
        
      </div>
    </div>
  );
}