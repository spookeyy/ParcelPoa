import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
// import OrderManagement from "./OrderManagement";
// import ParcelTracking from "./ParcelTracking";
// import PickupScheduling from "./PickupScheduling";
import Header from "./Header";


function BusinessDashboard() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-8">
      <Header />
      {currentUser && (
        <p className="text-center text-gray-800 mt-4 text-xl lg:text-2xl">
          <span className="font-bold">{currentUser.name}</span>
        </p>
      )}
      <div className="pt-16 mt-0 flex-grow flex flex-col items-center py-8 px-4 lg:px-8">
        <div className="w-full mt-8max-w-4xl bg-gray-100 rounded-xl shadow-md p-6 lg:p-10">
          <div className="text-center">
            <h1 className="text-xl font-medium text-gray-800 mb-4 sm:text-4xl md:text-5xl">
              Welcome to ParcelPoa
            </h1>
            <p className="text-lg text-gray-600 mb-8 sm:text-xl">
              Manage your shipments, track parcels, and optimize your logistics
              operations all in one place. Streamline your business processes
              and enhance your customers' experience with our comprehensive
              tools.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 position-relative z-0">
            {/* Pickup Scheduling */}
            <button
              onClick={() => navigate("/business/schedule-pickup")}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-200 transition-shadow duration-200 transform hover:scale-105 z-10"
            >
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <i className="fas fa-calendar-alt text-yellow-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Create Order and Schedule Pickup
              </h3>
              <p className="text-gray-600 text-sm">
                Create and schedule orders altogether effortlessly with our
                intuitive tools, guaranteeing timely pickups and deliveries.
              </p>
            </button>
            {/* Manage Orders */}
            <button
              onClick={() => navigate("/business/orders")}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-200 transition-shadow duration-200 transform hover:scale-105 z-10"
            >
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <i className="fas fa-box text-yellow-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Order Management
              </h3>
              <p className="text-gray-600 text-sm">
                Streamline your order process with our comprehensive order
                management tools.
              </p>
            </button>

            {/* Parcel Tracking */}
            <button
              onClick={() => navigate("/business/parcel-tracking")}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-200 transition-shadow duration-200 transform hover:scale-105 z-10"
            >
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <i className="fas fa-map-marker-alt text-yellow-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Parcel Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor the status of your parcels in real-time with our
                tracking system.
              </p>
            </button>
            {/* Agents */}
            <button
              onClick={() => navigate("/seller/agents")}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-200 transition-shadow duration-200 transform hover:scale-105 z-10"
            >
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <i className="fas fa-users text-yellow-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Agents
              </h3>
              <p className="text-gray-600 text-sm">
                View and manage your agents
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDashboard;