import React, { useContext } from "react";
import OrderManagement from "./OrderManagement";
import ParcelTracking from "./ParcelTracking";
import PickupScheduling from "./PickupScheduling";
import { UserContext } from "../../Context/UserContext";

function BusinessDashboard() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Business Dashboard</h1>
        {currentUser && (
          <p className="text-white mt-2">Welcome, {currentUser.name}</p>
        )}
      </header>
      <main className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <OrderManagement />
          <ParcelTracking />
          <PickupScheduling />
        </div>
      </main>
    </div>
  );
}

export default BusinessDashboard;
