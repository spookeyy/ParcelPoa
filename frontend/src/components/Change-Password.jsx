/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import { server } from "../../config.json";

export default function ChangePassword({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { authToken } = useContext(UserContext);

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    fetch(`${server}/change_password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        old_password: currentPassword,
        new_password: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Password changed successfully") {
          toast.success(data.message);
          onClose(); // Close modal on successful password change
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error("An error occurred while changing the password");
        console.error("Error changing password:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-yellow-900 bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-yellow-200 rounded-t">
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-500">
            Change Password
          </h2>
          <button
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-700"
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
        <div className="p-4 sm:p-6">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-yellow-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="mt-1 border border-yellow-700 block w-full border-yellow-700 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-yellow-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 border border-yellow-700 block w-full border-yellow-700 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-yellow-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 border border-yellow-700 block w-full border-yellow-700 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
