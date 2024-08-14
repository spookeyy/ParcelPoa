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
    <div className="fixed inset-0 flex items-center justify-center bg-yellow-900 bg-opacity-50 z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm mx-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between p-3 border-b border-yellow-200 rounded-t">
          <h2 className="text-base sm:text-lg font-semibold text-yellow-600">
            Change Password
          </h2>
          <button
            onClick={onClose}
            className="text-yellow-600 hover:text-yellow-800"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
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
        <div className="p-3 sm:p-4">
          <form onSubmit={handleChangePassword} className="space-y-3">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-xs sm:text-sm font-medium text-yellow-600"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-yellow-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm px-2 py-1.5"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-xs sm:text-sm font-medium text-yellow-600"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-yellow-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm px-2 py-1.5"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs sm:text-sm font-medium text-yellow-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-yellow-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm px-2 py-1.5"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs sm:text-sm bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs sm:text-sm bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition-colors"
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
