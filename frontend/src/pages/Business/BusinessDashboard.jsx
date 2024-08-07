import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import OrderManagement from "./OrderManagement";
import ParcelTracking from "./ParcelTracking";
import PickupScheduling from "./PickupScheduling";
import { UserContext } from "../../Context/UserContext";
import Logo from "../../assets/Logo.png"; // Updated path

function BusinessDashboard() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white p-6 shadow-lg flex items-center rounded-lg border border-gray-300">
        <img 
          src={Logo} 
          alt="Logo" 
          className="h-16 w-16 rounded-full border-2 border-blue-300 bg-gradient-to-br from-blue-300 to-indigo-400 cursor-pointer mr-6 transition-transform transform hover:scale-105" 
          onClick={() => navigate('/seller')} 
        />
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold bg-gradient-to-br from-blue-300 to-indigo-400 text-transparent bg-clip-text text-center py-2 px-4 ">
            Business Dashboard
          </h1>
          {currentUser && (
            <p className="text-gray-700 mt-2 text-center text-2xl">Welcome, {currentUser.name}</p>
          )}
        </div>
      </header>
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-300 to-indigo-400">
  <div className="flex-1">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <OrderManagement />
      <ParcelTracking />
      
    </div>
  </div>
  <PickupScheduling />
</main>

    </div>
  );
}

export default BusinessDashboard;
