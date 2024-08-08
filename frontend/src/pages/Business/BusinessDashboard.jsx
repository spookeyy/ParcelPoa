import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import OrderManagement from "./OrderManagement";
import ParcelTracking from "./ParcelTracking";
import PickupScheduling from "./PickupScheduling";
import { UserContext } from "../../Context/UserContext";
import Logo from "../../assets/Logo.png"; // Updated path

function BusinessDashboard() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-600">
<header className="bg-white p-6 shadow-lg flex items-center rounded-lg border border-gray-300">
  <img 
    src={Logo} 
    alt="Logo" 
    className="h-12 w-12 lg:h-16 lg:w-16 rounded-full border-2 border-yellow-300 bg-gradient-to-br from-yellow-200 to-yellow-600 cursor-pointer mr-4 lg:mr-6 transition-transform transform hover:scale-105" 
    onClick={() => navigate('/seller')} 
  />
  <div className="flex-1 text-center">
    <h1 className="text-3xl lg:text-5xl font-extrabold bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text py-2 px-4">
      Business Dashboard
    </h1>
    {currentUser && (
      <p className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text mt-2 text-xl lg:text-2xl">Welcome, {currentUser.name}</p>
    )}
  </div>
</header>
{/* 
      <main className="min-h-screen flex flex-col bg-white space-y-8 pb-28">
  <div className="flex-1 pt-12">
    <OrderManagement />
  </div>
  <div className="flex-1">
    <ParcelTracking />
  </div>
  <div className="flex-1 pt-10">
    <PickupScheduling />
  </div>
</main> */}

 <div className="pt-32 flex-grow flex flex-col items-center   py-4 px-2 sm:px-4 lg:px-6 pb-32">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-yellow-500 mb-3 sm:text-4xl md:text-5xl">
              Welcome to ParcelPoa
            </h1>
            <p className="text-base text-yellow-500 mb-4 sm:text-lg md:text-xl">
              Empowering agents to manage deliveries efficiently and effectively. Join us and explore all the features designed just for you!
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
        onClick={() => navigate('/parcel-form')}
        className="flex flex-col items-center bg-gradient-to-br from-yellow-200 to-yellow-600 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
      >
        <div className="bg-white p-4 rounded-full shadow-md mb-4">
          <i className="fas fa-box text-yellow-600 text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Order Management</h3>
        <p className="text-white max-w-xs text-sm">
          Streamline your order process with our comprehensive order management tools.
        </p>
      </button>

      {/* Analytics and Reporting */}
      <button
        onClick={() => navigate('/order-management')}
        className="flex flex-col items-center bg-gradient-to-br from-yellow-200 to-yellow-600 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
      >
        <div className="bg-white p-4 rounded-full shadow-md mb-4">
          <i className="fas fa-chart-line text-yellow-600 text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h3>
        <p className="text-white max-w-xs text-sm">
          Gain valuable insights into your business operations with our analytics dashboard.
        </p>
      </button>

      {/* Parcel Tracking */}
      <button
        onClick={() => navigate('/parcel-tracking')}
        className="flex flex-col items-center bg-gradient-to-br from-yellow-200 to-yellow-600 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
      >
        <div className="bg-white p-4 rounded-full shadow-md mb-4">
          <i className="fas fa-map-marker-alt text-yellow-600 text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Parcel Tracking</h3>
        <p className="text-white max-w-xs text-sm">
          Monitor the status of your parcels in real-time with our tracking system.
        </p>
      </button>

      {/* Pickup Scheduling */}
      <button
        onClick={() => navigate('/pickup-scheduling')}
        className="flex flex-col items-center bg-gradient-to-br from-yellow-200 to-yellow-600 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
      >
        <div className="bg-white p-4 rounded-full shadow-md mb-4">
          <i className="fas fa-calendar-alt text-yellow-600 text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Pickup Scheduling</h3>
        <p className="text-white max-w-xs text-sm">
          Schedule pickups seamlessly and ensure timely deliveries with our easy scheduling tools.
        </p>
      </button>
    </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDashboard;
