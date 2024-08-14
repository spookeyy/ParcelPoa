


import React, { useState, useEffect } from "react";
import config from "../../../config.json";   // Import the server URL

/* eslint-disable react/prop-types */
import  { useContext } from "react";
import { DeliveryContext } from "../../Context/DeliveryContext";
import { toast } from "react-toastify";
import { server } from "../../../config";


export default function ManageDeliveries({ openSidebar }) {
  const { deliveries, fetchDeliveries } = useContext(DeliveryContext);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchDeliveries();
    console.log("Deliveries:", deliveries);
  }, [fetchDeliveries, deliveries]);

  const handleStatusChange = async (deliveryId, parcelId, newStatus) => {
    try {
      const response = await fetch(
        `${server}/update_delivery_status/${deliveryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update delivery status");

      if (newStatus === "Delivered") {
        const markDeliveredResponse = await fetch(
          `${server}/mark_as_delivered/${parcelId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!markDeliveredResponse.ok)
          throw new Error("Failed to mark parcel as delivered");
      }

      fetchDeliveries();
      setNotification(`Delivery status changed to ${newStatus}`);
      toast.success(`Delivery status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating delivery status:", error);
      toast.error("Failed to update delivery status");
    }
  };

  const renderDeliveryTable = (deliveries, title, actionText, newStatus) => (
    <div className="w-full overflow-x-auto mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <table className="w-full min-w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="border p-2">Tracking Number</th>
            <th className="border p-2">Parcel</th>
            <th className="border p-2">Recipient</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.delivery_id}>
              <td className="border p-2">{delivery.parcel.tracking_number}</td>
              <td className="border p-2">{delivery.parcel.description}</td>
              <td className="border p-2">{delivery.parcel.recipient_name}</td>
              <td className="border p-2">{delivery.status}</td>
              <td className="border p-2">
                {actionText && (
                  <button
                    onClick={() =>
                      handleStatusChange(
                        delivery.delivery_id,
                        delivery.parcel.parcel_id,
                        newStatus
                      )
                    }
                    className="w-full px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    {actionText}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const scheduledDeliveries = deliveries.filter(
    (d) => d.status === "Scheduled"
  );
  const inTransitDeliveries = deliveries.filter(
    (d) => d.status === "In Transit"
  );
  const deliveredDeliveries = deliveries.filter(
    (d) => d.status === "Delivered"
  );

  return (
    <div className="p-6 bg-white rounded shadow-md flex flex-col items-center mx-auto max-w-6xl mt-12 mb-12">
      <button
        onClick={openSidebar}
        className="bg-blue-500 text-white p-2 rounded-lg shadow-md absolute top-4 left-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Open Sidebar"
      >
        <i className="fas fa-bars text-xl"></i>
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Manage Deliveries</h1>
      {notification && (
        <div className="bg-green-100 text-green-800 border border-green-300 rounded p-4 mb-4">
          {notification}
        </div>
      )}

      {renderDeliveryTable(
        scheduledDeliveries,
        "Scheduled Deliveries",
        "Mark as In Transit",
        "In Transit"
      )}
      {renderDeliveryTable(
        inTransitDeliveries,
        "In Transit Deliveries",
        "Mark as Delivered",
        "Delivered"
      )}
      {renderDeliveryTable(
        deliveredDeliveries,
        "Delivered Parcels",
        null,
        null
      )}
    </div>
  );
}
