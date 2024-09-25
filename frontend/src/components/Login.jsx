import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon, Mail, Lock } from "lucide-react";
import Navbar from "./Navbar";
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
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5 }}
          className="login-container flex flex-col p-8 bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg max-w-md w-full max-h-[90vh] mt-[-60px]"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
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
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-900 mb-4 text-center"
          >
            Login to your account
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-gradient-to-br from-yellow-200 to-yellow-400 bg-opacity-150 backdrop-blur-md shadow-lg rounded-lg p-6"
          >
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 p-2 pl-10 focus:outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition pr-10"
                  required
                />
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
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
                  className="w-full bg-gray-100 p-2 pl-10 border focus:outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition pr-10"
                  required
                />
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-black text-white p-3 rounded-md hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200"
            >
              Login
            </motion.button>
          </motion.form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 space-y-2"
          >
            <p className="text-sm text-center text-gray-900 font-medium">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-yellow-800 hover:underline hover:text-yellow-800 font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Sign up
              </Link>
            </p>
            <p className="text-sm text-center">
              <button
                onClick={handleResetPassword}
                className="text-yellow-600 hover:underline font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <Link
                  to="/request-reset-password"
                  className="text-sm text-yellow-800 hover:underline hover:text-yellow-800 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Forgot Password?
                </Link>
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
