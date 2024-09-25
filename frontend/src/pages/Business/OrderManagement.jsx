import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { server } from "../../../config.json";
import { toast } from "react-toastify";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { authToken } = useContext(UserContext);
  const [filters, setFilters] = useState({ date: "", status: "" });

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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ date: "", status: "" });
  };

  const filteredOrders = orders.filter((order) => {
    return (
      (!filters.date || order.created_at.startsWith(filters.date)) &&
      (!filters.status || order.parcel.status === filters.status)
    );
  });

  // const createOrder = async (orderData) => {
  //   try {
  //     const response = await fetch(`${server}/schedule_pickup`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //       body: JSON.stringify(orderData),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       console.error("Server error response:", result);
  //       throw new Error(result.message || "Failed to create order");
  //     }

  //     console.log("Order created:", result);
  //     toast.success("Order created successfully");
  //     fetchOrders(); // Refresh orders after creating a new one
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //     toast.error(error.message || "Failed to create order");
  //   }
  // };

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

  const statusColor = (status) => {
    switch (status) {
      case "Delivered":
        return {
          color: "bg-green-500",
          textColor: "text-green-800",
        };
      case "Out for Delivery":
        return {
          color: "bg-yellow-500",
          textColor: "text-yellow-800",
        };
      case "In Transit":
        return {
          color: "bg-yellow-500",
          textColor: "text-yellow-800",
        };
      case "Scheduled for Pickup":
        return {
          color: "bg-gray-500",
          textColor: "text-gray-800",
        };
      case "Picked Up":
        return {
          color: "bg-green-800",
          textColor: "text-green-800",
        };
      case "Cancelled":
        return {
          color: "bg-red-500",
          textColor: "text-red-800",
        };
      case "Active":
        return {
          color: "bg-green-500",
          textColor: "text-blue-800",
        };
      default:
        return {
          color: "bg-gray-500",
          textColor: "text-gray-800",
        };
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
          {/* <select
            onChange={(e) => handleFilterChange("date", e.target.value)}
            className="border rounded p-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by date"
          >
            <option value="">Select Date</option>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select> */}
          <select
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="border rounded p-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by status"
          >
            <option value="">Select Status</option>
            <option value={"Delivered"}>Delivered</option>
            <option value={"Out for Delivery"}>Out for Delivery</option>
            <option value={"In Transit"}>In Transit</option>
            <option value={"Scheduled for Pickup"}>Scheduled for Pickup</option>
            <option value={"Picked Up"}>Picked Up</option>
            <option value={"Cancelled"}>Cancelled</option>
          </select>
          <button
            onClick={resetFilters}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Reset filters"
          >
            Reset Filter
          </button>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-gray-100 rounded-xl shadow-md p-6 lg:p-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200 rounded-lg shadow border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Recipient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Tracking Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                      {order.order_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                      {order.parcel.recipient_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                      {order.parcel.tracking_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-200">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          statusColor(order.parcel.status).color
                        }`}
                      >
                        {order.parcel.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-200">
                      <button
                        onClick={() => viewOrderDetails(order.order_id)}
                        className="text-yellow-600 hover:text-yellow-900 mr-4"
                      >
                        View
                      </button>
                      {[
                        "Scheduled for Pickup",
                        "In Transit",
                        "Out for Delivery",
                      ].includes(order.parcel.status) && (
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
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-white rounded-lg shadow-lg w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 bg-gray-400 text-black">
                <h2 className="text-2xl font-bold">Order Details</h2>
              </div>
              <div className="flex-grow overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Order Information
                    </h3>
                    <p>
                      <strong>Order ID:</strong> {selectedOrder.order_id}
                    </p>
                    <p>
                      <strong>Order Number:</strong>{" "}
                      {selectedOrder.order_number}
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
                      <strong>Status:</strong>
                      <span
                        className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          statusColor(selectedOrder.status).color
                        }`}
                      >
                        {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Parcel Information
                    </h3>
                    <p>
                      <strong>Parcel ID:</strong>{" "}
                      {selectedOrder.parcel.parcel_id}
                    </p>
                    <p>
                      <strong>Tracking Number:</strong>{" "}
                      {selectedOrder.parcel.tracking_number}
                    </p>
                    <p>
                      <strong>Category:</strong> {selectedOrder.parcel.category}
                    </p>
                    <p>
                      <strong>Weight:</strong> {selectedOrder.parcel.weight} kg
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedOrder.parcel.description}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Recipient Information
                    </h3>
                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedOrder.parcel.recipient_name}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedOrder.parcel.recipient_email}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {selectedOrder.parcel.recipient_phone}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {selectedOrder.parcel.recipient_address}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Sender Information
                    </h3>
                    <p>
                      <strong>Sender ID:</strong>{" "}
                      {selectedOrder.parcel.sender_id}
                    </p>
                    {/* <p>
                      <strong>Name:</strong>{" "}
                      {selectedOrder.parcel.sender_name}
                    </p> */}
                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedOrder.parcel.sender_email}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Location Information
                    </h3>
                    <p>
                      <strong>Current Location:</strong>{" "}
                      {selectedOrder.parcel.current_location}
                    </p>
                    {/* <p>
                      <strong>Latitude:</strong> {selectedOrder.parcel.latitude}
                    </p>
                    <p>
                      <strong>Longitude:</strong>{" "}
                      {selectedOrder.parcel.longitude}
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderManagement;
