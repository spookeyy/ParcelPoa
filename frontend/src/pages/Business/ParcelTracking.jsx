import React, { useState } from "react";

function ParcelTracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);

  const trackParcel = async () => {
    try {
      const response = await fetch(`/track/${trackingNumber}`);
      if (!response.ok) throw new Error("Failed to track parcel");
      const data = await response.json();
      setTrackingInfo(data);
    } catch (error) {
      console.error("Error tracking parcel:", error);
      setTrackingInfo(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Parcel Tracking
      </h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter tracking number"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={trackParcel}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Track
        </button>
      </div>
      {trackingInfo && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700">
            <span className="font-medium">Status:</span>{" "}
            {trackingInfo.parcel.status}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Location:</span>{" "}
            {trackingInfo.parcel.current_location}
          </p>
        </div>
      )}
    </div>
  );
}

export default ParcelTracking;
