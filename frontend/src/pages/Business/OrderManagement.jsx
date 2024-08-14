import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import ParcelForm from "./ParcelForm";
import { server } from "../../../config.json";
import { toast } from "react-toastify";
import Header from "./Header";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { authToken } = useContext(UserContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${server}/business/orders`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const ordersData = await response.json();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await fetch(`${server}/schedule_pickup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Server error response:", result);
        throw new Error(result.message || "Failed to create order");
      }

      console.log("Order created:", result);
      toast.success("Order created successfully");
      fetchOrders(); // Refresh orders after creating a new one
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error.message || "Failed to create order");
    }
  };

  const viewOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`${server}/business/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch order details");
      const orderDetails = await response.json();
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to fetch order details");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${server}/business/orders/${orderId}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to cancel order");
      }

      toast.success("Order cancelled successfully");
      fetchOrders(); // Refresh orders after cancelling
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(error.message || "Failed to cancel order");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-blue-300 to-indigo-400 rounded-xl shadow-lg p-8 max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Create New Order
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-10 pb-32">
            <div className="flex-1 w-full max-w-full md:max-w-md lg:max-w-lg">
              <ParcelForm onSubmit={createOrder} />
            </div>
            <div className="flex-1 w-full md:max-w-sm lg:max-w-md">
              <img
                src="https://img.freepik.com/free-photo/close-up-woman-shopping-store_23-2149241401.jpg"
                alt="Create Order"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-gradient-to-br from-blue-300 to-indigo-400 rounded-xl shadow-lg p-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Recent Orders
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parcel ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.order_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.parcel.sender_email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.parcel_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.updated_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => viewOrderDetails(order.order_id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                      {order.status === "Active" && (
                        <button
                          onClick={() => cancelOrder(order.order_id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <p>
                <strong>Order Number:</strong> {selectedOrder.order_number}
              </p>
              <p>
                <strong>User ID:</strong> {selectedOrder.user_id}
              </p>
              <p>
                <strong>Parcel ID:</strong> {selectedOrder.parcel_id}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedOrder.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(selectedOrder.updated_at).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-4 text-blue-500 hover:text-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderManagement;
