import React from "react";

export default function DeliveryCard({
  orderID,
  payment,
  product,
  trackingNumber,
  status,
  orderDate,
}) {
  const statusColor =
    {
      Delivered: "bg-green-500",
      Pending: "bg-yellow-500",
      "In Transit": "bg-blue-500",
    }[status] || "bg-gray-500";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col space-y-4">
      <div className="text-lg font-semibold text-gray-800">
        <span className="font-bold">ORDER ID:</span> {orderID}
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-bold">Payment:</span> {payment}
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="/path/to/your/product/image.png"
          alt="Product Image"
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <p className="text-sm font-medium text-gray-800">{product}</p>
        </div>
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-bold">Tracking Number:</span> {trackingNumber}
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-bold">Order Date:</span> {orderDate}
      </div>
      <div className="flex justify-center mt-4">
        <div
          className={`${statusColor} text-white px-4 py-2 rounded-full font-semibold`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
