/* eslint-disable react/prop-types */
import React, { useState } from "react";

const UpdateDeliveryStatusModal = ({ parcel, onClose, onUpdateStatus }) => {
  const [newStatus, setNewStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Update Delivery Status</h2>
        <p className="mb-4">Tracking Number: {parcel.tracking_number}</p>
        <form onSubmit={handleSubmit}>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="">Select new status</option>
            <option value="At Pickup Station">At Pickup Station</option>
            <option value="Collected">Collected</option>
          </select>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDeliveryStatusModal;
