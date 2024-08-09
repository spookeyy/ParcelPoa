/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { server } from "../../config";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

const ChangePassword = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { authToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords don't match");
      return;
    }

    try {
      const response = await fetch(`${server}/change_password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        setPasswordChanged(true);
        toast.success("Password changed successfully");
        setTimeout(onClose, 2000); // Close modal after success message
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred while changing the password");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
      <h2 className="text-lg font-semibold text-yellow-600 mb-4">
        Change Password
      </h2>
      {passwordChanged ? (
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-4xl mb-2" />
          <p className="text-green-500">Password changed successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-yellow-700"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
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
              className="mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-yellow-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className="mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 px-3 py-2 transition-all duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-md shadow hover:bg-white hover:text-yellow-500 transition-all duration-300 ease-in-out"
          >
            Change Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
