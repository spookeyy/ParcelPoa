/* eslint-disable react/prop-types */
import React, { useState } from "react";
import UpdateParcelModal from "./UpdateParcelModal";

export default function ParcelCard({ parcel }) {
  const [showModal, setShowModal] = useState(false);

  const handleUpdateStatus = () => {
    setShowModal(true);
  };

  const statusColor =
    {
      "Scheduled for Pickup": "bg-gray-500",
      "Picked Up": "bg-green-800",
      "Out for Delivery": "bg-blue-500",
      "In Transit": "bg-yellow-500",
      Delivered: "bg-green-500",
      Cancelled: "bg-red-500",
    }[parcel.status] || "bg-gray-500";

  return (
    <div className="bg-gradient-to-bl from-blue-200 to-indigo-400 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 flex flex-col space-y-4">
      <div className="text-lg font-semibold">
        <span className="font-bold">PARCEL ID:</span> {parcel.parcel_id}
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-bold">Tracking Number:</span>{" "}
        {parcel.tracking_number}
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-bold">Order Date:</span> {parcel.created_at}
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-bold">Recipient Email:</span>{" "}
        {parcel.recipient_email}
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-bold">Sender Email:</span>{" "}
        {parcel.sender?.sender_email}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div
          className={`${statusColor} text-white px-4 py-2 rounded-lg font-semibold`}
        >
          {parcel.status}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpdateStatus}
        >
          Update Status
        </button>
      </div>

      {showModal && (
        <UpdateParcelModal
          parcel_id={parcel.parcel_id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
