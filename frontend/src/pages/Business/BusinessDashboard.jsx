import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Header from "./Header";

function BusinessDashboard() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col font-roboto text-gray-100">
      <Header />
      <div className="pt-16 flex-grow flex flex-col items-center py-8 px-4 lg:px-8">
        <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg p-8 lg:p-12">
          {/* Welcome Message Inside the Card */}
          {currentUser && (
            <div className="text-center mb-6">
              <p className="text-lg lg:text-xl font-semibold text-gray-200">
                Welcome back, 
                <span className="block text-2xl lg:text-3xl text-teal-400 font-extrabold mt-1">{currentUser.name}</span>
              </p>
            </div>
          )}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-100 mb-4 font-montserrat">
              Welcome to ParcelPoa
            </h1>
            <p className="text-base lg:text-lg text-gray-300">
              Manage your shipments, track parcels, and optimize your logistics
              operations all in one place. Streamline your business processes
              and enhance your customers' experience with our comprehensive
              tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pickup Scheduling */}
            <button
              onClick={() => navigate("/business/schedule-pickup")}
              aria-label="Create Order and Schedule Pickup"
              className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="bg-blue-600 p-4 rounded-full mb-4 shadow-inner">
                <i className="fas fa-calendar-alt text-blue-100 text-3xl"></i>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-100 mb-2 text-center font-montserrat">
                Create Order and Schedule Pickup
              </h3>
              <p className="text-gray-300 text-sm text-center">
                Create and schedule orders effortlessly with our intuitive tools,
                guaranteeing timely pickups and deliveries.
              </p>
            </button>
            {/* Manage Orders */}
            <button
              onClick={() => navigate("/business/orders")}
              aria-label="Order Management"
              className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="bg-green-600 p-4 rounded-full mb-4 shadow-inner">
                <i className="fas fa-box text-green-100 text-3xl"></i>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-100 mb-2 text-center font-montserrat">
                Order Management
              </h3>
              <p className="text-gray-300 text-sm text-center">
                Streamline your order process with our comprehensive order
                management tools.
              </p>
            </button>

            {/* Parcel Tracking */}
            <button
              onClick={() => navigate("/business/parcel-tracking")}
              aria-label="Parcel Tracking"
              className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="bg-yellow-600 p-4 rounded-full mb-4 shadow-inner">
                <i className="fas fa-map-marker-alt text-yellow-100 text-3xl"></i>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-100 mb-2 text-center font-montserrat">
                Parcel Tracking
              </h3>
              <p className="text-gray-300 text-sm text-center">
                Monitor the status of your parcels in real-time with our
                tracking system.
              </p>
            </button>
            {/* Agents */}
            <button
              onClick={() => navigate("/seller/agents")}
              aria-label="Manage Agents"
              className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="bg-gray-600 p-4 rounded-full mb-4 shadow-inner">
                <i className="fas fa-users text-gray-100 text-3xl"></i>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-100 mb-2 text-center font-montserrat">
                Agents
              </h3>
              <p className="text-gray-300 text-sm text-center">
                View and manage your agents.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDashboard;
