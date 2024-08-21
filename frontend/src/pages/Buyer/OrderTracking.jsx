import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GPS from "../../components/GPS";
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
import { useTracking } from "../../Context/TrackingContext";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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

const OrderTracking = () => {
  const { trackingNumber } = useParams();
  const location = useLocation();
  const { parcelData, trackingHistory, fetchTrackingData, loading, error } =
    useTracking();
  const [localTrackingNumber, setLocalTrackingNumber] = useState(
    trackingNumber || ""
  );

  useEffect(() => {
    const frontendUrl = window.location.origin;
    if (trackingNumber) {
      setLocalTrackingNumber(trackingNumber);
      fetchTrackingData(trackingNumber, frontendUrl);
    }
  }, [trackingNumber, fetchTrackingData]);

  useEffect(() => {
    const frontendUrl = window.location.origin;
    const params = new URLSearchParams(location.search);
    const trackingFromUrl = params.get("tracking");
    if (trackingFromUrl) {
      setLocalTrackingNumber(trackingFromUrl);
      fetchTrackingData(trackingFromUrl, frontendUrl);
    }
  }, [location, fetchTrackingData]);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!localTrackingNumber) {
      return;
    }
    const frontendUrl = window.location.origin;
    fetchTrackingData(localTrackingNumber, frontendUrl);
  };

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

  return (
    <>
      <Navbar />
      {/* <GPS /> */}
      <div className="order-tracking p-4 sm:p-6 bg-gradient-to-r from-yellow-50 to-yellow-200 shadow-lg rounded-lg max-w-3xl mx-auto mt-8 min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-4 text-yellow-900 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="mr-2 text-4xl text-yellow-700 animate-pulse"
          />
          Track Your Order
        </h2>
        <form
          onSubmit={handleTrackOrder}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          <div className="mb-4 relative">
            <label className="block text-md font-medium text-gray-700 mb-1">
              Tracking Number:
            </label>
            <input
              type="text"
              value={localTrackingNumber}
              onChange={(e) => setLocalTrackingNumber(e.target.value)}
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
            Track Order
          </button>
        </form>
        {loading && (
          <p className="mt-4 text-yellow-600 text-center flex items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} spin className="mr-2 text-2xl" />
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
        {parcelData && trackingHistory && trackingHistory.length > 0 && (
          <div className="mt-6 p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3 text-center">
              Tracking History
            </h3>
            <ul role="list" className="divide-y divide-gray-200 mb-6">
              {trackingHistory.map((track, index) => (
                <li key={index} className="relative py-4">
                  {index !== trackingHistory.length - 1 && (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <span
                        className={`h-8 w-8 rounded-full ${
                          statusIcon(track.status).color
                        } flex items-center justify-center ring-4 ring-white`}
                      >
                        <FontAwesomeIcon
                          icon={statusIcon(track.status).icon}
                          className="text-white text-sm"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600">
                        {track.status} at{" "}
                        <span className="font-medium text-gray-900">
                          {track.location}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        <time dateTime={track.timestamp}>
                          {new Date(track.timestamp).toLocaleString()}
                        </time>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* {parcelData.latitude && parcelData.longitude && (
              <div>
                <h4 className="text-md font-semibold mb-2">Current Location</h4>
                <p className="mb-3 text-sm">{parcelData.current_location}</p>
                <MapContainer
                  center={[parcelData.latitude, parcelData.longitude]}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[parcelData.latitude, parcelData.longitude]}
                  >
                    <Popup>Current parcel location</Popup>
                  </Marker>
                  
                </MapContainer>
              </div>
            )} */}
            {parcelData && (
              <div>
                <h4 className="text-md font-semibold mb-2">Current Location</h4>
                <p className="mb-3 text-sm">{parcelData.current_location}</p>
                <GPS parcel_id={parcelData.parcel_id} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default OrderTracking;
