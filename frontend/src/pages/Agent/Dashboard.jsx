import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AgentHeader from "./DashboardComponentsforAgent/AgentHeader";
import StatsCard from "./DashboardComponentsforAgent/StatsCard";
import Deliveries from "./DashboardComponentsforAgent/Deliveries";
import ManageDeliveries from "./ManageDeliveries";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };


  return (
    <div className="flex h-full overflow-hidden bg-gradient-to-br from-blue-300 to-indigo-700">
        <AgentHeader />
     <div className="mt-24 flex-1 overflow-y-auto px-4 py-2">
        <Routes>
          <Route
            path="/manage-deliveries"
            element={<ManageDeliveries openSidebar={openSidebar} />}
          />
          <Route
            path="/"
            element={
              
              <div className="flex flex-col flex-1 ">
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
                    icon="fa-truck-loading"
                    title="In Transit"
                    count={30}
                    color="text-red-500"
                  />
                </div>

                <div className="px-6 mb-8">
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
