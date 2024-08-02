import React, { useState, useEffect } from "react";

// Mock delivery data
const deliveriesMockData = [
  { id: 1, parcel: "Parcel A", status: "Scheduled" },
  { id: 2, parcel: "Parcel B", status: "In Transit" },
  { id: 3, parcel: "Parcel C", status: "Delivered" },
];

export default function ManageDeliveries({ openSidebar }) {
  const [deliveries, setDeliveries] = useState(deliveriesMockData);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Fetch real delivery data here if needed
  }, []);

  useEffect(() => {
    if (notification) {
      // Simulate notification
      console.log(notification);
    }
  }, [notification]);

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
    // You can also implement a more sophisticated notification system here
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
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Parcel</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td className="border p-2">{delivery.parcel}</td>
                <td className="border p-2">{delivery.status}</td>
                <td className="border p-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                    <button
                      onClick={() =>
                        handleStatusChange(delivery.id, "Delivered")
                      }
                      className={`w-full sm:w-1/3 px-4 py-2 rounded ${
                        delivery.status === "Delivered"
                          ? "bg-green-600"
                          : "bg-green-500"
                      } text-white`}
                    >
                      Delivered
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(delivery.id, "In Transit")
                      }
                      className={`w-full sm:w-1/3 px-4 py-2 rounded ${
                        delivery.status === "In Transit"
                          ? "bg-yellow-600"
                          : "bg-yellow-500"
                      } text-white`}
                    >
                      In Transit
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(delivery.id, "Scheduled")
                      }
                      className={`w-full sm:w-1/3 px-4 py-2 rounded ${
                        delivery.status === "Scheduled"
                          ? "bg-red-600"
                          : "bg-red-500"
                      } text-white`}
                    >
                      Scheduled
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={openSidebar}
        className="w-full sm:w-48 bg-blue-500 text-white px-4 py-2 rounded-lg mt-6 hover:bg-blue-600"
      >
        Open Sidebar
      </button>
    </div>
  );
}
