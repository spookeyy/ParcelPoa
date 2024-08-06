import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AgentHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-300 to-indigo-700">
      {/* Navbar */}
      <nav className="bg-indigo-200 shadow-md p-4 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-blue-500 font-bold ">
            <Link to="/">ParcelPoa</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
            <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">Dashboard</Link>
            <button onClick={handleLogout} className="text-blue-500 hover:text-blue-700">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 flex-grow flex flex-col items-center bg-gradient-to-br from-blue-300 to-indigo-700 py-4 px-2 sm:px-4 lg:px-6">
        <div className="w-full max-w-3xl bg-gradient-to-bl from-blue-200 to-indigo-400 rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-blue-500 mb-3 sm:text-4xl md:text-5xl">
              Welcome to ParcelPoa
            </h1>
            <p className="text-base text-white mb-4 sm:text-lg md:text-xl">
              Empowering agents to manage deliveries efficiently and effectively. Join us and explore all the features designed just for you!
            </p>
            
            <Link to="/dashboard">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transform hover:bg-white hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out">
                Go to Dashboard
              </button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full shadow-md mb-2">
                <i className="fas fa-truck text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Manage Deliveries</h3>
              <p className="text-white max-w-xs text-sm">
                Seamlessly manage and track your deliveries with our easy-to-use dashboard.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full shadow-md mb-2">
                <i className="fas fa-chart-line text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Analytics</h3>
              <p className="text-white max-w-xs text-sm">
                Get insights into your performance with detailed analytics and reports.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full shadow-md mb-2">
                <i className="fas fa-user-friends text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Team Collaboration</h3>
              <p className="text-white max-w-xs text-sm">
                Collaborate with your team and improve communication and efficiency.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full shadow-md mb-2">
                <i className="fas fa-user text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Profile Management</h3>
              <p className="text-white max-w-xs text-sm">
                Easily manage and update your profile information to stay current and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
