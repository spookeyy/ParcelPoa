/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DeliveryCard from "./DeliveryCard";

export default function Deliveries({ deliveries }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredDeliveries =
    activeTab === "all"
      ? deliveries
      : deliveries.filter((delivery) => delivery.status === activeTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
      <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center sm:text-left">
        Deliveries
      </h3>
      <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
        {["all", "In Transit", "Delivered", "Scheduled"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
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
        {filteredDeliveries.map((delivery) => (
          <DeliveryCard
            key={delivery.delivery_id}
            delivery_id={delivery.delivery_id}
            orderID={delivery.orderID}
            trackingNumber={delivery.trackingNumber}
            status={delivery.status}
            orderDate={delivery.orderDate}
            recipientEmail={delivery.recipientEmail}
            sender_email={delivery.sender_email}
          />
        ))}
      </div>
    </div>
  );
}
