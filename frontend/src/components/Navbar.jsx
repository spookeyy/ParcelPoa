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
          <span className="text-2xl bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text font-semibold whitespace-nowrap dark:text-white">
            ParcelPoa
          </span>
        </Link>
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-yellow-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
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
          >
            Home
          </Link>
          <Link
            to="/about"
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
          >
            About
          </Link>
          <Link
            to="/tracking"
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
          >
            Track Order
          </Link>
          <Link
            to="/contact-us"
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
          >
            Contact Us
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:text-green-700 dark:text-white dark:hover:text-green-500"
          >
            Log In
          </Link>
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