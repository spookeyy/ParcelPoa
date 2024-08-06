import React, { useState, useEffect } from "react";
import ParcelForm from "./ParcelForm";
import {server} from "../../../config.json";
function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${server}/business/orders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch orders");
        const ordersData = await response.json();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const createOrder = async (orderData) => {
    try {
      console.log("OrderData", orderData);
      const response = await fetch(`${server}/schedule_pickup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to create order");
      }
      const result = await response.json();
      console.log("Order created:", result);

      // Refresh orders after creating a new one
      const updatedOrdersResponse = await fetch(`${server}/business/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!updatedOrdersResponse.ok)
        throw new Error("Failed to fetch updated orders");
      const updatedOrders = await updatedOrdersResponse.json();
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Order Management
      </h2>
      <ParcelForm onSubmit={createOrder} />
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700">
          Recent Orders
        </h3>
        <ul className="space-y-2">
          {orders.map((order) => (
            <li
              key={order.order_id}
              className="bg-gray-50 p-3 rounded-md text-gray-700"
            >
              {order.parcel.tracking_number} - {order.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderManagement;
