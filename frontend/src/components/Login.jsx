import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
// import { toast } from "react-toastify";

import logo from "../assets/Logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // Error is already handled in the login function
        console.error("Login failed:", error);
      });
  };

  const handleResetPassword = () => {
    navigate("/request-reset-password");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-indigo-700">
      <div className="login-container flex flex-col p-8 bg-gradient-to-bl from-blue-200 to-indigo-400 bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg max-w-md w-full m-4">
        <div className="flex items-center justify-center ">
          <img
            src={logo}
            alt="ParcelPoa Logo"
            className="h-16 w-auto md:h-16 md:w-auto lg:w-auto"
          />
          <div className="">
            <h1 className="text-3xl italic font-semibold text-gray-800 mr-6">
              ParcelPoa
            </h1>
          </div>
        </div>
        <p className="text-gray-700 mb-4 text-center">Login to your account</p>
        {/* <p className="text-lg text-gray-600 mt-1 text-center">
          Your trusted parcel management solution
        </p> */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gradient-to-br from-blue-200 to-indigo-400 bg-opacity-150 backdrop-blur-md shadow-lg rounded-lg p-6"
        >
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-150 p-2 focus:outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition pr-10"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-150 p-2 border focus:outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 hover:text-gray-800"
                style={{ top: "2px" }}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-6 space-y-2">
          <p className="text-sm text-center text-gray-800">
            Don't have an account?{" "}
            <Link
              to="/create-account"
              className="text-blue-600 hover:underline hover:text-blue-800 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign up
            </Link>
          </p>
          <p className="text-sm text-center">
            <button
              onClick={handleResetPassword}
              className="text-blue-600 hover:underline font-medium"
            >
              <Link
                to="/request-reset-password"
                className="text-sm text-blue-600 hover:underline hover:text-blue-800 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Forgot Password?
              </Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
