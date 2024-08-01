import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar, navigateTo }) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-40`}
    >
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <span className="text-2xl font-bold">Dashboard</span>
        <button onClick={toggleSidebar} className="text-3xl font-bold">
          &times;
        </button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          <li>
            <Link
              to="/manage-deliveries"
              className="flex items-center   text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200"
            >
              <i className="fas fa-box mr-3 text-xl"></i> Manage Deliveries
            </Link>
          </li>
          <li>
            <Link
              to="/communication-tools"
              className="flex items-center   text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200"
            >
              <i className="fas fa-comments mr-3 text-xl"></i> Communication Tools
            </Link>
          </li>
          <li>
            <Link
              to="/agent-login"
              className="flex items-center   text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200"
            >
              <i className="fas fa-sign-in-alt mr-3 text-xl"></i> Login
            </Link>
          </li>
          <li>
            <Link
              to="/agent-register"
              className="flex items-center   text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200"
            >
              <i className="fas fa-user-plus mr-3 text-xl"></i> Register
            </Link>
          </li>
          <li>
            <Link
              to="/agent-profile"
              className="flex items-center   text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200"
            >
              <i className="fas fa-user mr-3 text-xl"></i> Profile
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/dashboard");
                toggleSidebar();
              }}
              className="flex items-center   text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200"
            >
              <i className="fas fa-home mr-3 text-xl"></i> Go to Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/add-delivery")}
              className="flex items-center   text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200"
            >
              <i className="fas fa-plus mr-3 text-xl"></i> Create New Delivery
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/update-parcel-status")}
              className="flex items-center   text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200"
            >
              <i className="fas fa-edit mr-3 text-xl"></i> Update Parcel Status
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo(true)}
              className="flex items-center   text-gray-800 hover:text-blue-600 hover:bg-gray-100 p-3 rounded transition duration-200"
            >
              <i className="fas fa-check-circle mr-3 text-xl"></i> Confirm Delivery
            </button>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md mb-6 mx-4 absolute bottom-4 left-4 flex items-center justify-center"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back
      </button>
    </div>
  );
}
