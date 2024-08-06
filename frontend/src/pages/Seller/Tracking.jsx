import React, { useState, useEffect } from "react";

// Mock API endpoints
const ORDERS_API_URL = "https://api.example.com/orders"; // Replace with your actual API URL
const TRACKING_API_URL = "https://api.example.com/order-tracking"; // Replace with your actual API URL

function Tracking() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  // Fetch order data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(ORDERS_API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError("Error fetching orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Fetch order details including tracking and progress when an order is selected
  useEffect(() => {
    if (selectedOrder) {
      const fetchOrderDetails = async () => {
        setDetailsLoading(true);
        try {
          const response = await fetch(`${TRACKING_API_URL}/${selectedOrder}`);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          setOrderDetails(data);
        } catch (error) {
          setError("Error fetching order details. Please try again later.");
        } finally {
          setDetailsLoading(false);
        }
      };

      fetchOrderDetails();
    }
  }, [selectedOrder]);

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Tracking</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading orders...</p>
        </div>
      ) : (
        <>
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by Order ID or Status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Approved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {order.status}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.approved ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => setSelectedOrder(order.id)}
                          className="text-blue-500 hover:text-blue-700 font-semibold transition"
                        >
                          Track
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedOrder && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Order Details
              </h2>
              {detailsLoading ? (
                <p className="text-gray-600">Loading order details...</p>
              ) : orderDetails ? (
                <>
                  <p>
                    <strong>Order ID:</strong> {selectedOrder}
                  </p>
                  <p>
                    <strong>Status:</strong> {orderDetails.status}
                  </p>
                  <p>
                    <strong>Current Location:</strong>{" "}
                    {orderDetails.currentLocation}
                  </p>
                  <p>
                    <strong>Estimated Delivery Date:</strong>{" "}
                    {new Date(
                      orderDetails.estimatedDelivery
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Assigned Agent:</strong> {orderDetails.agentName}
                  </p>
                  <h3 className="mt-6 text-lg font-semibold text-gray-700">
                    Progress:
                  </h3>
                  <ul className="list-disc pl-5 mt-2 text-gray-700">
                    {orderDetails.progress.map((step, index) => (
                      <li key={index}>
                        <strong>{step.date}:</strong> {step.description}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-gray-600">
                  No details available for this order.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tracking;
