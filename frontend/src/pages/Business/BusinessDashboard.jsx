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
    <div className="min-h-screen bg-white">
<header className="bg-white p-6 shadow-lg flex items-center rounded-lg border border-gray-300">
  <img 
    src={Logo} 
    alt="Logo" 
    className="h-12 w-12 lg:h-16 lg:w-16 rounded-full border-2 border-blue-300 bg-gradient-to-br from-blue-300 to-indigo-400 cursor-pointer mr-4 lg:mr-6 transition-transform transform hover:scale-105" 
    onClick={() => navigate('/seller')} 
  />
  <div className="flex-1 text-center">
    <h1 className="text-3xl lg:text-5xl font-extrabold bg-gradient-to-br from-blue-300 to-indigo-400 text-transparent bg-clip-text py-2 px-4">
      Business Dashboard
    </h1>
    {currentUser && (
      <p className="bg-gradient-to-br from-blue-300 to-indigo-400 text-transparent bg-clip-text mt-2 text-xl lg:text-2xl">Welcome, {currentUser.name}</p>
    )}
  </div>
</header>

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
</main>


    </div>
  );
}

export default BusinessDashboard;
