import React, { useState, useEffect } from "react";

export default function AgentProfile({ onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agentOption, setAgentOption] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((profile) => {
        setEmail(profile.email);
        setName(profile.name);
        setPhoneNumber(profile.phoneNumber);
        setAgentOption(profile.agentOption);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Agent Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="mb-4">
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
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 rounded-md shadow hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
