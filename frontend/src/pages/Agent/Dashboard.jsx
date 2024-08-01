import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AgentHeader from "./DashboardComponentsforAgent/AgentHeader";
import Sidebar from "./DashboardComponentsforAgent/Sidebar";
import StatsCard from "./DashboardComponentsforAgent/StatsCard";
import DeliveriesChart from "./DashboardComponentsforAgent/DeliveriesChart";
import Deliveries from "./DashboardComponentsforAgent/Deliveries";
import ManageDeliveries from "./ManageDeliveries"; // Import the ManageDeliveries component

export default function Dashboard() {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to open sidebar
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const deliveriesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Deliveries",
        data: [12, 19, 3, 5, 2, 3, 7],
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar component */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex-1 overflow-auto transition-transform duration-300 ${
          sidebarOpen ? "ml-64" : ""
        }`}
      >
        <div className="relative">
          <button
            onClick={toggleSidebar}
            className="bg-blue-500 text-white p-2 rounded-lg shadow-md absolute top-4 left-4 z-50"
          >
            {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
        </div>

        {/* Header component */}
        <AgentHeader />

        <Routes>
          {/* Define a route for ManageDeliveries and pass the openSidebar prop */}
          <Route
            path="/manage-deliveries"
            element={<ManageDeliveries openSidebar={openSidebar} />}
          />
          <Route
            path="/"
            element={
              <div>
                <div className="flex flex-wrap justify-center gap-6 px-6 mb-8">
                  <StatsCard
                    icon="fa-chart-line"
                    title="Total Deliveries"
                    count={120}
                    color="text-green-500"
                  />
                  <StatsCard
                    icon="fa-truck"
                    title="Delivered"
                    count={45}
                    color="text-yellow-500"
                  />
                  <StatsCard
                    icon="fa-hourglass-half"
                    title="Pending Deliveries"
                    count={75}
                    color="text-blue-500"
                  />
                  <StatsCard
                    icon="fa-truck-loading"
                    title="In Transit"
                    count={30}
                    color="text-red-500"
                  />
                </div>

                {/* Chart component */}
                <DeliveriesChart data={deliveriesData} />

                <div className="px-6 mb-8">
                  {/* Deliveries component */}
                  <Deliveries />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
