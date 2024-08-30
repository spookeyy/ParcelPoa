import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import { server } from "../../../config";

const PickupStationDashboard = () => {
  const { currentUser, authToken } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [isOpen, setIsOpen] = useState(currentUser?.is_open);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${server}/pickup-station-dashboard`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data");
    }
  };

  const toggleStatus = async () => {
    try {
      const response = await fetch(`${server}/update-pickup-station-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ is_open: !isOpen }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      setIsOpen(data.is_open);
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8">Pickup Station Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Station Status</h2>
          <p className="mb-4">Current Status: {isOpen ? "Open" : "Closed"}</p>
          <button
            onClick={toggleStatus}
            className={`px-4 py-2 rounded-full ${
              isOpen
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-semibold`}
          >
            {isOpen ? "Close Station" : "Open Station"}
          </button>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Parcel Statistics</h2>
          <p>Total Parcels: {dashboardData.total_parcels}</p>
          <p>Parcels Waiting: {dashboardData.parcels_waiting}</p>
          <p>Parcels Collected: {dashboardData.parcels_collected}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Station Information</h2>
          <p>Name: {dashboardData.station_name}</p>
          <p>ID: {currentUser?.user_id}</p>
        </div>
      </div>
    </div>
  );
};

export default PickupStationDashboard;
