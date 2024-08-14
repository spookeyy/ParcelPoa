import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, newPassword);
      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred while resetting your password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400">
        <div className="flex flex-col p-8 bg-gradient-to-bl from-yellow-200 to-yellow-400 bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg max-w-md w-full m-4">
          <h1 className="text-3xl italic font-semibold text-gray-800 mb-4 text-center">
            Reset Password
          </h1>
          <p className="text-gray-700 mb-4 text-center">
            Please enter your new password.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gradient-to-br from-yellow-200 to-yellow-400 bg-opacity-150 backdrop-blur-md shadow-lg rounded-lg p-6"
          >
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-gray-100 p-2 border focus:outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-100 p-2 border focus:outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white p-3 rounded-md hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
