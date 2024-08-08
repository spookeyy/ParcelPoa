import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { server } from "../../config";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
const ChangePassword = () => {
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

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setPasswordChanged(true);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing the password");
    }
  };

  return (
     <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden p-4 sm:p-6 md:p-8">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
         <h2 className="text-xl font-bold text-yellow-500 text-center sm:text-2xl">Change Password</h2>
      </div>
      <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
        <div>
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
            className="mt-1 block w-full px-3 py-2 border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
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
            className="mt-1 block w-full px-3 py-2 border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
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
            className="mt-1 block w-full px-3 py-2 border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-white hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Change Password
          </button>
        </div>
      </form>
      {passwordChanged && (
        <div className="flex items-center justify-center mt-6 text-green-600 transition duration-150 ease-in-out">
          <FaCheckCircle className="text-2xl mr-2" />
          <span>Password changed successfully!</span>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
