import React, { useState, useEffect } from "react";
import OrderManagement from "./OrderManagement";
import ParcelTracking from "./ParcelTracking";
import PickupScheduling from "./PickupScheduling";

function BusinessDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/current_user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Business Dashboard</h1>
        {user && <p className="text-white mt-2">Welcome, {user.name}</p>}
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
