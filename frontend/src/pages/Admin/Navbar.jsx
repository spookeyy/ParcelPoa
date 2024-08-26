/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { FaBars } from "react-icons/fa";

function Navbar({ toggleSidebar }) {
  return (
    <nav className="bg-yellow-500 shadow-md sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-2xl text-white focus:outline-none lg:hidden mr-4"
            >
              <FaBars />
            </button>
            <p className="text-xl font-bold text-white">Admin Panel</p>
          </div>
          <Profile />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
