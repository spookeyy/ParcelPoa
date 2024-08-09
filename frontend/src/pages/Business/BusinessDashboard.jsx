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
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-600">
      <Header />
      {currentUser && (
        <p className="bg-gradient-to-br from-yellow-200 to-yellow-600 items-center text-center bg-clip-text mt-2 text-xl lg:text-xl">
          Welcome, <span className="font-bold">{currentUser.name}</span>
        </p>
      )}
      <div className="pt-32 flex-grow flex flex-col items-center   py-4 px-2 sm:px-4 lg:px-6 pb-32">
        <div className="w-full mt-0 max-w-2xl bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-yellow-500 mb-3 sm:text-4xl md:text-5xl">
              Welcome to ParcelPoa
            </h1>
            <p className="text-base text-yellow-500 mb-4 sm:text-lg md:text-xl">
              Empowering agents to manage deliveries efficiently and
              effectively. Join us and explore all the features designed just
              for you!
            </p>

            {/* <Link to="/dashboard">
              <button className="bg-blue-500 text-yellow-500 px-6 py-3 rounded-lg shadow-md transform hover:bg-white hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out">
                Go to Dashboard
              </button>
            </Link> */}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            {/* Manage Orders */}
            <button
              onClick={() => navigate("/business/orders")}
              className="flex flex-col items-center bg-gradient-to-br from-yellow-200 to-yellow-600 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
            >
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                <i className="fas fa-box text-yellow-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Order Management
              </h3>
              <p className="text-white max-w-xs text-sm">
                Streamline your order process with our comprehensive order
                management tools.
              </p>
            </button>

            {/* Analytics and Reporting */}
            <button
              onClick={() => navigate("/seller/agents")}
              className="flex flex-col items-center bg-gradient-to-br from-yellow-200 to-yellow-600 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
            >
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                <i className="fas fa-chart-line text-yellow-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Agents</h3>
              <p className="text-white max-w-xs text-sm">
                View your agents for now
              </p>
            </button>

            {/* Parcel Tracking */}
            <button
              onClick={() => navigate("/business/parcel-tracking")}
              className="flex flex-col items-center bg-gradient-to-br from-yellow-200 to-yellow-600 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
            >
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                <i className="fas fa-map-marker-alt text-yellow-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Parcel Tracking
              </h3>
              <p className="text-white max-w-xs text-sm">
                Monitor the status of your parcels in real-time with our
                tracking system.
              </p>
            </button>

            {/* Pickup Scheduling */}
            <button
              onClick={() => navigate("/business/schedule-pickup")}
              className="flex flex-col items-center bg-gradient-to-br from-yellow-200 to-yellow-600 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
            >
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                <i className="fas fa-calendar-alt text-yellow-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Pickup Scheduling
              </h3>
              <p className="text-white max-w-xs text-sm">
                Schedule pickups seamlessly and ensure timely deliveries with
                our easy scheduling tools.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDashboard;
