/* eslint-disable react/prop-types */
import React, { useState } from "react";

function ParcelForm({ onSubmit }) {
  const [parcelData, setParcelData] = useState({
    recipient_name: "",
    recipient_address: "",
    recipient_phone: "",
    description: "",
    weight: "",
    category: "",
    recipient_email: "",
    pickup_time: "",
  });

  const handleChange = (e) => {
    setParcelData({ ...parcelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(parcelData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="recipient_name"
        value={parcelData.recipient_name}
        onChange={handleChange}
        placeholder="Recipient Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="recipient_address"
        value={parcelData.recipient_address}
        onChange={handleChange}
        placeholder="Recipient Address"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="recipient_phone"
        value={parcelData.recipient_phone}
        onChange={handleChange}
        placeholder="Recipient Phone"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="recipient_email"
        value={parcelData.recipient_email}
        onChange={handleChange}
        placeholder="Recipient Email"
        type="email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        name="description"
        value={parcelData.description}
        onChange={handleChange}
        placeholder="Parcel Description"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="weight"
        value={parcelData.weight}
        onChange={handleChange}
        placeholder="Weight (kg)"
        type="number"
        step="0.01"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="category"
        value={parcelData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="pickup_time"
        value={parcelData.pickup_time}
        onChange={handleChange}
        type="datetime-local"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Schedule Pickup
      </button>
    </form>
  );
}

export default ParcelForm;
