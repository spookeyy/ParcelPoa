import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddDelivery() {
  const [parcel, setParcel] = useState('');
  const [status, setStatus] = useState('Pending');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here, e.g., send data to an API
    console.log('Adding delivery:', { parcel, status });

    // Simulate a successful API call using fetch with promises
    fetch('/api/add-delivery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parcel, status }),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/manage-deliveries'); // Redirect after successful submission
        } else {
          console.error('Failed to add delivery');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md relative min-h-screen">
      {/* Form Content */}
      <h1 className="text-3xl font-bold mb-6">Add New Delivery</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Parcel Name:</label>
          <input
            type="text"
            value={parcel}
            onChange={(e) => setParcel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Delivery
        </button>
      </form>

      {/* Button to Navigate to Manage Deliveries */}
      <button
        onClick={() => navigate('/manage-deliveries')}
        className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Manage Deliveries
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Back
      </button>
    </div>
  );
}
