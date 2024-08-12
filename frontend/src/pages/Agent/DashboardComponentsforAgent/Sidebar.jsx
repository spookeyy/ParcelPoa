import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar, navigateTo }) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-40 lg:w-80 md:w-64`}
    >
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <span className="text-xl font-bold sm:text-2xl md:text-3xl">
          Dashboard
        </span>
        <button
          onClick={toggleSidebar}
          className="text-2xl font-bold sm:text-3xl"
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          <li>
            <Link
              to="/manage-deliveries"
              className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200 text-sm sm:text-base"
            >
              <i className="fas fa-box mr-3 text-lg sm:text-xl"></i> Manage
              Deliveries
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200 text-sm sm:text-base"
            >
              <i className="fas fa-box mr-3 text-lg sm:text-xl"></i> Invoices
            </Link>
          </li>
          <li>
            <Link
              to="/communication-tools"
              className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200 text-sm sm:text-base"
            >
              <i className="fas fa-comments mr-3 text-lg sm:text-xl"></i>{" "}
              Communication Tools
            </Link>
          </li>

          {/* <li>
            <Link
              to="/agent-profile"
              className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200 text-sm sm:text-base"
            >
              <i className="fas fa-user mr-3 text-lg sm:text-xl"></i> Profile
            </Link>
          </li> */}
          {/* <li>
            <button
              onClick={() => navigate("/add-delivery")}
              className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200 text-sm sm:text-base"
            >
              <i className="fas fa-plus mr-3 text-lg sm:text-xl"></i> Create Parcel
            </button>
          </li> */}
          {/* <li>
            <button
              onClick={() => navigateTo(true)}
              className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200 text-sm sm:text-base"
            >
              <i className="fas fa-check-circle mr-3 text-lg sm:text-xl"></i> Confirm Delivery
            </button>
          </li> */}
          {/* <li>
            <Link
              to="/update-status"
              className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200 text-sm sm:text-base"
            >
              <i className="fas fa-sign-in-alt mr-3 text-lg sm:text-xl"></i> Update Status
            </Link>
          </li> */}
          <li>
            <button
              onClick={() => {
                navigate("/dashboard");
                toggleSidebar();
              }}
              className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200 text-sm sm:text-base"
            >
              <i className="fas fa-home mr-3 text-lg sm:text-xl"></i> Go to
              Dashboard
            </button>
          </li>
        </ul>
      </nav>

      <button
        onClick={() => navigate("/agent")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md mb-6 mx-4 absolute bottom-4 left-4 flex items-center justify-center text-sm sm:text-base"
      >
        <i className="fas fa-arrow-left mr-2 text-lg sm:text-xl"></i> Back
      </button>
    </div>
  );
}
