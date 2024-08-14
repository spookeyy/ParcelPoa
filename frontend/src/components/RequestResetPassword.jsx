import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

export default function RequestResetPassword() {
  const [email, setEmail] = useState("");
  const { requestPasswordReset } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the current frontend URL
      const frontendUrl = window.location.origin;
      await requestPasswordReset(email, frontendUrl);
      toast.success(
        "If a user with this email exists, a password reset link has been sent."
      );
    } catch (error) {
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="flex flex-col p-8 bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg max-w-md w-full m-4">
          <h1 className="text-3xl italic font-semibold text-gray-800 mb-4 text-center">
            Request Password Reset
          </h1>
          <p className="text-gray-700 mb-4 text-center">
            Enter your email address to receive a password reset link.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gradient-to-br from-yellow-100 to-yellow-400 bg-opacity-150 backdrop-blur-md shadow-lg rounded-lg p-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 p-2 border focus:outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                placeholder="name@example.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-md hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200"
            >
              Request Password Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// bg-gradient-to-bl from-yellow-200 to-yellow-400
