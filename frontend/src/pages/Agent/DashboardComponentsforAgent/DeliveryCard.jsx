/* eslint-disable react/prop-types */
import React, { useState } from "react";
import UpdateDeliveryModal from "../UpdateDeliveryModal";

export default function DeliveryCard({
  delivery_id,
  orderID,
  trackingNumber,
  status,
  orderDate,
  recipientEmail,
  sender_email,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleUpdateStatus = () => {
    setShowModal(true);
  };

  const statusColor =
    {
      Delivered: "bg-green-500",
      "In Transit": "bg-blue-500",
      Scheduled: "bg-yellow-500",
    }[status] || "bg-gray-500";

  return (
    <div className="bg-gradient-to-bl from-yellow-200 to-yellow-400 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 flex flex-col space-y-4">
      <div className="text-lg font-semibold">
        <span className="font-bold">ORDER ID:</span> {orderID}
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-bold">Tracking Number:</span> {trackingNumber}
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-bold">Order Date:</span> {orderDate}
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-bold">Recipient Email:</span> {recipientEmail}
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-bold">Sender Name:</span> {sender_email}
      </div>

      <div className="flex justify-center mt-4">
        <div
          className={`${statusColor} text-white px-4 py-2 rounded-lg font-semibold`}
        >
          {status}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpdateStatus}
        >
          Update Status
        </button>
      </div>

      {showModal && (
        <UpdateDeliveryModal
          delivery_id={delivery_id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
