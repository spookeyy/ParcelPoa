import React from 'react';
import { Link } from 'react-router-dom';

export default function AgentHome() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 pt-36 pb-36">
      {/* Container for the gradient and content */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-blue-100 to-purple-200 rounded-lg shadow-lg p-6 sm:p-8 lg:p-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 sm:text-5xl md:text-6xl">
            Welcome to ParcelPoa
          </h1>
          <p className="text-lg text-gray-700 mb-6 sm:text-xl md:text-2xl">
            Empowering agents to manage deliveries efficiently and effectively. Join us and explore all the features designed just for you!
          </p>
          
          {/* Call to Action Button */}
          <Link to="/dashboard">
            <button className="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg transform hover:bg-white hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out">
              Go to Dashboard
            </button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <i className="fas fa-truck text-blue-500 text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Deliveries</h3>
            <p className="text-gray-600 max-w-xs">
              Seamlessly manage and track your deliveries with our easy-to-use dashboard.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <i className="fas fa-chart-line text-blue-500 text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics</h3>
            <p className="text-gray-600 max-w-xs">
              Get insights into your performance with detailed analytics and reports.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <i className="fas fa-user-friends text-blue-500 text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Team Collaboration</h3>
            <p className="text-gray-600 max-w-xs">
              Collaborate with your team and improve communication and efficiency.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <i className="fas fa-user text-blue-500 text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Profile Management</h3>
            <p className="text-gray-600 max-w-xs">
              Easily manage and update your profile information to stay current and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
