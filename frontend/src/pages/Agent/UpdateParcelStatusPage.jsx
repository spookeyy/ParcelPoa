import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateParcelStatusPage() {
  const [parcelId, setParcelId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/update-parcel-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parcelId, status }),
      });

      if (response.ok) {
        setMessage(`Parcel ID ${parcelId} updated to status ${status}`);
        setParcelId('');
        setStatus('');
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">Update Parcel Status</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-gray-700">Parcel ID:</label>
          <input
            type="text"
            value={parcelId}
            onChange={(e) => setParcelId(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter Parcel ID"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Update Status
        </button>
      </form>

      {message && (
        <div className="mt-4 text-green-500">{message}</div>
      )}

      <button
        onClick={() => navigate('/dashboard')}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

