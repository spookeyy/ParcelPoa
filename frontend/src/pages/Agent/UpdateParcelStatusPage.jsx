// src/pages/UpdateParcelStatusPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateParcelStatusPage() {
  const [parcelId, setParcelId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate inputs
    if (!parcelId || !status) {
      setMessage('Please enter a Parcel ID and select a status.');
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
      setParcelId('');
      setStatus('');
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
    //     setParcelId('');
    //     setStatus('');
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">Update Parcel Status</h1>

      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700">Parcel ID:</label>
          <input
            type="text"
            value={parcelId}
            onChange={(e) => setParcelId(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter Parcel ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Update Status
        </button>
      </form>

      {message && <div className="mt-4 text-green-500">{message}</div>}

      <button
        onClick={() => navigate('/dashboard')}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

