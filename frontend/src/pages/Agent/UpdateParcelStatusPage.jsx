import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data
const deliveriesMockData = [
  { id: 1, parcel: 'Parcel 1', status: 'Scheduled' },
  { id: 2, parcel: 'Parcel 2', status: 'In Transit' },
  { id: 3, parcel: 'Parcel 3', status: 'Delivered' },
];

export default function UpdateParcelStatusPage() {
  const { parcelId } = useParams();
  const [parcelDetails, setParcelDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedParcelDetails = deliveriesMockData.find(parcel => parcel.id === parseInt(parcelId, 10));
    if (fetchedParcelDetails) {
      setParcelDetails(fetchedParcelDetails);
      setStatus(fetchedParcelDetails.status);
    }
  }, [parcelId]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();

    if (!parcelId || !status) {
      setMessage("Please select a status.");
      return;
    }

    if (parcelDetails.status === "Delivered") {
      setMessage("Cannot update status of delivered parcel.");
      return;
    }

    const updatedParcel = { status };

    // Simulate API call
    try {
      const response = await fetch(`/update_status/${parcelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedParcel)
      });

      if (!response.ok) {
        throw new Error("Failed to update status.");
      }

      setMessage(`Parcel ID ${parcelId} updated to status ${status}`);
      setStatus('');
    } catch (error) {
      setMessage("Error updating parcel status.");
    }
  };

  const handleLocationUpdate = async (e) => {
    e.preventDefault();

    if (!parcelId || !location) {
      setMessage("Please provide a location.");
      return;
    }

    const updatedLocation = { location };

    // Simulate API call
    try {
      const response = await fetch(`/update_status/${parcelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedLocation)
      });

      if (!response.ok) {
        throw new Error("Failed to update location.");
      }

      setMessage(`Parcel ID ${parcelId} location updated to ${location}`);
      setLocation('');
    } catch (error) {
      setMessage("Error updating parcel location.");
    }
  };

  const displayParcel = parcelDetails || deliveriesMockData[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Parcel Status</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Parcel Details</h2>
          <p className="text-gray-600">Parcel ID: <span className="font-medium">{displayParcel.id}</span></p>
         
          <p className="text-gray-600">Current Status: <span className="font-medium">{displayParcel.status}</span></p>
        </div>

        <form onSubmit={handleStatusUpdate} className="space-y-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
              disabled={displayParcel.status === "Delivered"}
            >
              <option value="">Select Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 transition duration-300"
            disabled={displayParcel.status === "Delivered"}
          >
            Update Status
          </button>
        </form>

        <form onSubmit={handleLocationUpdate} className="space-y-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md shadow hover:bg-green-700 transition duration-300"
          >
            Update Location
          </button>
        </form>

        {message && <div className="mt-4 text-red-600 text-center font-medium">{message}</div>}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-600 text-white py-2 rounded-md shadow hover:bg-gray-700 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
