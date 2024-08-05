import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data
const deliveriesMockData = [
  { id: 1, parcel: 'Parcel 1', status: 'Scheduled' },
  { id: 2, parcel: 'Parcel 2', status: 'In Transit' },
  { id: 3, parcel: 'Parcel 3', status: 'Delivered' },
];

export default function UpdateParcelStatusPage() {
  const { parcelId } = useParams(); // Get parcel ID from URL
  const [parcelDetails, setParcelDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Directly set parcelDetails for demonstration
    const fetchedParcelDetails = deliveriesMockData.find(parcel => parcel.id === parseInt(parcelId, 10));
    if (fetchedParcelDetails) {
      setParcelDetails(fetchedParcelDetails);
      setStatus(fetchedParcelDetails.status);
    }
  }, [parcelId]);

  // Simulated form submit handlers
  const handleStatusUpdate = (e) => {
    e.preventDefault(); // Prevent form submission

    if (!parcelId || !status) {
      setMessage("Please select a status.");
      return;
    }

    const updatedParcel = {
      parcelId: parseInt(parcelId, 10), // Ensure ID is an integer
      status,
    };

    // Simulate API call
    setTimeout(() => {
      setMessage(`Parcel ID ${parcelId} updated to status ${status}`);
      setStatus('');
    }, 1000);
  };

  const handleLocationUpdate = (e) => {
    e.preventDefault();

    if (!parcelId || !location) {
      setMessage("Please provide a location.");
      return;
    }

    const updatedLocation = {
      location,
    };

    // Simulate API call
    setTimeout(() => {
      setMessage(`Parcel ID ${parcelId} location updated to ${location}`);
      setLocation('');
    }, 1000);
  };

  // Default to the first mock data if parcelId does not match
  const displayParcel = parcelDetails || deliveriesMockData[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Update Parcel</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Parcel Details</h2>
          <p className="text-gray-600">Parcel ID: <span className="font-medium">{displayParcel.id}</span></p>
          <p className="text-gray-600">Parcel Name: <span className="font-medium">{displayParcel.parcel}</span></p>
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
            >
              <option value="">Select Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 transition duration-300"
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

        {message && <div className="mt-4 text-green-600 text-center font-medium">{message}</div>}

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
