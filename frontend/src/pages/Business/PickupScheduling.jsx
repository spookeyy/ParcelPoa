import React, { useState } from "react";

function PickupScheduling() {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");

  const schedulePickup = async () => {
    try {
      const response = await fetch("/schedule_pickup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pickup_time: pickupDate,
          recipient_address: pickupAddress,
        }),
      });
      if (!response.ok) throw new Error("Failed to schedule pickup");
      const result = await response.json();
      console.log("Pickup scheduled:", result);
      // Clear form after successful scheduling
      setPickupDate("");
      setPickupAddress("");
    } catch (error) {
      console.error("Error scheduling pickup:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Schedule Pickup
      </h2>
      <div className="space-y-4">
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
          placeholder="Pickup Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={schedulePickup}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Schedule Pickup
        </button>
      </div>
    </div>
  );
}

export default PickupScheduling;
