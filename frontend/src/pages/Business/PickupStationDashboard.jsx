import React, { useState, useEffect, useContext } from "react";
import Navbar from '../../components/Navbar';
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import { server } from "../../../config";

const PickupStationDashboard = () => {
  const { currentUser, authToken } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(currentUser?.is_open);

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

  return (
    <div className="bg-white min-h-screen flex flex-col">
    <Navbar />
    <div className="bg-white min-h-screen flex flex-col">
      <div className="container mx-auto p-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Pickup Station Dashboard</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {currentUser?.name}
          </h2>
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
      </div>
    </div>
  </div>
  );
};

export default PickupStationDashboard;
