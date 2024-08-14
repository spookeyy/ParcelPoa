import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="ParcelPoa Logo"
            className="h-8 md:h-10"
          />
<<<<<<< HEAD
          <span className="text-2xl bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text font-semibold whitespace-nowrap dark:text-white">
            ParcelPoa
          </span>
        </Link>
        <div className="flex md:hidden">
=======
          <h1 className="font-bold text-3xl">ParcelPoa</h1>
        </div>
        <div className="sm:hidden">
>>>>>>> 919b44a278a6a5cf3dea58d9e59b2e3a3122d166
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-yellow-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
<<<<<<< HEAD
            <span className="sr-only">Open main menu</span>
             <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:justify-end md:space-x-6">
          <Link
            to="/"
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
=======
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
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        <nav className="hidden sm:flex sm:items-center space-x-4">
          <Link
            to="/"
            className="text-black-700 font-medium hover:text-white hover:underline"
>>>>>>> 919b44a278a6a5cf3dea58d9e59b2e3a3122d166
          >
            Home
          </Link>
          <Link
<<<<<<< HEAD
            to="/about"
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
          >
            About
          </Link>
          <Link
            to="/tracking"
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
=======
            to="/tracking"
            className="text-black-700 font-medium hover:text-white hover:underline"
>>>>>>> 919b44a278a6a5cf3dea58d9e59b2e3a3122d166
          >
            Track Order
          </Link>
          <Link
            to="/contact-us"
<<<<<<< HEAD
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
=======
            className="text-black-700 font-medium hover:text-white hover:underline"
>>>>>>> 919b44a278a6a5cf3dea58d9e59b2e3a3122d166
          >
            Contact Us
          </Link>
          <Link
<<<<<<< HEAD
            to="/signup"
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
=======
            to="/about"
            className="text-black-700 font-medium hover:text-white hover:underline"
          >
            About Us
          </Link>
          <Link
            to="/signup"
            className="text-black-700 font-medium hover:text-white hover:underline"
>>>>>>> 919b44a278a6a5cf3dea58d9e59b2e3a3122d166
          >
            Sign Up
          </Link>
          <Link
            to="/login"
<<<<<<< HEAD
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
          >
            Log In
          </Link>
=======
            className="text-black-700 font-medium hover:text-white hover:underline"
          >
            Log In
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 max-w-sm bg-yellow-500 z-50 h-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img
                src={logo}
                alt="ParcelPoa Logo"
                className="h-14 w-auto md:h-16 md:w-auto mr-2"
              />
              <h1 className="font-bold text-3xl">ParcelPoa</h1>
            </div>
            <button className="text-black" onClick={toggleMenu}>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-black-700 font-medium hover:text-white"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/tracking"
              className="text-black-700 font-medium hover:text-white"
              onClick={toggleMenu}
            >
              Track Order
            </Link>
            <Link
              to="/contact-us"
              className="text-black-700 font-medium hover:text-white"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="text-black-700 font-medium hover:text-white"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/signup"
              className="text-black-700 font-medium hover:text-white"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-black-700 font-medium hover:text-white"
              onClick={toggleMenu}
            >
              Log In
            </Link>
          </nav>
>>>>>>> 919b44a278a6a5cf3dea58d9e59b2e3a3122d166
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          >
            About
          </Link>
          <Link
            to="/tracking"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Track Order
          </Link>
          <Link
            to="/contact-us"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Contact Us
          </Link>
          <Link
            to="/signup"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
