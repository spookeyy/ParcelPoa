/* eslint-disable react/prop-types */
import React from "react";

export default function DeliveryCard({
  orderID,
  trackingNumber,
  status,
  orderDate,
  recipientEmail,
  senderName,
}) {
  const statusColor =
    {
      Delivered: "bg-green-500",
      "In Transit": "bg-blue-500",
      Scheduled: "bg-yellow-500",
    }[status] || "bg-gray-500";

  return (
    <div className="bg-gradient-to-bl from-blue-200 to-indigo-400 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 flex flex-col space-y-4">
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
        <span className="font-bold">Sender Name:</span> {senderName}
      </div>

      <div className="flex justify-center mt-4">
        <div
          className={`${statusColor} text-white px-4 py-2 rounded-lg font-semibold`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
