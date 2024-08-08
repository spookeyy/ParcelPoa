import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AgentHeader from "./DashboardComponentsforAgent/AgentHeader";
import StatsCard from "./DashboardComponentsforAgent/StatsCard";
import Deliveries from "./DashboardComponentsforAgent/Deliveries";
import ManageDeliveries from "./ManageDeliveries";
import { server } from "../../../config.json";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [inTransit, setInTransit] = useState(0);
  const [assignedDeliveries, setAssignedDeliveries] = useState([]);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");

    fetch(`${server}/assigned_deliveries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch deliveries");
      })
      .then((data) => {
        setAssignedDeliveries(data);
        setTotalDeliveries(data.length);

        const deliveredCount = data.filter(
          (delivery) => delivery.status === "Delivered"
        ).length;
        setDelivered(deliveredCount);

        const inTransitCount = data.filter(
          (delivery) => delivery.status === "In Transit"
        ).length;
        setInTransit(inTransitCount);
      })
      .catch((error) => {
        console.error("Error fetching deliveries:", error);
      });
  }, []);

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
              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap justify-center gap-6 px-6 mb-8">
                  <StatsCard
                    icon="fa-chart-line"
                    title="Total Deliveries"
                    count={totalDeliveries}
                    color="text-green-500"
                  />
                  <StatsCard
                    icon="fa-truck"
                    title="Delivered"
                    count={delivered}
                    color="text-yellow-500"
                  />
                  <StatsCard
                    icon="fa-truck-loading"
                    title="In Transit"
                    count={inTransit}
                    color="text-red-500"
                  />
                </div>

                <div className="px-6 mb-8">
                  <Deliveries deliveries={assignedDeliveries} />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
