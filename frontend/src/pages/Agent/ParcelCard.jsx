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
      "In Transit": "bg-yellow-800",
      Delivered: "bg-green-500",
      Cancelled: "bg-red-500",
    }[parcel.status] || "bg-gray-500";

  return (
    <div className="bg-gradient-to-bl from-yellow-100 to-yellow-300 p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-200 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
      <div className="text-base sm:text-lg font-semibold">
        <span className="font-bold">PARCEL ID:</span> {parcel.parcel_id}
      </div>

      <div className="text-xs sm:text-sm text-gray-700">
        <span className="font-bold">Tracking Number:</span>{" "}
        {parcel.tracking_number}
      </div>

      <div className="text-xs sm:text-sm text-gray-700">
        <span className="font-bold">Items:</span> {parcel.description}
      </div>
      <div className="text-xs sm:text-sm text-gray-700">
        <span className="font-bold">Recipient Name:</span>{" "}
        {parcel.recipient_name}
      </div>
      <div className="text-xs sm:text-sm text-gray-700">
        <span className="font-bold">Recipient Phone:</span>{" "}
        {parcel.recipient_phone}
      </div>
      <div className="text-xs sm:text-sm text-gray-700">
        <span className="font-bold">Recipient Address:</span>{" "}
        {parcel.recipient_address}
      </div>
      <div className="text-xs sm:text-sm text-gray-700">
        <span className="font-bold">Sender Email:</span> {parcel.sender_email}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 sm:mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <div
          className={`${statusColor} text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm`}
        >
          {parcel.status}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm"
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
