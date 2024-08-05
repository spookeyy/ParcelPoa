import React, { useState } from "react";
import DeliveryCard from "./DeliveryCard";

export default function Deliveries() {
  const [activeTab, setActiveTab] = useState("all");

  const deliveries = [
    {
      orderID: "764",
      product: "Product Image 1",
      trackingNumber: "DB7YTE",
      status: "In Transit",
      orderDate: "MAY 11, 2023, 04:30 PM",
      quantity: 3,
      imageUrl: "https://img.freepik.com/free-psd/pictou-county-pizza-isolated-transparent-background_191095-32844.jpg?t=st=1722513299~exp=1722516899~hmac=76cb734b5fedae05a136df073d174c0373755ff5824e366046970e62162f5e8f&w=900", // Add image URL
    },
    {
      orderID: "765",
      product: "Product Image 2",
      trackingNumber: "DB8YTE",
      status: "Delivered",
      orderDate: "JUNE 5, 2023, 10:00 AM",
      quantity: 1,
      imageUrl: "https://img.freepik.com/free-psd/modern-house-isolated-transparent-background_191095-26815.jpg?t=st=1722512628~exp=1722516228~hmac=46e8b748b7af21607ed7cf0c9f2f62044cd5532895710143baa132d693e22bc2&w=900", // Add image URL
    },
    {
      orderID: "766",
      product: "Product Image 3",
      trackingNumber: "DB9YTE",
      status: "Scheduled",
      orderDate: "JULY 2, 2023, 01:30 PM",
      quantity: 5,
      imageUrl: "https://img.freepik.com/free-psd/cardboard-boxes-isolated-transparent-background_191095-17026.jpg?t=st=1722513364~exp=1722516964~hmac=300031783ba1ec99bc3c81e46f04eddac7aa21f4631769c0a9439c8e5885ddc8&w=900", // Add image URL
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
        {["all", "In Transit", "Delivered", "Scheduled"].map((tab) => (
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
