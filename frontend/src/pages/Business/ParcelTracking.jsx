import React, { useState } from "react";
import { server } from "../../../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faSpinner,
  faExclamationCircle,
  faCheckCircle,
  faBox,
  faTruck,
  faShippingFast,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSearch,
  faSpinner,
  faExclamationCircle,
  faCheckCircle,
  faBox,
  faTruck,
  faShippingFast,
  faMapMarkerAlt
);

function ParcelTracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return { icon: faCheckCircle, color: "bg-green-500" };
      case "Out for Delivery":
        return { icon: faShippingFast, color: "bg-yellow-500" };
      case "In Transit":
        return { icon: faTruck, color: "bg-yellow-500" };
      case "Scheduled for Pickup":
        return { icon: faSpinner, color: "bg-gray-500" };
      case "Picked Up":
        return { icon: faCheckCircle, color: "bg-green-800" };
      case "Cancelled":
        return { icon: faExclamationCircle, color: "bg-red-500" };
      default:
        return { icon: faBox, color: "bg-gray-500" };
    }
  };

  const trackParcel = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${server}/track/${trackingNumber}`);
      if (!response.ok) throw new Error("Failed to track parcel");
      const data = await response.json();
      setTrackingInfo(data);
    } catch (error) {
      console.error("Error tracking parcel:", error);
      setError("Failed to track parcel. Please try again.");
      setTrackingInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen bg-white p-6 mt-10">
        <div className="order-tracking p-4 sm:p-6 bg-gradient-to-r from-yellow-50 to-yellow-200 shadow-lg rounded-lg max-w-3xl mx-auto mt-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="mr-2 text-4xl text-gray-700 animate-pulse"
            />
            Track a Parcel
          </h2>
          <form
            onSubmit={trackParcel}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="mb-4 relative">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Tracking Number:
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
                aria-label="Enter tracking number"
                required
              />
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Track Parcel
            </button>
          </form>
          {loading && (
            <p className="mt-4 text-yellow-600 text-center flex items-center justify-center">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="mr-2 text-2xl"
              />
              <span>Loading...</span>
            </p>
          )}
          {error && (
            <p className="mt-4 text-red-600 text-center flex items-center justify-center">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="mr-2 text-2xl"
              />
              <span>{error}</span>
            </p>
          )}
          {trackingInfo && (
            <div className="mt-6 p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3 text-center">
                Tracking Information
              </h3>
              <ul role="list" className="divide-y divide-gray-200 mb-6">
                <li className="relative py-4">
                  <div className="relative flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <span
                        className={`h-8 w-8 rounded-full ${
                          statusIcon(trackingInfo.parcel.status).color
                        } flex items-center justify-center ring-4 ring-white`}
                      >
                        <FontAwesomeIcon
                          icon={statusIcon(trackingInfo.parcel.status).icon}
                          className="text-white text-sm"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600">
                        Status:{" "}
                        <span className="font-medium text-gray-900">
                          {trackingInfo.parcel.status}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Location:{" "}
                        <span className="font-medium text-gray-900">
                          {trackingInfo.parcel.current_location}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParcelTracking;
