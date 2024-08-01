import React, { useState } from "react";
import DeliveryCard from "./DeliveryCard";

export default function Deliveries() {
  const [activeTab, setActiveTab] = useState("all");

  const deliveries = [
    {
      orderID: "764",
      product: "Product Image",
      trackingNumber: "DB7YTE",
      status: "in transit",
      orderDate: "MAY 11, 2023, 04:30 PM",
    },
    {
      orderID: "765",
      product: "Product Image",
      trackingNumber: "DB8YTE",
      status: "delivered",
      orderDate: "JUNE 5, 2023, 10:00 AM",
    },
    {
      orderID: "766",
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
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
      <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center sm:text-left">
        Deliveries
      </h3>
      <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
        {["all", "in transit", "delivered", "scheduled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-medium text-sm sm:text-base transition duration-300 ease-in-out ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
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
