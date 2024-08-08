/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {server} from "../../../config.json";
function ParcelTracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);

  const trackParcel = async () => {
    try {
      const response = await fetch(`${server}/track/${trackingNumber}`);
      if (!response.ok) throw new Error("Failed to track parcel");
      const data = await response.json();
      setTrackingInfo(data);
    } catch (error) {
      console.error("Error tracking parcel:", error);
      setTrackingInfo(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-300 to-indigo-400 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Parcel Tracking</h2>
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-4">
         <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter tracking number"
          className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={trackParcel}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-blue-500 hover:to-indigo-700 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 w-full lg:w-auto"
        >
          Track
        </button>
      </div>
      {trackingInfo && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
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
