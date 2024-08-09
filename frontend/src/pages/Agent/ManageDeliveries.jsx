/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { DeliveryContext } from "../../Context/DeliveryContext";

export default function ManageDeliveries({ openSidebar }) {
  const { deliveries, fetchDeliveries } = useContext(DeliveryContext);

  const [notification, setNotification] = useState("");
  const setDeliveries = useContext(DeliveryContext).setDeliveries;

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  const handleStatusChange = (id, newStatus) => {
    const updatedDelivery = deliveries.find((delivery) => delivery.id === id);
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      )
    );
    setNotification(
      `Delivery ${updatedDelivery.parcel} status changed to ${newStatus}`
    );
  };

  const filteredDeliveries = {
    inTransit: deliveries.filter(
      (delivery) => delivery.status === "In Transit"
    ),
    scheduled: deliveries.filter((delivery) => delivery.status === "Scheduled"),
    delivered: deliveries.filter((delivery) => delivery.status === "Delivered"),
  };

  return (
    <div className="p-6 bg-white rounded shadow-md flex flex-col items-center mx-auto max-w-4xl mt-12 mb-12">
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

      {/* In Transit Deliveries */}
      <div className="w-full overflow-x-auto mb-6">
        <h2 className="text-xl font-bold mb-2">In Transit</h2>
        <table className="w-full min-w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border p-2">Parcel</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.inTransit.map((delivery) => (
              <tr key={delivery.delivery_id}>
                <td className="border p-2">{delivery.parcel}</td>
                <td className="border p-2">{delivery.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleStatusChange(delivery.delivery_id, "Delivered")}
                    className="w-full px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scheduled Deliveries */}
      <div className="w-full overflow-x-auto mb-6">
        <h2 className="text-xl font-bold mb-2">Scheduled</h2>
        <table className="w-full min-w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border p-2">Parcel</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.scheduled.map((delivery) => (
              <tr key={delivery.id}>
                <td className="border p-2">{delivery.parcel}</td>
                <td className="border p-2">{delivery.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() =>
                      handleStatusChange(delivery.id, "In Transit")
                    }
                    className="w-full px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Mark as In Transit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivered Deliveries */}
      <div className="w-full overflow-x-auto mb-6">
        <h2 className="text-xl font-bold mb-2">Delivered</h2>
        <table className="w-full min-w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border p-2">Parcel</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.delivered.map((delivery) => (
              <tr key={delivery.id}>
                <td className="border p-2">{delivery.parcel}</td>
                <td className="border p-2">{delivery.status}</td>
                <td className="border p-2">
                  {/* No action button for delivered items */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={openSidebar}
        className="w-full sm:w-48 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Open Sidebar
      </button>
    </div>
  );
}
