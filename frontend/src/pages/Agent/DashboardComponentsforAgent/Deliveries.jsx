import React, { useState } from "react";
import DeliveryCard from "./DeliveryCard";

export default function Deliveries() {
  const [activeTab, setActiveTab] = useState("all");

  const deliveries = [
    {
      orderID: "764",
      payment: "Tocipopas x 7",
      product: "Product Image",
      trackingNumber: "DB7YTE",
      status: "in transit",
      orderDate: "MAY 11, 2023, 04:30 PM",
    },
    {
      orderID: "765",
      payment: "Tocipopas x 3",
      product: "Product Image",
      trackingNumber: "DB8YTE",
      status: "delivered",
      orderDate: "JUNE 5, 2023, 10:00 AM",
    },
    {
      orderID: "766",
      payment: "Tocipopas x 1",
      product: "Product Image",
      trackingNumber: "DB9YTE",
      status: "scheduled",
      orderDate: "JULY 2, 2023, 01:30 PM",
    },
  ];

  const filteredDeliveries =
    activeTab === "all"
      ? deliveries
      : deliveries.filter((delivery) => delivery.status === activeTab);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deliveries</h3>
      <div className="flex space-x-4 mb-6">
        {["all", "in transit", "delivered", "scheduled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === tab
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition duration-150 ease-in-out`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeliveries.map((delivery, index) => (
          <DeliveryCard key={index} {...delivery} />
        ))}
      </div>
    </div>
  );
}
