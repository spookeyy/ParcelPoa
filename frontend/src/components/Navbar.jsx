import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 py-1 px-2 bg-yellow-500 shadow z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={logo}
            alt="ParcelPoa Logo"
            className="h-14 w-auto md:h-16 md:w-auto mr-4 sm:mr-0"
          />
          <h1 className="font-bold text-3xl">ParcelPoa</h1>
        </div>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-black-700 focus:outline-none"
          >
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
          >
            Home
          </Link>
          <Link
            to="/tracking"
            className="text-black-700 font-medium hover:text-white hover:underline"
          >
            Track Order
          </Link>
          <Link
            to="/contact-us"
            className="text-black-700 font-medium hover:text-white hover:underline"
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className="text-black-700 font-medium hover:text-white hover:underline"
          >
            About Us
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
        </div>
      </div>
    </header>
  );
}

export default Navbar;
