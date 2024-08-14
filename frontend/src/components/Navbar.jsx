import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-yellow-500 shadow shadow z-50fixed w-full z-20 top-0 left-0 border-b border-gray-200 py-[0px] ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-2">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="ParcelPoa Logo"
            className="h-14 w-auto md:h-16 md:w-auto mr-4 sm:mr-0"
          />
          <h1 className="font-bold text-3xl ml-2">ParcelPoa</h1>
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
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
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
        <div className="hidden md:flex md:items-center md:justify-end md:space-x-6">
          <Link
            to="/"
            className="text-black-700 font-medium hover:text-white hover:underline "
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-black-700 font-medium hover:text-white hover:underline "
          >
            About
          </Link>
          <Link
            to="/tracking"
            className="text-black-700 font-medium hover:text-white hover:underline"
          >
            Track Order
          </Link>
          <Link
            to="/contact-us"
            className="text-black-700 font-medium hover:text-white hover:underline "
          >
            Contact Us
          </Link>
          <Link
            to="/signup"
            className="text-black-700 font-medium hover:text-white hover:underline"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="text-black-700 font-medium hover:text-white hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-yellow-500`}>
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700  hover:bg-gray-500 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-500 hover:text-white "
          >
            About
          </Link>
          <Link
            to="/tracking"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-500 hover:text-white "
          >
            Track Order
          </Link>
          <Link
            to="/contact-us"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-500 hover:text-white "
          >
            Contact Us
          </Link>
          <Link
            to="/signup"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-500 hover:text-white "
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-500 hover:text-white "
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;