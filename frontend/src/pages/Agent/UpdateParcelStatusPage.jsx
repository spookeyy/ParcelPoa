import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const deliveriesMockData = [
  { id: 1, parcel: 'Parcel 1', status: 'Scheduled' },
  { id: 2, parcel: 'Parcel 2', status: 'In Transit' },
  { id: 3, parcel: 'Parcel 3', status: 'Delivered' },
  // Add more mock data as needed
];

export default function UpdateParcelStatusPage() {
  const { parcelId } = useParams(); // Get parcel ID from URL
  const [parcelDetails, setParcelDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch parcel details based on parcelId
    const fetchedParcelDetails = deliveriesMockData.find(parcel => parcel.id === parseInt(parcelId, 10));
    if (fetchedParcelDetails) {
      setParcelDetails(fetchedParcelDetails);
      setStatus(fetchedParcelDetails.status);
    }
  }, [parcelId]);

  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate inputs
    if (!parcelId || !status) {
      setMessage("Please enter a Parcel ID and select a status.");
      return;
    }

    // Simulate updating parcel status
    const updatedParcel = {
      parcelId,
      status,
    };

    // Simulate a server response with a success message
    setTimeout(() => {
      setMessage(`Parcel ID ${parcelId} updated to status ${status}`);
      setStatus("");
    }, 1000);

    // Uncomment below code when you have the API endpoint ready
    // fetch('/api/update-parcel-status', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedParcel),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Update failed');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setMessage(`Parcel ID ${parcelId} updated to status ${status}`);
    //     setStatus('');
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Parcel Status</h1>

        {parcelDetails ? (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700">Parcel Details</h2>
              <p className="text-gray-600">Parcel ID: {parcelDetails.id}</p>
              <p className="text-gray-600">Parcel Name: {parcelDetails.parcel}</p>
              <p className="text-gray-600">Current Status: {parcelDetails.status}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
                className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
              >
                Update Status
              </button>
            </form>

            {message && <div className="mt-4 text-green-500 text-center">{message}</div>}
          </>
        ) : (
          <div className="text-center text-gray-600">Loading parcel details...</div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-500 text-white py-2 rounded-md shadow hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
