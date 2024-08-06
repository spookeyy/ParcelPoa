import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 py-6 px-4 bg-indigo-200 shadow z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-3xl text-indigo-500">ParcelPoa</h1>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-indigo-500 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <nav
          className={`sm:flex sm:items-center ${isOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-2 sm:mt-0 position sticky">
            <Link
              to="/"
              className="text-blue-700 font-medium hover:text-indigo-800 hover:underline"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-blue-700 font-medium hover:text-indigo-800 hover:underline"
            >
              Dashboard
            </Link>
            <Link
              to="/tracking"
              className="text-blue-700 hover:text-indigo-800 font-medium hover:underline"
            >
              Track Order
            </Link>
            <Link
              to="/contact-us"
              className="text-blue-700 font-medium hover:text-indigo-800 hover:underline"
            >
              Contact Us
            </Link>
            <Link
              to="/about-us"
              className="text-blue-700 font-medium hover:text-indigo-800 hover:underline "
            >
              About Us
            </Link>
            <Link
              to="/signup"
              className="text-blue-700 font-medium hover:text-indigo-800 hover:underline"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-blue-700 font-medium hover:text-indigo-800 hover:underline"
            >
              Log In
            </Link>
          </div>
          {/* <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
            <Link to="/signup" className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-full hover:bg-indigo-600 text-center">Sign Up</Link>
            <Link to="/login" className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 rounded-full border border-indigo-500 hover:border-transparent text-center">Log In</Link>
          </div> */}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
