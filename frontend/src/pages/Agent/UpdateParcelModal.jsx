import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { server } from "../../../config.json";
import { UserContext } from "../../Context/UserContext";

function UpdateParcelModal({ parcel_id, onClose }) {
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { authToken } = useContext(UserContext);

  const getLocationName = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unable to fetch location name";
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          const name = await getLocationName(latitude, longitude);
          setLocationName(name);
          setLocation(name); // Automatically set the input field
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get current location. Please enter manually.");
          setIsLoadingLocation(false);
        }
      );
    } else {
      toast.warn("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      toast.error(
        "Location data is missing. Please try again or enter location manually."
      );
      return;
    }

    try {
      const response = await fetch(`${server}/update_status/${parcel_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          status,
          location,
          latitude,
          longitude,
        }),
      });

      if (response.ok) {
        if (status === "Delivered") {
          toast.success("Parcel delivered. No need to update status.");
          onClose();
          return;
        }
        toast.success("Parcel status and location updated successfully!");
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Update Parcel Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 appearance-none focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              required
            >
              <option value="">Select status</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder={
                isLoadingLocation
                  ? "Getting current location..."
                  : "Enter current location"
              }
              required
            />
          </div>
          {isLoadingLocation && (
            <p className="text-sm text-gray-600 mb-4">
              Getting current location...
            </p>
          )}
          {locationName && (
            <p className="text-sm text-gray-600 mb-4">
              Current location: {locationName}
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
              disabled={isLoadingLocation}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UpdateParcelModal.propTypes = {
  parcel_id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateParcelModal;
